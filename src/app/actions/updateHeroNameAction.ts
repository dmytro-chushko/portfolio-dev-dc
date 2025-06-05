'use server';

import { LangType } from '@prisma/client';

import { dbQueryErrorHandler } from '@/lib/errors/errorHandlers/dbQueryErrorHandler';
import PayloadValidationError from '@/lib/errors/PayloadValidationError';
import { updateHeroName } from '@/lib/services/dbServices/heroService';
import { updateHeroNameSchema } from '@/lib/validation/actionSchema/updateHeroNameSchema';
import { validateReqBody } from '@/lib/validation/validationHandlers/validateReqBody';

import { UpdateHeroNameType } from '../../lib/types/dbServices/UpdateHeroNameType';

const updateHeroNameAction = async (
  state: Record<string, string | string[]> | void,
  formData: FormData
) => {
  const heroName = formData.get('heroName');
  const translationId = formData.get('translationId');
  const lang = formData.get('lang');

  try {
    const validatedBody = await validateReqBody<
      UpdateHeroNameType & { lang: LangType }
    >({
      body: { heroName, translationId, lang },
      schema: updateHeroNameSchema,
    });

    await dbQueryErrorHandler<void, UpdateHeroNameType>(
      updateHeroName,
      validatedBody.lang
    )({
      heroName: validatedBody.heroName,
      translationId: validatedBody.translationId,
    });
  } catch (err) {
    if (err instanceof PayloadValidationError) {
      return err.details;
    }

    throw err;
  }
};

export default updateHeroNameAction;
