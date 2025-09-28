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
                  AI-Powered Pose Guidance
                </h2>
                <CardDescription className="mt-4 text-lg text-muted-foreground">
                  Not sure where to start? Describe your current posture or how you're feeling, and our AI assistant will suggest beneficial yoga poses just for you.
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
