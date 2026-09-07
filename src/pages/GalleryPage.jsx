import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

export default function GalleryPage({ onBackToHome }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Simple Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white dark:hover:bg-slate-700 transition-colors shrink-0"
              title="Back to Home"
            >
              <ArrowLeft size={18} />
            </button>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Full Video Gallery
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-16">
        {/* Render the full Gallery component without a limit */}
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
