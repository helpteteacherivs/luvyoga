
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, UserRole, YogaClass, Payment, Notification } from './types';
import DashboardMember from './components/DashboardMember';
import DashboardAdmin from './components/DashboardAdmin';
import { LogOut, Lock, Mail, Facebook, Chrome } from 'lucide-react';
import { ASSETS } from './constants';
// import { auth, googleProvider, facebookProvider, db } from './services/firebaseConfig';
// import { signInWithPopup } from 'firebase/auth';
// import { doc, getDoc, setDoc } from 'firebase/firestore';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [classes, setClasses] = useState<YogaClass[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const location = useLocation();
  const navigate = useNavigate();

  // --- REAL-TIME NOTIFICATION MONITORING ---
  // In a real Firebase app, this would be an onSnapshot listener on the 'notifications' collection
  useEffect(() => {
    if (!user || user.role !== UserRole.MEMBER) return;

    // Watch for payment status changes to 'Paid' and trigger notification
    const paidPayments = payments.filter(p => p.status === 'Paid' && p.userId === user.id);
    
    // Simple logic: If we find a paid payment that doesn't have a corresponding notification, add it
    // Note: In production, this logic belongs in the backend Cloud Function
    paidPayments.forEach(p => {
        const notifId = `notif-pay-${p.id}`;
        const alreadyNotified = notifications.some(n => n.id === notifId);
        
        if (!alreadyNotified) {
            const newNotif: Notification = {
                id: notifId,
                title: 'Thanh toán thành công',
                message: `Thanh toán cho "${p.description}" đã được xác nhận.`,
                date: new Date().toLocaleDateString(),
                read: false,
                type: 'success'
            };
            setNotifications(prev => [newNotif, ...prev]);
        }
    });

  }, [payments, user]);


  // Initial Data Setup
  useEffect(() => {
    // Check for admin route
    if (location.pathname === '/admin') {
      setIsAdminLogin(true);
    }

    // Initialize Classes (Mock Data - Would be fetched from Firestore)
    const initialClasses: YogaClass[] = [
      {
        id: '1',
        title: 'Morning Flow (Sáng sớm)',
        instructor: 'Sarah Nguyễn',
        date: '2025-05-15', // Placeholder, UI uses schedule
        startTime: '04:45',
        duration: 75,
        capacity: 15,
        enrolled: 8,
        price: 0, // Determined by package usually
        level: 'Intermediate',
        description: 'Đánh thức cơ thể với chuỗi chào mặt trời và các tư thế vặn xoắn thải độc.',
        image: 'https://images.unsplash.com/photo-1599447421405-075115d6e33e?q=80&w=2069&auto=format&fit=crop',
        students: [],
        schedule: 'T2, T3, T4, T5, T6, T7',
        code: 'MOR445',
        pricingOptions: [
            { title: '1 Buổi (Drop-in)', price: 100000, description: 'Vé lẻ 1 buổi sáng' },
            { title: 'Gói Tuần (6 buổi)', price: 500000, description: 'Combo tuần sáng' }
        ]
      },
      {
        id: '2',
        title: 'Sunrise Yoga (Sáng)',
        instructor: 'Minh An',
        date: '2025-05-15',
        startTime: '06:45',
        duration: 75,
        capacity: 15,
        enrolled: 12,
        price: 0,
        level: 'Beginner',
        description: 'Lớp học nhẹ nhàng tập trung vào hơi thở và căn chỉnh tư thế cơ bản.',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop',
        students: [],
        schedule: 'T2, T3, T4, T5, T6, T7',
        code: 'MOR645',
        pricingOptions: [
            { title: '1 Buổi (Drop-in)', price: 100000, description: 'Vé lẻ 1 buổi sáng' },
            { title: 'Gói Tuần (6 buổi)', price: 500000, description: 'Combo tuần sáng' }
        ]
      },
      {
         id: '3',
         title: 'Yoga Cơ Bản (Mới)',
         instructor: 'Hương Trần',
         date: '2025-05-15',
         startTime: '08:30',
         duration: 75,
         capacity: 10,
         enrolled: 5,
         price: 0,
         level: 'Beginner',
         description: 'Lớp chuyên biệt dành cho người mới bắt đầu làm quen với Yoga.',
         image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop',
         students: [],
         schedule: 'T2, T3, T4, T5, T6, T7',
         code: 'MOR830'
      },
      {
        id: '4',
        title: 'Afternoon Stretch (Chiều)',
        instructor: 'Lan Vy',
        date: '2025-05-15',
        startTime: '17:30',
        duration: 75,
        capacity: 20,
        enrolled: 18,
        price: 0,
        level: 'Intermediate',
        description: 'Giãn cơ sâu, giảm căng thẳng sau một ngày làm việc.',
        image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=2026&auto=format&fit=crop',
        students: [],
        schedule: 'T2, T3, T4, T5, T6',
        code: 'EV530',
         pricingOptions: [
            { title: '1 Buổi (Drop-in)', price: 120000, description: 'Vé lẻ 1 buổi chiều' },
            { title: 'Gói Tuần (5 buổi)', price: 550000, description: 'Combo tuần chiều' }
        ]
      },
      {
        id: '5',
        title: 'Evening Flow (Tối)',
        instructor: 'Sarah Nguyễn',
        date: '2025-05-15',
        startTime: '19:10',
        duration: 75,
        capacity: 20,
        enrolled: 20,
        price: 0,
        level: 'Advanced',
        description: 'Chuỗi bài tập Vinyasa mạnh mẽ giúp tăng cường sức bền.',
        image: 'https://images.unsplash.com/photo-1573590330099-d6c7355ec595?q=80&w=2070&auto=format&fit=crop',
        students: [],
        schedule: 'T2, T3, T4, T5, T6',
        code: 'EV710',
         pricingOptions: [
            { title: '1 Buổi (Drop-in)', price: 120000, description: 'Vé lẻ 1 buổi tối' },
            { title: 'Gói Tuần (5 buổi)', price: 550000, description: 'Combo tuần tối' }
        ]
      }
    ];
    setClasses(initialClasses);
    
    // Notifications (Mock)
    setNotifications([
       { id: '1', title: 'Chào mừng đến Luv Yoga', message: 'Cảm ơn bạn đã tham gia cộng đồng Luv Yoga. Hãy đặt lịch ngay!', date: 'Hôm nay', read: false, type: 'info' },
       { id: '2', title: 'Lịch nghỉ lễ', message: 'Phòng tập sẽ nghỉ lễ vào ngày 30/4 và 1/5.', date: 'Hôm qua', read: true, type: 'alert' }
    ]);

  }, [location]);

  // Handlers
  const handleMemberLogin = async (provider: string) => {
    // FIREBASE INTEGRATION TODO:
    // 1. Uncomment imports
    // 2. Use this logic:
    /*
    try {
        const authProvider = provider === 'google' ? googleProvider : facebookProvider;
        const result = await signInWithPopup(auth, authProvider);
        const user = result.user;
        
        // Check/Create User in Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);
        
        let appUser: User;
        
        if (userSnap.exists()) {
            appUser = userSnap.data() as User;
        } else {
            appUser = {
                id: user.uid,
                name: user.displayName || 'User',
                email: user.email || '',
                role: UserRole.MEMBER,
                avatar: user.photoURL || ASSETS.DEFAULT_AVATAR,
                joinDate: new Date().toLocaleDateString(),
                membershipType: 'Pay-per-class',
                status: 'Active'
            };
            await setDoc(userDocRef, appUser);
        }
        setUser(appUser);
    } catch (error) {
        console.error("Login failed", error);
    }
    */

    // MOCK LOGIN FALLBACK
    const newUser: User = {
      id: 'user-' + Date.now(),
      name: provider === 'google' ? 'Google User' : 'Facebook User', 
      email: `user@${provider}.com`,
      role: UserRole.MEMBER,
      avatar: provider === 'google' 
        ? ASSETS.DEFAULT_AVATAR
        : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop',
      joinDate: new Date().toLocaleDateString(),
      membershipType: 'Pay-per-class',
      status: 'Active'
    };
    setUser(newUser);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const validAdmins = ['n.bi2993@gmail.com', 'luvyoga.official@gmail.com'];

    if (validAdmins.includes(email) && password === 'admin') {
      const adminUser: User = {
        id: 'admin-1',
        name: 'Luv Yoga Admin',
        email: email,
        role: UserRole.ADMIN,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop',
        joinDate: '2023-01-01',
        status: 'Active'
      };
      setUser(adminUser);
    } else {
      alert("Email hoặc mật khẩu không đúng!");
    }
  };

  const handleLogout = () => {
    // auth.signOut(); // Firebase signout
    setUser(null);
    if (isAdminLogin) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  // --- MEMBER ACTIONS ---

  const handleUpdateUser = (updates: Partial<User>) => {
      if (user) {
          // Firestore Update Logic would go here
          // updateDoc(doc(db, "users", user.id), updates);
          setUser({ ...user, ...updates });
      }
  };

  const handleBookClass = (classId: string, pricingOption?: { title: string, price: number }) => {
    if (!user) return;

    setClasses(prevClasses => prevClasses.map(cls => {
      if (cls.id === classId) {
        // Prevent double booking
        if (cls.students.some(s => s.id === user.id)) return cls;
        // Prevent booking full class
        if (cls.enrolled >= cls.capacity) return cls;

        const updatedClass = {
          ...cls,
          enrolled: cls.enrolled + 1,
          students: [...cls.students, {
             id: user.id,
             name: user.name,
             email: user.email,
             avatar: user.avatar,
             enrolledAt: new Date().toISOString()
          }]
        };

        // Generate Payment Record if it has a price
        const finalPrice = pricingOption ? pricingOption.price : cls.price;
        const finalTitle = pricingOption ? `${cls.title} - ${pricingOption.title}` : cls.title;

        if (finalPrice > 0) {
            const newPayment: Payment = {
                id: `pay-${Date.now()}`,
                userId: user.id,
                amount: finalPrice,
                currency: 'VND',
                date: new Date().toLocaleDateString(),
                status: 'Pending',
                description: `Đăng ký lớp: ${finalTitle} (${cls.date})`,
                method: 'Cash' // Default, updated later
            };
            setPayments(prev => [newPayment, ...prev]);
        }

        return updatedClass;
      }
      return cls;
    }));
  };

  const handleRegisterPackage = (planName: string, amount: number, description: string, startDate: string, durationMonths: number = 1, bonusMonths: number = 0) => {
    if (!user) return;

    // 1. Create Payment Record
    const newPayment: Payment = {
        id: `sub-${Date.now()}`,
        userId: user.id,
        amount: amount,
        currency: 'VND',
        date: new Date().toLocaleDateString(),
        status: 'Pending',
        description: `${description} (${durationMonths} tháng ${bonusMonths > 0 ? `+ ${bonusMonths} tặng` : ''})`,
        method: 'Transfer' // Assume Transfer for packages initially
    };
    setPayments(prev => [newPayment, ...prev]);

    // 2. Calculate Membership Dates
    const start = new Date(startDate);
    const end = new Date(start);
    // Add billing cycle months + bonus months
    end.setMonth(end.getMonth() + durationMonths + bonusMonths);

    // 3. Update User Status
    setUser(prev => prev ? ({
        ...prev,
        membershipType: 'Monthly',
        status: 'Active',
        membershipStartDate: startDate,
        membershipEndDate: end.toISOString().split('T')[0]
    }) : null);

    alert("Đăng ký thành công! Vui lòng thanh toán để kích hoạt gói tập.");
  };

  // --- ADMIN ACTIONS ---

  const handleCreateClass = (newClass: YogaClass) => {
      const clsWithId = { ...newClass, id: `cls-${Date.now()}` };
      setClasses(prev => [...prev, clsWithId]);
  };

  const handleUpdateClass = (updatedClass: YogaClass) => {
      setClasses(prev => prev.map(c => c.id === updatedClass.id ? updatedClass : c));
  };

  const handleApprovePayment = (paymentId: string) => {
      setPayments(prev => prev.map(p => {
          if (p.id === paymentId) {
              return { ...p, status: 'Paid' };
          }
          return p;
      }));
  };

  // --- RENDER ---

  if (!user) {
    return (
      <div className="min-h-screen relative flex items-center justify-center bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
             <img 
                src={ASSETS.BG_LOGIN}
                alt="Yoga Studio Background" 
                className="w-full h-full object-cover opacity-40"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-md p-6 animate-fade-in-up">
           
           {/* Logo Area */}
           <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl mb-4 border-4 border-white/10 overflow-hidden p-2">
                    <img src={ASSETS.LOGO} alt="Luv Yoga" className="w-full h-auto object-contain" />
                </div>
                <h1 className="text-4xl font-bold text-white tracking-tight">Luv Yoga</h1>
                <p className="text-luv-primary text-sm tracking-widest uppercase mt-1">Yêu Yoga Hơn Mỗi Ngày</p>
           </div>

           {isAdminLogin ? (
             <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10">
               <h2 className="text-2xl font-bold text-white mb-6 text-center">Quản Trị Viên</h2>
               <form onSubmit={handleAdminLogin} className="space-y-4">
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300 uppercase ml-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="email" 
                            name="email" 
                            required 
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-luv-primary outline-none text-white placeholder-gray-500 transition-all" 
                            placeholder="admin@luvyoga.online"
                        />
                    </div>
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300 uppercase ml-1">Mật khẩu</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="password" 
                            name="password" 
                            required 
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-luv-primary outline-none text-white placeholder-gray-500 transition-all" 
                            placeholder="••••••••"
                        />
                    </div>
                 </div>
                 <button type="submit" className="w-full py-3 bg-luv-primary hover:bg-luv-secondary text-luv-dark font-bold rounded-xl transition-all shadow-lg transform hover:scale-[1.02] mt-2">
                   Đăng nhập
                 </button>
               </form>
               <button onClick={() => { setIsAdminLogin(false); navigate('/'); }} className="w-full text-center mt-6 text-sm text-gray-400 hover:text-white transition-colors">
                 ← Quay lại trang hội viên
               </button>
             </div>
           ) : (
             <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10">
               <h2 className="text-2xl font-bold text-white mb-2 text-center">Chào Mừng</h2>
               <p className="text-gray-300 text-center mb-8 text-sm">Đăng nhập để bắt đầu hành trình của bạn</p>
               
               <div className="space-y-4">
                 <button 
                    onClick={() => handleMemberLogin('google')}
                    className="w-full py-3 bg-white hover:bg-gray-50 text-gray-800 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 transform hover:scale-[1.02]"
                 >
                   <Chrome size={20} className="text-red-500" />
                   Tiếp tục với Google
                 </button>
                 <button 
                    onClick={() => handleMemberLogin('facebook')}
                    className="w-full py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 transform hover:scale-[1.02]"
                 >
                   <Facebook size={20} />
                   Tiếp tục với Facebook
                 </button>
               </div>

               <div className="mt-8 text-center">
                 <button onClick={() => { setIsAdminLogin(true); navigate('/admin'); }} className="text-xs text-gray-500 hover:text-luv-primary transition-colors">
                   Đăng nhập quản trị viên
                 </button>
               </div>
             </div>
           )}
        </div>
      </div>
    );
  }

  return (
    <>
      {user.role === UserRole.MEMBER ? (
        <DashboardMember 
            user={user} 
            classes={classes} 
            payments={payments}
            notifications={notifications}
            onBookClass={handleBookClass} 
            onLogout={handleLogout}
            onUpdateUser={handleUpdateUser}
            onRegisterPackage={handleRegisterPackage}
        />
      ) : (
        <DashboardAdmin 
            user={user} 
            classes={classes}
            onUpdateClass={handleUpdateClass}
            onCreateClass={handleCreateClass}
            onLogout={handleLogout}
            // Financial Props
            payments={payments}
            onApprovePayment={handleApprovePayment}
        />
      )}
    </>
  );
};

export default App;
