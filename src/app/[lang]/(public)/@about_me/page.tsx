import { LangType } from '@prisma/client';

import SectionLayout from '@/components/layout/SectionLayout/SectionLayout';
import { getDictionary } from '@/lib/utils/getDictionary';

type AboutMeProps = {
  params: Promise<{ lang: LangType }>;
};

export default async function AboutMeSlot({ params }: AboutMeProps) {
  const lang = (await params).lang;
  const dictionary = await getDictionary(lang);

  return (
    <SectionLayout id="about_me" title={dictionary.nav.links.about_me}>
      About Me
    </SectionLayout>
  );
}
