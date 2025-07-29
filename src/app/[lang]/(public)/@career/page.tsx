import CareerList from '@/components/features/CareerList/CareerList';
import Career from '@/components/layout/Career/Career';
import { LangType } from '@/lib/types/LangType';
import { getCareerList } from '@/lib/utils/getCareer';

type CareerProps = {
  params: Promise<{ lang: LangType }>;
};

export default async function CareerSlot({ params }: CareerProps) {
  const lang = (await params).lang;
  const carrerList = getCareerList(lang);

  return (
    <Career>
      <CareerList careers={carrerList} />
    </Career>
  );
}
