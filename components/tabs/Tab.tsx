import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FC } from 'react';

type Props = {
  className?: string;
  disabled?: boolean;
  text: string;
  icon?: string;
  indexHref?: string;
  onClick?(name: string): void;
  active?: boolean;
  name?: string;
};

const Tab: FC<Props> = ({
  className,
  text,
  disabled = false,
  icon,
  onClick = () => {},
  active = false,
  name = '',
}) => {
  const router = useRouter();

  const handleTabClick = () => {
    onClick(name);
  };

  return (
    <li>
      <button
        onClick={handleTabClick}
        className={classNames(
          'inline-flex items-center p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group',
          {
            'bg-white text-blue-600 border-blue-600 hover:text-blue-600 hover:border-blue-600 active':
              active,
            'text-gray-400 hover:text-gray-400 hover:border-b-transparent  cursor-not-allowed':
              disabled,
          },
          className
        )}
        aria-current='page'>
        {icon && (
          <span className={classNames('material-icons-outlined text-xl mr-2')}>
            {icon}
          </span>
        )}
        {text}
      </button>
    </li>
  );
};

export default Tab;
