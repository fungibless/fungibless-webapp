/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { shortenAddress } from '@fungibless/wallet-module';

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
    interacting: false, // user interacting
    balance: {
      eth: '0',
      fungi: '0',
    },
  },
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
      state.shortenAccount = shortenAddress(action.payload, 4);
    },
    setConnectedAndAccount: (state, action) => {
      state.connected = action.payload.connected;
      if (action.payload.account) {
        state.account = action.payload.account;
        state.shortenAccount = shortenAddress(action.payload.account, 4);
      }
      state.interacting = false;
    },
    setInstalled: (state, action) => {
      state.installed = action.payload.installed;
      state.isMetaMask = action.payload.isMetaMask;
    },
    setInteracting: (state, action) => {
      state.interacting = action.payload;
    },
    setChainIdAndRightNetwork: (state, action) => {
      state.chainId = action.payload.chainId;
      state.rightNetwork = action.payload.right;
    },
    setBalance: (state, action) => {
      state.balance.eth = action.payload.eth;
    },
    setFungiBalance: (state, action) => {
      state.balance.fungi = action.payload.fungi;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAccount,
  setConnectedAndAccount,
  setInstalled,
  setChainIdAndRightNetwork,
  setBalance,
  setInteracting,
  setFungiBalance,
} = walletSlice.actions;

export default walletSlice.reducer;
