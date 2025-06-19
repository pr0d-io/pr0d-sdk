import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import QRCodeStyling from 'qr-code-styling';
import { useAccount, useConnect, useDisconnect, useSignMessage, useSignTypedData, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { jwtDecode } from "jwt-decode";
import { config } from '../wagmi';

import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


interface User {
    _id: string;
    email?: { email: string };
    mfa?: { secret: string };
    [key: string]: any;
}

interface AppConfig {
    id: string;
    name: string;
    image: string;
    background: string;
    accent: string;
    allowedOrigins: string[];
    x: boolean;
    google: boolean;
    discord: boolean;
    telegram: boolean;
    apple: boolean;
    options: {
        allowEmail: boolean;
        allowEmailPlus: boolean;
        allowX: boolean;
        allowGoogle: boolean;
        allowDiscord: boolean;
        allowTelegram: boolean;
        allowExternalWallets: boolean;
        allowPasskeys: boolean;
    }
}

interface AuthContextType {
    accessToken: string | null;
    isAuthenticated: boolean;
    user: User | null;
    logout: () => void;
    login: () => void;
    triggerMfaSetup: () => void;
    triggerEmailLink: () => void;
    triggerProviderLink: () => void;
    triggerWalletLink: () => void;
    triggerPasskeySetup: () => void;
    setupMFA: () => Promise<{ secret: string; qrCodeUrl: string }>;
    verifyMFA: (code: string) => Promise<boolean>;
    deleteMFA: () => Promise<void>;
    initEmailLink: (email: string) => Promise<void>;
    linkEmail: (email: string, code: string) => Promise<boolean>;
    linkProvider: (provider: 'google' | 'discord' | 'x') => Promise<void>;
    unlinkProvider: (provider: 'google' | 'discord' | 'x') => Promise<void>;
    linkWallet: (signature: string, nonce: string) => Promise<boolean>;
    unlinkWallet: (address: string) => Promise<void>;
    linkGoogle: () => Promise<void>;
    linkDiscord: () => Promise<void>;
    linkX: () => Promise<void>;
    initPasskey: (userHandle?: string) => Promise<{ options: any; type: 'registration' | 'authentication' }>;
    verifyPasskey: (credential: any) => Promise<{ type: 'registration' | 'authentication'; user?: User; accessToken?: string; refreshToken?: string; message: string }>;
    listPasskeys: () => Promise<{ passkeys: any[]; count: number }>;
    deletePasskey: (credentialId: string) => Promise<void>;
    getUser: (token?: string) => Promise<User>;
    teeSignMessage: (message: string) => Promise<{ signature: string; address: string; message: string }>;
    createTransaction: (txData: { to: string; value?: string; data?: string; gasLimit?: string; maxFeePerGas?: string; maxPriorityFeePerGas?: string; chainId: number }) => Promise<{ transactionId: string; userAddress: string; txData: any; expiresAt: string }>;
    getTransaction: (transactionId: string) => Promise<{ transactionId: string; userAddress: string; txData: any; status: string; createdAt: string; sponsorTxHash?: string }>;
    sponsorTransaction: (transactionId: string, sponsorPrivateKey: string, rpcUrl: string, nonce?: number) => Promise<{ txHash: string; sponsorAddress: string; status: string; transactionId: string }>;
    getPendingTransactions: () => Promise<{ transactions: any[]; count: number }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Spinner component
const Spinner = ({ size = 16 }: { size?: number }) => (
    <div
        style={{
            width: size,
            height: size,
            border: '2px solid #f3f3f3',
            borderTop: '2px solid #666',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            display: 'inline-block'
        }}
    />
);

// Reusable button component with built-in focus and hover states
interface FocusableButtonProps {
    id: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    focusedButton: string | null;
    setFocusedButton: (id: string | null) => void;
    hoveredButton: string | null;
    setHoveredButton: (id: string | null) => void;
    appConfig?: AppConfig | null;
    focusBorderWidth?: number;
    hoverBackgroundColor?: string;
    defaultBackgroundColor?: string;
}

const FocusableButton = ({
    id,
    style = {},
    onClick,
    onMouseEnter,
    onMouseLeave,
    disabled = false,
    children,
    focusedButton,
    setFocusedButton,
    hoveredButton,
    setHoveredButton,
    appConfig,
    focusBorderWidth = 1,
    hoverBackgroundColor,
    defaultBackgroundColor,
    ...props
}: FocusableButtonProps) => {
    const isFocused = focusedButton === id;
    const isHovered = hoveredButton === id;

    const handleMouseEnter = () => {
        setHoveredButton(id);
        onMouseEnter?.();
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
        setFocusedButton(null); // Clear focus state when mouse leaves
        onMouseLeave?.();
    };

    const handleMouseDown = () => {
        setFocusedButton(id);
    };

    const handleMouseUp = () => {
        setFocusedButton(null);
    };

    // Determine background color based on hover state
    let backgroundColor = style.backgroundColor || defaultBackgroundColor;
    if (isHovered && hoverBackgroundColor) {
        backgroundColor = hoverBackgroundColor;
    }

    // Determine border based on focus state
    const focusBorder = isFocused
        ? `${focusBorderWidth}px solid ${appConfig?.accent || '#007bff'}`
        : style.border || `${focusBorderWidth}px solid transparent`;

    return (
        <button
            style={{
                ...style,
                backgroundColor,
                border: focusBorder
            }}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

// Add CSS animation for spinner
if (typeof document !== 'undefined') {
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    if (!document.head.querySelector('style[data-spinner]')) {
        spinnerStyle.setAttribute('data-spinner', 'true');
        document.head.appendChild(spinnerStyle);
    }
}

// Reusable Wallet Status Circle Component
interface WalletCircleProps {
    status: 'success' | 'error' | 'loading' | 'signing';
    walletName: string;
    connectors: readonly any[];
    connectingWallet: any;
    hasLoadingAnimation?: boolean;
}

interface ProviderCircleProps {
    status: 'success' | 'error' | 'loading';
    provider: 'google' | 'discord' | 'x';
    hasLoadingAnimation?: boolean;
}

const WalletStatusCircle = ({
    status,
    walletName,
    connectors,
    connectingWallet,
    hasLoadingAnimation = false
}: WalletCircleProps) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'success':
                return {
                    border: '3px solid #4CAF50'
                };
            case 'error':
                return {
                    border: '3px solid #dc3545'
                };
            case 'loading':
                return {
                    border: '3px solid #20c997'
                };
            case 'signing':
                return {
                    border: '3px solid #e3f2fd'
                };
            default:
                return {
                    border: '3px solid #e9ecef'
                };
        }
    };

    const containerStyle = {
        position: 'relative' as const,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const circleStyle = {
        width: 64,
        height: 64,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative' as const,
        ...getStatusStyles()
    };

    const getWalletIcon = () => {
        if (connectingWallet && connectors.find(c => c.id === connectingWallet.id)?.icon) {
            return (
                <img
                    src={connectors.find(c => c.id === connectingWallet.id)?.icon}
                    alt={walletName}
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 4
                    }}
                />
            );
        } else {
            return (
                <div style={{
                    fontSize: 24,
                    fontWeight: 600,
                    color: '#4A90E2',
                    width: 32,
                    height: 32,
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {walletName.charAt(0).toUpperCase()}
                </div>
            );
        }
    };

    return (
        <div style={containerStyle}>
            <div style={circleStyle}>
                {getWalletIcon()}
            </div>
            {hasLoadingAnimation && (status === 'signing' || status === 'loading') && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 64,
                    height: 64,
                    border: '3px solid #e3f2fd',
                    borderTop: '3px solid #20c997',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
            )}
        </div>
    );
};

const ProviderStatusCircle = ({
    status,
    provider,
    hasLoadingAnimation = false
}: ProviderCircleProps) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'success':
                return {
                    border: '3px solid #4CAF50',
                };
            case 'error':
                return {
                    border: '3px solid #dc3545',
                };
            case 'loading':
                return {
                    border: '3px solid #20c997',
                };
            default:
                return {
                    border: '3px solid #e9ecef',
                };
        }
    };

    const containerStyle = {
        position: 'relative' as const,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const circleStyle = {
        width: 88,
        height: 88,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative' as const,
        ...getStatusStyles()
    };

    const getProviderIcon = () => {
        const iconStyle = {
            width: 64,
            height: 64,
            borderRadius: '50%',
            padding: 12,
            backgroundColor: 'transparent'
        };

        switch (provider) {
            case 'google':
                return (
                    <svg style={iconStyle} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                );
            case 'discord':
                return (
                    <svg style={iconStyle} viewBox="0 0 24 24" fill="#5865F2">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a .077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a .076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a .077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a .0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a .0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a .077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a .076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a .077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a .061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                    </svg>
                );
            case 'x':
                return (
                    <svg style={iconStyle} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                );
            default:
                return (
                    <div style={{
                        fontSize: 32,
                        fontWeight: 600,
                        color: '#4A90E2',
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        ?
                    </div>
                );
        }
    };

    return (
        <div style={containerStyle}>
            <div style={circleStyle}>
                {getProviderIcon()}
            </div>
            {hasLoadingAnimation && status === 'loading' && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 88,
                    height: 88,
                    border: '3px solid #e3f2fd',
                    borderTop: '3px solid #20c997',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
            )}
        </div>
    );
};

const Pr0d = ({ appId, children }: { appId: string; children: React.ReactNode }) => {

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
    const [appConfig, setAppConfig] = useState<AppConfig | null>(null);
    const qrCodeRef = useRef<HTMLDivElement>(null);

    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();


    connectors[0].id = 'custom-binance';
    connectors[0].name = 'Binance Wallet';
    connectors[0].icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjMUUxRTFFIiBkPSJNMCAwaDI1NnYyNTZIMHoiLz48cGF0aCBkPSJtNzMuMTgzMyAxMjguMDI4LTIyLjU2MzIgMjIuNTY0TDI4IDEyOC4wMjhsMjIuNTYzMi0yMi41NjMgMjIuNjIwMSAyMi41NjNabTU0Ljg0NDctNTQuODQ0NyAzOC43MDUgMzguNzA1NyAyMi41NjMtMjIuNTYyOEwxMjguMDI4IDI4IDY2LjcwNDIgODkuMzI0MmwyMi41NjMyIDIyLjU2MjggMzguNzYwNi0zOC43MDM3Wm03Ny40MDkgMzIuMjgxNy0yMi41NjMgMjIuNTYzIDIyLjU2MyAyMi41NjRMMjI4IDEyOC4wMjhsLTIyLjU2My0yMi41NjNabS03Ny40MDkgNzcuNDA5LTM4LjcwMzgtMzguNzA1LTIyLjU2MzIgMjIuNTY0IDYxLjI2NyA2MS4zMjQgNjEuMjY4LTYxLjMyNC0yMi41NjMtMjIuNTY0LTM4LjcwNSAzOC43MDVabTAtMzIuMjgyIDIyLjU2NC0yMi41NjQtMjIuNTY0LTIyLjU2My0yMi42MiAyMi41NjMgMjIuNjIgMjIuNTY0WiIgZmlsbD0iI0YwQjkwQiIvPjwvc3ZnPg==';
    connectors[0].requireQRcode = true;

    connectors[1].id = 'custom-trust';
    connectors[1].name = 'Trust Wallet';
    connectors[1].icon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgdmlld0JveD0iMCAwIDI4IDI4Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDI4djI4SDB6Ii8+PHBhdGggZmlsbD0iIzA1MDBGRiIgZD0iTTYgNy41ODMgMTMuNTMgNXYxNy44ODJDOC4xNSAyMC40OTggNiAxNS45MjggNiAxMy4zNDVWNy41ODNaIi8+PHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTIyIDcuNTgzIDEzLjUzIDV2MTcuODgyYzYuMDUtMi4zODQgOC40Ny02Ljk1NCA4LjQ3LTkuNTM3VjcuNTgzWiIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjE5Ljc2OCIgeDI9IjE0LjA3MiIgeTE9IjMuNzUzIiB5Mj0iMjIuODUzIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIuMDIiIHN0b3AtY29sb3I9IiMwMEYiLz48c3RvcCBvZmZzZXQ9Ii4wOCIgc3RvcC1jb2xvcj0iIzAwOTRGRiIvPjxzdG9wIG9mZnNldD0iLjE2IiBzdG9wLWNvbG9yPSIjNDhGRjkxIi8+PHN0b3Agb2Zmc2V0PSIuNDIiIHN0b3AtY29sb3I9IiMwMDk0RkYiLz48c3RvcCBvZmZzZXQ9Ii42OCIgc3RvcC1jb2xvcj0iIzAwMzhGRiIvPjxzdG9wIG9mZnNldD0iLjkiIHN0b3AtY29sb3I9IiMwNTAwRkYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4K';
    connectors[1].requireQRcode = true;

    connectors[2].id = 'custom-walletconnect';
    connectors[2].name = 'WalletConnect';
    connectors[2].icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSIjM0I5OUZDIi8+CjxwYXRoIGQ9Ik04LjM4OTY5IDEwLjM3MzlDMTEuNDg4MiA3LjI3NTM4IDE2LjUxMTggNy4yNzUzOCAxOS42MTAzIDEwLjM3MzlMMTkuOTgzMiAxMC43NDY4QzIwLjEzODIgMTAuOTAxNyAyMC4xMzgyIDExLjE1MjkgMTkuOTgzMiAxMS4zMDc4TDE4LjcwNzYgMTIuNTgzNUMxOC42MzAxIDEyLjY2MDkgMTguNTA0NSAxMi42NjA5IDE4LjQyNzEgMTIuNTgzNUwxNy45MTM5IDEyLjA3MDNDMTUuNzUyMyA5LjkwODcgMTIuMjQ3NyA5LjkwODcgMTAuMDg2MSAxMi4wNzAzTDkuNTM2NTUgMTIuNjE5OEM5LjQ1OTA5IDEyLjY5NzMgOS4zMzM1IDEyLjY5NzMgOS4yNTYwNCAxMi42MTk4TDcuOTgwMzkgMTEuMzQ0MkM3LjgyNTQ3IDExLjE4OTMgNy44MjU0NyAxMC45MzgxIDcuOTgwMzkgMTAuNzgzMkw4LjM4OTY5IDEwLjM3MzlaTTIyLjI0ODUgMTMuMDEyTDIzLjM4MzggMTQuMTQ3NEMyMy41Mzg3IDE0LjMwMjMgMjMuNTM4NyAxNC41NTM1IDIzLjM4MzggMTQuNzA4NEwxOC4yNjQ1IDE5LjgyNzdDMTguMTA5NiAxOS45ODI3IDE3Ljg1ODQgMTkuOTgyNyAxNy43MDM1IDE5LjgyNzdDMTcuNzAzNSAxOS44Mjc3IDE3LjcwMzUgMTkuODI3NyAxNy43MDM1IDE5LjgyNzdMMTQuMDcwMiAxNi4xOTQ0QzE0LjAzMTQgMTYuMTU1NyAxMy45Njg2IDE2LjE1NTcgMTMuOTI5OSAxNi4xOTQ0QzEzLjkyOTkgMTYuMTk0NCAxMy45Mjk5IDE2LjE5NDQgMTMuOTI5OSAxNi4xOTQ0TDEwLjI5NjYgMTkuODI3N0MxMC4xNDE3IDE5Ljk4MjcgOS44OTA1MyAxOS45ODI3IDkuNzM1NjEgMTkuODI3OEM5LjczNTYgMTkuODI3OCA5LjczNTYgMTkuODI3NyA5LjczNTYgMTkuODI3N0w0LjYxNjE5IDE0LjcwODNDNC40NjEyNyAxNC41NTM0IDQuNDYxMjcgMTQuMzAyMiA0LjYxNjE5IDE0LjE0NzNMNS43NTE1MiAxMy4wMTJDNS45MDY0NSAxMi44NTcgNi4xNTc2MyAxMi44NTcgNi4zMTI1NSAxMy4wMTJMOS45NDU5NSAxNi42NDU0QzkuOTg0NjggMTYuNjg0MSAxMC4wNDc1IDE2LjY4NDEgMTAuMDg2MiAxNi42NDU0QzEwLjA4NjIgMTYuNjQ1NCAxMC4wODYyIDE2LjY0NTQgMTAuMDg2MiAxNi42NDU0TDEzLjcxOTQgMTMuMDEyQzEzLjg3NDMgMTIuODU3IDE0LjEyNTUgMTIuODU3IDE0LjI4MDUgMTMuMDEyQzE0LjI4MDUgMTMuMDEyIDE0LjI4MDUgMTMuMDEyIDE0LjI4MDUgMTMuMDEyTDE3LjkxMzkgMTYuNjQ1NEMxNy45NTI2IDE2LjY4NDEgMTguMDE1NCAxNi42ODQxIDE4LjA1NDEgMTYuNjQ1NEwyMS42ODc0IDEzLjAxMkMyMS44NDI0IDEyLjg1NzEgMjIuMDkzNiAxMi44NTcxIDIyLjI0ODUgMTMuMDEyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';
    connectors[2].requireQRcode = true;

    connectors[3].icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSIjMkM1RkY2Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTQgMjMuOEMxOS40MTI0IDIzLjggMjMuOCAxOS40MTI0IDIzLjggMTRDMjMuOCA4LjU4NzYxIDE5LjQxMjQgNC4yIDE0IDQuMkM4LjU4NzYxIDQuMiA0LjIgOC41ODc2MSA0LjIgMTRDNC4yIDE5LjQxMjQgOC41ODc2MSAyMy44IDE0IDIzLjhaTTExLjU1IDEwLjhDMTEuMTM1OCAxMC44IDEwLjggMTEuMTM1OCAxMC44IDExLjU1VjE2LjQ1QzEwLjggMTYuODY0MiAxMS4xMzU4IDE3LjIgMTEuNTUgMTcuMkgxNi40NUMxNi44NjQyIDE3LjIgMTcuMiAxNi44NjQyIDE3LjIgMTYuNDVWMTEuNTVDMTcuMiAxMS4xMzU4IDE2Ljg2NDIgMTAuOCAxNi40NSAxMC44SDExLjU1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=='

    const { disconnect } = useDisconnect();
    const { signMessage } = useSignMessage();
    const { signTypedData } = useSignTypedData();
    // Wallet authentication state
    const [walletAuthData, setWalletAuthData] = useState<{
        nonce: string;
        message: any;
        connector: any;
    } | null>(null);

    // Email validation function
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
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
    const [nextView, setNextView] = useState<{ show: boolean; view: string } | null>(null);
    const [currentView, setCurrentView] = useState(showPopup);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const [focusedButton, setFocusedButton] = useState<string | null>(null);

    // Generate dynamic styles based on app config
    const styles = React.useMemo(() => getStyles(appConfig), [appConfig]);

    // Smooth transition function for changing popup views
    const transitionToView = (newView: { show: boolean; view: string }) => {
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
        try {
            const accessToken = localStorage.getItem('pr0d:access_token');

            // check if token is valid first
            if (accessToken) {
                const decodedToken = jwtDecode(accessToken);
                if (!decodedToken.exp || decodedToken.exp < Date.now() / 1000) {
                    localStorage.removeItem('pr0d:access_token');
                    setAccessToken(null);
                    setUser(null);
                    refreshSession();
                } else {
                    setAccessToken(accessToken);
                    // Pass the access token directly since state update is async
                    getUser(accessToken);

                }
            }
        } catch (error) {
            console.error('Failed to decode token:', error);
        }

        // Fetch app configuration
        const fetchAppConfig = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/apps/${appId}`, {
                    headers: { 'pr0d-app-id': appId }
                });
                setAppConfig(res.data.data);
            } catch (error) {
                console.error('Failed to fetch app configuration:', error);
            }
        };

        fetchAppConfig();

    }, [appId]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('status') === 'success';
        const code = urlParams.get('code');
        const token = urlParams.get('token'); // Keep for backward compatibility
        const error = urlParams.get('error');
        // Check for OAuth parameters
        const oauthCode = urlParams.get('pr0d_oauth_code');
        const oauthState = urlParams.get('pr0d_oauth_state');
        const oauthProvider = urlParams.get('pr0d_oauth_provider');

        if (oauthCode && oauthState && oauthProvider) {
            // Clean up URL parameters first
            window.history.replaceState({}, document.title, window.location.pathname);

            if (oauthCode === 'error') {
                // Show OAuth error popup
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
            // Clear error when user starts typing
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
                // put the refresh token as body
                const res = await axios.delete(`${baseUrl}/api/sessions/revoke`, {
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
                        'Authorization': `Bearer ${accessToken}`
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
                        'Authorization': `Bearer ${accessToken}`
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
                        'Authorization': `Bearer ${accessToken}`
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
        console.log('User clicked wallet option:', connector.name);

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
            console.log('Setting up WalletConnect-based wallet:', connector.name);

            // For WalletConnect-based wallets, show our custom QR code view
            transitionToView({ show: true, view: 'wallet-connecting' });

            // Try to get the provider first and set up event listeners
            const setupWalletConnect = async () => {
                try {
                    console.log('Setting up WalletConnect...');

                    // Get the provider
                    const provider = await connector.getProvider();
                    console.log('WalletConnect provider:', provider);

                    if (provider) {
                        // Listen for various possible events
                        const events = ['display_uri', 'qr_code_modal', 'uri', 'connect_uri'];

                        events.forEach(eventName => {
                            provider.on?.(eventName, (data: any) => {
                                console.log(`WalletConnect event ${eventName}:`, data);
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
                                    console.log(`WalletConnect connector event ${eventName}:`, data);
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
                console.log('Fallback timeout fired, URI received:', walletConnectUriReceived.current);

                if (!walletConnectUriReceived.current) {
                    try {
                        const provider = await connector.getProvider();
                        console.log('Fallback: Checking provider for URI...', provider);

                        // Try different ways to access the URI
                        if (provider?.connector?.uri) {
                            console.log('Found URI in provider.connector.uri:', provider.connector.uri);
                            setWalletConnectUri(provider.connector.uri);
                            walletConnectUriReceived.current = true;
                        } else if (provider?.uri) {
                            console.log('Found URI in provider.uri:', provider.uri);
                            setWalletConnectUri(provider.uri);
                            walletConnectUriReceived.current = true;
                        } else if (provider?.session?.uri) {
                            console.log('Found URI in provider.session.uri:', provider.session.uri);
                            setWalletConnectUri(provider.session.uri);
                            walletConnectUriReceived.current = true;
                        } else {
                            console.log('No URI found after timeout, showing loading message');
                            // Instead of falling back to RainbowKit modal, show a loading message or error
                            // Keep the custom popup but show a message that QR code is loading
                            setWalletError('Unable to generate QR code. Please try again.');
                            setShowPopup({ show: true, view: 'wallet-error' });
                        }
                    } catch (error) {
                        console.error('Fallback URI check failed:', error);
                        // Show error in custom popup instead of falling back to RainbowKit
                        setWalletError('Failed to initialize wallet connection. Please try again.');
                        setShowPopup({ show: true, view: 'wallet-error' });
                    }
                } else {
                    console.log('URI already exists, skipping fallback');
                }
                setWalletConnectTimeout(null);
            }, 50000); // Increased timeout to 3 seconds for better reliability

            setWalletConnectTimeout(timeoutId);

            return;
        }

        // For non-WalletConnect wallets (like injected MetaMask), show connecting view
        setShowPopup({ show: true, view: 'wallet-connecting' });

        console.log('Setting up injected wallet:', connector.name);

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
            console.log('Authenticating with:', { signature, nonce });
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
        console.log('handleWalletSignature called, walletAuthData:', walletAuthData);
        if (!walletAuthData) {
            console.log('No walletAuthData, exiting handleWalletSignature');
            return;
        }

        console.log('Setting loading to true and showing wallet-signing popup');
        setLoading(true);
        setError(null);

        // Show signing popup
        setShowPopup({ show: true, view: 'wallet-signing' });
        console.log('Popup set to wallet-signing view');

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

            console.log('Signing ERC-4361 message:', siweMessage);

            signMessage(
                { message: siweMessage },
                {
                    onSuccess: async (signature) => {
                        try {
                            console.log('Signature received:', signature);
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
        console.log('Wallet connection useEffect triggered:', {
            isConnected,
            address,
            userInitiatedWalletAuth,
            walletAuthCompleted
        });

        // When wallet connects successfully, proceed to authentication
        // Only trigger if user explicitly initiated wallet auth and we haven't already completed auth for this address
        if (isConnected && address && userInitiatedWalletAuth && !walletAuthCompleted) {
            console.log('All conditions met, starting authentication flow');

            // First show wallet connected successfully state
            setWalletConnectedSuccessfully(true);
            setShowPopup({ show: true, view: 'wallet-success' });

            // Add a small delay to ensure wallet is fully connected, especially for deep links
            const initAuthWithDelay = async () => {
                try {
                    // Wait a bit longer for mobile wallet connections (like Binance) to stabilize
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Show success for 1.5 seconds

                    console.log('Initializing wallet auth for address:', address);
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
            console.log('walletAuthData set, triggering signature:', walletAuthData);
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
                console.log('Cleaning up wallet connection after', isWalletLinking ? 'linking' : 'incomplete auth');
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
                        'Authorization': `Bearer ${accessToken}`
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
                        'Authorization': `Bearer ${accessToken}`
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
                    'Authorization': `Bearer ${accessToken}`
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
                    'Authorization': `Bearer ${accessToken}`
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
                    'Authorization': `Bearer ${accessToken}`
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
                    'Authorization': `Bearer ${accessToken}`
                },
                data: { address: walletAddress }
            });
            
            // If the wallet being unlinked is currently connected, disconnect it
            if (isConnected && address && walletAddress.toLowerCase() === address.toLowerCase()) {
                console.log('Disconnecting wallet after unlinking:', walletAddress);
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

    // Helper function to convert base64url to Uint8Array
    const base64urlToUint8Array = (base64url: string): Uint8Array => {
        const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
        const binary = atob(padded);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    };

    // Helper function to format passkey options for WebAuthn API
    const formatPasskeyOptions = (options: any) => {
        console.log('Formatting passkey options:', options);

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
                'PR0D-APP-ID': appId,
                ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to initialize passkey');
        }

        const data = await response.json();
        console.log('Backend response data:', data);

        // The backend wraps the response in a data object
        const responseData = data.data || data;
        return {
            options: responseData.options,
            type: responseData.type
        };
    };

    // Helper function to detect device name from user agent
    const getDeviceName = (): string => {
        const userAgent = navigator.userAgent;

        // Detect OS
        let os = '';
        if (userAgent.includes('Windows')) os = 'Windows';
        else if (userAgent.includes('Mac OS X')) os = 'macOS';
        else if (userAgent.includes('iPhone')) os = 'iOS';
        else if (userAgent.includes('iPad')) os = 'iPadOS';
        else if (userAgent.includes('Android')) os = 'Android';
        else if (userAgent.includes('Linux')) os = 'Linux';

        // Detect browser
        let browser = '';
        if (userAgent.includes('Chrome') && !userAgent.includes('Edge')) browser = 'Chrome';
        else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari';
        else if (userAgent.includes('Firefox')) browser = 'Firefox';
        else if (userAgent.includes('Edge')) browser = 'Edge';

        // Combine for a readable device name
        if (os && browser) {
            return `${browser} on ${os}`;
        } else if (os) {
            return os;
        } else if (browser) {
            return browser;
        } else {
            return 'Unknown Device';
        }
    };

    const verifyPasskey = async (credential: any): Promise<{ type: 'registration' | 'authentication'; user?: User; accessToken?: string; refreshToken?: string; message: string }> => {
        const deviceName = getDeviceName();

        const response = await fetch(`${baseUrl}/api/passkeys/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'PR0D-APP-ID': appId,
                ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
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
        console.log('Verify passkey response:', data);

        // The backend wraps the response in a data object
        const responseData = data.data || data;

        // If this was an authentication (login), handle tokens
        if (responseData.type === 'authentication' && responseData.access_token) {
            handleTokens(responseData.access_token, responseData.refresh_token, true);
            closePopup();
        }

        if(responseData.type === 'registration') {
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
                'PR0D-APP-ID': appId,
                'Authorization': `Bearer ${accessToken}`
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
                'PR0D-APP-ID': appId,
                'Authorization': `Bearer ${accessToken}`
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
                'PR0D-APP-ID': appId,
                'Authorization': `Bearer ${tokenToUse}`
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
                    'Authorization': `Bearer ${accessToken}`,
                    'PR0D-APP-ID': appId
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
                    'Authorization': `Bearer ${accessToken}`,
                    'PR0D-APP-ID': appId
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
                    'PR0D-APP-ID': appId
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
                    'PR0D-APP-ID': appId
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
                    'Authorization': `Bearer ${accessToken}`,
                    'PR0D-APP-ID': appId
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
                                                            <KeyboardArrowRightIcon/>
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
                                                            <KeyboardArrowRightIcon/>
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
                                                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a .077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a .076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a .077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a .0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a .0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a .077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a .076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a .061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
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
                                                                        console.log('Wallet connection stabilization period completed');
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

// Utility function to determine if a color is light or dark
const isLightColor = (hexColor: string): boolean => {
    // Remove # if present
    const hex = hexColor.replace('#', '');

    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate relative luminance using WCAG formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return true if light (luminance > 0.5)
    return luminance > 0.5;
};

// Get appropriate text color based on background
const getTextColor = (backgroundColor: string): string => {
    return isLightColor(backgroundColor) ? '#000000' : '#ffffff';
};

// Get appropriate secondary text color based on background
const getSecondaryTextColor = (backgroundColor: string): string => {
    return isLightColor(backgroundColor) ? '#666666' : '#cccccc';
};

// Get light accent color for badges
const getLightAccentColor = (accentColor: string): string => {
    if (!accentColor || accentColor === '#ffffff') return 'rgba(32, 201, 151, 0.1)'; // Default light green

    // Remove # if present
    const hex = accentColor.replace('#', '');

    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Return rgba with low opacity for light background
    return `rgba(${r}, ${g}, ${b}, 0.1)`;
};

const getStyles = (appConfig: AppConfig | null): Record<string, React.CSSProperties> => {
    const backgroundColor = appConfig?.background || '#ffffff';
    const textColor = getTextColor(backgroundColor);
    const secondaryTextColor = getSecondaryTextColor(backgroundColor);
    
    // Detect mobile screens (including all iPhones) 
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth <= 430;

    // Add CSS keyframes and button protection styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes pulse-ring {
            0% {
                transform: scale(0.8);
                opacity: 0.8;
            }
            50% {
                transform: scale(1.2);
                opacity: 0.3;
            }
            100% {
                transform: scale(1.4);
                opacity: 0;
            }
        }
        
        @keyframes fingerprint-pulse {
            0% {
                opacity: 0.7;
                transform: scale(1);
            }
            100% {
                opacity: 1;
                transform: scale(1.05);
            }
        }
        
        /* High specificity protection for close button */
        button[data-pr0d-close="true"][data-pr0d-close] {
            position: absolute !important;
            top: 12px !important;
            right: 12px !important;
            border: none !important;
            width: 28px !important;
            height: 28px !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            font-size: 18px !important;
            line-height: 1 !important;
            padding: 0 !important;
            margin: 0 !important;
            outline: none !important;
            text-decoration: none !important;
            box-shadow: none !important;
            min-width: auto !important;
            min-height: auto !important;
            max-width: none !important;
            max-height: none !important;
            font-family: inherit !important;
            transition: background-color 0.2s ease !important;
        }
        
        /* High specificity protection for back button */
        button[data-pr0d-back="true"][data-pr0d-back] {
            position: absolute !important;
            top: 12px !important;
            left: 12px !important;
            border: none !important;
            width: 28px !important;
            height: 28px !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            font-size: 18px !important;
            font-weight: bold !important;
            line-height: 1 !important;
            padding: 0 !important;
            margin: 0 !important;
            outline: none !important;
            text-decoration: none !important;
            box-shadow: none !important;
            min-width: auto !important;
            min-height: auto !important;
            max-width: none !important;
            max-height: none !important;
            font-family: inherit !important;
            transition: background-color 0.2s ease !important;
        }
    `;
    if (!document.head.querySelector('style[data-pr0d-styles]')) {
        styleElement.setAttribute('data-pr0d-styles', 'true');
        document.head.appendChild(styleElement);
    }

    return {
        overlay: {
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)', // Safari support
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 9999,
            opacity: 1,
            transition: 'opacity 0.3s ease-out'
        },
        modal: {
            backgroundColor: backgroundColor, borderRadius: 16, padding: 24, width: 320, textAlign: 'center', position: 'relative',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease-out',
            color: textColor,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "SF Pro Display", Roboto, "Helvetica Neue", Arial, sans-serif',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale'
        },
        close: {
            position: 'absolute',
            top: 12,
            right: 12,
            border: 'none',
            background: isLightColor(backgroundColor) ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
            fontSize: 18,
            cursor: 'pointer',
            width: 28,
            height: 28,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease',
            color: secondaryTextColor
        },
        logo: {
            width: 64, height: 64, borderRadius: 16, margin: '20px auto 24px'
        },
        logoImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 16
        },
        emailIconContainer: {
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto'
        },
        emailIconLarge: {
            width: 40,
            height: 40
        },
        title: {
            fontSize: 18, fontWeight: 500, marginBottom: 8, color: textColor
        },
        inputContainer: {
            position: 'relative',
            width: '100%',
            marginBottom: 16
        },
        inputIcon: {
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
            pointerEvents: 'none',
            zIndex: 1
        },
        inputField: {
            width: '100%',
            padding: '14px 80px 14px 44px',
            fontSize: 15,
            border: `1px solid ${isLightColor(backgroundColor) ? '#e5e7eb' : '#636363'}`,
            borderRadius: 12,
            outline: 'none',
            transition: 'border-color 0.2s ease, background-color 5000s ease-in-out 0s',
            boxSizing: 'border-box',
            fontWeight: 400,
            color: textColor,
            backgroundColor: 'transparent',
            boxShadow: `inset 0 0 0 1000px transparent, ${isLightColor(backgroundColor) ? '0 1px 2px rgba(0, 0, 0, 0.05)' : '0 1px 2px rgba(255, 255, 255, 0.05)'}`,
            WebkitBoxShadow: `inset 0 0 0 1000px transparent, ${isLightColor(backgroundColor) ? '0 1px 2px rgba(0, 0, 0, 0.05)' : '0 1px 2px rgba(255, 255, 255, 0.05)'}`,
            WebkitTextFillColor: textColor
        },
        inputSubmitButton: {
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            color: '#000',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: 4,
            transition: 'all 0.2s ease',
            opacity: 1
        },
        input: {
            width: '100%',
            padding: 12,
            fontSize: 14,
            marginBottom: 16,
            border: `1px solid ${isLightColor(backgroundColor) ? '#e5e7eb' : '#636363'}`,
            borderRadius: 8,
            outline: 'none',
            transition: 'border-color 0.2s ease',
            boxSizing: 'border-box',
            backgroundColor: 'transparent',
            color: textColor
        },
        submit: {
            width: '100%', padding: 10, fontSize: 14, marginBottom: 12, backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', transition: 'background-color 0.2s ease', fontWeight: 600
        },
        altButton: {
            width: '100%',
            padding: '14px 16px',
            marginBottom: 12,
            backgroundColor: 'transparent',
            borderRadius: 12,
            border: `1px solid ${isLightColor(backgroundColor) ? '#e5e7eb' : '#636363'}`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 12,
            fontSize: 15,
            fontWeight: 500,
            color: textColor,
            boxShadow: isLightColor(backgroundColor) ? '0 1px 2px rgba(0, 0, 0, 0.05)' : '0 1px 2px rgba(255, 255, 255, 0.05)',
            transition: 'all 0.2s ease'
        },
        error: {
            color: 'red', marginBottom: 10, fontSize: 14
        },
        codeText: {
            fontSize: 14, marginBottom: 16, color: textColor
        },
        backButton: {
            background: 'transparent', border: 'none', color: '#555', textDecoration: 'underline', cursor: 'pointer', marginTop: 10
        },
        codeContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,
            gap: isSmallScreen ? '4px' : '8px',
            maxWidth: '100%'
        },
        codeInput: {
            width: isSmallScreen ? 'calc((100% - 20px) / 6)' : 40,
            height: isSmallScreen ? 44 : 48,
            fontSize: isSmallScreen ? 18 : 20,
            textAlign: 'center',
            border: `1px solid ${isLightColor(backgroundColor) ? '#e5e7eb' : '#636363'}`,
            borderRadius: isSmallScreen ? 6 : 8,
            margin: 0,
            backgroundColor: 'transparent',
            color: textColor,
            minWidth: isSmallScreen ? 0 : 40,
            maxWidth: isSmallScreen ? 'none' : 48,
            boxSizing: 'border-box'
        },
        orSeparator: {
            textAlign: 'center',
            margin: '16px 0',
            fontSize: 14,
            color: '#888'
        },
        mfaContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        },
        verifyButton: {
            marginTop: 20,
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer'
        },
        qrCodeContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 16,
            borderRadius: 16,
            border: '2px solid #000000',
            padding: 8,
            backgroundColor: '#ffffff'
        },
        qrCode: {
            width: 200,
            height: 200,
            marginBottom: 16,
            borderRadius: 16,
            border: '2px solid #e5e7eb',
            padding: 8
        },
        mfaTitle: {
            fontSize: 18,
            fontWeight: 500,
            marginBottom: 16
        },
        mfaInstruction: {
            fontSize: 14,
            marginBottom: 20,
            textAlign: 'center',
            lineHeight: 1.4
        },
        continueButton: {
            marginTop: 20,
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer'
        },
        copyButton: {
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            fontSize: 14,
            fontWeight: 500,
            color: secondaryTextColor,
            padding: '8px 0',
            marginBottom: 12
        },
        copyIcon: {
            width: 16,
            height: 16,
            flexShrink: 0
        },
        providerIcon: {
            width: 16,
            height: 16,
            flexShrink: 0
        },
        backArrow: {
            position: 'absolute',
            top: 12,
            left: 12,
            border: 'none',
            background: isLightColor(backgroundColor) ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
            fontSize: 18,
            cursor: 'pointer',
            color: secondaryTextColor,
            fontWeight: 'bold',
            width: 28,
            height: 28,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease'
        },
        shieldIcon: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 16
        },
        subtitle: {
            fontSize: 14,
            color: '#666',
            marginBottom: 32,
            textAlign: 'center',
            lineHeight: 1.4
        },
        methodContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            width: '100%'
        },
        methodButton: {
            width: '100%',
            padding: 16,
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        },
        methodButtonDisabled: {
            cursor: 'not-allowed',
            opacity: 0.6
        },
        methodButtonContent: {
            display: 'flex',
            alignItems: 'center',
            gap: 12
        },
        methodIcon: {
            width: 24,
            height: 24,
            flexShrink: 0
        },
        methodText: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            flex: 1
        },
        methodTitle: {
            fontSize: 16,
            fontWeight: 500,
            color: '#333'
        },
        recommendedBadgeRight: {
            fontSize: 12,
            fontWeight: 500,
            color: appConfig?.accent || '#20c997',
            backgroundColor: getLightAccentColor(appConfig?.accent || '#20c997'),
            padding: '2px 6px',
            borderRadius: 4,
            marginLeft: 'auto'
        },
        arrowIcon: {
            width: 20,
            height: 20,
            flexShrink: 0
        },
        qrCodeWrapper: {
            borderRadius: 8,
            overflow: 'hidden'
        },
        qrCodeSvg: {
            borderRadius: 8
        },
        providerLinkContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            width: '100%',
            marginBottom: 24
        },
        providerLinkButton: {
            width: '100%',
            padding: 12,
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 14,
            fontWeight: 500
        },
        checkIcon: {
            width: 16,
            height: 16,
        },
        passkeyIcon: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16
        },
        passkeySpinner: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16
        },
        successIcon: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16
        },
        linkedAccountsSection: {
            borderTop: '1px solid #e9ecef',
            paddingTop: 16,
            marginTop: 16
        },
        linkedAccountsTitle: {
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 12,
            color: '#333'
        },
        noLinkedAccounts: {
            fontSize: 14,
            color: '#666',
            fontStyle: 'italic',
            textAlign: 'center',
            margin: 0
        },
        linkedAccountsList: {
            display: 'flex',
            flexDirection: 'column',
            gap: 8
        },
        linkedAccount: {
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: 8,
            backgroundColor: '#f8f9fa',
            borderRadius: 6,
            fontSize: 14
        },
        oauthErrorContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px 0'
        },
        oauthErrorIcon: {
            position: 'relative',
            marginBottom: 20
        },
        providerIconLarge: {
            width: 64,
            height: 64,
            borderRadius: '50%',
            padding: 12,
            border: '3px solid #dc3545'
        },
        providerIconLoading: {
            width: 64,
            height: 64,
            borderRadius: '50%',
            padding: 12
        },
        errorCircle: {
            position: 'absolute',
            bottom: -4,
            right: -4,
            width: 24,
            height: 24,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #dc3545'
        },
        errorIcon: {
            width: 14,
            height: 14
        },
        oauthErrorTitle: {
            fontSize: 18,
            fontWeight: 600,
            color: '#333',
            margin: '0 0 8px 0'
        },
        oauthErrorMessage: {
            fontSize: 14,
            color: '#666',
            margin: '0 0 24px 0',
            lineHeight: 1.4
        },
        oauthLoadingContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px 0'
        },
        oauthLoadingIcon: {
            position: 'relative',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        loadingCircle: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: 88,
            height: 88,
            border: '3px solid #e3f2fd',
            borderTop: '3px solid #20c997',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        },
        oauthLoadingTitle: {
            fontSize: 18,
            fontWeight: 500,
            color: textColor,
            margin: '0 0 8px 0'
        },
        oauthLoadingMessage: {
            fontSize: 14,
            color: secondaryTextColor,
            margin: 0,
            lineHeight: 1.4
        },
        passkeyLoadingContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px 0'
        },
        passkeyLoadingIcon: {
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        passkeyLoadingTitle: {
            fontSize: 18,
            fontWeight: 500,
            color: textColor,
            margin: '0 0 8px 0'
        },
        passkeyLoadingMessage: {
            fontSize: 14,
            color: secondaryTextColor,
            margin: 0,
            lineHeight: 1.4
        },
        passkeyDualIcons: {
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            justifyContent: 'center'
        },
        passkeyBiometricIcon: {
            flexShrink: 0
        },
        passkeyOrText: {
            fontSize: 12,
            color: secondaryTextColor,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        },
        passkeySigningContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px 0'
        },
        passkeySigningIcon: {
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        passkeySigningTitle: {
            fontSize: 18,
            fontWeight: 500,
            color: textColor,
            margin: '0 0 8px 0'
        },
        passkeySigningMessage: {
            fontSize: 14,
            color: secondaryTextColor,
            margin: 0,
            lineHeight: 1.4
        },
        passkeyErrorContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px 0'
        },
        passkeyErrorIcon: {
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        passkeyErrorTitle: {
            fontSize: 18,
            fontWeight: 500,
            color: textColor,
            margin: '0 0 8px 0'
        },
        passkeyErrorMessage: {
            fontSize: 14,
            color: secondaryTextColor,
            margin: '0 0 16px 0',
            lineHeight: 1.4
        },
        passkeyErrorButtons: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 8
        },
        retryButton: {
            width: '100%',
            padding: '14px 16px',
            fontSize: 15,
            fontWeight: 500,
            borderRadius: 12,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        },
        walletContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0'
        },
        walletListContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            width: '100%'
        },
        walletListButton: {
            width: '100%',
            padding: '12px 16px',
            backgroundColor: '#ffffff',
            border: '1px solid #e9ecef',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left'
        },
        walletListContent: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: 12
        },
        walletIconContainer: {
            width: 40,
            height: 40,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        },
        walletListIcon: {
            width: 24,
            height: 24
        },
        walletListName: {
            fontSize: 16,
            fontWeight: 500,
            color: textColor,
            flex: 1
        },
        walletListStatus: {
            marginLeft: 'auto'
        },
        statusBadgeBlue: {
            fontSize: 11,
            fontWeight: 600,
            color: '#3B99FC',
            backgroundColor: 'transparent',
            padding: '4px 8px',
            borderRadius: 4,
            letterSpacing: '0.5px'
        },
        statusBadgeInstalled: {
            fontSize: 11,
            fontWeight: 600,
            color: '#4CAF50',
            backgroundColor: 'transparent',
            padding: '4px 8px',
            borderRadius: 4,
            letterSpacing: '0.5px'
        },
        // statusBadgeNotInstalled: {
        //     fontSize: 11,
        //     fontWeight: 600,
        //     color: '#666',
        //     backgroundColor: '#f5f5f5',
        //     padding: '4px 8px',
        //     borderRadius: 4,
        //     letterSpacing: '0.5px'
        // },
        walletDivider: {
            textAlign: 'center',
            margin: '16px 0',
            fontSize: 14,
            color: '#888',
            position: 'relative'
        },
        getStartedSection: {
            textAlign: 'center',
            marginTop: 8
        },
        getStartedText: {
            fontSize: 14,
            color: secondaryTextColor
        },
        getStartedLink: {
            fontSize: 14,
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: 500
        },
        walletButton: {
            width: '100%',
            padding: 16,
            border: '1px solid #e9ecef',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center'
        },
        walletButtonContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
        },
        walletInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: 12
        },
        walletName: {
            fontSize: 16,
            fontWeight: 500,
            color: textColor
        },
        noWalletsMessage: {
            padding: 16,
            backgroundColor: '#f8f9fa',
            borderRadius: 8,
            border: '1px solid #e9ecef',
            textAlign: 'center'
        },
        walletConnectingContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            margin: '20px 0'
        },
        walletConnectingIcon: {
            position: 'relative',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        walletIconPlaceholder: {
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: '#f8f9fa',
            border: '3px solid #20c997',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        walletIconSvg: {
            width: 32,
            height: 32,
            color: secondaryTextColor
        },
        walletConnectingLogo: {
            width: 32,
            height: 32,
            borderRadius: 4
        },
        walletConnectingMessage: {
            fontSize: 14,
            color: secondaryTextColor,
            margin: 0,
            lineHeight: 1.4
        },
        walletConnectingTitle: {
            fontSize: 18,
            fontWeight: 500,
            color: textColor,
            margin: '0 0 20px 0'
        },
        walletSuccessContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px 0'
        },
        walletSuccessIcon: {
            marginBottom: 20
        },
        checkIconLarge: {
            width: 64,
            height: 64
        },
        walletSuccessMessage: {
            fontSize: 16,
            fontWeight: 500,
            color: '#333',
            margin: '0 0 8px 0'
        },
        walletSuccessSubMessage: {
            fontSize: 14,
            color: '#666',
            margin: 0,
            fontFamily: 'monospace'
        },
        walletGeneratingChallenge: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            fontSize: 14,
            color: '#666'
        },
        walletSuccessCheckmark: {
            position: 'absolute',
            bottom: -4,
            right: -4,
            width: 24,
            height: 24,
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        },
        checkIconSmall: {
            width: 16,
            height: 16
        },
        walletIconFallback: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: secondaryTextColor,
            borderRadius: '50%'
        },
        walletErrorContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            margin: '20px 0'
        },
        walletErrorIconContainer: {
            marginBottom: 20
        },
        walletErrorIconWrapper: {
            width: 64,
            height: 64,
            borderRadius: '50%',
            border: '3px solid #dc3545',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        },
        walletIconError: {
            width: 32,
            height: 32,
            borderRadius: 4
        },
        walletErrorTitle: {
            fontSize: 18,
            fontWeight: 600,
            color: textColor,
            margin: '0 0 8px 0'
        },
        walletErrorSubtitle: {
            fontSize: 14,
            color: secondaryTextColor,
            margin: '0 0 24px 0',
            lineHeight: 1.4
        },
        walletRetryButton: {
            backgroundColor: '#20c997',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 32px',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
        },
        walletErrorIcon: {
            marginBottom: 20
        },
        errorIconLarge: {
            width: 64,
            height: 64
        },
        walletErrorMessage: {
            fontSize: 14,
            color: secondaryTextColor,
            margin: '0 0 24px 0',
            lineHeight: 1.4
        },

        walletSigningContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            margin: '20px 0'
        },
        walletSigningIcon: {
            position: 'relative',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        walletSigningLogo: {
            width: 32,
            height: 32,
            borderRadius: 4
        },
        walletSigningLetter: {
            fontSize: 24,
            fontWeight: 600,
            color: '#4A90E2',
            width: 32,
            height: 32,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        walletSigningMessage: {
            fontSize: 14,
            color: secondaryTextColor,
            margin: 0,
            lineHeight: 1.4,
            maxWidth: 280
        },
        walletSigningStatus: {
            fontSize: 12,
            color: '#999',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        },
        walletConnectQrContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%'
        },
        walletConnectQrCode: {
            marginBottom: 20,
            padding: 16,
            backgroundColor: '#ffffff',
            borderRadius: 16,
            border: '2px solid #e9ecef'
        },
        mobileDeepLinkButton: {
            backgroundColor: '#20c997',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 32px',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
            marginTop: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8
        },
        mobileIcon: {
            width: 16,
            height: 16,
            flexShrink: 0
        },
        walletSuccessIconContainer: {
            position: 'relative',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        walletSuccessCircle: {
            width: 64,
            height: 64,
            borderRadius: '50%',
            border: '3px solid #4CAF50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }
    };
};

// Create a QueryClient instance for React Query
const queryClient = new QueryClient();

// Wrapper component that provides all necessary providers
const Pr0dWithProviders = ({ appId, children }: { appId: string; children: React.ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <Pr0d appId={appId}>
                    {children}
                </Pr0d>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

// Named exports for better Fast Refresh compatibility
export { Pr0dWithProviders as default };

export const usePr0d = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('usePr0d must be used within a Pr0dProvider');
    }
    return context;
};
