import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';

import Title from '@/components/typography/Title/Title';
import { dbQueryErrorHandler } from '@/lib/errors/errorHandlers/dbQueryErrorHandler';
import { getAllHeroes } from '@/lib/services/dbServices/heroService';
import { HeroResType } from '@/lib/types/dbServices/HeroResType';
import { LangType } from '@/lib/types/LangType';
import { getDictionary } from '@/lib/utils/getDictionary';

type PageProps = {
  params: Promise<{ lang: LangType }>;
};

export const metadata: Metadata = {
  title: 'Home',
  description: '...',
};

const getAllCachedHeroes = unstable_cache(getAllHeroes, ['all-heroes'], {
  revalidate: 3600,
  tags: ['all-heroes'],
});

const HeroDashboard = async ({ params }: PageProps) => {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  await dbQueryErrorHandler<HeroResType[], undefined>(
    getAllCachedHeroes,
    lang
  )(undefined);

  return (
    <div>
      <Title header="h1" copy={dict.dashboard.hero.page_title} />
    </div>
  );
};

export default HeroDashboard;
