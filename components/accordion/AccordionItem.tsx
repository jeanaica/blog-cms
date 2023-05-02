import Icon from 'components/icon/Icon';
import { FC, ReactNode, useState } from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

const AccordionItem: FC<Props> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h5 className='m-0'>
        <button
          type='button'
          className={`flex items-center justify-between w-full py-4 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 ${
            isOpen
              ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white'
              : ''
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}>
          <span className='font-semibold'>{title}</span>
          <Icon
            size='xl'
            icon={isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          />
        </button>
      </h5>
      {isOpen && (
        <div className='py-5 p-2 md:p-4 border-b border-gray-200 dark:border-gray-700'>
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
