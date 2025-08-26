import clsx from 'clsx';
import './projectList.css';

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
      <ul className="w-4/5 mx-auto grid gap-4 cards">
        {projectList.length > 0 &&
          projectList.map(({ title }, i) => (
            <li
              key={title}
              id={`card_${i + 1}`}
              className={clsx(
                'sticky transition-all h-[90vh] top-[90px]',
                'card'
              )}
            >
              <div className="h-full text-background bg-foreground border border-background border-solid card_content"></div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProjectList;
