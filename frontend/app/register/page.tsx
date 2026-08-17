'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'buyer' | 'vendor'>('buyer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    shopNumber: '',
    nidNumber: ''
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const dataForm = new FormData();
      dataForm.append('name', formData.name);
      dataForm.append('email', formData.email);
      dataForm.append('password', formData.password);
      dataForm.append('role', role);
      dataForm.append('shopNumber', formData.shopNumber);
      dataForm.append('nidNumber', formData.nidNumber);
      
      if (profileImage) {
        dataForm.append('profileImage', profileImage);
      }

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: dataForm // FormData পাঠানোর সময় Headers এ Content-Type দিতে হয় না
      });

      // সেফলি রেসপন্স পার্স করার জন্য
      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { message: await response.text() };
      }

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // যদি ভেন্ডর হয় এবং ব্যাকএন্ডে ওটিপি ভেরিফিকেশন রিকোয়ার্ড থাকে
      if (role === 'vendor' && data.requiresOtp) {
        router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
      } else {
        alert('Registration successful! Please login.');
        router.push('/login');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#111827] border border-gray-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Create an Account
        </h2>

        {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 text-sm rounded-xl">{error}</div>}

        <div className="flex bg-[#070b19] p-1 rounded-xl mb-6 border border-gray-800">
          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${role === 'buyer' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
          >
            Buyer
          </button>
          <button
            type="button"
            onClick={() => setRole('vendor')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${role === 'vendor' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
          >
            Vendor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
            <input 
              type="text" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleChange}
              className="w-full bg-[#070b19] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Email Address</label>
            <input 
              type="email" 
              name="email" 
              required 
              value={formData.email} 
              onChange={handleChange}
              className="w-full bg-[#070b19] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              value={formData.password} 
              onChange={handleChange}
              className="w-full bg-[#070b19] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Profile Image (Upload)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="w-full bg-[#070b19] border border-gray-800 rounded-xl px-3 py-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
            />
          </div>

          {role === 'vendor' && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Shop Number</label>
                <input 
                  type="text" 
                  name="shopNumber" 
                  required 
                  value={formData.shopNumber} 
                  onChange={handleChange}
                  className="w-full bg-[#070b19] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter shop number"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">NID Number (Optional - Can Skip)</label>
                <input 
                  type="text" 
                  name="nidNumber" 
                  value={formData.nidNumber} 
                  onChange={handleChange}
                  className="w-full bg-[#070b19] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter NID number (optional)"
                />
              </div>
            </>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl transition shadow-lg shadow-blue-600/30 mt-2"
          >
            {loading ? 'Processing...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Already have an account? <Link href="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}