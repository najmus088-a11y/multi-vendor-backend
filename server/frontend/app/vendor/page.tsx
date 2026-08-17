'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VendorDashboard() {
  const router = useRouter();
  const [vendorName, setVendorName] = useState('Vendor');

  useEffect(() => {
    // এখানে লোকাল স্টোরেজ বা কুকি থেকে ভেন্ডরের তথ্য চেক করতে পারেন
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'vendor') {
      // যদি ভেন্ডর লগইন করা না থাকে, তবে লগইন পেজে রিডাইরেক্ট করে দিন
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">ভেন্ডর ড্যাশবোর্ড (Vendor Dashboard)</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">টোটাল প্রোডাক্ট</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">১২</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">মোট অর্ডার</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">৫</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">মোট আয়</h2>
            <p className="text-3xl font-bold text-purple-600 mt-2">৳ ২৫,০০০</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Link 
            href="/vendor/add-product" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            নতুন প্রোডাক্ট আপলোড করুন
          </Link>
          <Link 
            href="/vendor/products" 
            className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition"
          >
            আমার প্রোডাক্ট লিস্ট (ডিলিট/এডিট)
          </Link>
        </div>
      </div>
    </div>
  );
}