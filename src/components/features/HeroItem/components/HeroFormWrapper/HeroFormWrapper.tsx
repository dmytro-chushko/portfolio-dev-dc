import { ReactNode, useRef } from 'react';

import { useClickOutside } from '@/lib/hooks/useClickOutside.';

type HeroFormWrapperProps = {
  formAction: () => void;
  onClose: () => void;
  children: ReactNode;
};

const HeroFormWrapper = ({
  formAction,
  onClose,
  children,
}: HeroFormWrapperProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  useClickOutside<HTMLFormElement>(formRef, () => onClose());

  return (
    <form action={formAction} ref={formRef}>
      {children}
    </form>
  );
};

export default HeroFormWrapper;
