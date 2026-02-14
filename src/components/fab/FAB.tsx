import { type FC, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import useDetectOutsideClick from 'hooks/useDetectOutsideClick';

type FabAction = {
  icon: string;
  text: string;
  href: string;
  color?: string;
};

const fabActions: FabAction[] = [
  {
    icon: 'post_add',
    text: 'Add Post',
    href: '/article/add',
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    icon: 'add_photo_alternate',
    text: 'Add Gallery',
    href: '/gallery/add',
    color: 'bg-green-500 hover:bg-green-600',
  },
];

type Props = {
  hide?: boolean;
};

const FAB: FC<Props> = ({ hide = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);
  const isClickedOutside = useDetectOutsideClick(fabRef);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleAction = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  if (isClickedOutside && isOpen) {
    setIsOpen(false);
  }

  if (hide) {
    return null;
  }

  return (
    <div
      ref={fabRef}
      className='hidden md:block fixed bottom-8 right-8 z-50'>
      {/* Action buttons */}
      <div
        className={classNames(
          'flex flex-col-reverse gap-3 mb-3 transition-all duration-300',
          {
            'opacity-100 translate-y-0': isOpen,
            'opacity-0 translate-y-4 pointer-events-none': !isOpen,
          }
        )}>
        {fabActions.map(action => (
          <button
            key={action.text}
            onClick={() => handleAction(action.href)}
            className={classNames(
              'flex items-center gap-3 px-4 py-3 rounded-full shadow-lg transition-all duration-200',
              action.color || 'bg-gray-700 hover:bg-gray-800',
              'text-white'
            )}
            title={action.text}>
            <span className='material-icons-outlined text-xl'>
              {action.icon}
            </span>
            <span className='text-sm font-medium pr-2'>{action.text}</span>
          </button>
        ))}
      </div>

      {/* Main FAB button */}
      <button
        onClick={handleToggle}
        className={classNames(
          'w-14 h-14 rounded-full shadow-lg transition-all duration-300',
          'flex items-center justify-center',
          'bg-primary-600 hover:bg-primary-700 text-white',
          {
            'rotate-45': isOpen,
          }
        )}
        title={isOpen ? 'Close' : 'Add content'}>
        <span className='material-icons-outlined text-2xl'>add</span>
      </button>
    </div>
  );
};

export default FAB;
