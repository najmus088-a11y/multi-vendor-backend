import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  Search, 
  ChevronDown, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  Star, 
  ShoppingCart, 
  ArrowRight,
  Globe,
  Code,
  Layers,
  FileText,
  Cpu,
  Layout,
  BookOpen,
  MoreHorizontal,
  ExternalLink,
  Tag
} from "lucide-react";

export default function HomePage() {
  // ক্যাটাগরি ডাটা
  const categories = [
    { name: "Website Templates", count: "1200+ Products", icon: <Layout size={22} /> },
    { name: "Scripts & Code", count: "950+ Products", icon: <Code size={22} /> },
    { name: "Software", count: "650+ Products", icon: <Cpu size={22} /> },
    { name: "UI/UX Assets", count: "800+ Products", icon: <Layers size={22} /> },
    { name: "Plugins", count: "750+ Products", icon: <Zap size={22} /> },
    { name: "Graphics & Design", count: "1500+ Products", icon: <FileText size={22} /> },
    { name: "eBooks & Courses", count: "500+ Products", icon: <BookOpen size={22} /> },
    { name: "Others", count: "300+ Products", icon: <MoreHorizontal size={22} /> },
  ];

  // টপ বা ফিচার্ড ওয়েবসাইট সেল ডাটা (Websites for Sale)
  const topWebsites = [
    {
      id: 1,
      title: "E-Commerce Multi-Vendor Empire",
      niche: "eCommerce / Dropshipping",
      revenue: "$4,500/mo",
      price: "$12,500",
      platform: "Next.js & Node",
      badge: "Top Seller"
    },
    {
      id: 2,
      title: "AI Content Writer SaaS Platform",
      niche: "Artificial Intelligence",
      revenue: "$2,800/mo",
      price: "$9,800",
      platform: "React & Laravel",
      badge: "Featured"
    },
    {
      id: 3,
      title: "Digital Assets Marketplace Site",
      niche: "Digital Products",
      revenue: "$1,900/mo",
      price: "$6,500",
      platform: "WordPress / PHP",
      badge: "Hot Listing"
    }
  ];

  // প্রোডাক্ট কার্ড ডাটা (Featured & Popular)
  const products = [
    {
      id: 1,
      title: "SaaS Landing Page Next.js Template",
      category: "ThemeChase",
      price: "$19.00",
      oldPrice: "$29.00",
      rating: 5,
      badge: "Featured"
    },
    {
      id: 2,
      title: "React Admin Dashboard Pro Template",
      category: "EcoPixel",
      price: "$44.00",
      oldPrice: "$59.00",
      rating: 5,
      badge: "Featured"
    },
    {
      id: 3,
      title: "PHP Multi Vendor eCommerce Script",
      category: "CodeCanyon",
      price: "$49.00",
      oldPrice: "$69.00",
      rating: 5,
      badge: "Featured"
    },
    {
      id: 4,
      title: "Figma - eCommerce UI Kit",
      category: "PixelCraft",
      price: "$16.00",
      oldPrice: "$24.00",
      rating: 5,
      badge: "Featured"
    }
  ];

  // টেস্টমোনিয়াল ডাটা
  const testimonials = [
    {
      comment: "I found an amazing website for my business. The process was smooth and the support was excellent!",
      name: "Alex Johnson",
      role: "Entrepreneur"
    },
    {
      comment: "Best marketplace for digital products. High quality items and instant delivery every time.",
      name: "Sarah Williams",
      role: "Web Developer"
    },
    {
      comment: "Selling my digital products here is super easy and the earnings are great!",
      name: "Michael Brown",
      role: "Product Designer"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* হেডার কম্পোনেন্ট */}
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="bg-gradient-to-b from-[#0a0f1d] to-[#121829] text-white py-16 px-4 sm:px-6 lg:px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Buy & Sell Digital Products <br />
            <span className="text-blue-500">&amp; Websites</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            All in One Trusted Marketplace. Find premium digital products, websites for sale, templates, scripts, tools and much more. Join thousands of buyers and sellers worldwide.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/25 transition">
              Explore Digital Products
            </Link>
            <Link href="/websites-for-sale" className="bg-slate-800/80 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl border border-slate-700 transition">
              Browse Websites
            </Link>
          </div>
        </div>

        {/* Hero Bottom Feature Bar */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-slate-800/80 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl"><CheckCircle2 size={20} /></div>
            <div>
              <h4 className="font-semibold">Trusted Marketplace</h4>
              <p className="text-xs text-slate-400">Verified sellers &amp; secure deals</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl"><ShieldCheck size={20} /></div>
            <div>
              <h4 className="font-semibold">Secure Payments</h4>
              <p className="text-xs text-slate-400">Escrow protection for every deal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-600/20 text-purple-400 rounded-xl"><Zap size={20} /></div>
            <div>
              <h4 className="font-semibold">Instant Delivery</h4>
              <p className="text-xs text-slate-400">Get your digital products instantly</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600/20 text-emerald-400 rounded-xl"><Headphones size={20} /></div>
            <div>
              <h4 className="font-semibold">24/7 Support</h4>
              <p className="text-xs text-slate-400">We're here to help you</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEARCH DIGITAL PRODUCTS --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 -mt-8 relative z-10 w-full">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80">
          <h3 className="text-center font-bold text-slate-800 text-lg mb-1">Find The Perfect Digital Product or Website</h3>
          <p className="text-center text-xs text-slate-500 mb-6">Search from thousands of listings</p>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Search for templates, scripts, established websites..." className="bg-transparent w-full outline-none text-sm text-slate-700" />
            </div>
            
            <div className="flex items-center gap-3">
              <select className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm text-slate-700 outline-none w-full md:w-auto">
                <option>All Categories</option>
                <option>Websites for Sale</option>
                <option>Templates</option>
                <option>Scripts</option>
              </select>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition w-full md:w-auto">
                <Search size={16} /> Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- TOP WEBSITES FOR SALE (নতুন যুক্ত করা সেকশন) --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Globe className="text-blue-600" size={24} /> Top Websites for Sale
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">Fully functional, revenue-generating established websites ready to transfer</p>
          </div>
          <Link href="/websites-for-sale" className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
            View All Websites <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topWebsites.map((site) => (
            <div key={site.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col justify-between group">
              <div className="h-40 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 p-5 relative flex flex-col justify-between text-white">
                <div className="flex justify-between items-center">
                  <span className="bg-blue-600 text-[10px] font-semibold px-2.5 py-1 rounded-full">{site.badge}</span>
                  <span className="text-xs bg-black/30 backdrop-blur px-2.5 py-1 rounded-md text-slate-200 font-medium">{site.platform}</span>
                </div>
                <div>
                  <span className="text-xs text-blue-300 font-medium">{site.niche}</span>
                  <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-blue-200 transition line-clamp-1">{site.title}</h3>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Monthly Revenue</span>
                    <span className="font-bold text-emerald-600 text-sm">{site.revenue}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Asking Price</span>
                    <span className="font-extrabold text-slate-900 text-base">{site.price}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link href={`/websites-for-sale/${site.id}`} className="text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-1">
                    Details & Metrics <ExternalLink size={14} />
                  </Link>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-md shadow-blue-500/20">
                    Make Offer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- BROWSE CATEGORIES --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900">Browse Categories</h2>
          <p className="text-sm text-slate-500">Explore our most popular digital product categories</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition text-center flex flex-col items-center justify-center gap-2 group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                {cat.icon}
              </div>
              <h4 className="font-semibold text-xs text-slate-800">{cat.name}</h4>
              <span className="text-[10px] text-slate-400">{cat.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURED PRODUCTS --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pb-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Featured Products</h2>
            <p className="text-xs sm:text-sm text-slate-500">Handpicked premium products from our best sellers</p>
          </div>
          <Link href="#" className="text-sm font-semibold text-blue-600 hover:underline">View All</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition flex flex-col justify-between">
              <div className="h-44 bg-gradient-to-r from-slate-900 to-indigo-950 p-4 relative flex flex-col justify-between text-white">
                <span className="bg-blue-600 text-[10px] font-semibold px-2.5 py-1 rounded-full w-fit">{item.badge}</span>
                <div className="text-center font-bold text-sm text-slate-300">[ Product Preview Box ]</div>
              </div>

              <div className="p-4 space-y-3">
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{item.category}</span>
                <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{item.title}</h4>
                
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                  <span className="text-xs text-slate-400 ml-1">(5.0)</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <div>
                    <span className="font-extrabold text-slate-900 text-base">{item.price}</span>
                    <span className="text-xs text-slate-400 line-through ml-2">{item.oldPrice}</span>
                  </div>
                  <button className="p-2 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl text-slate-700 transition">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- POPULAR PRODUCTS --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pb-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Popular Products</h2>
            <p className="text-xs sm:text-sm text-slate-500">Trending products our customers love</p>
          </div>
          <Link href="#" className="text-sm font-semibold text-blue-600 hover:underline">View All</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div key={`pop-${item.id}`} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition flex flex-col justify-between">
              <div className="h-44 bg-gradient-to-r from-blue-950 to-slate-900 p-4 relative flex flex-col justify-between text-white">
                <span className="bg-purple-600 text-[10px] font-semibold px-2.5 py-1 rounded-full w-fit">Trending</span>
                <div className="text-center font-bold text-sm text-slate-300">[ Product Preview Box ]</div>
              </div>

              <div className="p-4 space-y-3">
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{item.category}</span>
                <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{item.title}</h4>
                
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                  <span className="text-xs text-slate-400 ml-1">(4.9)</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <div>
                    <span className="font-extrabold text-slate-900 text-base">{item.price}</span>
                    <span className="text-xs text-slate-400 line-through ml-2">{item.oldPrice}</span>
                  </div>
                  <button className="p-2 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl text-slate-700 transition">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- STATS BANNER --- */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-16 my-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-400 mb-1">10K+</h3>
            <p className="text-xs text-slate-400">Digital Products</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-400 mb-1">5K+</h3>
            <p className="text-xs text-slate-400">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-400 mb-1">2K+</h3>
            <p className="text-xs text-slate-400">Verified Sellers</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-400 mb-1">98%</h3>
            <p className="text-xs text-slate-400">Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900">How It Works</h2>
          <p className="text-sm text-slate-500">Simple steps to buy or sell</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto font-bold">1</div>
            <h4 className="font-bold text-slate-800 text-sm">Create Account</h4>
            <p className="text-xs text-slate-500">Sign up and join our marketplace</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto font-bold">2</div>
            <h4 className="font-bold text-slate-800 text-sm">Browse Products</h4>
            <p className="text-xs text-slate-500">Find the perfect digital product or website</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto font-bold">3</div>
            <h4 className="font-bold text-slate-800 text-sm">Secure Payment</h4>
            <p className="text-xs text-slate-500">Pay securely with our escrow system</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto font-bold">4</div>
            <h4 className="font-bold text-slate-800 text-sm">Instant Access</h4>
            <p className="text-xs text-slate-500">Get access to your digital product instantly</p>
          </div>
        </div>
      </section>

      {/* --- WHAT OUR CUSTOMERS SAY --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900">What Our Customers Say</h2>
          <p className="text-sm text-slate-500">Trusted by thousands of buyers and sellers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs text-slate-600 italic">"{t.comment}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-700 text-xs">
                  {t.name[0]}
                </div>
                <div>
                  <h5 className="font-semibold text-xs text-slate-800">{t.name}</h5>
                  <span className="text-[10px] text-slate-400">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ফুটার কম্পোনেন্ট */}
      <Footer />

    </div>
  );
}