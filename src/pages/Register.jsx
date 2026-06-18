// pages/Register.jsx
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Register = () => {
  const { language } = useLanguage();
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const t = {
    bn: {
      title: 'অ্যাকাউন্ট তৈরি করুন',
      subtitle: 'আজই যোগ দিন এবং ১০০% ওয়েলকাম বোনাস পান',
      fullName: 'পূর্ণ নাম',
      namePlaceholder: 'আপনার পূর্ণ নাম লিখুন',
      email: 'ইমেইল',
      emailPlaceholder: 'আপনার ইমেইল লিখুন',
      phone: 'ফোন নম্বর',
      phonePlaceholder: 'আপনার ফোন নম্বর লিখুন',
      password: 'পাসওয়ার্ড',
      passwordPlaceholder: 'আপনার পাসওয়ার্ড লিখুন',
      confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
      confirmPlaceholder: 'আবার পাসওয়ার্ড লিখুন',
      terms: 'আমি সমস্ত শর্তাবলী এবং নীতিমালা পড়েছি এবং সম্মতি জানাচ্ছি',
      registerBtn: 'অ্যাকাউন্ট তৈরি করুন',
      hasAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
      login: 'লগইন করুন',
      or: 'অথবা',
      socialRegister: 'গুগল অ্যাকাউন্ট দিয়ে রেজিস্টার করুন',
      passwordMismatch: 'পাসওয়ার্ড মিলছে না',
      passwordMin: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে',
      required: 'এই ফিল্ডটি পূরণ করা আবশ্যক',
    },
    en: {
      title: 'Create Account',
      subtitle: 'Join today and get 100% Welcome Bonus',
      fullName: 'Full Name',
      namePlaceholder: 'Enter your full name',
      email: 'Email',
      emailPlaceholder: 'Enter your email',
      phone: 'Phone Number',
      phonePlaceholder: 'Enter your phone number',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      confirmPassword: 'Confirm Password',
      confirmPlaceholder: 'Re-enter your password',
      terms: 'I have read and agree to all Terms & Conditions',
      registerBtn: 'Create Account',
      hasAccount: 'Already have an account?',
      login: 'Login',
      or: 'Or',
      socialRegister: 'Register with Google Account',
      passwordMismatch: 'Passwords do not match',
      passwordMin: 'Password must be at least 6 characters',
      required: 'This field is required',
    }
  };

  const text = t[language];

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = text.required;
    if (!form.email.trim()) newErrors.email = text.required;
    if (!form.phone.trim()) newErrors.phone = text.required;
    if (!form.password.trim()) newErrors.password = text.required;
    if (form.password.length > 0 && form.password.length < 6) newErrors.password = text.passwordMin;
    if (!form.confirmPassword.trim()) newErrors.confirmPassword = text.required;
    if (form.password !== form.confirmPassword && form.confirmPassword.length > 0) {
      newErrors.confirmPassword = text.passwordMismatch;
    }
    if (!agreeTerms) newErrors.terms = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Register attempt:', form);
      // Handle registration logic here
    }
  };

  const handleGoogleRegister = () => {
    // Handle Google registration logic here
    console.log('Google register clicked');
  };

  return (
    <div 
      className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-[#0A031E] px-4 py-12"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(233,30,140,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(155,43,255,0.06) 0%, transparent 40%), #0A031E'
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo - Hidden on mobile since Navbar has it */}
        <div className="flex justify-center mb-6 lg:hidden">
          <div className="flex items-center gap-2.5">
            <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#E91E8C" opacity="0.15" />
              <path d="M18 6 L22 14 L30 14 L24 20 L26 28 L18 23 L10 28 L12 20 L6 14 L14 14 Z" fill="#E91E8C" />
            </svg>
            <span className="text-white text-2xl font-extrabold tracking-[2px] bg-gradient-to-r from-white via-white to-[#E91E8C] bg-clip-text text-transparent">
              Let's_Play
            </span>
          </div>
        </div>

        {/* Register Card */}
        <div className="bg-[#0F0626] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-white text-2xl font-bold mb-1">{text.title}</h1>
            <p className="text-[#6B5F8A] text-sm">{text.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[#B0A8C8] text-xs font-semibold uppercase tracking-wider mb-1.5">
                {text.fullName}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={text.namePlaceholder}
                className={`w-full bg-[rgba(255,255,255,0.05)] border ${
                  errors.name ? 'border-[#E91E8C]' : 'border-[rgba(255,255,255,0.08)]'
                } rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A3F5E] focus:outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[#E91E8C]/20 transition-all duration-200`}
                required
              />
              {errors.name && <p className="text-[#E91E8C] text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#B0A8C8] text-xs font-semibold uppercase tracking-wider mb-1.5">
                {text.email}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={text.emailPlaceholder}
                className={`w-full bg-[rgba(255,255,255,0.05)] border ${
                  errors.email ? 'border-[#E91E8C]' : 'border-[rgba(255,255,255,0.08)]'
                } rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A3F5E] focus:outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[#E91E8C]/20 transition-all duration-200`}
                required
              />
              {errors.email && <p className="text-[#E91E8C] text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[#B0A8C8] text-xs font-semibold uppercase tracking-wider mb-1.5">
                {text.phone}
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder={text.phonePlaceholder}
                className={`w-full bg-[rgba(255,255,255,0.05)] border ${
                  errors.phone ? 'border-[#E91E8C]' : 'border-[rgba(255,255,255,0.08)]'
                } rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A3F5E] focus:outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[#E91E8C]/20 transition-all duration-200`}
                required
              />
              {errors.phone && <p className="text-[#E91E8C] text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#B0A8C8] text-xs font-semibold uppercase tracking-wider mb-1.5">
                {text.password}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder={text.passwordPlaceholder}
                  className={`w-full bg-[rgba(255,255,255,0.05)] border ${
                    errors.password ? 'border-[#E91E8C]' : 'border-[rgba(255,255,255,0.08)]'
                  } rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A3F5E] focus:outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[#E91E8C]/20 transition-all duration-200`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A3F5E] hover:text-[#B0A8C8] transition-colors duration-200"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-[#E91E8C] text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[#B0A8C8] text-xs font-semibold uppercase tracking-wider mb-1.5">
                {text.confirmPassword}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder={text.confirmPlaceholder}
                  className={`w-full bg-[rgba(255,255,255,0.05)] border ${
                    errors.confirmPassword ? 'border-[#E91E8C]' : 'border-[rgba(255,255,255,0.08)]'
                  } rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A3F5E] focus:outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[#E91E8C]/20 transition-all duration-200`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A3F5E] hover:text-[#B0A8C8] transition-colors duration-200"
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-[#E91E8C] text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] text-[#E91E8C] focus:ring-[#E91E8C] focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="terms" className="text-[#6B5F8A] text-xs leading-relaxed cursor-pointer">
                {text.terms}
              </label>
            </div>
            {errors.terms && <p className="text-[#E91E8C] text-xs mt-1">{errors.terms}</p>}

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#E91E8C] to-[#9B2BFF] text-white font-bold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(233,30,140,0.3)] active:scale-[0.98] mt-2"
            >
              {text.registerBtn}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.06)]" />
            <span className="text-[#4A3F5E] text-xs font-medium uppercase tracking-wider">{text.or}</span>
            <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.06)]" />
          </div>

          {/* Social Register - Only Google */}
          <div className="space-y-2.5">
            <p className="text-[#4A3F5E] text-xs text-center">{text.socialRegister}</p>
            <div className="flex justify-center">
              <button
                onClick={handleGoogleRegister}
                className="w-full max-w-[200px] flex items-center justify-center gap-3 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.08)] rounded-xl px-6 py-3 transition-all duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span className="text-white text-sm font-medium">Google</span>
              </button>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center mt-6 text-[#6B5F8A] text-sm">
            {text.hasAccount}{' '}
            <Link to="/login" className="text-[#E91E8C] font-semibold hover:text-[#c4155a] transition-colors duration-200">
              {text.login}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;