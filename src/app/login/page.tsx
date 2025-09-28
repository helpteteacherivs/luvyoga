
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAdmin', 'true');
      toast({
        title: 'Đăng nhập thành công',
        description: 'Chào mừng quản trị viên!',
      });
      router.push('/admin');
    } else {
      toast({
        title: 'Đăng nhập thất bại',
        description: 'Tên người dùng hoặc mật khẩu không đúng.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-muted/40 p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Đăng Nhập Quản Trị</CardTitle>
            <CardDescription>
              Vui lòng nhập thông tin để truy cập trang quản trị.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Tên người dùng</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleLogin}>
              Đăng Nhập
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
