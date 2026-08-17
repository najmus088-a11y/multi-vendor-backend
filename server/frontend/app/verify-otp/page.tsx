'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      // ডায়নামিক API URL সেটআপ
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otpCode: otp }) // এখানে otp পরিবর্তন করে otpCode করা হয়েছে
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed');
      }

      setMessage('Account verified successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#111827] border border-gray-800 p-8 rounded-2xl shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Verify Your Email
        </h2>
        <p className="text-xs text-gray-400 mb-6">
          We have sent a 6-digit security OTP code to <span className="text-blue-400 font-semibold">{email}</span>
        </p>

        {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 text-sm rounded-xl">{error}</div>}
        {message && <div className="mb-4 p-3 bg-green-500/20 border border-green-500 text-green-300 text-sm rounded-xl">{message}</div>}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <input 
              type="text" 
              maxLength={6}
              required 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)}
              className="w-full bg-[#070b19] border border-gray-800 rounded-xl px-4 py-3 text-center text-2xl tracking-widest font-bold focus:outline-none focus:border-blue-500"
              placeholder="------"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl transition shadow-lg shadow-blue-600/30"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070b19] text-white flex items-center justify-center">Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}