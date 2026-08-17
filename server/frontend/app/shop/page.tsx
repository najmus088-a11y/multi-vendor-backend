"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  Search, 
  Heart, 
  Star, 
  ShoppingCart, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Grid,
  List
} from "lucide-react";

export default function ShopDigitalProductsPage() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // ব্যাকএন্ড থেকে ভেন্ডরদের আপলোড করা প্রডাক্ট ফেচ করা
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/products'); // আপনার ব্যাকএন্ড প্রডাক্ট রাউট
        
        const contentType = response.headers.get('content-type');
        let data;
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          throw new Error('Invalid server response');
        }

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch products');
        }

        setProducts(data.products || data); // ব্যাকএন্ড রেসপন্স স্ট্রাকচার অনুযায়ী
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoriesList = [
    { name: "All Categories", count: products.length, active: selectedCategory === "All Categories" },
    { name: "Website Templates", count: "256" },
    { name: "Scripts & Code", count: "108" },
    { name: "Software", count: "174" },
    { name: "UI/UX Assets", count: "142" },
    { name: "Plugins", count: "120" },
    { name: "Graphics & Design", count: "106" },
    { name: "eBooks & Courses", count: "96" },
    { name: "Mobile Apps", count: "64" },
  ];

  const topSellers = [
    { name: "ThemeNexus", rating: "4.9 (1.2k)" },
    { name: "CodeGenius", rating: "4.8 (850)" },
    { name: "UIHut", rating: "4.9 (1.1k)" },
    { name: "ScriptLab", rating: "4.7 (627)" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* হেডার কম্পোনেন্ট */}
      <Navbar />

      {/* --- HERO / SEARCH TOP BAR SECTION --- */}
      <section className="bg-gradient-to-b from-[#0a0f1d] to-[#121829] text-white py-12 px-4 sm:px-6 lg:px-16 relative">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <span>&gt;</span>
            <Link href="#" className="hover:text-blue-400">Digital Products</Link>
            <span>&gt;</span>
            <span className="text-white font-medium">Shop</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Shop Digital Products</h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Discover premium digital products uploaded by verified vendors.</p>
            </div>

            {/* Top Right Badge */}
            <div className="bg-slate-900/90 border border-slate-800 px-4 py-3 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 text-blue-400 rounded-xl"><ShieldCheck size={20} /></div>
              <div>
                <p className="text-xs font-bold text-white">10% Buyer Protection</p>
                <p className="text-[10px] text-slate-400">All products are quality checked and secure</p>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3.5 py-2.5 rounded-xl text-xs text-white">
              <Search size={16} className="text-slate-400" />
              <input type="text" placeholder="Search for templates, scripts, software..." className="bg-transparent outline-none w-full text-xs" />
            </div>
            <div className="flex items-center justify-between bg-slate-950 border border-slate-800 px-3.5 py-2.5 rounded-xl text-xs text-slate-300">
              <span>All Categories</span>
              <span className="text-slate-500">▼</span>
            </div>
            <div className="flex items-center justify-between bg-slate-950 border border-slate-800 px-3.5 py-2.5 rounded-xl text-xs text-slate-300">
              <span>Price Range</span>
              <span className="text-slate-500">▼</span>
            </div>
            <div className="flex items-center justify-between bg-slate-950 border border-slate-800 px-3.5 py-2.5 rounded-xl text-xs text-slate-300">
              <span>Sort by: Popular</span>
              <span className="text-slate-500">▼</span>
            </div>
          </div>

          {/* Feature Highlights Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg"><Zap size={16} /></div>
              <div>
                <p className="font-semibold text-white">Instant Download</p>
                <p className="text-[10px] text-slate-400">Get your files instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600/20 text-emerald-400 rounded-lg"><ShieldCheck size={16} /></div>
              <div>
                <p className="font-semibold text-white">Secure Payments</p>
                <p className="text-[10px] text-slate-400">100% secure &amp; safe</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600/20 text-purple-400 rounded-lg"><CheckCircle2 size={16} /></div>
              <div>
                <p className="font-semibold text-white">Quality Products</p>
                <p className="text-[10px] text-slate-400">Premium quality only</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg"><Headphones size={16} /></div>
              <div>
                <p className="font-semibold text-white">24/7 Support</p>
                <p className="text-[10px] text-slate-400">We're here to help</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- MAIN CONTENT & SIDEBAR --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-10 w-full">
        
        {/* Results Header Info */}
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-200">
          <span className="text-xs font-medium text-slate-500">
            {loading ? 'Loading products...' : `Showing ${products.length} uploaded products`}
          </span>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 shadow-sm">
              <Grid size={14} /> Grid
            </button>
            <button className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-600">
              <List size={14} /> List
            </button>
            <button onClick={() => setMobileFilterOpen(!mobileFilterOpen)} className="lg:hidden p-2 bg-blue-600 text-white rounded-lg">
              <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Layout Grid: Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR FILTER */}
          <aside className={`lg:block ${mobileFilterOpen ? "block fixed inset-0 z-50 bg-white p-6 overflow-y-auto" : "hidden"} space-y-6 bg-white p-5 rounded-2xl border border-slate-200 h-fit shadow-sm`}>
            
            {/* Categories */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Categories</h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {categoriesList.map((cat, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left flex justify-between items-center px-3 py-2 rounded-xl transition ${selectedCategory === cat.name ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-50 text-slate-600"}`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{cat.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Price Range</h3>
              <input type="range" className="w-full accent-blue-600 cursor-pointer" />
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                <span>$0</span>
                <span>$500+</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-xl transition shadow-sm">
                Apply Filter
              </button>
            </div>

            {/* Top Sellers */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Top Sellers</h3>
              <div className="space-y-2 text-xs">
                {topSellers.map((seller, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
                        {seller.name[0]}
                      </div>
                      <span className="font-semibold text-slate-800">{seller.name}</span>
                    </div>
                    <span className="text-[10px] text-amber-500 font-medium flex items-center gap-1">
                      <Star size={10} className="fill-amber-500" /> {seller.rating}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {mobileFilterOpen && (
              <button onClick={() => setMobileFilterOpen(false)} className="w-full bg-slate-800 text-white text-xs py-2 rounded-xl mt-4">
                Close Filters
              </button>
            )}
          </aside>

          {/* PRODUCTS GRID */}
          <div className="lg:col-span-3 space-y-6">
            {loading ? (
              <div className="text-center py-20 text-slate-500 text-sm">Loading vendor products...</div>
            ) : error ? (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl text-center">
                {error} (Make sure your backend is running and products are available)
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8">
                <p className="text-slate-600 font-semibold text-sm">No products uploaded by vendors yet!</p>
                <p className="text-slate-400 text-xs mt-1">Products will appear here once vendors upload them.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((item) => (
                  <div key={item._id || item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col justify-between">
                    
                    {/* Card Thumbnail Area */}
                    <div className="h-40 bg-gradient-to-tr from-[#0a0f1d] to-indigo-950 p-4 relative flex flex-col justify-between text-white">
                      <div className="flex justify-between items-center">
                        <span className="bg-blue-600 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                          {item.badge || 'New'}
                        </span>
                        <button className="text-slate-300 hover:text-white p-1 rounded-full bg-slate-800/50 backdrop-blur-sm">
                          <Heart size={14} />
                        </button>
                      </div>
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                      ) : null}
                      <div className="text-center font-bold text-xs text-slate-300 z-10">{item.title}</div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-medium">{item.category || 'Digital Asset'}</span>
                        <span className="text-[10px] text-slate-400">By <strong className="text-slate-700">{item.seller || 'Vendor'}</strong></span>
                      </div>

                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">{item.title}</h4>

                      {/* Ratings & Sales */}
                      <div className="flex justify-between items-center text-[11px] text-slate-500 border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-1 text-amber-500 font-semibold">
                          <Star size={12} className="fill-amber-500" />
                          <span>{item.rating || '5.0'} ({item.reviews || '0'})</span>
                        </div>
                        <span className="text-slate-400">{item.sales || '0 Sales'}</span>
                      </div>

                      {/* Price and Add to Cart */}
                      <div className="flex justify-between items-center pt-1">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-slate-900 text-base">${item.price}</span>
                            {item.oldPrice && <span className="text-[10px] text-slate-400 line-through">${item.oldPrice}</span>}
                          </div>
                        </div>
                        <button className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition">
                          <ShoppingCart size={14} />
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {products.length > 0 && (
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