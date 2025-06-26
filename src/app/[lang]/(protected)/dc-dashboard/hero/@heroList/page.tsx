import { revalidateTag, unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import HeroItem from '@/components/features/HeroItem/HeroItem';
import SortingButton from '@/components/features/SortingButton/SortingButton';
import { dbQueryErrorHandler } from '@/lib/errors/errorHandlers/dbQueryErrorHandler';
import { getAllHeroes } from '@/lib/services/dbServices/heroService';
import { HeroResType } from '@/lib/types/dbServices/HeroResType';
import { LangType } from '@/lib/types/LangType';
import { getDictionary } from '@/lib/utils/getDictionary';

type HeroListProps = {
  params: Promise<{ lang: LangType }>;
};

const getAllCachedHeroes = unstable_cache(getAllHeroes, ['all-heroes'], {
  revalidate: 3600,
  tags: ['all-heroes'],
});

const HeroList = async ({ params }: HeroListProps) => {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);
  let isDescOrder = true;

  const allHeroes = await dbQueryErrorHandler<HeroResType[], boolean>(
    getAllCachedHeroes,
    lang
  )(isDescOrder);

  if (allHeroes.length === 0) notFound();

  const handleChangeSorting = () => {
    isDescOrder = !isDescOrder;
    revalidateTag('all-heroes');
  };

  return (
    <>
      <SortingButton onClick={handleChangeSorting} />
      <ul className="grid gap-4">
        {allHeroes.map(({ id, heroPhoto, heroVersion, translations }, i) => (
          <li key={id}>
            <HeroItem
              heroPhoto={heroPhoto}
              heroVersion={heroVersion}
              translations={translations}
              dictionary={dict.dashboard.hero_item}
              formDictionary={dict.form}
              imagePriority={i >= 0 && i < 2}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default HeroList;
