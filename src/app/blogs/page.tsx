import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import FacebookFeed from '@/components/blogs/facebook-feed';
import BlogPosts from '@/components/blogs/blog-posts';

export default function BlogsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <section id="blogs" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Blogs & Tin Tức
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Khám phá những giá trị của Yoga và cập nhật tin tức mới nhất từ Luv Yoga.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h3 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl mb-8">
                  Bài Viết Nổi Bật
                </h3>
                <BlogPosts />
              </div>
              <div className="lg:col-span-1">
                <h3 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl mb-8 text-center lg:text-left">
                  Cập nhật từ Facebook
                </h3>
                <div className="flex justify-center lg:justify-start">
                  <FacebookFeed />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
