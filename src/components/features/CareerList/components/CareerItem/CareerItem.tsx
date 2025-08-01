import clsx from 'clsx';

import Paragraph from '@/components/typography/Paragraph/Paragraph';
import Title from '@/components/typography/Title/Title';
import StyledImage from '@/components/ui/StyledImage/StyledImage';
import TechIconFactory from '@/components/ui/TechIconFactory/TechIconFactory';

type CareerItemProps = {
  order: number;
  title: string;
  position: string;
  format: string;
  start: string;
  finish: string;
  logo: string;
  tech: string[];
};

const CareerItem = ({
  order,
  title,
  position,
  format,
  start,
  finish,
  logo,
  tech,
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
        <ul
          className={clsx(
            'flex items-center gap-1 flex-wrap',
            order % 2 === 0 ? 'justify-end' : 'justify-start'
          )}
        >
          {tech.length > 0 &&
            tech.map((techName) => (
              <li key={techName}>
                <TechIconFactory techName={techName} size={24} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CareerItem;
