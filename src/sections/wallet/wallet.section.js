import * as React from "react"
import meta_mask_img from '../../assets/images/icons/meta-mask.png'

import { ethers } from "ethers";

import { useSelector, useDispatch } from 'react-redux'
import { setConnectedAndAccount, setBalance, setInstalled, setChainIdAndRightNetwork } from "../../features/wallet-slice"

const WalletSection = () => {
    const dispatch = useDispatch()
    const walletInstalled = useSelector((state) => state.wallet.installed)
    const walletConnected = useSelector((state) => state.wallet.connected)

    const isMetaMask = useSelector((state) => state.wallet.isMetaMask)
    const shortenAccount = useSelector((state) => state.wallet.shortenAccount)
    const closeButton = React.useRef()

    React.useEffect(() => {
        const desiredChainId = process.env.GATSBY_WALLET_NETWORK_CHAIN_ID
        if (window.ethereum) { // Check if wallet is installed.
            // provider: etherejs provider, ethereum: external provider(eg. metamask)
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const { provider: ethereum } = provider;

            console.log(ethereum)

            if (ethereum) { // Check if we can get installed web3 provider.     
                dispatch(setInstalled({ installed: true, isMetaMask: ethereum.isMetaMask }))


                // Trying to get account from the provider.
                const getBalance = async () => {
                    const signer = provider.getSigner(); // user
                    const contractUser = await signer.getAddress();
                    console.log(contractUser)
                    const contractUserBalance = await provider.getBalance(contractUser);
                    const amount = ethers.utils.formatEther(contractUserBalance)                    
                    dispatch(setBalance({eth: amount}))
                }

                const checkNetwork = () => {
                    ethereum.request({ method: 'eth_chainId', params: [] }).then(onChainId);
                }

                const onChainId = async (chainId) => {
                    dispatch(setChainIdAndRightNetwork({ chainId: chainId, right: (chainId === desiredChainId) }))
                    console.log("desiredChainId:", desiredChainId, "chainId:", chainId)
                }

                const onAccountChanged = async (accounts) => {
                    if (accounts) {
                        console.log("OnConnected", accounts)
                        dispatch(setConnectedAndAccount({ connected: true, account: accounts[0] }))

                        await getBalance()
                    } else {
                        dispatch(setConnectedAndAccount({ connected: false, account: null }))
                    }
                }

                const onAccountChangeFailed = async (err) => {
                    dispatch(setConnectedAndAccount({ connected: false, account: null }))
                    console.warn(err)
                }

                // Check Chain Settings
                ethereum.request({ method: 'eth_chainId', params: [] }).then(onChainId);
                // Check Connectivity (계정이 있는지 확인하면서 지갑과의 연결을 확인한다.)
                ethereum.request({ method: "eth_requestAccounts", params: [] }).then(onAccountChanged).catch(onAccountChangeFailed)

                //Add wallet event listeners
                ethereum.on("chainChanged", (chainId) => {
                    console.log("chainChanged", chainId)
                    checkNetwork()
                })

                ethereum.on("accountsChanged", onAccountChanged)
            }

        } else {
            dispatch(setInstalled({ installed: false, isMetaMask: false }))
            //after install the provider. the browser needs to be refreshed. plase notify users about it
        }
    }, [dispatch]);

    const connectToWallet = () => {
        if (walletInstalled) {
            try {
                const web3 = new ethers.providers.Web3Provider(window.ethereum)

                web3.provider.send("eth_requestAccounts", []).then((accounts) => {
                    console.log("eth_requestAccounts", accounts.result)
                    if (accounts.result) {
                        dispatch(setConnectedAndAccount({ connected: true, account: accounts.result[0] }))
                        closeButton.current.click()
                    }
                })
            } catch (error) {
                dispatch(setConnectedAndAccount({ connected: false, account: null }))
            }
        } else {
            console.warn("There is no wallet")
        }
    }

    return (
        <div className="modal fade " id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modals-title  mb-0" id="modalLabel">Connect Wallet</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeButton}><i className="icon-x"></i></button>
                    </div>
                    <div className="modal-body">
                        <p className="mb-20">Please select a wallet to connect to this marketplace</p>
                        <div className="connect-section">
                            <ul className="heading-list">
                                <li style={(walletConnected && isMetaMask) ? { background: 'green' } : {}}><a href="#!" onClick={() => { connectToWallet() }}><span><img src={meta_mask_img} alt="MetaMask" /></span>{(walletConnected && isMetaMask) ? shortenAccount : 'MetaMask'}</a></li>
                                {/* <li><a href="#!"><span><img src={wallet_img} alt="WalletConnect" /></span>WalletConnect</a></li> */}
                            </ul>
                        </div>
                        <p>By connecting your wallet, you agree to our <a href="#!"><span className="modal-title">Terms of Service </span>
                        </a>and our <a href="#!"><span className="modal-title"> Privacy Policy</span></a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletSection;