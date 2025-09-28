import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, User, MapPin, Globe, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const therapyServices = [
  'Cổ-Vai-Gáy',
  'Đau thắt lưng',
  'Giãn tĩnh mạch',
  'Thần kinh toạ',
  'Giãn cơ thể thao',
  'Cải thiện tư thế',
  'Cải thiện giấc ngủ / tiền đình',
];

const privateClassTimes = [
  '13:00 ➡️ 14:30',
  '15:00 ➡️ 16:30',
  '20:30 ➡️ 22:00',
];

const BookingDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="w-full">Đặt Lịch Tập Riêng</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="font-headline">Đặt Lịch Tập Riêng hoặc Trị Liệu</DialogTitle>
        <DialogDescription>
          Đối với các buổi tập cá nhân, vui lòng liên hệ trực tiếp với chúng tôi để sắp xếp lịch hẹn.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <p className='text-sm text-muted-foreground'>Vui lòng gọi điện, nhắn Messenger hoặc email để sắp xếp thời gian phù hợp với bạn.</p>
        <a href="tel:0352518855" className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-secondary">
          <Phone className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold">Điện thoại</p>
            <p className="text-muted-foreground">035 251 8855</p>
          </div>
        </a>
        <a href="mailto:luvyoga.official@gmail.com" className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-secondary">
          <Phone className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold">Email</p>
            <p className="text-muted-foreground">luvyoga.official@gmail.com</p>
          </div>
        </a>
        <a href="https://m.me/LuvYoga.Official" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-secondary">
          <Phone className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold">Messenger</p>
            <p className="text-muted-foreground">m.me/LuvYoga.Official</p>
          </div>
        </a>
        <a href="https://www.instagram.com/luvyoga.official" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-secondary">
          <Phone className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold">Instagram</p>
            <p className="text-muted-foreground">@luvyoga.official</p>
          </div>
        </a>
        <a href="https://www.facebook.com/LuvYoga.Official" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-secondary">
          <Phone className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold">Facebook</p>
            <p className="text-muted-foreground">/LuvYoga.Official</p>
          </div>
        </a>
      </div>
    </DialogContent>
  </Dialog>
);

export default function TherapySection() {
  return (
    <section id="therapy" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Trị Liệu & Lớp Riêng
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Chăm sóc cá nhân hóa để hỗ trợ hành trình chữa lành và phát triển của bạn.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="flex flex-col shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Hỗ trợ trị liệu</CardTitle>
              <CardDescription>Hỗ trợ chuyên biệt cho các tình trạng khác nhau. Vui lòng đặt lịch trước.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              {therapyServices.map((service) => (
                <div key={service} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{service}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="flex flex-col shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><User className="h-6 w-6" /> Kèm 1:1 Yoga Trị Liệu</CardTitle>
              <CardDescription>Các buổi tập yoga trị liệu 1-1 được thiết kế riêng theo nhu cầu của bạn.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div>
                <h4 className="font-semibold">Thời gian có sẵn:</h4>
                <div className="mt-2 space-y-2">
                  {privateClassTimes.map((time) => (
                    <div key={time} className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>{time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Địa điểm:</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>Offline (Tại studio hoặc tại nhà trong vòng 10km)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <span>Online (Toàn quốc)</span>
                  </div>
                </div>
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
