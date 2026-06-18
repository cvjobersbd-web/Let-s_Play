import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { language } = useLanguage();
  const { login, loginWithGoogle, error, setError } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const t = {
    bn: {
      title: 'স্বাগতম',
      subtitle: 'আপনার অ্যাকাউন্টে লগইন করুন',
      email: 'ইমেইল অথবা ফোন নম্বর',
      password: 'পাসওয়ার্ড',
      forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
      loginBtn: 'লগইন করুন',
      noAccount: 'অ্যাকাউন্ট নেই?',
      register: 'রেজিস্টার করুন',
      or: 'অথবা',
      socialLogin: 'গুগল অ্যাকাউন্ট দিয়ে লগইন করুন',
      error: 'ইমেইল এবং পাসওয়ার্ড সঠিক নয়',
      emailPlaceholder: 'আপনার ইমেইল লিখুন',
      passwordPlaceholder: 'আপনার পাসওয়ার্ড লিখুন',
      loginSuccess: 'লগইন সফল!',
      loginError: 'লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
    },
    en: {
      title: 'Welcome Back',
      subtitle: 'Login to your account',
      email: 'Email or Phone Number',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      loginBtn: 'Login',
      noAccount: "Don't have an account?",
      register: 'Register',
      or: 'Or',
      socialLogin: 'Login with Google Account',
      error: 'Invalid email or password',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      loginSuccess: 'Login successful!',
      loginError: 'Login failed. Please try again.',
    }
  };

  const text = t[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setLoading(true);
    setError(null);

    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setLocalError(text.loginError);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setLocalError('');
    setError(null);

    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setLocalError(text.loginError);
      console.error('Google login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-[#0A031E] px-4 py-12"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(233,30,140,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(155,43,255,0.06) 0%, transparent 40%), #0A031E'
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8 lg:hidden">
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

        {/* Login Card */}
        <div className="bg-[#0F0626] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-white text-2xl font-bold mb-1">{text.title}</h1>
            <p className="text-[#6B5F8A] text-sm">{text.subtitle}</p>
          </div>

          {/* Error Display */}
          {(localError || error) && (
            <div className="mb-4 p-3 bg-[rgba(233,30,140,0.15)] border border-[#E91E8C] rounded-xl text-[#E91E8C] text-sm text-center">
              {localError || error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-[#B0A8C8] text-xs font-semibold uppercase tracking-wider mb-2">
                {text.email}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={text.emailPlaceholder}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A3F5E] focus:outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[#E91E8C]/20 transition-all duration-200"
                required
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[#B0A8C8] text-xs font-semibold uppercase tracking-wider">
                  {text.password}
                </label>
                <a href="#" className="text-[#E91E8C] text-xs hover:text-[#c4155a] transition-colors duration-200">
                  {text.forgotPassword}
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder={text.passwordPlaceholder}
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A3F5E] focus:outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[#E91E8C]/20 transition-all duration-200"
                  required
                  disabled={loading}
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
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#E91E8C] to-[#9B2BFF] text-white font-bold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(233,30,140,0.3)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                text.loginBtn
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.06)]" />
            <span className="text-[#4A3F5E] text-xs font-medium uppercase tracking-wider">{text.or}</span>
            <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.06)]" />
          </div>

          {/* Social Login - Google */}
          <div className="space-y-2.5">
            <p className="text-[#4A3F5E] text-xs text-center">{text.socialLogin}</p>
            <div className="flex justify-center">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full max-w-[200px] flex items-center justify-center gap-3 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.08)] rounded-xl px-6 py-3 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
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

          {/* Register Link */}
          <p className="text-center mt-6 text-[#6B5F8A] text-sm">
            {text.noAccount}{' '}
            <Link to="/register" className="text-[#E91E8C] font-semibold hover:text-[#c4155a] transition-colors duration-200">
              {text.register}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;