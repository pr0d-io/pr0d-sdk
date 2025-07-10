import React, { useState, useRef, useEffect } from 'react';
import { usePr0d } from '../context';
import {
    X,
    ArrowLeft,
    ChevronRight,
    Smartphone,
    Shield,
    QrCode,
    Mail,
    WalletCards
} from 'lucide-react';
// Using SVG directly to avoid emotion dependency issues
const FingerprintIcon = ({ style }: { style?: React.CSSProperties }) => (
    <svg style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z" />
    </svg>
);
import { isMobileDevice } from '../helpers';

// Utility functions
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isLightColor = (color: string): boolean => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
};

const getLightAccentColor = (color: string): string => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, 0.1)`;
};

// Spinner component
const Spinner = ({ size = 20 }: { size?: number }) => (
    <div
        style={{
            width: size,
            height: size,
            border: '2px solid #f3f3f3',
            borderTop: '2px solid #666',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
        }}
    />
);

// FocusableButton component
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
    hoverBackgroundColor,
    defaultBackgroundColor,
    ...props
}: any) => {
    const isFocused = focusedButton === id;
    const isHovered = hoveredButton === id;

    const handleMouseEnter = () => {
        setHoveredButton?.(id);
        onMouseEnter?.();
    };

    const handleMouseLeave = () => {
        setHoveredButton?.(null);
        setFocusedButton?.(null);
        onMouseLeave?.();
    };

    const handleMouseDown = () => {
        setFocusedButton?.(id);
    };

    const handleMouseUp = () => {
        setFocusedButton?.(null);
    };

    let backgroundColor = style.backgroundColor || defaultBackgroundColor;
    if (isHovered && hoverBackgroundColor) {
        backgroundColor = hoverBackgroundColor;
    }

    const focusBorder = isFocused
        ? `1px solid ${appConfig?.accent || '#007bff'}`
        : style.border || '1px solid transparent';

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

// Status Circle Components
const WalletStatusCircle = ({ appConfig, status, walletName, connectors, connectingWallet, hasLoadingAnimation = false }: any) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'success':
                return { border: '3px solid #4CAF50' };
            case 'error':
                return { border: '3px solid #dc3545' };
            case 'loading':
                return { border: `3px solid ${appConfig?.accent || '#20c997'}` };
            case 'signing':
                return { border: `3px solid ${appConfig?.accent || '#e3f2fd'}` };
            default:
                return { border: '3px solid #e9ecef' };
        }
    };

    // Get the wallet icon from connectors if available
    const getWalletIcon = () => {
        if (connectingWallet && connectors) {
            const matchingConnector = connectors.find((c: any) => c.id === connectingWallet.id);
            if (matchingConnector && matchingConnector.icon) {
                return (
                    <img
                        src={matchingConnector.icon}
                        alt={matchingConnector.name}
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 4,
                            objectFit: 'contain'
                        }}
                        onError={(e) => {
                            // If image fails to load, hide it and show fallback
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                );
            }
        }

        // Fallback to first letter
        return (
            <div style={{ fontSize: 24, fontWeight: 600, color: '#4A90E2', width: 32, height: 32, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {walletName?.charAt(0).toUpperCase()}
            </div>
        );
    };

    return (
        <div style={{ position: 'relative', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...getStatusStyles() }}>
                {getWalletIcon()}
            </div>
            {hasLoadingAnimation && (status === 'signing' || status === 'loading') && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: 64, height: 64,
                    border: '3px solid #e3f2fd', borderTop: `3px solid ${appConfig?.accent || '#20c997'}`,
                    borderRadius: '50%', animation: 'spin 1s linear infinite'
                }} />
            )}
        </div>
    );
};

const ProviderStatusCircle = ({ status, provider, hasLoadingAnimation = false, appConfig }: any) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'success':
                return { border: '3px solid #4CAF50' };
            case 'error':
                return { border: '3px solid #dc3545' };
            case 'loading':
                return { border: `3px solid ${appConfig?.accent || '#20c997'}` };
            default:
                return { border: '3px solid #e9ecef' };
        }
    };

    const getProviderIcon = () => {
        const iconStyle = { width: 40, height: 40 };
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
            case 'github':
                return (
                    <svg style={iconStyle} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                );
            case 'x':
                return (
                    <svg style={iconStyle} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                );
            default:
                return <div style={{ fontSize: 24, fontWeight: 600, color: '#4A90E2', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>?</div>;
        }
    };

    return (
        <div style={{ position: 'relative', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...getStatusStyles() }}>
                {getProviderIcon()}
            </div>
            {hasLoadingAnimation && status === 'loading' && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: 64, height: 64,
                    border: '3px solid #e3f2fd', borderTop: `3px solid ${appConfig?.accent || '#20c997'}`,
                    borderRadius: '50%', animation: 'spin 1s linear infinite'
                }} />
            )}
        </div>
    );
};

const PasskeyStatusCircle = ({ status, hasLoadingAnimation = false, appConfig }: any) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'success':
                return { border: '3px solid #4CAF50' };
            case 'error':
                return { border: '3px solid #dc3545' };
            case 'loading':
                return { border: `3px solid ${appConfig?.accent || '#20c997'}` };
            case 'signing':
                return { border: `3px solid ${appConfig?.accent || '#e3f2fd'}` };
            default:
                return { border: '3px solid #e9ecef' };
        }
    };

    return (
        <div style={{ position: 'relative', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...getStatusStyles() }}>
                <FingerprintIcon style={{ width: 28, height: 28 }} />
            </div>
            {hasLoadingAnimation && (status === 'signing' || status === 'loading') && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: 64, height: 64,
                    border: '3px solid #e3f2fd', borderTop: `3px solid ${appConfig?.accent || '#20c997'}`,
                    borderRadius: '50%', animation: 'spin 1s linear infinite'
                }} />
            )}
        </div>
    );
};

// Add keyframes for spinner
const spinnerKeyframes = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const AuthPopup = () => {
    const { popup, setPopupView, closePopup, goBackFromView, resetWalletStates, resetOAuthStates, appConfig, login, helpers, currentProvider, oauthError, user, link, unlink, renderQRCode, isAuthenticated } = usePr0d();
    const { connectors, walletConnectUri, connectingWallet, walletError, recentConnectorId, isWalletLinkingMode } = helpers;

    // State management
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [mfaCode, setMfaCode] = useState(['', '', '', '', '', '']);
    const [step, setStep] = useState<'email' | 'code'>('email');
    const [mfaStep, setMfaStep] = useState<'method' | 'qr' | 'code' | 'passkey' | 'passkey-success'>('method');
    const [loading, setLoading] = useState(false);
    const [loadingButton, setLoadingButton] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [focusedButton, setFocusedButton] = useState<string | null>(null);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [mfaSecret, setMfaSecret] = useState<string | null>(null);
    const [backupDownloaded, setBackupDownloaded] = useState(false);
    // State for storing QR data to avoid multiple API calls
    const [qrData, setQrData] = useState<string | null>(null);
    // Visual feedback states for code inputs
    const [codeStatus, setCodeStatus] = useState<'normal' | 'success' | 'error'>('normal');
    const [mfaCodeStatus, setMfaCodeStatus] = useState<'normal' | 'success' | 'error'>('normal');
    const [resendCooldown, setResendCooldown] = useState(0);

    // Refs
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const mfaInputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const qrCodeRef = useRef<HTMLDivElement>(null);
    const walletQrCodeRef = useRef<HTMLDivElement>(null);

    // Add spinner styles to document
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = spinnerKeyframes;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Clear email state when popup is closed
    useEffect(() => {
        if (!popup.show) {
            setEmail('');
            setCode(['', '', '', '', '', '']);
            setStep('email');
            setError(null);
            setMfaCode(['', '', '', '', '', '']);
            setMfaStep('method');
            setLoading(false);
            setLoadingButton(null);
            setFocusedInput(null);
            setFocusedButton(null);
            setHoveredButton(null);
            setCopied(false);
            setQrCodeUrl(null);
            setMfaSecret(null);
            setBackupDownloaded(false);
            setQrData(null);
            setCodeStatus('normal');
            setMfaCodeStatus('normal');
        }
    }, [popup.show]);

    // Clear loading button when view changes (general cleanup for all view transitions)
    useEffect(() => {
        setLoadingButton(null);
        setCodeStatus('normal');
        setMfaCodeStatus('normal');
    }, [popup.view, mfaStep, step]);

    // Render QR code for wallet connections
    useEffect(() => {
        const renderWalletQRCode = async () => {
            if (!walletQrCodeRef.current || !walletConnectUri) return;

            try {
                const { default: QRCodeStyling } = await import('qr-code-styling');

                // Get wallet icon if available
                let walletLogo = null;
                if (connectingWallet) {
                    const matchingConnector = connectors.find((c: any) => c.id === connectingWallet.id);
                    if (matchingConnector && matchingConnector.icon) {
                        walletLogo = matchingConnector.icon;
                    }
                }

                const qrCode = new QRCodeStyling({
                    width: 200,
                    height: 200,
                    type: "svg",
                    data: walletConnectUri,
                    image: walletLogo,
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
                        imageSize: walletLogo ? 0.2 : 0
                    }
                });

                walletQrCodeRef.current.innerHTML = '';
                qrCode.append(walletQrCodeRef.current);
            } catch (error) {
                console.error('Failed to render wallet QR code:', error);
            }
        };

        renderWalletQRCode();
    }, [walletConnectUri, connectingWallet, connectors]);

    // Render stored QR code when QR step is reached
    useEffect(() => {
        if (mfaStep === 'qr' && qrData && qrCodeRef.current) {
            qrCodeRef.current.innerHTML = qrData;
        }
    }, [mfaStep, qrData]);

    useEffect(() => {
        if (step === 'code' || popup.view === 'email-link-code') {
            setResendCooldown(30);
            const interval = setInterval(() => {
                setResendCooldown(prev => Math.max(0, prev - 1));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [step, popup.view]);

    if (!popup.show) return null;

    const background = appConfig?.background || '#ffffff';
    const accent = appConfig?.accent || '#000000';
    const textColor = isLightColor(background) ? '#000000' : '#ffffff';
    const mutedTextColor = isLightColor(background) ? '#666666' : '#999999';

    // Detect mobile screens
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth <= 430;

    // Style objects - matching v1 implementation
    const styles = {
        overlay: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            opacity: 1,
            transition: 'opacity 0.3s ease-out'
        },
        modal: {
            backgroundColor: background,
            borderRadius: 16,
            padding: 24,
            width: 370,
            textAlign: 'center' as const,
            position: 'relative' as const,
            transform: 'translateY(0)',
            transition: 'all 0.3s ease-out',
            color: textColor,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "SF Pro Display", Roboto, "Helvetica Neue", Arial, sans-serif',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            border: isLightColor(background) ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'
        },
        close: {
            position: 'absolute' as const,
            top: 12,
            right: 12,
            border: 'none',
            background: isLightColor(background) ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
            fontSize: 18,
            cursor: 'pointer',
            width: 28,
            height: 28,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease',
            color: mutedTextColor
        },
        backArrow: {
            position: 'absolute' as const,
            top: 12,
            left: 12,
            border: 'none',
            background: isLightColor(background) ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
            fontSize: 18,
            cursor: 'pointer',
            color: mutedTextColor,
            fontWeight: 'bold',
            width: 28,
            height: 28,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease'
        },
        title: {
            fontSize: 18,
            fontWeight: 500,
            marginBottom: 8,
            color: textColor
        },
        titleSmall: {
            fontSize: 14,
            fontWeight: 500,
            marginBottom: 8,
            color: textColor
        },
        subtitle: {
            fontSize: 14,
            color: '#666',
            marginBottom: 32,
            textAlign: 'center' as const,
            lineHeight: 1.4
        },
        logo: {
            width: 64,
            height: 64,
            borderRadius: 16,
            margin: '20px auto 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        logoImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover' as const,
            borderRadius: 16
        },
        inputContainer: {
            position: 'relative' as const,
            width: '100%',
            marginBottom: 16
        },
        inputField: {
            width: '100%',
            padding: '14px 80px 14px 48px',
            fontSize: 15,
            border: `1px solid ${isLightColor(background) ? '#e5e7eb' : '#636363'}`,
            borderRadius: 12,
            outline: 'none',
            transition: 'border-color 0.2s ease, background-color 5000s ease-in-out 0s',
            boxSizing: 'border-box' as const,
            fontWeight: 400,
            color: textColor,
            backgroundColor: 'transparent',
            boxShadow: `inset 0 0 0 1000px transparent, ${isLightColor(background) ? '0 1px 2px rgba(0, 0, 0, 0.05)' : '0 1px 2px rgba(255, 255, 255, 0.05)'}`,
            WebkitBoxShadow: `inset 0 0 0 1000px transparent, ${isLightColor(background) ? '0 1px 2px rgba(0, 0, 0, 0.05)' : '0 1px 2px rgba(255, 255, 255, 0.05)'}`,
            WebkitTextFillColor: textColor
        },
        inputIcon: {
            position: 'absolute' as const,
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 20,
            height: 20,
            pointerEvents: 'none' as const,
            zIndex: 1,
            color: mutedTextColor
        },
        inputSubmitButton: {
            position: 'absolute' as const,
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
        altButton: {
            width: '100%',
            padding: '14px 16px',
            marginBottom: 8,
            backgroundColor: 'transparent',
            borderRadius: 12,
            border: `1px solid ${isLightColor(background) ? '#e5e7eb' : '#636363'}`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 12,
            fontSize: 15,
            fontWeight: 500,
            color: textColor,
            boxShadow: isLightColor(background) ? '0 1px 2px rgba(0, 0, 0, 0.05)' : '0 1px 2px rgba(255, 255, 255, 0.05)',
            transition: 'all 0.2s ease'
        },
        providerIcon: {
            width: 20,
            height: 20,
            flexShrink: 0
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
            textAlign: 'center' as const,
            border: `1px solid ${isLightColor(background) ? '#e5e7eb' : '#636363'}`,
            borderRadius: isSmallScreen ? 6 : 8,
            margin: 0,
            backgroundColor: 'transparent',
            color: textColor,
            minWidth: isSmallScreen ? 0 : 40,
            maxWidth: isSmallScreen ? 'none' : 48,
            boxSizing: 'border-box' as const
        },
        codeText: {
            fontSize: 14,
            marginBottom: 16,
            color: textColor
        },
        error: {
            color: 'red',
            marginBottom: 10,
            fontSize: 14
        },
        backButton: {
            background: 'transparent',
            border: 'none',
            color: '#555',
            textDecoration: 'underline',
            cursor: 'pointer',
            marginTop: 10
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
            height: 40,
            color: accent
        },
        submit: {
            width: '100%',
            padding: '12px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginTop: '16px',
        },
        methodContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            width: '100%'
        },
        shieldIcon: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 16
        },
        mfaContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        },
        mfaTitle: {
            fontSize: 18,
            fontWeight: 500,
            marginBottom: 16
        },
        mfaInstruction: {
            fontSize: 14,
            marginBottom: 20,
            textAlign: 'center' as const,
            lineHeight: 1.4
        },
        qrCodeContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 16
        },
        qrCodeWrapper: {
            borderRadius: 16,
            border: '2px solid #000000',
            padding: 8,
            backgroundColor: '#ffffff'
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
            color: mutedTextColor,
            padding: '8px 0',
            marginBottom: 12
        },
        copyIcon: {
            width: 20,
            height: 20,
            flexShrink: 0
        },
        walletConnectingContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            textAlign: 'center' as const,
            margin: '20px 0'
        },
        walletConnectingTitle: {
            fontSize: 18,
            fontWeight: 500,
            color: textColor,
            margin: '0 0 8px 0'
        },
        walletConnectingMessage: {
            fontSize: 14,
            color: mutedTextColor,
            margin: 0,
            lineHeight: 1.4
        },
        walletListContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: 0,
            width: '100%'
        },
        walletContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            textAlign: 'center' as const,
            padding: 0
        },
        noWalletsMessage: {
            padding: 16,
            backgroundColor: isLightColor(background) ? '#f8f9fa' : '#2a2a2a',
            borderRadius: 8,
            border: `1px solid ${isLightColor(background) ? '#e9ecef' : '#636363'}`,
            textAlign: 'center' as const
        },
        getStartedSection: {
            textAlign: 'center' as const,
            marginTop: 8
        },
        getStartedText: {
            fontSize: 14,
            color: mutedTextColor
        },
        getStartedLink: {
            fontSize: 14,
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: 500
        },
        walletConnectingIcon: {
            position: 'relative' as const,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        walletIconPlaceholder: {
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: isLightColor(background) ? '#f8f9fa' : '#2a2a2a',
            border: '3px solid #20c997',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        walletConnectingLogo: {
            width: 32,
            height: 32,
            borderRadius: 4
        },
        walletIconSvg: {
            width: 32,
            height: 32,
            color: mutedTextColor
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
        recommendedBadgeRight: {
            fontSize: 11,
            fontWeight: 600,
            color: appConfig?.accent || '#20c997',
            backgroundColor: getLightAccentColor(appConfig?.accent || '#20c997'),
            padding: '2px 6px',
            borderRadius: 4,
            marginLeft: 'auto'
        },
        // OAuth Error States
        oauthErrorContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            textAlign: 'center' as const,
            padding: '20px 0'
        },
        oauthErrorIcon: {
            position: 'relative' as const,
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
            position: 'absolute' as const,
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
            color: textColor,
            margin: '0 0 8px 0'
        },
        oauthErrorMessage: {
            fontSize: 14,
            color: mutedTextColor,
            margin: '0 0 24px 0',
            lineHeight: 1.4
        },
        // OAuth Loading States
        oauthLoadingContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            textAlign: 'center' as const,
            padding: '20px 0'
        },
        oauthLoadingIcon: {
            position: 'relative' as const,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        loadingCircle: {
            position: 'absolute' as const,
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
            color: mutedTextColor,
            margin: 0,
            lineHeight: 1.4
        },
        // Passkey States
        passkeyLoadingContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            textAlign: 'center' as const,
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
            color: mutedTextColor,
            margin: 0,
            lineHeight: 1.4
        },
        passkeySigningContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            textAlign: 'center' as const,
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
            color: mutedTextColor,
            margin: 0,
            lineHeight: 1.4
        },
        passkeyErrorContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            textAlign: 'center' as const,
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
            color: mutedTextColor,
            margin: '0 0 16px 0',
            lineHeight: 1.4
        },
        passkeyErrorButtons: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: 8
        },
        // Wallet Error States
        walletErrorContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            textAlign: 'center' as const,
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
            position: 'relative' as const
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
            color: mutedTextColor,
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
        // Wallet Signing States
        walletSigningContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            textAlign: 'center' as const,
            margin: '20px 0'
        },
        walletSigningIcon: {
            position: 'relative' as const,
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
        walletSigningMessage: {
            fontSize: 14,
            color: mutedTextColor,
            margin: 0,
            lineHeight: 1.4,
            maxWidth: 280
        },
        // Wallet Success States
        walletSuccessContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            textAlign: 'center' as const,
            padding: '20px 0'
        },
        walletSuccessIconContainer: {
            position: 'relative' as const,
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
            position: 'relative' as const
        },
        walletSuccessCheckmark: {
            position: 'absolute' as const,
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
        checkIconLarge: {
            width: 64,
            height: 64
        },
        walletSuccessMessage: {
            fontSize: 16,
            fontWeight: 500,
            color: textColor,
            margin: '0 0 8px 0'
        },
        walletSuccessSubMessage: {
            fontSize: 14,
            color: mutedTextColor,
            margin: 0,
            fontFamily: 'monospace'
        },
        // WalletConnect QR
        walletConnectQrContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            textAlign: 'center' as const,
            width: '100%'
        },
        walletConnectQrCode: {
            marginBottom: 20,
            padding: 16,
            backgroundColor: '#ffffff',
            borderRadius: 16,
            border: '2px solid #e9ecef'
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
        mobileDeepLinkButton: {
            backgroundColor: appConfig?.accent || '#20c997',
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
        }
    };

    // Helper functions
    const handleCodeInput = (index: number, value: string) => {
        if (/^[0-9]?$/.test(value)) {
            if (error) setError(null);
            setCodeStatus('normal'); // Reset visual state when typing

            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }

            if (value && index === 5 && newCode.every(digit => digit)) {
                handleVerifyCode(newCode.join(''));
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            if (!code[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
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
                handleVerifyCode(pastedData);
            }, 100);
        }
    };

    const handleEmailLinkPaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split('');
            setCode(digits);
            setTimeout(() => {
                handleVerifyEmailLinkCode(pastedData);
            }, 100);
        }
    };

    const handleMfaPaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split('');
            setMfaCode(digits);
            setTimeout(() => {
                handleVerifyMfaCode(pastedData);
            }, 100);
        }
    };

    const handleMfaUnlinkPaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split('');
            setMfaCode(digits);
            setTimeout(() => {
                handleUnlinkMfaCode(pastedData);
            }, 100);
        }
    };

    const handleInitEmail = async () => {
        if (!email) {
            setError('Email is required');
            return;
        }

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoadingButton('email-submit');
        setError(null);

        try {
            await login.sendEmailCode(email, false);
            setStep('code');
            setTimeout(() => {
                if (inputRefs.current[0]) {
                    inputRefs.current[0].focus();
                }
            }, 100);
        } catch (e: any) {
            setError(e.response?.data?.message || e.message || 'Failed to send verification code');
        } finally {
            setLoadingButton(null);
        }
    };

    const handleVerifyCode = async (verificationCode?: string) => {
        const codeToVerify = verificationCode || code.join('');

        if (!codeToVerify || codeToVerify.length !== 6) {
            setError('Please enter a valid 6-digit code');
            setCodeStatus('error');
            return;
        }

        setLoading(true);
        setError(null);
        setCodeStatus('normal');

        try {
            await login.withEmail(email, codeToVerify);
            setCodeStatus('success'); // Only show success after actual login success
            closePopup();
            setStep('email');
            setCode(['', '', '', '', '', '']);
        } catch (e: any) {
            setCodeStatus('error'); // Show error state
            setError(e.response?.data?.message || e.message || 'Invalid verification code');
        } finally {
            setLoading(false);
        }
    };

    const handleInitEmailLink = async () => {
        if (!email) {
            setError('Email is required');
            return;
        }

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoadingButton('email-link-submit');
        setError(null);

        try {
            await link.sendEmailCode(email, false);
            setPopupView('email-link-code');
            setTimeout(() => {
                if (inputRefs.current[0]) {
                    inputRefs.current[0].focus();
                }
            }, 100);
        } catch (e: any) {
            setError(e.response?.data?.message || e.message || 'Failed to send verification code');
        } finally {
            setLoadingButton(null);
        }
    };

    const handleVerifyEmailLinkCode = async (verificationCode?: string) => {
        const codeToVerify = verificationCode || code.join('');

        if (!codeToVerify || codeToVerify.length !== 6) {
            setError('Please enter a valid 6-digit code');
            setCodeStatus('error');
            return;
        }

        setLoading(true);
        setError(null);
        setCodeStatus('normal');

        try {
            await link.email(email, codeToVerify);
            setCodeStatus('success'); // Only show success after actual link success
            closePopup();
            setStep('email');
            setCode(['', '', '', '', '', '']);
        } catch (e: any) {
            setCodeStatus('error'); // Show error state
            setError(e.response?.data?.message || e.message || 'Invalid verification code');
        } finally {
            setLoading(false);
        }
    };

    // MFA Setup Functions
    const fetchMfaSetup = async () => {
        setLoadingButton('mfa-authenticator');
        setError(null);
        try {
            console.log('Starting MFA setup...');

            // Create a temporary element just to call the API and get the data
            const tempDiv = document.createElement('div');
            const data = await renderQRCode(tempDiv, '');
            console.log('Got MFA data:', data);

            // Store both the secret and the QR data for later rendering
            setMfaSecret(data.secret);
            // Store the QR data URL that was generated
            if (tempDiv.querySelector('svg')) {
                const svgElement = tempDiv.querySelector('svg');
                if (svgElement) {
                    setQrData(svgElement.outerHTML);
                }
            }

            // Now transition to QR view - reuse the existing multi-choice MFA QR view
            if (popup.view === 'mfa-totp') {
                // Direct TOTP mode - switch to multi-choice MFA view and show QR
                setPopupView('mfa');
                setMfaStep('qr');
            } else {
                // Multi-choice MFA mode - use mfaStep
                setMfaStep('qr');
            }

        } catch (error: any) {
            console.error('MFA setup error:', error);
            setError(error.response?.data?.message || error.message || 'Failed to load MFA setup.');

            // Check if we're in direct TOTP mode
            if (popup.view === 'mfa-totp') {
                // Direct TOTP mode - show dedicated error view
                setPopupView('mfa-totp-error');
            }
            // For multi-choice MFA mode, error will show in place on the method selection view
        } finally {
            setLoadingButton(null);
        }
    };

    const handleVerifyMfaCode = async (verificationCode?: string) => {
        const codeToVerify = verificationCode || mfaCode.join('');

        if (!codeToVerify || codeToVerify.length !== 6) {
            setError('Please enter a valid 6-digit code');
            setMfaCodeStatus('error');
            return;
        }

        setLoading(true);
        setError(null);
        setMfaCodeStatus('normal');

        try {
            await link.totp(codeToVerify);
            setMfaCodeStatus('success'); // Only show success after actual verification success
            closePopup();
            setMfaStep('method');
            setMfaCode(['', '', '', '', '', '']);
            setMfaSecret(null);
            setQrCodeUrl(null);
        } catch (error: any) {
            setMfaCodeStatus('error'); // Show error state
            setError(error.response?.data?.message || error.message || 'Failed to verify MFA code.');
        } finally {
            setLoading(false);
        }
    };

    const handleUnlinkMfaCode = async (verificationCode?: string) => {
        const codeToVerify = verificationCode || mfaCode.join('');

        if (!codeToVerify || codeToVerify.length !== 6) {
            setError('Please enter a valid 6-digit code');
            setMfaCodeStatus('error');
            return;
        }

        setLoading(true);
        setError(null);
        setMfaCodeStatus('normal');

        try {
            await unlink.totp(codeToVerify);
            setMfaCodeStatus('success'); // Only show success after actual unlink success
            closePopup();
            setMfaCode(['', '', '', '', '', '']);
        } catch (error: any) {
            setMfaCodeStatus('error'); // Show error state
            setError(error.response?.data?.message || error.message || 'Failed to disable TOTP.');
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

    const downloadBackup = async () => {
        if (mfaSecret && user && appConfig) {
            const appName = appConfig.name || 'pr0d.io';
            const userEmail = user.email?.email || 'user';

            // Create backup data
            const backupData = {
                service: appName,
                account: userEmail,
                secret: mfaSecret,
                created_at: new Date().toISOString(),
                backup_type: 'mfa_authenticator'
            };

            // Create downloadable file
            const content = JSON.stringify(backupData, null, 2);
            const blob = new Blob([content], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            // Create download link
            const link = document.createElement('a');
            link.href = url;
            link.download = `${appName.replace(/[^a-zA-Z0-9]/g, '_')}_mfa_backup_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up
            URL.revokeObjectURL(url);

            // Show success feedback
            setBackupDownloaded(true);
            setTimeout(() => setBackupDownloaded(false), 2000);
        }
    };

    const handlePasskeySetup = async () => {
        if (!helpers.isPasskeySupported) {
            setError('Passkeys are not supported on this device');
            return;
        }

        setLoadingButton('mfa-passkey');
        setError(null);

        try {
            setMfaStep('passkey');

            await link.passkey();

            // Show success view
            setMfaStep('passkey-success');

            // Close popup after showing success
            closePopup();
            setMfaStep('method');
        } catch (err: any) {
            console.error('Passkey setup failed:', err);
            setError(err.response?.data?.message || err.message || 'Failed to create passkey');

            // Check if we're in direct passkey mode or multi-choice MFA mode
            if (popup.view === 'mfa-passkey') {
                // Direct passkey mode - show dedicated error view
                setPopupView('mfa-passkey-error');
            } else {
                // Multi-choice MFA mode - go back to method selection
                setMfaStep('method');
            }
        } finally {
            setLoadingButton(null);
        }
    };

    // Handle mobile deeplink for wallet connections
    const handleMobileDeepLink = async () => {
        if (!walletConnectUri || !connectingWallet) return;

        let deepLinkUrl = '';

        if (connectingWallet.name?.toLowerCase().includes('binance')) {
            deepLinkUrl = `bnc://app.binance.com/cedefi/wc?uri=${encodeURIComponent(walletConnectUri)}`;
        } else if (connectingWallet.name?.toLowerCase().includes('trust')) {
            deepLinkUrl = `https://link.trustwallet.com/wc?uri=${encodeURIComponent(walletConnectUri)}`;
        } else if (connectingWallet.name?.toLowerCase().includes('walletconnect')) {
            // Generic WalletConnect deeplink
            deepLinkUrl = `wc:${walletConnectUri}`;
        }

        if (deepLinkUrl) {
            if (isMobileDevice()) {
                window.location.href = deepLinkUrl; // Use direct redirect for better reliability
            } else {
                window.open(deepLinkUrl, '_blank');
            }
        }
    };

    const handleResend = async () => {
        if (resendCooldown > 0) return;
        setLoading(true);
        try {
            await login.sendEmailCode(email, true);
            setResendCooldown(30);
        } catch (e: any) {
            setError(e.response?.data?.message || e.message || 'Failed to resend code');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div style={styles.overlay} onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setError(null);
                    setLoading(false);
                    setLoadingButton(null);
                    closePopup();
                }
            }}>
                <div style={styles.modal}>
                    <button style={styles.close} onClick={() => {
                        setError(null);
                        setLoading(false);
                        setLoadingButton(null);
                        closePopup();
                    }}>
                        <X size={16} />
                    </button>

                    {/* Back button for certain views - hide for authenticated users in wallet linking mode */}
                    {(popup.view === 'email-code' ||
                        popup.view === 'email-link-code' ||
                        (popup.view === 'wallet' && !(isAuthenticated && isWalletLinkingMode)) ||
                        (popup.view === 'wallet-connecting' && !(isAuthenticated && isWalletLinkingMode)) ||
                        (popup.view === 'wallet-signing' && !(isAuthenticated && isWalletLinkingMode)) ||
                        (popup.view === 'wallet-success' && !(isAuthenticated && isWalletLinkingMode)) ||
                        (popup.view === 'wallet-verifying' && !(isAuthenticated && isWalletLinkingMode)) ||
                        (popup.view === 'wallet-error' && !(isAuthenticated && isWalletLinkingMode)) ||
                        (popup.view === 'oauth-error' && !isAuthenticated) ||
                        (popup.view === 'mfa' && (mfaStep === 'qr' || mfaStep === 'code')) ||
                        popup.view === 'mfa-totp-disable') && (
                            <button
                                style={styles.backArrow}
                                onClick={() => {
                                    if (popup.view === 'email-code') {
                                        setStep('email');
                                        setError(null);
                                        setCode(['', '', '', '', '', '']);
                                    } else if (popup.view === 'email-link-code') {
                                        setPopupView('email-link');
                                        setError(null);
                                        setCode(['', '', '', '', '', '']);
                                    } else if (popup.view === 'mfa') {
                                        if (mfaStep === 'code') {
                                            setMfaStep('qr');
                                        } else if (mfaStep === 'qr') {
                                            setMfaStep('method');
                                        }
                                        setError(null);
                                        setMfaCode(['', '', '', '', '', '']);
                                    } else if (popup.view === 'mfa-totp-disable') {
                                        closePopup();
                                        setError(null);
                                        setMfaCode(['', '', '', '', '', '']);
                                    } else {
                                        // Reset all relevant states when going back
                                        goBackFromView(popup.view);
                                        setError(null);
                                        setLoading(false);
                                        setLoadingButton(null);
                                    }
                                }}
                            >
                                <ArrowLeft size={16} />
                            </button>
                        )}

                    {/* Method Selection View */}
                    {popup.view === 'method-select' && (
                        <div style={{ textAlign: 'center' }}>
                            {step === 'email' ? (
                                <>
                                    <p style={styles.titleSmall}>Log in or sign up</p>

                                    {appConfig?.image && (
                                        <div style={styles.logo}>
                                            <img src={appConfig.image} alt={appConfig.name} style={styles.logoImage} />
                                        </div>
                                    )}

                                    <div style={styles.inputContainer}>
                                        <Mail style={styles.inputIcon} />
                                        <input
                                            style={{
                                                ...styles.inputField,
                                                borderColor: focusedInput === 'login-email' ? accent : (isLightColor(background) ? '#e5e7eb' : '#636363')
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
                                                opacity: (loadingButton === 'email-submit' || !email || !isValidEmail(email)) ? 0.3 : 1,
                                                color: (loadingButton === 'email-submit' || !email || !isValidEmail(email)) ? '#ccc' : accent,
                                                cursor: (loadingButton === 'email-submit' || !email || !isValidEmail(email)) ? 'not-allowed' : 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}
                                            onClick={handleInitEmail}
                                            disabled={loadingButton === 'email-submit' || !email || !isValidEmail(email)}
                                            type="button"
                                        >
                                            Submit
                                            {loadingButton === 'email-submit' && <Spinner size={12} />}
                                        </button>
                                    </div>

                                    {appConfig?.options?.google && (
                                        <FocusableButton
                                            id="google-login"
                                            style={styles.altButton}
                                            onClick={() => {
                                                setLoadingButton('google');
                                                login.withGoogle();
                                            }}
                                            disabled={loadingButton !== null}
                                            focusedButton={focusedButton}
                                            setFocusedButton={setFocusedButton}
                                            hoveredButton={hoveredButton}
                                            setHoveredButton={setHoveredButton}
                                            appConfig={appConfig}
                                            hoverBackgroundColor={isLightColor(background) ? '#f8f9fa' : '#3a3a3a'}
                                            defaultBackgroundColor={isLightColor(background) ? '#ffffff' : '#2a2a2a'}
                                        >
                                            <svg style={styles.providerIcon} viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                            </svg>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                <span>Google</span>
                                                {loadingButton === 'google' && <Spinner size={16} />}
                                            </div>
                                        </FocusableButton>
                                    )}

                                    {appConfig?.options?.x && (
                                        <FocusableButton
                                            id="x-login"
                                            style={styles.altButton}
                                            onClick={() => {
                                                setLoadingButton('x');
                                                login.withX();
                                            }}
                                            disabled={loadingButton !== null}
                                            focusedButton={focusedButton}
                                            setFocusedButton={setFocusedButton}
                                            hoveredButton={hoveredButton}
                                            setHoveredButton={setHoveredButton}
                                            appConfig={appConfig}
                                            hoverBackgroundColor={isLightColor(background) ? '#f8f9fa' : '#3a3a3a'}
                                            defaultBackgroundColor={isLightColor(background) ? '#ffffff' : '#2a2a2a'}
                                        >
                                            <svg style={styles.providerIcon} viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                <span>Twitter</span>
                                                {loadingButton === 'x' && <Spinner size={16} />}
                                            </div>
                                        </FocusableButton>
                                    )}

                                    {appConfig?.options?.github && (
                                        <FocusableButton
                                            id="github-login"
                                            style={styles.altButton}
                                            onClick={() => {
                                                setLoadingButton('github');
                                                login.withGithub();
                                            }}
                                            disabled={loadingButton !== null}
                                            focusedButton={focusedButton}
                                            setFocusedButton={setFocusedButton}
                                            hoveredButton={hoveredButton}
                                            setHoveredButton={setHoveredButton}
                                            appConfig={appConfig}
                                            hoverBackgroundColor={isLightColor(background) ? '#f8f9fa' : '#3a3a3a'}
                                            defaultBackgroundColor={isLightColor(background) ? '#ffffff' : '#2a2a2a'}
                                        >
                                            <svg style={styles.providerIcon} viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                <span>GitHub</span>
                                                {loadingButton === 'github' && <Spinner size={16} />}
                                            </div>
                                        </FocusableButton>
                                    )}

                                    {appConfig?.options?.discord && (
                                        <FocusableButton
                                            id="discord-login"
                                            style={styles.altButton}
                                            onClick={() => {
                                                setLoadingButton('discord');
                                                login.withDiscord();
                                            }}
                                            disabled={loadingButton !== null}
                                            focusedButton={focusedButton}
                                            setFocusedButton={setFocusedButton}
                                            hoveredButton={hoveredButton}
                                            setHoveredButton={setHoveredButton}
                                            appConfig={appConfig}
                                            hoverBackgroundColor={isLightColor(background) ? '#f8f9fa' : '#3a3a3a'}
                                            defaultBackgroundColor={isLightColor(background) ? '#ffffff' : '#2a2a2a'}
                                        >
                                            <svg style={styles.providerIcon} viewBox="0 0 24 24" fill="#5865F2">
                                                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a .077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a .076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a .077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a .0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a .0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a .077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a .076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a .077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a .061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                                            </svg>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                <span>Discord</span>
                                                {loadingButton === 'discord' && <Spinner size={16} />}
                                            </div>
                                        </FocusableButton>
                                    )}

                                    {appConfig?.options?.passkey && (
                                        <FocusableButton
                                            id="passkey-login"
                                            style={styles.altButton}
                                            onClick={() => {
                                                setLoadingButton('passkey');
                                                login.withPasskey();
                                            }}
                                            disabled={loadingButton !== null}
                                            focusedButton={focusedButton}
                                            setFocusedButton={setFocusedButton}
                                            hoveredButton={hoveredButton}
                                            setHoveredButton={setHoveredButton}
                                            appConfig={appConfig}
                                            hoverBackgroundColor={isLightColor(background) ? '#f8f9fa' : '#3a3a3a'}
                                            defaultBackgroundColor={isLightColor(background) ? '#ffffff' : '#2a2a2a'}
                                        >
                                            <FingerprintIcon style={{ width: 24, height: 24, flexShrink: 0 }} />
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                <span>Passkey</span>
                                                {loadingButton === 'passkey' ? <Spinner size={16} /> : <ChevronRight size={16} />}
                                            </div>
                                        </FocusableButton>
                                    )}

                                    {appConfig?.options?.externalWallet && (
                                        <FocusableButton
                                            id="wallet-auth"
                                            style={styles.altButton}
                                            onClick={() => {
                                                setLoadingButton('wallet');
                                                resetWalletStates();
                                                setPopupView('wallet');
                                            }}
                                            disabled={loadingButton !== null}
                                            focusedButton={focusedButton}
                                            setFocusedButton={setFocusedButton}
                                            hoveredButton={hoveredButton}
                                            setHoveredButton={setHoveredButton}
                                            appConfig={appConfig}
                                            hoverBackgroundColor={isLightColor(background) ? '#f8f9fa' : '#3a3a3a'}
                                            defaultBackgroundColor={isLightColor(background) ? '#ffffff' : '#2a2a2a'}
                                        >
                                            <WalletCards style={styles.providerIcon} strokeWidth={1.5} />
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                <span>Continue with Wallet</span>
                                                {loadingButton === 'wallet' ? <Spinner size={16} /> : <ChevronRight size={16} />}
                                            </div>
                                        </FocusableButton>
                                    )}
                                </>
                            ) : (
                                <>
                                    <h3 style={styles.title}>Enter confirmation code</h3>
                                    <div style={styles.emailIconContainer}>
                                        <svg style={styles.emailIconLarge} viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </div>
                                    <p style={styles.codeText}>
                                        Enter the 6-digit code sent to<br />
                                        <strong>{email}</strong>
                                    </p>
                                    <div style={styles.codeContainer} onPaste={handlePaste}>
                                        {code.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => { inputRefs.current[index] = el; }}
                                                style={{
                                                    ...styles.codeInput,
                                                    borderColor: codeStatus === 'error' ? '#dc3545' :
                                                        codeStatus === 'success' ? '#4CAF50' :
                                                            focusedInput === `login-code-${index}` ? accent : (isLightColor(background) ? '#e5e7eb' : '#636363'),
                                                    borderWidth: (codeStatus === 'error' || codeStatus === 'success') ? '2px' : '1px'
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
                                                disabled={loading}
                                            />
                                        ))}
                                    </div>
                                    <div style={{ marginTop: 16, height: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {loading ? (
                                            <div style={{ width: 24, height: 24, border: '2px solid #f3f3f3', borderTop: `2px solid ${accent}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                        ) : error ? (
                                            <div style={{ ...styles.error, fontSize: 14 }}>{error}</div>
                                        ) : null}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16, gap: '20px' }}>
                                        <a
                                            onClick={() => {
                                                setStep('email');
                                                setError(null);
                                                setCode(['', '', '', '', '', '']);
                                            }}
                                            style={{
                                                color: accent,
                                                cursor: 'pointer',
                                                fontSize: 14,
                                                textDecoration: 'none'
                                            }}
                                        >
                                            Back to Email
                                        </a>
                                        <a
                                            onClick={handleResend}
                                            style={{
                                                color: resendCooldown > 0 ? accent : accent,
                                                cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer',
                                                fontSize: 14,
                                                textDecoration: 'none'
                                            }}
                                        >
                                            Resend{resendCooldown > 0 ? ` (${resendCooldown}s)` : ''}
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Email Link View */}
                    {popup.view === 'email-link' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={styles.shieldIcon}>
                                <Mail size={48} color={appConfig?.accent || "#666"} />
                            </div>
                            <h3 style={styles.title}>Link email</h3>
                            <p style={styles.walletConnectingMessage}>Add an email address to your account for additional security and account recovery.</p>
                            <br />

                            <div style={styles.inputContainer}>
                                <Mail style={styles.inputIcon} />
                                <input
                                    style={{
                                        ...styles.inputField,
                                        borderColor: focusedInput === 'link-email' ? accent : (isLightColor(background) ? '#e5e7eb' : '#636363')
                                    }}
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedInput('link-email')}
                                    onBlur={() => setFocusedInput(null)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleInitEmailLink();
                                        }
                                    }}
                                />
                                <button
                                    style={{
                                        ...styles.inputSubmitButton,
                                        opacity: (loadingButton === 'email-link-submit' || !email || !isValidEmail(email)) ? 0.3 : 1,
                                        color: (loadingButton === 'email-link-submit' || !email || !isValidEmail(email)) ? '#ccc' : accent,
                                        cursor: (loadingButton === 'email-link-submit' || !email || !isValidEmail(email)) ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                    onClick={handleInitEmailLink}
                                    disabled={loadingButton === 'email-link-submit' || !email || !isValidEmail(email)}
                                    type="button"
                                >
                                    Submit
                                    {loadingButton === 'email-link-submit' && <Spinner size={12} />}
                                </button>
                            </div>

                            {error && <div style={styles.error}>{error}</div>}
                        </div>
                    )}

                    {/* Email Link Code View */}
                    {popup.view === 'email-link-code' && (
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={styles.title}>Enter confirmation code</h3>
                            <div style={styles.emailIconContainer}>
                                <Mail style={styles.emailIconLarge} />
                            </div>
                            <p style={styles.codeText}>
                                Enter the 6-digit code sent to<br />
                                <strong>{email}</strong>
                            </p>
                            <div style={styles.codeContainer} onPaste={handleEmailLinkPaste}>
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                        style={{
                                            ...styles.codeInput,
                                            borderColor: codeStatus === 'error' ? '#dc3545' :
                                                codeStatus === 'success' ? '#4CAF50' :
                                                    focusedInput === `link-code-${index}` ? accent : (isLightColor(background) ? '#e5e7eb' : '#636363'),
                                            borderWidth: (codeStatus === 'error' || codeStatus === 'success') ? '2px' : '1px'
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => {
                                            if (/^[0-9]?$/.test(e.target.value)) {
                                                if (error) setError(null);
                                                setCodeStatus('normal');

                                                const newCode = [...code];
                                                newCode[index] = e.target.value;
                                                setCode(newCode);
                                                if (e.target.value && index < 5) {
                                                    inputRefs.current[index + 1]?.focus();
                                                }
                                                // Auto-submit when all 6 digits are entered
                                                if (e.target.value && index === 5 && newCode.every(digit => digit)) {
                                                    handleVerifyEmailLinkCode(newCode.join(''));
                                                }
                                            }
                                        }}
                                        onFocus={() => setFocusedInput(`link-code-${index}`)}
                                        onBlur={() => setFocusedInput(null)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Backspace' && !code[index] && index > 0) {
                                                inputRefs.current[index - 1]?.focus();
                                            }
                                        }}
                                        autoComplete="one-time-code"
                                        disabled={loading}
                                    />
                                ))}
                            </div>
                            <div style={{ marginTop: 16, height: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {loading ? (
                                    <div style={{ width: 24, height: 24, border: '2px solid #f3f3f3', borderTop: `2px solid ${accent}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                ) : error ? (
                                    <div style={{ ...styles.error, fontSize: 14 }}>{error}</div>
                                ) : null}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16, gap: '20px' }}>
                                <a
                                    onClick={() => {
                                        setPopupView('email-link');
                                        setError(null);
                                        setCode(['', '', '', '', '', '']);
                                    }}
                                    style={{
                                        color: accent,
                                        cursor: 'pointer',
                                        fontSize: 14,
                                        textDecoration: 'none'
                                    }}
                                >
                                    Back to Email
                                </a>
                                <a
                                    onClick={handleResend}
                                    style={{
                                        color: resendCooldown > 0 ? '#888' : accent,
                                        cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer',
                                        fontSize: 14,
                                        textDecoration: 'none'
                                    }}
                                >
                                    Resend{resendCooldown > 0 ? ` (${resendCooldown}s)` : ''}
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Email Code View */}
                    {popup.view === 'email-code' && (
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={styles.title}>Enter confirmation code</h3>
                            <div style={styles.emailIconContainer}>
                                <Mail style={styles.emailIconLarge} />
                            </div>
                            <p style={styles.codeText}>
                                Enter the 6-digit code sent to<br />
                                <strong>{email}</strong>
                            </p>
                            <div style={styles.codeContainer} onPaste={handlePaste}>
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                        style={{
                                            ...styles.codeInput,
                                            borderColor: codeStatus === 'error' ? '#dc3545' :
                                                codeStatus === 'success' ? '#4CAF50' :
                                                    focusedInput === `login-code-${index}` ? accent : (isLightColor(background) ? '#e5e7eb' : '#636363'),
                                            borderWidth: (codeStatus === 'error' || codeStatus === 'success') ? '2px' : '1px'
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
                                        disabled={loading}
                                    />
                                ))}
                            </div>
                            <div style={{ marginTop: 16, height: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {loading ? (
                                    <div style={{ width: 24, height: 24, border: '2px solid #f3f3f3', borderTop: `2px solid ${accent}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                ) : error ? (
                                    <div style={{ ...styles.error, fontSize: 14 }}>{error}</div>
                                ) : null}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16, gap: '20px' }}>
                                <a
                                    onClick={() => {
                                        setStep('email');
                                        setError(null);
                                        setCode(['', '', '', '', '', '']);
                                    }}
                                    style={{
                                        color: accent,
                                        cursor: 'pointer',
                                        fontSize: 14,
                                        textDecoration: 'none'
                                    }}
                                >
                                    Back to Email
                                </a>
                                <a
                                    onClick={handleResend}
                                    style={{
                                        color: resendCooldown > 0 ? '#888' : accent,
                                        cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer',
                                        fontSize: 14,
                                        textDecoration: 'none'
                                    }}
                                >
                                    Resend{resendCooldown > 0 ? ` (${resendCooldown}s)` : ''}
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Wallet Selection View */}
                    {popup.view === 'wallet' && (
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={styles.titleSmall}>{isWalletLinkingMode ? 'Link Wallet' : 'Connect Wallet'}</h3>
                            <div style={styles.walletListContainer}>
                                {connectors && connectors.length > 0 ? (
                                    // Sort connectors to put the recent one first
                                    [...connectors].sort((a, b) => {
                                        const aIsRecent = recentConnectorId === a.id;
                                        const bIsRecent = recentConnectorId === b.id;

                                        if (aIsRecent && !bIsRecent) return -1; // a comes first
                                        if (!aIsRecent && bIsRecent) return 1;  // b comes first
                                        return 0; // maintain original order
                                    }).map((connector, index) => {
                                        const isWalletConnect = connector.requireQRcode || false;
                                        const isRecent = recentConnectorId === connector.id;

                                        return (
                                            <FocusableButton
                                                key={connector.uid || `connector-${index}`}
                                                id={`wallet-${connector.uid || index}`}
                                                style={styles.altButton}
                                                onClick={() => {
                                                    setLoadingButton(`wallet-${connector.uid || index}`);
                                                    helpers.setSelectedConnector(connector);
                                                    if (isWalletLinkingMode) {
                                                        link.wallet(connector);
                                                    } else {
                                                        login.withWallet(connector);
                                                    }
                                                }}
                                                disabled={loadingButton !== null}
                                                focusedButton={focusedButton}
                                                setFocusedButton={setFocusedButton}
                                                hoveredButton={hoveredButton}
                                                setHoveredButton={setHoveredButton}
                                                appConfig={appConfig}
                                                hoverBackgroundColor={isLightColor(background) ? '#f8f9fa' : '#3a3a3a'}
                                                defaultBackgroundColor={isLightColor(background) ? '#ffffff' : '#2a2a2a'}
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
                                                    <svg style={styles.providerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="1" y="3" width="22" height="18" rx="2" ry="2" />
                                                        <line x1="1" y1="9" x2="23" y2="9" />
                                                    </svg>
                                                )}
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                    <span>{connector.name}</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        {loadingButton === `wallet-${connector.uid || index}` ? (
                                                            <Spinner size={16} />
                                                        ) : (
                                                            <>
                                                                {isRecent && (
                                                                    <span style={{
                                                                        fontSize: 11,
                                                                        fontWeight: 600,
                                                                        color: appConfig?.accent || '#3B99FC',
                                                                        backgroundColor: getLightAccentColor(appConfig?.accent || '#20c997'),
                                                                        padding: '2px 6px',
                                                                        borderRadius: 4,
                                                                    }}>Recent</span>
                                                                )}
                                                                {isWalletConnect && (
                                                                    <span style={{
                                                                        fontSize: 11,
                                                                        fontWeight: 600,
                                                                        color: appConfig?.accent || '#3B99FC',
                                                                        backgroundColor: `${appConfig?.accent || '#3B99FC'}25`, // 25 hex = ~15% opacity
                                                                        padding: '2px 6px',
                                                                        borderRadius: 4,
                                                                    }}>QR</span>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
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
                    )}

                    {/* Wallet Connecting View */}
                    {popup.view === 'wallet-connecting' && (
                        <div style={styles.walletConnectingContainer}>
                            {walletConnectUri ? (
                                <div style={styles.walletConnectQrContainer}>
                                    <div style={styles.qrCodeContainer}>
                                        <div ref={walletQrCodeRef} style={styles.qrCodeWrapper}></div>
                                    </div>
                                    <h3 style={styles.walletConnectingTitle}>Scan with your wallet</h3>
                                    <p style={styles.walletConnectingMessage}>
                                        Open your mobile wallet and scan the QR code to connect.
                                    </p>

                                    {/* Mobile Deeplink Button */}
                                    {isMobileDevice() && (
                                        <button
                                            style={styles.mobileDeepLinkButton}
                                            onClick={handleMobileDeepLink}
                                        >
                                            <Smartphone style={styles.mobileIcon} />
                                            Open in {connectingWallet?.name || 'Wallet'}
                                        </button>
                                    )}
                                </div>
                            ) : (
                                // Show loading spinner while generating QR code or for non-QR wallets
                                <div style={styles.walletConnectingContainer}>
                                    <WalletStatusCircle
                                        appConfig={appConfig}
                                        status="loading"
                                        walletName={connectingWallet?.name || "Connecting"}
                                        connectors={connectors}
                                        connectingWallet={connectingWallet}
                                        hasLoadingAnimation={true}
                                    />
                                    <h3 style={styles.walletConnectingTitle}>
                                        {connectingWallet?.name && connectors.find((c: any) => c.id === connectingWallet.id)?.requireQRcode ?
                                            'Generating QR Code' :
                                            `Waiting for ${connectingWallet?.name || 'Wallet'}`
                                        }
                                    </h3>
                                    <p style={styles.walletConnectingMessage}>
                                        {connectingWallet?.name && connectors.find((c: any) => c.id === connectingWallet.id)?.requireQRcode ?
                                            'Please wait while we generate your QR code.' :
                                            "Don't see your wallet? Check your other browser windows."
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Wallet Signing View */}
                    {popup.view === 'wallet-signing' && (
                        <div style={styles.walletSigningContainer}>
                            <WalletStatusCircle
                                appConfig={appConfig}
                                status="signing"
                                walletName="Signing"
                                connectors={connectors}
                                connectingWallet={connectingWallet}
                                hasLoadingAnimation={true}
                            />
                            <h3 style={styles.walletConnectingTitle}>
                                Sign to verify
                            </h3>
                            <p style={styles.walletSigningMessage}>
                                Don't see your wallet? Check your other browser windows.
                            </p>
                        </div>
                    )}

                    {/* Wallet Success View */}
                    {popup.view === 'wallet-success' && (
                        <div style={styles.walletConnectingContainer}>
                            <WalletStatusCircle
                                appConfig={appConfig}
                                status="loading"
                                walletName="Connected"
                                connectors={connectors}
                                connectingWallet={connectingWallet}
                                hasLoadingAnimation={true}
                            />
                            <h3 style={styles.walletConnectingTitle}>
                                Wallet Connected
                            </h3>
                            <p style={styles.walletSigningMessage}>
                                Successfully connected to your wallet, obtaining a challenge to sign...
                            </p>
                        </div>
                    )}

                    {/* Wallet Verifying View */}
                    {popup.view === 'wallet-verifying' && (
                        <div style={styles.walletSigningContainer}>
                            <WalletStatusCircle
                                appConfig={appConfig}
                                status="signing"
                                walletName="Verifying"
                                connectors={connectors}
                                connectingWallet={connectingWallet}
                                hasLoadingAnimation={true}
                            />
                            <h3 style={styles.walletConnectingTitle}>
                                Verifying signature
                            </h3>
                            <p style={styles.walletSigningMessage}>
                                Confirming your identity with the server, this should only take a moment.
                            </p>
                        </div>
                    )}

                    {/* Wallet Login Success View */}
                    {popup.view === 'wallet-login-success' && (
                        <div style={styles.walletConnectingContainer}>
                            <WalletStatusCircle
                                appConfig={appConfig}
                                status="success"
                                walletName="Authenticated"
                                connectors={connectors}
                                connectingWallet={connectingWallet}
                            />
                            <h3 style={styles.walletConnectingTitle}>
                                Successfully verified
                            </h3>
                            <p style={styles.walletSigningMessage}>
                                You are ready to go. This window will close automatically.
                            </p>
                        </div>
                    )}

                    {/* Wallet Error View */}
                    {popup.view === 'wallet-error' && (
                        <div style={styles.walletErrorContainer}>
                            <WalletStatusCircle
                                appConfig={appConfig}
                                status="error"
                                walletName="Error"
                                connectors={connectors}
                                connectingWallet={connectingWallet}
                            />
                            <h3 style={styles.walletErrorTitle}>Could not {isWalletLinkingMode ? 'link' : 'connect'} wallet</h3>
                            <p style={styles.walletErrorSubtitle}>{walletError || 'Connection failed. Please try again.'}</p>
                            <FocusableButton
                                id="wallet-retry"
                                style={{
                                    ...styles.walletRetryButton,
                                    backgroundColor: appConfig?.accent || '#007bff',
                                    color: '#fff'
                                }}
                                onClick={() => {
                                    resetWalletStates();
                                    if (isAuthenticated && isWalletLinkingMode) {
                                        // For authenticated users, stay in wallet linking mode
                                        link.wallet();
                                    } else {
                                        // For non-authenticated users, go back to wallet selection
                                        setPopupView('wallet');
                                    }
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
                    )}

                    {/* OAuth Loading View */}
                    {popup.view === 'oauth-loading' && (
                        <div style={styles.oauthLoadingContainer}>
                            {currentProvider ? (
                                <ProviderStatusCircle
                                    status="loading"
                                    provider={currentProvider}
                                    hasLoadingAnimation={true}
                                    appConfig={appConfig}
                                />
                            ) : (
                                <div style={{ position: 'relative', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `3px solid ${appConfig?.accent || '#20c997'}` }}>
                                        <div style={{ fontSize: 24, fontWeight: 600, color: '#4A90E2', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>?</div>
                                    </div>
                                    <div style={{
                                        position: 'absolute', top: 0, left: 0, width: 64, height: 64,
                                        border: '3px solid #e3f2fd', borderTop: `3px solid ${appConfig?.accent || '#20c997'}`,
                                        borderRadius: '50%', animation: 'spin 1s linear infinite'
                                    }} />
                                </div>
                            )}
                            <h3 style={styles.oauthLoadingTitle}>
                                {currentProvider ?
                                    `Verifying connection to ${currentProvider === 'x' ? 'X' : currentProvider.charAt(0).toUpperCase() + currentProvider.slice(1)}` :
                                    'Verifying connection'
                                }
                            </h3>
                            <p style={styles.oauthLoadingMessage}>Just a few moments more</p>
                        </div>
                    )}

                    {/* OAuth Success View */}
                    {popup.view === 'oauth-success' && (
                        <div style={styles.oauthLoadingContainer}>
                            {currentProvider ? (
                                <ProviderStatusCircle
                                    status="success"
                                    provider={currentProvider}
                                    appConfig={appConfig}
                                />
                            ) : (
                                <div style={{ position: 'relative', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #4CAF50' }}>
                                        <div style={{ fontSize: 32, color: '#4CAF50' }}>✓</div>
                                    </div>
                                </div>
                            )}
                            <h3 style={styles.oauthLoadingTitle}>
                                Successfully verified
                            </h3>
                            <p style={styles.oauthLoadingMessage}>
                                You are ready to go
                            </p>
                        </div>
                    )}

                    {/* OAuth Error View */}
                    {popup.view === 'oauth-error' && (
                        <div style={styles.oauthErrorContainer}>
                            {oauthError?.provider && oauthError.provider !== 'unknown' ? (
                                <ProviderStatusCircle
                                    status="error"
                                    provider={oauthError.provider as 'google' | 'discord' | 'github' | 'x'}
                                    appConfig={appConfig}
                                />
                            ) : (
                                <div style={{ position: 'relative', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #dc3545' }}>
                                        <X size={32} color="#dc3545" />
                                    </div>
                                </div>
                            )}
                            <h3 style={styles.oauthErrorTitle}>Authentication failed</h3>
                            <p style={styles.oauthErrorMessage}>
                                {oauthError?.errorMessage || "Something went wrong. Please try again."}
                            </p>
                            <button
                                style={{
                                    ...styles.retryButton,
                                    backgroundColor: appConfig?.accent || '#007bff',
                                    color: '#fff'
                                }}
                                onClick={() => {
                                    // Clear error state and retry the specific provider if known
                                    if (oauthError?.provider && oauthError.provider !== 'unknown') {
                                        resetOAuthStates();
                                        setPopupView('oauth-loading');

                                        // Retry the specific provider login
                                        setTimeout(() => {
                                            switch (oauthError.provider) {
                                                case 'google':
                                                    login.withGoogle();
                                                    break;
                                                case 'discord':
                                                    login.withDiscord();
                                                    break;
                                                case 'github':
                                                    login.withGithub();
                                                    break;
                                                case 'x':
                                                    login.withX();
                                                    break;
                                                default:
                                                    setPopupView('method-select');
                                                    break;
                                            }
                                        }, 100);
                                    } else {
                                        resetOAuthStates();
                                        setPopupView('method-select');
                                    }
                                }}
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {/* Passkey Loading View */}
                    {popup.view === 'passkey-loading' && (
                        <div style={styles.passkeyLoadingContainer}>
                            <PasskeyStatusCircle
                                status="loading"
                                hasLoadingAnimation={true}
                                appConfig={appConfig}
                            />
                            <h3 style={styles.passkeyLoadingTitle}>
                                Waiting for Passkey
                            </h3>
                            <p style={styles.passkeyLoadingMessage}>
                                Please use your face, fingerprint, or device PIN to authenticate
                            </p>
                        </div>
                    )}

                    {/* Passkey Signing View */}
                    {popup.view === 'passkey-signing' && (
                        <div style={styles.passkeySigningContainer}>
                            <PasskeyStatusCircle
                                status="signing"
                                hasLoadingAnimation={true}
                                appConfig={appConfig}
                            />
                            <h3 style={styles.passkeySigningTitle}>
                                Verifying Passkey
                            </h3>
                            <p style={styles.passkeySigningMessage}>
                                Confirming your identity with the server
                            </p>
                        </div>
                    )}

                    {/* Passkey Login Success View */}
                    {popup.view === 'passkey-login-success' && (
                        <div style={styles.walletConnectingContainer}>
                            <PasskeyStatusCircle
                                status="success"
                                appConfig={appConfig}
                            />
                            <h3 style={styles.passkeySigningTitle}>
                                Successfully verified
                            </h3>
                            <p style={styles.passkeySigningMessage}>
                                You are ready to go
                            </p>
                        </div>
                    )}

                    {/* Passkey Error View */}
                    {popup.view === 'passkey-error' && (
                        <div style={styles.passkeyErrorContainer}>
                            <PasskeyStatusCircle
                                status="error"
                                appConfig={appConfig}
                            />
                            <h3 style={styles.passkeyErrorTitle}>
                                Passkey Authentication Failed
                            </h3>
                            <p style={styles.passkeyErrorMessage}>
                                Failed to authenticate with passkey
                            </p>
                            <div style={styles.passkeyErrorButtons}>
                                <FocusableButton
                                    id="passkey-retry"
                                    style={styles.retryButton}
                                    onClick={() => {
                                        // No need to reset specific states for passkey, just go back to method select
                                        setPopupView('method-select');
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
                    )}

                    {/* MFA Setup Views */}
                    {popup.view === 'mfa' && (
                        <div style={{ textAlign: 'center' }}>
                            {mfaStep === 'method' && (
                                <>
                                    <div style={styles.shieldIcon}>
                                        <Shield size={48} color={appConfig?.accent || "#666"} />
                                    </div>
                                    <h3 style={styles.title}>Choose a verification method</h3>
                                    <p style={styles.walletConnectingMessage}>How would you like to verify your identity? You can change this later.</p>
                                    <br />
                                    <div style={styles.methodContainer}>
                                        <FocusableButton
                                            id="mfa-authenticator"
                                            style={{
                                                ...styles.altButton,
                                                opacity: (loadingButton !== null || user?.mfa) ? 0.7 : 1
                                            }}
                                            onClick={() => fetchMfaSetup()}
                                            disabled={loadingButton !== null || user?.mfa}
                                            focusedButton={focusedButton}
                                            setFocusedButton={setFocusedButton}
                                            hoveredButton={hoveredButton}
                                            setHoveredButton={setHoveredButton}
                                            appConfig={appConfig}
                                            hoverBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#f0f0f0' : '#3a3a3a'}
                                            defaultBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#ffffff' : '#2a2a2a'}
                                        >
                                            <Smartphone size={20} />
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                <span>Authenticator app</span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    {loadingButton === 'mfa-authenticator' ? (
                                                        <Spinner size={16} />
                                                    ) : (
                                                        <>
                                                            {user?.mfa && (
                                                                <span style={{
                                                                    fontSize: 11,
                                                                    fontWeight: 600,
                                                                    color: '#dc3545',
                                                                    backgroundColor: '#dc354525',
                                                                    padding: '2px 6px',
                                                                    borderRadius: 4,
                                                                }}>Already Linked</span>
                                                            )}
                                                            {!user?.mfa && (
                                                                <span style={{
                                                                    fontSize: 11,
                                                                    fontWeight: 600,
                                                                    color: appConfig?.accent || '#20c997',
                                                                    backgroundColor: `${appConfig?.accent || '#20c997'}25`,
                                                                    padding: '2px 6px',
                                                                    borderRadius: 4,
                                                                }}>Recommended</span>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </FocusableButton>

                                        {appConfig?.options?.passkey && (
                                            <FocusableButton
                                                id="mfa-passkey"
                                                style={{
                                                    ...styles.altButton,
                                                    opacity: (loadingButton !== null || !helpers.isPasskeySupported) ? 0.7 : 1
                                                }}
                                                onClick={() => handlePasskeySetup()}
                                                disabled={loadingButton !== null || !helpers.isPasskeySupported}
                                                focusedButton={focusedButton}
                                                setFocusedButton={setFocusedButton}
                                                hoveredButton={hoveredButton}
                                                setHoveredButton={setHoveredButton}
                                                appConfig={appConfig}
                                                hoverBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#f0f0f0' : '#3a3a3a'}
                                                defaultBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#ffffff' : '#2a2a2a'}
                                            >
                                                <FingerprintIcon style={{ width: 24, height: 24, flexShrink: 0 }} />
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        Passkey
                                                        {!helpers.isPasskeySupported && (
                                                            <span style={{
                                                                fontSize: 11,
                                                                fontWeight: 600,
                                                                color: '#dc3545',
                                                                backgroundColor: '#f8d7da',
                                                                padding: '2px 6px',
                                                                borderRadius: 4,
                                                            }}>Not Supported</span>
                                                        )}
                                                    </span>
                                                    {loadingButton === 'mfa-passkey' && <Spinner size={16} />}
                                                </div>
                                            </FocusableButton>
                                        )}
                                    </div>
                                    {error && <div style={styles.error}>{error}</div>}
                                </>
                            )}

                            {mfaStep === 'qr' && (
                                <div style={styles.mfaContainer}>
                                    <h3 style={styles.mfaTitle}>Scan QR code</h3>
                                    <p style={styles.mfaInstruction}>Open your authenticator app and scan the QR code to continue.</p>
                                    <div style={styles.qrCodeContainer}>
                                        <div ref={qrCodeRef} style={styles.qrCodeWrapper}></div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}>
                                        <button style={styles.copyButton} onClick={() => copySetupKey()}>
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
                                        <button style={styles.copyButton} onClick={() => downloadBackup()}>
                                            {backupDownloaded ? (
                                                <>
                                                    <svg style={styles.copyIcon} viewBox="0 0 24 24" fill="#666">
                                                        <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                                                    </svg>
                                                    Backup downloaded
                                                </>
                                            ) : (
                                                <>
                                                    <svg style={styles.copyIcon} viewBox="0 0 24 24" fill="#666">
                                                        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                                                    </svg>
                                                    Backup
                                                </>
                                            )}
                                        </button>
                                    </div>
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
                            )}

                            {mfaStep === 'code' && (
                                <div style={styles.mfaContainer}>
                                    <h3 style={styles.mfaTitle}>Enter enrollment code</h3>
                                    <div style={styles.emailIconContainer}>
                                        <QrCode size={40} color={appConfig?.accent || "#666"} />
                                    </div>
                                    <p style={styles.mfaInstruction}>To continue, enter the 6-digit code generated from your authenticator app.</p>
                                    <div style={styles.codeContainer} onPaste={handleMfaPaste}>
                                        {mfaCode.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => { mfaInputRefs.current[index] = el; }}
                                                style={{
                                                    ...styles.codeInput,
                                                    borderColor: mfaCodeStatus === 'error' ? '#dc3545' :
                                                        mfaCodeStatus === 'success' ? '#4CAF50' :
                                                            focusedInput === `mfa-code-${index}` ? (appConfig?.accent || (isLightColor(appConfig?.background || '#ffffff') ? '#e5e7eb' : '#636363')) : (isLightColor(appConfig?.background || '#ffffff') ? '#e5e7eb' : '#636363'),
                                                    borderWidth: (mfaCodeStatus === 'error' || mfaCodeStatus === 'success') ? '2px' : '1px'
                                                }}
                                                type="text"
                                                maxLength={1}
                                                inputMode="numeric"
                                                value={digit}
                                                onChange={(e) => {
                                                    if (/^[0-9]?$/.test(e.target.value)) {
                                                        if (error) setError(null);
                                                        setMfaCodeStatus('normal'); // Reset visual state when typing

                                                        const newCode = [...mfaCode];
                                                        newCode[index] = e.target.value;
                                                        setMfaCode(newCode);
                                                        if (e.target.value && index < 5) {
                                                            mfaInputRefs.current[index + 1]?.focus();
                                                        }
                                                        // Auto-submit when all 6 digits are entered
                                                        if (e.target.value && index === 5 && newCode.every(digit => digit)) {
                                                            handleVerifyMfaCode(newCode.join(''));
                                                        }
                                                    }
                                                }}
                                                onFocus={() => setFocusedInput(`mfa-code-${index}`)}
                                                onBlur={() => setFocusedInput(null)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Backspace' && !mfaCode[index] && index > 0) {
                                                        mfaInputRefs.current[index - 1]?.focus();
                                                    }
                                                }}
                                                disabled={loading}
                                            />
                                        ))}
                                    </div>
                                    <div style={{ marginTop: 16, height: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {loading ? (
                                            <div style={{ width: 24, height: 24, border: '2px solid #f3f3f3', borderTop: `2px solid ${appConfig?.accent || '#007bff'}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                        ) : error ? (
                                            <div style={{ ...styles.error, fontSize: 14 }}>{error}</div>
                                        ) : null}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16, gap: '20px' }}>
                                        <a
                                            onClick={() => {
                                                setMfaStep('qr');
                                                setError(null);
                                                setMfaCode(['', '', '', '', '', '']);
                                            }}
                                            style={{
                                                color: accent,
                                                cursor: 'pointer',
                                                fontSize: 14,
                                                textDecoration: 'none'
                                            }}
                                        >
                                            Back to QR Code
                                        </a>
                                    </div>
                                </div>
                            )}

                            {mfaStep === 'passkey' && (
                                <div style={styles.walletConnectingContainer}>
                                    <PasskeyStatusCircle
                                        status="loading"
                                        hasLoadingAnimation={true}
                                        appConfig={appConfig}
                                    />
                                    <h3 style={styles.walletConnectingTitle}>
                                        Creating Passkey
                                    </h3>
                                    <p style={styles.walletConnectingMessage}>
                                        Follow your browser's instructions to create a passkey
                                    </p>
                                </div>
                            )}

                            {mfaStep === 'passkey-success' && (
                                <div style={styles.walletConnectingContainer}>
                                    <PasskeyStatusCircle
                                        status="success"
                                        appConfig={appConfig}
                                    />
                                    <h3 style={styles.walletConnectingTitle}>
                                        Passkey Created Successfully
                                    </h3>
                                    <p style={styles.walletConnectingMessage}>
                                        Your passkey has been linked to your account for secure authentication
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Direct TOTP Setup View */}
                    {popup.view === 'mfa-totp' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={styles.shieldIcon}>
                                <Shield size={48} color={appConfig?.accent || "#666"} />
                            </div>
                            <h3 style={styles.title}>Set up authenticator app</h3>
                            <p style={styles.walletConnectingMessage}>Use your authenticator app to secure your account with time-based codes.</p>
                            <br />
                            <div style={styles.methodContainer}>
                                <FocusableButton
                                    id="mfa-authenticator-direct"
                                    style={{
                                        ...styles.altButton,
                                        opacity: (loadingButton !== null || user?.mfa) ? 0.7 : 1
                                    }}
                                    onClick={() => fetchMfaSetup()}
                                    disabled={loadingButton !== null || user?.mfa}
                                    focusedButton={focusedButton}
                                    setFocusedButton={setFocusedButton}
                                    hoveredButton={hoveredButton}
                                    setHoveredButton={setHoveredButton}
                                    appConfig={appConfig}
                                    hoverBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#f0f0f0' : '#3a3a3a'}
                                    defaultBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#ffffff' : '#2a2a2a'}
                                >
                                    <Smartphone size={20} />
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                        <span>Authenticator app</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            {loadingButton === 'mfa-authenticator' ? (
                                                <Spinner size={16} />
                                            ) : (
                                                <>
                                                    {user?.mfa && (
                                                        <span style={{
                                                            fontSize: 11,
                                                            fontWeight: 600,
                                                            color: '#dc3545',
                                                            backgroundColor: '#dc354525',
                                                            padding: '2px 6px',
                                                            borderRadius: 4,
                                                        }}>Already Linked</span>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </FocusableButton>
                            </div>
                            {error && <div style={styles.error}>{error}</div>}
                        </div>
                    )}

                    {/* Direct Passkey Setup View */}
                    {popup.view === 'mfa-passkey' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={styles.shieldIcon}>
                                <Shield size={48} color={appConfig?.accent || "#666"} />
                            </div>
                            <h3 style={styles.title}>Set up passkey</h3>
                            <p style={styles.walletConnectingMessage}>Use your device's built-in authentication to secure your account.</p>
                            <br />
                            <div style={styles.methodContainer}>
                                <FocusableButton
                                    id="mfa-passkey-direct"
                                    style={{
                                        ...styles.altButton,
                                        opacity: (loadingButton !== null || !helpers.isPasskeySupported) ? 0.7 : 1
                                    }}
                                    onClick={() => handlePasskeySetup()}
                                    disabled={loadingButton !== null || !helpers.isPasskeySupported}
                                    focusedButton={focusedButton}
                                    setFocusedButton={setFocusedButton}
                                    hoveredButton={hoveredButton}
                                    setHoveredButton={setHoveredButton}
                                    appConfig={appConfig}
                                    hoverBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#f0f0f0' : '#3a3a3a'}
                                    defaultBackgroundColor={isLightColor(appConfig?.background || '#ffffff') ? '#ffffff' : '#2a2a2a'}
                                >
                                    <FingerprintIcon style={{ width: 24, height: 24, flexShrink: 0 }} />
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            Passkey
                                            {!helpers.isPasskeySupported && (
                                                <span style={{
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                    color: '#dc3545',
                                                    backgroundColor: '#f8d7da',
                                                    padding: '2px 6px',
                                                    borderRadius: 4,
                                                }}>Not Supported</span>
                                            )}
                                        </span>
                                        {loadingButton === 'mfa-passkey' && <Spinner size={16} />}
                                    </div>
                                </FocusableButton>
                            </div>
                            {error && <div style={styles.error}>{error}</div>}
                        </div>
                    )}

                    {/* Direct TOTP Setup Error View */}
                    {popup.view === 'mfa-totp-error' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={styles.shieldIcon}>
                                <Shield size={48} color="#dc3545" />
                            </div>
                            <h3 style={styles.title}>Authenticator Setup Failed</h3>
                            <p style={styles.walletConnectingMessage}>
                                {error || 'Failed to initialize authenticator setup. Please try again.'}
                            </p>
                            <br />
                            <div style={styles.methodContainer}>
                                <FocusableButton
                                    id="mfa-totp-retry"
                                    style={{
                                        ...styles.altButton,
                                        backgroundColor: appConfig?.accent || '#007bff',
                                        color: '#fff',
                                        opacity: (loadingButton !== null) ? 0.7 : 1,
                                        justifyContent: 'center'
                                    }}
                                    onClick={() => {
                                        setError(null);
                                        setPopupView('mfa-totp');
                                    }}
                                    disabled={loadingButton !== null}
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
                    )}

                    {/* Direct Passkey Setup Error View */}
                    {popup.view === 'mfa-passkey-error' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={styles.shieldIcon}>
                                <Shield size={48} color="#dc3545" />
                            </div>
                            <h3 style={styles.title}>Passkey Setup Failed</h3>
                            <p style={styles.walletConnectingMessage}>
                                {error || 'Failed to create passkey. Please try again.'}
                            </p>
                            <br />
                            <div style={styles.methodContainer}>
                                <FocusableButton
                                    id="mfa-passkey-retry"
                                    style={{
                                        ...styles.altButton,
                                        backgroundColor: appConfig?.accent || '#007bff',
                                        color: '#fff',
                                        opacity: (loadingButton !== null) ? 0.7 : 1,
                                        justifyContent: 'center'
                                    }}
                                    onClick={() => {
                                        setError(null);
                                        setPopupView('mfa-passkey');
                                    }}
                                    disabled={loadingButton !== null}
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
                    )}

                    {/* TOTP Disable View */}
                    {popup.view === 'mfa-totp-disable' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Shield size={48} color="#dc3545" />
                            </div>
                            <h3 style={styles.title}>Disable Authenticator</h3>
                            <p style={{ ...styles.subtitle, color: mutedTextColor, marginBottom: 24 }}>
                                Enter your current 6-digit authenticator code to confirm removal.
                            </p>
                            
                            <div style={styles.codeContainer} onPaste={handleMfaUnlinkPaste}>
                                {mfaCode.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { mfaInputRefs.current[index] = el; }}
                                        style={{
                                            ...styles.codeInput,
                                            borderColor: mfaCodeStatus === 'error' ? '#dc3545' :
                                                mfaCodeStatus === 'success' ? '#4CAF50' :
                                                    focusedInput === `mfa-unlink-code-${index}` ? '#dc3545' : (isLightColor(background) ? '#e5e7eb' : '#636363'),
                                            borderWidth: (mfaCodeStatus === 'error' || mfaCodeStatus === 'success') ? '2px' : '1px'
                                        }}
                                        type="text"
                                        maxLength={1}
                                        inputMode="numeric"
                                        value={digit}
                                        onChange={(e) => {
                                            if (/^[0-9]?$/.test(e.target.value)) {
                                                if (error) setError(null);
                                                setMfaCodeStatus('normal');

                                                const newCode = [...mfaCode];
                                                newCode[index] = e.target.value;
                                                setMfaCode(newCode);
                                                if (e.target.value && index < 5) {
                                                    mfaInputRefs.current[index + 1]?.focus();
                                                }
                                                if (e.target.value && index === 5 && newCode.every(digit => digit)) {
                                                    handleUnlinkMfaCode(newCode.join(''));
                                                }
                                            }
                                        }}
                                        onFocus={() => setFocusedInput(`mfa-unlink-code-${index}`)}
                                        onBlur={() => setFocusedInput(null)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Backspace' && !mfaCode[index] && index > 0) {
                                                mfaInputRefs.current[index - 1]?.focus();
                                            }
                                        }}
                                        disabled={loading}
                                    />
                                ))}
                            </div>
                            
                            <div style={{ marginTop: 20, height: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {loading ? (
                                    <div style={{ width: 20, height: 20, border: '2px solid #f3f3f3', borderTop: '2px solid #dc3545', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                ) : error ? (
                                    <div style={{ color: '#dc3545', fontSize: 14, fontWeight: 500 }}>{error}</div>
                                ) : null}
                            </div>
                        </div>
                    )}

                    <div style={{ fontSize: 12, color: '#888', marginTop: 20, textAlign: 'center' }}>
                        <a href="https://pr0d.io" target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none' }}>
                            Protected by pr0d.io
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthPopup;
