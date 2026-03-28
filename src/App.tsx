/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  Monitor, 
  Apple, 
  Music, 
  Layers, 
  Mic2, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  CheckCircle2,
  ExternalLink,
  Github,
  Twitter,
  Facebook
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: string;
}

interface DownloadItem {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  size: string;
  image: string;
}

// --- Data ---
const CATEGORIES: Category[] = [
  {
    id: 'windows',
    title: 'Windows Software',
    description: 'Essential tools and utilities for your PC.',
    icon: <Monitor className="w-8 h-8" />,
    link: 'https://4downloads.org/category/windows/',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'mac',
    title: 'Mac OS Software',
    description: 'Premium applications optimized for Apple Silicon.',
    icon: <Apple className="w-8 h-8" />,
    link: 'https://4downloads.org/category/mac-os/',
    color: 'from-gray-600 to-gray-400'
  },
  {
    id: 'audio-library',
    title: 'Audio Library',
    description: 'High-quality samples, loops, and sound packs.',
    icon: <Music className="w-8 h-8" />,
    link: 'https://4downloads.org/category/audio-library/',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'adobe',
    title: 'Adobe Products',
    description: 'Creative Cloud suite for design and video.',
    icon: <Layers className="w-8 h-8" />,
    link: 'https://4downloads.org/category/windows/adobe-products/',
    color: 'from-red-600 to-orange-500'
  },
  {
    id: 'audio-tools',
    title: 'Audio Tools',
    description: 'DAWs, VSTs, and professional mixing plugins.',
    icon: <Mic2 className="w-8 h-8" />,
    link: 'https://4downloads.org/category/windows/audio-tools/',
    color: 'from-emerald-500 to-teal-400'
  }
];

const FEATURED_DOWNLOADS: DownloadItem[] = [
  {
    id: '1',
    name: 'Adobe Photoshop 2024',
    description: 'The world\'s best imaging and graphic design software.',
    category: 'Adobe Products',
    version: 'v25.1',
    size: '2.4 GB',
    image: 'https://picsum.photos/seed/adobe/400/250'
  },
  {
    id: '2',
    name: 'Ableton Live Suite',
    description: 'Professional software for music production and performance.',
    category: 'Audio Tools',
    version: 'v11.3',
    size: '1.8 GB',
    image: 'https://picsum.photos/seed/audio/400/250'
  },
  {
    id: '3',
    name: 'CleanMyMac X',
    description: 'All-in-one package to keep your Mac as good as new.',
    category: 'Mac OS',
    version: 'v4.14',
    size: '85 MB',
    image: 'https://picsum.photos/seed/mac/400/250'
  },
  {
    id: '4',
    name: 'Serum VST',
    description: 'Advanced wavetable synthesizer with high-quality sound.',
    category: 'Audio Library',
    version: 'v1.36',
    size: '150 MB',
    image: 'https://picsum.photos/seed/vst/400/250'
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Download className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">4DOWNLOADS<span className="text-blue-500">.ORG</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {CATEGORIES.map(cat => (
            <a key={cat.id} href={cat.link} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {cat.title.split(' ')[0]}
            </a>
          ))}
          <div className="h-4 w-px bg-white/10 mx-2" />
          <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-500 hover:text-white transition-all duration-300">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {CATEGORIES.map(cat => (
                <a key={cat.id} href={cat.link} className="block text-lg font-medium text-gray-300 hover:text-white">
                  {cat.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            Updated Daily • 100% Virus Free
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
            Your Ultimate Hub for <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Premium Digital Assets
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
            Download the latest software, creative tools, and audio libraries. Fast, secure, and completely free of charge. No unnecessary redirects, just pure speed.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://4downloads.org/" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group">
              Download Now <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#categories" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold text-lg transition-all">
              Explore Categories
            </a>
          </div>
        </motion.div>

        {/* Stats/Trust */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12"
        >
          {[
            { icon: <ShieldCheck className="text-emerald-400" />, label: "Safe Downloads", sub: "Verified Files" },
            { icon: <RefreshCw className="text-blue-400" />, label: "Regularly Updated", sub: "Latest Versions" },
            { icon: <Zap className="text-yellow-400" />, label: "Fast Servers", sub: "Unlimited Speed" },
            { icon: <CheckCircle2 className="text-purple-400" />, label: "Virus-Checked", sub: "100% Secure" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="mb-3">{item.icon}</div>
              <div className="text-white font-bold">{item.label}</div>
              <div className="text-gray-500 text-xs">{item.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CategoryGrid = () => {
  return (
    <section id="categories" className="py-24 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Browse by Category</h2>
            <p className="text-gray-400">Find exactly what you need with our organized software collections.</p>
          </div>
          <a href="https://4downloads.org/" className="text-blue-400 font-bold flex items-center gap-1 hover:text-blue-300 transition-colors">
            View All Categories <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.a
              key={cat.id}
              href={cat.link}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 hover:border-white/20 transition-all"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
              
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                {cat.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{cat.title}</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                {cat.description}
              </p>
              
              <div className="flex items-center text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                Explore Collection <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedDownloads = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Downloads</h2>
          <p className="text-gray-400">The most popular and trending tools this week.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_DOWNLOADS.map((item) => (
            <div key={item.id} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase tracking-wider">
                  {item.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-white leading-tight">{item.name}</h4>
                  <span className="text-[10px] text-gray-500 font-mono">{item.version}</span>
                </div>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{item.size}</span>
                  <button className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-blue-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Why Professionals Choose <br />
              <span className="text-blue-500">4Downloads.org</span>
            </h2>
            <div className="space-y-6">
              {[
                { title: "No Unnecessary Redirects", desc: "We value your time. Direct links to the files you need without annoying ad-loops." },
                { title: "100% Clean Files", desc: "Every upload is scanned with multiple antivirus engines before being listed." },
                { title: "Organized Collections", desc: "Easily find software categorized by OS, type, and creative purpose." },
                { title: "High-Speed Servers", desc: "Our infrastructure ensures you get the maximum speed your connection allows." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <Zap className="text-white" />
                </div>
                <div>
                  <div className="text-white font-bold">Fastest Downloads</div>
                  <div className="text-gray-500 text-xs">Averaging 50MB/s</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '90%' }}
                    className="h-full bg-blue-500"
                  />
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    className="h-full bg-purple-500"
                  />
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '95%' }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>
              <div className="mt-8 text-center text-gray-400 text-sm italic">
                "The most reliable source for audio plugins I've found in years."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SEOBlock = () => {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest opacity-50">Our Mission</h2>
        <div className="text-gray-400 leading-relaxed text-sm md:text-base space-y-4">
          <p>
            4Downloads.org is dedicated to providing the most comprehensive and secure platform for <strong>free software downloads</strong>. Whether you are looking for professional <strong>Windows & Mac tools</strong>, high-end <strong>Adobe products</strong>, or specialized <strong>audio production resources</strong>, we have you covered.
          </p>
          <p>
            Our library includes everything from essential system utilities to advanced creative suites. We prioritize user safety by ensuring all files are virus-checked and hosted on high-speed servers. Explore our <strong>audio library</strong> for the latest samples or browse our <strong>audio tools</strong> section for industry-standard VSTs and DAWs.
          </p>
        </div>
      </div>
    </section>
  );
};

const CTAStrip = () => {
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-white mb-2">Ready to start downloading?</h2>
          <p className="text-blue-100 font-medium">Get access to thousands of premium tools 100% free.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://4downloads.org/category/windows/" className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all">
            Windows Tools
          </a>
          <a href="https://4downloads.org/category/mac-os/" className="px-6 py-3 bg-black/20 text-white border border-white/20 rounded-xl font-bold hover:bg-black/30 transition-all">
            Mac OS Tools
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Download className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tighter">4DOWNLOADS</span>
            </div>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              The world's most trusted source for free software and digital assets. Safe, fast, and always updated.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="https://4downloads.org/" className="hover:text-blue-400 transition-colors">Home Page</a></li>
              <li><a href="https://4downloads.org/category/windows/" className="hover:text-blue-400 transition-colors">Windows Collection</a></li>
              <li><a href="https://4downloads.org/category/mac-os/" className="hover:text-blue-400 transition-colors">Mac OS Collection</a></li>
              <li><a href="https://4downloads.org/category/audio-library/" className="hover:text-blue-400 transition-colors">Audio Library</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Categories</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="https://4downloads.org/category/windows/adobe-products/" className="hover:text-blue-400 transition-colors">Adobe Products</a></li>
              <li><a href="https://4downloads.org/category/windows/audio-tools/" className="hover:text-blue-400 transition-colors">Audio Tools</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">System Utilities</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Video Editing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-gray-500 text-sm mb-4">Get the latest software updates in your inbox.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 flex-grow"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-500 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-600 text-[10px] max-w-2xl text-center md:text-left">
            Disclaimer: 4Downloads.org does not host any files on its server. All contents are provided by non-affiliated third parties. Use at your own risk. We recommend scanning all downloads with your own antivirus software.
          </p>
          <p className="text-gray-500 text-xs">
            © 2026 4Downloads.org. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  // SEO Schema Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "4Downloads.org",
    "url": "https://4downloads.org/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://4downloads.org/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "description": "High-speed, safe, and free software downloads for Windows, Mac, Adobe products, and Audio tools."
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      {/* Schema Injection */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      <Navbar />
      
      <main>
        <Hero />
        <CategoryGrid />
        <FeaturedDownloads />
        <WhyChooseUs />
        <SEOBlock />
        <CTAStrip />
      </main>

      <Footer />
    </div>
  );
}
