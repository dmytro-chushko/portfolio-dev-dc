'use server';

import { LangType } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { dbQueryErrorHandler } from '@/lib/errors/errorHandlers/dbQueryErrorHandler';
import { updateHeroName } from '@/lib/services/dbServices/heroService';
import { UpdateHeroDataState } from '@/lib/types/actions/UpdateHeroDataState';
import { getActionErrorMessage } from '@/lib/utils/getActionErrorMessage';
import { updateHeroNameSchema } from '@/lib/validation/actionSchema/updateHeroNameSchema';
import { validateReqBody } from '@/lib/validation/validationHandlers/validateReqBody';

import { UpdateHeroNameType } from '../../lib/types/dbServices/UpdateHeroNameType';

const updateHeroNameAction = async (
  state: UpdateHeroDataState,
  formData: FormData
) => {
  const heroName = formData.get('heroName');
  const { translationId, lang } = state;
  const t = await getTranslations();

  try {
    const validatedBody = await validateReqBody<
      UpdateHeroNameType & { lang: LangType }
    >({
      body: { heroName, translationId, lang },
      schema: updateHeroNameSchema(t),
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
      successMessage: t('success.update_hero_name'),
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

export default updateHeroNameAction;
