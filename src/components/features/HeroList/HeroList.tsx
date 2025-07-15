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
        heroList
          .map((hero) => ({
            ...hero,
            updatedAt:
              typeof hero.updatedAt === 'string'
                ? new Date(hero.updatedAt)
                : hero.updatedAt,
          }))
          .sort((a, b) =>
            isAscSorting
              ? a.updatedAt.getTime() - b.updatedAt.getTime()
              : b.updatedAt.getTime() - a.updatedAt.getTime()
          )
      );
    } else setSortedHeroList(heroList);
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
