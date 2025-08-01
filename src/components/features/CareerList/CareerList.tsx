'use client';

import clsx from 'clsx';

import CareerDuties from './components/CareerDuties/CareerDuties';
import CareerItem from './components/CareerItem/CareerItem';

type CareerSliderProps = {
  careers: {
    duties: {
      id: number;
      description: string;
    }[];
    id: number;
    title: string;
    position: string;
    format: string;
    start: string;
    finish: string;
    logo: string;
    tech: string[];
  }[];
};

const CareerList = ({ careers }: CareerSliderProps) => {
  return (
    <ul>
      {careers.length > 0 &&
        careers.map(
          (
            { id, title, position, format, start, finish, duties, logo, tech },
            i
          ) => (
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
                <CareerItem
                  order={i}
                  title={title}
                  position={position}
                  format={format}
                  start={start}
                  finish={finish}
                  logo={logo}
                  tech={tech}
                />
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
                  <CareerDuties duties={duties} order={i} />
                )}
              </div>
            </li>
          )
        )}
    </ul>
  );
};

export default CareerList;
