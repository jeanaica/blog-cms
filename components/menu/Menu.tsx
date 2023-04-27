import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import Icon from 'components/icon/Icon';
import IconButton from 'components/icon/IconButton';

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
        className='relative w-full flex items-center justify-center rounded font-semibold px-2 md:px-8 border-r hover:bg-slate-100'
        onClick={options[0].onClick}>
        <Icon
          icon={options[0].icon}
          className='text-xl md:text-3xl text-sky-700 rounded-md'
        />
        <span className='hidden lg:flex'>{text}</span>
      </button>
      <IconButton
        icon='expand_more'
        className='hover:bg-slate-100 px-0'
        iconClassName='py-0 px-0'
        onClick={handleClick}
      />
      <ul
        className={classNames(
          'absolute top-[50px] z-10 md:z-auto right-0 bg-white drop-shadow flex flex-col',
          {
            hidden: !isOpen,
          }
        )}>
        {options.map(({ text, icon, onClick }, index) => (
          <li
            key={index}
            className={classNames(
              'cursor-pointer h-[50px] flex items-center px-2 hover:bg-gray-100',
              {
                'cursor-not-allowed': loading,
              }
            )}>
            <Icon
              icon={icon}
              className='px-2 text-xl md:text-3xl text-sky-700 rounded-md'
            />
            <a
              className='block py-2 px-2'
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
