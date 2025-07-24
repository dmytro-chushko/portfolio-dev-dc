'use client';

import clsx from 'clsx';

import DutyItemIcon from '@/components/icons/clipboard.svg';
import Paragraph from '@/components/typography/Paragraph/Paragraph';
import Title from '@/components/typography/Title/Title';

import careerMock from './careerList.json';

type CareerSliderProps = {
  careers: [];
};

const CareerList = ({ careers }: CareerSliderProps) => {
  return (
    <section
      id="career"
      className="min-h-screen pt-[104px] lg:min-h-[calc(100vh-104px)]"
    >
      <ul>
        {careers.length === 0 &&
          careerMock.map(
            ({ id, title, position, format, start, finish, duties }, i) => (
              <li
                key={id}
                className={clsx(
                  'flex justify-center',
                  i % 2 !== 0 && 'flex-row-reverse'
                )}
              >
                <div
                  className={clsx(
                    'flex flex-col w-1/2 border-solid border-foreground py-4',
                    i % 2 !== 0
                      ? 'items-start pl-4 border-l-2'
                      : 'items-end pr-4 border-r-2'
                  )}
                >
                  <Paragraph
                    accent
                  >{`${start}${finish ? ` - ${finish}` : ''}`}</Paragraph>
                  <Title header="h2" copy={title} />
                  <Paragraph accent>{position}</Paragraph>
                  <Paragraph accent>{format}</Paragraph>
                </div>
                <div
                  className={clsx(
                    'flex flex-col w-1/2 border-solid border-foreground py-4',
                    i % 2 !== 0
                      ? 'items-end pr-4 border-r-2'
                      : 'items-start pl-4 border-l-2'
                  )}
                >
                  {duties.length > 0 && (
                    <ul className="flex flex-col gap-1">
                      {duties.map(({ id, description }) => (
                        <li
                          key={id}
                          className={clsx(
                            'flex items-start gap-1',
                            i % 2 !== 0 && 'flex-row-reverse'
                          )}
                        >
                          <DutyItemIcon className="fill-current w-6 h-6 shrink-0" />
                          <Paragraph
                            className={clsx(
                              i % 2 !== 0 ? 'text-right' : 'text-left'
                            )}
                          >
                            {description}
                          </Paragraph>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            )
          )}
      </ul>
    </section>
  );
};

export default CareerList;
