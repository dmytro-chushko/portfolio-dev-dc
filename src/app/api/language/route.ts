import { NextRequest, NextResponse } from 'next/server';

import { apiErrorHandler } from '@/lib/errors/errorHandlers/apiErrorHandler';
import {
  createLanguage,
  getAllLanguages,
} from '@/lib/services/dbServices/languageService';
import { CreateLangType, ResLangType } from '@/lib/types/dbServices';
import { createLangSchema } from '@/lib/validation/apiSchema/langApiSchema';
import { validateReqBody } from '@/lib/validation/validationHandlers/validateReqBody';

export const GET = apiErrorHandler<ResLangType[]>(async () => {
  const langs = await getAllLanguages();

  return NextResponse.json(langs);
});

export const POST = apiErrorHandler<ResLangType>(async (req: NextRequest) => {
  const body = await req.json();

  const validatedBody = await validateReqBody<CreateLangType>({
    body,
    schema: createLangSchema,
  });

  const createdLang = await createLanguage(validatedBody);

  return NextResponse.json(createdLang);
});
