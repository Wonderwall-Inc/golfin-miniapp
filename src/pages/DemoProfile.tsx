import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

import { useUserContext } from '@/contexts/UserContext'

import { getUser, updateUser } from '@/apis/UserSevices'

import { useToast } from '@/hooks/use-toast'
import { Button } from "@/components/ui/button"
import { ToastAction, ToastProvider } from "@/components/ui/toast"
import Loader from '@/components/LoaderComponent/Loader'

import { Web3Auth, decodeToken } from "@web3auth/single-factor-auth";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { CommonPrivateKeyProvider } from "@web3auth/base-provider";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { useAuth0 } from "@auth0/auth0-react";
import TonRPC from '@/utils/tonRpc'

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

// Initialize Web3Auth with necessary configurations
const web3authSfa = new Web3Auth({
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    usePnPKey: false,
    privateKeyProvider,
});
const DemoProfile = () => {
    const web3AuthProvider = web3authSfa.provider;
    const tonRpcInst = web3AuthProvider ? new TonRPC(web3AuthProvider) : null;
    const { account, setAccount, setIsWaitingUser, isWaitingUser } = useUserContext()
    const [username, setUsername] = useState(account?.telegram_info.username || "");
    /*     const [isLoading, setIsLoading] = useState(false); */
    const { toast } = useToast()

    const handleUsernameChange = async (username: string) => {
        const updatedUser = await updateUser({
            access_token: '',
            id: account?.id || 0,
            user_payload: {
                username: username,
            }
        })
        if (updatedUser !== undefined) {
            setAccount(updatedUser.user_details.user_base)
            /*   setIsLoading(false) */
        }


    }
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

    const login = async () => {
        if (!web3authSfa) {
            window.alert("Web3Auth Single Factor Auth SDK not initialized yet");
            return;
        }
        if (web3authSfa.status === "not_ready") {
            await web3authSfa.init();
        }
        await loginWithRedirect();
    };

    // Attempt to connect to Web3Auth when authenticated
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

    useEffect(() => {
        connectWeb3Auth();
    }, [isAuthenticated, loggedIn, getIdTokenClaims]);

    const logoutView = (
        <button onClick={login} className="card">
            Login
        </button>
    );

    const loginView = (
        <>
            <div className="flex-container">
                {/*  <div>
                    <button onClick={tonRpcInst.getUserInfo} className="card">
                        Get User Info
                    </button>
                </div>
                <div>
                    <button onClick={tonRpcInst.authenticateUser} className="card">
                        Authenticate User
                    </button>
                </div> */}
                <div>
                    <button onClick={() => tonRpcInst?.getAccounts()} className="card">
                        Get Accounts
                    </button>
                </div>
                {/* Add more buttons and implement the corresponding functions as per your need */}
                ...
            </div>

            <div id="console" style={{ whiteSpace: "pre-line" }}>
                <p style={{ whiteSpace: "pre-line" }}></p>
            </div>
        </>
    );
    return (
        <ToastProvider swipeDirection='up'>
            <div>
                {isWaitingUser == true ?
                    <Loader isLoading={isWaitingUser} /> :
                    <div className='text-white grid grid-cols-1'>
                        <input
                            placeholder='username'
                            defaultValue={account?.telegram_info.username}
                            type="text"
                            className='mx-auto 
                            rounded-[8px] 
                            py-[19px] 
                            px-[25px] 
                            w-[343px] 
                            h-[56px] 
                            items-center 
                            justify-center 
                            text-start 
                            content-center 
                            text-[20px]
                            tracking-[0.38px]
                            font-[500]
                            gap-10
                            bg-[rgba(255,255,255,0.20)]
                            m-3'
                            onChange={(e) => setUsername(e.target.value)} />
                        <Button
                            variant='default'
                            className='mx-auto text-white font-bold
                            [background:linear-gradient(158deg,rgba(169,231,29,1)_-7.35%,rgba(94,197,89,1)_84.4%)]
                            w-[343px]
                            h-[56px]
                            gap-[10px]
                            justify-center
                            items-center
                            rounded-[6px]'
                            type='submit'
                            onClick={async () => {
                                if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
                                    setIsWaitingUser(true)
                                    if (username == account?.telegram_info.username) {
                                        setIsWaitingUser(false)
                                        return toast({
                                            className: cn('bg-[#FFFAE6] rounded-[10px]'),
                                            description: 'Username does not changed',
                                            action: <ToastAction altText="Try again">Try again</ToastAction>,
                                        })
                                    }

                                    else {
                                        setIsWaitingUser(false)
                                        return toast({
                                            className: cn('bg-[#FFFAE6] rounded-[10px]'),
                                            description:
                                                <div className=''>
                                                    Username is changed to { }
                                                    <span className='font-semibold'>{username}</span>
                                                </div>
                                        })

                                    }
                                } else {
                                    setIsWaitingUser(true)
                                    if (username == account?.telegram_info.username) {
                                        setIsWaitingUser(false)
                                        return toast({
                                            className: cn('bg-[#FFFAE6] rounded-[10px]'),
                                            description: 'Same username',
                                            action: <ToastAction altText="Try again">Try again</ToastAction>,
                                        })
                                    }
                                    else {
                                        const dbUser = await getUser({
                                            access_token: '',
                                            username: username
                                        })
                                        if (dbUser?.user_details.user_base.telegram_info.username == username) {
                                            setIsWaitingUser(false)
                                            return toast({
                                                className: cn('bg-[#FFFAE6] rounded-[10px]'),
                                                description: 'Username already exists',
                                                action: <ToastAction altText="Try again">Try again</ToastAction>,
                                            })
                                        } else {
                                            await handleUsernameChange(username)
                                            setIsWaitingUser(false)
                                            return toast({
                                                className: cn('bg-[#FFFAE6] rounded-[10px]'),
                                                description:
                                                    <div className=''>
                                                        Username is changed to { }
                                                        <span className='font-semibold'>{username}</span>
                                                    </div>
                                            })
                                        }
                                    }
                                }
                            }}>
                            <span className='text-white text-[20px] font-bold text-center'>SAVE</span>
                        </Button>
                        <a target='_blank' className='my-10' href='https://golfin.io/en/privacy-policy-en/'>Privacy Policy</a>
                    </div >
                }
            </div>
            {isLoading || isLoggingIn ? <div>loading</div> : <div className="grid">{web3authSfa ? (loggedIn ? loginView : logoutView) : null}</div>}


        </ToastProvider >
    )
}

export default DemoProfile