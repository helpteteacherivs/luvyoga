
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/icons';


export default function HeroSection() {
  // Use gallery-1.png for mobile, banner-luvyoga.jpg for desktop
  const galleryImage = {
    imageUrl: '/images/gallery-1.png',
    description: 'Yoga studio gallery',
    imageHint: '',
  };
  const bannerDesktop = {
    imageUrl: '/images/banner-luvyoga.jpg',
    description: 'Yoga studio banner',
    imageHint: '',
  };

  return (
    <section className="w-full bg-background">
      {/* Banner image: desktop and mobile responsive */}
      <div className="relative w-full h-[60vh] md:h-[60dvh]">
        <div className="absolute inset-0">
          <div className="block md:hidden w-full h-full">
            <Image
              src={galleryImage.imageUrl}
              alt="Yoga studio interior with peaceful atmosphere and natural lighting"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="hidden md:block w-full h-full">
            <Image
              src={bannerDesktop.imageUrl}
              alt="Luv Yoga studio exterior with welcoming entrance and garden setting"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>
      </div>
      {/* Hero text below image */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8 pb-12 text-center animate-fade-in">
        <Logo className="mb-4 h-20 w-20 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] md:h-24 md:w-24 animate-scale-in" />
        <h1 className="font-headline text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)] md:text-8xl md:mb-2 gradient-text">
          LUV YOGA
        </h1>
        <p className="mt-4 text-2xl font-bold text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] md:text-3xl md:mt-6 hidden md:block" style={{textShadow: '0 6px 24px rgba(0,0,0,0.85), 0 2px 0 #fff'}}>
          Yoga định tuyến và hỗ trợ trị liệu phục hồi, đề cao sức khoẻ và sự an toàn trong tập luyện.
        </p>

        {/* Shorter hero lead on mobile for clearer, faster scanning */}
        <p className="mt-4 text-lg font-semibold text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)] md:hidden" style={{textShadow: '0 4px 12px rgba(0,0,0,0.6)'}}>
          Yoga định tuyến & trị liệu phục hồi — an toàn, chậm rãi và hiệu quả.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 animate-slide-up px-4 w-full max-w-4xl">
          <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-white text-lg sm:text-xl font-bold px-6 sm:px-8 py-4 sm:py-4 shadow-lg hover:bg-primary/90 hover-lift transition-all duration-300 min-h-[48px] touch-manipulation" aria-label="View class schedule and book yoga sessions">
            <Link href="#classes">Xem Lịch Tập</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-white/50 bg-background/40 text-white text-lg sm:text-xl font-bold px-6 sm:px-8 py-4 sm:py-4 backdrop-blur-lg shadow-lg hover:bg-white/40 hover:border-white/70 hover-lift transition-all duration-300 min-h-[48px] touch-manipulation" aria-label="Contact Luv Yoga studio">
            <Link href="#contact">Liên Hệ</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
