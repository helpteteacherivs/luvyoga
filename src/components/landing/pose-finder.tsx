'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { generatePoseRecommendations } from '@/app/actions';
import type { PersonalizedPoseRecommendationsOutput } from '@/ai/flows/personalized-pose-recommendations';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PoseFinder() {
  const [posture, setPosture] = useState('');
  const [recommendations, setRecommendations] = useState<PersonalizedPoseRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!posture.trim()) {
      toast({
        title: 'Yêu cầu nhập thông tin',
        description: 'Vui lòng mô tả tư thế của bạn trước khi tạo đề xuất.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    const result = await generatePoseRecommendations({ currentPosture: posture });

    if (result.error) {
      setError(result.error);
      toast({
        title: 'Lỗi',
        description: result.error,
        variant: 'destructive',
      });
    } else if (result.data) {
      setRecommendations(result.data);
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Ví dụ: 'Vai của tôi bị gù và cổ cảm thấy căng cứng do ngồi làm việc cả ngày.'"
          value={posture}
          onChange={(e) => setPosture(e.target.value)}
          rows={4}
          className="bg-background"
        />
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang tạo...
            </>
          ) : (
             <>
              <Sparkles className="mr-2 h-4 w-4" />
              Nhận Đề Xuất
            </>
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations && (
        <div className="space-y-4">
          <h3 className="font-headline text-2xl font-bold">Tư thế được đề xuất</h3>
          <Accordion type="single" collapsible className="w-full">
            {recommendations.recommendedPoses.map((pose, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  {pose.name}
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-muted-foreground">{pose.description}</p>
                  
                  <div>
                    <h4 className="font-semibold">Hướng dẫn:</h4>
                    <p className="whitespace-pre-line text-muted-foreground">{pose.instructions}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-destructive/80">Lưu ý:</h4>
                    <p className="whitespace-pre-line text-muted-foreground">{pose.precautions}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary/90">Lợi ích:</h4>
                    <p className="whitespace-pre-line text-muted-foreground">{pose.benefits}</p>
                  </div>

                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
