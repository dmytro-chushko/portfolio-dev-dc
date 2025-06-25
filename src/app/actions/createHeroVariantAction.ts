'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { dbQueryErrorHandler } from '@/lib/errors/errorHandlers/dbQueryErrorHandler';
import { createHeroVariant } from '@/lib/services/dbServices/heroService';
import { UpdateHeroDataState } from '@/lib/types/actions/UpdateHeroDataState';
import { CreateHeroType } from '@/lib/types/dbServices';
import { HeroResType } from '@/lib/types/dbServices/HeroResType';
import { getActionErrorMessage } from '@/lib/utils/getActionErrorMessage';
import { createHeroVariantSchema } from '@/lib/validation/actionSchema/createHeroVariantSchema';
import { validateReqBody } from '@/lib/validation/validationHandlers/validateReqBody';

const createHeroVariantAction = async (
  state: Omit<UpdateHeroDataState, 'translationId'>,
  formData: FormData
) => {
  const heroPhoto = formData.get('heroPhoto');
  const heroVersion = formData.get('heroVersion');
  const stringifiedTranslations = formData.get('translations');
  const translations =
    typeof stringifiedTranslations === 'string' &&
    JSON.parse(stringifiedTranslations);
  const t = await getTranslations();

  const { lang } = state;

  try {
    const validatedBody = await validateReqBody<CreateHeroType>({
      body: {
        heroPhoto,
        heroVersion,
        translations,
      },
      schema: createHeroVariantSchema(t),
    });

    await dbQueryErrorHandler<HeroResType, CreateHeroType>(
      createHeroVariant,
      lang
    )({
      heroPhoto: validatedBody.heroPhoto,
      heroVersion: validatedBody.heroVersion,
      translations: validatedBody.translations,
    });

    revalidateTag('all-heroes');

    return {
      status: 'success',
      successMessage: 'Name updated',
      lang,
    };
  } catch (err) {
    return {
      status: 'error',
      errorMessage: getActionErrorMessage(err),
      lang,
    };
  }
};

export default createHeroVariantAction;
