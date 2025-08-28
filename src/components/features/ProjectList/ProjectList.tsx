import clsx from 'clsx';

import './projectList.css';
import Paragraph from '@/components/typography/Paragraph/Paragraph';
import Title from '@/components/typography/Title/Title';
import StyledImage from '@/components/ui/StyledImage/StyledImage';
import TechIconFactory from '@/components/ui/TechIconFactory/TechIconFactory';

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
      <ul className="w-11/12 mx-auto grid gap-4 cards">
        {projectList.length > 0 &&
          projectList.map(
            (
              {
                title,
                background,
                desktop,
                mobile,
                company,
                description,
                tech,
              },
              i
            ) => (
              <li
                key={title}
                id={`card_${i + 1}`}
                className={clsx(
                  'sticky transition-all h-[90vh] top-[90px]',
                  'card'
                )}
              >
                <div className="rounded-2xl h-full card_content overflow-hidden">
                  <div
                    style={
                      {
                        '--bg-cover': `url(${background})`,
                      } as React.CSSProperties
                    }
                    className="h-full bg-[image:var(--bg-cover)] bg-center blur bg-no-repeat bg-cover"
                  >
                    <div className="h-full w-full bg-gradient-to-r from-foreground/25 to-foreground/25" />
                  </div>
                  <div className="absolute card_content_inner md:p-0 md:flex md:justify-around md:items-center">
                    <div className="p-4 mb-8 md:mb-0 md:w-1/3 bg-background/70 text-foreground">
                      <Title header="h4" copy={title} />
                      <Paragraph accent>{company}</Paragraph>
                      <Paragraph>{description}</Paragraph>
                      <ul
                        className={clsx(
                          'flex items-center gap-1 flex-wrap',
                          'justify-start'
                        )}
                      >
                        {tech.length > 0 &&
                          tech.map((techName) => (
                            <li key={techName}>
                              <TechIconFactory techName={techName} size={24} />
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="relative md:w-2/4">
                      <StyledImage
                        imgSrc={desktop}
                        altText={title}
                        width={1088}
                        height={680}
                      />
                      <StyledImage
                        className="absolute top-1/4 w-1/4 right-0"
                        imgSrc={mobile}
                        altText={title}
                        width={404}
                        height={823}
                      />
                    </div>
                  </div>
                </div>
              </li>
            )
          )}
      </ul>
    </div>
  );
};

export default ProjectList;
