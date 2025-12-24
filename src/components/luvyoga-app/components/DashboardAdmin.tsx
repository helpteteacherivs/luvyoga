
import React, { useState } from 'react';
import { User, YogaClass, UserRole, Payment } from '../types';
import ScheduleCalendar from './ScheduleCalendar';
import { Users, Calendar, Settings, Plus, Search, Filter, Database, X, Save, Trash2, Clock, DollarSign, LogOut, FileText, Info, CreditCard } from 'lucide-react';

interface DashboardAdminProps {
  user: User;
  classes: YogaClass[];
  payments: Payment[];
  onUpdateClass: (updatedClass: YogaClass) => void;
  onCreateClass: (newClass: YogaClass) => void;
  onApprovePayment: (paymentId: string) => void;
  onLogout: () => void;
}

const DashboardAdmin: React.FC<DashboardAdminProps> = ({ user, classes, payments, onUpdateClass, onCreateClass, onApprovePayment, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'members' | 'classes' | 'payments' | 'settings'>('members');
  const [members, setMembers] = useState<User[]>([]); 
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<YogaClass | null>(null);
  
  // Read-only View Modal State
  const [viewingClass, setViewingClass] = useState<YogaClass | null>(null);

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenEdit = (cls: YogaClass) => {
    setEditingClass({ ...cls });
    setIsClassModalOpen(true);
  };

  const handleOpenCreate = () => {
    const newClass: YogaClass = {
        id: '', // Generated in parent or here
        title: '',
        instructor: 'Luv Yoga Instructor',
        date: new Date().toISOString().split('T')[0],
        startTime: '06:00',
        duration: 60,
        capacity: 12,
        enrolled: 0,
        price: 0,
        level: 'Beginner',
        description: '',
        image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop',
        students: []
    };
    setEditingClass(newClass);
    setIsClassModalOpen(true);
  };

  const handleRemoveStudent = (studentId: string) => {
    if (!editingClass) return;
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa học viên này khỏi lớp?");
    if (confirm) {
        const updatedStudents = editingClass.students.filter(s => s.id !== studentId);
        setEditingClass({
            ...editingClass,
            students: updatedStudents,
            enrolled: updatedStudents.length
        });
    }
  };

  const handleSaveClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClass) return;

    if (editingClass.id) {
        onUpdateClass(editingClass);
    } else {
        onCreateClass(editingClass);
    }
    setIsClassModalOpen(false);
    setEditingClass(null);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      
      {/* Mobile Header for Admin */}
      <div className="md:hidden flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-luv-dark rounded-lg text-white flex items-center justify-center font-bold">A</div>
                 <span className="font-bold text-xl text-luv-dark">Admin</span>
            </div>
            <button onClick={onLogout} className="text-red-500 p-2 bg-red-50 rounded-lg shadow-sm hover:bg-red-100 transition-colors">
                <LogOut size={20} />
            </button>
      </div>

      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in">
        <div className="hidden md:block">
            <h1 className="text-3xl font-bold text-gray-800">Admin Portal</h1>
            <p className="text-gray-500">Hệ thống quản lý trung tâm</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-xl shadow-sm border border-gray-100 w-full md:w-auto overflow-x-auto">
             <button onClick={() => setActiveTab('members')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'members' ? 'bg-luv-dark text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Users size={16} /> Thành viên
            </button>
            <button onClick={() => setActiveTab('classes')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'classes' ? 'bg-luv-dark text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Calendar size={16} /> Lớp học
            </button>
            <button onClick={() => setActiveTab('payments')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'payments' ? 'bg-luv-dark text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <CreditCard size={16} /> Tài chính
            </button>
            <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'settings' ? 'bg-luv-dark text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Settings size={16} /> Cấu hình
            </button>
        </div>
      </header>

      {/* MEMBER MANAGEMENT */}
      {activeTab === 'members' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800">Danh sách thành viên</h2>
            <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-luv-primary"
                    />
                </div>
            </div>
          </div>
          
          {filteredMembers.length === 0 ? (
             <div className="p-12 text-center flex flex-col items-center justify-center text-gray-400">
                 <Database size={48} className="mb-4 opacity-20" />
                 <p className="text-lg font-medium text-gray-500">Chưa có dữ liệu thành viên</p>
                 <p className="text-sm">Danh sách thành viên sẽ hiển thị tại đây khi có dữ liệu.</p>
             </div>
          ) : (
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Thành viên</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Ngày tham gia</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Gói tập</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Trạng thái</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredMembers.map(m => (
                            <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">{m.name}</p>
                                            <p className="text-xs text-gray-500">{m.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{m.joinDate}</td>
                                <td className="px-6 py-4 text-sm text-gray-800 font-medium">{m.membershipType || 'N/A'}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${m.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {m.status || 'Unknown'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-luv-primary hover:text-luv-dark text-sm font-semibold">Chi tiết</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          )}
        </div>
      )}

      {/* CLASS MANAGEMENT */}
      {activeTab === 'classes' && (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Xếp lịch lớp học</h2>
                <button 
                  onClick={handleOpenCreate}
                  className="px-4 py-2 bg-luv-accent text-white font-bold rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"
                >
                    <Plus size={16} /> Tạo lớp học mới
                </button>
            </div>
            
            {classes.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
                     <p className="text-gray-500 mb-4">Chưa có lớp học nào được tạo trong hệ thống.</p>
                     <button onClick={handleOpenCreate} className="text-luv-primary font-bold hover:underline">Tạo lớp học đầu tiên</button>
                </div>
            ) : (
                <ScheduleCalendar 
                    classes={classes} 
                    role={UserRole.ADMIN} 
                    onEditClass={handleOpenEdit} 
                    onViewStudents={(cls) => setViewingClass(cls)}
                />
            )}
        </div>
      )}

      {/* PAYMENTS MANAGEMENT */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Quản lý Tài chính</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Mã GD</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Thành viên</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Nội dung</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Số tiền</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Ngày</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Trạng thái</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-400">Chưa có giao dịch nào.</td>
                            </tr>
                        ) : (
                            payments.map(p => (
                                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{p.id}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{p.userId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={p.description}>{p.description}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-800">{p.amount.toLocaleString()} đ</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{p.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                            p.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                                            p.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {p.status === 'Paid' ? 'Đã thanh toán' : p.status === 'Pending' ? 'Chờ duyệt' : 'Quá hạn'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {p.status === 'Pending' && (
                                            <button 
                                                onClick={() => onApprovePayment(p.id)}
                                                className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-green-600 transition-colors"
                                            >
                                                Duyệt
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      )}

       {/* SETTINGS */}
       {activeTab === 'settings' && (
         <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500 animate-fade-in">
             <Settings size={48} className="mx-auto mb-4 text-gray-300" />
             <h3 className="text-lg font-medium text-gray-800">Cài đặt hệ thống</h3>
             <p className="mb-6">Quản lý cấu hình chung, phương thức thanh toán và API.</p>
         </div>
       )}

       {/* READ-ONLY STUDENT LIST MODAL */}
       {viewingClass && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-purple-50">
                  <div>
                    <h3 className="text-lg font-bold text-luv-dark line-clamp-1">Danh sách học viên</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="font-semibold">{viewingClass.title}</span>
                    </p>
                  </div>
                  <button onClick={() => setViewingClass(null)} className="text-gray-400 hover:text-gray-600 bg-white p-2 rounded-full shadow-sm border border-gray-100"><X size={20} /></button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-0">
                  <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                      <span className="font-bold text-gray-700 flex items-center gap-2"><Users size={16} className="text-luv-accent" /> Đã đăng ký</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${viewingClass.enrolled >= viewingClass.capacity ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                          {viewingClass.enrolled} / {viewingClass.capacity}
                      </span>
                  </div>
                  
                  {viewingClass.students.length === 0 ? (
                      <div className="p-12 text-center text-gray-400">
                          <Users size={48} className="mx-auto mb-4 opacity-20" />
                          <p className="font-medium">Chưa có học viên nào đăng ký lớp này.</p>
                      </div>
                  ) : (
                      <ul className="divide-y divide-gray-100">
                          {viewingClass.students.map(s => (
                              <li key={s.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                                  <div className="flex items-center gap-3">
                                      <img src={s.avatar} alt="" className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover bg-gray-200" />
                                      <div>
                                          <p className="text-sm font-bold text-gray-800">{s.name}</p>
                                          <p className="text-xs text-gray-500">{s.email}</p>
                                          <p className="text-[10px] text-gray-400 mt-0.5">Tham gia: {new Date(s.enrolledAt).toLocaleDateString()}</p>
                                      </div>
                                  </div>
                                  <div className="text-xs text-luv-primary bg-purple-50 px-2 py-1 rounded font-bold">
                                      Đã đăng ký
                                  </div>
                              </li>
                          ))}
                      </ul>
                  )}
               </div>
               
               <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                    <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                        <Info size={12} /> Chế độ xem danh sách (Read-only)
                    </p>
               </div>
            </div>
         </div>
       )}

       {/* CLASS EDITOR MODAL */}
       {isClassModalOpen && editingClass && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
               <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                  <h3 className="text-xl font-bold text-gray-800">{editingClass.id ? 'Chỉnh Sửa Lớp Học' : 'Tạo Lớp Học Mới'}</h3>
                  <button onClick={() => setIsClassModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-50 p-2 rounded-full"><X size={20} /></button>
               </div>
               
               <form onSubmit={handleSaveClass} className="p-6 space-y-6">
                  {/* Basic Information */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tên lớp học</label>
                    <input type="text" required value={editingClass.title} onChange={e => setEditingClass({...editingClass, title: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luv-primary outline-none" placeholder="VD: Yoga Cơ Bản" />
                  </div>
                  
                  {/* Scheduling Section */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <Clock size={16} /> Thời gian & Lịch trình
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Ngày tập</label>
                          <input type="date" required value={editingClass.date} onChange={e => setEditingClass({...editingClass, date: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luv-primary outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Giờ bắt đầu</label>
                          <input type="time" required value={editingClass.startTime} onChange={e => setEditingClass({...editingClass, startTime: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luv-primary outline-none" />
                        </div>
                         <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Thời lượng (phút)</label>
                          <input type="number" required value={editingClass.duration} onChange={e => setEditingClass({...editingClass, duration: Number(e.target.value)})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luv-primary outline-none" />
                        </div>
                      </div>
                  </div>

                  {/* Pricing & Capacity Section */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <DollarSign size={16} /> Học Phí & Sỉ Số
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Học phí (VND)</label>
                            <div className="relative">
                                <input 
                                    type="number" 
                                    required 
                                    value={editingClass.price} 
                                    onChange={e => setEditingClass({...editingClass, price: Number(e.target.value)})} 
                                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luv-primary outline-none pr-8" 
                                    placeholder="0" 
                                />
                                <span className="absolute right-3 top-2 text-gray-400 text-xs">₫</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{editingClass.price === 0 ? 'Hiện thị: Miễn phí' : `${editingClass.price.toLocaleString()} đ`}</p>
                         </div>
                         <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Sỉ số tối đa</label>
                            <input type="number" required value={editingClass.capacity} onChange={e => setEditingClass({...editingClass, capacity: Number(e.target.value)})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luv-primary outline-none" />
                         </div>
                      </div>
                  </div>

                  {/* Additional Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Huấn luyện viên</label>
                        <input type="text" required value={editingClass.instructor} onChange={e => setEditingClass({...editingClass, instructor: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luv-primary outline-none" />
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Cấp độ</label>
                        <select 
                            value={editingClass.level}
                            onChange={e => setEditingClass({...editingClass, level: e.target.value as any})}
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luv-primary outline-none bg-white"
                        >
                            <option value="Beginner">Cơ bản</option>
                            <option value="Intermediate">Trung bình</option>
                            <option value="Advanced">Nâng cao</option>
                        </select>
                    </div>
                  </div>

                   <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Mô tả</label>
                    <textarea value={editingClass.description} onChange={e => setEditingClass({...editingClass, description: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luv-primary outline-none" rows={3} placeholder="Nội dung buổi tập..."></textarea>
                  </div>

                  {/* Student List (Only for editing existing classes) */}
                  {editingClass.id && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <h4 className="font-bold text-gray-800 mb-3 flex justify-between">
                            Danh sách học viên đăng ký 
                            <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-600">{editingClass.enrolled} / {editingClass.capacity}</span>
                        </h4>
                        {editingClass.students.length === 0 ? (
                            <p className="text-sm text-gray-500 italic">Chưa có học viên đăng ký.</p>
                        ) : (
                            <ul className="space-y-2">
                                {editingClass.students.map(s => (
                                    <li key={s.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100 hover:border-red-100 group transition-colors">
                                        <div className="flex items-center gap-3">
                                            <img src={s.avatar} alt="" className="w-8 h-8 rounded-full" />
                                            <div>
                                                <p className="text-sm font-semibold">{s.name}</p>
                                                <p className="text-xs text-gray-500">{s.email}</p>
                                            </div>
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveStudent(s.id)}
                                            className="text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Xóa khỏi lớp"
                                        >
                                            <X size={18} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                  )}

                  <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white border-t border-gray-100 mt-6 py-4">
                      <button type="button" onClick={() => setIsClassModalOpen(false)} className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors">Hủy bỏ</button>
                      <button type="submit" className="px-5 py-2.5 rounded-xl bg-luv-dark text-white font-bold hover:bg-gray-800 transition-colors shadow-lg flex items-center gap-2">
                        <Save size={18} /> Lưu thay đổi
                      </button>
                  </div>
               </form>
            </div>
         </div>
       )}
    </div>
  );
};

export default DashboardAdmin;
