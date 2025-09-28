import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Sparkles, Phone, Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const communityClasses = [
  { time: '04:45 ➡️ 06:00', period: 'Sáng' },
  { time: '06:45 ➡️ 08:00', period: 'Sáng' },
  { time: '17:30 ➡️ 18:45', period: 'Tối' },
  { time: '19:10 ➡️ 20:25', period: 'Tối' },
];

const BookingDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button className="w-full">Đặt Lịch Ngay</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="font-headline">Đặt Lịch Tập</DialogTitle>
        <DialogDescription>
          Hãy liên hệ với chúng tôi để giữ chỗ. Rất mong được gặp bạn!
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <a href="tel:0352518855" className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-secondary">
          <Phone className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold">Điện thoại</p>
            <p className="text-muted-foreground">035 251 8855</p>
          </div>
        </a>
        <a href="mailto:luvyoga.official@gmail.com" className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-secondary">
          <Mail className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold">Email</p>
            <p className="text-muted-foreground">luvyoga.official@gmail.com</p>
          </div>
        </a>
      </div>
    </DialogContent>
  </Dialog>
);

export default function ScheduleSection() {
  return (
    <section id="classes" className="bg-secondary py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Lịch Tập
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Tìm một thời gian phù hợp và tham gia cộng đồng của chúng tôi.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col shadow-lg lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <Sparkles className="h-6 w-6 text-accent" />
                Lớp Cho Người Mới
              </CardTitle>
              <CardDescription>
                Hoàn hảo cho những người mới bắt đầu với yoga.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-lg font-medium">08:30 ➡️ 09:45</span>
              </div>
              <p className="text-muted-foreground">
                Một buổi tập đặc biệt được thiết kế để giới thiệu cho bạn những nguyên tắc cơ bản của yoga trong một môi trường thân thiện.
              </p>
            </CardContent>
            <CardFooter>
              <BookingDialog />
            </CardFooter>
          </Card>

          <Card className="flex flex-col shadow-lg md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <Users className="h-6 w-6 text-primary" />
                Lớp Cộng Đồng
              </CardTitle>
              <CardDescription>Tham gia các buổi tập nhóm thường xuyên của chúng tôi.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {communityClasses.map((item) => (
                  <div key={item.time} className="flex items-center gap-3 rounded-md border p-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <BookingDialog />
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
