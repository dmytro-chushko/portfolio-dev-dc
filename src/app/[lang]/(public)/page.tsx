import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import Hero from '@/components/layout/Hero/Hero';
import { getActiveHero } from '@/lib/services/dbServices/heroService';
import { LangType } from '@/lib/types/LangType';
import { getDictionary } from '@/lib/utils/getDictionary';

type HomeProps = {
  params: Promise<{ lang: LangType }>;
};

export const metadata: Metadata = {
  title: 'Home',
  description: '...',
};

const getCachedActiveHero = unstable_cache(
  async (lang: LangType) => {
    return await getActiveHero(lang);
  },
  ['active-hero'],
  { revalidate: 3600, tags: ['active-hero'] }
);

export default async function Home({ params }: HomeProps) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);
  const activeHero = await getCachedActiveHero(lang);

  if (!activeHero) notFound();

  return (
    <Hero heroTitle={dict.hero.title} heroDescripton={dict.hero.description} />
  );
}
