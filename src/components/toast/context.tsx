import { createContext, useReducer, useContext, FC, ReactNode } from 'react';
import ToastReducer from './reducer';
import { ToastsStore } from './types';

const ToastsContext = createContext({} as ToastsStore);

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(ToastReducer, {
    toasts: [],
  });

  const store = {
    state,
    dispatch,
  } as ToastsStore;

  return (
    <ToastsContext.Provider value={store}>{children}</ToastsContext.Provider>
  );
};

export const useToastStateContext = () => useContext(ToastsContext);
