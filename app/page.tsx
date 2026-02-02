'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import AppHeader from './dashboard/_components/AppHeader';

export default function HomePage() {
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -right-40 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Navigation - Integrated Header */}
      <AppHeader />

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center space-y-8">
          {/* Main Heading with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
              <span className="text-slate-800">Empower </span>
              <motion.span
                className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Ideas with
              </motion.span>
              <br />
              <span className="text-slate-800">Intelligent Agents. </span>
            </h1>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-3xl md:text-4xl font-semibold text-slate-700"
            >
              No Code, Just Pure AI.
            </motion.h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Design agents that understand, think, and take action for you. From chatbots to task automators — build smarter, faster, easier.
          </motion.p>

          {/* CTA Buttons - Linked to Dashboard/Login */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-violet-600 hover:bg-violet-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-2xl shadow-violet-600/40 hover:shadow-violet-600/60 min-w-[220px]"
              >
                Explore Now
              </motion.button>
            </Link>
            
            <Link href="/dashboard/pricing">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white hover:bg-slate-50 text-slate-800 text-lg font-semibold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl border border-slate-200 min-w-[220px]"
              >
                Contact Support
              </motion.button>
            </Link>
          </motion.div>

          
        </div>
      </main>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}