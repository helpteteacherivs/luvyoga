'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Cảm ơn bạn đã liên hệ!",
      description: "Chúng tôi sẽ phản hồi sớm nhất có thể.",
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact-form" className="py-16 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Liên Hệ Với Chúng Tôi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Có câu hỏi về các lớp học hoặc cần tư vấn? Hãy để lại thông tin, chúng tôi sẽ liên hệ ngay!
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Gửi Tin Nhắn
                </CardTitle>
                <CardDescription>
                  Điền thông tin và chúng tôi sẽ phản hồi trong 24 giờ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ tên *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Nhập họ tên của bạn"
                        className="min-h-[44px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="035 xxx xxxx"
                        className="min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="min-h-[44px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tin nhắn *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Hãy cho chúng tôi biết bạn cần hỗ trợ gì..."
                      rows={4}
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full min-h-[48px] text-lg font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Contact Options */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Liên Hệ Nhanh</CardTitle>
                  <CardDescription>
                    Chọn phương thức liên hệ phù hợp nhất với bạn
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a
                    href="tel:0352518855"
                    className="flex items-center gap-4 rounded-lg border p-4 transition-all duration-200 hover:bg-primary/5 hover:border-primary/20 hover-lift"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Gọi ngay</p>
                      <p className="text-muted-foreground">035 251 8855</p>
                    </div>
                  </a>

                  <a
                    href="https://m.me/LuvYoga.Official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-lg border p-4 transition-all duration-200 hover:bg-primary/5 hover:border-primary/20 hover-lift"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Messenger</p>
                      <p className="text-muted-foreground">Chat trực tiếp</p>
                    </div>
                  </a>

                  <a
                    href="mailto:luvyoga.official@gmail.com"
                    className="flex items-center gap-4 rounded-lg border p-4 transition-all duration-200 hover:bg-primary/5 hover:border-primary/20 hover-lift"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">luvyoga.official@gmail.com</p>
                    </div>
                  </a>
                </CardContent>
              </Card>

              <Card className="shadow-lg bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">Thời Gian Hoạt Động</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>🌅 Sáng: 4:45 - 8:00</p>
                      <p>🌇 Tối: 17:30 - 20:25</p>
                      <p>📅 Thứ 2 - Chủ nhật</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}