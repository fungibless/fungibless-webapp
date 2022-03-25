import { ethers } from "ethers";

const Web3WalletWrapper = async () => {

    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    // const accounts = await provider.send("eth_requestAccounts", []);
    // console.log('test');
    // console.log(accounts);
   
    async function accounts() {
        return provider.send("eth_requestAccounts", []);;
    }
}

export default Web3WalletWrapper