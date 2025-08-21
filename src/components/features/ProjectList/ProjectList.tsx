type ProjectListProps = {
  projectList: {
    title: string;
    description: string;
    company: string;
    link: string;
    background: string;
    desktop: string;
    mobile: string;
    tech: string[];
  }[];
};

const ProjectList = ({ projectList }: ProjectListProps) => {
  return (
    <div>
      <ul className="w-11/12 mx-auto grid gap-4">
        {projectList.length > 0 &&
          projectList.map(({ title }) => (
            <li
              key={title}
              className="bg-foreground text-background sticky top-[104px]  border border-background border-solid transition-all h-[80vh]"
            ></li>
          ))}
      </ul>
    </div>
  );
};

export default ProjectList;
