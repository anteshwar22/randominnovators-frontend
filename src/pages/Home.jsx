import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Gallery from '../components/Gallery';
import Team from '../components/Team';
import Mentor from '../components/Mentor';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { ArrowRight, Target, Compass, Zap, ShieldCheck, Award, ExternalLink } from 'lucide-react';
import { getProducts } from '../services/productService';

export default function Home({
  onOpenAuth,
  onOpenDashboard,
  onExploreTeam,
  onExploreGallery
}) {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        const handleData = (response) => {
          if (!response) return;
          if (response.success) {
            setProducts(response.data);
          } else if (Array.isArray(response)) {
            setProducts(response);
          } else if (response.data) {
            setProducts(response.data);
          }
        };
        const response = await getProducts(handleData, controller.signal);
        handleData(response);
      } catch (error) {
        if (error.name !== 'CanceledError') {
          console.error("Error fetching products:", error);
        }
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <Navbar onOpenAuth={onOpenAuth} onOpenDashboard={onOpenDashboard} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 text-center max-w-5xl mx-auto overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/20 dark:bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          <h1 className="relative text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 dark:from-indigo-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Empowering the Future
          </h1>
          <p className="relative text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            We provide innovative solutions and platforms to help you grow, learn, and succeed in the modern digital landscape.
          </p>
          <div className="relative flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onExploreGallery}
              className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 group"
            >
              Explore Our Work Culture
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onExploreTeam}
              className="px-8 py-4 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium transition-all border border-slate-200 dark:border-slate-700"
            >
              Meet the Team
            </button>
          </div>
        </section>

        {/* About / Introduction Section */}
        <section className="py-20 bg-white dark:bg-[#0f172a] border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                  About Our Organization
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  We are a team of passionate individuals dedicated to delivering high-quality digital experiences. Our platform connects professionals and learners, fostering a community built on innovation, collaboration, and continuous improvement.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Whether you are looking to advance your career, discover new talents, or collaborate on groundbreaking projects, we have the tools and resources you need to succeed.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-indigo-100 to-cyan-100 dark:from-indigo-900/30 dark:to-cyan-900/30 border border-indigo-200 dark:border-indigo-800/50 flex items-center justify-center p-8 overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-80 mix-blend-overlay"></div>
                  <div className="relative z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 rounded-xl border border-white/20 dark:border-slate-700 shadow-xl">
                     <p className="text-xl font-semibold text-center text-indigo-600 dark:text-indigo-400">"Innovation distinguishes between a leader and a follower."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Purpose</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Guiding principles that drive our every decision and action.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-[#151e32] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  To provide accessible, high-quality platforms that empower individuals and organizations to achieve their highest potential through continuous learning and meaningful connections.
                </p>
              </div>
              <div className="bg-white dark:bg-[#151e32] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 rounded-xl flex items-center justify-center mb-6">
                  <Compass className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  To become the global standard for digital collaboration and skill development, creating a world where opportunity is universally accessible to everyone, everywhere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services / Features Section */}
        <section className="py-20 bg-slate-100 dark:bg-[#0f172a]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products & Services</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Explore the tools and platforms we've built to help you succeed.
              </p>
            </div>
            
            {loadingProducts ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
              </div>
            ) : products.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <a 
                    key={product._id || product.id} 
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white dark:bg-[#151e32] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg transition-all flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        <Zap className="w-6 h-6" />
                      </div>
                      <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors opacity-0 group-hover:opacity-100" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{product.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-auto text-sm break-all">{product.link}</p>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-[#151e32] rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400">More exciting products and services are coming soon.</p>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Us / Key Highlights */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                What sets us apart from the rest.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Trusted & Secure</h3>
                <p className="text-slate-600 dark:text-slate-400">Enterprise-grade security and reliability you can count on for your most important work.</p>
              </div>
              <div>
                <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                <p className="text-slate-600 dark:text-slate-400">Optimized performance ensuring you get things done quickly without any lag or delays.</p>
              </div>
              <div>
                <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Award Winning</h3>
                <p className="text-slate-600 dark:text-slate-400">Recognized globally for our innovative approach and dedication to user experience.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Preview */}
        <section className="py-20 bg-slate-100 dark:bg-[#0f172a] border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-10 gap-4">
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold mb-2">Featured Media</h2>
                <p className="text-slate-600 dark:text-slate-400">Watch our latest content and updates</p>
              </div>
              <button
                onClick={onExploreGallery}
                className="hidden sm:inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
              >
                View all media <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <Gallery limit={3} onExploreGallery={onExploreGallery} />
            <button
              onClick={onExploreGallery}
              className="sm:hidden mt-8 w-full py-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-center font-medium transition-colors border border-indigo-200 dark:border-indigo-800"
            >
              View all media
            </button>
          </div>
        </section>

        {/* Mentor Preview */}
        <Mentor />

        {/* Team Preview */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-10 gap-4">
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold mb-2">Our Team</h2>
                <p className="text-slate-600 dark:text-slate-400">Meet the amazing people behind the scenes</p>
              </div>
              <button
                onClick={onExploreTeam}
                className="hidden sm:inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
              >
                View full directory <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <Team limit={3} onExploreTeam={onExploreTeam} />
            <button
              onClick={onExploreTeam}
              className="sm:hidden mt-8 w-full py-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-center font-medium transition-colors border border-indigo-200 dark:border-indigo-800"
            >
              View full directory
            </button>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-600 dark:bg-indigo-900"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-white/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              Join our growing community and take your journey to the next level today.
            </p>
            <button
              onClick={() => onOpenAuth('employee')}
              className="px-8 py-4 rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 font-bold text-lg transition-all shadow-xl shadow-black/10 hover:scale-105"
            >
              Join Us Now
            </button>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-slate-50 dark:bg-[#0b0f19]">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}