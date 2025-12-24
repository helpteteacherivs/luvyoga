import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import LazyIframe from '@/components/ui/lazy-iframe';

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
              ✨🧘🏽‍♀️ Tại Luv Yoga, sức khoẻ của học viên luôn là ưu tiên hàng đầu — chúng tôi dạy bằng cái tâm và sự tận tụy trong từng buổi tập.
            </p>

            <p className="text-muted-foreground">
              🪷🤸🏽‍♀️ #Luv không dạy thật nhiều tư thế “đỉnh” nếu học viên chưa sẵn sàng. Yoga không phải chinh phục tư thế mà là hành trình lắng nghe, cảm nhận và trân trọng cơ thể.
            </p>

            <p className="text-muted-foreground">
              🕉️🧡 #Luv tin rằng khi người hướng dẫn đủ tấm lòng — thấu hiểu và lắng nghe — học viên sẽ được tập luyện an toàn, chậm rãi và đúng khả năng. Đề cao định tuyến và sự an toàn là cốt lõi mà #Luv luôn giữ.
            </p>

            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p className="font-semibold">𝑳𝑼𝑽 𝒀𝑶𝑮𝑨 — more everyday · Yêu Yoga hơn mỗi ngày</p>
              <p>📞 <a href="tel:0352518855" className="text-primary font-medium">035 251 88 55</a></p>
              <p>🏡 Ấp Nhân Hoà, Xã Tây Hoà, Huyện Trảng Bom, Đồng Nai</p>
              <p>📍 <a href="https://maps.app.goo.gl/Z7b8kdwoQcx2y4JPA" target="_blank" rel="noopener noreferrer" className="underline">Bản đồ</a></p>
            </div>

            <div className="mt-4 border-t pt-4 text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">⏰🕉️ Các khung giờ tập cộng đồng</p>
              <ul className="list-disc pl-5">
                <li>04:45 ➡️ 06:00 (T2 đến T7)</li>
                <li>06:45 ➡️ 08:00 (T2 đến T7)</li>
                <li>17:30 ➡️ 18:45 (T2 đến T6)</li>
                <li>19:10 ➡️ 20:25 (T2 đến T6)</li>
              </ul>

              <p className="font-semibold mt-2">💆🏻 Hỗ trợ trị liệu (vui lòng đặt lịch trước)</p>
              <p className="text-muted-foreground">Khung giờ trị liệu: 13:00 ➡️ 15:00 | 15:00 ➡️ 17:00 — các dịch vụ: Cổ-Vai-Gáy, Đau thắt lưng, Giãn tĩnh mạch, Thần kinh toạ, Giãn cơ thể thao, Cải thiện tư thế, Cải thiện giấc ngủ / tiền đình…</p>

              <p className="font-semibold mt-2">🕉️ Kèm 1:1 Yoga Trị Liệu</p>
              <p className="text-muted-foreground">Theo lịch học viên: 13:00➡️14:30 | 15:00➡️16:30 | 20:45➡️22:00 — Địa điểm: Offline (studio / nhà trong bán kính 10km) hoặc Online (toàn quốc)</p>

              <p className="font-semibold mt-2">Chứng chỉ</p>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Alliance Yoga (Mỹ): Giáo viên Yoga Quốc tế 200H</li>
                <li>Alliance Yoga (Mỹ): Giáo viên Yoga phục hồi 100H</li>
                <li>Chứng nhận Cục Thể Dục Thể Thao (Việt Nam): Người hướng dẫn Yoga</li>
              </ul>
            </div>

            <div className="mt-6 text-sm text-muted-foreground"> 
              <p className="font-semibold">Follow & media</p>
              <p>Chúng tôi chia sẻ hành trình tập luyện, trị liệu và lớp học trên kênh Facebook của Luv Yoga.</p>
            </div>
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

          {/* Facebook embeds/media — responsive */}
          <div className="container mx-auto px-4 md:px-6 mt-8">
            <div className="grid gap-6 md:grid-cols-2 items-start">
              <div className="rounded-lg overflow-hidden shadow-lg border p-2 bg-card">
                <div className="aspect-[500/729] w-full">
                  <LazyIframe
                    src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FLuvYoga.Official%2Fposts%2Fpfbid02QJpfvbSDcSQnPCE2QnbKDr3Q9kd6HogZqxsbUWvKXdpyZy3PeATVBv1ZUTP58qk1l&show_text=true&width=500"
                    title="Luv Yoga Facebook post"
                    width="100%"
                    height={729}
                    style={{ border: 'none', overflow: 'hidden' }}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    placeholder={<div className="p-6 text-center text-sm text-muted-foreground">Bài đăng Facebook — đang tải…</div>}
                  />
                </div>
              </div>

              <div className="rounded-lg overflow-hidden shadow-lg border p-2 bg-card">
                <div className="aspect-[295/476] w-full flex items-center justify-center">
                  <LazyIframe
                    src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F824210390396607%2F&show_text=false&width=295&t=0"
                    title="Luv Yoga Facebook reel"
                    width="100%"
                    height={476}
                    style={{ border: 'none', overflow: 'hidden' }}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    placeholder={<div className="p-6 text-center text-sm text-muted-foreground">Video Facebook — đang tải…</div>}
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
