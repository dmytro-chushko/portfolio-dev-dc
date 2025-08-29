import { LangType } from '@prisma/client';
import { notFound } from 'next/navigation';

import { AboutMeContent } from '@/components/features/AboutMeContent/AboutMeContent';
import SectionLayout from '@/components/layout/SectionLayout/SectionLayout';
import { getAboutMe } from '@/lib/utils/getAboutMe';
import { getDictionary } from '@/lib/utils/getDictionary';

type AboutMeProps = {
  params: Promise<{ lang: LangType }>;
};

export default async function AboutMeSlot({ params }: AboutMeProps) {
  const lang = (await params).lang;
  const dictionary = await getDictionary(lang);
  const aboutMeContent = getAboutMe(lang);

  if (!aboutMeContent) notFound();

  const {
    header,
    footer,
    hobbies,
    headerImg,
    footerImg,
    hobbiesImgs,
    subHeader,
  } = aboutMeContent;

  return (
    <SectionLayout
      id="about_me"
      className="flex flex-col"
      title={dictionary.nav.links.about_me}
    >
      <AboutMeContent
        header={header}
        subHeader={subHeader}
        footer={footer}
        hobbies={hobbies}
        headerImg={headerImg}
        footerImg={footerImg}
        hobbiesImgs={hobbiesImgs}
      />
    </SectionLayout>
  );
}
