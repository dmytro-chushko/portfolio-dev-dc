'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import Paragraph from '@/components/typography/Paragraph/Paragraph';
import Title from '@/components/typography/Title/Title';
import StyledImage from '@/components/ui/StyledImage/StyledImage';
import StyledInput from '@/components/ui/StyledInput/StyledInput';
import { HeroTranslationResType } from '@/lib/types/dbServices';
import { LangType } from '@/lib/types/LangType';
import { Dictionary } from '@/lib/utils/getDictionary';

import HeroNameForm from '../HeroNameForm/HeroNameForm';

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
  const [isHeroNameForm, setIsHeroNameForm] = useState(false);
  const { lang } = useParams<{ lang: LangType }>();

  const getAltText = (lang: LangType) =>
    translations.find(({ language: { code } }) => code === lang)?.heroName ||
    'No Description';

  return (
    <div className="md:flex md:items-start rounded-2xl border-2 border-solid border-[--foreground] p-4 gap-4">
      <StyledImage
        className="w-full md:w-auto"
        imgSrc={heroPhoto}
        width={320}
        height={320}
        altText={getAltText(lang)}
        priority={!!imagePriority}
      />
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
                    <Title className="uppercase" header="h3" copy={code} />
                    <div className="flex gap-2">
                      <Title header="h4" copy={`${dictionary.full_name}:`} />
                      {isHeroNameForm ? (
                        <HeroNameForm
                          nameValue={heroName}
                          onClose={() => setIsHeroNameForm(false)}
                        />
                      ) : (
                        <div onClick={() => setIsHeroNameForm(true)}>
                          <Paragraph accent>{heroName}</Paragraph>
                        </div>
                      )}
                    </div>
                    <div>
                      <Title header="h4" copy={dictionary.description} />
                      <Paragraph accent>{heroDescription}</Paragraph>
                    </div>
                    <StyledInput
                      inputStyles="bg-bgInput"
                      error="error message"
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
