'server-only';

import { LangType } from '@prisma/client';

import aboutMeContent from '@/mocks/aboutMe.json';

export const getAboutMe = (lang: LangType) => ({
  ...aboutMeContent,
  header: aboutMeContent.header[lang],
  subHeader: aboutMeContent.subHeader[lang],
  footer: aboutMeContent.footer[lang],
  hobbies: aboutMeContent.hobbies[lang],
});
