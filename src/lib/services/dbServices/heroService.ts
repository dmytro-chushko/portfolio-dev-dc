'use server';

import prisma from '@/lib/clients/prismaClient';
import { getPrismaErrorDetails } from '@/lib/errors/errorHandlers/getPrismaErrorDetails';
import { CreateHeroType } from '@/lib/types/dbServices/CreateHeroType';
import { HeroResType } from '@/lib/types/dbServices/HeroResType';
import { LangType } from '@/lib/types/LangType';
import { getDictionary } from '@/lib/utils/getDictionary';

export const createHeroVariant = async ({
  heroPhoto,
  heroVersion,
  translations,
}: CreateHeroType): Promise<HeroResType> => {
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

export const getActiveHero = async (
  lang: LangType
): Promise<HeroResType | null> => {
  const dict = await getDictionary(lang);
  try {
    const activeHero = await prisma.hero.findFirst({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        heroPhoto: true,
        heroVersion: true,
        isActive: true,
        translations: {
          where: {
            language: {
              code: lang,
            },
          },
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
  } catch (err) {
    throw new Error(`${dict.errors.db}: ${getPrismaErrorDetails(err).message}`);
  }
};

export const getAllHeroes = async (): Promise<HeroResType[]> => {
  return await prisma.hero.findMany({
    select: {
      id: true,
      heroPhoto: true,
      heroVersion: true,
      isActive: true,
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
};
