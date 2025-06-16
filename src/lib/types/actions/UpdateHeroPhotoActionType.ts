import { LangType } from '@prisma/client';

export type UpdateHeroPhotoActionType = {
  heroVarsion: string;
  fileList: FileList;
  lang: LangType;
};
