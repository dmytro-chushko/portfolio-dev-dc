import { HeroTranslationType } from './HeroTranslationType';

export type CreateHeroType = {
  heroPhoto: string;
  heroVersion: string;
  translations: HeroTranslationType[];
};
