import { NextRequest, NextResponse } from 'next/server';

import { uploadFile } from '@/lib/services/storageService';
import { uploadFileSchema } from '@/lib/validation/storageSchema';

export const POST = async (req: NextRequest) => {
  const formDataObj: Record<string, FormDataEntryValue> = {};
  try {
    const formData = await req.formData();

    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    const validatedPayload = await uploadFileSchema.validate(formDataObj);
    const heroPhotoObject = await uploadFile(validatedPayload);

    if ('statusCode' in heroPhotoObject) throw heroPhotoObject;

    return NextResponse.json({ heroPhotoObject }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err });
  }
};
