import { useState } from 'react';

import Paragraph from '@/components/typography/Paragraph/Paragraph';
import Title from '@/components/typography/Title/Title';
import { LangType } from '@/lib/types/LangType';
import { Dictionary } from '@/lib/utils/getDictionary';

import HeroDescriptionForm from '../HeroDescriptionForm/HeroDescriptionForm';
import HeroNameForm from '../HeroNameForm/HeroNameForm';

type HeroTranslationItemProps = {
  language: LangType;
  heroName: string;
  heroDescription: string;
  dictionary: Dictionary['dashboard']['hero_item'];
};

const HeroTranslationItem = ({
  language,
  heroName,
  heroDescription,
  dictionary,
}: HeroTranslationItemProps) => {
  const [isHeroNameForm, setIsHeroNameForm] = useState<boolean>(false);
  const [isHeroDescrForm, setIsHeroDescrForm] = useState<boolean>(false);

  return (
    <>
      <Title className="uppercase" header="h3" copy={language} />
      <div className="flex items-center gap-2">
        <Title header="h4" copy={`${dictionary.full_name}:`} />
        {isHeroNameForm ? (
          <HeroNameForm
            nameValue={heroName}
            onClose={() => setIsHeroNameForm(false)}
          />
        ) : (
          <div onClick={() => setIsHeroNameForm(true)}>
            <Paragraph className="p-2" accent>
              {heroName}
            </Paragraph>
          </div>
        )}
      </div>
      <div>
        <Title header="h4" copy={dictionary.description} />
        {isHeroDescrForm ? (
          <HeroDescriptionForm
            descriptionValue={heroDescription}
            onClose={() => setIsHeroDescrForm(false)}
          />
        ) : (
          <div onClick={() => setIsHeroDescrForm(true)}>
            <Paragraph className="p-2">{heroDescription}</Paragraph>
          </div>
        )}
      </div>
    </>
  );
};

export default HeroTranslationItem;
