import CareerList from '@/components/features/CareerList/CareerList';
import SectionLayout from '@/components/layout/SectionLayout/SectionLayout';
import { LangType } from '@/lib/types/LangType';
import { getCareerList } from '@/lib/utils/getCareer';
import { getDictionary } from '@/lib/utils/getDictionary';

type CareerProps = {
  params: Promise<{ lang: LangType }>;
};

export default async function CareerSlot({ params }: CareerProps) {
  const lang = (await params).lang;
  const dictionary = await getDictionary(lang);
  const carrerList = getCareerList(lang);

  return (
    <SectionLayout id="career" title={dictionary.nav.links.career}>
      <CareerList careers={carrerList} />
    </SectionLayout>
  );
}
