import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import Icon from 'components/icon/Icon';
import useDetectOutsideClick from 'shared/utils/hooks/useDetectOutsideClick';

type Props = {
  text: string;
  options: Array<{
    text: string;
    onClick: MouseEventHandler;
    icon: string;
  }>;
  loading?: boolean;
};

const Menu: FC<Props> = ({ text, options, loading }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef(null);
  const isClickedOutside = useDetectOutsideClick(menuRef);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isClickedOutside) {
      setIsOpen(false);
    }
  }, [isClickedOutside]);

  return (
    <div
      ref={menuRef}
      className={classNames('relative flex w-full border rounded-md h-[50px]')}>
      <button
        type='button'
        className='relative w-full flex items-center justify-center  font-semibold px-2 md:px-4 border-r hover:bg-slate-100 md:w-3/4'
        onClick={options[0].onClick}
        disabled={loading}>
        <Icon
          icon={options[0].icon}
          className='text-xl md:text-3xl text-sky-700 rounded-md'
        />
        <span className='hidden lg:flex md:ml-4'>{text}</span>
      </button>

      <button
        type='button'
        className='relative w-full flex items-center justify-center font-semibold px-2 md:px-4 hover:bg-slate-100 md:w-1/4'
        onClick={handleClick}
        disabled={loading}>
        <Icon
          icon='expand_more'
          className='text-xl md:text-3xl text-sky-700 rounded-md'
        />
      </button>
      <ul
        className={classNames(
          'absolute top-[30px] z-10 md:z-auto right-0 p-0 bg-white drop-shadow flex flex-col',
          {
            hidden: !isOpen || loading,
          }
        )}>
        {options.map(({ text, icon, onClick }, index) => (
          <li
            key={index}
            className={classNames(
              'cursor-pointer h-[50px] flex items-center px-4 hover:bg-gray-100',
              {
                'cursor-not-allowed': loading,
              }
            )}>
            <Icon
              icon={icon}
              className='px-2 text-xl md:text-3xl text-sky-700 rounded-md'
            />
            <a
              className='block py-2 px-2 no-underline'
              onClick={onClick}>
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
