import Title from '@/components/typography/Title/Title';
import StyledImage from '@/components/ui/StyledImage/StyledImage';
import './aboutMeHobbies.css';

type AboutMeHobbiesProps = {
  hobbies: string;
  hobbiesImgs: string[];
};

export default function AboutMeHobbies({
  hobbies,
  hobbiesImgs,
}: AboutMeHobbiesProps) {
  return (
    <div className="md:h-[500vh] overflow-visible hobbies-wrapper">
      <div className="md:h-screen md:w-screen md:sticky md:top-0 overflow-x-hidden ">
        <div className="md:h-screen md:w-[220vmax] hobbies-content flex max-md:flex-col justify-start items-center max-md:gap-6 py-[50px] px-4 md:px-[10vw]">
          <div className="max-md:container md:w-[40vmax] flex-shrink-0 pr-[5vw] title-container">
            <Title header="h3" copy={hobbies} />
          </div>
          <ul className="flex max-md:flex-col max-md:gap-6 items-center justify-between">
            {hobbiesImgs.map((item, index) => (
              <div key={item} className="md:w-[30%] flex-shrink-0">
                <StyledImage
                  imgSrc={item}
                  altText="title Dmytro Chushko"
                  aboutMeType="HOBBIES"
                  hobbyIndex={index}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
