import { Metadata } from 'next';

import ContactModal from '@/components/features/ContactModal/ContactModal';

export const metadata: Metadata = {
  title: 'Contact Me',
  description: 'Get in touch with me',
};

export default async function ContactPage() {
  return <ContactModal />;
}
