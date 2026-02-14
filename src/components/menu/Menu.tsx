import { type FC, type MouseEvent, type MouseEventHandler, useMemo, useRef, useState, useCallback } from 'react';
import classNames from 'classnames';

import Icon from 'components/icon/Icon';
import Loading from 'components/loading/Loading';
import useDetectOutsideClick from 'hooks/useDetectOutsideClick';

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
  const menuRef = useRef(null);
  const isClickedOutside = useDetectOutsideClick(menuRef);

  if (isClickedOutside && isOpen) {
    setIsOpen(false);
  }

  const visibleOptions = useMemo(() => options.filter(option => !option.hide), [options]);

  const handleClick = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleOptionClick = useCallback(
    (
      optionClickHandler: MouseEventHandler<
        HTMLAnchorElement | HTMLButtonElement
      >,
      disabled?: boolean
    ) => {
      return (
        event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>
      ) => {
        setIsOpen(false);

        if (!disabled) {
          optionClickHandler(event);
        }
      };
    },
    []
  );

  return (
    <div
      ref={menuRef}
      className={classNames('relative flex flex-1 border rounded-md h-[50px]', {
        'justify-center': visibleOptions.length <= 1,
      })}>
      <a
        className={`relative w-full flex items-center justify-center font-semibold text-gray-700 px-4 py-2 hover:bg-slate-100 no-underline ${
          visibleOptions.length > 1 ? 'border-r' : ''
        } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        href={visibleOptions[0]?.href}
        target='_blank'
        rel='noopener noreferrer'
        onClick={handleOptionClick(visibleOptions[0]?.onClick, loading)}>
        {loading ? (
          <Loading />
        ) : (
          <Icon
            icon={visibleOptions[0]?.icon}
            className='text-sky-700 text-2xl md:text-3xl  rounded-md'
          />
        )}
        <span className='hidden lg:flex md:ml-4'>{text}</span>
      </a>

      {visibleOptions.length > 1 && (
        <>
          <button
            type='button'
            className='relative w-full flex items-center justify-center font-semibold px-2 md:px-4 enabled:hover:bg-slate-100 md:w-1/4 disabled:cursor-not-allowed disabled:opacity-50'
            onClick={handleClick}
            disabled={loading}>
            <Icon
              icon='expand_more'
              className='text-2xl md:text-3xl text-sky-700 rounded-md'
            />
          </button>
          <ul
            className={classNames(
              'absolute top-[30px] z-10 md:z-auto right-0 p-0 bg-white drop-shadow flex flex-col',
              {
                hidden: !isOpen || loading,
              }
            )}>
            {visibleOptions.map(
              ({ href, disabled, text, icon, onClick, hide }, index) => (
                <li
                  key={index}
                  className={classNames('h-[50px] flex items-center px-4 m-0', {
                    'cursor-not-allowed opacity-50': loading || disabled,
                    'cursor-pointer hover:bg-gray-100': !loading && !disabled,
                    hidden: hide,
                  })}>
                  <Icon
                    icon={icon}
                    size='2xl'
                    className='px-2 text-2xl md:text-3xl text-sky-700 rounded-md'
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
