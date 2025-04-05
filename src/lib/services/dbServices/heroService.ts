'use server';

import prisma from '@/lib/clients/prismaClient';
import { CreateHeroType } from '@/lib/types/dbServices/CreateHeroType';

import { uploadFile } from '../storageService';

export const createHeroVariant = async ({
  heroPhoto,
  translations,
}: CreateHeroType) => {
  const heroPhotoObject = await uploadFile({ fileBody: heroPhoto });

  if (heroPhotoObject instanceof Error) return heroPhotoObject;

  const createdHero = await prisma.hero.create({
    data: {
      heroPhoto: heroPhotoObject.fullPath,
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
    include: {
      translations: true,
    },
  });

  return createdHero;
};
