import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import HeroItem from '@/components/features/HeroItem/HeroItem';
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

  const allHeroes = await dbQueryErrorHandler<HeroResType[], undefined>(
    getAllCachedHeroes,
    lang
  )(undefined);

  if (allHeroes.length === 0) notFound();

  return (
    <ul>
      {allHeroes.map(({ id, heroPhoto, heroVersion, translations }, i) => (
        <li key={id}>
          <HeroItem
            heroPhoto={heroPhoto}
            heroVersion={heroVersion}
            translations={translations}
            dictionary={dict.dashboard.hero_item}
            imagePriority={i >= 0 && i < 2}
          />
        </li>
      ))}
    </ul>
  );
};

export default HeroList;
