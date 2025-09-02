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
        <div className="h-screen w-[250vmax] hobbies-content flex justify-start items-center py-[50px] px-[10vw]">
          <Title header="h3" copy={hobbies} />
          {hobbiesImgs.map((item) => (
            <div key={item} className="min-w-[60vmax]">
              <StyledImage
                imgSrc={item}
                altText="title Dmytro Chushko"
                width={3968}
                height={2976}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
