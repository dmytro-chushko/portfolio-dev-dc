import clsx from 'clsx';

import Paragraph from '@/components/typography/Paragraph/Paragraph';
import Title from '@/components/typography/Title/Title';
import StyledImage from '@/components/ui/StyledImage/StyledImage';

type CareerItemProps = {
  order: number;
  title: string;
  position: string;
  format: string;
  start: string;
  finish: string;
  logo: string;
};

const CareerItem = ({
  order,
  title,
  position,
  format,
  start,
  finish,
  logo,
}: CareerItemProps) => {
  return (
    <div className={clsx('flex gap-4', order % 2 === 0 && 'flex-row-reverse')}>
      <StyledImage
        imgSrc={`/image/career-logo/${logo}`}
        width={200}
        height={200}
        altText={title}
      />
      <div
        className={clsx(
          'flex flex-col',
          order % 2 === 0 ? 'items-end' : 'items-start'
        )}
      >
        <Paragraph
          accent
        >{`${start}${finish ? ` - ${finish}` : ''}`}</Paragraph>
        <Title header="h2" copy={title} />
        <Paragraph accent>{position}</Paragraph>
        <Paragraph accent>{format}</Paragraph>
      </div>
    </div>
  );
};

export default CareerItem;
