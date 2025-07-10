import React from 'react';
import Pr0dProvider, { usePr0d } from '../src';

const Home = () => {
    const {
        ready,
        isAuthenticated,
        user,
        login,
        logout,
        link,
        unlink,
        helpers,
        sessions,
        renderQRCode,
        updateUser,
        setPopupView,
        triggerMfaSetup,
        triggerPasskeySetup,
        triggerEmailLink,
        triggerProviderLink,
        triggerPasskeySetupDirect,
        triggerTotpSetup,   
        triggerWalletLink,
    } = usePr0d();

    const promptEmailAndCode = async (action: 'login' | 'link') => {
        const email = window.prompt('Enter the email');
        if (!email) return;
        await login.sendEmailCode(email);
        const code = window.prompt('Enter the code');
        if (!code) return;
        if (action === 'login') {
            await login.withEmail(email, code);
        } else {
            await link.email(email, code);
        }
    };

    const showPopup = () => setPopupView('method-select');

    if (!ready) return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-blue-200 h-12 w-12"></div>
                    <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 bg-blue-200 rounded w-3/4"></div>
                        <div className="h-4 bg-blue-200 rounded w-1/2"></div>
                    </div>
                </div>
                <p className="text-center text-gray-600 mt-4">Loading Pr0d SDK...</p>
            </div>
        </div>
    );

    if (!isAuthenticated) return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Pr0d Auth Demo</h1>
                    <p className="text-gray-600">Choose your authentication method</p>
                </div>
                
                <div className="space-y-4">
                    <button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                        onClick={showPopup}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        Show Auth Popup
                    </button>
                    
                    <button 
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                        onClick={() => promptEmailAndCode('login')}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        Login with Email
                    </button>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm"
                            onClick={login.withGoogle}
                        >
                            Google
                        </button>
                        <button 
                            className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm"
                            onClick={login.withGithub}
                        >
                            GitHub
                        </button>
                        <button 
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm"
                            onClick={login.withDiscord}
                        >
                            Discord
                        </button>
                        <button 
                            className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm"
                            onClick={login.withX}
                        >
                            X (Twitter)
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm"
                            onClick={login.withPasskey}
                        >
                            Passkey
                        </button>
                        <button 
                            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm"
                            onClick={login.withWallet}
                        >
                            Wallet
                        </button>
                    </div>
                </div>
                
                {helpers.isConnected && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-green-800 text-sm">
                            <span className="font-medium">Wallet Connected:</span> {helpers.address}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                        <h1 className="text-3xl font-bold mb-2">Welcome to Pr0d Auth Demo</h1>
                        <p className="text-blue-100">User ID: {user?._id}</p>
                    </div>
                    
                    <div className="p-6">
                        <div className="mb-6">
                            <button 
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 mr-3"
                                onClick={() => triggerMfaSetup()}
                            >
                                Setup MFA
                            </button>
                            <button 
                                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 mr-3"
                                onClick={updateUser}
                            >
                                Update User
                            </button>
                            <button 
                                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 mr-3"
                                onClick={sessions.refreshSession}
                            >
                                Refresh Session
                            </button>
                            <button 
                                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                    Email
                                </h3>
                                <p className="text-gray-700 mb-3">
                                    {user?.email?.email || <span className="text-gray-500">Not linked</span>}
                                </p>
                                {!user?.email?.email ? (
                                    <button 
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                                        onClick={triggerEmailLink}
                                    >
                                        Link Email
                                    </button>
                                ) : (
                                    <button 
                                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                                        onClick={unlink.email}
                                    >
                                        Unlink Email
                                    </button>
                                )}
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    TOTP Authenticator
                                </h3>
                                <p className="text-gray-700 mb-3">
                                    {user?.mfa ? 
                                        <span className="text-green-600 font-medium">Enabled</span> : 
                                        <span className="text-gray-500">Disabled</span>
                                    }
                                </p>
                                {!user?.mfa ? (
                                    <button 
                                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                                        onClick={triggerTotpSetup}
                                    >
                                        Enable TOTP
                                    </button>
                                ) : (
                                    <button 
                                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                                        onClick={unlink.totp}
                                    >
                                        Disable TOTP
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 space-y-6">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Social Providers
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {['x', 'google', 'discord', 'github'].map((provider) => (
                                        <div key={provider} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                            <div>
                                                <p className="font-medium text-gray-900 capitalize">{provider}</p>
                                                <p className="text-sm text-gray-500">
                                                    {user?.[provider] ? 
                                                        (user[provider]?.username || user[provider]?.email || user[provider]?.login) : 
                                                        'Not linked'
                                                    }
                                                </p>
                                            </div>
                                            {user?.[provider] ? (
                                                <button 
                                                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded text-sm transition-colors duration-200"
                                                    onClick={() => unlink[provider]()}
                                                >
                                                    Unlink
                                                </button>
                                            ) : (
                                                <button 
                                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded text-sm transition-colors duration-200"
                                                    onClick={() => link[provider]()}
                                                >
                                                    Link
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    Wallets
                                </h3>
                                <div className="space-y-3">
                                    {user?.wallets?.map(wallet => (
                                        <div key={wallet.address} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                            <div>
                                                <p className="font-mono text-sm text-gray-900">{wallet.address}</p>
                                            </div>
                                            <button 
                                                className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded text-sm transition-colors duration-200"
                                                onClick={() => unlink.wallet(wallet.address)}
                                            >
                                                Unlink
                                            </button>
                                        </div>
                                    ))}
                                    <button 
                                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                        onClick={triggerWalletLink}
                                    >
                                        Link New Wallet
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Passkeys
                                </h3>
                                <div className="space-y-3">
                                    {user?.passkeys?.map(pk => (
                                        <div key={pk.credentialID} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                            <div>
                                                <p className="font-mono text-sm text-gray-900">{pk.credentialID}</p>
                                            </div>
                                            <button 
                                                className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded text-sm transition-colors duration-200"
                                                onClick={() => unlink.passkey(pk.credentialID)}
                                            >
                                                Unlink
                                            </button>
                                        </div>
                                    ))}
                                    <button 
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                        onClick={triggerPasskeySetupDirect}
                                    >
                                        Add New Passkey
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const App = () => (
    <Pr0dProvider appId="684dea5189269732f9817561">
        <Home />
    </Pr0dProvider>
);

export default App;