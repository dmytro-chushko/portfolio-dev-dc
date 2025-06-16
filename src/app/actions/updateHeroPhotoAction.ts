'use server';

import { revalidateTag } from 'next/cache';

import { uploadFile } from '@/lib/services/storageService';
import { UpdateHeroPhotoActionType } from '@/lib/types/actions/UpdateHeroPhotoActionType';
import { updateHeroPhotoSchema } from '@/lib/validation/actionSchema/updateHeroPhotoSchema';
import { validateReqBody } from '@/lib/validation/validationHandlers/validateReqBody';

const updateHeroPhotoAction = async ({
  // heroVersion,
  fileList,
  // lang,
}: UpdateHeroPhotoActionType) => {
  const validatedBodyForUploadImage = await validateReqBody<{
    image: File;
  }>({
    body: { image: fileList[0] },
    schema: updateHeroPhotoSchema,
  });

  await uploadFile({
    fileBody: validatedBodyForUploadImage.image,
  });

  revalidateTag('all-heroes');

  return fileList[0];
};

export default updateHeroPhotoAction;
