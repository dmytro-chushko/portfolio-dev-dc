import { ReactNode, RefObject } from 'react';

import { useClickOutside } from '@/lib/hooks/useClickOutside.';

type HeroFormWrapperProps = {
  formRef: RefObject<HTMLFormElement | null>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onClose: () => void;
  children: ReactNode;
};

const HeroFormWrapper = ({
  formRef,
  onSubmit,
  onClose,
  children,
}: HeroFormWrapperProps) => {
  useClickOutside<HTMLFormElement>(formRef, () => onClose());

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      {children}
    </form>
  );
};

export default HeroFormWrapper;
