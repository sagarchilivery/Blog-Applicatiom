import { createContext, useReducer } from "react";

const initialState = {
  user: null,
};

export const Context = createContext<any>(null);

export const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case "USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
