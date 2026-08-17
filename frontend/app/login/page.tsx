'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // টোকেন এবং ইউজার ডেটা লোকালস্টোরেজে সেভ করা
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // ইউজারের রোল লোকালস্টোরেজে সেভ করে রাখা (ভবিষ্যৎ চেক করার জন্য)
      if (data.user && data.user.role) {
        localStorage.setItem('role', data.user.role);
      }

      alert('Login Successful!');

      // **রোলের ওপর ভিত্তি করে রিডাইরেক্ট লজিক**
      if (data.user.role === 'vendor' || data.user.role === 'seller') {
        router.push('/vendor/dashboard'); // ভেন্ডর হলে সরাসরি ভেন্ডর ড্যাশবোর্ডে যাবে
      } else if (data.user.role === 'admin') {
        router.push('/admin/dashboard'); // অ্যাডমিন হলে অ্যাডমিন প্যানেলে যাবে (যদি থাকে)
      } else {
        router.push('/'); // সাধারণ কাস্টমার হলে হোম পেজে যাবে
      }

    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] flex items-center justify-center px-4 text-white">
      <div className="max-w-md w-full bg-[#111827] border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
        
        {error && <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded-xl mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full bg-[#070b19] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full bg-[#070b19] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-600/30 transition">
            Login
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Don't have an account? <Link href="/register" className="text-blue-400 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}