import { configureStore } from '@reduxjs/toolkit'
import walletReducer from '../features/wallet-slice'

export default configureStore({
  reducer: {
      wallet: walletReducer
  },
})