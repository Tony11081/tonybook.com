'use client';

import { motion } from 'framer-motion';

// 特色功能数据
const features = [
  {
    title: '全球支付',
    description: '支持多种货币和支付方式，无需中国银行账户',
    icon: '💳',
  },
  {
    title: '智能翻译',
    description: '自动将中文商品信息翻译为您的语言',
    icon: '🔄',
  },
  {
    title: '价格透明',
    description: '清晰显示商品价格、税费、运费和服务费',
    icon: '💰',
  },
  {
    title: '全球配送',
    description: '从中国直接发货到全球200+国家和地区',
    icon: '🌎',
  },
  {
    title: '实时追踪',
    description: '随时查看您的包裹配送状态和位置',
    icon: '📦',
  },
  {
    title: '专业客服',
    description: '多语言客服团队提供全天候支持',
    icon: '💬',
  },
];

export default function Features() {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">为什么选择ShopChina</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            我们提供全方位服务，让您轻松购买中国商品
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 