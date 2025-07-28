import isTechIconKey from '@/lib/typeGuards/isTechIconKey';

import techIconMap from './techIconMap';

type TechIconFactoryProps = {
  techName: string;
  size?: number;
};

const TechIconFactory = ({ techName, size = 48 }: TechIconFactoryProps) => {
  if (isTechIconKey(techName)) {
    const TechIconComponent = techIconMap[techName];

    return (
      <div className="bg-white p-1 rounded">
        <TechIconComponent width={size} height={size} />
      </div>
    );
  }

  return null;
};

export default TechIconFactory;
