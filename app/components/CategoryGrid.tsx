'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// 分类数据
const categories = [
  {
    name: '时尚服饰',
    description: '最新潮流服装、鞋包和配饰',
    image: '/images/fashion.jpg',
    slug: 'fashion',
  },
  {
    name: '美妆个护',
    description: '热门护肤品、彩妆和个人护理产品',
    image: '/images/beauty.jpg',
    slug: 'beauty',
  },
  {
    name: '数码电子',
    description: '创新科技产品和智能设备',
    image: '/images/electronics.jpg',
    slug: 'electronics',
  },
  {
    name: '家居生活',
    description: '精致家居装饰和日用品',
    image: '/images/home.jpg',
    slug: 'home',
  },
  {
    name: '母婴用品',
    description: '高质量婴儿护理和儿童用品',
    image: '/images/baby.jpg',
    slug: 'baby',
  },
  {
    name: '食品保健',
    description: '特色零食、茶叶和保健品',
    image: '/images/food.jpg',
    slug: 'food',
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">热门分类</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            浏览中国顶级电商平台的热门商品分类
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-700"
            >
              <Link href={`/category/${category.slug}`} className="block">
                <div className="h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-4xl">{category.name.charAt(0)}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 