import { useEffect, useCallback } from 'react';

export const useBodyScrollLock = (elementId: string) => {
  const toggleBodyScroll = useCallback((disable: boolean) => {
    if (disable) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, []);

  useEffect(() => {
    const checkbox = document.getElementById(elementId) as HTMLInputElement;

    if (!checkbox) return;

    const handleMenuToggle = () => {
      toggleBodyScroll(checkbox.checked);
    };

    handleMenuToggle();
    checkbox.addEventListener('change', handleMenuToggle);

    return () => {
      checkbox.removeEventListener('change', handleMenuToggle);
      toggleBodyScroll(false);
    };
  }, [elementId, toggleBodyScroll]);

  return { toggleBodyScroll };
};
