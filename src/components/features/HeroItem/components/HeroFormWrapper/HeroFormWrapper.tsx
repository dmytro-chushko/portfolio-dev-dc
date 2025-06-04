import { ReactNode, RefObject } from 'react';

import { useClickOutside } from '@/lib/hooks/useClickOutside.';

type HeroFormWrapperProps = {
  formRef: RefObject<HTMLFormElement | null>;
  formAction: () => void;
  onClose: () => void;
  children: ReactNode;
};

const HeroFormWrapper = ({
  formRef,
  formAction,
  onClose,
  children,
}: HeroFormWrapperProps) => {
  useClickOutside<HTMLFormElement>(formRef, () => onClose());

  return (
    <form action={formAction} ref={formRef}>
      {children}
    </form>
  );
};

export default HeroFormWrapper;
