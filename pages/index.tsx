import { useEffect } from 'react';
import AOS from 'aos';
import Navbar from '../components/elements/Navbar';
import MainBanner from '../components/elements/MainBanner';
import TransactionStep from '../components/elements/TransactionStep';
import FeaturedGame from '../components/elements/FeaturedGame';
import Reached from '../components/elements/Reached';
import Story from '../components/elements/Story';
import Footer from '../components/elements/Footer';

export default function Home() {
  useEffect(() => {
    AOS.init();
  });
  return (
    <>
      <Navbar />
      <MainBanner />
      <TransactionStep />
      <FeaturedGame />
      <Reached />
      <Story />
      <Footer />
    </>
  );
}
