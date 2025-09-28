import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

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
            <h3 className="font-headline text-lg font-semibold">Liên Hệ</h3>
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
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-headline text-lg font-semibold">Theo Dõi</h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  prefetch={false}
                >
                  <Icon className="h-6 w-6" />
                  <span className="sr-only">{name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Luv Yoga Sanctuary. Đã đăng ký bản quyền.</p>
          <p className="mt-2">
            Designed by{' '}
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
