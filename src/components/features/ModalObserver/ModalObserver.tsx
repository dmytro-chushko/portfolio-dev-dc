'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function ModalObserver() {
  const router = useRouter();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(true);

  useEffect(() => {
    const modalShown = sessionStorage.getItem('contact-modal-triggered');

    if (!modalShown) {
      setHasTriggered(false);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          setTimeout(() => {
            sessionStorage.setItem('contact-modal-triggered', 'true');
            router.push('/contact-me', { scroll: false });
          }, 2000);
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [router, hasTriggered]);

  return hasTriggered ? null : (
    <div
      ref={sentinelRef}
      className="h-1 w-full invisible"
      aria-hidden="true"
    />
  );
}
