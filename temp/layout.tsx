import React from 'react';
import './globals.css'

export const metadata = {
  title: 'ShopChina – International Shopping from China',
  description: 'ShopChina: Browse Weidian, Taobao, Xiaohongshu with ease.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  )
} 