import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/landing/hero-section';
import AboutSection from '@/components/landing/about-section';
import ScheduleSection from '@/components/landing/schedule-section';
import TherapySection from '@/components/landing/therapy-section';
import AlbumSection from '@/components/landing/album-section';
import ContactForm from '@/components/contact/contact-form';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <AboutSection />
        <ScheduleSection />
        <TherapySection />
        <AlbumSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
