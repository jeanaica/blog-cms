import { BaseSyntheticEvent, ButtonHTMLAttributes, FC, useState } from 'react';
import classNames from 'classnames';

import Icon from 'components/icon/Icon';

type Props = {
  outlined?: boolean;
  icon?: boolean;
  large?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  text: string;
  options: Array<{
    text: string;
    action: (e?: BaseSyntheticEvent<object, any, any> | undefined) => any;
    hide?: boolean;
  }>;
  separateOptions?: Array<{
    text: string;
    action: (e?: BaseSyntheticEvent<object, any, any> | undefined) => any;
    hide?: boolean;
  }>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Dropdown: FC<Props> = ({
  outlined,
  icon,
  large = false,
  className,
  disabled,
  isLoading,
  text,
  options,
  separateOptions,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionClick = (callback: Function) => {
    setIsOpen(false);
    callback();
  };

  return (
    <div className='flex-col relative w-full'>
      <button
        className={classNames(
          'flex items-center rounded duration-300 font-semibold justify-center px-8 py-2 relative w-full',
          className,
          {
            'text-xl bg-primary-500 text-primary-100 hover:bg-primary-600':
              !outlined,
            'border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-primary-100':
              outlined || icon,
            'text-sm': !large,
            'px-4 py-2 text-sm': large,
            'cursor-not-allowed opacity-50': disabled || isLoading,
            'border-0 bg-transparent': icon,
          }
        )}
        type='button'
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}>
        <span className='text-sm'>{text}</span>
        <Icon
          icon='expand_more'
          className=' text-2xl ml-4'
        />
      </button>

      <div
        className={classNames(
          'absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow',
          {
            hidden: !isOpen,
          }
        )}>
        <ul className='py-1 text-sm text-gray-700'>
          {options.map((value, index) => {
            if (value.hide) {
              return false;
            }
            return (
              <li
                key={index}
                className={'cursor-pointer'}>
                <a
                  className='block py-2 px-4 hover:bg-gray-100'
                  onClick={() => handleOptionClick(value.action)}>
                  {value.text}
                </a>
              </li>
            );
          })}
        </ul>

        {separateOptions?.filter(val => !val.hide).length ? (
          <div className='py-1'>
            {separateOptions.map((value, index) => {
              if (value.hide) {
                return false;
              }
              return (
                <a
                  className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'
                  key={index}
                  onClick={() => handleOptionClick(value.action)}>
                  {value.text}
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dropdown;
