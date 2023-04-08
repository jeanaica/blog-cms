import { Dispatch } from 'react';

export type ToastProp = {
  id: string;
  type: 'info' | 'error' | 'success';
  message: string;
  delay: number;
};

export interface ToastsState {
  toasts: Array<ToastProp>;
}

export enum ToastActions {
  ADD_TOAST = 'ADD_TOAST',
  DELETE_TOAST = 'DELETE_TOAST',
}

export type ToastsActionTypes =
  | {
      type: ToastActions.ADD_TOAST;
      toast: ToastProp;
    }
  | {
      type: ToastActions.DELETE_TOAST;
      id: string;
    };

export interface ToastsStore {
  state: ToastsState;
  dispatch: Dispatch<ToastsActionTypes>;
}
