'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ExtLink from '@/components/ui/ExtLink/ExtLink';
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
      <div className="grid gap-8">
        <Socials size="xxl" mobileColumn />
        <ExtLink
          className="text-xl md:text-3xl"
          href="https://drive.google.com/file/d/10HkALLTwXnQTgKiKkFOZmiabBsx3-_NY/view?usp=sharing"
          alignLink="center"
        >
          Download CV
        </ExtLink>
      </div>
    </Modal>
  );
}
