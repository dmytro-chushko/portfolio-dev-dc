import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import HeroListClient from '@/components/features/HeroList/HeroList';
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

  const allHeroes = await dbQueryErrorHandler<HeroResType[], void>(
    getAllCachedHeroes,
    lang
  )();

  if (allHeroes.length === 0) notFound();

  return <HeroListClient heroList={allHeroes} dict={dict} />;
};

export default HeroList;
