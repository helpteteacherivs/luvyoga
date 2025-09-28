
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Edit, Trash2, Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Student = {
  id: string;
  name: string;
  course: string;
  status: 'Đang học' | 'Đã hoàn thành' | 'Bảo lưu';
  startDate: string;
  phone: string;
  notes?: string;
};

const initialStudents: Student[] = [
  { id: 'HV001', name: 'Nguyễn Văn A', course: 'Yoga Cơ Bản', status: 'Đang học', startDate: '2024-07-01', phone: '0901234567' },
  { id: 'HV002', name: 'Trần Thị B', course: 'Yoga Nâng Cao', status: 'Đã hoàn thành', startDate: '2024-05-15', phone: '0901234568', notes: 'Cần chú ý đầu gối.' },
  { id: 'HV003', name: 'Lê Văn C', course: 'Yoga Trị Liệu', status: 'Đang học', startDate: '2024-07-10', phone: '0901234569' },
  { id: 'HV004', name: 'Phạm Thị D', course: 'Yoga Bầu', status: 'Bảo lưu', startDate: '2024-06-20', phone: '0901234570' },
];

const courses = [
  { id: 'KH01', name: 'Yoga Cơ Bản', duration: '12 tuần', price: '3,000,000 VNĐ' },
  { id: 'KH02', name: 'Yoga Nâng Cao', duration: '12 tuần', price: '4,500,000 VNĐ' },
  { id: 'KH03', name: 'Yoga Trị Liệu', duration: '8 tuần', price: '5,000,000 VNĐ' },
  { id: 'KH04', name: 'Yoga Bầu', duration: '10 tuần', price: '3,500,000 VNĐ' },
];

const StudentForm = ({ student, onSave, onCancel }: { student?: Student | null, onSave: (student: Student) => void, onCancel: () => void }) => {
  const [formData, setFormData] = useState<Omit<Student, 'id'>>({
    name: student?.name || '',
    course: student?.course || 'Yoga Cơ Bản',
    status: student?.status || 'Đang học',
    startDate: student?.startDate || new Date().toISOString().split('T')[0],
    phone: student?.phone || '',
    notes: student?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = {
      id: student?.id || `HV${Date.now()}`, // Generate new ID for new student
      ...formData
    };
    onSave(newStudent);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Họ Tên</Label>
          <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">Điện thoại</Label>
          <Input id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="course" className="text-right">Khóa học</Label>
            <select id="course" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} className="col-span-3 border border-input rounded-md p-2">
                {courses.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Trạng thái</Label>
            <select id="status" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as Student['status']})} className="col-span-3 border border-input rounded-md p-2">
                <option value="Đang học">Đang học</option>
                <option value="Đã hoàn thành">Đã hoàn thành</option>
                <option value="Bảo lưu">Bảo lưu</option>
            </select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="startDate" className="text-right">Ngày bắt đầu</Label>
          <Input id="startDate" type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="notes" className="text-right">Ghi chú</Label>
          <Textarea id="notes" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary" onClick={onCancel}>Hủy</Button>
        </DialogClose>
        <Button type="submit">Lưu thay đổi</Button>
      </DialogFooter>
    </form>
  )
}

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    toast({
        title: "Đã đăng xuất",
        description: "Bạn đã đăng xuất thành công.",
    })
    router.push('/login');
  };

  const handleSaveStudent = (student: Student) => {
    if (editingStudent) {
      // Edit
      setStudents(students.map(s => s.id === student.id ? student : s));
       toast({ title: "Thành công", description: "Đã cập nhật thông tin học viên." });
    } else {
      // Add
      setStudents([student, ...students]);
      toast({ title: "Thành công", description: "Đã thêm học viên mới." });
    }
    closeForm();
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter(s => s.id !== studentId));
    toast({ title: "Thành công", description: "Đã xóa học viên.", variant: "destructive" });
  };
  
  const openForm = (student: Student | null = null) => {
      setEditingStudent(student);
      setIsFormOpen(true);
  }
  
  const closeForm = () => {
      setEditingStudent(null);
      setIsFormOpen(false);
  }

  const handleExportCSV = () => {
    if (students.length === 0) {
      toast({
        title: "Không có dữ liệu",
        description: "Chưa có học viên nào để xuất file.",
      });
      return;
    }

    const headers = ["Mã HV", "Họ Tên", "Khóa Học", "Ngày Bắt Đầu", "SĐT", "Trạng Thái", "Ghi Chú"];
    const csvContent = [
      headers.join(','),
      ...students.map(student => [
        student.id,
        `"${student.name.replace(/"/g, '""')}"`,
        `"${student.course.replace(/"/g, '""')}"`,
        student.startDate,
        student.phone,
        student.status,
        `"${(student.notes || '').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "danh-sach-hoc-vien.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
        title: "Xuất file thành công",
        description: "Đã tải về tệp danh-sach-hoc-vien.csv",
    });
  };

  if (!isAuthenticated) {
    return (
        <div className="flex min-h-dvh flex-col items-center justify-center">
            <p>Đang chuyển hướng đến trang đăng nhập...</p>
        </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1 bg-muted/40 p-4 sm:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex justify-between items-center">
            <div></div>
            <div className="text-center">
              <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Trang Quản Trị</h1>
              <p className="mt-4 text-lg text-muted-foreground">Quản lý học viên và các khóa học của Luv Yoga.</p>
            </div>
            <Button onClick={handleLogout} variant="destructive">Đăng xuất</Button>
          </div>

          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Quản Lý Học Viên</CardTitle>
                        <CardDescription>Danh sách tất cả học viên đã đăng ký.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleExportCSV} variant="outline">
                            <Download className="mr-2 h-4 w-4" /> Xuất File
                        </Button>
                        <DialogTrigger asChild>
                            <Button onClick={() => openForm()}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Thêm Học Viên
                            </Button>
                        </DialogTrigger>
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã HV</TableHead>
                      <TableHead>Họ Tên</TableHead>
                      <TableHead>Khóa Học</TableHead>
                      <TableHead>Ngày Bắt Đầu</TableHead>
                      <TableHead>SĐT</TableHead>
                      <TableHead>Trạng Thái</TableHead>
                      <TableHead>Hành Động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell>{student.startDate}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>
                          <Badge 
                             variant={
                              student.status === 'Đang học' ? 'default' : 
                              student.status === 'Đã hoàn thành' ? 'secondary' : 'destructive'
                             }
                             className={student.status === 'Bảo lưu' ? 'bg-yellow-500 text-white' : ''}
                          >
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="flex gap-2">
                           <DialogTrigger asChild>
                               <Button variant="ghost" size="icon" onClick={() => openForm(student)}>
                                    <Edit className="h-4 w-4" />
                               </Button>
                           </DialogTrigger>
                           <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Hành động này không thể được hoàn tác. Thao tác này sẽ xóa vĩnh viễn học viên
                                        <span className="font-bold"> {student.name} </span>
                                        ra khỏi hệ thống.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteStudent(student.id)}>Xóa</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <DialogContent className="sm:max-w-xl">
                 <DialogHeader>
                    <DialogTitle className="font-headline">{editingStudent ? 'Chỉnh Sửa Thông Tin Học Viên' : 'Thêm Học Viên Mới'}</DialogTitle>
                    <DialogDescription>
                       {editingStudent ? 'Cập nhật chi tiết cho học viên.' : 'Điền thông tin dưới đây để thêm một học viên mới.'}
                    </DialogDescription>
                </DialogHeader>
                <StudentForm student={editingStudent} onSave={handleSaveStudent} onCancel={closeForm} />
            </DialogContent>
          </Dialog>

          <Card>
            <CardHeader>
              <CardTitle>Quản Lý Khóa Học</CardTitle>
              <CardDescription>Danh sách các khóa học hiện có.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã KH</TableHead>
                    <TableHead>Tên Khóa Học</TableHead>
                    <TableHead>Thời Lượng</TableHead>
                    <TableHead>Học Phí</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.id}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>{course.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
