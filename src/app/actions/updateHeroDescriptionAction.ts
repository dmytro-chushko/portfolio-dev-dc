'use server';

import { revalidateTag } from 'next/cache';

import { dbQueryErrorHandler } from '@/lib/errors/errorHandlers/dbQueryErrorHandler';
import { updateHeroDescription } from '@/lib/services/dbServices/heroService';
import { UpdateHeroDataState } from '@/lib/types/actions/UpdateHeroDataState';
import { UpdateHeroDescriptionType } from '@/lib/types/dbServices/UpdateHeroDescriptionType';
import { LangType } from '@/lib/types/LangType';
import { getActionErrorMessage } from '@/lib/utils/getActionErrorMessage';
import { updateHeroDescriptionSchema } from '@/lib/validation/actionSchema/updateHeroDescriptionSchema';
import { validateReqBody } from '@/lib/validation/validationHandlers/validateReqBody';

const updateHeroDescriptionAction = async (
  state: UpdateHeroDataState,
  formData: FormData
) => {
  const heroDescription = formData.get('heroDescription');
  const { translationId, lang } = state;

  try {
    const validatedBody = await validateReqBody<
      UpdateHeroDescriptionType & { lang: LangType }
    >({
      body: { heroDescription, translationId },
      schema: updateHeroDescriptionSchema,
    });

    await dbQueryErrorHandler<void, UpdateHeroDescriptionType>(
      updateHeroDescription,
      validatedBody.lang
    )({
      heroDescription: validatedBody.heroDescription,
      translationId: validatedBody.translationId,
    });

    revalidateTag('all-heroes');

    return {
      status: 'success',
      successMessage: 'Description updated',
      translationId,
      lang,
    };
  } catch (err) {
    return {
      status: 'error',
      errorMessage: getActionErrorMessage(err),
      translationId,
      lang,
    };
  }
};

export default updateHeroDescriptionAction;
