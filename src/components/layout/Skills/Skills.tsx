import { ReactNode } from 'react';

type SkillsProps = {
  children: ReactNode;
};

const Skills = ({ children }: SkillsProps) => {
  return (
    <section
      id="skills"
      className="min-h-screen pt-[104px] lg:min-h-[calc(100vh-104px)]"
    >
      {children}
    </section>
  );
};

export default Skills;
