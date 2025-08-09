import SkillList from '@/components/features/SkillList/SkillList';
import Skills from '@/components/layout/Skills/Skills';
import Title from '@/components/typography/Title/Title';
import { LangType } from '@/lib/types/LangType';
import { getDictionary } from '@/lib/utils/getDictionary';
import { getSkillList } from '@/lib/utils/getSkills';

type SkillsSlotProps = {
  params: Promise<{ lang: LangType }>;
};

export default async function SkillsSlot({ params }: SkillsSlotProps) {
  const lang = (await params).lang;
  const skillList = getSkillList(lang);
  const dictionary = await getDictionary(lang);

  return (
    <Skills>
      <Title className="mb-8" header="h3" copy={dictionary.slkills.primary} />
      <SkillList skills={skillList} />
    </Skills>
  );
}
