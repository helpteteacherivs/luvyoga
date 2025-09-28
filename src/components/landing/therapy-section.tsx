import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, User, MapPin, Globe } from 'lucide-react';
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
      <Button variant="outline" className="w-full">Book Private Session</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="font-headline">Book a Private or Therapy Session</DialogTitle>
        <DialogDescription>
          For personalized sessions, please contact us directly to schedule an appointment.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <p className='text-sm text-muted-foreground'>Please call or email to arrange a time that suits you.</p>
        <a href="tel:0352518855" className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-secondary">
          <Clock className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold">Phone</p>
            <p className="text-muted-foreground">035 251 8855</p>
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
            Therapy & Private Sessions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Personalized care to support your healing and growth journey.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="flex flex-col shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Hỗ trợ trị liệu</CardTitle>
              <CardDescription>Targeted support for various conditions. Please book in advance.</CardDescription>
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
              <CardDescription>One-on-one therapeutic yoga sessions tailored to your needs.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div>
                <h4 className="font-semibold">Available Times:</h4>
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
                <h4 className="font-semibold">Location Options:</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>Offline (Studio or Home within 10km)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <span>Online (Nationwide)</span>
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
