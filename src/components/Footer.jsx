import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-[#070a12] border-t border-slate-200 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="p-1 rounded-xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 shadow-sm">
              <img
                src="/company-logo.png"
                alt="Company Logo"
                className="h-12 w-auto object-contain rounded-lg"
              />
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Random Innovators
              </h4>
              <p className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase mt-0.5">
                IMAGINE | INNOVATE | IMPACT.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a
              href="#home"
              className="hover:text-indigo-600 dark:hover:text-amber-300 transition-colors"
            >
              Home
            </a>
            <a
              href="#gallery"
              className="hover:text-indigo-600 dark:hover:text-amber-300 transition-colors"
            >
              Gallery
            </a>
            <a
              href="#mentor"
              className="hover:text-indigo-600 dark:hover:text-amber-300 transition-colors"
            >
              Mentors
            </a>
            <a
              href="#team"
              className="hover:text-indigo-600 dark:hover:text-amber-300 transition-colors"
            >
              Team
            </a>
          </div>
        </div>

        {/* Bottom divider & copyright */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {currentYear} Random Innovators. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/random.innovators?stkn=bWp5aTQyd2I3ZXJt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
          <p className="hidden md:flex items-center gap-1 text-slate-400 dark:text-slate-500">
            Built with modern MERN architecture
          </p>
        </div>
      </div>
    </footer>
  );
}
