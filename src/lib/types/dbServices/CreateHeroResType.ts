import { HeroTranslationResType } from './HeroTranslationResType';

export type CreateHeroResType = {
  id: string;
  heroVersion: string;
  heroPhoto: string;
  translations: HeroTranslationResType[];
};
