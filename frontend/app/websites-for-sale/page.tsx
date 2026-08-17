"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  Heart, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  SlidersHorizontal,
  Bookmark,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function WebsitesForSalePage() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [websites, setWebsites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('All Niches');

  // ব্যাকএন্ড থেকে ওয়েবসাইট লিস্টিং ফেচ করা
  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/websites'); // আপনার ব্যাকএন্ড ওয়েবসাইট রাউট
        
        const contentType = response.headers.get('content-type');
        let data;
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          throw new Error('Invalid server response');
        }

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch websites');
        }

        setWebsites(data.websites || data); // ব্যাকএন্ড রেসপন্স স্ট্রাকচার অনুযায়ী
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchWebsites();
  }, []);

  const popularSearches = ["Blog", "News", "SaaS", "E-commerce", "Education", "Health", "Finance"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* হেডার কম্পোনেন্ট */}
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="bg-gradient-to-b from-[#0a0f1d] to-[#121829] text-white py-16 px-4 sm:px-6 lg:px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-6 max-w-2xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Buy &amp; Sell Profitable <br />
              <span className="text-blue-500">Websites</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Discover verified websites with real traffic and revenue. Find your next online business today.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/25 transition flex items-center gap-2">
                <Search size={16} /> Browse Websites
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl border border-slate-700 transition flex items-center gap-2">
                How It Works
              </button>
            </div>
          </div>

          {/* Right Floating Stats Card Preview */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-2xl w-full md:w-80 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Monthly Profit</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-semibold">Verified</span>
            </div>
            <h3 className="text-2xl font-bold text-white">$3,650</h3>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs text-slate-400">
              <div>
                <p className="text-slate-200 font-bold text-sm">245K</p>
                <p>Page Views</p>
              </div>
              <div className="text-right">
                <span className="text-emerald-400 font-semibold">+12.5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Bottom Bar */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-slate-800 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl"><CheckCircle2 size={20} /></div>
            <div>
              <h4 className="font-semibold">Verified Listings</h4>
              <p className="text-xs text-slate-400">All listings are manually verified</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl"><ShieldCheck size={20} /></div>
            <div>
              <h4 className="font-semibold">Secure Transactions</h4>
              <p className="text-xs text-slate-400">Escrow protection for safe deals</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-600/20 text-purple-400 rounded-xl"><Zap size={20} /></div>
            <div>
              <h4 className="font-semibold">15% Platform Fee</h4>
              <p className="text-xs text-slate-400">Only 15% success fee on sales</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600/20 text-emerald-400 rounded-xl"><Headphones size={20} /></div>
            <div>
              <h4 className="font-semibold">24/7 Support</h4>
              <p className="text-xs text-slate-400">Our team is always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT & FILTER SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-10 w-full">
        
        {/* Breadcrumb & Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span>&gt;</span>
              <span className="text-slate-800 font-medium">Websites For Sale</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Websites For Sale</h2>
            <p className="text-xs text-slate-500">Browse verified websites and online businesses for sale.</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs text-slate-500 font-medium">
              {loading ? 'Loading...' : `${websites.length} Websites Found`}
            </span>
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-700">
              <span>Sort by:</span>
              <select className="bg-transparent font-semibold outline-none cursor-pointer">
                <option>Newest Listed</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Profit</option>
              </select>
            </div>
            <button 
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)} 
              className="lg:hidden p-2 bg-blue-600 text-white rounded-xl"
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Popular Search Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-bold text-slate-700 mr-2">Popular Searches:</span>
          {popularSearches.map((tag, idx) => (
            <Link key={idx} href="#" className="bg-white border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs px-3 py-1.5 rounded-full text-slate-600 transition shadow-sm">
              {tag}
            </Link>
          ))}
        </div>

        {/* Layout Grid: Sidebar + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR FILTER */}
          <aside className={`lg:block ${mobileFilterOpen ? "block fixed inset-0 z-50 bg-white p-6 overflow-y-auto" : "hidden"} space-y-6 bg-white p-5 rounded-2xl border border-slate-200 h-fit shadow-sm`}>
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Filter size={16} className="text-blue-600" /> Filter Websites
              </h3>
              <button className="text-xs text-blue-600 hover:underline font-semibold">Reset All</button>
              {mobileFilterOpen && (
                <button onClick={() => setMobileFilterOpen(false)} className="lg:hidden text-xs bg-slate-100 px-2 py-1 rounded">Close</button>
              )}
            </div>

            {/* Niche */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Niche</label>
              <select 
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs text-slate-700 outline-none"
              >
                <option>All Niches</option>
                <option>Blog &amp; Content</option>
                <option>eCommerce</option>
                <option>SaaS</option>
              </select>
            </div>

            {/* Monetization */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Monetization</label>
              <div className="space-y-1.5 text-xs text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-blue-600" /> AdSense</label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-blue-600" /> Affiliate</label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-blue-600" /> E-commerce</label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-blue-600" /> SaaS</label>
              </div>
            </div>

            {/* Monthly Profit */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Monthly Profit</label>
              <div className="flex items-center gap-2">
                <input type="text" placeholder="$ Min" className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none" />
                <span className="text-xs text-slate-400">to</span>
                <input type="text" placeholder="$ Max" className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none" />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Price Range</label>
              <input type="range" className="w-full accent-blue-600 cursor-pointer" />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>$100</span>
                <span>$500,000+</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-3 rounded-xl transition shadow-md">
              Apply Filters
            </button>
          </aside>

          {/* WEBSITES GRID */}
          <div className="lg:col-span-3 space-y-6">
            {loading ? (
              <div className="text-center py-20 text-slate-500 text-sm">Loading listed websites...</div>
            ) : error ? (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl text-center">
                {error} (Make sure your backend server is running)
              </div>
            ) : websites.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8">
                <p className="text-slate-600 font-semibold text-sm">No websites listed for sale yet!</p>
                <p className="text-slate-400 text-xs mt-1">Listings will appear here once vendors add them.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {websites.map((site) => (
                  <div key={site._id || site.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col justify-between">
                    
                    {/* Card Header Banner */}
                    <div className="h-36 bg-gradient-to-r from-slate-900 to-indigo-950 p-4 relative flex flex-col justify-between text-white">
                      <div className="flex justify-between items-center">
                        <span className={`bg-blue-600 text-[10px] font-semibold px-2.5 py-1 rounded-full`}>
                          {site.badge || 'Verified'}
                        </span>
                        <button className="text-slate-300 hover:text-white p-1 rounded-full bg-slate-800/50 backdrop-blur-sm">
                          <Heart size={14} />
                        </button>
                      </div>
                      {site.image ? (
                        <img src={site.image} alt={site.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                      ) : null}
                      <div className="text-center font-bold text-xs text-slate-300 z-10">{site.title}</div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                          {site.category || site.niche || 'Website'}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 size={12} /> Verified
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{site.title}</h4>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl text-xs">
                        <div>
                          <p className="text-[10px] text-slate-400">Monthly Profit</p>
                          <p className="font-bold text-slate-800">${site.profit}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400">Monthly Revenue</p>
                          <p className="font-bold text-slate-800">${site.revenue}</p>
                        </div>
                        <div className="pt-1 border-t border-slate-200/60">
                          <p className="text-[10px] text-slate-400">Visitors / month</p>
                          <p className="font-semibold text-slate-700">{site.visitors || 'N/A'}</p>
                        </div>
                        <div className="pt-1 border-t border-slate-200/60">
                          <p className="text-[10px] text-slate-400">Age</p>
                          <p className="font-semibold text-slate-700">{site.age || '1 Year'}</p>
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Asking Price</span>
                          <span className="font-extrabold text-slate-900 text-base">${site.price}</span>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition">
                          View Details
                        </button>
                      </div>

                      {/* Seller Info */}
                      <div className="flex justify-between items-center pt-2 text-[10px] text-slate-500 border-t border-slate-100">
                        <span>Seller: <strong className="text-slate-700">{site.seller || 'Verified Vendor'}</strong></span>
                        <Bookmark size={14} className="text-slate-400 hover:text-blue-600 cursor-pointer" />
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {websites.length > 0 && (
              <div className="flex justify-center items-center gap-2 pt-8">
                <button className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"><ChevronLeft size={16} /></button>
                <button className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm">1</button>
                <button className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"><ChevronRight size={16} /></button>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ফুটার কম্পোনেন্ট */}
      <Footer />

    </div>
  );
}