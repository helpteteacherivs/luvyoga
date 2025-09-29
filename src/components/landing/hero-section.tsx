
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
              alt={galleryImage.description}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="hidden md:block w-full h-full">
            <Image
              src={bannerDesktop.imageUrl}
              alt={bannerDesktop.description}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>
      </div>
      {/* Hero text below image */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8 pb-12 text-center">
        <Logo className="mb-4 h-20 w-20 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] md:h-24 md:w-24" />
        <h1 className="font-headline text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)] md:text-8xl md:mb-2">
          LUV YOGA
        </h1>
        <p className="mt-4 text-2xl font-bold text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] md:text-3xl md:mt-6" style={{textShadow: '0 6px 24px rgba(0,0,0,0.85), 0 2px 0 #fff'}}>
          Yoga định tuyến và hỗ trợ trị liệu phục hồi, đề cao sức khoẻ và sự an toàn trong tập luyện.
        </p>
        <div className="mt-10 flex justify-center gap-6">
          <Button asChild size="lg" className="bg-primary text-white text-xl font-bold px-8 py-4 shadow-lg hover:bg-primary/90">
            <Link href="#classes">Xem Lịch Tập</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/50 bg-background/40 text-white text-xl font-bold px-8 py-4 backdrop-blur-lg shadow-lg hover:bg-white/40 hover:border-white/70">
            <Link href="#contact">Liên Hệ</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
