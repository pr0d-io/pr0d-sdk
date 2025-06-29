import { AppConfig } from "./interfaces";

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const base64urlToUint8Array = (base64url: string): Uint8Array => {
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
};

export const isLightColor = (hexColor: string): boolean => {
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
export const getTextColor = (backgroundColor: string): string => {
    return isLightColor(backgroundColor) ? '#000000' : '#ffffff';
};

// Get appropriate secondary text color based on background
export const getSecondaryTextColor = (backgroundColor: string): string => {
    return isLightColor(backgroundColor) ? '#666666' : '#cccccc';
};

// Get light accent color for badges
export const getLightAccentColor = (accentColor: string): string => {
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

export const getStyles = (appConfig: AppConfig | null): Record<string, React.CSSProperties> => {
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
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 9999,
            opacity: 1,
            transition: 'opacity 0.3s ease-out'
        },
        modal: {
            backgroundColor: backgroundColor, 
            borderRadius: 16, 
            padding: 24, 
            width: 320, 
            textAlign: 'center', 
            position: 'relative',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease-out',
            color: textColor,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "SF Pro Display", Roboto, "Helvetica Neue", Arial, sans-serif',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            border: isLightColor(backgroundColor) ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'
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
            width: 64, height: 64, borderRadius: 16, margin: '20px auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center'
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
        titleSmall: {
            fontSize: 14, fontWeight: 500, marginBottom: 8, color: textColor
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
            width: 20,
            height: 20,
            pointerEvents: 'none',
            zIndex: 1
        },
        inputField: {
            width: '100%',
            padding: '14px 80px 14px 48px',
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
            width: 20,
            height: 20,
            flexShrink: 0
        },
        providerIcon: {
            width: 20,
            height: 20,
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
            width: 20,
            height: 20,
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
            margin: '0 0 8px 0'
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