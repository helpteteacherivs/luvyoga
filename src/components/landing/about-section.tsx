import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutSection() {
  // Prefer the local uploaded about image (local2) but fall back to the remote/about placeholder
  const aboutImage =
    PlaceHolderImages.find((img) => img.id === 'local2') ||
    PlaceHolderImages.find((img) => img.id === 'about');

  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Hành Trình Sức Khỏe Bền Vững
            </h2>
            <blockquote className="border-l-4 border-primary pl-6 text-xl italic text-foreground/80 hover-lift transition-all duration-300">
              “Yoga không là sự phô trương, mà là hành trình bền vững”
            </blockquote>
            <p className="text-lg text-muted-foreground">
              🪷🧱 Tập luyện mỗi ngày như cách ta thêm từng viên gạch nhỏ, dựng xây nền móng vững chắc cho cơ thể khỏe mạnh và tâm trí an yên 🙏🧡
            </p>
            <p className="text-muted-foreground">
              Tại Luv Yoga, chúng tôi tin vào việc xây dựng nền tảng vững chắc cho một cơ thể khỏe mạnh và tâm trí an yên, mỗi ngày một chút. Phương pháp của chúng tôi tập trung vào định tuyến, phục hồi trị liệu, và trên hết là sự an toàn.
            </p>
          </div>
          <div className="flex justify-center animate-slide-up">
            {aboutImage && (
              <Card className="overflow-hidden shadow-xl hover-lift transition-all duration-300">
                <CardContent className="p-0">
                  <Image
                    src={aboutImage.imageUrl}
                    alt="Yoga instructor demonstrating therapeutic yoga poses in a serene studio environment"
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                    data-ai-hint={aboutImage.imageHint}
                    loading="lazy"
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
