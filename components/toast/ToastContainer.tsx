import { useToastStateContext } from './context';
import Toast from './Toast';

const ToastContainer = () => {
  const {
    state: { toasts },
  } = useToastStateContext();

  return (
    <div className='absolute bottom-10 w-full z-50'>
      <div className='max-w-xl ml-auto'>
        {toasts &&
          toasts.map(toast => (
            <Toast
              id={toast.id}
              key={toast.id}
              type={toast.type}
              message={toast.message}
              delay={toast.delay}
            />
          ))}
      </div>
    </div>
  );
};

export default ToastContainer;
