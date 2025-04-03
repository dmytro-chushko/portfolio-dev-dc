import { CreateLangType } from '@/lib/types/dbServices';

import prisma from '../../clients/prismaClient';

export const getAllLanguages = async () => {
  const langs = await prisma.language.findMany();

  return langs;
};

export const createLanguage = async ({ code, name }: CreateLangType) => {
  const createdLang = await prisma.language.create({
    data: {
      code,
      name,
    },
  });

  return createdLang;
};
