'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Modal from '@/components/ui/Modal/Modal';

import Socials from '../Socials/Socials';

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);

    setTimeout(() => {
      router.back();
    }, 500);
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Socials size="xxl" mobileColumn />
    </Modal>
  );
}
