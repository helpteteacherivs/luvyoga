import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, Calendar, Clock } from 'lucide-react';

export default function StickyBookBar() {
  return (
    // Mobile-only sticky booking bar — visible on small screens only
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="rounded-3xl bg-white/5 p-0 shadow-2xl backdrop-blur-2xl border border-white/20">
        <div className="flex items-center justify-between gap-3 rounded-3xl bg-gradient-to-r from-[#fffaf7]/80 to-[#fff4ea]/70 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#6b3e2b]/10 border border-[#6b3e2b]/10">
              <Phone className="h-5 w-5 text-[#6b3e2b]" />
            </div>
            <div className="flex flex-col text-sm text-[#3b2a21]">
              <span className="font-semibold">Đặt chỗ · Hỗ trợ</span>
              <a href="tel:0352518855" className="text-xs text-[#543425] underline">035 251 88 55</a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="#classes" prefetch={false} className="w-full">
              <Button className="flex items-center gap-2 rounded-xl bg-[#6b3e2b] text-white px-4 py-2 text-sm font-semibold shadow-lg hover:bg-[#5e3a2a]/95">
                <Clock className="h-4 w-4" />
                Đặt Lịch
              </Button>
            </Link>

            <Link href="#contact" prefetch={false} className="w-full">
              <Button variant="outline" className="hidden items-center gap-2 rounded-xl border border-[#6b3e2b]/30 text-[#6b3e2b] px-3 py-2 text-sm font-semibold shadow-sm hover:bg-[#6b3e2b]/5 md:flex">
                <Calendar className="h-4 w-4" />
                Liên Hệ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
