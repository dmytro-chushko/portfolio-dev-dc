import { LangType } from '@prisma/client';

import ProjectList from '@/components/features/ProjectList/ProjectList';
import SectionLayout from '@/components/layout/SectionLayout/SectionLayout';
import { getDictionary } from '@/lib/utils/getDictionary';
import { getProjectList } from '@/lib/utils/getProjects';

type ProjectsSlotProps = {
  params: Promise<{ lang: LangType }>;
};

export default async function ProjectsSlot({ params }: ProjectsSlotProps) {
  const lang = (await params).lang;
  const dictionary = await getDictionary(lang);
  const projectList = getProjectList(lang);

  return (
    <SectionLayout id="projects" title={dictionary.nav.links.projects}>
      <ProjectList projectList={projectList} />
    </SectionLayout>
  );
}
