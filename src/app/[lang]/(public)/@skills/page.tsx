import SkillList from '@/components/features/SkillList/SkillList';
import SectionLayout from '@/components/layout/SectionLayout/SectionLayout';
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
  const primarySkillList = skillList.filter(
    (skill) => skill.category === 'primary'
  );
  const secondarySkillList = skillList.filter(
    (skill) => skill.category === 'secondary'
  );
  const dictionary = await getDictionary(lang);

  return (
    <SectionLayout id="skills" title={dictionary.nav.links.skills}>
      <Title className="mb-8" header="h3" copy={dictionary.slkills.primary} />
      <div className="mb-8">
        <SkillList skills={primarySkillList} />
      </div>
      <Title className="mb-8" header="h3" copy={dictionary.slkills.secondary} />
      <SkillList skills={secondarySkillList} />
    </SectionLayout>
  );
}
