import SkillList from '@/components/features/SkillList/SkillList';
import Skills from '@/components/layout/Skills/Skills';
import { LangType } from '@/lib/types/LangType';
import { getSkillList } from '@/lib/utils/getSkills';

type SkillsSlotProps = {
  params: Promise<{ lang: LangType }>;
};

export default async function SkillsSlot({ params }: SkillsSlotProps) {
  const lang = (await params).lang;
  const skillList = getSkillList(lang);

  return (
    <Skills>
      <SkillList skills={skillList} />
    </Skills>
  );
}
