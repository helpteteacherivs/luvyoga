import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutSection() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about');

  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              A Journey of Sustainable Well-being
            </h2>
            <blockquote className="border-l-4 border-primary pl-6 text-xl italic text-foreground/80">
              “Yoga không là sự phô trương, mà là hành trình bền vững”
            </blockquote>
            <p className="text-lg text-muted-foreground">
              🪷🧱 Tập luyện mỗi ngày như cách ta thêm từng viên gạch nhỏ, dựng xây nền móng vững chắc cho cơ thể khỏe mạnh và tâm trí an yên 🙏🧡
            </p>
            <p className="text-muted-foreground">
              At Luv Yoga, we believe in building a strong foundation for a healthy body and a peaceful mind, one day at a time. Our practice focuses on alignment, therapeutic recovery, and above all, safety.
            </p>
          </div>
          <div className="flex justify-center">
            {aboutImage && (
              <Card className="overflow-hidden shadow-xl">
                <CardContent className="p-0">
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover"
                    data-ai-hint={aboutImage.imageHint}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
