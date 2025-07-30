'server-only';

import skillList from '@/mocks/skillLIst.json';

import { LangType } from '../types/LangType';

export const getSkillList = (lang: LangType) =>
  skillList.map((skill) => ({
    ...skill,
    description: skill.description[lang],
  }));
