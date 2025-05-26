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
    <div className="flex rounded-2xl border-2 border-solid border-[--foreground] p-4 gap-4">
      <StyledImage
        imgSrc={heroPhoto}
        width={320}
        height={320}
        altText={getAltText(lang)}
        priority={!!imagePriority}
      />
      <div className="flex-grow">
        <div>
          <Paragraph accent>
            {`${dictionary.version_name}: ${heroVersion}`}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default HeroItem;
