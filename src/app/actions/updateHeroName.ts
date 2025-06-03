'use server';

import { LangType } from '@prisma/client';

import { dbQueryErrorHandler } from '@/lib/errors/errorHandlers/dbQueryErrorHandler';
import { updateHeroName } from '@/lib/services/dbServices/heroService';

import { UpdateHeroNameType } from './../../lib/types/dbServices/UpdateHeroNameType';

const updateHeroNameAction = async ({
  heroName,
  languageId,
  lang,
}: UpdateHeroNameType & { lang: LangType }) => {
  await dbQueryErrorHandler<void, UpdateHeroNameType>(
    updateHeroName,
    lang
  )({ heroName, languageId });
};

export default updateHeroNameAction;
