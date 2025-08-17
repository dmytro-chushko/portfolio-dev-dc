import { ReactNode } from 'react';

import Title from '@/components/typography/Title/Title';

type SectionLayoutProps = {
  id: string;
  title: string;
  children: ReactNode;
};

const SectionLayout = ({ id, title, children }: SectionLayoutProps) => {
  return (
    <section id={id} className="min-h-screen py-[104px]">
      <Title className="section-title" header="h2" copy={title} />
      {children}
    </section>
  );
};

export default SectionLayout;
