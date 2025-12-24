import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Facebook, Instagram, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/LuvYoga.Official',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/luvyoga.official',
      icon: Instagram,
    },
  ];

  return (
    <footer id="contact" className="bg-secondary">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-4 flex items-center gap-2" prefetch={false}>
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl font-semibold text-foreground">
                Luv Yoga
              </span>
            </Link>
            <p className="text-muted-foreground">
              Yêu Yoga hơn mỗi ngày.
            </p>
             <p className="mt-2 text-muted-foreground">
              Love Yoga more everyday.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-headline text-lg font-semibold text-primary">Liên Hệ</h3>
            <div className="space-y-3 text-muted-foreground">
              <a
                href="https://maps.app.goo.gl/Z7b8kdwoQcx2y4JPA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-primary"
              >
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span>Ấp Nhân Hoà, Xã Tây Hoà, Huyện Trảng Bom, Tỉnh Đồng Nai</span>
              </a>
              <a href="tel:0352518855" className="flex items-center gap-3 transition-colors hover:text-primary">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>035 251 8855</span>
              </a>
              <a href="mailto:luvyoga.official@gmail.com" className="flex items-center gap-3 transition-colors hover:text-primary">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>luvyoga.official@gmail.com</span>
              </a>
              <a href="https://m.me/LuvYoga.Official" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-primary">
                <MessageCircle className="h-5 w-5 flex-shrink-0" />
                <span>m.me/LuvYoga.Official</span>
              </a>
          </div>
          </div>

            <div className="md:col-span-1 flex flex-col items-start">
              <h3 className="font-headline text-lg font-semibold text-primary">Vị Trí</h3>
              <div className="mt-6 rounded-lg overflow-hidden shadow-lg w-full max-w-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.179844196562!2d107.04734257583961!3d10.949783655970549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174e57aefde23d1%3A0xba400c9912517696!2sLuv%20Yoga!5e0!3m2!1sen!2sus!4v1759109316615!5m2!1sen!2sus"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Luv Yoga Location"
              />
              </div>
            </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Luv Yoga Sanctuary. Đã đăng ký bản quyền.</p>
          <p className="mt-2">
            Website chất lượng bởi{' '}
            <a
              href="https://ivsacademy.edu.vn/pages/webdesign"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
            IVS Celestech, IVS JSC
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
