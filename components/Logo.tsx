import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  collapsed?: boolean;
};

const Logo: FC<Props> = ({ collapsed }) => (
  <div className='flex-col items-center'>
    <h1
      className={classNames(
        'font-ClickerScript text-2xl font-light mb-[-1rem]',
        {
          'mb-2': collapsed,
        }
      )}>
      {collapsed ? 'j' : 'jeanaica'}
    </h1>
    <span
      className={classNames(
        'font-PoppinsExtraLight text-[10px] tracking-wider',
        {
          hidden: collapsed,
        }
      )}>
      tech. life. love.
    </span>
  </div>
);

export default Logo;
