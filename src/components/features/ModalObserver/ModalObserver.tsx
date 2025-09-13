'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function ModalObserver() {
  const router = useRouter();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsIntersecting(true);
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
  }, [router]);

  return isIntersecting ? null : (
    <div
      ref={sentinelRef}
      className="h-1 w-full invisible"
      aria-hidden="true"
    />
  );
}
