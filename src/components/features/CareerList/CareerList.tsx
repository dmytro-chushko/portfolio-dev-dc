'use client';

import Paragraph from '@/components/typography/Paragraph/Paragraph';
import Title from '@/components/typography/Title/Title';

import careerMock from './careerList.json';

type CareerSliderProps = {
  careers: [];
};

const CareerList = ({ careers }: CareerSliderProps) => {
  return (
    <section id="career" className="min-h-screen lg:min-h-[calc(100vh-104px)]">
      <ul>
        {careers.length === 0 &&
          careerMock.map(({ id, title, position, duties }) => (
            <li key={id}>
              <Title header="h2" copy={title} />
              <Paragraph accent>{position}</Paragraph>
              {duties.length > 0 && (
                <ul>
                  {duties.map(({ id, description }) => (
                    <li key={id}>
                      <Paragraph>{description}</Paragraph>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </section>
  );
};

export default CareerList;
