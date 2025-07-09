'use client';

import { useEffect, useState } from 'react';

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
  const [sortedHeroList, setSortedHeroList] = useState<HeroResType[]>(heroList);

  const handleToggleSorting = () => setIsAscSorting(!isAscSorting);

  useEffect(() => {
    if (heroList.length > 1) {
      setSortedHeroList(
        heroList.sort((a, b) =>
          isAscSorting
            ? a.updatedAt.getMilliseconds() - b.updatedAt.getMilliseconds()
            : b.updatedAt.getMilliseconds() - a.updatedAt.getMilliseconds()
        )
      );
    }
  }, [heroList, isAscSorting]);

  return (
    <>
      <SortingButton onClick={handleToggleSorting} />
      <ul className="grid gap-4">
        {sortedHeroList.map(
          ({ id, heroPhoto, heroVersion, isActive, translations }, i) => (
            <li key={id}>
              <HeroItem
                id={id}
                heroPhoto={heroPhoto}
                heroVersion={heroVersion}
                isActive={isActive}
                translations={translations}
                dictionary={dict.dashboard.hero_item}
                formDictionary={dict.form}
                imagePriority={i >= 0 && i < 2}
              />
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default HeroListClient;
