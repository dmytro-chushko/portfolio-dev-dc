import clsx from 'clsx';

import DutyItemIcon from '@/components/icons/clipboard.svg';
import Paragraph from '@/components/typography/Paragraph/Paragraph';

type CareerDutiesProps = {
  duties: {
    id: number;
    description: string;
  }[];
  order: number;
};

const CareerDuties = ({ duties, order }: CareerDutiesProps) => {
  return (
    <ul className="flex flex-col gap-1">
      {duties.map(({ id, description }) => (
        <li
          key={id}
          className={clsx(
            'flex items-start gap-1',
            order % 2 !== 0 && 'flex-row-reverse'
          )}
        >
          <DutyItemIcon className="fill-current w-6 h-6 shrink-0" />
          <Paragraph
            className={clsx(order % 2 !== 0 ? 'text-right' : 'text-left')}
          >
            {description}
          </Paragraph>
        </li>
      ))}
    </ul>
  );
};

export default CareerDuties;
