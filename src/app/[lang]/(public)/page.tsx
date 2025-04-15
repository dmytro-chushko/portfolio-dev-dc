import type { Metadata } from 'next';

import Hero from '@/components/layout/Hero/Hero';
import { LangType } from '@/lib/types/LangType';
import { getDictionary } from '@/lib/utils/getDictionary';

type HomeProps = {
  params: Promise<{ lang: LangType }>;
};

export const metadata: Metadata = {
  title: 'Home',
  description: '...',
};

export default async function Home({ params }: HomeProps) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <Hero heroTitle={dict.hero.title} heroDescripton={dict.hero.description} />
  );
}
