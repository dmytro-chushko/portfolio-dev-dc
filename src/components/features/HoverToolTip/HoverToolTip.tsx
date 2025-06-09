import { ReactNode, useState } from 'react';

type HoverToltipProps = {
  children: ReactNode;
  toltipValue: string;
};

const HoverToolTip = ({ children, toltipValue }: HoverToltipProps) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCoords({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onMouseMove={handleMouseMove}
        className="cursor-pointer"
      >
        {children}
      </div>

      {visible && (
        <div
          className={`fixed z-50 px-2 py-1 text-foreground bg-bgInput rounded pointer-events-none`}
          style={{
            left: coords.x + 15,
            top: coords.y + 15,
          }}
        >
          {toltipValue}
        </div>
      )}
    </div>
  );
};

export default HoverToolTip;
