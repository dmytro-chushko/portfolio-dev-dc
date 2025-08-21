'server-only';

import { LangType } from '@prisma/client';

import projectList from '@/mocks/projectList.json';

export const getProjectList = (lang: LangType) =>
  projectList.map((project) => ({
    ...project,
    description: project.description[lang],
  }));
