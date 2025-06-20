import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useAccount, useConnect, useDisconnect, useSignMessage, useSignTypedData, WagmiProvider, type Config } from 'wagmi';
import { createWagmiConfig } from './wagmi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { jwtDecode } from "jwt-decode";

import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { AppConfig, User, AuthContextType } from './interfaces';
import { Spinner, FocusableButton, WalletStatusCircle, ProviderStatusCircle } from './components';
import { isValidEmail, getDeviceName, base64urlToUint8Array, isLightColor, getLightAccentColor, getStyles } from './helpers';

import axios from 'axios';

const AuthContext = createContext<AuthContextType | null>(null);

const Pr0d = ({ appId, children, appConfig: initialAppConfig }: { appId: string; children: React.ReactNode, appConfig: AppConfig | null }) => {

    const baseUrl = 'https://auth.pr0d.io';
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [showPopup, setShowPopup] = useState<{ show: boolean; view?: 'loginorsignup' | 'wallet' | 'wallet-link' | 'wallet-connecting' | 'wallet-signing' | 'wallet-success' | 'wallet-error' | 'mfa' | 'link' | 'provider' | 'oauth-error' | 'oauth-loading' | 'passkey-loading' | 'passkey-signing' | 'passkey-error' }>({ show: false });
    const [oauthError, setOauthError] = useState<{ provider: string; state: string; errorMessage: string | null } | null>(null);
    const [oauthLoading, setOauthLoading] = useState<{ provider: string } | null>(null);
    const [passkeyError, setPasskeyError] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [step, setStep] = useState<'email' | 'code'>('email');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [appConfig, setAppConfig] = useState<AppConfig | null>(initialAppConfig);
    const [ready, setReady] = useState<boolean>(!!initialAppConfig);
    const qrCodeRef = useRef<HTMLDivElement>(null);

    const { address, isConnected } = useAccount();
    const { connect, connectors: originalConnectors } = useConnect();


    // Create customized connectors array
    const connectors = React.useMemo(() => {
        return originalConnectors.map((connector, index) => {
            // Create a new object with spread syntax to avoid mutating read-only properties
            const customConnector = { ...connector } as any;

            switch (index) {
                case 0:
                    customConnector.id = 'custom-binance';
                    customConnector.name = 'Binance Wallet';
                    customConnector.icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjMUUxRTFFIiBkPSJNMCAwaDI1NnYyNTZIMHoiLz48cGF0aCBkPSJtNzMuMTgzMyAxMjguMDI4LTIyLjU2MzIgMjIuNTY0TDI4IDEyOC4wMjhsMjIuNTYzMi0yMi41NjMgMjIuNjIwMSAyMi41NjNabTU0Ljg0NDctNTQuODQ0NyAzOC43MDUgMzguNzA1NyAyMi41NjMtMjIuNTYyOEwxMjguMDI4IDI4IDY2LjcwNDIgODkuMzI0MmwyMi41NjMyIDIyLjU2MjggMzguNzYwNi0zOC43MDM3Wm03Ny40MDkgMzIuMjgxNy0yMi41NjMgMjIuNTYzIDIyLjU2MyAyMi41NjRMMjI4IDEyOC4wMjhsLTIyLjU2My0yMi41NjNabS03Ny40MDkgNzcuNDA5LTM4LjcwMzgtMzguNzA1LTIyLjU2MzIgMjIuNTY0IDYxLjI2NyA2MS4zMjQgNjEuMjY4LTYxLjMyNC0yMi41NjMtMjIuNTY0LTM4LjcwNSAzOC43MDVabTAtMzIuMjgyIDIyLjU2NC0yMi41NjQtMjIuNTY0LTIyLjU2My0yMi42MiAyMi41NjMgMjIuNjIgMjIuNTY0WiIgZmlsbD0iI0YwQjkwQiIvPjwvc3ZnPg==';
                    customConnector.requireQRcode = true;
                    break;
                case 1:
                    customConnector.id = 'custom-trust';
                    customConnector.name = 'Trust Wallet';
                    customConnector.icon = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20width%3D%2228%22%20height%3D%2228%22%20viewBox%3D%220%200%2028%2028%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M0%200h28v28H0z%22%2F%3E%3Cpath%20fill%3D%22%230500FF%22%20d%3D%22M6%207.583%2013.53%205v17.882C8.15%2020.498%206%2015.928%206%2013.345V7.583Z%22%2F%3E%3Cpath%20fill%3D%22url(%23a)%22%20d%3D%22M22%207.583%2013.53%205v17.882c6.05-2.384%208.47-6.954%208.47-9.537V7.583Z%22%2F%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22a%22%20x1%3D%2219.768%22%20x2%3D%2214.072%22%20y1%3D%223.753%22%20y2%3D%2222.853%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%22.02%22%20stop-color%3D%22%2300F%22%2F%3E%3Cstop%20offset%3D%22.08%22%20stop-color%3D%22%230094FF%22%2F%3E%3Cstop%20offset%3D%22.16%22%20stop-color%3D%22%2348FF91%22%2F%3E%3Cstop%20offset%3D%22.42%22%20stop-color%3D%22%230094FF%22%2F%3E%3Cstop%20offset%3D%22.68%22%20stop-color%3D%22%230038FF%22%2F%3E%3Cstop%20offset%3D%22.9%22%20stop-color%3D%22%230500FF%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E%0A';
                    customConnector.requireQRcode = true;
                    break;
                case 2:
                    customConnector.id = 'custom-walletconnect';
                    customConnector.name = 'WalletConnect';
                    customConnector.icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSIjM0I5OUZDIi8+CjxwYXRoIGQ9Ik04LjM4OTY5IDEwLjM3MzlDMTEuNDg4MiA3LjI3NTM4IDE2LjUxMTggNy4yNzUzOCAxOS42MTAzIDEwLjM3MzlMMTkuOTgzMiAxMC43NDY4QzIwLjEzODIgMTAuOTAxNyAyMC4xMzgyIDExLjE1MjkgMTkuOTgzMiAxMS4zMDc4TDE4LjcwNzYgMTIuNTgzNUMxOC42MzAxIDEyLjY2MDkgMTguNTA0NSAxMi42NjA5IDE4LjQyNzEgMTIuNTgzNUwxNy45MTM5IDEyLjA3MDNDMTUuNzUyMyA5LjkwODcgMTIuMjQ3NyA5LjkwODcgMTAuMDg2MSAxMi4wNzAzTDkuNTM2NTUgMTIuNjE5OEM5LjQ1OTA5IDEyLjY5NzMgOS4zMzM1IDEyLjY5NzMgOS4yNTYwNCAxMi42MTk4TDcuOTgwMzkgMTEuMzQ0MkM3LjgyNTQ3IDExLjE4OTMgNy44MjU0NyAxMC45MzgxIDcuOTgwMzkgMTAuNzgzMkw4LjM4OTY5IDEwLjM3MzlaTTIyLjI0ODUgMTMuMDEyTDIzLjM4MzggMTQuMTQ3NEMyMy41Mzg3IDE0LjMwMjMgMjMuNTM4NyAxNC41NTM1IDIzLjM4MzggMTQuNzA4NEwxOC4yNjQ1IDE5LjgyNzdDMTguMTA5NiAxOS45ODI3IDE3Ljg1ODQgMTkuOTgyNyAxNy43MDM1IDE5LjgyNzdDMTcuNzAzNSAxOS44Mjc3IDE3LjcwMzUgMTkuODI3NyAxNy43MDM1IDE5LjgyNzdMMTQuMDcwMiAxNi4xOTQ0QzE0LjAzMTQgMTYuMTU1NyAxMy45Njg2IDE2LjE1NTcgMTMuOTI5OSAxNi4xOTQ0QzEzLjkyOTkgMTYuMTk0NCAxMy45Mjk5IDE2LjE5NDQgMTMuOTI5OSAxNi4xOTQ0TDEwLjI5NjYgMTkuODI3N0MxMC4xNDE3IDE5Ljk4MjcgOS44OTA1MyAxOS45ODI3IDkuNzM1NjEgMTkuODI3OEM5LjczNTYgMTkuODI3OCA5LjczNTYgMTkuODI3NyA5LjczNTYgMTkuODI3N0w0LjYxNjE5IDE0LjcwODNDNC40NjEyNyAxNC41NTM0IDQuNDYxMjcgMTQuMzAyMiA0LjYxNjE5IDE0LjE0NzNMNS43NTE1MiAxMy4wMTJDNS45MDY0NSAxMi44NTcgNi4xNTc2MyAxMi44NTcgNi4zMTI1NSAxMy4wMTJMOS45NDU5NSAxNi42NDU0QzkuOTg0NjggMTYuNjg0MSAxMC4wNDc1IDE2LjY4NDEgMTAuMDg2MiAxNi42NDU0QzEwLjA4NjIgMTYuNjQ1NCAxMC4wODYyIDE2LjY0NTQgMTAuMDg2MiAxNi42NDU0TDEzLjcxOTQgMTMuMDEyQzEzLjg3NDMgMTIuODU3IDE0LjEyNTUgMTIuODU3IDE0LjI4MDUgMTMuMDEyQzE0LjI4MDUgMTMuMDEyIDE0LjI4MDUgMTMuMDEyIDE0LjI4MDUgMTMuMDEyTDE3LjkxMzkgMTYuNjQ1NEMxNy45NTI2IDE2LjY4NDEgMTguMDE1NCAxNi42ODQxIDE4LjA1NDEgMTYuNjQ1NEwyMS42ODc0IDEzLjAxMkMyMS44NDI0IDEyLjg1NzEgMjIuMDkzNiAxMi44NTcxIDIyLjI0ODUgMTMuMDEyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';
                    customConnector.requireQRcode = true;
                    break;
                case 3:
                    customConnector.icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSIjMkM1RkY2Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTQgMjMuOEMxOS40MTI0IDIzLjggMjMuOCAxOS40MTI0IDIzLjggMTRDMjMuOCA4LjU4NzYxIDE5LjQxMjQgNC4yIDE0IDQuMkM4LjU4NzYxIDQuMiA0LjIgOC41ODc2MSA0LjIgMTRDNC4yIDE5LjQxMjQgOC41ODc2MSAyMy44IDE0IDIzLjhaTTExLjU1IDEwLjhDMTEuMTM1OCAxMC44IDEwLjggMTEuMTM1OCAxMC44IDExLjU1VjE2LjQ1QzEwLjggMTYuODY0MiAxMS4xMzU4IDE3LjIgMTEuNTUgMTcuMkgxNi40NUMxNi44NjQyIDE3LjIgMTcuMiAxNi44NjQyIDE3LjIgMTYuNDVWMTEuNTVDMTcuMiAxMS4xMzU4IDE2Ljg2NDIgMTAuOCAxNi40NSAxMC44SDExLjU1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';
                    break;
                default:
                    break;
            }

            return customConnector;
        });
    }, [originalConnectors]);

    const { disconnect } = useDisconnect();
    const { signMessage } = useSignMessage();
    const { signTypedData } = useSignTypedData();
    // Wallet authentication state
    const [walletAuthData, setWalletAuthData] = useState<{
        nonce: string;
        message: any;
        connector: any;
    } | null>(null);

    const [mfaCode, setMfaCode] = useState(['', '', '', '', '', '']);
    const mfaInputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [mfaStep, setMfaStep] = useState<'method' | 'qr' | 'code' | 'passkey' | 'passkey-success'>('method');
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [mfaSecret, setMfaSecret] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [uriCopied, setUriCopied] = useState(false);
    const [passkeyOptions, setPasskeyOptions] = useState<any>(null);
    const [isPasskeySupported, setIsPasskeySupported] = useState(false);
    const [passkeyLoading, setPasskeyLoading] = useState(false);

    // Track if we just initiated a wallet connection
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectingWallet, setConnectingWallet] = useState<{ name: string; id: string } | null>(null);
    const [walletError, setWalletError] = useState<string | null>(null);
    const [walletConnectUri, setWalletConnectUri] = useState<string | null>(null);
    const [walletConnectTimeout, setWalletConnectTimeout] = useState<NodeJS.Timeout | null>(null);
    const walletConnectUriReceived = useRef(false);
    const [walletAuthCompleted, setWalletAuthCompleted] = useState(false);
    const [signatureTriggered, setSignatureTriggered] = useState(false);
    const [userInitiatedWalletAuth, setUserInitiatedWalletAuth] = useState(false);
    const [isWalletLinking, setIsWalletLinking] = useState(false);
    const [walletConnectedSuccessfully, setWalletConnectedSuccessfully] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [nextView, setNextView] = useState<{ show: boolean; view?: 'loginorsignup' | 'wallet' | 'wallet-link' | 'wallet-connecting' | 'wallet-signing' | 'wallet-success' | 'wallet-error' | 'mfa' | 'link' | 'provider' | 'oauth-error' | 'oauth-loading' | 'passkey-loading' | 'passkey-signing' | 'passkey-error' } | null>(null);
    const [currentView, setCurrentView] = useState(showPopup);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const [focusedButton, setFocusedButton] = useState<string | null>(null);

    // Generate dynamic styles based on app config
    const styles = React.useMemo(() => getStyles(appConfig), [appConfig]);

    // Smooth transition function for changing popup views
    const transitionToView = (newView: { show: boolean; view?: 'loginorsignup' | 'wallet' | 'wallet-link' | 'wallet-connecting' | 'wallet-signing' | 'wallet-success' | 'wallet-error' | 'mfa' | 'link' | 'provider' | 'oauth-error' | 'oauth-loading' | 'passkey-loading' | 'passkey-signing' | 'passkey-error' }) => {
        if (isTransitioning) return; // Prevent multiple transitions

        setIsTransitioning(true);
        setNextView(newView);

        setShowPopup(newView);
        setCurrentView(newView);
        setIsTransitioning(false);
        setNextView(null);
    };

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 6);
    }, []);

    useEffect(() => {
        mfaInputRefs.current = mfaInputRefs.current.slice(0, 6);
    }, []);

    useEffect(() => {
        // Check if passkeys are supported
        const checkPasskeySupport = () => {
            if (window.PublicKeyCredential &&
                typeof window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function') {
                window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
                    .then((available) => setIsPasskeySupported(available))
                    .catch(() => setIsPasskeySupported(false));
            } else {
                setIsPasskeySupported(false);
            }
        };

        checkPasskeySupport();
    }, []);

    useEffect(() => {
        if (!initialAppConfig) {
            const fetchAppConfig = async () => {
                try {
                    const res = await axios.get(`${baseUrl}/api/apps/${appId}`, {
                        headers: { 'pr0d-app-id': appId }
                    });
                    setAppConfig(res.data.data);
                    setReady(true);
                } catch (error) {
                    console.error('Failed to fetch app configuration:', error);
                    setReady(true); // Set ready to true even if config fetch fails
                }
            };

            fetchAppConfig();
        }
    }, [appId, initialAppConfig]);

    useEffect(() => {
        try {
            const accessToken = localStorage.getItem('pr0d:access_token');
            if (accessToken) {
                const decodedToken = jwtDecode(accessToken);
                if (!decodedToken.exp || decodedToken.exp < Date.now() / 1000) {
                    localStorage.removeItem('pr0d:access_token');
                    setAccessToken(null);
                    setUser(null);
                    refreshSession();
                } else {
                    setAccessToken(accessToken);
                    getUser(accessToken);
                }
            }
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('status') === 'success';
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        const oauthCode = urlParams.get('pr0d_oauth_code');
        const oauthState = urlParams.get('pr0d_oauth_state');
        const oauthProvider = urlParams.get('pr0d_oauth_provider');

        if (oauthCode && oauthState && oauthProvider) {
            // Clean up URL parameters first
            window.history.replaceState({}, document.title, window.location.pathname);

            if (oauthCode === 'error') {
                setOauthError({ provider: oauthProvider, state: oauthState, errorMessage: error });
                setShowPopup({ show: true, view: 'oauth-error' });
            } else {
                // Show verification popup and exchange code
                setOauthLoading({ provider: oauthProvider });
                setShowPopup({ show: true, view: 'oauth-loading' });

                // Exchange the code for token
                exchangeOAuthCode(oauthCode, oauthProvider);
            }
            return;
        }

        if (success && code) {
            exchangeCodeForToken(code);
        } else if (!success && error) {
            setError(error);
        }
    }, []);

    const handleTokens = (accessToken: string, refreshToken: string, updateUser: boolean = false) => {
        if (accessToken) {
            localStorage.setItem('pr0d:access_token', accessToken);
            setAccessToken(accessToken);
            if (updateUser) {
                getUser(accessToken);
            }
        }
        if (refreshToken) {
            localStorage.setItem('pr0d:refresh_token', refreshToken);
            setRefreshToken(refreshToken);
        }
    }

    const refreshSession = async () => {
        const refreshToken = localStorage.getItem('pr0d:refresh_token');
        if (refreshToken) {
            const res = await axios.post(`${baseUrl}/api/sessions/refresh`, { refresh_token: refreshToken }, { headers: { 'pr0d-app-id': appId } });
            handleTokens(res.data.data.access_token, res.data.data.refresh_token, false);
        }
    }

    const handleInitEmail = async () => {
        if (!email) {
            setError('Email is required');
            return;
        }

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await axios.post(`${baseUrl}/api/email/init`,
                { email },
                { headers: { 'pr0d-app-id': appId } }
            );
            setStep('code');
            setTimeout(() => {
                if (inputRefs.current[0]) {
                    inputRefs.current[0].focus();
                }
            }, 100);
        } catch (e: any) {
            setError(e.response?.data?.message || 'Failed to send verification code');
        } finally {
            setLoading(false);
        }
    };

    const handleCodeInput = (index: number, value: string) => {
        if (/^[0-9]?$/.test(value)) {

            if (error) {
                setError(null);
            }

            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }

            if (value && index === 5 && newCode.every(digit => digit)) {
                if (showPopup.view === 'link') {
                    handleLinkEmailVerify(newCode.join(''));
                } else {
                    handleVerifyCode(newCode.join(''));
                }
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            if (!code[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
        else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        else if (e.key === 'ArrowRight' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split('');
            setCode(digits);
            setTimeout(() => {
                if (showPopup.view === 'link') {
                    handleLinkEmailVerify(pastedData);
                } else {
                    handleVerifyCode(pastedData);
                }
            }, 100);
        }
    };

    const handleVerifyCode = async (verificationCode?: string) => {
        const codeToVerify = verificationCode || code.join('');

        if (!codeToVerify || codeToVerify.length !== 6) {
            setError('Please enter a valid 6-digit code');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await axios.post(`${baseUrl}/api/email/auth`,
                { email, code: codeToVerify },
                { headers: { 'pr0d-app-id': appId } }
            );
            handleTokens(res.data.data.access_token, res.data.data.refresh_token, true);
            setShowPopup({ show: false });
            setStep('email');
            setCode(['', '', '', '', '', '']);
        } catch (e: any) {
            setError(e.response?.data?.message || 'Invalid verification code');
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        const refreshToken = localStorage.getItem('pr0d:refresh_token');

        if (refreshToken) {
            try {
                await axios.delete(`${baseUrl}/api/sessions/revoke`, {
                    headers: { 'pr0d-app-id': appId },
                    data: { refresh_token: refreshToken }
                });
            } catch (e: any) {
                console.error('Failed to revoke session:', e);
            }
        }

        localStorage.removeItem('pr0d:access_token');
        localStorage.removeItem('pr0d:refresh_token');
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
    };

    const exchangeCodeForToken = async (code: string) => {
        try {
            const res = await axios.get(`${baseUrl}/api/oauth/exchange`, {
                headers: { 'pr0d-app-id': appId },
                params: { code }
            });
            handleTokens(res.data.data.access_token, res.data.data.refresh_token, true);

            setShowPopup({ show: false });
            setStep('email');
            setCode(['', '', '', '', '', '']);
            window.history.replaceState({}, document.title, window.location.pathname);
        } catch (e: any) {
            setError(e.response?.data?.message || 'Failed to exchange code for token');
        }
    };

    const exchangeOAuthCode = async (code: string, provider: string) => {
        try {
            const res = await axios.get(`${baseUrl}/api/oauth/exchange`, {
                headers: { 'pr0d-app-id': appId },
                params: { code }
            });
            handleTokens(res.data.data.access_token, res.data.data.refresh_token, true);

            // Hide loading popup and clear states
            setOauthLoading(null);
            setShowPopup({ show: false });
            setStep('email');
            setCode(['', '', '', '', '', '']);
        } catch (e: any) {
            // Show error popup
            setOauthLoading(null);
            setOauthError({ provider, state: 'exchange_failed', errorMessage: e.response?.data?.message || 'Failed to verify connection' });
            setShowPopup({ show: true, view: 'oauth-error' });
            setError(e.response?.data?.message || 'Failed to verify connection');
        }
    };

    const setupMFA = async (): Promise<{ secret: string; qrCodeUrl: string }> => {
        if (!accessToken) {
            throw new Error('User must be authenticated to set up MFA');
        }

        try {
            const res = await axios.post(
                `${baseUrl}/api/mfa/init`,
                {},
                {
                    headers: {
                        'pr0d-app-id': appId,
                        'authorization': `Bearer ${accessToken}`
                    }
                }
            );
            getUser();
            return res.data.data;
        } catch (e: any) {
            throw new Error(e.response?.data?.message || 'Failed to setup MFA');
        }
    };

    const verifyMFA = async (mfaCode: string): Promise<boolean> => {
        if (!accessToken) {
            throw new Error('User must be authenticated to verify MFA');
        }

        try {
            const res = await axios.post(
                `${baseUrl}/api/mfa/link`,
                { code: mfaCode },
                {
                    headers: {
                        'pr0d-app-id': appId,
                        'authorization': `Bearer ${accessToken}`
                    }
                }
            );

            getUser();

            return true;
        } catch (e: any) {
            throw new Error(e.response?.data?.message || 'Failed to verify MFA code');
        }
    };

    const deleteMFA = async (): Promise<void> => {
        if (!accessToken) {
            throw new Error('User must be authenticated to delete MFA');
        }

        try {
            const res = await axios.delete(
                `${baseUrl}/api/mfa/delete`,
                {
                    headers: {
                        'pr0d-app-id': appId,
                        'authorization': `Bearer ${accessToken}`
                    }
                }
            );

            getUser();
        } catch (e: any) {
            throw new Error(e.response?.data?.message || 'Failed to delete MFA');
        }
    };

    const parseUser = (): User | null => {
        if (!accessToken) return null;
        try {
            return JSON.parse(atob(accessToken.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    const handleProviderLogin = async (provider: string) => {
        // Show loading popup
        setOauthLoading({ provider });
        setShowPopup({ show: true, view: 'oauth-loading' });

        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(`${baseUrl}/api/${provider}/init`, {
                headers: { 'pr0d-app-id': appId },
                params: { redirect_uri: window.location.href }
            });
            const authUrl = res.data.data;
            // Redirect to OAuth provider
            window.location.href = authUrl;
        } catch (e: any) {
            // Hide loading popup and show error
            setOauthLoading(null);
            setShowPopup({ show: false });
            setError(e.response?.data?.message || `Failed to initiate login with ${provider}`);
        } finally {
            setLoading(false);
        }
    };

    // Centralized function to reset common form states
    const resetCommonState = () => {
        setEmail('');
        setStep('email');
        setCode(['', '', '', '', '', '']);
        setError(null);
    };

    const login = () => {
        resetCommonState();
        setShowPopup({ show: true, view: 'loginorsignup' });
    };

    const triggerMfaSetup = () => {
        resetCommonState();
        setShowPopup({ show: true, view: 'mfa' });
    };

    const triggerEmailLink = () => {
        resetCommonState();
        setShowPopup({ show: true, view: 'link' });
    };

    const triggerProviderLink = () => {
        resetCommonState();
        setShowPopup({ show: true, view: 'provider' });
    };

    const triggerWalletLink = () => {
        // Always disconnect first to ensure fresh connection flow
        if (isConnected) {
            disconnect();
        }

        resetCommonState();
        setWalletError(null);
        setConnectingWallet(null);
        setIsConnecting(false);
        setWalletAuthData(null);
        setWalletAuthCompleted(false);
        setSignatureTriggered(false);
        setUserInitiatedWalletAuth(true);
        setIsWalletLinking(true); // Mark as wallet linking operation
        transitionToView({ show: true, view: 'wallet' });
    };

    const triggerPasskeySetup = () => {
        resetCommonState();
        setShowPopup({ show: true, view: 'mfa' });
        setMfaStep('passkey');
        handlePasskeySetup();
    };

    const handleWalletAuth = async () => {
        // Always disconnect first to ensure fresh connection flow and prevent auto-connect
        if (isConnected) {
            disconnect();
            // Wait for disconnect to complete before showing wallet selection
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        resetCommonState();
        setWalletError(null);
        setConnectingWallet(null);
        setIsConnecting(false);
        setWalletAuthData(null);
        setWalletAuthCompleted(false); // Reset auth completion flag
        setSignatureTriggered(false); // Reset signature trigger flag
        setUserInitiatedWalletAuth(false); // Don't mark as user-initiated until they actually click a wallet
        transitionToView({ show: true, view: 'wallet' });
    };

    const handleWalletConnect = async (connector: any) => {
        setLoading(false);
        setError(null);
        setWalletError(null);
        setIsConnecting(true);

        // Set user initiated flag here when they actually click a wallet
        setUserInitiatedWalletAuth(true);

        // Clear any existing QR code immediately to prevent showing old QR with new connector logo
        if (qrCodeRef.current) {
            qrCodeRef.current.innerHTML = '';
        }

        // Reset WalletConnect state first before setting new connector
        setWalletConnectUri(null);
        walletConnectUriReceived.current = false;

        // Clear any pending WalletConnect timeout
        if (walletConnectTimeout) {
            clearTimeout(walletConnectTimeout);
            setWalletConnectTimeout(null);
        }

        setConnectingWallet({ name: connector.name, id: connector.id });

        // Always disconnect first to ensure fresh connection
        if (isConnected) {
            disconnect();
            // Wait a bit for disconnect to complete
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Comprehensive WalletConnect detection - check multiple properties and patterns
        const isWalletConnectBased = connector.requireQRcode ? true : false;


        if (isWalletConnectBased) {

            // For WalletConnect-based wallets, show our custom QR code view
            transitionToView({ show: true, view: 'wallet-connecting' });

            // Try to get the provider first and set up event listeners
            const setupWalletConnect = async () => {
                try {
                    const provider = await connector.getProvider();

                    if (provider) {
                        // Listen for various possible events
                        const events = ['display_uri', 'qr_code_modal', 'uri', 'connect_uri'];

                        events.forEach(eventName => {
                            provider.on?.(eventName, (data: any) => {
                                if (typeof data === 'string' && data.startsWith('wc:')) {
                                    setWalletConnectUri(data);
                                    walletConnectUriReceived.current = true;
                                    // Clear the fallback timeout since we got the URI
                                    if (walletConnectTimeout) {
                                        clearTimeout(walletConnectTimeout);
                                        setWalletConnectTimeout(null);
                                    }
                                } else if (data?.uri && typeof data.uri === 'string') {
                                    setWalletConnectUri(data.uri);
                                    walletConnectUriReceived.current = true;
                                    // Clear the fallback timeout since we got the URI
                                    if (walletConnectTimeout) {
                                        clearTimeout(walletConnectTimeout);
                                        setWalletConnectTimeout(null);
                                    }
                                }
                            });
                        });

                        // Also try to access the connector directly
                        if (provider.connector) {
                            events.forEach(eventName => {
                                provider.connector.on?.(eventName, (data: any) => {
                                    if (typeof data === 'string' && data.startsWith('wc:')) {
                                        setWalletConnectUri(data);
                                        walletConnectUriReceived.current = true;
                                        // Clear the fallback timeout since we got the URI
                                        if (walletConnectTimeout) {
                                            clearTimeout(walletConnectTimeout);
                                            setWalletConnectTimeout(null);
                                        }
                                    } else if (data?.uri && typeof data.uri === 'string') {
                                        setWalletConnectUri(data.uri);
                                        walletConnectUriReceived.current = true;
                                        // Clear the fallback timeout since we got the URI
                                        if (walletConnectTimeout) {
                                            clearTimeout(walletConnectTimeout);
                                            setWalletConnectTimeout(null);
                                        }
                                    }
                                });
                            });
                        }
                    }
                } catch (error) {
                    console.error('Failed to setup WalletConnect provider:', error);
                }
            };

            setupWalletConnect();

            connect(
                { connector },
                {
                    onError: (error: any) => {
                        console.error('WalletConnect error:', error);
                        setWalletError('Failed to connect with WalletConnect');
                        setIsConnecting(false);
                        setWalletConnectUri(null);
                        setUserInitiatedWalletAuth(false); // Reset flag on error
                        transitionToView({ show: true, view: 'wallet-error' });
                    }
                }
            );

            // Fallback: Try to get URI after a short delay
            const timeoutId = setTimeout(async () => {
                // Check if we've received a URI using the ref

                if (!walletConnectUriReceived.current) {
                    try {
                        const provider = await connector.getProvider();

                        // Try different ways to access the URI
                        if (provider?.connector?.uri) {
                            setWalletConnectUri(provider.connector.uri);
                            walletConnectUriReceived.current = true;
                        } else if (provider?.uri) {
                            setWalletConnectUri(provider.uri);
                            walletConnectUriReceived.current = true;
                        } else if (provider?.session?.uri) {
                            setWalletConnectUri(provider.session.uri);
                            walletConnectUriReceived.current = true;
                        } else {
                            setWalletError('Unable to generate QR code. Please try again.');
                            setShowPopup({ show: true, view: 'wallet-error' });
                        }
                    } catch (error) {
                        console.error('Fallback URI check failed:', error);
                        setWalletError('Failed to initialize wallet connection. Please try again.');
                        setShowPopup({ show: true, view: 'wallet-error' });
                    }
                } else {
                    // console.log('URI already exists, skipping fallback');
                }
                setWalletConnectTimeout(null);
            }, 50000); // Increased timeout to 3 seconds for better reliability

            setWalletConnectTimeout(timeoutId);

            return;
        }

        // For non-WalletConnect wallets (like injected MetaMask), show connecting view
        setShowPopup({ show: true, view: 'wallet-connecting' });

        connect(
            { connector },
            {
                onError: (error: any) => {
                    console.error('Connection error:', error);
                    let errorMessage = 'Failed to connect wallet';

                    // Check for various rejection patterns
                    const errorString = error.message || error.toString();
                    if (errorString.includes('rejected') ||
                        errorString.includes('denied') ||
                        errorString.includes('User rejected') ||
                        errorString.includes('user rejected') ||
                        errorString.includes('User denied') ||
                        errorString.includes('cancelled') ||
                        errorString.includes('canceled') ||
                        (error.code && (error.code === 4001 || error.code === 'ACTION_REJECTED'))) {
                        errorMessage = 'You rejected the request';
                    } else if (errorString.includes('install') || errorString.includes('not found')) {
                        errorMessage = `${connector.name} not found. Please install the extension.`;
                    }

                    setWalletError(errorMessage);
                    setIsConnecting(false);
                    setUserInitiatedWalletAuth(false); // Reset flag on error
                    setShowPopup({ show: true, view: 'wallet-error' });
                }
            }
        );
    };

    // Initialize wallet authentication
    const initWalletAuth = async (address: string) => {
        try {
            const headers: any = { 'pr0d-app-id': appId };

            // Include Authorization header if user is authenticated (for linking)
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }

            const res = await axios.post(`${baseUrl}/api/wallet/init`, {
                address: address,
                uri: window.location.origin,
                version: '1',
                chainId: 1 // You might want to get this dynamically
            }, {
                headers
            });

            return {
                nonce: res.data.data.nonce,
                message: res.data.data.message
            };
        } catch (e: any) {
            throw new Error(e.response?.data?.message || 'Failed to initialize wallet authentication');
        }
    };

    // Authenticate with wallet signature
    const authenticateWallet = async (signature: string, nonce: string) => {
        try {
            const res = await axios.post(`${baseUrl}/api/wallet/auth`, {
                signature,
                nonce
            }, {
                headers: { 'pr0d-app-id': appId }
            });

            handleTokens(res.data.data.access_token, res.data.data.refresh_token, true);

            closePopup();

            // Mark wallet auth as completed to prevent re-triggering
            setWalletAuthCompleted(true);

            return true;
        } catch (e: any) {
            console.error('Authentication API error:', e.response?.data || e.message);
            throw new Error(e.response?.data?.message || 'Failed to authenticate wallet');
        }
    };

    // Handle wallet signature
    const handleWalletSignature = async () => {
        if (!walletAuthData) {
            return;
        }

        setLoading(true);
        setError(null);

        // Show signing popup
        setShowPopup({ show: true, view: 'wallet-signing' });

        try {
            // Use the ERC-4361 components from the backend
            const components = walletAuthData.message;

            // Create ERC-4361 (Sign-In with Ethereum) compliant message
            const siweMessage = `${components.domain} wants you to sign in with your Ethereum account:
${components.address}

${components.statement}

URI: ${components.uri}
Version: ${components.version}
Chain ID: ${components.chainId}
Nonce: ${components.nonce}
Issued At: ${components.issuedAt}`;


            signMessage(
                { message: siweMessage },
                {
                    onSuccess: async (signature) => {
                        try {
                            if (isWalletLinking) {
                                await linkWallet(signature, walletAuthData.nonce);
                                closePopup();
                                // Reset linking state
                                setIsWalletLinking(false);
                                setWalletAuthCompleted(true);
                            } else {
                                await authenticateWallet(signature, walletAuthData.nonce);
                            }
                        } catch (e: any) {
                            console.error('Wallet operation error:', e);
                            setError(e.message);
                            setShowPopup({ show: true, view: 'wallet-error' });
                        }
                    },
                    onError: (error) => {
                        console.error('Signature error:', error);
                        let errorMessage = 'Failed to sign message';
                        if (error.message?.includes('rejected') || error.message?.includes('denied')) {
                            errorMessage = 'Signature rejected by user';
                        }
                        setWalletError(errorMessage);
                        setShowPopup({ show: true, view: 'wallet-error' });
                    }
                }
            );
        } catch (e: any) {
            console.error('Signature setup error:', e);
            setError(e.message || 'Failed to sign message');
            setShowPopup({ show: true, view: 'wallet-error' });
        } finally {
            setLoading(false);
        }
    };

    // Track if we just initiated a wallet connection
    useEffect(() => {


        // When wallet connects successfully, proceed to authentication
        // Only trigger if user explicitly initiated wallet auth and we haven't already completed auth for this address
        if (isConnected && address && userInitiatedWalletAuth && !walletAuthCompleted) {

            // First show wallet connected successfully state
            setWalletConnectedSuccessfully(true);
            setShowPopup({ show: true, view: 'wallet-success' });

            // Add a small delay to ensure wallet is fully connected, especially for deep links
            const initAuthWithDelay = async () => {
                try {
                    // Wait a bit longer for mobile wallet connections (like Binance) to stabilize
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Show success for 1.5 seconds

                    const authData = await initWalletAuth(address);
                    setWalletAuthData({
                        ...authData,
                        connector: connectingWallet || { name: 'Wallet' }
                    });

                    // Note: handleWalletSignature will be triggered by the useEffect that watches walletAuthData

                    // Reset connecting state since we're now in auth phase
                    setIsConnecting(false);
                    setWalletConnectedSuccessfully(false);
                } catch (e: any) {
                    console.error('Wallet auth initialization error:', e);
                    setWalletError(e.message);
                    setShowPopup({ show: true, view: 'wallet-error' });
                    setIsConnecting(false);
                    setWalletConnectedSuccessfully(false);
                }
            };

            initAuthWithDelay();
        }
    }, [isConnected, address, userInitiatedWalletAuth, walletAuthCompleted]);

    // Trigger wallet signature when walletAuthData is set
    useEffect(() => {
        if (walletAuthData && userInitiatedWalletAuth && !walletAuthCompleted) {    
            handleWalletSignature();
        }
    }, [walletAuthData, userInitiatedWalletAuth, walletAuthCompleted]);

    const handleLinkEmailInit = async () => {
        if (!email) {
            setError('Email is required');
            return;
        }

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await initEmailLink(email);
            setStep('code');
            setTimeout(() => {
                if (inputRefs.current[0]) {
                    inputRefs.current[0].focus();
                }
            }, 100);
        } catch (e: any) {
            setError(e.message || 'Failed to send verification code');
        } finally {
            setLoading(false);
        }
    };

    const handleLinkEmailVerify = async (verificationCode?: string) => {
        const codeToVerify = verificationCode || code.join('');

        if (!codeToVerify || codeToVerify.length !== 6) {
            setError('Please enter a valid 6-digit code');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await linkEmail(email, codeToVerify);
            setShowPopup({ show: false });
            setStep('email');
            setCode(['', '', '', '', '', '']);
            setEmail('');
        } catch (e: any) {
            setError(e.message || 'Failed to link email');
        } finally {
            setLoading(false);
        }
    };

    const fetchMfaSetup = async () => {
        setLoading(true);
        setError(null);
        try {
            const { secret, qrCodeUrl } = await setupMFA();
            setQrCodeUrl(qrCodeUrl);
            setMfaSecret(secret);
            setMfaStep('qr');
        } catch (error) {
            setError('Failed to load MFA setup.');
        } finally {
            setLoading(false);
        }
    };

    // Generate QR code with rounded corners
    useEffect(() => {
        if (qrCodeRef.current) {
            let qrData = '';
            let isWalletConnect = false;
            let walletLogo = null;

            // Check if this is for MFA
            if (mfaStep === 'qr' && (mfaSecret || qrCodeUrl)) {
                qrData = getTotpUrl() || '';
            }
            // Check if this is for WalletConnect
            else if (walletConnectUri) {
                qrData = walletConnectUri;
                isWalletConnect = true;

                // Get the wallet icon from the connecting wallet
                if (connectingWallet) {
                    const matchingConnector = connectors.find(c => c.id === connectingWallet.id);
                    if (matchingConnector && matchingConnector.icon) {
                        walletLogo = matchingConnector.icon;
                    }
                }
            }

            if (qrData) {
                // Determine the image to use in QR code
                let qrImage = undefined;

                if (isWalletConnect && walletLogo) {
                    qrImage = walletLogo;
                } else if (!isWalletConnect) {
                    qrImage = "data:image/svg+xml;base64," + btoa(`
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="12" fill="white"/>
                            <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z" fill="#666"/>
                            <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    `);
                }

                const qrCode = new QRCodeStyling({
                    width: 200,
                    height: 200,
                    type: "svg",
                    data: qrData,
                    image: qrImage,
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
                        imageSize: (isWalletConnect && walletLogo) ? 0.2 : (!isWalletConnect ? 0.15 : 0)
                    }
                });

                // Clear previous QR code and append new one
                qrCodeRef.current.innerHTML = '';
                qrCode.append(qrCodeRef.current);
            }
        }
    }, [mfaStep, mfaSecret, qrCodeUrl, walletConnectUri, connectingWallet, connectors]);

    // Auto-focus first MFA input when reaching code step
    useEffect(() => {
        if (mfaStep === 'code' && mfaInputRefs.current[0]) {
            setTimeout(() => {
                mfaInputRefs.current[0]?.focus();
            }, 100);
        }
    }, [mfaStep]);

    // Helper function to extract TOTP URL from QR code URL or create it
    const getTotpUrl = () => {
        if (qrCodeUrl && qrCodeUrl.includes('otpauth://')) {
            // Extract the otpauth URL from the QR code URL if it's embedded
            const match = qrCodeUrl.match(/otpauth:\/\/[^&\s]+/);
            if (match) return decodeURIComponent(match[0]);
        }

        // Generate TOTP URL from secret if available
        if (mfaSecret) {
            const user = parseUser();
            const email = user?.email?.email || 'user';
            const issuer = appConfig?.name || 'pr0d.io';
            return `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(email)}?secret=${mfaSecret}&issuer=${encodeURIComponent(issuer)}`;
        }

        return qrCodeUrl;
    };

    const handleMfaCodeInput = (index: number, value: string) => {
        if (/^[0-9]?$/.test(value)) {
            const newCode = [...mfaCode];
            newCode[index] = value;
            setMfaCode(newCode);

            if (value && index < 5) {
                mfaInputRefs.current[index + 1]?.focus();
            }

            if (!value && index > 0) {
                mfaInputRefs.current[index - 1]?.focus();
            }

            if (newCode.every(digit => digit)) {
                handleVerifyMfaCode(newCode.join(''));
            }
        }
    };

    const handleVerifyMfaCode = async (code: string) => {
        setLoading(true);
        setError(null);

        try {
            const success = await verifyMFA(code);
            if (success) {
                setShowPopup({ show: false });
                setMfaStep('qr');
                setMfaCode(['', '', '', '', '', '']);
            } else {
                setError('Invalid MFA code.');
            }
        } catch (error) {
            setError('Failed to verify MFA code.');
        } finally {
            setLoading(false);
        }
    };

    const copySetupKey = async () => {
        if (mfaSecret) {
            try {
                await navigator.clipboard.writeText(mfaSecret);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = mfaSecret;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        }
    };

    const copyWalletConnectUri = async () => {
        if (walletConnectUri) {
            try {
                await navigator.clipboard.writeText(walletConnectUri);
                setUriCopied(true);
                setTimeout(() => setUriCopied(false), 2000);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = walletConnectUri;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                setUriCopied(true);
                setTimeout(() => setUriCopied(false), 2000);
            }
        }
    };

    const closePopup = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setShowPopup({ show: false });
            setMfaStep('method');
            setMfaCode(['', '', '', '', '', '']);
            setQrCodeUrl(null);
            setMfaSecret(null);
            setCopied(false);
            setUriCopied(false);
            setError(null);
            setStep('email');
            setEmail('');
            setCode(['', '', '', '', '', '']);
            setOauthError(null);
            setOauthLoading(null);
            setWalletConnectUri(null);
            walletConnectUriReceived.current = false;
            setWalletError(null);
            setConnectingWallet(null);
            setIsConnecting(false);
            setSignatureTriggered(false); // Reset signature trigger flag
            setUserInitiatedWalletAuth(false); // Reset user-initiated flag
            setIsWalletLinking(false); // Reset wallet linking flag
            setWalletAuthData(null); // Clear wallet auth data

            // Clear any pending WalletConnect timeout
            if (walletConnectTimeout) {
                clearTimeout(walletConnectTimeout);
                setWalletConnectTimeout(null);
            }

            // If we're in an incomplete wallet connection state, or if we just completed wallet linking, disconnect to clean up
            if (isConnected && (walletAuthData && !accessToken || isWalletLinking)) {

                disconnect();
                // Reset completion flag for fresh start
                setWalletAuthCompleted(false);
            }

            setIsAnimating(false);
        }, 200);
    };

    /**
     * Initiates the email linking process by sending a verification code to the provided email.
     * This must be called first before linkEmail().
     * 
     * @param email - The email address to link to the current user account
     * @throws {Error} If user is not authenticated or email is invalid
     */
    const initEmailLink = async (email: string): Promise<void> => {
        if (!accessToken) {
            throw new Error('User must be authenticated to initiate email linking');
        }

        if (!email) {
            throw new Error('Email is required');
        }

        if (!isValidEmail(email)) {
            throw new Error('Please enter a valid email address');
        }

        try {
            await axios.post(
                `${baseUrl}/api/email/init`,
                { email: email.trim().toLowerCase() },
                {
                    headers: {
                        'pr0d-app-id': appId,
                        'authorization': `Bearer ${accessToken}`
                    }
                }
            );
        } catch (e: any) {
            throw new Error(e.response?.data?.message || 'Failed to initiate email linking');
        }
    };

    /**
     * Links an email to the current authenticated user after verification.
     * Must call initEmailLink() first to receive the verification code.
     * 
     * @param email - The email address (must match the one used in initEmailLink)
     * @param code - The 6-digit verification code received via email
     * @returns Promise<boolean> - Returns true if linking was successful
     * @throws {Error} If user is not authenticated, email is invalid, or code verification fails
     * 
     * @example
     * ```typescript
     * // First, initiate the email linking process
     * await initEmailLink('user@example.com');
     * 
     * // Then, after user receives the code, link the email
     * const success = await linkEmail('user@example.com', '123456');
     * ```
     */
    const linkEmail = async (email: string, code: string): Promise<boolean> => {
        if (!accessToken) {
            throw new Error('User must be authenticated to link email');
        }

        if (!email || !code) {
            throw new Error('Email and code are required');
        }

        if (!isValidEmail(email)) {
            throw new Error('Please enter a valid email address');
        }

        if (code.length !== 6) {
            throw new Error('Code must be 6 digits');
        }

        try {
            const res = await axios.post(
                `${baseUrl}/api/email/link`,
                { email: email.trim().toLowerCase(), code },
                {
                    headers: {
                        'pr0d-app-id': appId,
                        'authorization': `Bearer ${accessToken}`
                    }
                }
            );

            getUser();

            return true;
        } catch (e: any) {
            throw new Error(e.response?.data?.message || 'Failed to link email');
        }
    };

    /**
     * Links a social provider (Google, Discord, or X) to the current authenticated user.
     * This will redirect the user to the provider's OAuth flow and link the account upon successful authorization.
     * 
     * @param provider - The social provider to link ('google', 'discord', or 'x')
     * @throws {Error} If user is not authenticated or provider is not supported by the app
     * 
     * @example
     * ```typescript
     * // Link Google account
     * await linkProvider('google');
     * 
     * // Link Discord account  
     * await linkProvider('discord');
     * 
     * // Link X (Twitter) account
     * await linkProvider('x');
     * ```
     */
    const linkProvider = async (provider: 'google' | 'discord' | 'x'): Promise<void> => {
        if (!accessToken) {
            throw new Error('User must be authenticated to link provider');
        }

        if (!appConfig) {
            throw new Error('App configuration not loaded');
        }

        // Check if the app supports this provider
        if (!appConfig[provider]) {
            throw new Error(`${provider} is not enabled for this app`);
        }

        try {
            const res = await axios.get(`${baseUrl}/api/${provider}/init`, {
                headers: {
                    'pr0d-app-id': appId,
                    'authorization': `Bearer ${accessToken}`
                },
                params: { redirect_uri: window.location.href }
            });
            const authUrl = res.data.data;
            window.location.href = authUrl;
        } catch (e: any) {
            throw new Error(e.response?.data?.message || `Failed to initiate linking with ${provider}`);
        }
    };

    const unlinkProvider = async (provider: 'google' | 'discord' | 'x'): Promise<void> => {
        if (!accessToken) {
            throw new Error('User must be authenticated to unlink provider');
        }

        if (!appConfig) {
            throw new Error('App configuration not loaded');
        }

        // Check if the app supports this provider
        if (!appConfig[provider]) {
            throw new Error(`${provider} is not enabled for this app`);
        }

        try {
            const res = await axios.delete(`${baseUrl}/api/${provider}/delete`, {
                headers: {
                    'pr0d-app-id': appId,
                    'authorization': `Bearer ${accessToken}`
                }
            });

            getUser();
        } catch (e: any) {
            throw new Error(e.response?.data?.message || `Failed to unlink ${provider}`);
        }
    };

    const linkWallet = async (signature: string, nonce: string): Promise<boolean> => {
        if (!accessToken) {
            throw new Error('User must be authenticated to link wallet');
        }

        try {
            const res = await axios.post(`${baseUrl}/api/wallet/link`, {
                signature,
                nonce
            }, {
                headers: {
                    'pr0d-app-id': appId,
                    'authorization': `Bearer ${accessToken}`
                }
            });
            getUser();
            return true;
        } catch (e: any) {
            throw new Error(e.response?.data?.message || 'Failed to link wallet');
        }
    };

    const unlinkWallet = async (walletAddress: string): Promise<void> => {
        if (!accessToken) {
            throw new Error('User must be authenticated to unlink wallet');
        }

        try {
            const res = await axios.delete(`${baseUrl}/api/wallet/delete`, {
                headers: {
                    'pr0d-app-id': appId,
                    'authorization': `Bearer ${accessToken}`
                },
                data: { address: walletAddress }
            });

            // If the wallet being unlinked is currently connected, disconnect it
            if (isConnected && address && walletAddress.toLowerCase() === address.toLowerCase()) {
                disconnect();
                // Reset wallet auth state to prevent issues with future connections
                setWalletAuthCompleted(false);
                setWalletAuthData(null);
                setUserInitiatedWalletAuth(false);
                setConnectingWallet(null);
                setWalletError(null);
            }

            getUser();
        } catch (e: any) {
            throw new Error(e.response?.data?.message || 'Failed to unlink wallet');
        }
    };

    // Individual link functions for custom buttons
    const linkGoogle = async (): Promise<void> => {
        return linkProvider('google');
    };

    const linkDiscord = async (): Promise<void> => {
        return linkProvider('discord');
    };

    const linkX = async (): Promise<void> => {
        return linkProvider('x');
    };

    // Helper function to format passkey options for WebAuthn API
    const formatPasskeyOptions = (options: any) => {

        if (!options) {
            throw new Error('Options is undefined');
        }

        if (options.user) {
            // Registration options
            return {
                ...options,
                user: {
                    ...options.user,
                    id: base64urlToUint8Array(options.user.id)
                },
                challenge: base64urlToUint8Array(options.challenge),
                excludeCredentials: options.excludeCredentials?.map((cred: any) => ({
                    ...cred,
                    id: base64urlToUint8Array(cred.id)
                })) || []
            };
        } else {
            // Authentication options
            return {
                ...options,
                challenge: base64urlToUint8Array(options.challenge),
                allowCredentials: options.allowCredentials?.map((cred: any) => ({
                    ...cred,
                    id: base64urlToUint8Array(cred.id)
                })) || []
            };
        }
    };

    const handlePasskeySetup = async () => {
        if (!isPasskeySupported) {
            setError('Passkeys are not supported on this device');
            return;
        }

        setPasskeyLoading(true);
        setError(null);

        try {
            const { options } = await initPasskey();
            const formattedOptions = formatPasskeyOptions(options);
            setPasskeyOptions(formattedOptions);
            setMfaStep('passkey');

            // Automatically trigger passkey creation
            setTimeout(async () => {
                try {
                    const credential = await navigator.credentials.create({
                        publicKey: formattedOptions
                    });

                    if (credential) {
                        const result = await verifyPasskey(credential);
                        if (result.type === 'registration') {
                            setMfaStep('passkey-success');
                            // Close popup after delay
                            setTimeout(() => {
                                closePopup();
                            }, 2000);
                        }
                    }
                } catch (err: any) {
                    console.error('Passkey creation failed:', err);
                    setError(err.message || 'Failed to create passkey');
                    setMfaStep('method');
                }
                setPasskeyLoading(false);
            }, 500);

        } catch (err: any) {
            console.error('Passkey setup failed:', err);
            setError(err.message || 'Failed to setup passkey');
            setPasskeyLoading(false);
        }
    };

    const handlePasskeyLogin = async () => {
        if (!isPasskeySupported) {
            setError('Passkeys are not supported on this device');
            return;
        }

        // Show loading popup
        setPasskeyError(null);
        setShowPopup({ show: true, view: 'passkey-loading' });

        try {
            // Get authentication options from backend
            const { options } = await initPasskey();
            const formattedOptions = formatPasskeyOptions(options);

            // Trigger passkey authentication
            const credential = await navigator.credentials.get({
                publicKey: formattedOptions
            });

            if (credential) {
                // Show signing state while server verifies
                setShowPopup({ show: true, view: 'passkey-signing' });
                await verifyPasskey(credential);
                // verifyPasskey will close the popup if authentication succeeds
            }
        } catch (err: any) {
            console.error('Passkey login failed:', err);
            setPasskeyError(err.message || 'Failed to login with passkey');
            setShowPopup({ show: true, view: 'passkey-error' });
        }
    };

    const initPasskey = async (userHandle?: string): Promise<{ options: any; type: 'registration' | 'authentication' }> => {
        const body: any = {};
        if (userHandle) {
            body.userHandle = userHandle;
        }

        const response = await fetch(`${baseUrl}/api/passkeys/init`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'pr0d-app-id': appId,
                ...(accessToken && { 'authorization': `Bearer ${accessToken}` })
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to initialize passkey');
        }

        const data = await response.json();

        // The backend wraps the response in a data object
        const responseData = data.data || data;
        return {
            options: responseData.options,
            type: responseData.type
        };
    };

    const verifyPasskey = async (credential: any): Promise<{ type: 'registration' | 'authentication'; user?: User; accessToken?: string; refreshToken?: string; message: string }> => {
        const deviceName = getDeviceName();

        const response = await fetch(`${baseUrl}/api/passkeys/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'pr0d-app-id': appId,
                ...(accessToken && { 'authorization': `Bearer ${accessToken}` })
            },
            body: JSON.stringify({
                credential,
                deviceName
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to verify passkey');
        }

        const data = await response.json();

        // The backend wraps the response in a data object
        const responseData = data.data || data;

        // If this was an authentication (login), handle tokens
        if (responseData.type === 'authentication' && responseData.access_token) {
            handleTokens(responseData.access_token, responseData.refresh_token, true);
            closePopup();
        }

        if (responseData.type === 'registration') {
            getUser();
            closePopup();
        }

        return {
            type: responseData.type,
            user: responseData.user,
            accessToken: responseData.access_token || responseData.accessToken,
            refreshToken: responseData.refresh_token || responseData.refreshToken,
            message: responseData.message
        };
    };

    const listPasskeys = async (): Promise<{ passkeys: any[]; count: number }> => {
        if (!accessToken) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${baseUrl}/api/passkeys/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'pr0d-app-id': appId,
                'authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to list passkeys');
        }

        const data = await response.json();
        return {
            passkeys: data.passkeys,
            count: data.count
        };
    };

    const deletePasskey = async (credentialId: string): Promise<void> => {
        if (!accessToken) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${baseUrl}/api/passkeys/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'pr0d-app-id': appId,
                'authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ credentialId })
        });

        getUser();

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete passkey');
        }
    };

    const getUser = async (token?: string): Promise<User> => {
        const tokenToUse = token || accessToken;
        if (!tokenToUse) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${baseUrl}/api/sessions/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'pr0d-app-id': appId,
                'authorization': `Bearer ${tokenToUse}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch user data');
        }

        const data = await response.json();
        const userData = data.data;
        setUser(userData);
        return userData;
    };

    const teeSignMessage = async (message: string): Promise<{ signature: string; address: string; message: string }> => {
        if (!accessToken) {
            throw new Error('User not authenticated');
        }

        try {
            const response = await fetch(`${baseUrl}/api/tee/sign-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${accessToken}`,
                    'pr0d-app-id': appId
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to sign message');
            }

            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error signing message:', error);
            throw error;
        }
    };

    const createTransaction = async (txData: { to: string; value?: string; data?: string; gasLimit?: string; maxFeePerGas?: string; maxPriorityFeePerGas?: string; chainId: number }): Promise<{ transactionId: string; userAddress: string; txData: any; expiresAt: string }> => {
        if (!accessToken) {
            throw new Error('User not authenticated');
        }

        try {
            const response = await fetch(`${baseUrl}/api/transactions/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${accessToken}`,
                    'pr0d-app-id': appId
                },
                body: JSON.stringify(txData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create transaction');
            }

            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error creating transaction:', error);
            throw error;
        }
    };

    const getTransaction = async (transactionId: string): Promise<{ transactionId: string; userAddress: string; txData: any; status: string; createdAt: string; sponsorTxHash?: string }> => {
        try {
            const response = await fetch(`${baseUrl}/api/transactions/${transactionId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'pr0d-app-id': appId
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to get transaction');
            }

            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error getting transaction:', error);
            throw error;
        }
    };

    const sponsorTransaction = async (transactionId: string, sponsorPrivateKey: string, rpcUrl: string, nonce?: number): Promise<{ txHash: string; sponsorAddress: string; status: string; transactionId: string }> => {
        try {
            const response = await fetch(`${baseUrl}/api/transactions/${transactionId}/sponsor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'pr0d-app-id': appId
                },
                body: JSON.stringify({ sponsorPrivateKey, rpcUrl, nonce })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to sponsor transaction');
            }

            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error sponsoring transaction:', error);
            throw error;
        }
    };

    const getPendingTransactions = async (): Promise<{ transactions: any[]; count: number }> => {
        if (!accessToken) {
            throw new Error('User not authenticated');
        }

        try {
            const response = await fetch(`${baseUrl}/api/transactions/user/pending`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${accessToken}`,
                    'pr0d-app-id': appId
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to get pending transactions');
            }

            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error getting pending transactions:', error);
            throw error;
        }
    };

    const contextValue: AuthContextType = {
        accessToken,
        isAuthenticated: !!accessToken,
        user,
        ready,
        logout,
        login,
        triggerMfaSetup,
        triggerEmailLink,
        triggerProviderLink,
        triggerWalletLink,
        triggerPasskeySetup,
        setupMFA,
        verifyMFA,
        deleteMFA,
        initEmailLink,
        linkEmail,
        linkProvider,
        unlinkProvider,
        linkWallet,
        unlinkWallet,
        linkGoogle,
        linkDiscord,
        linkX,
        initPasskey,
        verifyPasskey,
        listPasskeys,
        deletePasskey,
        getUser,
        teeSignMessage,
        createTransaction,
        getTransaction,
        sponsorTransaction,
        getPendingTransactions
    };

    return (
        <AuthContext.Provider value={contextValue}>
            <div>
                {showPopup.show && (
                    <div
                        style={styles.overlay}
                        onClick={(e) => {
                            // Only close if clicking on the overlay itself, not the popup content
                            if (e.target === e.currentTarget) {
                                closePopup();
                            }
                        }}
                    >
                        <div style={{
                            ...styles.modal,
                            transform: isAnimating ? 'translateY(-20px)' : 'translateY(0)',
                            opacity: isAnimating ? 0 : 1,
                            transition: 'width 0.3s ease-out, height 0.3s ease-out, transform 0.3s ease-out, opacity 0.3s ease-out'
                        }}>
                            <button
                                style={styles.close}
                                onClick={closePopup}
                                data-pr0d-close="true"
                            >
                                <CloseIcon style={{ width: 16, height: 16 }} />
                            </button>
                            {((showPopup.view === 'loginorsignup' && step === 'code') ||
                                (showPopup.view === 'link' && step === 'code') ||
                                (showPopup.view === 'wallet') ||
                                (showPopup.view === 'wallet-connecting') ||
                                (showPopup.view === 'wallet-signing') ||
                                (showPopup.view === 'wallet-success') ||
                                (showPopup.view === 'wallet-error') ||
                                (showPopup.view === 'oauth-error') ||
                                (showPopup.view === 'mfa' && (mfaStep === 'qr' || mfaStep === 'code'))) && (
                                    <button
                                        style={styles.backArrow}
                                        data-pr0d-back="true"
                                        onClick={() => {
                                            if (showPopup.view === 'loginorsignup') {
                                                setStep('email');
                                                setError(null);
                                                setCode(['', '', '', '', '', '']);
                                            } else if (showPopup.view === 'link') {
                                                setStep('email');
                                                setError(null);
                                                setCode(['', '', '', '', '', '']);
                                            } else if (showPopup.view === 'wallet') {
                                                setError(null);
                                                setWalletError(null);
                                                setConnectingWallet(null);
                                                setIsWalletLinking(false);
                                                if (isWalletLinking) {
                                                    // If wallet linking, go back to provider linking view
                                                    transitionToView({ show: true, view: 'provider' });
                                                } else {
                                                    // If wallet auth, go back to login/signup
                                                    transitionToView({ show: true, view: 'loginorsignup' });
                                                }
                                            } else if (showPopup.view === 'wallet-connecting') {
                                                setError(null);
                                                setWalletError(null);
                                                setIsConnecting(false);
                                                setConnectingWallet(null);
                                                disconnect();
                                                transitionToView({ show: true, view: 'wallet' });
                                            } else if (showPopup.view === 'wallet-signing') {
                                                // Cancel the signature process and go back to wallet selection
                                                disconnect();
                                                setWalletError(null);
                                                setWalletAuthData(null);
                                                setIsConnecting(false);
                                                setConnectingWallet(null);
                                                transitionToView({ show: true, view: 'wallet' });
                                            } else if (showPopup.view === 'wallet-success') {
                                                // Go back to wallet selection
                                                setWalletConnectedSuccessfully(false);
                                                setConnectingWallet(null);
                                                setIsConnecting(false);
                                                disconnect();
                                                transitionToView({ show: true, view: 'wallet' });
                                            } else if (showPopup.view === 'wallet-error') {
                                                setWalletError(null);
                                                setConnectingWallet(null);
                                                setIsConnecting(false);
                                                disconnect();
                                                // Go back to wallet selection
                                                transitionToView({ show: true, view: 'wallet' });
                                            } else if (showPopup.view === 'oauth-error') {
                                                // Clear OAuth error and go back to login view
                                                setOauthError(null);
                                                setStep('email');
                                                setError(null);
                                                transitionToView({ show: true, view: 'loginorsignup' });
                                            } else if (showPopup.view === 'mfa') {
                                                if (mfaStep === 'code') {
                                                    setMfaStep('qr');
                                                } else if (mfaStep === 'qr') {
                                                    setMfaStep('method');
                                                }
                                                setError(null);
                                                setMfaCode(['', '', '', '', '', '']);
                                            }
                                        }}
                                    >
                                        <ArrowBackIcon style={{ width: 16, height: 16 }} />
                                    </button>
                                )}

                            {showPopup.view == 'loginorsignup' && step === 'email' ? <h3 style={styles.title}>Log in or sign up</h3> : null}
                            {showPopup.view == 'loginorsignup' && step === 'code' ? <h3 style={styles.title}>Enter confirmation code</h3> : null}
                            {showPopup.view == 'wallet' ? <h3 style={styles.title}>{isWalletLinking ? 'Link Wallet' : 'Connect Wallet'}</h3> : null}
                            {showPopup.view == 'wallet-connecting' ? <h3 style={styles.title}>Requesting Connection</h3> : null}
                            {showPopup.view == 'wallet-signing' ? <h3 style={styles.title}>Sign to verify</h3> : null}

                            {showPopup.view == 'wallet-success' ? <h3 style={styles.title}>Wallet Connected</h3> : null}
                            {showPopup.view == 'wallet-error' ? <h3 style={styles.title}>Connection Failed</h3> : null}
                            {showPopup.view == 'link' && step === 'email' ? <h3 style={styles.title}>Link your Email</h3> : null}
                            {showPopup.view == 'link' && step === 'code' ? <h3 style={styles.title}>Enter confirmation code</h3> : null}
                            {showPopup.view == 'provider' ? <h3 style={styles.title}>Link Social Account</h3> : null}
                            {showPopup.view == 'oauth-error' ? null : null}
                            {showPopup.view === 'mfa' && mfaStep === 'method' && (
                                <>
                                    <div style={styles.shieldIcon}>
                                        <svg viewBox="0 0 24 24" fill={appConfig?.accent || "#666"} style={{ width: 48, height: 48 }}>
                                            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
                                        </svg>
                                    </div>
                                    <h3 style={styles.title}>Choose a verification method</h3>
                                    <p style={styles.subtitle}>How would you like to verify your identity? You can change this later.</p>
                                </>
                            )}
                            {showPopup.view === 'loginorsignup' && (
                                <div style={styles.logo}>
                                    {step === 'code' ? (
                                        <div style={styles.emailIconContainer}>
                                            <svg style={styles.emailIconLarge} viewBox="0 0 24 24" fill="none" stroke={appConfig?.accent || "#666"} strokeWidth="1.5">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                <polyline points="22,6 12,13 2,6" />
                                            </svg>
                                        </div>
                                    ) : appConfig?.image ? (
                                        <img src={appConfig.image} alt={appConfig.name} style={styles.logoImage} />
                                    ) : null}
                                </div>
                            )}

                            {error && <div style={styles.error}>{error}</div>}

                            {showPopup.view === 'mfa' && mfaStep === 'method' ? (
                                <div style={styles.methodContainer}>
                                    <FocusableButton
                                        id="mfa-authenticator"
                                        style={{
                                            ...styles.altButton,
                                            opacity: loading ? 0.7 : 1
                                        }}
                                        onClick={() => fetchMfaSetup()}
                                        disabled={loading}
                                        focusedButton={focusedButton}
                                        setFocusedButton={setFocusedButton}
                                        hoveredButton={hoveredButton}
                                        setHoveredButton={setHoveredButton}
                                        appConfig={appConfig}
                                        hoverBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#f0f0f0' : '#3a3a3a'}
                                        defaultBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#ffffff' : '#2a2a2a'}
                                    >
                                        <PhoneIphoneIcon style={styles.providerIcon} />
                                        {loading ? (
                                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                <Spinner size={16} />
                                            </div>
                                        ) : (
                                            <>
                                                Authenticator app
                                                <span style={{
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                    color: appConfig?.accent || '#20c997',
                                                    backgroundColor: getLightAccentColor(appConfig?.accent || '#20c997'),
                                                    padding: '2px 6px',
                                                    borderRadius: 4,
                                                    marginLeft: 'auto'
                                                }}>Recommended</span>
                                            </>
                                        )}
                                    </FocusableButton>


                                    {appConfig?.options?.allowPasskeys && (
                                        <FocusableButton
                                            id="mfa-passkey"
                                            style={{
                                                ...styles.altButton,
                                                opacity: (passkeyLoading || !isPasskeySupported) ? 0.7 : 1
                                            }}
                                            onClick={() => handlePasskeySetup()}
                                            disabled={passkeyLoading || !isPasskeySupported}
                                            focusedButton={focusedButton}
                                            setFocusedButton={setFocusedButton}
                                            hoveredButton={hoveredButton}
                                            setHoveredButton={setHoveredButton}
                                            appConfig={appConfig}
                                            hoverBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#f0f0f0' : '#3a3a3a'}
                                            defaultBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#ffffff' : '#2a2a2a'}
                                        >
                                            <FingerprintIcon style={styles.providerIcon} />
                                            {passkeyLoading ? (
                                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                    <Spinner size={16} />
                                                </div>
                                            ) : (
                                                <>
                                                    Passkey
                                                    {!isPasskeySupported && (
                                                        <span style={{
                                                            fontSize: 11,
                                                            fontWeight: 600,
                                                            color: '#dc3545',
                                                            backgroundColor: '#f8d7da',
                                                            padding: '2px 6px',
                                                            borderRadius: 4,
                                                            marginLeft: 'auto'
                                                        }}>Not Supported</span>
                                                    )}
                                                </>
                                            )}
                                        </FocusableButton>
                                    )}


                                </div>
                            ) : showPopup.view === 'mfa' && mfaStep === 'qr' && qrCodeUrl ? (
                                <div style={styles.mfaContainer}>
                                    <h3 style={styles.mfaTitle}>Scan QR code</h3>
                                    <p style={styles.mfaInstruction}>Open your authenticator app and scan the QR code to continue.</p>
                                    <div style={styles.qrCodeContainer}>
                                        <div ref={qrCodeRef} style={styles.qrCodeWrapper}></div>
                                    </div>
                                    <button style={styles.copyButton} onClick={copySetupKey}>
                                        {copied ? (
                                            <>
                                                <svg style={styles.copyIcon} viewBox="0 0 24 24" fill="#666">
                                                    <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                                                </svg>
                                                Copied setup key
                                            </>
                                        ) : (
                                            <>
                                                <svg style={styles.copyIcon} viewBox="0 0 24 24" fill="#666">
                                                    <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                                                </svg>
                                                Copy setup key
                                            </>
                                        )}
                                    </button>
                                    <FocusableButton
                                        id="mfa-continue"
                                        style={{
                                            ...styles.submit,
                                            backgroundColor: appConfig?.accent || '#007bff',
                                            color: '#fff'
                                        }}
                                        onClick={() => setMfaStep('code')}
                                        focusedButton={focusedButton}
                                        setFocusedButton={setFocusedButton}
                                        hoveredButton={hoveredButton}
                                        setHoveredButton={setHoveredButton}
                                        appConfig={appConfig}
                                        hoverBackgroundColor={`rgba(${appConfig?.accent ? parseInt(appConfig.accent.slice(1, 3), 16) : 0}, ${appConfig?.accent ? parseInt(appConfig.accent.slice(3, 5), 16) : 123}, ${appConfig?.accent ? parseInt(appConfig.accent.slice(5, 7), 16) : 255}, 0.8)`}
                                        defaultBackgroundColor={appConfig?.accent || '#007bff'}
                                    >Continue</FocusableButton>
                                </div>
                            ) : showPopup.view === 'mfa' && mfaStep === 'code' ? (
                                <div style={styles.mfaContainer}>
                                    <h3 style={styles.mfaTitle}>Enter enrollment code</h3>
                                    <p style={styles.mfaInstruction}>To continue, enter the 6-digit code generated from your authenticator app.</p>
                                    <div style={styles.codeContainer}>
                                        {mfaCode.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => { mfaInputRefs.current[index] = el; }}
                                                style={{
                                                    ...styles.codeInput,
                                                    borderColor: focusedInput === `mfa-code-${index}` ? (appConfig?.accent || (isLightColor(appConfig?.background || '#ffffff') ? '#e5e7eb' : '#636363')) : (isLightColor(appConfig?.background || '#ffffff') ? '#e5e7eb' : '#636363')
                                                }}
                                                type="text"
                                                maxLength={1}
                                                inputMode="numeric"
                                                value={digit}
                                                onChange={(e) => handleMfaCodeInput(index, e.target.value)}
                                                onFocus={() => setFocusedInput(`mfa-code-${index}`)}
                                                onBlur={() => setFocusedInput(null)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Backspace' && !mfaCode[index] && index > 0) {
                                                        mfaInputRefs.current[index - 1]?.focus();
                                                    }
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        style={{
                                            ...styles.backButton,
                                            color: appConfig?.accent || '#555'
                                        }}
                                        onClick={() => {
                                            setMfaStep('qr');
                                            setError(null);
                                            setMfaCode(['', '', '', '', '', '']);
                                        }}
                                    >
                                        Back to QR Code
                                    </button>
                                </div>
                            ) : showPopup.view === 'mfa' && mfaStep === 'passkey' ? (
                                <div style={styles.passkeySigningContainer}>
                                    <div style={styles.passkeySigningIcon}>
                                        <div style={{
                                            position: 'relative',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {/* Apple-style pulsing circles */}
                                            <div style={{
                                                position: 'absolute',
                                                width: 80,
                                                height: 80,
                                                borderRadius: '50%',
                                                border: `2px solid ${appConfig?.accent || '#007bff'}`,
                                                opacity: 0.3,
                                                animation: 'pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite'
                                            }} />
                                            <div style={{
                                                position: 'absolute',
                                                width: 60,
                                                height: 60,
                                                borderRadius: '50%',
                                                border: `2px solid ${appConfig?.accent || '#007bff'}`,
                                                opacity: 0.5,
                                                animation: 'pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.5s infinite'
                                            }} />
                                            {/* Material UI Fingerprint Icon */}
                                            <FingerprintIcon
                                                style={{
                                                    fontSize: 48,
                                                    color: appConfig?.accent || '#007bff',
                                                    animation: 'fingerprint-pulse 1.5s ease-in-out infinite alternate'
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <h3 style={styles.passkeySigningTitle}>
                                        Creating Passkey
                                    </h3>
                                    <p style={styles.passkeySigningMessage}>
                                        Follow your browser's instructions to create a passkey
                                    </p>
                                </div>
                            ) : showPopup.view === 'mfa' && mfaStep === 'passkey-success' ? (
                                <div style={styles.passkeySigningContainer}>
                                    <div style={styles.passkeySigningIcon}>
                                        <div style={{
                                            position: 'relative',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {/* Success checkmark with accent color */}
                                            <div style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: '50%',
                                                backgroundColor: appConfig?.accent || '#007bff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 style={styles.passkeySigningTitle}>
                                        Passkey Created Successfully
                                    </h3>
                                    <p style={styles.passkeySigningMessage}>
                                        Your passkey has been linked to your account for secure authentication
                                    </p>
                                </div>
                            ) : showPopup.view === 'link' ? (
                                <>
                                    {step === 'code' && (
                                        <div style={styles.emailIconContainer}>
                                            <svg style={styles.emailIconLarge} viewBox="0 0 24 24" fill="none" stroke={appConfig?.accent || "#666"} strokeWidth="1.5">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                <polyline points="22,6 12,13 2,6" />
                                            </svg>
                                        </div>
                                    )}
                                    {step === 'email' ? (
                                        <>
                                            <p style={styles.subtitle}>Connect your email to enhance your login options.</p>
                                            <div style={styles.inputContainer}>
                                                <svg style={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                    <polyline points="22,6 12,13 2,6" />
                                                </svg>
                                                <input
                                                    style={{
                                                        ...styles.inputField,
                                                        borderColor: focusedInput === 'link-email' ? (appConfig?.accent || (isLightColor(appConfig?.background || '#ffffff') ? '#e5e7eb' : '#636363')) : (isLightColor(appConfig?.background || '#ffffff') ? '#e5e7eb' : '#636363')
                                                    }}
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    onFocus={() => setFocusedInput('link-email')}
                                                    onBlur={() => setFocusedInput(null)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleLinkEmailInit();
                                                        }
                                                    }}
                                                />
                                                <button
                                                    style={{
                                                        ...styles.inputSubmitButton,
                                                        opacity: (loading || !email || !isValidEmail(email)) ? 0.3 : 1,
                                                        color: (loading || !email || !isValidEmail(email)) ? '#ccc' : (appConfig?.accent || '#000'),
                                                        cursor: (loading || !email || !isValidEmail(email)) ? 'not-allowed' : 'pointer'
                                                    }}
                                                    onClick={handleLinkEmailInit}
                                                    disabled={loading || !email || !isValidEmail(email)}
                                                    type="button"
                                                >
                                                    Submit
                                                </button>
                                            </div>

                                        </>
                                    ) : (
                                        <>
                                            <p style={styles.codeText}>Enter the 6-digit code sent to<br /><strong>{email}</strong></p>
                                            <div style={styles.codeContainer} onPaste={handlePaste}>
                                                {code.map((digit, index) => (
                                                    <input
                                                        key={index}
                                                        ref={(el) => { inputRefs.current[index] = el; }}
                                                        style={{
                                                            ...styles.codeInput,
                                                            borderColor: focusedInput === `link-code-${index}` ? (appConfig?.accent || (isLightColor(appConfig?.background || '#ffffff') ? '#e5e7eb' : '#636363')) : (isLightColor(appConfig?.background || '#ffffff') ? '#e5e7eb' : '#636363')
                                                        }}
                                                        type="text"
                                                        inputMode="numeric"
                                                        maxLength={1}
                                                        value={digit}
                                                        onChange={(e) => handleCodeInput(index, e.target.value)}
                                                        onFocus={() => setFocusedInput(`link-code-${index}`)}
                                                        onBlur={() => setFocusedInput(null)}
                                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                                        autoComplete="one-time-code"
                                                    />
                                                ))}
                                            </div>

                                            <button
                                                style={{
                                                    ...styles.backButton,
                                                    color: appConfig?.accent || '#555'
                                                }}
                                                onClick={() => {
                                                    setStep('email');
                                                    setError(null);
                                                    setCode(['', '', '', '', '', '']);
                                                }}
                                            >
                                                Back to Email
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : showPopup.view === 'loginorsignup' ? (
                                <>
                                    {step === 'email' ? (
                                        <>
                                            <div style={styles.inputContainer}>
                                                <svg style={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                    <polyline points="22,6 12,13 2,6" />
                                                </svg>
                                                <input
                                                    style={{
                                                        ...styles.inputField,
                                                        borderColor: focusedInput === 'login-email' ? (appConfig?.accent || (isLightColor(appConfig?.background || '#ffffff') ? '#e5e7eb' : '#636363')) : (isLightColor(appConfig?.background || '#ffffff') ? '#e5e7eb' : '#636363')
                                                    }}
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    onFocus={() => setFocusedInput('login-email')}
                                                    onBlur={() => setFocusedInput(null)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleInitEmail();
                                                        }
                                                    }}
                                                />
                                                <button
                                                    style={{
                                                        ...styles.inputSubmitButton,
                                                        opacity: (loading || !email || !isValidEmail(email)) ? 0.3 : 1,
                                                        color: (loading || !email || !isValidEmail(email)) ? '#ccc' : (appConfig?.accent || '#000'),
                                                        cursor: (loading || !email || !isValidEmail(email)) ? 'not-allowed' : 'pointer'
                                                    }}
                                                    onClick={handleInitEmail}
                                                    disabled={loading || !email || !isValidEmail(email)}
                                                    type="button"
                                                >
                                                    Submit
                                                </button>
                                            </div>

                                            {appConfig?.google && (
                                                <FocusableButton
                                                    id="google-login"
                                                    style={{
                                                        ...styles.altButton,
                                                    }}
                                                    onClick={() => handleProviderLogin('google')}
                                                    disabled={loading}
                                                    focusedButton={focusedButton}
                                                    setFocusedButton={setFocusedButton}
                                                    hoveredButton={hoveredButton}
                                                    setHoveredButton={setHoveredButton}
                                                    appConfig={appConfig}
                                                    hoverBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#f8f9fa' : '#3a3a3a'}
                                                    defaultBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#ffffff' : '#2a2a2a'}
                                                >
                                                    <svg style={styles.providerIcon} viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                    </svg>
                                                    {loading ? (
                                                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                            <Spinner size={16} />
                                                        </div>
                                                    ) : 'Google'}
                                                </FocusableButton>
                                            )}
                                            {appConfig?.x && (
                                                <FocusableButton
                                                    id="x-login"
                                                    style={{
                                                        ...styles.altButton,
                                                    }}
                                                    onClick={() => handleProviderLogin('x')}
                                                    disabled={loading}
                                                    focusedButton={focusedButton}
                                                    setFocusedButton={setFocusedButton}
                                                    hoveredButton={hoveredButton}
                                                    setHoveredButton={setHoveredButton}
                                                    appConfig={appConfig}
                                                    hoverBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#f8f9fa' : '#3a3a3a'}
                                                    defaultBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#ffffff' : '#2a2a2a'}
                                                >
                                                    <svg style={styles.providerIcon} viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                    </svg>
                                                    {loading ? (
                                                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                            <Spinner size={16} />
                                                        </div>
                                                    ) : 'Twitter'}
                                                </FocusableButton>
                                            )}
                                            {appConfig?.discord && (
                                                <FocusableButton
                                                    id="discord-login"
                                                    style={{
                                                        ...styles.altButton,
                                                    }}
                                                    onClick={() => handleProviderLogin('discord')}
                                                    disabled={loading}
                                                    focusedButton={focusedButton}
                                                    setFocusedButton={setFocusedButton}
                                                    hoveredButton={hoveredButton}
                                                    setHoveredButton={setHoveredButton}
                                                    appConfig={appConfig}
                                                    hoverBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#f8f9fa' : '#3a3a3a'}
                                                    defaultBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#ffffff' : '#2a2a2a'}
                                                >
                                                    <svg style={styles.providerIcon} viewBox="0 0 24 24" fill="#5865F2">
                                                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a .077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a .076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a .077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a .0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a .0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a .077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a .076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a .077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a .061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                                                    </svg>
                                                    {loading ? (
                                                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                            <Spinner size={16} />
                                                        </div>
                                                    ) : 'Discord'}
                                                </FocusableButton>
                                            )}



                                            {/* Passkey Login Button */}
                                            {appConfig?.options?.allowPasskeys && isPasskeySupported && (
                                                <FocusableButton
                                                    id="passkey-login"
                                                    style={{
                                                        ...styles.altButton,
                                                        opacity: loading ? 0.7 : 1
                                                    }}
                                                    onClick={handlePasskeyLogin}
                                                    disabled={loading}
                                                    focusedButton={focusedButton}
                                                    setFocusedButton={setFocusedButton}
                                                    hoveredButton={hoveredButton}
                                                    setHoveredButton={setHoveredButton}
                                                    appConfig={appConfig}
                                                    hoverBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#f8f9fa' : '#3a3a3a'}
                                                    defaultBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#ffffff' : '#2a2a2a'}
                                                >
                                                    <FingerprintIcon style={styles.providerIcon} />
                                                    {loading ? (
                                                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                            <Spinner size={16} />
                                                        </div>
                                                    ) : (
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                            <span>Passkey</span>
                                                            <KeyboardArrowRightIcon />
                                                        </div>
                                                    )}
                                                </FocusableButton>
                                            )}

                                            {/* Wallet Connection Button */}
                                            {appConfig?.options?.allowExternalWallets && (
                                                <FocusableButton
                                                    id="wallet-auth"
                                                    style={{
                                                        ...styles.altButton,
                                                    }}
                                                    onClick={handleWalletAuth}
                                                    disabled={loading}
                                                    focusedButton={focusedButton}
                                                    setFocusedButton={setFocusedButton}
                                                    hoveredButton={hoveredButton}
                                                    setHoveredButton={setHoveredButton}
                                                    appConfig={appConfig}
                                                    hoverBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#f8f9fa' : '#3a3a3a'}
                                                    defaultBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#ffffff' : '#2a2a2a'}
                                                >
                                                    <svg style={styles.providerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="1" y="3" width="22" height="18" rx="2" ry="2" />
                                                        <line x1="1" y1="9" x2="23" y2="9" />
                                                        <path d="m1 9 22 0" />
                                                    </svg>
                                                    {loading ? (
                                                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                            <Spinner size={16} />
                                                        </div>
                                                    ) : (
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                            <span>Continue with Wallet</span>
                                                            <KeyboardArrowRightIcon />
                                                        </div>
                                                    )}
                                                </FocusableButton>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <p style={styles.codeText}>Enter the 6-digit code sent to <strong>{email}</strong></p>
                                            <div style={styles.codeContainer} onPaste={handlePaste}>
                                                {code.map((digit, index) => (
                                                    <input
                                                        key={index}
                                                        ref={(el) => { inputRefs.current[index] = el; }}
                                                        style={{
                                                            ...styles.codeInput,
                                                            borderColor: focusedInput === `login-code-${index}` ? (appConfig?.accent || (isLightColor(appConfig?.background || '#ffffff') ? '#e5e7eb' : '#636363')) : (isLightColor(appConfig?.background || '#ffffff') ? '#e5e7eb' : '#636363')
                                                        }}
                                                        type="text"
                                                        inputMode="numeric"
                                                        maxLength={1}
                                                        value={digit}
                                                        onChange={(e) => handleCodeInput(index, e.target.value)}
                                                        onFocus={() => setFocusedInput(`login-code-${index}`)}
                                                        onBlur={() => setFocusedInput(null)}
                                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                                        autoComplete="one-time-code"
                                                    />
                                                ))}
                                            </div>
                                            <button
                                                style={{
                                                    ...styles.backButton,
                                                    color: appConfig?.accent || '#555'
                                                }}
                                                onClick={() => {
                                                    setStep('email');
                                                    setError(null);
                                                    setCode(['', '', '', '', '', '']);
                                                }}
                                            >
                                                Back to Email
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : showPopup.view === 'provider' ? (
                                <>
                                    <p style={styles.subtitle}>Connect your social media accounts to enhance your profile and login options.</p>

                                    {error && <div style={styles.error}>{error}</div>}

                                    <div style={styles.providerLinkContainer}>
                                        {appConfig?.google && !parseUser()?.google && (
                                            <FocusableButton
                                                id="google-link"
                                                style={{
                                                    ...styles.altButton,
                                                    marginBottom: 0,
                                                    opacity: loading ? 0.7 : 1
                                                }}
                                                onClick={async () => {
                                                    setLoading(true);
                                                    setError(null);
                                                    try {
                                                        await linkProvider('google');
                                                    } catch (e: any) {
                                                        setError(e.message);
                                                    } finally {
                                                        setLoading(false);
                                                    }
                                                }}
                                                disabled={loading}
                                                focusedButton={focusedButton}
                                                setFocusedButton={setFocusedButton}
                                                hoveredButton={hoveredButton}
                                                setHoveredButton={setHoveredButton}
                                                appConfig={appConfig}
                                                hoverBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#f8f9fa' : '#3a3a3a'}
                                                defaultBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#ffffff' : '#2a2a2a'}
                                            >
                                                <svg style={styles.providerIcon} viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                </svg>
                                                {loading ? (
                                                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                        <Spinner size={16} />
                                                    </div>
                                                ) : 'Google'}
                                            </FocusableButton>
                                        )}

                                        {appConfig?.discord && !parseUser()?.discord && (
                                            <FocusableButton
                                                id="discord-link"
                                                style={{
                                                    ...styles.altButton,
                                                    marginBottom: 0,
                                                    opacity: loading ? 0.7 : 1
                                                }}
                                                onClick={async () => {
                                                    setLoading(true);
                                                    setError(null);
                                                    try {
                                                        await linkProvider('discord');
                                                    } catch (e: any) {
                                                        setError(e.message);
                                                    } finally {
                                                        setLoading(false);
                                                    }
                                                }}
                                                disabled={loading}
                                                focusedButton={focusedButton}
                                                setFocusedButton={setFocusedButton}
                                                hoveredButton={hoveredButton}
                                                setHoveredButton={setHoveredButton}
                                                appConfig={appConfig}
                                                hoverBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#f8f9fa' : '#3a3a3a'}
                                                defaultBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#ffffff' : '#2a2a2a'}
                                            >
                                                <svg style={styles.providerIcon} viewBox="0 0 24 24" fill="#5865F2">
                                                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a .077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a .076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a .077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a .0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a .0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a .077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a .076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a .077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a .061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                                                    </svg>
                                                    {loading ? (
                                                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                            <Spinner size={16} />
                                                        </div>
                                                    ) : 'Discord'}
                                            </FocusableButton>
                                        )}

                                        {appConfig?.x && !parseUser()?.x && (
                                            <FocusableButton
                                                id="x-link"
                                                style={{
                                                    ...styles.altButton,
                                                    marginBottom: 0,
                                                    opacity: loading ? 0.7 : 1
                                                }}
                                                onClick={async () => {
                                                    setLoading(true);
                                                    setError(null);
                                                    try {
                                                        await linkProvider('x');
                                                    } catch (e: any) {
                                                        setError(e.message);
                                                    } finally {
                                                        setLoading(false);
                                                    }
                                                }}
                                                disabled={loading}
                                                focusedButton={focusedButton}
                                                setFocusedButton={setFocusedButton}
                                                hoveredButton={hoveredButton}
                                                setHoveredButton={setHoveredButton}
                                                appConfig={appConfig}
                                                hoverBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#f8f9fa' : '#3a3a3a'}
                                                defaultBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#ffffff' : '#2a2a2a'}
                                            >
                                                <svg style={styles.providerIcon} viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                </svg>
                                                {loading ? (
                                                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                        <Spinner size={16} />
                                                    </div>
                                                ) : 'Twitter'}
                                            </FocusableButton>
                                        )}
                                    </div>


                                </>
                            ) : showPopup.view === 'oauth-error' && oauthError ? (
                                <div style={styles.oauthErrorContainer}>
                                    <div style={styles.oauthErrorIcon}>
                                        {oauthError.provider === 'google' && (
                                            <svg style={styles.providerIconLarge} viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                            </svg>
                                        )}
                                        {oauthError.provider === 'discord' && (
                                            <svg style={styles.providerIconLarge} viewBox="0 0 24 24" fill="#5865F2">
                                                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a .077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a .076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a .077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a .0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a .0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a .077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a .076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a .077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a .061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                                            </svg>
                                        )}
                                        {oauthError.provider === 'x' && (
                                            <svg style={styles.providerIconLarge} viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        )}

                                    </div>
                                    <h3 style={styles.oauthErrorTitle}>Authentication failed</h3>
                                    <p style={styles.oauthErrorMessage}>{oauthError.errorMessage ? oauthError.errorMessage : "Something went wrong. Try again."}</p>
                                    <button
                                        style={{
                                            ...styles.retryButton,
                                            backgroundColor: appConfig?.accent || '#007bff',
                                            color: '#fff'
                                        }}
                                        onClick={() => {
                                            // Close error popup and show loading
                                            setOauthError(null);
                                            setOauthLoading({ provider: oauthError.provider });
                                            setShowPopup({ show: true, view: 'oauth-loading' });
                                            // Retry the OAuth flow - use linkProvider if authenticated, handleProviderLogin if not
                                            setTimeout(() => {
                                                if (accessToken) {
                                                    // User is authenticated, this should be a link operation
                                                    linkProvider(oauthError.provider as 'google' | 'discord' | 'x').catch((error) => {
                                                        setOauthError({ provider: oauthError.provider, state: 'retry_failed', errorMessage: 'Retry failed' });
                                                        setShowPopup({ show: true, view: 'oauth-error' });
                                                        setOauthLoading(null);
                                                    });
                                                } else {
                                                    // User is not authenticated, this should be a login operation
                                                    handleProviderLogin(oauthError.provider);
                                                }
                                            }, 100);
                                        }}
                                    >
                                        Retry
                                    </button>
                                </div>
                            ) : showPopup.view === 'wallet' ? (
                                <div style={styles.walletContainer}>
                                    {error && <div style={styles.error}>{error}</div>}

                                    <div style={styles.walletListContainer}>
                                        {connectors && connectors.length > 0 ? (
                                            connectors.map((connector) => {
                                                const isReady = connector.ready;
                                                const isWalletConnect = connector.id === 'walletConnect' ||
                                                    connector.id === 'binance-wallet' ||
                                                    connector.name?.toLowerCase().includes('walletconnect') ||
                                                    (connector.name?.toLowerCase().includes('trust') && connector.type === 'walletConnect') ||
                                                    connector.name?.toLowerCase().includes('binance') ||
                                                    connector.type === 'walletConnect';
                                                return (
                                                    <FocusableButton
                                                        key={connector.uid}
                                                        id={`wallet-${connector.uid}`}
                                                        style={{
                                                            ...styles.altButton,
                                                            opacity: loading ? 0.7 : 1,
                                                        }}
                                                        onClick={() => handleWalletConnect(connector)}
                                                        disabled={loading}
                                                        focusedButton={focusedButton}
                                                        setFocusedButton={setFocusedButton}
                                                        hoveredButton={hoveredButton}
                                                        setHoveredButton={setHoveredButton}
                                                        appConfig={appConfig}
                                                        hoverBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#f8f9fa' : '#3a3a3a'}
                                                        defaultBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#ffffff' : '#2a2a2a'}
                                                    >
                                                        {connector.icon ? (
                                                            <img
                                                                src={connector.icon}
                                                                alt={connector.name}
                                                                style={styles.providerIcon}
                                                                onError={(e) => {
                                                                    // Hide broken images and show fallback
                                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                                }}
                                                            />
                                                        ) : (
                                                            // Fallback icon for wallets without icons
                                                            <svg style={styles.providerIcon} viewBox="0 0 24 24" fill="#666">
                                                                <path d="M19 7H18V6C18 3.79 16.21 2 14 2H10C7.79 2 6 3.79 6 6V7H5C3.9 7 3 7.9 3 9V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9C21 7.9 20.1 7 19 7ZM10 4H14C15.1 4 16 4.9 16 6V7H8V6C8 4.9 8.9 4 10 4ZM19 19H5V9H19V19ZM12 16C13.1 16 14 15.1 14 14C14 12.9 13.1 12 12 12C10.9 12 10 12.9 10 14C10 15.1 10.9 16 12 16Z" />
                                                            </svg>
                                                        )}
                                                        {loading ? (
                                                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                                <Spinner size={16} />
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {connector.name}
                                                                {isWalletConnect && (
                                                                    <span style={{
                                                                        fontSize: 11,
                                                                        fontWeight: 600,
                                                                        color: appConfig?.accent || '#3B99FC',
                                                                        backgroundColor: `${appConfig?.accent || '#3B99FC'}25`, // 25 hex = ~15% opacity
                                                                        padding: '2px 6px',
                                                                        borderRadius: 4,
                                                                        marginLeft: 'auto'
                                                                    }}>QR</span>
                                                                )}
                                                            </>
                                                        )}
                                                    </FocusableButton>
                                                );
                                            })
                                        ) : (
                                            <div style={styles.noWalletsMessage}>
                                                <p>Loading wallets...</p>
                                            </div>
                                        )}

                                        <div style={styles.getStartedSection}>
                                            <span style={styles.getStartedText}>Haven't got a wallet? </span>
                                            <a
                                                href="https://ethereum.org/en/wallets/find-wallet/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    ...styles.getStartedLink,
                                                    color: appConfig?.accent || '#007bff'
                                                }}
                                            >
                                                Get started
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ) : showPopup.view === 'wallet-connecting' && connectingWallet ? (
                                <div style={styles.walletConnectingContainer}>
                                    {walletConnectUri ? (
                                        // Show QR code for WalletConnect
                                        <div style={styles.walletConnectQrContainer}>
                                            <div style={styles.walletConnectQrCode}>
                                                <div ref={qrCodeRef} style={styles.qrCodeWrapper}></div>
                                            </div>
                                            <button
                                                style={styles.copyButton}
                                                onClick={copyWalletConnectUri}
                                            >
                                                {uriCopied ? (
                                                    <>
                                                        <svg style={styles.copyIcon} viewBox="0 0 24 24" fill="#666">
                                                            <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                                                        </svg>
                                                        Copied URI
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg style={styles.copyIcon} viewBox="0 0 24 24" fill="#666">
                                                            <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                                                        </svg>
                                                        Copy URI
                                                    </>
                                                )}
                                            </button>
                                            <h3 style={styles.walletConnectingTitle}>Scan with your wallet</h3>
                                            <p style={styles.walletConnectingMessage}>
                                                Open your mobile wallet and scan the QR code to connect.
                                            </p>

                                            {/* Mobile Deep Link Button for Binance and Trust Wallet */}
                                            {(connectingWallet?.name?.toLowerCase().includes('binance') ||
                                                connectingWallet?.name?.toLowerCase().includes('trust')) && (
                                                    <button
                                                        style={styles.mobileDeepLinkButton}
                                                        onClick={() => {
                                                            const isOnMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

                                                            if (walletConnectUri) {
                                                                let deepLinkUrl = '';

                                                                if (connectingWallet.name?.toLowerCase().includes('binance')) {
                                                                    deepLinkUrl = `bnc://app.binance.com/cedefi/wc?uri=${encodeURIComponent(walletConnectUri)}`;
                                                                } else if (connectingWallet.name?.toLowerCase().includes('trust')) {
                                                                    deepLinkUrl = `https://link.trustwallet.com/wc?uri=${encodeURIComponent(walletConnectUri)}`;
                                                                }

                                                                if (deepLinkUrl) {
                                                                    window.open(deepLinkUrl, '_blank');

                                                                    // Set a timeout for wallet connection stabilization
                                                                    // This timing AND the window.open calls are crucial for proper wallet connection and signing
                                                                    setTimeout(() => {
                                                                        // The window.open calls below provide necessary browser state changes
                                                                        // that mobile wallets depend on for proper connection handling
                                                                        if (isOnMobile) {
                                                                            // Open blank pages instead of app stores to avoid user interruption
                                                                            // but maintain the browser behavior that wallets expect
                                                                            const dummyWindow1 = window.open('about:blank', '_blank');
                                                                            const dummyWindow2 = window.open('about:blank', '_blank');

                                                                            // Close the dummy windows immediately
                                                                            setTimeout(() => {
                                                                                if (dummyWindow1) dummyWindow1.close();
                                                                                if (dummyWindow2) dummyWindow2.close();
                                                                            }, 100);
                                                                        }

                                                                    }, 3000);
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <svg style={styles.mobileIcon} viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M17 19H7V5H17M17 1H7C5.89 1 5 1.89 5 3V21C5 22.1 5.89 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.89 18.1 1 17 1Z" />
                                                        </svg>
                                                        Open in App
                                                    </button>
                                                )}
                                        </div>
                                    ) : (
                                        // Show loading spinner for other wallets or while generating QR code
                                        <div style={styles.walletConnectingContainer}>
                                            <WalletStatusCircle
                                                status="loading"
                                                walletName={connectingWallet.name}
                                                connectors={connectors}
                                                connectingWallet={connectingWallet}
                                                hasLoadingAnimation={true}
                                            />
                                            <h3 style={styles.walletConnectingTitle}>
                                                {(connectingWallet.name?.toLowerCase().includes('walletconnect') ||
                                                    connectingWallet.name?.toLowerCase().includes('trust')) ?
                                                    'Generating QR Code...' :
                                                    `Opening ${connectingWallet.name}`
                                                }
                                            </h3>
                                            <p style={styles.walletConnectingMessage}>
                                                {(connectingWallet.name?.toLowerCase().includes('walletconnect') ||
                                                    connectingWallet.name?.toLowerCase().includes('trust')) ?
                                                    'Please wait while we generate your QR code.' :
                                                    "Don't see your wallet? Check your other browser windows."
                                                }
                                            </p>
                                        </div>
                                    )}
                                </div>

                            ) : showPopup.view === 'wallet-signing' && connectingWallet ? (
                                <div style={styles.walletSigningContainer}>
                                    <WalletStatusCircle
                                        status="signing"
                                        walletName={connectingWallet.name}
                                        connectors={connectors}
                                        connectingWallet={connectingWallet}
                                        hasLoadingAnimation={true}
                                    />
                                    <p style={styles.walletSigningMessage}>
                                        Don't see your wallet? Check your other browser windows.
                                    </p>

                                </div>
                            ) : showPopup.view === 'wallet-success' && connectingWallet ? (
                                <div style={styles.walletConnectingContainer}>
                                    <WalletStatusCircle
                                        status="success"
                                        walletName={connectingWallet.name}
                                        connectors={connectors}
                                        connectingWallet={connectingWallet}
                                    />
                                    <p style={styles.walletConnectingMessage}>
                                        Successfully connected to {connectingWallet.name}
                                    </p>
                                    <p style={styles.walletConnectingSubMessage}>
                                        {address && `Address: ${address.slice(0, 6)}...${address.slice(-4)}`}
                                    </p>
                                    <div style={styles.walletGeneratingChallenge}>
                                        <span>Generating challenge</span>
                                    </div>
                                    <Spinner size={16} />
                                </div>
                            ) : showPopup.view === 'wallet-error' ? (
                                <div style={styles.walletErrorContainer}>
                                    <WalletStatusCircle
                                        status="error"
                                        walletName={connectingWallet?.name || 'Wallet'}
                                        connectors={connectors}
                                        connectingWallet={connectingWallet}
                                    />
                                    <h3 style={styles.walletErrorTitle}>Could not log in with wallet</h3>
                                    <p style={styles.walletErrorSubtitle}>Please try connecting again.</p>
                                    <FocusableButton
                                        id="wallet-retry"
                                        style={{
                                            ...styles.walletRetryButton,
                                            backgroundColor: appConfig?.accent || '#007bff',
                                            color: '#fff'
                                        }}
                                        onClick={() => {
                                            setWalletError(null);
                                            setConnectingWallet(null);
                                            setIsConnecting(false);
                                            disconnect();
                                            // Go back to wallet selection
                                            transitionToView({ show: true, view: 'wallet' });
                                        }}
                                        focusedButton={focusedButton}
                                        setFocusedButton={setFocusedButton}
                                        hoveredButton={hoveredButton}
                                        setHoveredButton={setHoveredButton}
                                        appConfig={appConfig}
                                        hoverBackgroundColor={`rgba(${appConfig?.accent ? parseInt(appConfig.accent.slice(1, 3), 16) : 0}, ${appConfig?.accent ? parseInt(appConfig.accent.slice(3, 5), 16) : 123}, ${appConfig?.accent ? parseInt(appConfig.accent.slice(5, 7), 16) : 255}, 0.8)`}
                                        defaultBackgroundColor={appConfig?.accent || '#007bff'}
                                    >
                                        Try Again
                                    </FocusableButton>
                                </div>
                            ) : showPopup.view === 'oauth-loading' && oauthLoading ? (
                                <div style={styles.oauthLoadingContainer}>
                                    <ProviderStatusCircle
                                        status="loading"
                                        provider={oauthLoading.provider as 'google' | 'discord' | 'x'}
                                        hasLoadingAnimation={true}
                                    />
                                    <h3 style={styles.oauthLoadingTitle}>
                                        Verifying connection to {oauthLoading.provider === 'x' ? 'Twitter' : oauthLoading.provider.charAt(0).toUpperCase() + oauthLoading.provider.slice(1)}
                                    </h3>
                                    <p style={styles.oauthLoadingMessage}>Just a few moments more</p>
                                </div>
                            ) : showPopup.view === 'passkey-loading' ? (
                                <div style={styles.passkeyLoadingContainer}>
                                    <div style={styles.passkeyLoadingIcon}>
                                        <div style={styles.passkeyDualIcons}>
                                            {/* FontAwesome Fingerprint Icon */}
                                            <FingerprintIcon
                                                style={{
                                                    ...styles.passkeyBiometricIcon,
                                                    color: appConfig?.accent || '#007bff',
                                                    fontSize: 48
                                                }}
                                            />

                                        </div>
                                    </div>
                                    <h3 style={styles.passkeyLoadingTitle}>
                                        Authenticating with Passkey
                                    </h3>
                                    <p style={styles.passkeyLoadingMessage}>
                                        Please use your face, fingerprint, or device PIN to authenticate
                                    </p>
                                </div>
                            ) : showPopup.view === 'passkey-signing' ? (
                                <div style={styles.passkeySigningContainer}>
                                    <div style={styles.passkeySigningIcon}>
                                        <div style={{
                                            position: 'relative',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {/* Apple-style pulsing circles */}
                                            <div style={{
                                                position: 'absolute',
                                                width: 80,
                                                height: 80,
                                                borderRadius: '50%',
                                                border: `2px solid ${appConfig?.accent || '#007bff'}`,
                                                opacity: 0.3,
                                                animation: 'pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite'
                                            }} />
                                            <div style={{
                                                position: 'absolute',
                                                width: 60,
                                                height: 60,
                                                borderRadius: '50%',
                                                border: `2px solid ${appConfig?.accent || '#007bff'}`,
                                                opacity: 0.5,
                                                animation: 'pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.5s infinite'
                                            }} />
                                            {/* Material UI Fingerprint Icon */}
                                            <FingerprintIcon
                                                style={{
                                                    fontSize: 48,
                                                    color: appConfig?.accent || '#007bff',
                                                    animation: 'fingerprint-pulse 1.5s ease-in-out infinite alternate'
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <h3 style={styles.passkeySigningTitle}>
                                        Verifying Passkey
                                    </h3>
                                    <p style={styles.passkeySigningMessage}>
                                        Confirming your identity with the server...
                                    </p>
                                </div>
                            ) : showPopup.view === 'passkey-error' && passkeyError ? (
                                <div style={styles.passkeyErrorContainer}>
                                    <div style={styles.passkeyErrorIcon}>
                                        <FingerprintIcon
                                            style={{
                                                fontSize: 48,
                                                color: '#dc3545',
                                                animation: 'fingerprint-pulse 1.5s ease-in-out infinite alternate'
                                            }}
                                        />
                                    </div>
                                    <h3 style={styles.passkeyErrorTitle}>
                                        Passkey Authentication Failed
                                    </h3>
                                    <p style={styles.passkeyErrorMessage}>
                                        {passkeyError}
                                    </p>
                                    <div style={styles.passkeyErrorButtons}>
                                        <FocusableButton
                                            id="passkey-retry"
                                            style={styles.retryButton}
                                            onClick={() => {
                                                setPasskeyError(null);
                                                setShowPopup({ show: true, view: 'loginorsignup' });
                                            }}
                                            focusedButton={focusedButton}
                                            setFocusedButton={setFocusedButton}
                                            hoveredButton={hoveredButton}
                                            setHoveredButton={setHoveredButton}
                                            appConfig={appConfig}
                                            hoverBackgroundColor={`rgba(${appConfig?.accent ? parseInt(appConfig.accent.slice(1, 3), 16) : 0}, ${appConfig?.accent ? parseInt(appConfig.accent.slice(3, 5), 16) : 123}, ${appConfig?.accent ? parseInt(appConfig.accent.slice(5, 7), 16) : 255}, 0.8)`}
                                            defaultBackgroundColor={appConfig?.accent || '#007bff'}
                                        >
                                            Try Again
                                        </FocusableButton>
                                    </div>
                                </div>
                            ) : null}

                            <div style={{ fontSize: 12, color: '#888', marginTop: 20 }}>
                                <a href="https://pr0d.io" target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none' }}>Protected by pr0d.io</a>
                            </div>
                        </div>
                    </div>
                )}
                {children}
            </div>
        </AuthContext.Provider>
    );
};

const queryClient = new QueryClient();

const Pr0dWithProviders = ({ appId, children }: { appId: string; children: React.ReactNode }) => {
    const [wagmiConfig, setWagmiConfig] = useState<Config | null>(null);
    const [appConfig, setAppConfig] = useState<AppConfig | null>(null);

    useEffect(() => {
        const fetchAppConfigAndCreateWagmi = async () => {
            const baseUrl = 'https://auth.pr0d.io';
            let configData: AppConfig | null = null;
            try {
                const res = await axios.get(`${baseUrl}/api/apps/${appId}`);
                configData = res.data.data as AppConfig;
                setAppConfig(configData);
            } catch (error) {
                console.error('Failed to fetch app configuration for Wagmi:', error);
            }
            const appName = configData?.name || 'pr0d';
            const projectId = configData?.walletConnect || '8ce47691a97bb4e85997c6bbbff1e6a7';
            const newConfig = createWagmiConfig(appName, projectId);
            setWagmiConfig(newConfig);
        };

        fetchAppConfigAndCreateWagmi();
    }, [appId]);

    if (!wagmiConfig) {
        return null; // Or a loader
    }

    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <Pr0d appId={appId} appConfig={appConfig}>
                    {children}
                </Pr0d>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export { Pr0dWithProviders as default };

export const usePr0d = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('usePr0d must be used within a Pr0dProvider');
    }
    return context;
};
