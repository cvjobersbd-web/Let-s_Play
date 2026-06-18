// Navbar.jsx (updated with scroll hide/show functionality)
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Body scroll lock when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Scroll hide/show logic
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Don't hide navbar when menu is open
      if (menuOpen) {
        setIsVisible(true);
        return;
      }

      // Show navbar when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } 
      // Hide navbar when scrolling down and not at top
      else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY, menuOpen]);

  const navLinks = {
    bn: ['হোম', 'পেজ', 'ব্লগ', 'স্টোর', 'কন্টাক্ট'],
    en: ['Home', 'Pages', 'Blog', 'Store', 'Contacts']
  };

  const links = navLinks[language];

  const handleLoginClick = () => {
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 flex items-center justify-between bg-[#0F0626] px-6 lg:px-12 h-[72px] z-50 border-b border-[rgba(255,255,255,0.05)] font-['Inter'] transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
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

        {/* Nav Links - Desktop */}
        <ul className="hidden lg:flex list-none m-0 p-0 gap-8">
          {links.map((item) => {
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

        {/* Right Side - Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          <button
            onClick={toggleLanguage}
            className="text-[#B0A8C8] hover:text-white text-[15px] font-medium transition-colors duration-200 flex items-center gap-2"
            aria-label="Switch language"
          >
            <span>{language === 'bn' ? '🇧🇩' : '🇬🇧'}</span>
            <span>{language === 'bn' ? 'বাংলা' : 'English'}</span>
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

          <button 
            onClick={handleLoginClick}
            className="text-[#B0A8C8] hover:text-white text-[15px] font-medium transition-colors duration-200"
          >
            {language === 'bn' ? 'লগইন' : 'Login'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex flex-col gap-[5px] bg-none border-none cursor-pointer p-1 z-60 relative"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] bg-white rounded-[2px] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-[2px] bg-white rounded-[2px] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-white rounded-[2px] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-[50%] bg-[#0F0626] shadow-[-8px_0_30px_rgba(0,0,0,0.6)] z-50 lg:hidden transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-y-auto ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 pt-[88px] gap-1 h-full">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 text-white/60 hover:text-white text-2xl transition-colors"
            aria-label="Close menu"
          >
            ✕
          </button>

          <div className="flex flex-col gap-1">
            {links.map((item) => {
              const isHome = (language === 'bn' && item === 'হোম') || (language === 'en' && item === 'Home');
              return (
                <a
                  key={item}
                  href="#"
                  className={`text-[#B0A8C8] no-underline text-[20px] font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:text-white hover:bg-[rgba(255,255,255,0.05)] ${
                    isHome ? 'text-white font-semibold bg-[rgba(233,30,140,0.1)] border-l-3 border-[#E91E8C]' : ''
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              );
            })}
          </div>

          <div className="w-full h-[1px] bg-[rgba(255,255,255,0.06)] my-4" />

          <button
            onClick={toggleLanguage}
            className="text-[#B0A8C8] hover:text-white text-[20px] font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:bg-[rgba(255,255,255,0.05)] flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              <span>{language === 'bn' ? '🇧🇩' : '🇬🇧'}</span>
              <span>{language === 'bn' ? 'বাংলা' : 'English'}</span>
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

          <button 
            onClick={handleLoginClick}
            className="text-[#B0A8C8] hover:text-white text-[20px] font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:bg-[rgba(255,255,255,0.05)] text-left"
          >
            {language === 'bn' ? 'লগইন' : 'Login'}
          </button>

          <div className="flex-1" />
          <div className="text-[#4a3f5e] text-xs text-center py-4 border-t border-[rgba(255,255,255,0.04)]">
            © 2026 Let's Play
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under navbar */}
      <div className="h-[72px]" />
    </>
  );
};

export default Navbar;