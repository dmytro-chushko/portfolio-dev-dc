'server-only';

import careerList from '@/components/features/CareerList/careerList.json';

import { LangType } from '../types/LangType';

export const getCareerList = (lang: LangType) =>
  careerList.map((career) => ({ ...career, duties: career.duties[lang] }));
