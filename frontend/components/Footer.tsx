"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer({ logoText = "Wahis nova" }) {
  return (
    <footer className="bg-[#0a0f1d] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
        
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex gap-0.5 items-center">
              <span className="w-2.5 h-6 bg-blue-600 rounded-full transform -skew-x-12"></span>
              <span className="w-3.5 h-6 border-2 border-blue-600 rounded-full transform -skew-x-12"></span>
            </div>
            <span className="font-extrabold text-xl text-white tracking-tight">{logoText}</span>
          </Link>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            The ultimate trusted marketplace for buying and selling high-quality digital products, website templates, scripts, and complete online businesses.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            {/* Facebook */}
            <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            {/* Twitter / X */}
            <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            {/* Instagram */}
            <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm tracking-wide">Marketplace</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="#" className="hover:text-blue-400 transition">Digital Products</Link></li>
            <li><Link href="/websites-for-sale" className="hover:text-blue-400 transition">Websites For Sale</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">Browse Categories</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">Funding &amp; Invest</Link></li>
          </ul>
        </div>

        {/* Col 3: Support */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm tracking-wide">Customer Support</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="#" className="hover:text-blue-400 transition">Help Center</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">Escrow Protection</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm tracking-wide">Stay Updated</h4>
          <p className="text-xs text-slate-400">Get the latest digital products and marketplace updates.</p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-blue-600 transition"
            />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5">
              Subscribe <ArrowRight size={14} />
            </button>
          </form>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <p>&copy; {new Date().getFullYear()} {logoText}. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-slate-400">Privacy</Link>
          <Link href="#" className="hover:text-slate-400">Terms</Link>
          <Link href="#" className="hover:text-slate-400">Contact</Link>
        </div>
      </div>
    </footer>
  );
}