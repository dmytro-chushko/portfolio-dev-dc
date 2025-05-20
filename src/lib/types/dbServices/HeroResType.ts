import { HeroTranslationResType } from './HeroTranslationResType';

export type HeroResType = {
  id: string;
  heroVersion: string;
  heroPhoto: string;
  translations: HeroTranslationResType[];
};
