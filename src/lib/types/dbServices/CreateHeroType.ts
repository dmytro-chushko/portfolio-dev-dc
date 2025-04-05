import { LangType } from '../LangType';

type HeroTranslations = {
  lang: LangType;
  heroName: string;
  heroDescription: string;
};

export type CreateHeroType = {
  heroPhoto: File;
  translations: HeroTranslations[];
};
