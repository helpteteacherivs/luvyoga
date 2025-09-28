import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const students = [
  { id: 'HV001', name: 'Nguyễn Văn A', course: 'Yoga Cơ Bản', status: 'Đang học' },
  { id: 'HV002', name: 'Trần Thị B', course: 'Yoga Nâng Cao', status: 'Đã hoàn thành' },
  { id: 'HV003', name: 'Lê Văn C', course: 'Yoga Trị Liệu', status: 'Đang học' },
  { id: 'HV004', name: 'Phạm Thị D', course: 'Yoga Bầu', status: 'Bảo lưu' },
];

const courses = [
  { id: 'KH01', name: 'Yoga Cơ Bản', duration: '12 tuần', price: '3,000,000 VNĐ' },
  { id: 'KH02', name: 'Yoga Nâng Cao', duration: '12 tuần', price: '4,500,000 VNĐ' },
  { id: 'KH03', name: 'Yoga Trị Liệu', duration: '8 tuần', price: '5,000,000 VNĐ' },
  { id: 'KH04', name: 'Yoga Bầu', duration: '10 tuần', price: '3,500,000 VNĐ' },
];

export default function AdminPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1 bg-muted/40 p-4 sm:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Trang Quản Trị</h1>
            <p className="mt-4 text-lg text-muted-foreground">Quản lý học viên và các khóa học của Luv Yoga.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quản Lý Học Viên</CardTitle>
              <CardDescription>Danh sách tất cả học viên đã đăng ký.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã HV</TableHead>
                    <TableHead>Họ Tên</TableHead>
                    <TableHead>Khóa Học</TableHead>
                    <TableHead>Trạng Thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.course}</TableCell>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

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
