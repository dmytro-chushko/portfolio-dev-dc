import { LangType } from '@prisma/client';
import { useState } from 'react';

import HoverToolTip from '@/components/features/HoverToolTip/HoverToolTip';
import Paragraph from '@/components/typography/Paragraph/Paragraph';
import Title from '@/components/typography/Title/Title';
import { Dictionary } from '@/lib/utils/getDictionary';

import HeroDescriptionForm from '../HeroDescriptionForm/HeroDescriptionForm';
import HeroNameForm from '../HeroNameForm/HeroNameForm';

type HeroTranslationItemProps = {
  translationId: string;
  language: LangType;
  heroName: string;
  heroDescription: string;
  dictionary: Dictionary['dashboard']['hero_item'];
  formDictionary: Dictionary['form'];
};

const HeroTranslationItem = ({
  translationId,
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
      <div className="flex items-start gap-2">
        <Title className="p-2" header="h4" copy={`${dictionary.full_name}:`} />
        {isHeroNameForm ? (
          <HeroNameForm
            translationId={translationId}
            lang={language}
            nameValue={heroName}
            onClose={() => setIsHeroNameForm(false)}
          />
        ) : (
          <div onClick={() => setIsHeroNameForm(true)}>
            <HoverToolTip toltipValue={dictionary.toltip}>
              <Paragraph className="p-2 cursor-pointer" accent>
                {heroName}
              </Paragraph>
            </HoverToolTip>
          </div>
        )}
      </div>
      <div>
        <Title header="h4" copy={dictionary.description} />
        {isHeroDescrForm ? (
          <HeroDescriptionForm
            translationId={translationId}
            lang={language}
            descriptionValue={heroDescription}
            onClose={() => setIsHeroDescrForm(false)}
          />
        ) : (
          <div onClick={() => setIsHeroDescrForm(true)}>
            <HoverToolTip toltipValue={dictionary.toltip}>
              <Paragraph className="p-2 cursor-pointer">
                {heroDescription}
              </Paragraph>
            </HoverToolTip>
          </div>
        )}
      </div>
    </>
  );
};

export default HeroTranslationItem;
