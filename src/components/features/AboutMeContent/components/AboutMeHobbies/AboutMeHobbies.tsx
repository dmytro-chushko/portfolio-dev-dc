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
    <div className="h-[500vh] overflow-visible hobbies-wrapper">
      <div className="h-screen w-screen sticky top-0 overflow-x-hidden">
        <div className="h-screen w-[220vmax] hobbies-content flex justify-start items-center py-[50px] px-[10vw]">
          <div className="w-[40vmax] flex-shrink-0 pr-[5vw] title-container">
            <Title header="h3" copy={hobbies} />
          </div>
          <ul className="flex items-center justify-between">
            {hobbiesImgs.map((item, index) => (
              <div key={item} className="w-[30%] flex-shrink-0">
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
