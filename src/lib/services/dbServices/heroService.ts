'use server';

import { getTranslations } from 'next-intl/server';

import prisma from '@/lib/clients/prismaClient';
import { getPrismaErrorDetails } from '@/lib/errors/errorHandlers/getPrismaErrorDetails';
import { ActivateHeroPropType } from '@/lib/types/dbServices/ActivateHeroPropType';
import { CreateHeroType } from '@/lib/types/dbServices/CreateHeroType';
import { HeroResType } from '@/lib/types/dbServices/HeroResType';
import { UpdateHeroDescriptionType } from '@/lib/types/dbServices/UpdateHeroDescriptionType';
import { UpdateHeroNameType } from '@/lib/types/dbServices/UpdateHeroNameType';
import { UpdateHeroPhotoType } from '@/lib/types/dbServices/UpdateHeroPhotoType';
import { LangType } from '@/lib/types/LangType';
import { getDictionary } from '@/lib/utils/getDictionary';

import { RemoveHeroPropType } from './../../types/dbServices/RemoveHeroPropType';

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
      updatedAt: true,
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
        updatedAt: true,
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
          orderBy: {
            language: {
              code: 'asc',
            },
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
      updatedAt: true,
      translations: {
        select: {
          id: true,
          heroName: true,
          heroDescription: true,
          language: true,
        },
        orderBy: {
          language: {
            code: 'asc',
          },
        },
      },
    },
  });
};

export const updateHeroName = async ({
  heroName,
  translationId,
}: UpdateHeroNameType): Promise<void> => {
  await prisma.heroTranslation.update({
    where: {
      id: translationId,
    },
    data: {
      heroName,
    },
  });
};

export const updateHeroDescription = async ({
  heroDescription,
  translationId,
}: UpdateHeroDescriptionType): Promise<void> => {
  await prisma.heroTranslation.update({
    where: {
      id: translationId,
    },
    data: {
      heroDescription,
    },
  });
};

export const updateHeroPhoto = async ({
  heroPhoto,
  heroVersion,
}: UpdateHeroPhotoType): Promise<void> => {
  await prisma.hero.update({
    where: {
      heroVersion,
    },
    data: {
      heroPhoto,
    },
  });
};

export const activateHero = async ({ id }: ActivateHeroPropType) => {
  return await prisma.$transaction(async (db) => {
    await db.hero.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    await db.hero.update({
      where: { id },
      data: { isActive: true },
    });
  });
};

export const removeHero = async ({ id }: RemoveHeroPropType) => {
  const t = await getTranslations();

  return await prisma.$transaction(async (db) => {
    const hero = await db.hero.findFirst({
      where: { id },
    });

    if (hero?.isActive) throw new Error(t('errors.remove_active_hero'));

    await db.hero.delete({
      where: { id },
    });
  });
};
