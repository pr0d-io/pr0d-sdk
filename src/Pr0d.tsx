import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AppConfig, User } from './interfaces';
import { Pr0dContext } from './context';
import { WagmiProvider, type Config, useSignMessage, useSignTypedData, useConnect, useAccount, useDisconnect } from 'wagmi';
import { formatPasskeyOptions, getWagmiConfig, isTokenExpired, bufferToBase64Url, constructSiveMessage, getTotpUrl, getConnectors } from './helpers';
import { setApiContext } from './api/apiClient';
import { getAccessToken, getRefreshToken, storeTokens, clearTokens } from './tokenStorage';
import { useThrottledCallback } from './useThrottleCallback';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthPopup from './views/AuthPopup';
import * as api from './api/apis';

const Pr0d = ({ appConfig: initialAppConfig, visitorId: initialVisitorId, wagmiConfig, children }: { appConfig: AppConfig | null, visitorId: string | null, wagmiConfig: Config, children: React.ReactNode }) => {

    const [ready, setReady] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [appConfig, setAppConfig] = useState<AppConfig | null>(initialAppConfig);
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [isPasskeySupported, setIsPasskeySupported] = useState(false);
    const [userInitiatedWalletLogin, setUserInitiatedWalletLogin] = useState(false);
    const [popup, setPopup] = useState<{ show: boolean; view: string }>({
        show: false,
        view: 'method-select',
    });
    const [currentProvider, setCurrentProvider] = useState<'google' | 'discord' | 'github' | 'x' | null>(null);
    const [selectedConnector, setSelectedConnector] = useState<any>(null);
    const [walletConnectUri, setWalletConnectUri] = useState<string | null>(null);
    const [connectingWallet, setConnectingWallet] = useState<{ name: string; id: string } | null>(null);
    const [walletError, setWalletError] = useState<string | null>(null);
    const [recentConnectorId, setRecentConnectorId] = useState<string | null>(null);
    const [oauthError, setOauthError] = useState<{ provider: string; state: string; errorMessage: string | null } | null>(null);
    const [isWalletLinkingMode, setIsWalletLinkingMode] = useState(false);
    const visitorId = initialVisitorId;

    useEffect(() => {
        disconnect();
        checkAuthenticationTokens();
    }, []);

    // Check for recent connector id from localStorage
    useEffect(() => {
        try {
            const storedRecentConnectorId = localStorage.getItem('wagmi.recentConnectorId');
            if (storedRecentConnectorId) {
                // Parse the JSON if it's JSON-encoded, otherwise use as-is
                let parsedId = storedRecentConnectorId;
                try {
                    parsedId = JSON.parse(storedRecentConnectorId);
                } catch {
                    // If JSON.parse fails, use the raw string
                }
                setRecentConnectorId(parsedId);
            }
        } catch (error) {
            console.error('Failed to get recent connector id from localStorage:', error);
        }
    }, []);

    useEffect(() => {
        const checkPasskeyUIAvailability = async () => {
            try {
                const supported = window.PublicKeyCredential?.isUserVerifyingPlatformAuthenticatorAvailable;
                if (!supported) {
                    setIsPasskeySupported(false);
                    return;
                }
                const available = await supported.call(window.PublicKeyCredential);
                setIsPasskeySupported(available);
            } catch {
                setIsPasskeySupported(false);
            }
        };
        checkPasskeyUIAvailability();
    }, []);


    useEffect(() => {
        setApiContext({
            _appId: appConfig?.id,
            _visitorId: visitorId,
            _accessToken: accessToken,
        });
    }, [appConfig, visitorId, accessToken]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        const success = urlParams.get('status') === 'success';
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        const oauthCode = urlParams.get('pr0d_oauth_code');
        const oauthState = urlParams.get('pr0d_oauth_state');
        const oauthProvider = urlParams.get('pr0d_oauth_provider');

        window.history.replaceState({}, document.title, window.location.pathname);

        if (oauthCode && oauthState && oauthProvider) {
            if (oauthCode === 'error') {
                setOauthError({ provider: oauthProvider, state: oauthState, errorMessage: error });
                setPopup({ show: true, view: 'oauth-error' });
            } else {
                // Show loading state and exchange code
                setPopup({ show: true, view: 'oauth-loading' });
                exchangeCodeForToken(oauthCode, oauthProvider as 'google' | 'discord' | 'github' | 'x');
            }
            return;
        }

        if (success && code) {
            // For generic OAuth callback, show loading and exchange
            setPopup({ show: true, view: 'oauth-loading' });
            exchangeCodeForToken(code);
        } else if (!success && error) {
            setOauthError({ provider: 'unknown', state: 'url_error', errorMessage: error });
            setPopup({ show: true, view: 'oauth-error' });
        }
    }, []);

    const checkAuthenticationTokens = async () => {
        try {
            const accessToken = getAccessToken();
            const refreshToken = getRefreshToken();
            if (accessToken && !isTokenExpired(accessToken)) {
                setIsAuthenticated(true);
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                await updateUser();
                return;
            }

            if (refreshToken) {
                const data = await api.refreshSessionByRefreshToken(refreshToken);
                if (data.success && data.access_token && data.refresh_token) {
                    await handleLoginSuccess(data.access_token, data.refresh_token);
                    return;
                }
            }

            throw new Error('No valid tokens');
        } catch (error) {
            clearTokens();
            setAccessToken(null);
            setRefreshToken(null);
            setIsAuthenticated(false);
        } finally {
            setReady(true);
        }
    };

    const logout = useCallback(() => {
        if (refreshToken) {
            api.revokeSessionByRefreshToken(refreshToken);
        }
        clearTokens();
        setIsAuthenticated(false);
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
    }, [refreshToken]);

    const refreshSession = useCallback(async () => {
        try {
            const refreshToken = getRefreshToken();
            if (!refreshToken) throw new Error('Missing refresh token');

            const { access_token, refresh_token } = await api.refreshSessionByRefreshToken(refreshToken);
            await handleLoginSuccess(access_token, refresh_token);
        } catch (err) {
            logout();
        }
    }, [logout]);

    const checkAndRefreshToken = useThrottledCallback(() => {
        const accessToken = getAccessToken();
        if (!accessToken || isTokenExpired(accessToken, 300)) {
            refreshSession();
        }
    }, 30000);


    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                checkAndRefreshToken();
            }
        };

        const interval = setInterval(() => {
            checkAndRefreshToken();
        }, 60 * 1000); // Every 60 seconds

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [checkAndRefreshToken]);

    const handleLoginSuccess = async (access_token?: string, refresh_token?: string) => {
        if (!access_token || !refresh_token) {
            console.warn('Invalid tokens provided to handleLoginSuccess');
            return;
        }

        storeTokens(access_token, refresh_token);
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        setIsAuthenticated(true);
        await updateUser();
    };

    const updateUser = async () => {
        try {
            const user = await api.getUser();
            setUser(user);
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const exchangeCodeForToken = async (code: string, provider?: 'google' | 'discord' | 'github' | 'x') => {
        try {
            // Set the current provider if provided
            if (provider) {
                setCurrentProvider(provider);
            }
            
            const { access_token, refresh_token } = await api.exchangeCodeForTokens(code);
            
            // Show success view briefly
            setPopup({ show: true, view: 'oauth-success' });
            
            await handleLoginSuccess(access_token, refresh_token);
            
            // Close popup after success
            setTimeout(() => {
                setCurrentProvider(null);
                closePopup();
            }, 1000);
        } catch (err: any) {
            // Show error popup with specific error message
            setCurrentProvider(null);
            setOauthError({ 
                provider: provider || 'unknown', 
                state: 'exchange_failed', 
                errorMessage: err.response?.data?.message || err.message || 'Failed to verify connection' 
            });
            setPopup({ show: true, view: 'oauth-error' });
        }
    };

    const sendEmailCode = async (email: string) => {
        return api.sendEmailCode(email);
    };

    const loginWithEmail = async (email: string, code: string) => {
        const { access_token, refresh_token } = await api.loginWithEmailCode(email, code);
        await handleLoginSuccess(access_token, refresh_token);
    };

    const unlinkEmail = async () => {
        await api.deleteEmail();
        await updateUser();
    }

    const linkEmail = async (email: string, code: string) => {
        await api.linkWithEmailCode(email, code);
        await updateUser();
    }

    const loginWithGoogle = async () => {
        try {
            setCurrentProvider('google');
            setPopup({ show: true, view: 'oauth-loading' });
            const url = await api.loginWithProvider('google', window.location.href);
            window.location.href = url;
        } catch (err: any) {
            setCurrentProvider(null);
            setOauthError({ 
                provider: 'google', 
                state: 'init_failed', 
                errorMessage: err.response?.data?.message || err.message || 'Failed to initiate login with Google' 
            });
            setPopup({ show: true, view: 'oauth-error' });
        }
    }

    const loginWithDiscord = async () => {
        try {
            setCurrentProvider('discord');
            setPopup({ show: true, view: 'oauth-loading' });
            const url = await api.loginWithProvider('discord', window.location.href);
            window.location.href = url;
        } catch (err: any) {
            setCurrentProvider(null);
            setOauthError({ 
                provider: 'discord', 
                state: 'init_failed', 
                errorMessage: err.response?.data?.message || err.message || 'Failed to initiate login with Discord' 
            });
            setPopup({ show: true, view: 'oauth-error' });
        }
    }

    const loginWithGithub = async () => {
        try {
            setCurrentProvider('github');
            setPopup({ show: true, view: 'oauth-loading' });
            const url = await api.loginWithProvider('github', window.location.href);
            window.location.href = url;
        } catch (err: any) {
            setCurrentProvider(null);
            setOauthError({ 
                provider: 'github', 
                state: 'init_failed', 
                errorMessage: err.response?.data?.message || err.message || 'Failed to initiate login with GitHub' 
            });
            setPopup({ show: true, view: 'oauth-error' });
        }
    }

    const loginWithX = async () => {
        try {
            setCurrentProvider('x');
            setPopup({ show: true, view: 'oauth-loading' });
            const url = await api.loginWithProvider('x', window.location.href);
            window.location.href = url;
        } catch (err: any) {
            setCurrentProvider(null);
            setOauthError({ 
                provider: 'x', 
                state: 'init_failed', 
                errorMessage: err.response?.data?.message || err.message || 'Failed to initiate login with X' 
            });
            setPopup({ show: true, view: 'oauth-error' });
        }
    }

    const linkTOTPWithCode = async (code: string) => {
        await api.linkTOTPWithCode(code);
        await updateUser();
    }

    const linkGoogle = async () => {
        try {
            const url = await api.linkWithProvider('google', window.location.href);
            window.location.href = url;
            await updateUser();
        } catch (err: any) {
            setOauthError({ 
                provider: 'google', 
                state: 'link_init_failed', 
                errorMessage: err.response?.data?.message || err.message || 'Failed to initiate link with Google' 
            });
            setPopup({ show: true, view: 'oauth-error' });
        }
    }

    const linkDiscord = async () => {
        try {
            const url = await api.linkWithProvider('discord', window.location.href);
            window.location.href = url;
            await updateUser();
        } catch (err: any) {
            setOauthError({ 
                provider: 'discord', 
                state: 'link_init_failed', 
                errorMessage: err.response?.data?.message || err.message || 'Failed to initiate link with Discord' 
            });
            setPopup({ show: true, view: 'oauth-error' });
        }
    }

    const linkGithub = async () => {
        try {
            const url = await api.linkWithProvider('github', window.location.href);
            window.location.href = url;
            await updateUser();
        } catch (err: any) {
            setOauthError({ 
                provider: 'github', 
                state: 'link_init_failed', 
                errorMessage: err.response?.data?.message || err.message || 'Failed to initiate link with GitHub' 
            });
            setPopup({ show: true, view: 'oauth-error' });
        }
    }

    const linkX = async () => {
        try {
            const url = await api.linkWithProvider('x', window.location.href);
            window.location.href = url;
            await updateUser();
        } catch (err: any) {
            setOauthError({ 
                provider: 'x', 
                state: 'link_init_failed', 
                errorMessage: err.response?.data?.message || err.message || 'Failed to initiate link with X' 
            });
            setPopup({ show: true, view: 'oauth-error' });
        }
    }

    const unlinkGoogle = async () => {
        await api.unlinkWithProvider('google');
        await updateUser();
    }

    const unlinkDiscord = async () => {
        await api.unlinkWithProvider('discord');
        await updateUser();
    }

    const unlinkGithub = async () => {
        await api.unlinkWithProvider('github');
        await updateUser();
    }

    const unlinkX = async () => {
        await api.unlinkWithProvider('x');
        await updateUser();
    }

    const loginWithPasskey = async () => {
        if (
            typeof window === 'undefined' ||
            !window.PublicKeyCredential ||
            typeof navigator.credentials?.get !== 'function'
        ) {
            throw new Error('Passkeys are not supported on this device or browser.');
        }

        try {
            // Show passkey loading view
            setPopup({ show: true, view: 'passkey-loading' });
            
            const { options } = await api.initPasskey();
            const publicKeyOptions = formatPasskeyOptions(options);

            const assertion = await navigator.credentials.get({
                publicKey: publicKeyOptions,
            }) as PublicKeyCredential;

            if (!assertion) {
                throw new Error('No credential returned from passkey authentication');
            }

            // Show signing/verification view
            setPopup({ show: true, view: 'passkey-signing' });

            const response = assertion.response as AuthenticatorAssertionResponse;

            const credential = {
                id: assertion.id,
                rawId: bufferToBase64Url(assertion.rawId),
                type: assertion.type,
                response: {
                    authenticatorData: bufferToBase64Url(response.authenticatorData),
                    clientDataJSON: bufferToBase64Url(response.clientDataJSON),
                    signature: bufferToBase64Url(response.signature),
                    userHandle: response.userHandle
                        ? bufferToBase64Url(response.userHandle)
                        : null,
                },
            };

            const { access_token, refresh_token } = await api.verifyPasskey(credential);
            
            // Show success view briefly
            setPopup({ show: true, view: 'passkey-login-success' });
            
            await handleLoginSuccess(access_token, refresh_token);
            
            // Close popup after success
            setTimeout(() => {
                closePopup();
            }, 1000);
        } catch (err: any) {
            console.error('[Passkey Login Error]', err);
            setPopup({ show: true, view: 'passkey-error' });
            throw new Error(err.message || 'Failed to log in with passkey');
        }
    };

    const linkPasskey = async () => {
        if (
            typeof window === 'undefined' ||
            !window.PublicKeyCredential ||
            typeof navigator.credentials?.create !== 'function'
        ) {
            throw new Error('Passkeys are not supported on this device or browser.');
        }

        try {
            // Show MFA setup flow
            setPopup({ show: true, view: 'mfa' });
            
            const { options } = await api.initPasskey();
            const publicKeyOptions = formatPasskeyOptions(options);

            const credential = await navigator.credentials.create({
                publicKey: publicKeyOptions,
            }) as PublicKeyCredential;

            if (!credential) {
                throw new Error('No credential returned from passkey registration');
            }

            const response = credential.response as AuthenticatorAttestationResponse;

            const registrationCredential = {
                id: credential.id,
                rawId: bufferToBase64Url(credential.rawId),
                type: credential.type,
                response: {
                    attestationObject: bufferToBase64Url(response.attestationObject),
                    clientDataJSON: bufferToBase64Url(response.clientDataJSON),
                },
            };

            await api.verifyPasskey(registrationCredential);
            await updateUser();
        } catch (err: any) {
            console.error('[Passkey Link Error]', err);
            throw new Error(err.message || 'Failed to link passkey');
        }
    }

    const unlinkPasskey = async (credentialID: string) => {
        await api.deletePasskey(credentialID);
        await updateUser();
    }

    const { connectAsync, connectors: rawConnectors, error } = useConnect();
    const { disconnect } = useDisconnect();
    const { signMessageAsync } = useSignMessage();
    const { address, isConnected } = useAccount();

    // Get formatted connectors for UI
    const connectors = useMemo(() => {
        return getConnectors(wagmiConfig);
    }, [wagmiConfig]);

    const loginWithWallet = async (connector?: any) => {
        try {
            // Show wallet connecting view
            setPopup({ show: true, view: 'wallet-connecting' });
            
            disconnect();
            // Use the provided connector, selected connector, or fallback to first available
            const connectorToUse = connector || selectedConnector || connectors[0];
            
            if (!connectorToUse) {
                throw new Error('No wallet connector available');
            }

            // Store connecting wallet info
            setConnectingWallet({ name: connectorToUse.name, id: connectorToUse.id });
            
            // Check if this is a WalletConnect-based wallet that requires QR code
            const isWalletConnectBased = connectorToUse.requireQRcode;
            
            if (isWalletConnectBased) {
                // For WalletConnect-based wallets, set up event listeners first
                try {
                    const provider = await connectorToUse.getProvider();
                    
                    if (provider) {
                        // Listen for various possible events to capture the URI
                        const events = ['display_uri', 'qr_code_modal', 'uri', 'connect_uri'];
                        
                        events.forEach(eventName => {
                            provider.on?.(eventName, (data: any) => {
                                if (typeof data === 'string' && data.startsWith('wc:')) {
                                    setWalletConnectUri(data);
                                } else if (data?.uri && typeof data.uri === 'string') {
                                    setWalletConnectUri(data.uri);
                                }
                            });
                        });
                        
                        // Also try to access the connector directly
                        if (provider.connector) {
                            events.forEach(eventName => {
                                provider.connector.on?.(eventName, (data: any) => {
                                    if (typeof data === 'string' && data.startsWith('wc:')) {
                                        setWalletConnectUri(data);
                                    } else if (data?.uri && typeof data.uri === 'string') {
                                        setWalletConnectUri(data.uri);
                                    }
                                });
                            });
                        }
                    }
                } catch (error) {
                    console.error('Failed to setup WalletConnect provider:', error);
                }
                
                // Fallback: Try to get URI after a short delay
                setTimeout(async () => {
                    try {
                        const provider = await connectorToUse.getProvider();
                        
                        // Try different ways to access the URI
                        if (provider?.connector?.uri) {
                            setWalletConnectUri(provider.connector.uri);
                        } else if (provider?.uri) {
                            setWalletConnectUri(provider.uri);
                        } else if (provider?.session?.uri) {
                            setWalletConnectUri(provider.session.uri);
                        }
                    } catch (error) {
                        console.error('Fallback URI check failed:', error);
                    }
                }, 1000);
            }
            
            const result = await connectAsync({ connector: connectorToUse });
            const address = result.accounts[0]
            
            // Show wallet success view briefly
            setPopup({ show: true, view: 'wallet-success' });
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show signing view
            setPopup({ show: true, view: 'wallet-signing' });
            
            const { message } = await api.initWalletAuth(address, window.location.origin, '1', '1');
            const siweMessage = constructSiveMessage(message);
            const signature = await signMessageAsync({
                message: siweMessage,
            });
            // Show verification view while submitting signature
            setPopup({ show: true, view: 'wallet-verifying' });
            
            const { access_token, refresh_token } = await api.authenticateWallet(signature, message.nonce);
            
            // Show login success view
            setPopup({ show: true, view: 'wallet-login-success' });
            
            await handleLoginSuccess(access_token, refresh_token);
            
            // Close popup after success
            setTimeout(() => {
                closePopup();
            }, 1000);

            if (error) {
                console.error('Connect error:', error);
            }
        } catch (err: any) {
            console.error('Connect error:', err);
            
            // Extract meaningful error message
            let errorMessage = 'Failed to connect wallet';
            
            if (err.message) {
                // Check for common wallet error patterns
                const message = err.message.toLowerCase();
                if (message.includes('rejected') || message.includes('denied') || message.includes('user rejected')) {
                    errorMessage = 'Connection rejected by user';
                } else if (message.includes('not found') || message.includes('install')) {
                    errorMessage = `${connectingWallet?.name || 'Wallet'} not found. Please install the wallet.`;
                } else if (message.includes('network')) {
                    errorMessage = 'Network error. Please check your connection.';
                } else if (message.includes('timeout')) {
                    errorMessage = 'Connection timeout. Please try again.';
                } else {
                    errorMessage = err.message;
                }
            }
            
            setWalletError(errorMessage);
            setPopup({ show: true, view: 'wallet-error' });
        }
    };

    const linkWallet = async (connector?: any) => {
        // If no connector is provided, show wallet selection popup
        if (!connector) {
            resetWalletStates();
            setIsWalletLinkingMode(true);
            setPopup({ show: true, view: 'wallet' });
            return;
        }

        try {
            // Show wallet connecting view
            setPopup({ show: true, view: 'wallet-connecting' });
            
            disconnect();
            // Use the provided connector, selected connector, or fallback to first available
            const connectorToUse = connector || selectedConnector || connectors[0];
            
            if (!connectorToUse) {
                throw new Error('No wallet connector available');
            }

            // Store connecting wallet info
            setConnectingWallet({ name: connectorToUse.name, id: connectorToUse.id });
            
            // Check if this is a WalletConnect-based wallet that requires QR code
            const isWalletConnectBased = connectorToUse.requireQRcode;
            
            if (isWalletConnectBased) {
                // For WalletConnect-based wallets, set up event listeners first
                try {
                    const provider = await connectorToUse.getProvider();
                    
                    if (provider) {
                        // Listen for various possible events to capture the URI
                        const events = ['display_uri', 'qr_code_modal', 'uri', 'connect_uri'];
                        
                        events.forEach(eventName => {
                            provider.on?.(eventName, (data: any) => {
                                if (typeof data === 'string' && data.startsWith('wc:')) {
                                    setWalletConnectUri(data);
                                } else if (data?.uri && typeof data.uri === 'string') {
                                    setWalletConnectUri(data.uri);
                                }
                            });
                        });
                        
                        // Also try to access the connector directly
                        if (provider.connector) {
                            events.forEach(eventName => {
                                provider.connector.on?.(eventName, (data: any) => {
                                    if (typeof data === 'string' && data.startsWith('wc:')) {
                                        setWalletConnectUri(data);
                                    } else if (data?.uri && typeof data.uri === 'string') {
                                        setWalletConnectUri(data.uri);
                                    }
                                });
                            });
                        }
                    }
                } catch (error) {
                    console.error('Failed to setup WalletConnect provider:', error);
                }
                
                // Fallback: Try to get URI after a short delay
                setTimeout(async () => {
                    try {
                        const provider = await connectorToUse.getProvider();
                        
                        // Try different ways to access the URI
                        if (provider?.connector?.uri) {
                            setWalletConnectUri(provider.connector.uri);
                        } else if (provider?.uri) {
                            setWalletConnectUri(provider.uri);
                        } else if (provider?.session?.uri) {
                            setWalletConnectUri(provider.session.uri);
                        }
                    } catch (error) {
                        console.error('Fallback URI check failed:', error);
                    }
                }, 1000);
            }
            
            const result = await connectAsync({ connector: connectorToUse });
            const address = result.accounts[0]
            
            // Show wallet success view briefly
            setPopup({ show: true, view: 'wallet-success' });
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show signing view
            setPopup({ show: true, view: 'wallet-signing' });
            
            const { message } = await api.initWalletAuth(address, window.location.origin, '1', '1');
            const siweMessage = constructSiveMessage(message);
            const signature = await signMessageAsync({
                message: siweMessage,
            });
            
            // Show verification view while submitting signature
            setPopup({ show: true, view: 'wallet-verifying' });
            
            await api.linkWallet(signature, message.nonce);
            await updateUser();
            // Show login success view
            setPopup({ show: true, view: 'wallet-login-success' });
            
            // Close popup after success
            setTimeout(() => {
                closePopup();
            }, 1000);

            if (error) {
                console.error('Connect error:', error);
            }
        } catch (err: any) {
            console.error('Link wallet error:', err);
            
            // Extract meaningful error message - prioritize API error messages
            let errorMessage = err.response?.data?.message || err.message || 'Failed to link wallet';
            
            // Check for common wallet error patterns only if no API message
            if (!err.response?.data?.message && err.message) {
                const message = err.message.toLowerCase();
                if (message.includes('rejected') || message.includes('denied') || message.includes('user rejected')) {
                    errorMessage = 'Connection rejected by user';
                } else if (message.includes('not found') || message.includes('install')) {
                    errorMessage = `${connectingWallet?.name || 'Wallet'} not found. Please install the wallet.`;
                } else if (message.includes('network')) {
                    errorMessage = 'Network error. Please check your connection.';
                } else if (message.includes('timeout')) {
                    errorMessage = 'Connection timeout. Please try again.';
                }
            }
            
            setWalletError(errorMessage);
            setPopup({ show: true, view: 'wallet-error' });
        }
    };

    const unlinkWallet = async (address: string) => {
        await api.deleteWallet(address);
        await updateUser();
    }

    const renderQRCode = async (element: HTMLElement, data: string) => {
        const { default: QRCodeStyling } = await import('qr-code-styling');
        const { secret, qrCodeUrl } = await api.setupMFA();

        const qrData = getTotpUrl(qrCodeUrl, secret, appConfig!, user!);

        const qrCode = new QRCodeStyling({
            width: 200,
            height: 200,
            data: qrData,
            type: 'svg',
            dotsOptions: {
                color: "#000000",
                type: "dots"
            },
            cornersSquareOptions: {
                color: "#000000",
                type: "extra-rounded"
            },
            cornersDotOptions: {
                color: "#000000",
                type: "dot"
            },
            backgroundOptions: {
                color: "#ffffff"
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 2,
                imageSize: 0.15
            }
        });

        element.innerHTML = '';

        qrCode.append(element);

        return { secret };
    };

    const unlinkTOTP = async () => {
        await api.deleteMFA();
        await updateUser();
    }

    const hasLinked = (method: 'email' | 'wallet' | 'passkey' | 'google' | 'discord' | 'github' | 'x' | 'totp') => {
        if (!user) return false;

        switch (method) {
            case 'email':
                return user.email?.email ? true : false;
            case 'wallet':
                return user.wallets?.length > 0;
            case 'passkey':
                return user.passkeys?.length > 0;
            case 'totp':
                return user.mfa ? true : false;
            case 'google':
                return user.google ? true : false;
            case 'discord':
                return user.discord ? true : false;
            case 'github':
                return user.github ? true : false;
            case 'x':
                return user.x ? true : false;
            default:
                return false;
        }
    };

    const getLinkedMethods = (): ('email' | 'wallet' | 'passkey' | 'totp' | 'google' | 'discord' | 'github' | 'x')[] => {
        if (!user) return [];
    
        const linked: ReturnType<typeof getLinkedMethods> = [];
    
        if (user.email?.email) linked.push('email');
        if (user.wallets?.length > 0) linked.push('wallet');
        if (user.passkeys?.length > 0) linked.push('passkey');
        if (user.mfa) linked.push('totp');
        if (user.google) linked.push('google');
        if (user.discord) linked.push('discord');
        if (user.github) linked.push('github');
        if (user.x) linked.push('x');
    
        return linked;
    };

    const getAvailableLoginMethods = (): ('email' | 'wallet' | 'passkey' | 'totp' | 'google' | 'discord' | 'github' | 'x')[] => {
        if (!appConfig) return [];
    
        const available: ReturnType<typeof getAvailableLoginMethods> = [];
    
        if (appConfig.options?.email) available.push('email');
        if (appConfig.options?.externalWallet) available.push('wallet');
        if (appConfig.options?.passkey) available.push('passkey');
        if (appConfig.options?.totp) available.push('totp');
        if (appConfig.options?.google) available.push('google');
        if (appConfig.options?.discord) available.push('discord');
        if (appConfig.options?.github) available.push('github');
        if (appConfig.options?.x) available.push('x');
    
        return available;
    };  
    
    const resetWalletStates = () => {
        setWalletConnectUri(null);
        setConnectingWallet(null);
        setSelectedConnector(null);
        setWalletError(null);
        setIsWalletLinkingMode(false);
        disconnect();
    };

    const resetOAuthStates = () => {
        setCurrentProvider(null);
        setOauthError(null);
    };

    const resetAllTemporaryStates = () => {
        resetWalletStates();
        resetOAuthStates();
    };

    // Trigger functions for logged-in users to add authentication methods (like v1)
    const triggerMfaSetup = () => {
        setPopup({ show: true, view: 'mfa' });
    };

    const triggerPasskeySetup = () => {
        setPopup({ show: true, view: 'mfa' });
    };

    const triggerTotpSetup = () => {
        setPopup({ show: true, view: 'mfa-totp' });
    };

    const triggerPasskeySetupDirect = () => {
        setPopup({ show: true, view: 'mfa-passkey' });
    };

    const linkMFA = async () => {
        setPopup({ show: true, view: 'mfa' });
    };

    // These are already implemented but let's make sure they work for account management
    const triggerEmailLink = () => {
        // For logged-in users to add email to their account - show email linking view
        setPopup({ show: true, view: 'email-link' });
    };

    const triggerProviderLink = () => {
        // For logged-in users to link social providers - we can reuse method-select or add a dedicated view later
        setPopup({ show: true, view: 'method-select' });
    };

    const triggerWalletLink = () => {
        // For logged-in users to link additional wallets
        linkWallet();
    };

    const setPopupView = (view: string) => setPopup({ show: true, view });
    
    const closePopup = () => {
        setPopup({ show: false, view: 'method-select' });
        resetAllTemporaryStates();
    };

    const goBackFromView = (currentView: string) => {
        switch (currentView) {
            case 'wallet':
                resetWalletStates();
                setPopupView('method-select');
                break;
            case 'wallet-connecting':
            case 'wallet-signing':
            case 'wallet-success':
            case 'wallet-verifying':
            case 'wallet-error':
                resetWalletStates();
                setPopupView('wallet');
                break;
            case 'oauth-error':
                resetOAuthStates();
                setPopupView('method-select');
                break;
            default:
                setPopupView('method-select');
                break;
        }
    };

    const contextValue = useMemo(() => ({
        isAuthenticated,
        user,
        ready,
        appConfig,
        visitorId,
        accessToken,
        popup,
        closePopup,
        setPopupView,
        goBackFromView,
        resetWalletStates,
        resetOAuthStates,
        resetAllTemporaryStates,
        currentProvider,
        oauthError,
        // Trigger functions for logged-in users to manage their authentication methods
        triggerMfaSetup,
        triggerPasskeySetup,
        triggerTotpSetup,
        triggerPasskeySetupDirect,
        triggerEmailLink,
        triggerProviderLink,
        triggerWalletLink,
        linkMFA,
        unlink: {
            totp: unlinkTOTP,
            google: unlinkGoogle,
            discord: unlinkDiscord,
            github: unlinkGithub,
            x: unlinkX,
            wallet: unlinkWallet,
            passkey: unlinkPasskey,
            email: unlinkEmail,
        },
        link: {
            totp: linkTOTPWithCode,
            google: linkGoogle,
            discord: linkDiscord,
            github: linkGithub,
            x: linkX,
            wallet: linkWallet,
            passkey: linkPasskey,
            email: linkEmail,
            sendEmailCode,
        },
        login: {
            withEmail: loginWithEmail,
            withGoogle: loginWithGoogle,
            withDiscord: loginWithDiscord,
            withGithub: loginWithGithub,
            withX: loginWithX,
            withPasskey: loginWithPasskey,
            withWallet: loginWithWallet,
            sendEmailCode,
        },
        logout,
        updateUser,
        sessions: {
            refreshSession,
        },
        helpers: {
            isPasskeySupported,
            isConnected,
            hasLinked,
            getLinkedMethods,
            getAvailableLoginMethods,
            address: address || undefined,
            connectors,
            setSelectedConnector,
            walletConnectUri,
            connectingWallet,
            walletError,
            recentConnectorId,
            isWalletLinkingMode,
        },
        renderQRCode,
    }), [
        isAuthenticated,
        user,
        ready,
        appConfig,
        visitorId,
        accessToken,
        logout,
        refreshSession,
        updateUser,
        loginWithEmail,
        loginWithGoogle,
        loginWithDiscord,
        loginWithGithub,
        loginWithX,
        loginWithPasskey,
        loginWithWallet,
        sendEmailCode,
        isPasskeySupported,
        isConnected,
        address,
        popup,
        setPopupView,
        closePopup,
        goBackFromView,
        renderQRCode,
        hasLinked,
        getLinkedMethods,
        getAvailableLoginMethods,
        connectors,
        selectedConnector,
        setSelectedConnector,
        currentProvider,
        wagmiConfig,
        walletConnectUri,
        connectingWallet,
        walletError,
        oauthError,
        // Trigger functions
        triggerMfaSetup,
        triggerPasskeySetup,
        triggerEmailLink,
        triggerProviderLink,
        triggerWalletLink,
        linkMFA,
    ]);

    if (!ready) return <div>Loading...</div>;


    return (
        <Pr0dContext.Provider value={contextValue}>
            <AuthPopup />
            {children}
        </Pr0dContext.Provider>
    )
}

const queryClient = new QueryClient();

const Pr0dProvider = ({ appId, children }: { appId: string, children: React.ReactNode }) => {
    const [appConfig, setAppConfig] = useState<AppConfig | null>(null);
    const [wagmiConfig, setWagmiConfig] = useState<Config | null>(null);
    const [visitorId, setVisitorId] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppConfig = async () => {
            const appConfig = await api.getAppConfig(appId);
            setAppConfig(appConfig);
        }
        fetchAppConfig();
    }, [appId]);

    useEffect(() => {
        if (!appConfig) return;
        const newConfig = getWagmiConfig(appConfig.name, appConfig.walletConnect);
        setWagmiConfig(newConfig);
    }, [appConfig]);

    useEffect(() => {
        const fetchVisitorId = async () => {
            const fp = await import('@fingerprintjs/fingerprintjs');
            const FingerprintJS = fp.default;
            const fpInstance = await FingerprintJS.load();
            const result = await fpInstance.get();
            const visitorId = result.visitorId;
            setVisitorId(visitorId);
        }
        fetchVisitorId();
    }, []);

    if (!appConfig || !wagmiConfig) return <div>Loading...</div>;
    return (
        <QueryClientProvider client={queryClient}>
            <WagmiProvider config={wagmiConfig}>
                <Pr0d appConfig={appConfig} visitorId={visitorId} wagmiConfig={wagmiConfig}>
                    {children}
                </Pr0d>
            </WagmiProvider>
        </QueryClientProvider>
    )
}

export default Pr0dProvider;
