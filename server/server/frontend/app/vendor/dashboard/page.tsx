'use client';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  ShoppingCart, 
  DollarSign, 
  Settings, 
  LogOut, 
  TrendingUp, 
  Menu,
  X,
  Store
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function VendorDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [vendorName, setVendorName] = useState('Vendor');

  useEffect(() => {
    // লোকালস্টোরেজ থেকে ভেন্ডরের নাম বা ইনফো নেওয়া
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj.name) setVendorName(userObj.name);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white flex">
      
      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111827] border-r border-gray-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col justify-between`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Store className="text-blue-500" size={24} />
              <h1 className="text-xl font-extrabold text-blue-500 tracking-wider">VENDOR PORTAL</h1>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
              <X size={22} />
            </button>
          </div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium text-sm shadow-lg shadow-blue-600/20">
              <LayoutDashboard size={18} /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800/50 hover:text-white rounded-xl font-medium text-sm transition">
              <Package size={18} /> My Products &amp; Sites
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800/50 hover:text-white rounded-xl font-medium text-sm transition">
              <PlusCircle size={18} /> Add New Listing
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800/50 hover:text-white rounded-xl font-medium text-sm transition">
              <ShoppingCart size={18} /> Orders
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800/50 hover:text-white rounded-xl font-medium text-sm transition">
              <Settings size={18} /> Store Settings
            </a>
          </nav>
        </div>

        <div className="p-6 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-2.5 rounded-xl text-sm font-semibold transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-20 bg-[#111827]/80 backdrop-blur border-b border-gray-800 px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-white">
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold">Welcome back, {vendorName}!</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold">
              {vendorName[0]}
            </div>
          </div>
        </header>

        {/* Dashboard Body Content */}
        <main className="p-6 space-y-6 flex-1">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#111827] border border-gray-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">Total Sales</p>
                <h3 className="text-2xl font-extrabold text-emerald-400">$12,450</h3>
              </div>
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl"><DollarSign size={24} /></div>
            </div>

            <div className="bg-[#111827] border border-gray-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">Active Products</p>
                <h3 className="text-2xl font-extrabold text-blue-400">14</h3>
              </div>
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl"><Package size={24} /></div>
            </div>

            <div className="bg-[#111827] border border-gray-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">Total Orders</p>
                <h3 className="text-2xl font-extrabold text-purple-400">86</h3>
              </div>
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl"><ShoppingCart size={24} /></div>
            </div>

            <div className="bg-[#111827] border border-gray-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">Growth Rate</p>
                <h3 className="text-2xl font-extrabold text-amber-400">+18.2%</h3>
              </div>
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><TrendingUp size={24} /></div>
            </div>
          </div>

          {/* Quick Actions / Recent Activity Section */}
          <div className="bg-[#111827] border border-gray-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-base font-bold mb-4">Store Overview</h3>
            <div className="border border-gray-800 rounded-xl p-8 text-center text-gray-400 text-sm">
              Your vendor store is live and ready. You can now add digital products or websites for sale from the sidebar menu.
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}