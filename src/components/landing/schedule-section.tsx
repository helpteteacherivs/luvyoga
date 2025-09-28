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
  { time: '04:45 ➡️ 06:00', period: 'Morning' },
  { time: '06:45 ➡️ 08:00', period: 'Morning' },
  { time: '17:30 ➡️ 18:45', period: 'Evening' },
  { time: '19:10 ➡️ 20:25', period: 'Evening' },
];

const BookingDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button className="w-full">Book Now</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="font-headline">Book Your Class</DialogTitle>
        <DialogDescription>
          Contact us to reserve your spot. We look forward to seeing you!
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <a href="tel:0352518855" className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-secondary">
          <Phone className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold">Phone</p>
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
            Class Schedule
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Find a time that works for you and join our community.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col shadow-lg lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <Sparkles className="h-6 w-6 text-accent" />
                Newcomers Class
              </CardTitle>
              <CardDescription>
                Perfect for those new to yoga.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-lg font-medium">08:30 ➡️ 09:45</span>
              </div>
              <p className="text-muted-foreground">
                A special session designed to introduce you to the fundamentals of yoga in a welcoming environment.
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
                Community Classes
              </CardTitle>
              <CardDescription>Join our regular group sessions.</CardDescription>
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
