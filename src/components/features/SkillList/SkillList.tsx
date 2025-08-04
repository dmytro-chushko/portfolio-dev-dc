'use client';

import Paragraph from '@/components/typography/Paragraph/Paragraph';
import TechIconFactory from '@/components/ui/TechIconFactory/TechIconFactory';

type SkillListProps = {
  skills: {
    techName: string;
    title: string;
    category: string;
    description: string;
    estimate: number;
  }[];
};

const SkillList = ({ skills }: SkillListProps) => {
  return (
    <ul className="flex items-center gap-y-4 flex-wrap">
      {skills.length > 0 &&
        skills
          .filter(({ category }) => category === 'primary')
          .map(({ techName, title, description }) => (
            <li
              key={techName}
              className="flex items-center gap-2 sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <TechIconFactory techName={techName} size={64} />
              <div>
                <Paragraph accent>{title}</Paragraph>
                <Paragraph>{description}</Paragraph>
              </div>
            </li>
          ))}
    </ul>
  );
};

export default SkillList;
