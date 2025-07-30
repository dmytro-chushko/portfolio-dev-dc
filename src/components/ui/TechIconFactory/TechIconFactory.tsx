'use client';

import HoverToolTip from '@/components/features/HoverToolTip/HoverToolTip';
import isTechIconKey from '@/lib/typeGuards/isTechIconKey';

import techIconMap from './techIconMap';

type TechIconFactoryProps = {
  techName: string;
  size?: number;
};

const TechIconFactory = ({ techName, size = 48 }: TechIconFactoryProps) => {
  if (isTechIconKey(techName)) {
    const TechIconComponent = techIconMap[techName].icon;
    const techTitle = techIconMap[techName].title;

    return (
      <HoverToolTip tooltipValue={techTitle}>
        <div className="bg-white p-1 rounded">
          <TechIconComponent width={size} height={size} />
        </div>
      </HoverToolTip>
    );
  }

  return null;
};

export default TechIconFactory;
