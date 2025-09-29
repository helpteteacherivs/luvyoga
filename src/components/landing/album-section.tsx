import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

export default function AlbumSection() {
  const images = PlaceHolderImages.filter(img => img.imageUrl.startsWith('/images/'));
  
  return (
    <section id="album" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-primary">Album Ảnh</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Đồng hành cùng Luv Yoga.
          </p>
        </div>
        
        {/* Large Display Gallery (desktop) */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-6 mb-6">
            {images.slice(0, 4).map((img) => (
              <div 
                key={img.imageUrl} 
                className="rounded-lg overflow-hidden shadow-lg border-2 border-primary/20 transition-transform hover:scale-105 duration-300 group"
              >
                <div className="relative">
                  <Image
                    src={img.imageUrl}
                    alt={img.description || 'Yoga image'}
                    width={400}
                    height={300}
                    className="object-cover w-full h-64"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <p className="text-white text-sm font-medium">{img.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-6">
            {images.slice(4, 8).map((img) => (
              <div 
                key={img.imageUrl} 
                className="rounded-lg overflow-hidden shadow-lg border-2 border-primary/20 transition-transform hover:scale-105 duration-300 group"
              >
                <div className="relative">
                  <Image
                    src={img.imageUrl}
                    alt={img.description || 'Yoga image'}
                    width={400}
                    height={300}
                    className="object-cover w-full h-64"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <p className="text-white text-sm font-medium">{img.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel for mobile and tablet */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((img) => (
                <CarouselItem key={img.imageUrl} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className="rounded-lg overflow-hidden shadow-lg border-2 border-primary/20 transition-transform hover:scale-105 duration-300 group">
                      <div className="relative">
                        <Image
                          src={img.imageUrl}
                          alt={img.description || 'Yoga image'}
                          width={400}
                          height={300}
                          className="object-cover w-full h-64"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-100 flex items-end p-3">
                          <p className="text-white text-sm font-medium">{img.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-white/80" />
            <CarouselNext className="right-2 bg-white/80" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
