
// This file is now empty of mock data.
// In a real production build, this might contain API endpoint configurations 
// or static system constants (e.g., currency settings, date formats).

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://api.luvyoga.online/v1',
  TIMEOUT: 10000,
};

export const SYSTEM_CONFIG = {
  CURRENCY: 'VND',
  DATE_FORMAT: 'DD/MM/YYYY',
};

export const ASSETS = {
    LOGO: 'logo-luvyoga.png', // Updated logo
    BG_LOGIN: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2069&auto=format&fit=crop',
    DEFAULT_AVATAR: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop'
};
