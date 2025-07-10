import { jwtDecode } from "jwt-decode";
import { useAccount, useConnect, useDisconnect, useSignMessage, useSignTypedData, WagmiProvider, type Config } from 'wagmi';
import { createWagmiConfig } from './wagmi';
import { AppConfig, User } from "./interfaces";

export const decodeJWT = (token: string) => {
    const decoded = jwtDecode(token);
    return decoded;
}

export const isTokenExpired = (token: string, bufferInSeconds: number = 60): boolean => {
    try {
        const decoded = decodeJWT(token);
        const exp = decoded.exp;

        if (typeof exp !== 'number') return true;

        const currentTime = Date.now() / 1000;
        return exp < currentTime + bufferInSeconds;
    } catch (err) {
        console.error('Failed to decode token:', err);
        return true;
    }
};

export const getUserFromToken = (token: string) => {
    const decoded = decodeJWT(token);
    return decoded;
}

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const bufferToBase64Url = (buffer: ArrayBuffer): string => {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
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

export const formatPasskeyOptions = (options: any) => {

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

export const getWagmiConfig = (appName: string, projectId: string) => {
    const newConfig = createWagmiConfig(appName, projectId);
    return newConfig;
}

export const getConnectors = (wagmiConfig: Config) => {

    const connectors = wagmiConfig.connectors;

    return connectors.map((connector, index) => {
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
    })
}

export const getTotpUrl = (qrCodeUrl: string, mfaSecret: string, appConfig: AppConfig, user: User) => {
    if (qrCodeUrl && qrCodeUrl.includes('otpauth://')) {
        // Extract the otpauth URL from the QR code URL if it's embedded
        const match = qrCodeUrl.match(/otpauth:\/\/[^&\s]+/);
        if (match) return decodeURIComponent(match[0]);
    }

    // Generate TOTP URL from secret if available
    if (mfaSecret) {
        const email = user?.email?.email || user?.wallets[0]?.address || 'user';
        const issuer = appConfig?.name || 'pr0d.io';
        return `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(email)}?secret=${mfaSecret}&issuer=${encodeURIComponent(issuer)}`;
    }

    return qrCodeUrl;
};

export const isMobileDevice = (): boolean => {
    if (typeof navigator === 'undefined') return false;

    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const constructSiveMessage = (message: any) => {
    return (
        `${message.domain} wants you to sign in with your Ethereum account:
${message.address}

${message.statement}

URI: ${message.uri}
Version: ${message.version}
Chain ID: ${message.chainId}
Nonce: ${message.nonce}
Issued At: ${message.issuedAt}`
    );
}