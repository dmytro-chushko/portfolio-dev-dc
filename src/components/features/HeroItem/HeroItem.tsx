'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import Title from '@/components/typography/Title/Title';
import StyledImage from '@/components/ui/StyledImage/StyledImage';
import { HeroTranslationResType } from '@/lib/types/dbServices';
import { LangType } from '@/lib/types/LangType';
import { Dictionary } from '@/lib/utils/getDictionary';

import ActivateHero from '../ActivateHero/ActivateHero';
import ImageUploadForm from '../ImageUploadForm/ImageUploadForm';
import RemoveHero from '../RemoveHero/RemoveHero';

import HeroTranslationItem from './components/HeroTranslationItem/HeroTranslationItem';

type HeroItemProps = {
  id: string;
  dictionary: Dictionary['dashboard']['hero_item'];
  formDictionary: Dictionary['form'];
  heroPhoto: string;
  heroVersion: string;
  isActive: boolean;
  translations: HeroTranslationResType[];
  imagePriority?: boolean;
};

const HeroItem = ({
  id,
  heroPhoto,
  heroVersion,
  isActive,
  translations,
  dictionary,
  formDictionary,
  imagePriority,
}: HeroItemProps) => {
  const { lang } = useParams<{ lang: LangType }>();
  const [photoUrl, setPhotoUrl] = useState<string>(heroPhoto);

  const getAltText = (lang: LangType) =>
    translations.find(({ language: { code } }) => code === lang)?.heroName ||
    'No Description';

  return (
    <div className="md:flex md:items-start rounded-2xl border-2 border-solid border-[--foreground] p-4 gap-4">
      <div className="flex-shrink-0 md:w-[320px]">
        <StyledImage
          className="w-full"
          imgSrc={photoUrl}
          width={320}
          height={320}
          altText={getAltText(lang)}
          priority={!!imagePriority}
        />
        <ImageUploadForm
          initPhoto={heroPhoto}
          heroVersion={heroVersion}
          onChangePreview={setPhotoUrl}
        />
        <ActivateHero heroId={id} isActive={isActive} lang={lang} />
        <RemoveHero heroId={id} isActive={isActive} lang={lang} />
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
                ({ id, heroName, heroDescription, language: { code } }) => (
                  <li key={id}>
                    <HeroTranslationItem
                      translationId={id}
                      language={code}
                      heroName={heroName}
                      heroDescription={heroDescription}
                      dictionary={dictionary}
                      formDictionary={formDictionary}
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
