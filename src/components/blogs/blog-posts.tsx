import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const posts = [
  {
    title: 'Yoga Định Tuyến: Xây Dựng Nền Móng Vững Chắc',
    description: 'Khám phá cách yoga định tuyến giúp bạn hiểu rõ cơ thể mình, thực hành an toàn và hiệu quả hơn, như cách chúng ta xây từng viên gạch cho một ngôi nhà vững chãi.',
    image: PlaceHolderImages.find((img) => img.id === 'pose-guidance'),
    date: '15 tháng 7, 2024',
    author: 'Luv Yoga',
  },
  {
    title: 'Hơi Thở Trong Yoga: Cầu Nối Giữa Thân và Tâm',
    description: 'Học cách sử dụng hơi thở (pranayama) để làm dịu tâm trí, giải tỏa căng thẳng và tăng cường năng lượng sống. Hơi thở chính là chìa khóa mở ra sự an yên nội tại.',
    image: PlaceHolderImages.find((img) => img.id === 'hero'),
    date: '10 tháng 7, 2024',
    author: 'Luv Yoga',
  },
    {
    title: 'Trị Liệu Phục Hồi: Lắng Nghe và Chữa Lành Cơ Thể',
    description: 'Tìm hiểu về yoga trị liệu, một phương pháp tiếp cận nhẹ nhàng nhưng sâu sắc để phục hồi sau chấn thương, giảm đau mãn tính và cải thiện sức khỏe tổng thể.',
    image: PlaceHolderImages.find((img) => img.id === 'therapy'),
    date: '05 tháng 7, 2024',
    author: 'Luv Yoga',
  },
];

export default function BlogPosts() {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Card key={post.title} className="overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
            <div className="grid md:grid-cols-3">
                <div className="md:col-span-1">
                    {post.image && (
                    <div className="relative h-48 md:h-full w-full">
                        <Image
                            src={post.image.imageUrl}
                            alt={post.image.description}
                            fill
                            className="object-cover"
                            data-ai-hint={post.image.imageHint}
                        />
                    </div>
                    )}
                </div>
                <div className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
                        <CardDescription>
                            Đăng bởi {post.author} vào {post.date}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{post.description}</p>
                    </CardContent>
                </div>
            </div>
        </Card>
      ))}
    </div>
  );
}
