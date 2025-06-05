'use server';

import { LangType } from '@prisma/client';

import { dbQueryErrorHandler } from '@/lib/errors/errorHandlers/dbQueryErrorHandler';
import { updateHeroDescription } from '@/lib/services/dbServices/heroService';
import { UpdateHeroDescriptionType } from '@/lib/types/dbServices/UpdateHeroDescriptionType';
import { updateHeroDescriptionSchema } from '@/lib/validation/actionSchema/updateHeroDescriptionSchema';
import { validateReqBody } from '@/lib/validation/validationHandlers/validateReqBody';

const updateHeroDescriptionAction = async (
  {
    translationId,
    lang,
  }: Omit<UpdateHeroDescriptionType, 'heroName'> & { lang: LangType },
  formData: FormData
) => {
  const heroName = formData.get('heroName') || '';

  const validatedBody = await validateReqBody<UpdateHeroDescriptionType>({
    body: { heroName, translationId },
    schema: updateHeroDescriptionSchema,
  });

  await dbQueryErrorHandler<void, UpdateHeroDescriptionType>(
    updateHeroDescription,
    lang
  )(validatedBody);
};

export default updateHeroDescriptionAction;
