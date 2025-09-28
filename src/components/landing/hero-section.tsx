import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/icons';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <section className="relative h-[60dvh] w-full bg-background">
      {heroImage && (
        <>
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-center"
            priority
            data-ai-hint={heroImage.imageHint}
          />
          <div className="absolute inset-0 bg-black/30" />
        </>
      )}
      <div className="relative z-10 flex h-full flex-col items-center justify-start pt-16 text-center">
        <div className="flex max-w-3xl flex-col items-center p-8">
          <Logo className="mb-4 h-16 w-16 text-white drop-shadow-lg" />
          <h1 className="font-headline text-5xl font-bold tracking-tight text-white drop-shadow-lg md:text-7xl">
            LUV YOGA
          </h1>
          <p className="mt-4 text-lg text-gray-200 drop-shadow-md md:text-xl">
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
      </div>
    </section>
  );
}
