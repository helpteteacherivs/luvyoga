import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import FacebookFeed from '@/components/album/facebook-feed';

export default function AlbumPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <section id="album" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Album Ảnh
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Những khoảnh khắc đáng nhớ tại Luv Yoga, được cập nhật trực tiếp từ trang Facebook của chúng tôi.
              </p>
            </div>
            <div className="flex justify-center">
              <FacebookFeed />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
