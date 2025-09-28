
'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Logo } from '@/components/icons';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const navLinks = [
  { name: 'Giới Thiệu', href: '/#about' },
  { name: 'Lịch Tập', href: '/#classes' },
  { name: 'Trị Liệu', href: '/#therapy' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Album', href: '/album' },
  { name: 'Quản Trị', href: '/admin' },
  { name: 'Liên Hệ', href: '/#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
        setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Custom navigation logic for homepage vs other pages
  const navItems = navLinks
    .filter(link => {
        // Hide Admin link if not logged in
        if (link.name === 'Quản Trị' && !isAdmin) return false;
        return true;
    })
    .map(link => {
        if (!isClient) return link;
        const isHomePage = window.location.pathname === '/';
        const finalHref = (isHomePage || link.href.startsWith('/')) ? link.href : `/${link.href}`;
        return { ...link, href: finalHref };
    });


  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Logo className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-semibold text-foreground">
            Luv Yoga
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-foreground/80 transition-colors hover:text-primary"
              prefetch={false}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                  <Logo className="h-8 w-8 text-primary" />
                  <span className="font-headline text-2xl font-semibold">
                    Luv Yoga
                  </span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navItems.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                      prefetch={false}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
