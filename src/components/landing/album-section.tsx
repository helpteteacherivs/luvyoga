import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AlbumSection() {
  return (
    <section id="album" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-primary">Album Ảnh</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Tất cả hình ảnh của Luv Yoga.
          </p>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {PlaceHolderImages.filter(img => img.imageUrl.startsWith('/images/')).map(img => (
            <div key={img.imageUrl} className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src={img.imageUrl}
                alt={img.description || 'Yoga image'}
                width={400}
                height={300}
                className="object-cover w-full h-64"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
