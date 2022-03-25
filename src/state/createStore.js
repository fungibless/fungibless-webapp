import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
    if (action.type === `INCREMENT`) {
        return Object.assign({}, state, {
            count: state.count + 1,
        })
    }

    if(action.type === `SET_WALLET_CONNECTED`) {
        return Object.assign({}, state, {
            wallet: {...state.wallet, connected: true}
        })
    }
    return state
}

const initialState = { 
    count: 0,
    wallet: {
        connected: false,
        provider: null,
    }
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore