'use server';

import { revalidateTag } from 'next/cache';

import { uploadFile } from '@/lib/services/storageService';
import { UpdateHeroPhotoActionType } from '@/lib/types/actions/UpdateHeroPhotoActionType';
// import { imageUploadForm } from '@/lib/validation/formSchema/imageUploadForm';
// import { validateReqBody } from '@/lib/validation/validationHandlers/validateReqBody';

const updateHeroPhotoAction = async ({
  // heroVersion,
  fileList,
  // lang,
}: UpdateHeroPhotoActionType) => {
  // const validatedBodyForUploadImage = await validateReqBody<{
  //   image: FileList;
  // }>({
  //   body: { image: fileList },
  //   schema: imageUploadForm,
  // });

  await uploadFile({
    fileBody: fileList[0],
  });

  revalidateTag('all-heroes');
};

export default updateHeroPhotoAction;
