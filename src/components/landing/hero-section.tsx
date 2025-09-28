import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <section className="relative h-[80dvh] w-full">
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
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <div className="max-w-3xl rounded-lg bg-black/30 p-8 backdrop-blur-sm">
          <h1 className="font-headline text-5xl font-bold tracking-tight text-primary-foreground drop-shadow-lg md:text-7xl">
            LUV YOGA SANCTUARY
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/90 drop-shadow-md md:text-xl">
            Yoga định tuyến và hỗ trợ trị liệu phục hồi, đề cao sức khoẻ và sự an toàn trong tập luyện.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="#classes">View Classes</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
