import { Metadata } from 'next';
import React from 'react';

import Title from '@/components/typography/Title/Title';
import { LangType } from '@/lib/types/LangType';
import { getDictionary } from '@/lib/utils/getDictionary';

type PageProps = {
  params: Promise<{ lang: LangType }>;
};

export const metadata: Metadata = {
  title: 'Home',
  description: '...',
};

const HeroDashboard = async ({ params }: PageProps) => {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <div>
      <Title header="h1" copy={dict.dashboard.hero.page_title} />
    </div>
  );
};

export default HeroDashboard;
