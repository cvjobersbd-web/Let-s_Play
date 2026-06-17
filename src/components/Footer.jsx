import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const translations = {
    bn: {
      brandDesc: 'সেরা ক্যাসিনো অ্যাফিলিয়েট প্রোগ্রাম। হাজারো গেম, বিশাল জ্যাকপট এবং নিরাপদ পেমেন্ট সিস্টেম।',
      quickLinks: 'দ্রুত লিংক',
      home: 'হোম',
      games: 'গেমস',
      blog: 'ব্লগ',
      store: 'স্টোর',
      contact: 'কন্টাক্ট',
      providers: 'প্রোভাইডার',
      contactUs: 'যোগাযোগ',
      phone: '১ ৮০০ ৫৫৫ ৫৬ ৫৭',
      email: 'support@letsplay.com',
      address: 'ঢাকা, বাংলাদেশ',
      letsTalk: 'যোগাযোগ করুন',
      rights: 'All rights reserved.',
      privacy: 'প্রাইভেসি পলিসি',
      terms: 'টার্মস অফ সার্ভিস',
      cookie: 'কুকি পলিসি',
    },
    en: {
      brandDesc: 'Best casino affiliate program. Thousands of games, huge jackpots and secure payment system.',
      quickLinks: 'Quick Links',
      home: 'Home',
      games: 'Games',
      blog: 'Blog',
      store: 'Store',
      contact: 'Contact',
      providers: 'Providers',
      contactUs: 'Contact',
      phone: '1 800 555 56 57',
      email: 'support@letsplay.com',
      address: 'Dhaka, Bangladesh',
      letsTalk: "LET'S TALK",
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookie: 'Cookie Policy',
    }
  };

  const t = translations[language];

  // Providers list for mapping
  const providers = ['PG', 'JILI', 'SPRIBE', 'Pragmatic', 'Evolution', 'BNG', 'FC', 'MEGA'];

  return (
    <footer className="bg-[#0A031E] border-t border-[rgba(255,255,255,0.05)] px-4 sm:px-6 lg:px-12 py-8 sm:py-12 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        {/* Grid - Responsive */}
        <div className={`grid grid-cols-1 ${isMobile ? 'gap-8' : 'md:grid-cols-4 gap-8'}`}>
          
          {/* Brand - Full width on mobile */}
          <div className={`${isMobile ? 'col-span-1' : 'col-span-1'} text-center sm:text-left`}>
            <div className={`flex ${isMobile ? 'justify-center' : 'justify-start'} items-center gap-2.5 mb-4`}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="18" fill="#E91E8C" opacity="0.15" />
                <path d="M18 6 L22 14 L30 14 L24 20 L26 28 L18 23 L10 28 L12 20 L6 14 L14 14 Z" fill="#E91E8C" />
              </svg>
              <span className="text-white text-[20px] sm:text-[22px] font-extrabold tracking-[2px] bg-gradient-to-r from-white via-white to-[#E91E8C] bg-clip-text text-transparent">
                Let's_Play
              </span>
            </div>
            <p className="text-[#6B5F8A] text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              {t.brandDesc}
            </p>
            <div className={`flex ${isMobile ? 'justify-center' : 'justify-start'} gap-4 mt-4`}>
              <a href="#" className="text-[#6B5F8A] hover:text-[#E91E8C] transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-[#6B5F8A] hover:text-[#E91E8C] transition-colors" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
              <a href="#" className="text-[#6B5F8A] hover:text-[#E91E8C] transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="text-[#6B5F8A] hover:text-[#E91E8C] transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links - Responsive layout */}
          <div className="text-center sm:text-left">
            <h6 className="text-white text-sm font-bold uppercase tracking-wider mb-4">{t.quickLinks}</h6>
            <ul className={`${isMobile ? 'flex flex-wrap justify-center gap-x-6 gap-y-2.5' : 'space-y-2.5'}`}>
              {[t.home, t.games, t.blog, t.store, t.contact].map(item => (
                <li key={item}>
                  <a href="#" className="text-[#6B5F8A] text-sm hover:text-white transition-colors inline-block">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Providers - Responsive layout */}
          <div className="text-center sm:text-left">
            <h6 className="text-white text-sm font-bold uppercase tracking-wider mb-4">{t.providers}</h6>
            <ul className={`${isMobile ? 'flex flex-wrap justify-center gap-x-6 gap-y-2.5' : 'space-y-2.5'}`}>
              {providers.map(item => (
                <li key={item}>
                  <a href="#" className="text-[#6B5F8A] text-sm hover:text-white transition-colors inline-block">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Responsive */}
          <div className="text-center sm:text-left">
            <h6 className="text-white text-sm font-bold uppercase tracking-wider mb-4">{t.contactUs}</h6>
            <ul className="space-y-3">
              <li className={`text-[#6B5F8A] text-sm flex ${isMobile ? 'justify-center' : 'justify-start'} items-start gap-3`}>
                <span className="text-[#E91E8C] mt-0.5">📞</span>
                <span>{t.phone}</span>
              </li>
              <li className={`text-[#6B5F8A] text-sm flex ${isMobile ? 'justify-center' : 'justify-start'} items-start gap-3`}>
                <span className="text-[#E91E8C] mt-0.5">✉️</span>
                <span className="break-all sm:break-normal">{t.email}</span>
              </li>
              <li className={`text-[#6B5F8A] text-sm flex ${isMobile ? 'justify-center' : 'justify-start'} items-start gap-3`}>
                <span className="text-[#E91E8C] mt-0.5">📍</span>
                <span>{t.address}</span>
              </li>
            </ul>
            <div className={`${isMobile ? 'flex justify-center' : 'flex justify-start'}`}>
              <button className="mt-4 bg-[#E91E8C] text-white border-none px-5 py-2.5 rounded-full text-xs font-bold tracking-[1.5px] cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgba(233,30,140,0.3)] hover:bg-[#c4155a] hover:scale-105 active:scale-95">
                {t.letsTalk}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Responsive */}
        <div className="max-w-7xl mx-auto mt-8 sm:mt-10 pt-6 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#4A3F5E] text-xs sm:text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Let's_Play. {t.rights}
          </p>
          <div className={`flex ${isMobile ? 'flex-wrap justify-center gap-x-4 gap-y-2' : 'gap-6'} text-center`}>
            <a href="#" className="text-[#4A3F5E] text-xs hover:text-[#6B5F8A] transition-colors">{t.privacy}</a>
            <a href="#" className="text-[#4A3F5E] text-xs hover:text-[#6B5F8A] transition-colors">{t.terms}</a>
            <a href="#" className="text-[#4A3F5E] text-xs hover:text-[#6B5F8A] transition-colors">{t.cookie}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;