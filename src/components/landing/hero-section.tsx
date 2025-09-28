import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <section className="relative h-[60dvh] w-full bg-background">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover object-center"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="relative z-10 flex h-full flex-col items-center justify-start pt-16 text-center">
        <div className="max-w-3xl p-8">
          <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground drop-shadow-lg md:text-7xl">
            LUV YOGA
          </h1>
          <p className="mt-4 text-lg text-muted-foreground drop-shadow-md md:text-xl">
            Yoga định tuyến và hỗ trợ trị liệu phục hồi, đề cao sức khoẻ và sự an toàn trong tập luyện.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="#classes">Xem Lịch Tập</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-foreground/20 bg-background/50 text-foreground hover:bg-accent hover:text-accent-foreground">
              <Link href="#contact">Liên Hệ</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
