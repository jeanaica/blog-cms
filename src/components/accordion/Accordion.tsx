import { type FC, type ReactNode } from 'react';
import classNames from 'classnames';

import AccordionItem from './AccordionItem';

type Props = {
  items: Array<{ title: string; content: ReactNode }>;
  className?: string;
};

const Accordion: FC<Props> = ({ items, className }) => (
  <div className={classNames('px-1', className)}>
    {items.map((item, index) => (
      <AccordionItem
        key={index}
        title={item.title}>
        {item.content}
      </AccordionItem>
    ))}
  </div>
);

export default Accordion;
