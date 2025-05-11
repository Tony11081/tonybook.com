'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomeHero() {
  return (
    <section className="py-16 px-4 md:py-24">
      <div className="container mx-auto max-w-6xl text-center">
        <motion.h1 
          className="text-4xl font-bold mb-6 md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          购物无国界，<span className="text-blue-600">中国好物</span>直达全球
        </motion.h1>
        
        <motion.p 
          className="text-lg mb-10 max-w-2xl mx-auto text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          通过ShopChina轻松浏览淘宝、微店和小红书，发现最新潮流好物，我们帮您搞定购物、支付和国际配送。
        </motion.p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link 
              href="/browse"
              className="px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
            >
              开始浏览
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link 
              href="/how-to-buy"
              className="px-8 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors font-medium dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              购买指南
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 