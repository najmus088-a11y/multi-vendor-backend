"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar({ 
  logoImg = null, 
  logoText = "Wahis nova" 
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // অথেন্টিকেশন স্টেট
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // লোকালস্টোরেজ থেকে টোকেন এবং ইউজার ডেটা চেক করা
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      if (role) setUserRole(role);
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          if (userObj.name) setUserName(userObj.name);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    router.push("/login");
    router.refresh();
  };

  // রোল অনুযায়ী ড্যাশবোর্ড লিংক নির্ধারণ
  const getDashboardLink = () => {
    if (userRole === "vendor" || userRole === "seller") return "/vendor/dashboard";
    if (userRole === "admin") return "/admin/dashboard";
    return "/profile"; // সাধারণ কাস্টমার হলে প্রোফাইল বা ড্যাশবোর্ড
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 h-20 flex justify-between items-center">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          {logoImg ? (
            <div className="relative w-10 h-8">
              <Image src={logoImg} alt="Logo" fill className="object-contain" />
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5 items-center">
                <span className="w-2.5 h-6 bg-blue-600 rounded-full transform -skew-x-12"></span>
                <span className="w-3.5 h-6 border-2 border-blue-600 rounded-full transform -skew-x-12"></span>
              </div>
            </div>
          )}
          <span className="font-extrabold text-xl text-slate-900 tracking-tight">{logoText}</span>
        </Link>

        {/* Middle: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          
          {/* Dropdown for Digital Products */}
          <div className="relative" onMouseLeave={() => setDropdownOpen(false)}>
            <button 
              onMouseEnter={() => setDropdownOpen(true)}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 hover:text-blue-600 transition outline-none py-2"
            >
              Digital Products <ChevronDown size={14} className={`transform transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div 
                onMouseEnter={() => setDropdownOpen(true)}
                className="absolute top-full left-0 mt-0 w-52 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50"
              >
                <Link href="/shop" className="block px-4 py-2 text-xs font-semibold text-blue-600 hover:bg-slate-50 border-b border-slate-100">
                  Browse All Products (Shop)
                </Link>
                <Link href="/shop" className="block px-4 py-2 text-xs hover:bg-slate-50 hover:text-blue-600">Themes &amp; Templates</Link>
                <Link href="/shop" className="block px-4 py-2 text-xs hover:bg-slate-50 hover:text-blue-600">Plugins &amp; Scripts</Link>
                <Link href="/shop" className="block px-4 py-2 text-xs hover:bg-slate-50 hover:text-blue-600">Graphics &amp; Assets</Link>
              </div>
            )}
          </div>

          <Link href="/websites-for-sale" className="hover:text-blue-600 transition">Websites For Sale</Link>
          <Link href="#" className="hover:text-blue-600 transition">Funding</Link>
          <Link href="#" className="hover:text-blue-600 transition">Blog</Link>
          <Link href="#" className="hover:text-blue-600 transition">Contact</Link>
        </nav>

        {/* Right: Cart, Auth / Profile Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="#" className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 relative transition">
            <ShoppingCart size={18} />
            <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </Link>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link 
                href={getDashboardLink()} 
                className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition"
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold text-slate-700 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition">
                Login
              </Link>

              <Link href="/register" className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link href="#" className="p-2 rounded-lg border border-slate-200 text-slate-700 relative">
            <ShoppingCart size={18} />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </Link>
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-4 shadow-xl">
          <Link href="/" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-slate-700 hover:text-blue-600">Home</Link>
          <Link href="/shop" onClick={() => setIsOpen(false)} className="block text-sm font-semibold text-blue-600">Digital Products (Shop)</Link>
          <Link href="/websites-for-sale" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-slate-700 hover:text-blue-600">Websites For Sale</Link>
          <Link href="#" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-slate-700 hover:text-blue-600">Funding</Link>
          <Link href="#" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-slate-700 hover:text-blue-600">Blog</Link>
          <Link href="#" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-slate-700 hover:text-blue-600">Contact</Link>
          
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            {isLoggedIn ? (
              <>
                <Link 
                  href={getDashboardLink()} 
                  onClick={() => setIsOpen(false)} 
                  className="flex items-center justify-center gap-2 text-center text-sm font-semibold text-white bg-blue-600 py-2.5 rounded-xl shadow-md"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button 
                  onClick={() => { setIsOpen(false); handleLogout(); }} 
                  className="flex items-center justify-center gap-2 text-center text-sm font-semibold text-red-600 bg-red-50 border border-red-200 py-2.5 rounded-xl"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="text-center text-sm font-semibold text-slate-700 py-2.5 rounded-xl border border-slate-200">
                  Login
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="text-center text-sm font-semibold text-white bg-blue-600 py-2.5 rounded-xl shadow-md">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}