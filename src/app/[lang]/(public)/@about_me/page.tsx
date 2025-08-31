import { LangType } from '@prisma/client';
import { notFound } from 'next/navigation';

import { AboutMeContent } from '@/components/features/AboutMeContent/AboutMeContent';
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
    <section id="about_me">
      <AboutMeContent
        setionHeader={dictionary.nav.links.about_me}
        header={header}
        subHeader={subHeader}
        footer={footer}
        hobbies={hobbies}
        headerImg={headerImg}
        footerImg={footerImg}
        hobbiesImgs={hobbiesImgs}
      />
    </section>
  );
}
