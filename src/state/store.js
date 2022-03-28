import { configureStore } from '@reduxjs/toolkit'
import walletReducer from '../features/wallet-slice'
import contractNFTReducer from '../features/contract-nft-slice'

export default configureStore({
  reducer: {
      wallet: walletReducer,
      contract_nft: contractNFTReducer
  },
})