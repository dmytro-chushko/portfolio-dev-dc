import clsx from 'clsx';

import { LangType } from '@/lib/types/LangType';

type LangSwitchItemProps = {
  lang: LangType;
  isCurrent: boolean;
  onSelect: (lang: LangType) => void;
};

const LangSwitchItem = ({ lang, isCurrent, onSelect }: LangSwitchItemProps) => {
  return (
    <button
      className={clsx(
        'uppercase rounded-full p-2 leading-tight disabled:bg-active',
        !isCurrent && 'md:hover:text-hovered'
      )}
      onClick={() => onSelect(lang)}
      aria-label={lang}
      disabled={isCurrent}
    >
      {lang}
    </button>
  );
};

export default LangSwitchItem;
