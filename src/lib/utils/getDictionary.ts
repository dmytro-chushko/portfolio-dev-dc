import 'server-only';
import { LangType } from '../types/LangType';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  ua: () => import('@/dictionaries/ua.json').then((module) => module.default),
};

export const langs = Object.keys(dictionaries) as (keyof typeof dictionaries)[];

export const getDictionary = async (locale: LangType) => dictionaries[locale]();

export type GetDictionaryType = typeof getDictionary;

export type Dictionary = Awaited<ReturnType<GetDictionaryType>>;
