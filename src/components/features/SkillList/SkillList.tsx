'use client';

import Paragraph from '@/components/typography/Paragraph/Paragraph';
import TechIconFactory from '@/components/ui/TechIconFactory/TechIconFactory';

type SkillListProps = {
  skills: {
    techName: string;
    title: string;
    description: string;
    estimate: number;
  }[];
};

const SkillList = ({ skills }: SkillListProps) => {
  return (
    <ul className="flex items-center gap-2">
      {skills.length > 0 &&
        skills.map(({ techName, title, description }) => (
          <li key={techName} className="flex items-center gap-2">
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
