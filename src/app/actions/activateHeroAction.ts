'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { dbQueryErrorHandler } from '@/lib/errors/errorHandlers/dbQueryErrorHandler';
import { activateHero } from '@/lib/services/dbServices/heroService';
import { InitActionState } from '@/lib/types/actions/InitActionState';
import { getActionErrorMessage } from '@/lib/utils/getActionErrorMessage';
import { activateHeroSchema } from '@/lib/validation/actionSchema/activateHeroSchema';
import { validateReqBody } from '@/lib/validation/validationHandlers/validateReqBody';

import { ActivateHeroPropType } from './../../lib/types/dbServices/ActivateHeroPropType';

const activateHeroAction = async (
  state: InitActionState,
  formData: FormData
) => {
  const heroId = formData.get('heroId');
  const { lang } = state;
  const t = await getTranslations();

  try {
    const validatedBody = await validateReqBody<ActivateHeroPropType>({
      body: { id: heroId },
      schema: activateHeroSchema(t),
    });

    await dbQueryErrorHandler<void, { id: string }>(
      activateHero,
      lang
    )({ id: validatedBody.id });

    revalidateTag('all-heroes');

    return {
      status: 'success',
      successMessage: t('success.uactivate_hero'),
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

export default activateHeroAction;
