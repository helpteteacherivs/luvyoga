
export enum UserRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  joinDate: string;
  membershipType?: 'Monthly' | 'Quarterly' | 'Yearly' | 'Pay-per-class';
  status?: 'Active' | 'Inactive' | 'Pending';
  membershipStartDate?: string; 
  membershipEndDate?: string;   
  // Personal Info
  phone?: string;
  birthdate?: string;
  gender?: 'Male' | 'Female' | 'Other';
  // Health Data
  height?: number; // cm
  weight?: number; // kg
  healthNotes?: string;
}

export interface EnrolledStudent {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrolledAt: string;
}

export interface PricingOption {
  title: string;
  price: number;
  description: string;
}

export interface YogaClass {
  id: string;
  title: string;
  instructor: string;
  date: string; // ISO Date string
  startTime: string;
  duration: number; // minutes
  capacity: number;
  enrolled: number;
  price: number; // Price in VND
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  image: string;
  students: EnrolledStudent[]; // List of enrolled students
  schedule?: string;
  code?: string;
  pricingOptions?: PricingOption[];
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  description: string;
  method?: 'Cash' | 'Transfer'; // Added method field
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'alert' | 'success';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
