'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Mail, Phone, Plus, X, ArrowUp, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const socialLinks = [
  {
    name: 'Phone',
    href: 'tel:0352518855',
    icon: Phone,
    bgColor: 'bg-green-500 hover:bg-green-600',
  },
  {
    name: 'Email',
    href: 'mailto:luvyoga.official@gmail.com',
    icon: Mail,
    bgColor: 'bg-yellow-500 hover:bg-yellow-600',
  },
  {
    name: 'Messenger',
    href: 'https://m.me/LuvYoga.Official',
    icon: MessageCircle,
    bgColor: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/LuvYoga.Official',
    icon: Facebook,
    bgColor: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/luvyoga.official',
    icon: Instagram,
    bgColor: 'bg-pink-600 hover:bg-pink-700',
  },
];


export default function ContactFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative flex flex-col items-center gap-2">
        {isVisible && (
           <Button
            onClick={scrollToTop}
            size="icon"
            className="h-12 w-12 rounded-full bg-secondary text-secondary-foreground shadow-lg transition-opacity hover:bg-secondary/80"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        )}
        {isOpen && (
          <div className="flex flex-col gap-3 transition-all duration-300">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <Button
                  size="icon"
                  className={cn(
                    'rounded-full text-white shadow-lg',
                    link.bgColor
                  )}
                  aria-label={link.name}
                >
                  <link.icon className="h-6 w-6" />
                </Button>
              </Link>
            ))}
          </div>
        )}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 hover:bg-primary/90 hover:scale-110"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Plus className="h-7 w-7" />
          )}
          <span className="sr-only">{isOpen ? 'Đóng menu liên hệ' : 'Mở menu liên hệ'}</span>
        </Button>
      </div>
    </div>
  );
}
