import { ToastsActionTypes, ToastsState } from './types';

const ToastReducer = (state: ToastsState, action: ToastsActionTypes) => {
  switch (action.type) {
    case 'ADD_TOAST': {
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };
    }
    case 'DELETE_TOAST': {
      const updatedToasts = state.toasts.filter(e => e.id != action.id);
      return {
        ...state,
        toasts: updatedToasts,
      };
    }
    default: {
      throw new Error('unhandled action');
    }
  }
};

export default ToastReducer;
