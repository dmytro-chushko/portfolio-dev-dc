import { NextRequest, NextResponse } from 'next/server';

import { apiErrorHandler } from '@/lib/errors/errorHandlers/apiErrorHandler';
import { getPublicFileUrl, uploadFile } from '@/lib/services/storageService';
import {
  FileResponseType,
  UploadFileType,
  GetFileUrlType,
} from '@/lib/types/storage';
import {
  uploadFileSchema,
  getFileUrlSchema,
} from '@/lib/validation/storageSchema';
import { validateFormData } from '@/lib/validation/validationHandlers/validateFormData';
import { validateSearchParams } from '@/lib/validation/validationHandlers/validateSearchParams';

export const POST = apiErrorHandler<FileResponseType>(
  async (req: NextRequest) => {
    const formData = await req.formData();

    const validatedFormData = await validateFormData<UploadFileType>({
      formData,
      schema: uploadFileSchema,
    });

    const heroPhotoObject = await uploadFile(validatedFormData);

    return NextResponse.json(heroPhotoObject, { status: 200 });
  }
);

export const GET = apiErrorHandler<{ publicUrl: string }>(
  async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams;

    const validatedParams = await validateSearchParams<GetFileUrlType>({
      searchParams,
      schema: getFileUrlSchema,
    });

    const publicUrl = await getPublicFileUrl(validatedParams);

    return NextResponse.json(publicUrl, { status: 200 });
  }
);
