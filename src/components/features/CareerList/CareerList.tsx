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
                'md:flex md:justify-center',
                i % 2 !== 0 && 'md:flex-row-reverse'
              )}
            >
              <div
                className={clsx(
                  'flex flex-col md:w-1/2 border-solid border-foreground py-4',
                  i % 2 !== 0
                    ? 'md:items-start md:pl-4 md:border-l-2'
                    : 'md:items-end md:pr-4 md:border-r-2'
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
                  'flex flex-col md:w-1/2 border-solid border-foreground py-4',
                  i % 2 !== 0
                    ? 'md:items-end md:pr-4 md:border-r-2'
                    : 'md:items-start md:pl-4 md:border-l-2'
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
