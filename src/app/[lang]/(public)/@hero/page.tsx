import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import Hero from '@/components/layout/Hero/Hero';
import { dbQueryErrorHandler } from '@/lib/errors/errorHandlers/dbQueryErrorHandler';
import { getActiveHero } from '@/lib/services/dbServices/heroService';
import { HeroResType } from '@/lib/types/dbServices/HeroResType';
import { LangType } from '@/lib/types/LangType';

type HeroProps = {
  params: Promise<{ lang: LangType }>;
};

const getCachedActiveHero = unstable_cache(
  getActiveHero,
  ['active-hero', 'lanag'],
  { revalidate: 3600, tags: ['active-hero', 'lang'] }
);

export default async function HeroSlot({ params }: HeroProps) {
  const lang = (await params).lang;
  const activeHero = await dbQueryErrorHandler<HeroResType | null, LangType>(
    getCachedActiveHero,
    lang
  )(lang);

  if (!activeHero) notFound();

  return (
    <Hero
      heroTitle={activeHero.translations[0].heroName}
      heroDescripton={activeHero.translations[0].heroDescription}
      heroPhoto={activeHero.heroPhoto}
    />
  );
}
