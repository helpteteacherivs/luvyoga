
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/icons';


export default function HeroSection() {
  // Use gallery-1.png for both desktop and mobile banner
  const galleryImage = {
    imageUrl: '/images/gallery-1.png',
    description: 'Yoga studio gallery',
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
              src={galleryImage.imageUrl}
              alt={galleryImage.description}
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
        <Logo className="mb-4 h-16 w-16 text-white drop-shadow-lg" />
        <h1 className="font-headline text-5xl font-bold tracking-tight text-white drop-shadow-lg md:text-7xl">
          LUV YOGA
        </h1>
        <p className="mt-4 text-lg font-semibold text-white drop-shadow-xl md:text-xl" style={{textShadow: '0 2px 8px rgba(0,0,0,0.35), 0 1px 0 #fff'}}>
          Yoga định tuyến và hỗ trợ trị liệu phục hồi, đề cao sức khoẻ và sự an toàn trong tập luyện.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#classes">Xem Lịch Tập</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/20 bg-background/20 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/40">
            <Link href="#contact">Liên Hệ</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
