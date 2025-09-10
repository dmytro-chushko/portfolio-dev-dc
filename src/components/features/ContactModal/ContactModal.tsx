'use client';

import { Button } from '@headlessui/react';
import { useState } from 'react';

import Modal from '@/components/ui/Modal/Modal';

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Modal</Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        ContactModal
      </Modal>
    </>
  );
}
