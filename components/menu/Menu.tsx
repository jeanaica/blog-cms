import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import Icon from 'components/icon/Icon';
import useDetectOutsideClick from 'shared/utils/hooks/useDetectOutsideClick';

type MenuOptions = Array<{
  text: string;
  onClick: MouseEventHandler;
  icon: string;
  href?: string;
  disabled?: boolean;
  hide?: boolean;
}>;

type Props = {
  text: string;
  options: MenuOptions;
  loading?: boolean;
};

const Menu: FC<Props> = ({ text, options, loading = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [optionsValue, setOptions] = useState<MenuOptions>([]);
  const menuRef = useRef(null);
  const isClickedOutside = useDetectOutsideClick(menuRef);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (
    optionClickHandler: MouseEventHandler<HTMLAnchorElement>,
    disabled?: boolean
  ) => {
    return (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      setIsOpen(false);

      if (!disabled) {
        optionClickHandler(event);
      }
    };
  };

  useEffect(() => {
    if (isClickedOutside) {
      setIsOpen(false);
    }
  }, [isClickedOutside]);

  useEffect(() => {
    setOptions(options.filter(option => !option.hide));
  }, [options]);

  return (
    <div
      ref={menuRef}
      className={classNames('relative flex w-full border rounded-md h-[50px]', {
        'justify-center': optionsValue.length <= 1,
      })}>
      <button
        type='button'
        className={`relative w-full flex items-center justify-center  font-semibold px-2 md:px-4 hover:bg-slate-100 ${
          optionsValue.length > 1 ? 'border-r' : 'md:w-3/4'
        }`}
        onClick={options[0].onClick}
        disabled={loading}>
        <Icon
          icon={options[0].icon}
          className='text-xl md:text-3xl text-sky-700 rounded-md'
        />
        <span className='hidden lg:flex md:ml-4'>{text}</span>
      </button>

      {optionsValue.length > 1 && (
        <>
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
            {optionsValue.map(
              ({ href, disabled, text, icon, onClick, hide }, index) => (
                <li
                  key={index}
                  className={classNames(
                    'h-[50px] flex items-center px-4 hover:bg-gray-100 m-0',
                    {
                      'bg-gray-100 cursor-not-allowed': loading || disabled,
                      'cursor-pointer': !loading && !disabled,
                      hidden: hide,
                    }
                  )}>
                  <Icon
                    icon={icon}
                    className='px-2 text-xl md:text-3xl text-sky-700 rounded-md'
                  />
                  {href ? (
                    <a
                      className='block py-2 px-2 no-underline'
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={handleOptionClick(onClick, disabled)}>
                      {text}
                    </a>
                  ) : (
                    <a
                      className='block py-2 px-2 no-underline'
                      onClick={handleOptionClick(onClick, disabled)}>
                      {text}
                    </a>
                  )}
                </li>
              )
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Menu;
