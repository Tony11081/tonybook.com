import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">ShopChina</h1>
      <p className="text-lg mb-8">Browse Chinese marketplaces with ease</p>
      <div className="flex space-x-4">
        <a 
          href="#browse" 
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          Browse Stores
        </a>
        <a 
          href="#how-to-buy" 
          className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          How to Buy
        </a>
      </div>
    </main>
  )
} 