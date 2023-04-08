import { useToastStateContext } from './context';
import { ToastActions } from './types';

const useToast = (delay?: number) => {
  const { dispatch } = useToastStateContext();

  function toast(type: 'info' | 'error' | 'success', message: string) {
    const id = Math.random().toString(36).substr(2, 9);
    const delayNum = delay || 3000;
    console.log('delayNum', delayNum);

    dispatch({
      type: ToastActions.ADD_TOAST,
      toast: {
        type,
        message,
        id,
        delay: delayNum,
      },
    });

    setTimeout(() => {
      dispatch({ type: ToastActions.DELETE_TOAST, id });
    }, delayNum);
  }

  return toast;
};

export default useToast;
