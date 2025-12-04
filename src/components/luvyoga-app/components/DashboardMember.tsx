
import React, { useState, useEffect } from 'react';
import { User, YogaClass, Payment, Notification, UserRole } from '../types';
import ScheduleCalendar from './ScheduleCalendar';
import AIAssistant from './AIAssistant';
import { Bell, CreditCard, LayoutDashboard, Info, Award, Clock, Heart, CalendarCheck, User as UserIcon, LogOut, ChevronRight, X, Phone, Mail, MapPin, Facebook, Instagram, Save, Activity, HeartPulse, Sparkles, Check, MessageSquare, Calendar, QrCode, Banknote, Copy, ArrowLeft, FileText, Download, RotateCw, ShieldCheck, HelpCircle, Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import { ASSETS } from '../constants';

interface DashboardMemberProps {
  user: User;
  classes: YogaClass[];
  payments: Payment[];
  notifications: Notification[];
  onBookClass: (classId: string, pricingOption?: { title: string; price: number }) => void;
  onLogout: () => void;
  onUpdateUser: (updates: Partial<User>) => void;
  onRegisterPackage: (planName: string, amount: number, description: string, startDate: string, durationMonths: number, bonusMonths: number) => void;
}

const SCHEDULE_SLOTS = [
    { id: 'MOR445', session: 'Sáng sớm', time: '04:45 - 06:00', label: 'Sáng: 04:45 - 06:00', days: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7'], desc: 'Năng lượng ngày mới', icon: Sunrise },
    { id: 'MOR645', session: 'Sáng', time: '06:45 - 08:00', label: 'Sáng: 06:45 - 08:00', days: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7'], desc: 'Tập luyện tiêu chuẩn', icon: Sun },
    { id: 'MOR830', session: 'Sáng (Cơ bản)', time: '08:30 - 09:45', label: 'Sáng: 08:30 - 09:45', days: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7'], desc: 'Dành cho người mới', icon: Sun, isNew: true }, 
    { id: 'EV530', session: 'Chiều', time: '17:30 - 18:45', label: 'Chiều: 17:30 - 18:45', days: ['T2', 'T3', 'T4', 'T5', 'T6'], desc: 'Thư giãn sau giờ làm', icon: Sunset }, 
    { id: 'EV710', session: 'Tối', time: '19:10 - 20:25', label: 'Tối: 19:10 - 20:25', days: ['T2', 'T3', 'T4', 'T5', 'T6'], desc: 'Khỏe mạnh & Ngủ ngon', icon: Moon },   
];

const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

const BILLING_CYCLES = [
    { months: 1, label: '1 Tháng', bonus: 0, promo: '' },
    { months: 3, label: '3 Tháng', bonus: 0, promo: '' },
    { months: 6, label: '6 Tháng', bonus: 1, promo: 'Tặng 1 tháng' },
    { months: 12, label: '12 Tháng', bonus: 2, promo: 'Tặng 2 tháng' },
];

const DashboardMember: React.FC<DashboardMemberProps> = ({ user, classes, payments, notifications, onBookClass, onLogout, onUpdateUser, onRegisterPackage }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'subscription' | 'profile' | 'notifications'>('overview');
  
  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Modals state
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [settingsForm, setSettingsForm] = useState<Partial<User>>({});

  // Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer' | null>(null);

  // Subscription Planner State
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{id: string, label: string, days: string[], time: string, session: string} | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [billingCycle, setBillingCycle] = useState(1); // Default 1 month

  // Filter classes the user has booked
  const myClasses = classes.filter(cls => cls.students.some(s => s.id === user.id));
  
  // Check for pending payments
  const pendingPayments = payments.filter(p => p.status === 'Pending');
  const pendingPaymentsCount = pendingPayments.length;
  const totalPendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Last subscription for Quick Renewal
  const lastSubscription = payments.find(p => p.description.includes('Gói:') || p.id.startsWith('sub-'));

  // Filter slots for UI
  const morningSlots = SCHEDULE_SLOTS.filter(s => s.id.startsWith('MOR'));
  const eveningSlots = SCHEDULE_SLOTS.filter(s => s.id.startsWith('EV'));

  // Dynamic Greeting
  const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Chào buổi sáng tốt lành!";
      if (hour < 18) return "Chào buổi chiều tràn đầy năng lượng!";
      return "Chào buổi tối thư thái!";
  };
  
  const getQuote = () => {
      const quotes = [
          "Yoga là hành trình của cái tôi, thông qua cái tôi, đến với cái tôi.",
          "Hít vào tâm tĩnh lặng, thở ra miệng mỉm cười.",
          "Cơ thể bạn là ngôi đền, hãy giữ cho nó trong sạch và linh hồn bạn sẽ trú ngụ ở đó.",
          "Yoga không phải là chạm vào ngón chân, mà là những gì bạn học được trên đường đi xuống."
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const [dailyQuote, setDailyQuote] = useState(getQuote());
  useEffect(() => { setDailyQuote(getQuote()); }, []);


  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Paid': return 'text-green-600 bg-green-50 border border-green-200';
          case 'Pending': return 'text-orange-600 bg-orange-50 border border-orange-200';
          default: return 'text-red-600 bg-red-50 border border-red-200';
      }
  };

  const openSettings = () => {
    setSettingsForm({ ...user });
    setIsSettingsModalOpen(true);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser(settingsForm);
    setIsSettingsModalOpen(false);
  };

  const handleCopy = (text: string) => {
      navigator.clipboard.writeText(text);
      alert('Đã sao chép: ' + text);
  };

  const handleDownloadQR = async (url: string) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `VietQR_LuvYoga.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
          window.open(url, '_blank');
      }
  };

  // --- NEW SUBSCRIPTION LOGIC ---

  const handleSlotClick = (slot: typeof SCHEDULE_SLOTS[0]) => {
      setSelectedSlot(slot);
      setSelectedDays(slot.days); // Default select all available days
      setStartDate(new Date().toISOString().split('T')[0]);
      setBillingCycle(1); // Reset to 1 month
      setIsScheduleModalOpen(true);
  };

  const handleRenewClick = () => {
      if (!lastSubscription) return;
      alert("Tính năng gia hạn nhanh đang được cập nhật để tự động điền thông tin cũ!");
      setActiveTab('subscription');
  };

  const toggleDaySelection = (day: string) => {
      if (selectedDays.includes(day)) {
          setSelectedDays(prev => prev.filter(d => d !== day));
      } else {
          setSelectedDays(prev => [...prev, day]);
      }
  };

  const selectAllDays = () => {
      if (selectedSlot) {
          setSelectedDays(selectedSlot.days);
      }
  };

  const deselectAllDays = () => {
      setSelectedDays([]);
  };

  const calculatePackage = () => {
      const sessions = selectedDays.length;
      let monthlyPrice = 0;
      let planName = '';

      if (sessions >= 6) {
          monthlyPrice = 600000;
          planName = "Gói VIP (Full Tuần)";
      } else if (sessions === 5) {
          monthlyPrice = 540000;
          planName = "Gói Nâng Cao (5 buổi/tuần)";
      } else if (sessions === 4) {
          monthlyPrice = 500000;
          planName = "Gói Tùy Chọn (4 buổi/tuần)";
      } else if (sessions === 3) {
          monthlyPrice = 450000;
          planName = "Gói Cơ Bản (3 buổi/tuần)";
      } else if (sessions === 2) {
          monthlyPrice = 300000;
          planName = "Gói Nhẹ Nhàng (2 buổi/tuần)";
      } else if (sessions === 1) {
          monthlyPrice = 150000;
          planName = "Gói Trải Nghiệm (1 buổi/tuần)";
      } else {
           monthlyPrice = 0;
           planName = "Chưa chọn lịch";
      }

      // Calculate Total based on Billing Cycle
      const selectedCycle = BILLING_CYCLES.find(c => c.months === billingCycle) || BILLING_CYCLES[0];
      const totalPrice = monthlyPrice * selectedCycle.months;
      
      return { monthlyPrice, totalPrice, planName, sessions, cycle: selectedCycle };
  };

  const handleSubmitPackage = () => {
      if (!selectedSlot || selectedDays.length === 0) {
          alert("Vui lòng chọn ít nhất 1 buổi tập.");
          return;
      }
      if (!startDate) {
          alert("Vui lòng chọn ngày bắt đầu.");
          return;
      }

      const { totalPrice, planName, cycle } = calculatePackage();
      
      // Use time and session from the slot object properly
      const description = `Gói: ${planName}. Giờ: ${selectedSlot.time}. Các thứ: ${selectedDays.join(', ')}`;

      onRegisterPackage(planName, totalPrice, description, startDate, cycle.months, cycle.bonus);
      setIsScheduleModalOpen(false);
      setActiveTab('profile');
  };

  // Helper to format date nicely
  const formatDateDisplay = (dateStr: string) => {
      if (!dateStr) return '';
      const [y, m, d] = dateStr.split('-');
      return `${d}/${m}/${y}`;
  };

  // Professional A4 Invoice Print
  const handlePrintInvoice = (payment: Payment) => {
      const isPaid = payment.status === 'Paid';
      const statusTitle = isPaid ? 'HÓA ĐƠN THANH TOÁN' : 'PHIẾU YÊU CẦU THANH TOÁN';
      const statusEn = isPaid ? 'OFFICIAL RECEIPT' : 'PAYMENT REQUEST';
      const color = isPaid ? '#16a34a' : '#ea580c';
      const statusBadge = isPaid ? 'ĐÃ THANH TOÁN (PAID)' : 'CHƯA THANH TOÁN (UNPAID)';

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
          alert("Vui lòng cho phép mở cửa sổ popup để in hóa đơn.");
          return;
      }

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>LuvYoga Invoice - ${payment.id}</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;600;700&display=swap');
                body {
                    font-family: 'Quicksand', sans-serif;
                    background: #fdf4ff; /* Light purple bg similar to app */
                    margin: 0;
                    padding: 40px;
                    color: #333;
                }
                .invoice-container {
                    background: white;
                    max-width: 210mm; /* A4 width */
                    margin: 0 auto;
                    padding: 40px;
                    border: 1px solid #e5e5e5;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    position: relative;
                    min-height: 297mm; /* A4 Height */
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px solid #d8b4fe;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .logo-section img {
                    height: 80px;
                    width: auto;
                }
                .company-info {
                    text-align: right;
                    font-size: 14px;
                    color: #555;
                }
                .company-info h2 {
                    color: #4c1d95;
                    margin: 0 0 5px 0;
                    font-size: 24px;
                }
                .invoice-title {
                    text-align: center;
                    margin: 40px 0;
                }
                .invoice-title h1 {
                    font-size: 28px;
                    margin: 0;
                    color: #333;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }
                .invoice-title p {
                    font-size: 14px;
                    color: #777;
                    margin-top: 5px;
                    text-transform: uppercase;
                }
                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                    margin-bottom: 40px;
                }
                .info-box h3 {
                    font-size: 14px;
                    text-transform: uppercase;
                    color: #4c1d95;
                    border-bottom: 1px solid #f0abfc;
                    padding-bottom: 5px;
                    margin-bottom: 10px;
                }
                .info-box p {
                    margin: 4px 0;
                    font-size: 14px;
                }
                .status-badge {
                    display: inline-block;
                    padding: 8px 16px;
                    border: 2px solid ${color};
                    color: ${color};
                    font-weight: bold;
                    border-radius: 4px;
                    text-transform: uppercase;
                    font-size: 16px;
                    transform: rotate(-5deg);
                    margin-top: 10px;
                }
                .item-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 30px;
                }
                .item-table th {
                    background: #fdf4ff;
                    padding: 12px;
                    text-align: left;
                    font-weight: bold;
                    color: #4c1d95;
                    border-bottom: 2px solid #f0abfc;
                }
                .item-table td {
                    padding: 12px;
                    border-bottom: 1px solid #eee;
                }
                .total-section {
                    text-align: right;
                    margin-top: 20px;
                }
                .total-row {
                    font-size: 18px;
                    font-weight: bold;
                    color: #4c1d95;
                }
                .footer {
                    margin-top: 60px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    text-align: center;
                }
                .signature-box {
                    margin-top: 40px;
                }
                .signature-line {
                    border-top: 1px solid #ccc;
                    width: 80%;
                    margin: 50px auto 10px auto;
                }
                .payment-info {
                    background: #f9f9f9;
                    padding: 15px;
                    border-radius: 8px;
                    font-size: 12px;
                    text-align: left;
                    margin-top: 40px;
                }
                @media print {
                    body {
                        background: white;
                        padding: 0;
                    }
                    .invoice-container {
                        box-shadow: none;
                        border: none;
                        margin: 0;
                        width: 100%;
                        max-width: 100%;
                    }
                }
            </style>
        </head>
        <body>
            <div class="invoice-container">
                <!-- Header -->
                <div class="header">
                    <div class="logo-section">
                        <img src="${ASSETS.LOGO}" alt="Luv Yoga Logo" />
                    </div>
                    <div class="company-info">
                        <h2>Luv Yoga Sanctuary</h2>
                        <p>Ấp Nhân Hoà, Xã Tây Hoà, Trảng Bom, Đồng Nai</p>
                        <p>Hotline: 035 251 8855</p>
                        <p>Email: luvyoga.official@gmail.com</p>
                    </div>
                </div>

                <!-- Title -->
                <div class="invoice-title">
                    <h1>${statusTitle}</h1>
                    <p>${statusEn}</p>
                    <div class="status-badge">${statusBadge}</div>
                </div>

                <!-- Info Grid -->
                <div class="info-grid">
                    <div class="info-box">
                        <h3>Thông tin khách hàng / Customer</h3>
                        <p><strong>Họ tên:</strong> ${user.name}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>SĐT:</strong> ${user.phone || 'N/A'}</p>
                        <p><strong>Mã học viên:</strong> ${user.id}</p>
                    </div>
                    <div class="info-box">
                        <h3>Thông tin giao dịch / Transaction</h3>
                        <p><strong>Mã hóa đơn:</strong> #${payment.id}</p>
                        <p><strong>Ngày tạo:</strong> ${payment.date}</p>
                        <p><strong>Phương thức:</strong> ${payment.method === 'Transfer' ? 'Chuyển khoản (VietQR)' : 'Tiền mặt (Cash)'}</p>
                        <p><strong>Trạng thái:</strong> ${isPaid ? 'Thành công' : 'Chờ xử lý'}</p>
                    </div>
                </div>

                <!-- Items -->
                <table class="item-table">
                    <thead>
                        <tr>
                            <th width="60%">Nội dung / Description</th>
                            <th width="20%">Loại / Type</th>
                            <th width="20%" style="text-align:right">Thành tiền / Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${payment.description}</td>
                            <td>Dịch vụ Yoga</td>
                            <td style="text-align:right">${payment.amount.toLocaleString()} VND</td>
                        </tr>
                    </tbody>
                </table>

                <div class="total-section">
                    <p class="total-row">TỔNG CỘNG / TOTAL: ${payment.amount.toLocaleString()} VND</p>
                </div>

                <!-- Footer Signatures -->
                <div class="footer">
                    <div>
                        <p><strong>Người nộp tiền</strong></p>
                        <p>(Ký và ghi rõ họ tên)</p>
                        <div class="signature-box" style="height: 60px;"></div>
                        <p>${user.name}</p>
                    </div>
                    <div>
                        <p><strong>Luv Yoga Admin</strong></p>
                        <p>(Xác nhận thanh toán)</p>
                        <div class="signature-box">
                            ${isPaid ? '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Approved-stamp.svg/1200px-Approved-stamp.svg.png" height="60" style="opacity:0.7" />' : ''}
                        </div>
                        <p>${isPaid ? 'Đã duyệt / Approved' : ''}</p>
                    </div>
                </div>

                <div class="payment-info">
                    <strong>Thông tin chuyển khoản:</strong><br/>
                    Ngân hàng: Sacombank - CN Đồng Nai<br/>
                    Số tài khoản: 060209663387<br/>
                    Chủ tài khoản: NGUYEN TO UYEN
                </div>

                <div style="text-align: center; margin-top: 40px; font-size: 12px; color: #888;">
                    Cảm ơn bạn đã yêu thương và đồng hành cùng Luv Yoga!<br/>
                    Namaste.
                </div>
            </div>
            <script>
                window.onload = function() { window.print(); }
            </script>
        </body>
        </html>
      `;

      printWindow.document.write(htmlContent);
      printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-luv-bg font-sans">
      
      {/* FIXED HEADER */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 px-4 py-3 md:left-20 lg:left-64 transition-all h-[72px] flex items-center justify-between">
          <div className="flex flex-col justify-center">
              <h1 className="font-bold text-gray-800 text-lg flex items-center gap-2 leading-none mb-1.5">
                  <img src={ASSETS.LOGO} alt="LuvYoga" className="h-6 w-auto" />
                  <span className="hidden md:inline">Chào, {user.name} 🧘‍♀️</span>
              </h1>
              <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${user.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                      {user.status || 'Active'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-luv-primary/10 text-luv-dark border border-luv-primary/20">
                      {user.membershipType || 'Pay-per-class'}
                  </span>
              </div>
          </div>

          <div className="flex items-center gap-2">
              <button 
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className={`p-2 rounded-full transition-all relative ${isChatOpen ? 'bg-gradient-to-r from-luv-primary to-luv-secondary text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-purple-50 hover:text-luv-primary'}`}
              >
                   <Sparkles size={20} />
              </button>
              <button 
                  onClick={() => setActiveTab('notifications')} 
                  className={`relative p-2 rounded-full transition-all ${activeTab === 'notifications' ? 'bg-luv-primary text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                  <Bell size={20} />
                  {unreadNotifications > 0 && (
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                  )}
              </button>
              <button 
                  onClick={() => setActiveTab('profile')} 
                  className={`p-2 rounded-full transition-all ${activeTab === 'profile' ? 'bg-luv-primary text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                   <UserIcon size={20} />
              </button>
          </div>
      </div>

      {/* FLOATING CHAT WIDGET */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 md:inset-auto md:bottom-24 md:right-6 md:w-[380px] md:h-[550px] animate-fade-in-up flex flex-col">
            <div className="absolute inset-0 bg-black/50 md:hidden" onClick={() => setIsChatOpen(false)}></div>
            <div className="relative flex-1 md:flex-none h-full md:h-full z-10 p-4 md:p-0">
                <AIAssistant onClose={() => setIsChatOpen(false)} />
            </div>
        </div>
      )}

      {/* MAIN CONTENT WRAPPER */}
      <div className="pt-[80px] pb-24 md:pb-6 p-4 md:p-6 max-w-7xl mx-auto">

        {/* Navigation Pills (Sticky below Header) */}
        <div className="flex flex-wrap gap-2 bg-white p-1 rounded-xl shadow-sm border border-gray-100 mb-6 sticky top-[80px] z-30 mx-[-4px] md:mx-0 overflow-x-auto">
                <button onClick={() => setActiveTab('overview')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'overview' ? 'bg-luv-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>Tổng quan</button>
                <button onClick={() => setActiveTab('schedule')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'schedule' ? 'bg-luv-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>Lịch tập</button>
                <button onClick={() => setActiveTab('subscription')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex items-center justify-center gap-1 ${activeTab === 'subscription' ? 'bg-luv-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <Sparkles size={14} /> Đăng ký gói
                </button>
        </div>

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
            <div className="animate-fade-in space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Hồ sơ cá nhân</h2>
                
                {/* User Info Card */}
                <div className="bg-gradient-to-br from-luv-primary to-luv-dark text-white p-6 rounded-2xl shadow-lg flex items-center gap-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                    <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full border-4 border-white/30 bg-white/10 relative z-10" />
                    <div className="relative z-10 w-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-xl">{user.name}</h3>
                                <p className="text-white/80 text-sm mb-2">{user.email}</p>
                            </div>
                            <div className="inline-flex px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/10">
                                {user.membershipType || 'Thành viên'}
                            </div>
                        </div>
                        
                        {/* MEMBERSHIP VALIDITY */}
                        {user.membershipStartDate && user.membershipEndDate && (
                            <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-2 text-sm bg-white/10 p-2 rounded-lg">
                                <Clock size={16} className="text-white/80" />
                                <span>
                                    Hạn tập: <span className="font-bold">{formatDateDisplay(user.membershipStartDate)}</span> ➝ <span className="font-bold">{formatDateDisplay(user.membershipEndDate)}</span>
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Health Snapshot */}
                {(user.height || user.weight) && (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                            <span className="text-gray-400 text-xs font-bold uppercase">Chiều cao</span>
                            <span className="text-xl font-bold text-luv-dark">{user.height} cm</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                            <span className="text-gray-400 text-xs font-bold uppercase">Cân nặng</span>
                            <span className="text-xl font-bold text-luv-dark">{user.weight} kg</span>
                        </div>
                    </div>
                )}

                {/* Finance Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold text-gray-800">
                            <CreditCard className="text-luv-accent" size={20} />
                            <h3>Lịch sử học phí</h3>
                        </div>
                        {pendingPaymentsCount > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                {pendingPaymentsCount} cần thanh toán
                            </span>
                        )}
                    </div>
                    {payments.length === 0 ? (
                        <div className="p-8 text-center text-gray-400 text-sm">Chưa có giao dịch nào.</div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {payments.map(payment => (
                                <div key={payment.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                                    <div className="flex-1 min-w-0 pr-4">
                                        <p className="font-medium text-gray-800 text-sm line-clamp-1">{payment.description}</p>
                                        <p className="text-xs text-gray-500 mt-1">{payment.date}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="font-bold text-gray-800 text-sm">{payment.amount.toLocaleString()} đ</p>
                                        <div className="flex justify-end items-center gap-2 mt-1">
                                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${getStatusColor(payment.status)}`}>
                                                {payment.status === 'Paid' ? 'Đã thanh toán' : 'Chưa duyệt'}
                                            </span>
                                            {/* Invoice Print Button */}
                                            <button 
                                                onClick={() => handlePrintInvoice(payment)}
                                                className="p-1 text-gray-400 hover:text-luv-primary transition-colors"
                                                title={payment.status === 'Paid' ? 'In hóa đơn' : 'In phiếu yêu cầu'}
                                            >
                                                <FileText size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {pendingPaymentsCount > 0 && (
                        <div className="p-4 bg-orange-50 text-center">
                            <button 
                                onClick={() => {
                                    setIsPaymentModalOpen(true);
                                    setPaymentMethod(null);
                                }}
                                className="w-full py-2 bg-orange-500 text-white rounded-xl font-bold shadow-sm hover:bg-orange-600 transition-colors"
                            >
                                Thanh toán ngay ({totalPendingAmount.toLocaleString()} đ)
                            </button>
                        </div>
                    )}
                </div>

                {/* Account Actions */}
                <div className="space-y-3">
                     <button 
                        onClick={() => setIsAboutModalOpen(true)}
                        className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Info className="text-luv-accent" size={20} />
                            <span>Về Luv Yoga</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                    </button>
                    <button 
                        onClick={openSettings}
                        className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <UserIcon className="text-luv-accent" size={20} />
                            <span>Cài đặt tài khoản & Sức khỏe</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                    </button>
                    <button 
                        onClick={() => setIsContactModalOpen(true)}
                        className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Phone className="text-luv-accent" size={20} />
                            <span>Hỗ trợ & Liên hệ</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                    </button>
                </div>

                {/* Logout Button */}
                <button 
                    onClick={onLogout}
                    className="w-full p-4 mt-4 bg-red-50 text-red-500 rounded-xl font-bold shadow-sm border border-red-100 flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                >
                    <LogOut size={20} /> Đăng xuất
                </button>
            </div>
        )}

        {/* SUBSCRIPTION PLANNER TAB */}
        {activeTab === 'subscription' && (
            <div className="animate-fade-in space-y-6">
                <div className="bg-gradient-to-br from-luv-primary to-luv-secondary p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2">Chọn Khung Giờ Tập</h2>
                        <p className="opacity-90 max-w-lg">
                            Linh hoạt chọn lịch tập theo nhu cầu cá nhân.
                        </p>
                    </div>
                    <Sparkles size={120} className="absolute -right-4 -bottom-4 text-white opacity-20" />
                </div>

                {/* Quick Renewal Card */}
                {lastSubscription && (
                     <div className="bg-white p-5 rounded-2xl shadow-sm border border-luv-primary/30 ring-1 ring-luv-primary/10 flex items-center justify-between">
                         <div>
                             <h3 className="font-bold text-luv-dark flex items-center gap-2">
                                 <RotateCw size={18} /> Gia hạn nhanh
                             </h3>
                             <p className="text-sm text-gray-600 mt-1 line-clamp-1">{lastSubscription.description.split('(')[0]}</p>
                             <p className="text-xs text-gray-400 mt-1">Dựa trên đăng ký gần nhất</p>
                         </div>
                         <button 
                            onClick={handleRenewClick}
                            className="px-4 py-2 bg-luv-primary text-white rounded-lg font-bold text-sm shadow-sm hover:bg-luv-dark transition-colors"
                         >
                             Gia hạn
                         </button>
                     </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                    {SCHEDULE_SLOTS.map(slot => (
                        <div 
                            key={slot.id} 
                            onClick={() => handleSlotClick(slot)}
                            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-luv-primary cursor-pointer hover:shadow-md transition-all flex justify-between items-center group relative overflow-hidden"
                        >
                            {/* Visual Touch */}
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gray-100 group-hover:bg-luv-primary transition-colors"></div>

                            <div className="flex items-center gap-5 pl-2">
                                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex flex-col items-center justify-center text-luv-dark group-hover:bg-luv-primary group-hover:text-white transition-colors border border-purple-100 group-hover:border-luv-primary">
                                    <span className="text-[10px] font-bold uppercase opacity-70">{slot.session.split(' ')[0]}</span>
                                    <Clock size={20} className="mb-0.5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                        {slot.session}
                                        <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
                                             {slot.desc}
                                        </span>
                                    </h3>
                                    <p className="text-luv-dark font-bold text-xl font-mono mt-0.5">{slot.time}</p>
                                    <div className="flex gap-1 mt-2">
                                         {/* Day badges */}
                                        {DAYS.map(d => (
                                            <span key={d} className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${slot.days.includes(d) ? 'bg-purple-100 text-purple-700' : 'bg-gray-50 text-gray-300'}`}>
                                                {d}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="hidden md:block pr-4">
                                 <button className="px-4 py-2 bg-gray-50 text-luv-primary font-bold rounded-xl group-hover:bg-luv-primary group-hover:text-white transition-colors text-sm">
                                    Chọn lịch này
                                 </button>
                            </div>
                            <ChevronRight size={20} className="text-gray-300 group-hover:text-luv-primary md:hidden" />
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* REGISTRATION MODAL */}
        {isScheduleModalOpen && selectedSlot && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="p-4 border-b border-gray-100 bg-purple-50 flex justify-between items-center">
                        <div>
                            <p className="text-xs text-luv-dark font-bold uppercase">Đăng ký lịch tập</p>
                            <h3 className="text-lg font-bold text-gray-800">{selectedSlot.label}</h3>
                        </div>
                        <button onClick={() => setIsScheduleModalOpen(false)} className="bg-white p-2 rounded-full text-gray-500 hover:text-gray-800 shadow-sm"><X size={20} /></button>
                    </div>
                    
                    <div className="p-6 overflow-y-auto space-y-6">
                        
                        {/* Day Selection */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-bold text-gray-700">Chọn ngày trong tuần</label>
                                <div className="text-xs space-x-2">
                                    <button onClick={selectAllDays} className="text-luv-primary font-bold hover:underline">Chọn hết</button>
                                    <span className="text-gray-300">|</span>
                                    <button onClick={deselectAllDays} className="text-gray-500 hover:text-gray-700">Bỏ chọn</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {selectedSlot.days.map(day => {
                                    const isSelected = selectedDays.includes(day);
                                    return (
                                        <button 
                                            key={day}
                                            onClick={() => toggleDaySelection(day)}
                                            className={`py-2 px-3 rounded-xl text-sm font-bold transition-all border ${
                                                isSelected 
                                                ? 'bg-luv-primary text-white border-luv-primary shadow-sm' 
                                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                            }`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                <Calendar size={16} /> Ngày bắt đầu tập
                            </label>
                            <input 
                                type="date" 
                                value={startDate} 
                                onChange={(e) => setStartDate(e.target.value)} 
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-luv-primary outline-none font-medium text-gray-800"
                            />
                        </div>

                        {/* Billing Cycle Selection */}
                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                <Clock size={16} /> Thời hạn thanh toán
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {BILLING_CYCLES.map(cycle => (
                                    <button
                                        key={cycle.months}
                                        onClick={() => setBillingCycle(cycle.months)}
                                        className={`p-3 rounded-xl border text-left transition-all relative ${
                                            billingCycle === cycle.months
                                            ? 'bg-purple-50 border-luv-primary ring-1 ring-luv-primary'
                                            : 'bg-white border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="font-bold text-gray-800 text-sm">{cycle.label}</div>
                                        {cycle.promo && (
                                            <span className="text-[10px] text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                                                {cycle.promo}
                                            </span>
                                        )}
                                        {billingCycle === cycle.months && (
                                            <div className="absolute top-2 right-2 text-luv-primary">
                                                <CheckCircleIcon size={16} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Summary & Calculation */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Số buổi / tuần</span>
                                <span className="font-bold">{calculatePackage().sessions} buổi</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Gói áp dụng</span>
                                <span className="font-bold text-luv-primary">{calculatePackage().planName}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Thời hạn</span>
                                <span className="font-bold">{calculatePackage().cycle.label}</span>
                            </div>
                             {calculatePackage().cycle.bonus > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Tặng thêm</span>
                                    <span className="font-bold">+{calculatePackage().cycle.bonus} Tháng</span>
                                </div>
                            )}

                            <div className="border-t border-gray-200 my-2"></div>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-800">Tổng cộng</span>
                                <span className="font-bold text-xl text-luv-dark">{calculatePackage().totalPrice.toLocaleString()} đ</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-gray-100 flex gap-3">
                        <button onClick={() => setIsScheduleModalOpen(false)} className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors">Hủy</button>
                        <button 
                            onClick={handleSubmitPackage}
                            className="flex-[2] py-3 bg-luv-dark text-white rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <Save size={18} /> Xác nhận đăng ký
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === 'notifications' && (
            <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Thông báo</h2>
                    <button className="text-xs text-luv-primary font-bold">Đánh dấu đã đọc</button>
                </div>
                
                <div className="space-y-4">
                        {notifications.length === 0 ? (
                            <div className="text-center py-12 text-gray-400 flex flex-col items-center">
                                <Bell size={48} className="mb-4 opacity-20" />
                                <p>Bạn chưa có thông báo nào.</p>
                            </div>
                        ) : (
                            notifications.map(notif => (
                                <div key={notif.id} className={`p-4 rounded-xl flex items-start gap-4 shadow-sm border ${notif.read ? 'bg-white border-gray-100' : 'bg-white border-luv-primary/30 ring-1 ring-luv-primary/10'}`}>
                                    <div className={`p-2 rounded-full shrink-0 ${notif.type === 'alert' ? 'bg-red-100 text-red-500' : notif.type === 'success' ? 'bg-green-100 text-green-500' : 'bg-blue-100 text-blue-500'}`}>
                                        <Info size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`font-semibold ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>{notif.title}</h4>
                                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{notif.message}</p>
                                        <span className="text-xs text-gray-400 mt-2 block">{notif.date}</span>
                                    </div>
                                    {!notif.read && <span className="w-2 h-2 rounded-full bg-luv-primary shrink-0 mt-2"></span>}
                                </div>
                            ))
                        )}
                </div>
            </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
            <div className="grid grid-cols-1 gap-8 animate-fade-in">
                
                {/* 1. Dynamic Greeting & Quote */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                     <h2 className="text-2xl font-bold text-gray-800 mb-2">{dailyQuote ? getGreeting() : "Chào mừng bạn trở lại!"}</h2>
                     <p className="text-gray-600 italic border-l-4 border-luv-secondary pl-4 py-1">
                         "{dailyQuote}"
                     </p>
                </div>

                {/* 2. Next Class Widget (Highlight) */}
                {myClasses.length > 0 ? (
                    <div className="bg-gradient-to-r from-luv-dark to-purple-800 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Clock size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2 opacity-80 text-sm uppercase font-bold tracking-wider">
                                <CalendarCheck size={16} /> Lớp sắp tới của bạn
                            </div>
                            <h3 className="text-3xl font-bold mb-4">{myClasses[0].title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm font-medium">
                                <div className="bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-2 backdrop-blur-sm">
                                    <Clock size={16}/> {myClasses[0].startTime}
                                </div>
                                <div className="bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-2 backdrop-blur-sm">
                                    <Calendar size={16}/> {formatDateDisplay(myClasses[0].date)}
                                </div>
                                <div className="bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-2 backdrop-blur-sm">
                                    <MapPin size={16}/> Studio
                                </div>
                            </div>
                            <div className="mt-6">
                                <button className="bg-white text-luv-dark px-6 py-2 rounded-full font-bold shadow-md hover:bg-gray-100 transition-colors">
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                     <div className="bg-gray-50 border border-gray-200 border-dashed p-8 rounded-2xl text-center">
                        <p className="text-gray-500 mb-2">Bạn chưa có lịch tập sắp tới.</p>
                        <button onClick={() => setActiveTab('schedule')} className="text-luv-dark font-bold hover:underline">
                            Đăng ký lớp ngay →
                        </button>
                    </div>
                )}

                {/* 3. Promotions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-pink-500 to-rose-400 p-5 rounded-2xl text-white shadow-md relative overflow-hidden group">
                         <div className="absolute right-[-20px] bottom-[-20px] opacity-20 group-hover:scale-110 transition-transform">
                             <Award size={100} />
                         </div>
                         <h3 className="font-bold text-xl mb-1">Đăng ký 6 Tháng</h3>
                         <p className="text-white/90 text-sm mb-3">Tặng ngay 01 tháng tập luyện miễn phí.</p>
                         <button onClick={() => setActiveTab('subscription')} className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-sm transition-colors">Tìm hiểu thêm</button>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-500 to-blue-400 p-5 rounded-2xl text-white shadow-md relative overflow-hidden group">
                         <div className="absolute right-[-20px] bottom-[-20px] opacity-20 group-hover:scale-110 transition-transform">
                             <Sparkles size={100} />
                         </div>
                         <h3 className="font-bold text-xl mb-1">Gói năm 12 Tháng</h3>
                         <p className="text-white/90 text-sm mb-3">Tặng 02 tháng + Quà tặng độc quyền.</p>
                         <button onClick={() => setActiveTab('subscription')} className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-sm transition-colors">Tìm hiểu thêm</button>
                    </div>
                </div>

                {/* 4. Membership Policies */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                        <ShieldCheck className="text-luv-accent" size={24} />
                        Chính sách Hội phí & Quyền lợi
                    </h3>
                    <div className="space-y-6">
                        {/* Billing Cycle */}
                        <div className="flex gap-4">
                            <div className="bg-blue-50 text-blue-600 p-3 rounded-xl h-fit shrink-0"><Calendar size={24} /></div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">Chu kỳ tính phí</h4>
                                <ul className="text-sm text-gray-600 mt-1 space-y-1 list-disc pl-4">
                                    <li><span className="font-semibold text-gray-700">Trước ngày 15:</span> Tính từ ngày tập đầu tiên đến hết ngày 14 của tháng đó.</li>
                                    <li><span className="font-semibold text-gray-700">Sau ngày 15:</span> Tính từ ngày tập đầu tiên đến hết ngày 14 của tháng sau.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Reservation */}
                        <div className="flex gap-4">
                            <div className="bg-purple-50 text-purple-600 p-3 rounded-xl h-fit shrink-0"><RotateCw size={24} /></div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">Bảo lưu gói tập</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    Dành cho hội viên đóng từ <span className="font-bold">3 tháng</span> trở lên. 
                                    Vui lòng báo ngưng trước khi tháng thứ 2 bắt đầu để được bảo lưu.
                                </p>
                            </div>
                        </div>

                        {/* Refund Policy */}
                        <div className="flex gap-4">
                            <div className="bg-orange-50 text-orange-600 p-3 rounded-xl h-fit shrink-0"><Banknote size={24} /></div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">Hoàn trả hội phí</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    Áp dụng cho gói <span className="font-bold">6 tháng</span> trở lên khi báo nghỉ hẳn.
                                </p>
                                <div className="bg-gray-50 p-2 rounded-lg mt-2 text-xs border border-gray-200">
                                    <p>Hoàn tiền = (Số buổi còn lại) x 35.000đ</p>
                                    <p className="text-gray-400 mt-0.5">Thời gian hoàn trả: Ngày 15 của tháng tiếp theo.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )}

        {/* SCHEDULE TAB */}
        {activeTab === 'schedule' && (
            <div className="animate-fade-in space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <LayoutDashboard className="text-luv-accent" /> Lịch tập
                    </h2>
                </div>

                {/* MY SCHEDULE SECTION */}
                {myClasses.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-luv-dark mb-4 flex items-center gap-2">
                    <CalendarCheck size={24} /> Lịch của bạn
                    </h3>
                    <ScheduleCalendar 
                        classes={myClasses} 
                        role={UserRole.MEMBER} 
                        currentUserId={user.id}
                        onBookClass={(id) => onBookClass(id)} // Re-mapped simple booking
                    />
                    <div className="w-full border-t border-gray-200 my-8"></div>
                </div>
                )}

                {/* Standard Schedule Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Community Schedule */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Clock size={80} />
                        </div>
                        <h3 className="font-bold text-lg text-luv-dark mb-4 flex items-center gap-2">
                            <Clock size={20} /> Lớp Cộng Đồng
                        </h3>
                        
                        <div className="space-y-6">
                            {/* Morning Block */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Sun size={12} /> Buổi Sáng (T2 - T7)
                                </h4>
                                <div className="space-y-2">
                                    {morningSlots.map(slot => (
                                        <div key={slot.id} className={`flex items-center justify-between p-3 rounded-xl border ${slot.isNew ? 'bg-purple-50 border-luv-primary/30' : 'bg-gray-50 border-gray-100'}`}>
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${slot.isNew ? 'bg-white text-luv-primary' : 'bg-white text-gray-400'}`}>
                                                    <slot.icon size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 text-sm">
                                                        {slot.time.split(' - ')[0]} 
                                                        <span className="text-gray-400 mx-1">➔</span> 
                                                        {slot.time.split(' - ')[1]}
                                                    </p>
                                                    <p className="text-[10px] text-gray-500 uppercase font-semibold">{slot.desc}</p>
                                                </div>
                                            </div>
                                            {slot.isNew && (
                                                <span className="text-[10px] font-bold bg-luv-primary text-white px-2 py-0.5 rounded-full">MỚI</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Evening Block */}
                             <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Moon size={12} /> Buổi Chiều / Tối (T2 - T6)
                                </h4>
                                <div className="space-y-2">
                                    {eveningSlots.map(slot => (
                                        <div key={slot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-white text-gray-400">
                                                    <slot.icon size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 text-sm">
                                                        {slot.time.split(' - ')[0]} 
                                                        <span className="text-gray-400 mx-1">➔</span> 
                                                        {slot.time.split(' - ')[1]}
                                                    </p>
                                                    <p className="text-[10px] text-gray-500 uppercase font-semibold">{slot.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Therapy Support */}
                    <div className="bg-gradient-to-br from-white to-pink-50 p-6 rounded-2xl shadow-sm border border-pink-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Heart size={64} />
                        </div>
                        <h3 className="font-bold text-lg text-pink-800 mb-4 flex items-center gap-2">
                            <Heart size={20} /> Trị Liệu & Phục Hồi
                        </h3>
                        <p className="text-xs text-gray-500 italic mb-3">* Vui lòng đặt lịch trước</p>
                        <div className="space-y-3">
                            <div>
                                <span className="text-xs font-bold text-gray-500 uppercase">Khung giờ</span>
                                <div className="flex gap-2 mt-1">
                                    <span className="px-2 py-1 bg-white rounded-md text-sm text-gray-700 border border-pink-100">13:00 - 15:00</span>
                                    <span className="px-2 py-1 bg-white rounded-md text-sm text-gray-700 border border-pink-100">15:00 - 17:00</span>
                                </div>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-gray-500 uppercase">Dịch vụ</span>
                                <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                                    Cổ-Vai-Gáy, Đau thắt lưng, Giãn tĩnh mạch, Thần kinh toạ, Giãn cơ thể thao, Cải thiện tư thế, Cải thiện giấc ngủ / Tiền đình...
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 1:1 Coaching */}
                    <div className="bg-gradient-to-br from-white to-indigo-50 p-6 rounded-2xl shadow-sm border border-indigo-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Award size={64} />
                        </div>
                        <h3 className="font-bold text-lg text-indigo-900 mb-4 flex items-center gap-2">
                            <Award size={20} /> Kèm Riêng 1:1
                        </h3>
                        <p className="text-xs text-gray-500 italic mb-3">Offline (trong 10km) hoặc Online</p>
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs font-bold text-gray-500 uppercase">Các khung giờ</span>
                                <ul className="mt-2 space-y-1">
                                    <li className="text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> 13:00 ➔ 14:30
                                    </li>
                                    <li className="text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> 15:00 ➔ 16:30
                                    </li>
                                    <li className="text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> 20:30 ➔ 22:00
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-100"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-luv-bg px-3 text-sm text-gray-400">Tất cả lớp học đang mở</span>
                    </div>
                </div>

                {/* Dynamic Class List */}
                {classes.length === 0 ? (
                    <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
                        <Info size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-700">Hiện chưa có lớp học mới</h3>
                        <p className="text-gray-500">Vui lòng tham khảo khung giờ cố định bên trên hoặc liên hệ Aivy để được hỗ trợ.</p>
                    </div>
                ) : (
                    <ScheduleCalendar 
                        classes={classes} 
                        role={UserRole.MEMBER} 
                        currentUserId={user.id}
                        onBookClass={onBookClass} 
                    />
                )}
            </div>
        )}

        {/* PAYMENT SELECTION MODAL */}
        {isPaymentModalOpen && (
             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                 <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
                     {/* Header */}
                     <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                         <div>
                             <h3 className="text-lg font-bold text-gray-800">Thanh toán học phí</h3>
                             <p className="text-xs text-gray-500">Số dư cần thanh toán: <span className="font-bold text-orange-600 text-sm">{totalPendingAmount.toLocaleString()} đ</span></p>
                         </div>
                         <button onClick={() => setIsPaymentModalOpen(false)} className="bg-white p-2 rounded-full text-gray-500 hover:text-gray-800 shadow-sm"><X size={20} /></button>
                     </div>

                     <div className="p-6 overflow-y-auto">
                        {!paymentMethod ? (
                            <div className="space-y-3">
                                <button 
                                    onClick={() => setPaymentMethod('cash')}
                                    className="w-full p-4 rounded-xl border border-gray-200 hover:border-luv-primary hover:bg-purple-50 transition-all flex items-center gap-4 group text-left"
                                >
                                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-luv-primary group-hover:text-white transition-colors">
                                        <Banknote size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">Tiền mặt</h4>
                                        <p className="text-xs text-gray-500">Thanh toán trực tiếp tại lớp học</p>
                                    </div>
                                    <ChevronRight className="ml-auto text-gray-300 group-hover:text-luv-primary" />
                                </button>

                                <button 
                                    onClick={() => setPaymentMethod('transfer')}
                                    className="w-full p-4 rounded-xl border border-gray-200 hover:border-luv-primary hover:bg-purple-50 transition-all flex items-center gap-4 group text-left"
                                >
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-luv-primary group-hover:text-white transition-colors">
                                        <QrCode size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">Chuyển khoản (QR Code)</h4>
                                        <p className="text-xs text-gray-500">Sacombank - Nhanh chóng & Tiện lợi</p>
                                    </div>
                                    <ChevronRight className="ml-auto text-gray-300 group-hover:text-luv-primary" />
                                </button>
                            </div>
                        ) : paymentMethod === 'cash' ? (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                    <Banknote size={32} />
                                </div>
                                <h4 className="font-bold text-gray-800 text-lg">Thanh toán Tiền mặt</h4>
                                <p className="text-gray-600 text-sm">
                                    Vui lòng đóng học phí trực tiếp cho giáo viên hoặc lễ tân tại lớp học trong buổi tập tiếp theo của bạn.
                                </p>
                                <button onClick={() => setIsPaymentModalOpen(false)} className="w-full py-3 bg-luv-dark text-white hover:bg-gray-800 font-bold rounded-xl transition-colors shadow-lg">
                                    Xác nhận thanh toán
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <button onClick={() => setPaymentMethod(null)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-2">
                                    <ArrowLeft size={16} /> Quay lại
                                </button>

                                {/* QR Code Display - VietQR API */}
                                <div className="flex flex-col items-center">
                                    <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm mb-3">
                                         <img 
                                            src={`https://img.vietqr.io/image/STB-060209663387-compact.png?amount=${totalPendingAmount}&addInfo=Hoc Phi ${user.name.split(' ').pop()}&accountName=NGUYEN TO UYEN`} 
                                            alt="VietQR Sacombank" 
                                            className="w-48 h-48 object-contain"
                                         />
                                    </div>
                                    <button 
                                        onClick={() => handleDownloadQR(`https://img.vietqr.io/image/STB-060209663387-compact.png?amount=${totalPendingAmount}&addInfo=Hoc Phi ${user.name.split(' ').pop()}&accountName=NGUYEN TO UYEN`)}
                                        className="text-xs text-luv-primary font-bold hover:underline flex items-center gap-1"
                                    >
                                        <Download size={14} /> Tải ảnh QR
                                    </button>
                                </div>

                                {/* Bank Details */}
                                <div className="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-100 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Ngân hàng</span>
                                        <span className="font-bold text-blue-700">Sacombank</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Chủ tài khoản</span>
                                        <span className="font-bold text-gray-800 uppercase">NGUYEN TO UYEN</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Số tài khoản</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-gray-800 text-lg">060209663387</span>
                                            <button onClick={() => handleCopy('060209663387')} className="text-gray-400 hover:text-luv-primary"><Copy size={14}/></button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                        <span className="text-gray-500">Số tiền</span>
                                        <span className="font-bold text-orange-600 text-lg">{totalPendingAmount.toLocaleString()} đ</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Nội dung</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-800">Hoc Phi {user.name}</span>
                                            <button onClick={() => handleCopy(`Hoc Phi ${user.name}`)} className="text-gray-400 hover:text-luv-primary"><Copy size={14}/></button>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={() => setIsPaymentModalOpen(false)} className="w-full py-3 bg-luv-dark text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                    <Check size={18} /> Đã chuyển khoản
                                </button>
                            </div>
                        )}
                     </div>
                 </div>
             </div>
        )}

        {/* SETTINGS MODAL */}
        {isSettingsModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-800">Cài đặt tài khoản & Sức khỏe</h3>
                        <button onClick={() => setIsSettingsModalOpen(false)} className="bg-gray-50 p-2 rounded-full text-gray-500 hover:text-gray-800"><X size={20} /></button>
                    </div>
                    <div className="overflow-y-auto p-6 space-y-6">
                        <form id="settings-form" onSubmit={handleSaveSettings}>
                            {/* Personal Section */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2"><UserIcon size={16} /> Thông tin cá nhân</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                                        <input type="text" value={settingsForm.name || ''} onChange={(e) => setSettingsForm({...settingsForm, name: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-luv-primary outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email (Không thể thay đổi)</label>
                                        <input type="email" value={settingsForm.email || ''} disabled className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                                            <input type="tel" value={settingsForm.phone || ''} onChange={(e) => setSettingsForm({...settingsForm, phone: e.target.value})} placeholder="09xxxx..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-luv-primary outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                                            <input type="date" value={settingsForm.birthdate || ''} onChange={(e) => setSettingsForm({...settingsForm, birthdate: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-luv-primary outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-6 border-gray-100" />

                            {/* Health Section */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2"><Activity size={16} /> Chỉ số sức khỏe</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Chiều cao (cm)</label>
                                        <input type="number" value={settingsForm.height || ''} onChange={(e) => setSettingsForm({...settingsForm, height: Number(e.target.value)})} placeholder="160" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-luv-primary outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Cân nặng (kg)</label>
                                        <input type="number" value={settingsForm.weight || ''} onChange={(e) => setSettingsForm({...settingsForm, weight: Number(e.target.value)})} placeholder="50" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-luv-primary outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                        <HeartPulse size={14} className="text-red-500" /> Ghi chú sức khỏe (bệnh lý, chấn thương...)
                                    </label>
                                    <textarea 
                                        rows={3} 
                                        value={settingsForm.healthNotes || ''} 
                                        onChange={(e) => setSettingsForm({...settingsForm, healthNotes: e.target.value})} 
                                        placeholder="Ví dụ: Đau lưng dưới, thoái hóa đốt sống cổ..." 
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-luv-primary outline-none"
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                        <button onClick={() => setIsSettingsModalOpen(false)} className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors mr-2">Hủy</button>
                        <button type="submit" form="settings-form" className="px-5 py-2 bg-luv-dark text-white font-bold rounded-lg shadow-md hover:bg-gray-800 transition-colors flex items-center gap-2">
                            <Save size={18} /> Lưu Thay Đổi
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* ABOUT MODAL */}
        {isAboutModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
                     <div className="bg-gradient-to-br from-luv-primary to-luv-secondary p-8 text-center text-white relative">
                            <button onClick={() => setIsAboutModalOpen(false)} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-colors"><X size={20} /></button>
                            <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-4xl shadow-lg border-4 border-white/30">
                                🧘‍♀️
                            </div>
                            <h3 className="text-2xl font-bold">Về Luv Yoga</h3>
                            <p className="opacity-90 text-sm mt-1">Nơi nuôi dưỡng tâm hồn và sức khỏe</p>
                    </div>
                    <div className="p-6 overflow-y-auto space-y-6">
                        <div className="text-center space-y-2">
                            <p className="text-gray-600 leading-relaxed italic">
                                "Luv Yoga không chỉ là nơi tập luyện, mà là ngôi nhà chung để mọi người cùng nhau chia sẻ, kết nối và tìm lại sự cân bằng trong cuộc sống."
                            </p>
                        </div>
                        
                        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                             <h4 className="font-bold text-luv-dark mb-3 flex items-center gap-2"><Award size={18} /> Chứng Chỉ HLV</h4>
                             <ul className="space-y-3 text-sm text-gray-700">
                                <li className="flex items-start gap-3">
                                    <Check className="text-green-500 mt-0.5 shrink-0" size={16} />
                                    <span>Alliance Yoga (Mỹ): Giáo viên Yoga Quốc tế 200H</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="text-green-500 mt-0.5 shrink-0" size={16} />
                                    <span>Alliance Yoga (Mỹ): Giáo viên Yoga phục hồi 100H</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="text-green-500 mt-0.5 shrink-0" size={16} />
                                    <span>Cục Thể Dục Thể Thao: Người hướng dẫn Yoga</span>
                                </li>
                            </ul>
                        </div>

                         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                             <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2"><Heart size={18} /> Giá Trị Cốt Lõi</h4>
                             <div className="grid grid-cols-2 gap-3 text-sm">
                                 <div className="bg-white p-2 rounded shadow-sm text-center font-semibold text-gray-700">Tận Tâm</div>
                                 <div className="bg-white p-2 rounded shadow-sm text-center font-semibold text-gray-700">Chuyên Nghiệp</div>
                                 <div className="bg-white p-2 rounded shadow-sm text-center font-semibold text-gray-700">Kết Nối</div>
                                 <div className="bg-white p-2 rounded shadow-sm text-center font-semibold text-gray-700">Bình An</div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* CONTACT MODAL */}
        {isContactModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
                    <button onClick={() => setIsContactModalOpen(false)} className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full text-gray-500 hover:text-gray-800"><X size={20} /></button>
                    
                    <div className="bg-gradient-to-br from-luv-primary to-luv-secondary p-8 text-center text-white">
                            <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-4xl shadow-lg">
                                📞
                            </div>
                            <h3 className="text-2xl font-bold">Liên Hệ</h3>
                            <p className="opacity-90">Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
                    </div>

                    <div className="p-6 space-y-4">
                            <a href="https://maps.google.com/?q=Ấp Nhân Hoà, Xã Tây Hoà, Huyện Trảng Bom, Tỉnh Đồng Nai" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="bg-red-50 text-red-500 p-3 rounded-full shrink-0"><MapPin size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Địa chỉ</h4>
                                    <p className="text-sm text-gray-600 mt-1">Ấp Nhân Hoà, Xã Tây Hoà, Huyện Trảng Bom, Tỉnh Đồng Nai</p>
                                </div>
                            </a>

                            <a href="tel:0352518855" className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="bg-green-50 text-green-500 p-3 rounded-full shrink-0"><Phone size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Hotline</h4>
                                    <p className="text-sm text-gray-600 mt-1">035 251 8855</p>
                                </div>
                            </a>

                            <a href="mailto:luvyoga.official@gmail.com" className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="bg-orange-50 text-orange-500 p-3 rounded-full shrink-0"><Mail size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Email</h4>
                                    <p className="text-sm text-gray-600 mt-1">luvyoga.official@gmail.com</p>
                                </div>
                            </a>
                            
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                <a href="https://www.facebook.com/LuvYoga.Official" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                                    <Facebook size={24} className="mb-2" />
                                    <span className="text-xs font-bold">Facebook</span>
                                </a>
                                <a href="https://www.instagram.com/luvyoga.official" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition-colors">
                                    <Instagram size={24} className="mb-2" />
                                    <span className="text-xs font-bold">Instagram</span>
                                </a>
                            </div>

                            <a href="https://m.me/LuvYoga.Official" target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-luv-dark text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-gray-800 transition-colors">
                                <MessageSquare size={18} /> Chat Messenger
                            </a>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

// CheckCircleIcon for custom usage
const CheckCircleIcon: React.FC<{size: number}> = ({size}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

export default DashboardMember;
