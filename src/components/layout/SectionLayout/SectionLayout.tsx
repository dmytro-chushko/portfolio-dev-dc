import clsx from 'clsx';
import { ReactNode } from 'react';

import Title from '@/components/typography/Title/Title';

type SectionLayoutProps = {
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
};

const SectionLayout = ({
  id,
  title,
  children,
  className,
}: SectionLayoutProps) => {
  return (
    <section
      id={id}
      className={clsx(
        'container mx-auto px-4 min-h-screen py-[104px]',
        className
      )}
    >
      <Title className="section-title" header="h2" copy={title} />
      {children}
    </section>
  );
};

export default SectionLayout;
