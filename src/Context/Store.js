import React from "react";
const { createContext, useReducer } = React;

const initialState = {
  walletAddress: '',
  messiTokensAvailable: '',
  liveUrl: '',
  tokenAmmount: '',
  isLogged: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_WALLET_ADDRESS": {
      return {
        ...state,
        walletAddress: action.walletAddress,
      };
    }
    case "UPDATE_MESSI_TOKENS": {
      return {
        ...state,
        messiTokensAvailable: action.messiTokensAvailable,
      };
    }
    case "GET_LIVE_URL": {
      return {
        ...state,
        liveUrl: action.liveUrl,
      };
    }
    case "GET_TOKEN_AMMOUNT": {
      return {
        ...state,
        tokenAmmount: action.tokenAmmount,
      };
    }

    case "LOG_IN": {
      return {
        ...state,
        isLogged: action.isLogged,
      };
    }
   
    default: {
      return { ...state };
    }
  }
};



export const StoreContext = createContext({
  state: initialState,
  dispatch: () => {},
});


export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const store = { state, dispatch };


  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default { StoreContext, StoreProvider };
