
import React from 'react';
import { Calendar, Clock, MapPin, Users, DollarSign, CheckCircle, Info } from 'lucide-react';
import { YogaClass, UserRole } from '../types';

interface ScheduleCalendarProps {
  classes: YogaClass[];
  role: UserRole;
  currentUserId?: string; // To check if user is already enrolled
  onBookClass?: (classId: string) => void;
  onEditClass?: (cls: YogaClass) => void;
  onViewStudents?: (cls: YogaClass) => void;
}

const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({ classes, role, currentUserId, onBookClass, onEditClass, onViewStudents }) => {
  
  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      if (year && month && day) {
        return `${day}/${month}/${year}`;
      }
      return dateStr;
    } catch (e) {
      return dateStr;
    }
  };

  const handleClassAction = (cls: YogaClass, isBooked: boolean, isFull: boolean) => {
    if (role === UserRole.MEMBER) {
      if (isBooked) return; // Do nothing if already booked
      if (isFull) {
        alert("Lớp đã đầy, vui lòng chọn lớp khác hoặc liên hệ admin.");
        return;
      }

      if (onBookClass) {
         // Confirmation message logic
         const priceDisplay = cls.price > 0 ? `${cls.price.toLocaleString('vi-VN')} đ` : 'Miễn phí';
         const isConfirmed = window.confirm(
           `Xác nhận đăng ký tham gia lớp học:\n\n🧘‍♀️ ${cls.title}\n🕒 Thời gian: ${cls.startTime} - ${formatDate(cls.date)}\n💰 Học phí: ${priceDisplay}\n\nBạn có chắc chắn muốn đặt lịch không?`
         );
         
         if (isConfirmed) {
           onBookClass(cls.id);
         }
      }
    } else {
      // Admin edit action
      onEditClass?.(cls);
    }
  };

  const handleCardClick = (cls: YogaClass) => {
      // If Admin clicks the card (not the button), view students
      if (role === UserRole.ADMIN && onViewStudents) {
          onViewStudents(cls);
      }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.map((cls) => {
        const isBooked = currentUserId ? cls.students.some(s => s.id === currentUserId) : false;
        const isFull = cls.enrolled >= cls.capacity;

        return (
          <div 
            key={cls.id} 
            onClick={() => handleCardClick(cls)}
            className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border overflow-hidden group flex flex-col 
              ${isBooked ? 'border-luv-primary ring-1 ring-luv-primary' : 'border-gray-100'} 
              ${role === UserRole.ADMIN ? 'cursor-pointer hover:border-luv-primary' : ''}`}
            title={role === UserRole.ADMIN ? "Nhấp để xem danh sách học viên" : ""}
          >
            <div className="h-40 overflow-hidden relative shrink-0">
              <img src={cls.image} alt={cls.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-luv-dark shadow-sm">
                  {cls.level}
              </div>
              {isBooked && (
                <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                  <CheckCircle size={12} /> Đã đăng ký
                </div>
              )}
              {role === UserRole.ADMIN && (
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Info size={14} /> Xem danh sách
                </div>
              )}
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-800 line-clamp-1 group-hover:text-luv-dark transition-colors">{cls.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${isFull ? 'bg-red-100 text-red-600 font-bold' : 'bg-green-100 text-green-600'}`}>
                      {cls.enrolled}/{cls.capacity} Slot
                  </span>
              </div>
              
              <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{cls.description}</p>
              
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-luv-accent" />
                  <span>{formatDate(cls.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-luv-accent" />
                  <span>{cls.startTime} ({cls.duration} phút)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-luv-accent" />
                  <span>GV: {cls.instructor}</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-luv-dark">
                  <DollarSign size={16} />
                  <span>
                    {cls.price === 0 ? 'Miễn phí' : `${cls.price.toLocaleString('vi-VN')} đ`}
                  </span>
                </div>
              </div>

              <button
                  onClick={(e) => {
                      e.stopPropagation(); // Prevent opening View Modal when clicking Edit/Book
                      handleClassAction(cls, isBooked, isFull);
                  }}
                  disabled={role === UserRole.MEMBER && (isBooked || isFull)}
                  className={`w-full py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 mt-auto ${
                      role === UserRole.MEMBER 
                      ? isBooked 
                        ? 'bg-green-50 text-green-600 border border-green-200 cursor-default'
                        : isFull 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-luv-dark text-white hover:bg-purple-900' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 z-10 relative border border-gray-200'
                  }`}
              >
                  {role === UserRole.MEMBER 
                    ? isBooked 
                      ? 'Đã ghi danh' 
                      : isFull 
                        ? 'Lớp đã đầy'
                        : 'Đặt Lịch Ngay' 
                    : 'Chỉnh Sửa'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleCalendar;
