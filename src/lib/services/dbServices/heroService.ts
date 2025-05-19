'use server';

import prisma from '@/lib/clients/prismaClient';
import { CreateHeroResType } from '@/lib/types/dbServices/CreateHeroResType';
import { CreateHeroType } from '@/lib/types/dbServices/CreateHeroType';

export const createHeroVariant = async ({
  heroPhoto,
  heroVersion,
  translations,
}: CreateHeroType): Promise<CreateHeroResType> => {
  const createdHero = await prisma.hero.create({
    data: {
      heroPhoto,
      heroVersion,
      translations: {
        create: translations.map(({ lang, heroName, heroDescription }) => ({
          heroName,
          heroDescription,
          language: {
            connect: { code: lang },
          },
        })),
      },
    },
    select: {
      id: true,
      heroPhoto: true,
      heroVersion: true,
      translations: {
        select: {
          id: true,
          heroName: true,
          heroDescription: true,
          language: true,
        },
      },
    },
  });

  return createdHero;
};

export const getActiveHero = async () => {
  const activeHero = await prisma.hero.findFirst({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      heroPhoto: true,
      heroVersion: true,
      translations: {
        select: {
          id: true,
          heroName: true,
          heroDescription: true,
          language: true,
        },
      },
    },
  });

  return activeHero;
};
