import { createSlice } from '@reduxjs/toolkit'

export const contractNFTSlice = createSlice({
    name: 'contract_nft',
    initialState: {
        tww: {
            maximumSupply: 10000,
            totalSupply: 0,
            allowedSupply: 0,
            round: 0,
            price: 0,
        }
    },
    reducers: {
        setTypicalWageWorker:(state, action) => {
            //TODO
        }
    }
})

export const {
    setTypicalWageWorker,
} = contractNFTSlice.actions

export default contractNFTSlice.reducer