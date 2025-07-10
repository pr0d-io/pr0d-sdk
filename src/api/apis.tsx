import axios from 'axios';
import apiClient from './apiClient';

const getAppConfig = async (appId: string) => {
    const response = await apiClient.get(`/apps/${appId}`)
    return response.data.data
}

// EMAIL \\

const sendEmailCode = async (email: string) => {
    const response = await apiClient.post("/email/init", {
        email
    })
    return response.data.data   
}

const loginWithEmailCode = async (email: string, code: string) => {
    const response = await apiClient.post("/email/auth", {
        email,
        code
    })
    return response.data.data
}

const linkWithEmailCode = async (email: string, code: string) => {
    const response = await apiClient.post("/email/link", {
        email,
        code
    })
    return response.data.data
}

const deleteEmail = async () => {
    const response = await apiClient.delete("/email/delete")
    return response.data.data
}

// PROVIDER \\

const loginWithProvider = async (provider: string, redirectUri: string) => {
    const response = await apiClient.get(`/oauth/${provider}/init`, {
        params: {
            redirect_uri: redirectUri
        }
    })
    return response.data.data    
}

const linkWithProvider = async (provider: string, redirectUri: string) => {
    const response = await apiClient.get(`/oauth/${provider}/init`, {
        params: {
            redirect_uri: redirectUri
        }    
    })
    return response.data.data
}

const unlinkWithProvider = async (provider: string) => {
    const response = await apiClient.delete(`/oauth/${provider}/delete`)
    return response.data.data
}

const exchangeCodeForTokens = async (code: string) => {
    const response = await apiClient.get("/oauth/exchange", {
        params: {
            code
        }
    })
    return response.data.data
}

// MFA \\

const setupMFA = async () => {
    const response = await apiClient.post("/mfa/init")
    return response.data.data
}

const linkTOTPWithCode = async (code: string) => {
    const response = await apiClient.post("/mfa/link", {
        code
    })
    return response.data.data
}

const deleteMFA = async () => {
    const response = await apiClient.delete("/mfa/delete")
    return response.data.data
}

// WALLET \\

const initWalletAuth = async (address: string, uri: string, version: string, chainId: string) => {
    const response = await apiClient.post("/wallet/init", {
        address,
        uri,
        version,
        chainId
    })
    return response.data.data
}

const authenticateWallet = async (signature: string, nonce: string, type?: string) => {
    const response = await apiClient.post("/wallet/auth", {
        signature,
        nonce,
        type: type || 'external'
    })
    return response.data.data   
}

const linkWallet = async (signature: string, nonce: string, type?: string) => {
    const response = await apiClient.post("/wallet/link", {
        signature,
        nonce,
        type: type || 'external'
    })
    return response.data.data
}

const deleteWallet = async (address: string) => {
    const response = await apiClient.delete("/wallet/delete", {
        data: { address }
    })
    return response.data.data
}

const signMessageWithEmbeddedWallet = async (message: string) => {
    const response = await apiClient.post("/tee/sign-message", {
        message
    })
    return response.data.data
}

// PASSKEYS \\

const initPasskey = async (userHandle?: string) => {
    const response = await apiClient.post("/passkeys/init", {
        userHandle: userHandle || null
    })
    return response.data.data
}

const verifyPasskey = async (credential: any) => {
    const response = await apiClient.post("/passkeys/verify", {
        credential
    })
    return response.data.data
}

const listPasskeys = async () => {
    const response = await apiClient.get("/passkeys/list")
    return response.data.data
}

const deletePasskey = async (credentialId: string) => {
    const response = await apiClient.delete("/passkeys/delete", {
        data: { credentialId }
    })
    return response.data.data   
}

// SESSIONS \\

const getAllSessions = async () => {
    const response = await apiClient.get("/sessions")
    return response.data.data
}

const refreshSessionByRefreshToken = async (refreshToken: string) => {
    const response = await apiClient.post("/sessions/refresh", {
        refresh_token: refreshToken
    })
    return response.data.data
}

const revokeSessionById = async (sessionId: string) => {
    const response = await apiClient.delete(`/sessions/${sessionId}`)
    return response.data.data
}

const revokeSessionByRefreshToken = async (refreshToken: string) => {
    const response = await apiClient.delete("/sessions/revoke", {
        data: {
            refresh_token: refreshToken
        }
    })
    return response.data.data
}

const revokeAllSessions = async () => {
    const response = await apiClient.delete("/sessions/all")
    return response.data.data
}

const getSessionInfo = async () => {
    const response = await apiClient.get("/sessions/info")
    return response.data.data
}

// USERS \\

const getUser = async () => {
    const response = await apiClient.get("/sessions/user")
    return response.data.data
}

const getCurrentUser = async () => {
    const response = await apiClient.get("/users/me")
    return response.data.data
}

export { 
    getAppConfig,
    refreshSessionByRefreshToken, 
    sendEmailCode, 
    loginWithEmailCode, 
    deleteEmail,
    loginWithProvider, 
    linkWithProvider,
    unlinkWithProvider,
    revokeSessionByRefreshToken,
    exchangeCodeForTokens,
    setupMFA,
    linkTOTPWithCode,
    deleteMFA,
    initWalletAuth,
    authenticateWallet,
    linkWallet,
    linkWithEmailCode,
    deleteWallet,
    initPasskey,
    verifyPasskey,
    listPasskeys,
    deletePasskey,
    getAllSessions,
    revokeAllSessions,
    revokeSessionById,
    signMessageWithEmbeddedWallet,
    getSessionInfo,
    getCurrentUser,
    getUser,
}