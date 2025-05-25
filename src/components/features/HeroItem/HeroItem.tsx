'use client';

import { useParams } from 'next/navigation';

import Paragraph from '@/components/typography/Paragraph/Paragraph';
import StyledImage from '@/components/ui/StyledImage/StyledImage';
import { HeroTranslationResType } from '@/lib/types/dbServices';
import { LangType } from '@/lib/types/LangType';
import { Dictionary } from '@/lib/utils/getDictionary';

type HeroItemProps = {
  dictionary: Dictionary['dashboard']['hero_item'];
  heroPhoto: string;
  heroVersion: string;
  translations: HeroTranslationResType[];
  imagePriority?: boolean;
};

const HeroItem = ({
  heroPhoto,
  heroVersion,
  translations,
  dictionary,
  imagePriority,
}: HeroItemProps) => {
  const { lang } = useParams<{ lang: LangType }>();

  const getAltText = (lang: LangType) =>
    translations.find(({ language: { code } }) => code === lang)?.heroName ||
    'No Description';

  return (
    <div>
      <StyledImage
        imgSrc={heroPhoto}
        width={322}
        height={323.67}
        altText={getAltText(lang)}
        priority={!!imagePriority}
      />
      <div>
        <div>
          <Paragraph accent>{dictionary.version_name}</Paragraph>
          <Paragraph accent>{heroVersion}</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default HeroItem;
