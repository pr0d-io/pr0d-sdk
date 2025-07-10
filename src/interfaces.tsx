import { Session } from "inspector";

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
        email: boolean;
        emailPlus: boolean;
        x: boolean;
        google: boolean;
        discord: boolean;
        github: boolean;
        externalWallet: boolean;
        passkey: boolean;
        totp: boolean;
    }
}

export interface User {
    _id: string;
    email?: { email: string };
    mfa?: { secret: string };
    [key: string]: any;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    ready: boolean;
    appConfig: AppConfig | null;
    visitorId: string | null;
    accessToken: string | null;
    logout: () => void;
    updateUser: () => Promise<void>;
    login: {
        withEmail: (email: string, code: string) => Promise<void>;
        withGoogle: () => Promise<void>;
        withDiscord: () => Promise<void>;
        withGithub: () => Promise<void>;
        withX: () => Promise<void>;
        withPasskey: () => Promise<void>;
        withWallet: (connector?: any) => Promise<void>;
        sendEmailCode: (email: string, forceNewCode: boolean) => Promise<any>;
    },
    link: {
        totp: (code: string) => Promise<void>;
        google: () => Promise<void>;
        discord: () => Promise<void>;
        github: () => Promise<void>;
        x: () => Promise<void>;
        wallet: (connector?: any) => Promise<void>;
        passkey: () => Promise<void>;
        email: (email: string, code: string) => Promise<void>;
        sendEmailCode: (email: string, forceNewCode: boolean) => Promise<any>;
    },
    unlink: {
        totp: (code: string) => Promise<void>;
        google: () => Promise<void>;
        discord: () => Promise<void>;
        github: () => Promise<void>;
        x: () => Promise<void>;
        wallet: (address: string) => Promise<void>;
        passkey: (credentialID: string) => Promise<void>;
        email: () => Promise<void>;
    },
    sessions: {
        refreshSession: () => Promise<void>;
    },
    // Trigger functions for logged-in users to manage their authentication methods
    triggerMfaSetup: () => void;
    triggerPasskeySetup: () => void;
    triggerTotpSetup: () => void;
    triggerPasskeySetupDirect: () => void;
    triggerEmailLink: () => void;
    triggerProviderLink: () => void;
    triggerWalletLink: () => void;
    triggerTotpDisable: () => void;
    linkMFA: () => Promise<void>;
    helpers: {
        isPasskeySupported: boolean;
        isConnected: boolean;
        address: string | undefined;
        hasLinked: (method: 'email' | 'wallet' | 'passkey' | 'google' | 'discord' | 'github' | 'x' | 'totp') => boolean;
        getLinkedMethods: () => ('email' | 'wallet' | 'passkey' | 'google' | 'discord' | 'github' | 'x' | 'totp')[];
        getAvailableLoginMethods: () => ('email' | 'wallet' | 'passkey' | 'google' | 'discord' | 'github' | 'x' | 'totp')[];
        connectors: readonly any[];
        setSelectedConnector: (connector: any) => void;
        walletConnectUri: string | null;
        connectingWallet: { name: string; id: string } | null;
        walletError: string | null;
        recentConnectorId: string | null;
        isWalletLinkingMode: boolean;
    },
    popup: {
        show: boolean;
        view: string;
    },
    setPopupView: (view: string) => void;
    closePopup: () => void;
    goBackFromView: (currentView: string) => void;
    resetWalletStates: () => void;
    resetOAuthStates: () => void;
    resetAllTemporaryStates: () => void;
    currentProvider: 'google' | 'discord' | 'github' | 'x' | null;
    oauthError: { provider: string; state: string; errorMessage: string | null } | null;
    renderQRCode: (element: HTMLElement, data: string) => Promise<{ secret: string }>;
}
