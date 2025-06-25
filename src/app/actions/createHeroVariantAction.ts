'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { createHeroVariant } from '@/lib/services/dbServices/heroService';
import { UpdateHeroDataState } from '@/lib/types/actions/UpdateHeroDataState';
import { CreateHeroType } from '@/lib/types/dbServices';
import { createHeroVariantSchema } from '@/lib/validation/actionSchema/createHeroVariantSchema';
import { validateFormData } from '@/lib/validation/validationHandlers/validateFormData';

const createHeroVariantAction = async (
  state: Omit<UpdateHeroDataState, 'translationId'>,
  formData: FormData
) => {
  const t = await getTranslations();

  const { lang } = state;

  const validatedFormData = await validateFormData<CreateHeroType>({
    formData,
    schema: createHeroVariantSchema(t),
  });

  await createHeroVariant(validatedFormData);

  revalidateTag('all-heroes');

  return {
    status: 'success',
    successMessage: 'Name updated',
    lang,
  };
};

export default createHeroVariantAction;
