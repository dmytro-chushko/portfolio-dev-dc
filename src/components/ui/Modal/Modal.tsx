import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-background/90 transition duration-500 ease-out data-[closed]:opacity-0"
      />
      <div className="fixed top-0 left-0 right-0 bottom-0 inset-0 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="transition duration-500 ease-out  data-[closed]:opacity-0"
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
