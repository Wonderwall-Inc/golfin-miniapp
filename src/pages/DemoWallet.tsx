import { Web3Auth, decodeToken } from "@web3auth/single-factor-auth";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { CommonPrivateKeyProvider } from "@web3auth/base-provider";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { useAuth0 } from "@auth0/auth0-react";
import TonRPC from '@/utils/tonRpc'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button";

const testnetRpc = await getHttpEndpoint({
    network: "testnet",
    protocol: "json-rpc",
});

const verifier = import.meta.env.VITE_WEB3AUTH_VERIFIER;

const clientId = import.meta.env.VITE_WEB3AUTH_CLIENT_ID;

const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.OTHER,
    chainId: "testnet",
    rpcTarget: testnetRpc,
    displayName: "TON Testnet",
    blockExplorerUrl: "https://testnet.tonscan.org",
    ticker: "TON",
    tickerName: "Toncoin",
};

const privateKeyProvider = new CommonPrivateKeyProvider({
    config: { chainConfig },
});

const web3authSfa = new Web3Auth({
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    usePnPKey: false,
    privateKeyProvider,
});

const DemoWallet = () => {
    const web3AuthProvider = web3authSfa.provider;
    const tonRpcInst = web3AuthProvider ? new TonRPC(web3AuthProvider) : null;
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const { isAuthenticated, isLoading, getIdTokenClaims, loginWithRedirect, logout: auth0Logout } = useAuth0();
    const [provider, setProvider] = useState<any>(null);


    useEffect(() => {
        const init = async () => {
            try {
                await web3authSfa.init();
                if (web3authSfa.status === "connected") {
                    setLoggedIn(true);
                    setProvider(web3authSfa.provider);
                }
            } catch (error) {
                console.error("Error during Web3Auth initialization:", error);
            }
        };

        init();
    }, []);
    const getUserInfo = async () => {
        if (!provider) {
            uiConsole("Web3Auth Single Factor Auth SDK not initialized yet");
            return;
        }
        const userInfo = await web3authSfa.getUserInfo();
        console.log(userInfo);
        uiConsole(userInfo);
    };

    const logout = async () => {
        if (!provider) {
            uiConsole("Web3Auth Single Factor Auth SDK not initialized yet");
            return;
        }
        await web3authSfa.logout();
        setLoggedIn(false);
        setProvider(null);
        auth0Logout({ logoutParams: { returnTo: window.location.origin } });
    };

    const getAccounts = async () => {
        if (!provider) {
            uiConsole("No provider found");
            return;
        }
        if (web3AuthProvider) {
            const rpc = new TonRPC(web3AuthProvider);
            const userAccount = await rpc.getAccounts();
            uiConsole(userAccount);
            console.log(userAccount);

        }
    };

    const getBalance = async () => {
        if (!provider) {
            uiConsole("No provider found");
            return;
        }
        if (web3AuthProvider) {

            const rpc = new TonRPC(web3AuthProvider);
            const balance = await rpc.getBalance();
            console.log(balance);

            uiConsole(balance);
        }
    };

    const signMessage = async () => {
        if (!provider) {
            uiConsole("No provider found");
            return;
        }
        if (web3AuthProvider) {
            const rpc = new TonRPC(web3AuthProvider);
            const result = await rpc.signMessage("Hello, TON!");
            uiConsole(`Message signed. Signature: ${result}`);
        }
    };

    const sendTransaction = async () => {
        if (!provider) {
            uiConsole("No provider found");
            return;
        }
        if (web3AuthProvider) {
            const rpc = new TonRPC(web3AuthProvider);
            const result = await rpc.sendTransaction();
            console.log(result);

            uiConsole(result);
        }
    };

    const authenticateUser = async () => {
        if (!provider) {
            uiConsole("No provider found");
            return;
        }
        const userCredential = await web3authSfa.authenticateUser();
        console.log(userCredential);
        uiConsole(userCredential);
    };

    const getPrivateKey = async () => {
        if (!web3authSfa.provider) {
            uiConsole("No provider found");
            return "";
        }
        const rpc = new TonRPC(web3authSfa.provider);
        const privateKey = await rpc.getPrivateKey();
        console.log(privateKey);

        return privateKey;
    };

    function uiConsole(...args: any[]): void {
        const el = document.querySelector("#console>p");
        if (el) {
            el.innerHTML = JSON.stringify(args || {}, null, 2);
        }
    }
    // Attempt to connect to Web3Auth when authenticated

    const login = async () => {
        if (!web3authSfa) {
            uiConsole("Web3Auth Single Factor Auth SDK not initialized yet");
            return;
        }
        if (web3authSfa.status === "not_ready") {
            await web3authSfa.init();
        }
        await loginWithRedirect();
    };
    useEffect(() => {
        const connectWeb3Auth = async () => {
            if (isAuthenticated && !loggedIn && web3authSfa.status === "ready") {
                try {
                    setIsLoggingIn(true);
                    const idToken = (await getIdTokenClaims())?.__raw; // Retrieve raw ID token from Auth0
                    if (!idToken) {
                        console.error("No ID token found");
                        return;
                    }
                    const { payload } = decodeToken(idToken); // Decode the token to access its payload

                    // Connect to Web3Auth using the verifier, verifierId, and idToken
                    await web3authSfa.connect({
                        verifier,
                        verifierId: (payload as any).sub,
                        idToken: idToken,
                    });
                    // Update state to reflect successful login
                    setIsLoggingIn(false);
                    setLoggedIn(true);
                    setProvider(web3authSfa.provider);
                } catch (err) {
                    setIsLoggingIn(false);
                    console.error("Error during Web3Auth connection:", err);
                }
            }
        };
        connectWeb3Auth();
    }, [isAuthenticated, loggedIn, getIdTokenClaims]);

    const logoutView = (
        <Button onClick={login} className="card">
            Login
        </Button>
    );

    const loginView = (
        <>
            <div className="text-black grid grid-cols-2 w-[100%]">
                <div>
                    <div>
                        <Button onClick={getUserInfo} className="card">
                            Get User Info
                        </Button>
                        <Button onClick={authenticateUser} className="card">
                            Authenticate User
                        </Button>
                    </div>
                    <div>

                        <Button onClick={getAccounts} className="card">
                            Get Accounts
                        </Button>
                        <Button onClick={getBalance} className="card">
                            Get Balance
                        </Button>
                    </div>
                    <div>

                        <Button onClick={signMessage} className="card">
                            Sign Message
                        </Button>
                        <Button onClick={sendTransaction} className="card">
                            Send Transaction
                        </Button>
                    </div>
                    <div>
                        <Button onClick={getPrivateKey} className="card">
                            Get Private Key
                        </Button>
                        <Button onClick={logout} className="card">
                            Log Out
                        </Button>
                    </div>
                </div>
            </div>
            <div id="console" style={{ whiteSpace: "pre-line" }} className="text-white w-[100px] h-[300px] overflow-scroll">
                <p style={{ whiteSpace: "pre-line" }}></p>
            </div>
        </>
    )

    return (
        <>
            {isLoading || isLoggingIn ? <div>loading</div> : <div className="grid">{web3authSfa ? (loggedIn ? loginView : logoutView) : null}</div>}
        </>
    )
}

export default DemoWallet