import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import NavMobile from '@/Components/NavMobile';
import { ReactNode } from 'react';

interface CustomGuestPropType {
  children: ReactNode;
}

export default function CustomGuestLayout({ children }: CustomGuestPropType) {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <NavMobile />
        {children}
      </div>
      <Footer />
    </>
  );
}
