import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import { useToastStateContext } from './context';
import { ToastActions, ToastProp } from './types';

const Toast: FC<ToastProp> = ({ type, message, id, delay }) => {
  const { dispatch } = useToastStateContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalTime = delay / 105;

    const intervalId = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(intervalId);
          return 100;
        }
        return prevProgress + 1;
      });
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [delay]);

  return (
    <>
      <div
        className={classNames('rounded-md p-4 m-3 border relative bg-white')}>
        <div className='flex'>
          <div className='flex-shrink-0 flex items-center'>
            <span
              className={classNames('material-icons ', {
                'text-success': type === 'success',
                'text-error': type === 'error',
              })}>
              {type === 'success' && 'check_circle'}
              {type === 'error' && 'error_outline'}
            </span>
          </div>
          <div className='ml-3 flex items-center'>
            <p className={classNames('text-sm font-medium text-primary')}>
              {message}
            </p>
          </div>
          <div className='ml-auto pl-3'>
            <div className='-mx-1.5 -my-1.5'>
              <button
                onClick={() => {
                  dispatch({ type: ToastActions.DELETE_TOAST, id });
                }}
                className={classNames(
                  'inline-flex rounded-md p-1.5 hover:bg-slate-200'
                )}>
                <span className='sr-only'>Dismiss</span>
                <span
                  className={classNames('material-icons text-primary-400', {
                    'text-primary-400': type === 'success',
                  })}>
                  close
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className='absolute bottom-0 left-0 h-1 bg-gray-300 w-full'>
          <div
            className={classNames('h-1 bg-blue-500', {
              'bg-success': type === 'success',
              'bg-error': type === 'error',
            })}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default Toast;
