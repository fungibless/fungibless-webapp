import { createSlice } from '@reduxjs/toolkit'

export const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        connected: false,
        account: null,
        shortenAccount: null,
        installed: false,
        rightNetwork: false,
        chainId: 0,
        isMetaMask: false,
        balance: {
            eth: 0,
        }
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload
            state.shortenAccount = shortenWalletAddress(state.account)
        },
        setConnectedAndAccount: (state, action) => {
            state.connected = action.payload.connected
            if (action.payload.account) {
                state.account = action.payload.account
                state.shortenAccount = shortenWalletAddress(state.account)
            }
        },
        setInstalled: (state, action) => {
            state.installed = action.payload.installed
            state.isMetaMask = action.payload.isMetaMask
        },
        setChainIdAndRightNetwork: (state, action) => {
            state.chainId = action.payload.chainId
            state.rightNetwork = action.payload.right
        },
        setBalance:(state, action) => {
            state.balance.eth = action.payload.eth
        }
    },
})

const shortenWalletAddress = (address) => {
    return address.substring(0, 5) + "..." + address.substr(address.length - 4)
}

// Action creators are generated for each case reducer function
export const {
    setAccount,
    setConnectedAndAccount,
    setInstalled,
    setChainIdAndRightNetwork,
    setBalance
} = walletSlice.actions
export { shortenWalletAddress }
export default walletSlice.reducer