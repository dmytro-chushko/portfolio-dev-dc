import clsx from 'clsx';

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

const setTopPosition = [
  'top-[104px]',
  'top-[114px]',
  'top-[124px]',
  'top-[134px]',
  'top-[144px]',
];

const ProjectList = ({ projectList }: ProjectListProps) => {
  return (
    <div>
      <ul className="w-11/12 mx-auto grid gap-4">
        {projectList.length > 0 &&
          projectList.map(({ title }, i) => (
            <li
              key={title}
              className={clsx(
                'bg-foreground text-background sticky  border border-background border-solid transition-all h-[80vh]',
                setTopPosition[i]
              )}
            ></li>
          ))}
      </ul>
    </div>
  );
};

export default ProjectList;
