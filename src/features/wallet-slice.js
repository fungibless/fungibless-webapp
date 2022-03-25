import { createSlice } from '@reduxjs/toolkit'

export const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        connected: false,
    },
    reducers: {
        setConnected: (state, action) => {            
            state.connected = action.payload
        }
    },
})


// Action creators are generated for each case reducer function
export const { setConnected } = walletSlice.actions

export default walletSlice.reducer