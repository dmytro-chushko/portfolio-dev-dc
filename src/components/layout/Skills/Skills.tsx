import { ReactNode } from 'react';

import Title from '@/components/typography/Title/Title';

type SkillsProps = {
  children: ReactNode;
};

const Skills = ({ children }: SkillsProps) => {
  return (
    <section id="skills" className="min-h-screen py-[104px]">
      <Title className="section-title" header="h2" copy="Skills" />
      {children}
    </section>
  );
};

export default Skills;
