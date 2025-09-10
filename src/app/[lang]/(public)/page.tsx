import type { Metadata } from 'next';

import ContactModal from '@/components/features/ContactModal/ContactModal';
import { LangType } from '@/lib/types/LangType';

type HomeProps = {
  params: Promise<{ lang: LangType }>;
};

export const metadata: Metadata = {
  title: 'Home',
  description: '...',
};

export default async function Home({ params }: HomeProps) {
  const lang = (await params).lang;

  return (
    <>
      <ContactModal />
      <div data-lang={lang} />
    </>
  );
}
