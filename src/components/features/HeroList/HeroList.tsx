'use client';

import { useState } from 'react';

import { HeroResType } from '@/lib/types/dbServices/HeroResType';
import { Dictionary } from '@/lib/utils/getDictionary';

import HeroItem from '../HeroItem/HeroItem';
import SortingButton from '../SortingButton/SortingButton';

type HeroListProps = {
  heroList: HeroResType[];
  dict: Dictionary;
};

const HeroListClient = ({ heroList, dict }: HeroListProps) => {
  const [isAscSorting, setIsAscSorting] = useState<boolean>(true);

  const handleToggleSorting = () => setIsAscSorting(!isAscSorting);

  return (
    <>
      <SortingButton onClick={handleToggleSorting} />
      <ul className="grid gap-4">
        {heroList
          .sort((a, b) =>
            isAscSorting
              ? a.updatedAt.getMilliseconds() - b.updatedAt.getMilliseconds()
              : b.updatedAt.getMilliseconds() - a.updatedAt.getMilliseconds()
          )
          .map(({ id, heroPhoto, heroVersion, translations }, i) => (
            <li key={id}>
              <HeroItem
                heroPhoto={heroPhoto}
                heroVersion={heroVersion}
                translations={translations}
                dictionary={dict.dashboard.hero_item}
                formDictionary={dict.form}
                imagePriority={i >= 0 && i < 2}
              />
            </li>
          ))}
      </ul>
    </>
  );
};

export default HeroListClient;
