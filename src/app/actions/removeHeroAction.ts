'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { dbQueryErrorHandler } from '@/lib/errors/errorHandlers/dbQueryErrorHandler';
import { removeHero } from '@/lib/services/dbServices/heroService';
import { InitActionState } from '@/lib/types/actions/InitActionState';
import { RemoveHeroPropType } from '@/lib/types/dbServices/RemoveHeroPropType';
import { getActionErrorMessage } from '@/lib/utils/getActionErrorMessage';
import { removeHeroSchema } from '@/lib/validation/actionSchema/removeHeroSchema';
import { validateReqBody } from '@/lib/validation/validationHandlers/validateReqBody';

const removeHeroAction = async (state: InitActionState, formData: FormData) => {
  const heroId = formData.get('heroId');
  const { lang } = state;
  const t = await getTranslations();

  try {
    const validatedBody = await validateReqBody<RemoveHeroPropType>({
      body: { id: heroId },
      schema: removeHeroSchema(t),
    });

    await dbQueryErrorHandler<void, RemoveHeroPropType>(
      removeHero,
      lang
    )({ id: validatedBody.id });

    revalidateTag('all-heroes');

    return {
      status: 'success',
      successMessage: t('success.remove_hero'),
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

export default removeHeroAction;
