'use server';

import { LangType } from '@prisma/client';
import { revalidateTag } from 'next/cache';

import { dbQueryErrorHandler } from '@/lib/errors/errorHandlers/dbQueryErrorHandler';
import PayloadValidationError from '@/lib/errors/PayloadValidationError';
import { updateHeroName } from '@/lib/services/dbServices/heroService';
import { UpdateHeroDataState } from '@/lib/types/actions/UpdateHeroDataState';
import { updateHeroNameSchema } from '@/lib/validation/actionSchema/updateHeroNameSchema';
import { validateReqBody } from '@/lib/validation/validationHandlers/validateReqBody';

import { UpdateHeroNameType } from '../../lib/types/dbServices/UpdateHeroNameType';

const updateHeroNameAction = async (
  state: UpdateHeroDataState,
  formData: FormData
) => {
  const heroName = formData.get('heroName');
  const { translationId, lang } = state;

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

    revalidateTag('all-heroes');

    return {
      status: 'success',
      successMessage: 'Name updated',
      translationId,
      lang,
    };
  } catch (err) {
    if (err instanceof PayloadValidationError) {
      return {
        status: 'error',
        errorMessage: err.errorMessage,
        translationId,
        lang,
      };
    }

    throw err;
  }
};

export default updateHeroNameAction;
