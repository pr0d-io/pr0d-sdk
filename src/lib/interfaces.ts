export interface User {
    _id: string;
    email?: { email: string };
    mfa?: { secret: string };
    [key: string]: any;
}

export interface AppConfig {
    id: string;
    name: string;
    image: string;
    background: string;
    accent: string;
    allowedOrigins: string[];
    x: boolean;
    google: boolean;
    discord: boolean;
    github: boolean;
    telegram: boolean;
    apple: boolean;
    walletConnect: string;
    options: {
        allowEmail: boolean;
        allowEmailPlus: boolean;
        allowX: boolean;
        allowGoogle: boolean;
        allowDiscord: boolean;
        allowGithub: boolean;
        allowTelegram: boolean;
        allowExternalWallets: boolean;
        allowPasskeys: boolean;
    }
}

export interface Session {
    id: string;
    createdAt: string;
    userAgent: string;
    ipAddress: string;
    expiresAt: string | null;
    isCurrentSession: boolean;
}

export interface AuthContextType {
    accessToken: string | null;
    isAuthenticated: boolean;
    user: User | null;
    ready: boolean;
    logout: () => void;
    login: () => void;
    refreshSession: () => Promise<void>;
    triggerMfaSetup: () => void;
    triggerEmailLink: () => void;
    triggerProviderLink: () => void;
    triggerWalletLink: () => void;
    triggerPasskeySetup: () => void;
    linkMFA: () => Promise<void>;
    linkPasskey: () => void;
    setupMFA: () => Promise<{ secret: string; qrCodeUrl: string }>;
    verifyMFA: (code: string) => Promise<boolean>;
    deleteMFA: () => Promise<void>;
    initEmailLink: (email: string) => Promise<void>;
    linkEmail: (email: string, code: string) => Promise<boolean>;
    linkProvider: (provider: 'google' | 'discord' | 'x' | 'github') => Promise<void>;
    unlinkProvider: (provider: 'google' | 'discord' | 'x' | 'github') => Promise<void>;
    linkWallet: (signature: string, nonce: string) => Promise<boolean>;
    unlinkWallet: (address: string) => Promise<void>;
    linkGoogle: () => Promise<void>;
    linkDiscord: () => Promise<void>;
    linkGithub: () => Promise<void>;
    linkX: () => Promise<void>;
    initPasskey: (userHandle?: string) => Promise<{ options: any; type: 'registration' | 'authentication' }>;
    verifyPasskey: (credential: any) => Promise<{ type: 'registration' | 'authentication'; user?: User; accessToken?: string; refreshToken?: string; message: string }>;
    listPasskeys: () => Promise<{ passkeys: any[]; count: number }>;
    deletePasskey: (credentialId: string) => Promise<void>;
    getUser: (token?: string) => Promise<User>;
    getAllSessions: () => Promise<{ sessions: Session[]; totalCount: number }>;
    revokeAllSessions: () => Promise<{ message: string; revokedCount: number }>;
    revokeSession: (sessionId: string) => Promise<{ message: string }>;
    teeSignMessage: (message: string) => Promise<{ signature: string; address: string; message: string }>;
    sendEmailCode: (email: string) => Promise<any>;
    loginWithEmailCode: (email: string, code: string) => Promise<any>;
    loginWithEmailCodeHeadless: (email: string, code: string) => Promise<any>;
    loginWithProvider: (provider: string) => Promise<any>;
    loginWithPasskey: () => Promise<{ type: 'registration' | 'authentication'; user?: User; accessToken?: string; refreshToken?: string; message: string }>;
    visitorId: string | null;
}

export interface FocusableButtonProps {
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

export interface WalletCircleProps {
    appConfig?: AppConfig | null;
    status: 'success' | 'error' | 'loading' | 'signing';
    walletName: string;
    connectors: readonly any[];
    connectingWallet: any;
    hasLoadingAnimation?: boolean;
}

export interface WalletStatusCircleProps {
    status: 'loading' | 'success' | 'error' | 'signing';
    walletName: string;
    connectors: any[];
    connectingWallet: { name: string; id: string } | null;
    hasLoadingAnimation?: boolean;
}

export interface ProviderCircleProps {
    status: 'success' | 'error' | 'loading';
    provider: 'google' | 'discord' | 'x' | 'github';
    hasLoadingAnimation?: boolean;
    appConfig?: AppConfig | null;
}

export interface PasskeyCircleProps {
    status: 'success' | 'error' | 'loading' | 'signing';
    hasLoadingAnimation?: boolean;
    appConfig?: AppConfig | null;
}