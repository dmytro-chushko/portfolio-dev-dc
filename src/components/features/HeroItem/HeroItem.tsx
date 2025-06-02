'use client';

import { useParams } from 'next/navigation';

import Title from '@/components/typography/Title/Title';
import StyledImage from '@/components/ui/StyledImage/StyledImage';
import { HeroTranslationResType } from '@/lib/types/dbServices';
import { LangType } from '@/lib/types/LangType';
import { Dictionary } from '@/lib/utils/getDictionary';

import ImageUploadForm from '../ImageUploadForm/ImageUploadForm';

import HeroTranslationItem from './components/HeroTranslationItem/HeroTranslationItem';

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
    <div className="md:flex md:items-start rounded-2xl border-2 border-solid border-[--foreground] p-4 gap-4">
      <div className="flex-shrink-0">
        <StyledImage
          className="w-full md:w-auto"
          imgSrc={heroPhoto}
          width={320}
          height={320}
          altText={getAltText(lang)}
          priority={!!imagePriority}
        />
        <ImageUploadForm heroUploadLabel={dictionary.uploadLabel} />
      </div>
      <div className="flex-grow">
        <div>
          <Title
            className="mb-2"
            header="h2"
            copy={`${dictionary.version_name}: ${heroVersion}`}
          />
          <ul className="flex flex-col gap-2">
            {translations.length > 0 &&
              translations.map(
                ({ heroName, heroDescription, language: { code } }) => (
                  <li key={code}>
                    <HeroTranslationItem
                      language={code}
                      heroName={heroName}
                      heroDescription={heroDescription}
                      dictionary={dictionary}
                    />
                  </li>
                )
              )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeroItem;
