import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  // নেভিগেশন লিংক - ভাষা অনুযায়ী
  const navLinks = {
    bn: ['হোম', 'পেজ', 'ব্লগ', 'স্টোর', 'কন্টাক্ট'],
    en: ['Home', 'Pages', 'Blog', 'Store', 'Contacts']
  };

  const links = navLinks[language];

  return (
    <nav className="flex items-center justify-between bg-[#0F0626] px-6 lg:px-12 h-[72px] relative z-100 border-b border-[rgba(255,255,255,0.05)] font-['Inter']">
      {/* Logo */}
      <div className="flex items-center gap-2.5 cursor-pointer">
        <div className="flex items-center">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill="#E91E8C" opacity="0.15" />
            <path d="M18 6 L22 14 L30 14 L24 20 L26 28 L18 23 L10 28 L12 20 L6 14 L14 14 Z" fill="#E91E8C" />
          </svg>
        </div>
        <span className="text-white text-[22px] font-extrabold tracking-[2px] bg-gradient-to-r from-white via-white to-[#E91E8C] bg-clip-text text-transparent">
          Let's_Play
        </span>
      </div>

      {/* Nav Links */}
      <ul className="hidden lg:flex list-none m-0 p-0 gap-8">
        {links.map((item, index) => {
          const isHome = (language === 'bn' && item === 'হোম') || (language === 'en' && item === 'Home');
          return (
            <li key={item} className="relative">
              <a
                href="#"
                className={`text-[#B0A8C8] no-underline text-[15px] font-medium relative pb-1 transition-colors duration-200 flex flex-col items-center ${
                  isHome ? 'text-white font-semibold' : 'hover:text-white'
                }`}
              >
                {item}
                {isHome && (
                  <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-[#E91E8C] rounded-[2px] shadow-[0_0_10px_rgba(233,30,140,0.5)]" />
                )}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Right Side */}
      <div className="hidden lg:flex items-center gap-6">
        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.08)] rounded-full px-3.5 py-2 transition-all duration-300 cursor-pointer group"
          aria-label="Switch language"
        >
          <span className="text-lg">
            {language === 'bn' ? '🇧🇩' : '🇬🇧'}
          </span>
          <span className="text-white text-xs font-bold uppercase tracking-wider">
            {language === 'bn' ? 'বাংলা' : 'English'}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={`transition-transform duration-300 ${language === 'en' ? 'rotate-180' : ''}`}
          >
            <path d="M2 4L6 8L10 4" stroke="#B0A8C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <span className="text-white text-base font-bold tracking-[0.5px]">
          1 800 555 56 57
        </span>
        <button className="bg-[#E91E8C] text-white border-none px-6 py-3 rounded-full text-[13px] font-bold tracking-[1.5px] cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgba(233,30,140,0.3)] hover:bg-[#c4155a] hover:scale-105">
          {language === 'bn' ? 'যোগাযোগ করুন' : "LET'S TALK"}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden flex flex-col gap-[5px] bg-none border-none cursor-pointer p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className="block w-6 h-[2px] bg-white rounded-[2px]" />
        <span className="block w-6 h-[2px] bg-white rounded-[2px]" />
        <span className="block w-6 h-[2px] bg-white rounded-[2px]" />
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-[#0F0626] flex flex-col p-4 gap-2 shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-200 border-b border-[rgba(255,255,255,0.05)] lg:hidden">
          {links.map((item) => (
            <a
              key={item}
              href="#"
              className="text-[#B0A8C8] no-underline text-[15px] font-medium py-2 border-b border-[rgba(255,255,255,0.08)] hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}

          {/* Mobile Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-between bg-[rgba(255,255,255,0.05)] rounded-full px-4 py-2.5 mt-2 border border-[rgba(255,255,255,0.06)]"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">
                {language === 'bn' ? '🇧🇩' : '🇬🇧'}
              </span>
              <span className="text-white text-sm font-medium">
                {language === 'bn' ? 'বাংলা' : 'English'}
              </span>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`transition-transform duration-300 ${language === 'en' ? 'rotate-180' : ''}`}
            >
              <path d="M4 6L8 10L12 6" stroke="#B0A8C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <span className="text-white text-base font-bold tracking-[0.5px] block my-3">
            1 800 555 56 57
          </span>
          <button className="bg-[#E91E8C] text-white border-none px-6 py-3 rounded-full text-[13px] font-bold tracking-[1.5px] cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgba(233,30,140,0.3)] hover:bg-[#c4155a] hover:scale-105 w-fit">
            {language === 'bn' ? 'যোগাযোগ করুন' : "LET'S TALK"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;