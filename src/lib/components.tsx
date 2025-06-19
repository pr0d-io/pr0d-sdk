import React from 'react';
import { FocusableButtonProps, WalletCircleProps, ProviderCircleProps } from './interfaces';

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

export const Spinner = ({ size = 16 }: { size?: number }) => (
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

export const FocusableButton = ({
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

export const WalletStatusCircle = ({
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

export const ProviderStatusCircle = ({
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