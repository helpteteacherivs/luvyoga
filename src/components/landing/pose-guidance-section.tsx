import PoseFinder from './pose-finder';
import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function PoseGuidanceSection() {
  const poseImage = PlaceHolderImages.find((img) => img.id === 'pose-guidance');

  return (
    <section id="ai-guide" className="bg-secondary py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <CardHeader className="p-0">
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl flex items-center gap-3">
                  <Sparkles className="h-8 w-8 text-accent" />
                  Hướng Dẫn Tư Thế với AI
                </h2>
                <CardDescription className="mt-4 text-lg text-muted-foreground">
                  Bạn không chắc nên bắt đầu từ đâu? Hãy mô tả tư thế hiện tại hoặc cảm giác của bạn, và trợ lý AI của chúng tôi sẽ đề xuất các tư thế yoga có lợi dành riêng cho bạn.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 mt-8">
                <PoseFinder />
              </CardContent>
            </div>
            <div className="relative hidden min-h-[400px] md:block">
              {poseImage && (
                <Image
                  src={poseImage.imageUrl}
                  alt={poseImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={poseImage.imageHint}
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
