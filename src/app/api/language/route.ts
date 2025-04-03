import { NextResponse } from 'next/server';

import {
  createLanguage,
  getAllLanguages,
} from '@/lib/services/dbServices/languageService';

export const GET = async () => {
  const langs = await getAllLanguages();

  return Response.json({ langs });
};

export const POST = async (req: Request) => {
  const body = await req.json();

  if (
    body &&
    'langCode' in body &&
    'langName' in body &&
    typeof body.langCode === 'string' &&
    typeof body.langName === 'string'
  ) {
    const { langCode, langName } = body;

    const createdLang = await createLanguage({
      code: langCode,
      name: langName,
    });

    return NextResponse.json({ createdLang });
  }

  return NextResponse.json({ body });
};
