"use client";

import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Star, Info, Utensils } from 'lucide-react';
import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isFeatured: boolean;
  isAvailable: boolean;
  tags: string[];
};

interface MenuDisplayProps {
  tableId?: string;
}

export const MenuDisplay: React.FC<MenuDisplayProps> = ({ tableId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch menu');
      const data = await response.json();
      setProducts(data);
      
      // Extract unique categories, ignoring empty ones
      const uniqueCategories = ['All', ...Array.from(new Set(data.map((p: Product) => p.category as string).filter(Boolean)))];
      setCategories(uniqueCategories as string[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && product.isAvailable;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center text-red-500">
          <Info className="h-12 w-12 mx-auto mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Adavakkad</h1>
              {tableId && (
                <p className="text-orange-600 font-medium text-sm flex items-center gap-1">
                  <Utensils className="h-4 w-4" />
                  Table {tableId}
                </p>
              )}
            </div>
            <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
               <ShoppingBag className="h-5 w-5 text-orange-600" />
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
        </div>

        {/* Categories Scroll */}
        <div className="border-t border-gray-100 overflow-x-auto">
           <div className="max-w-md mx-auto px-4 flex gap-4 py-3 min-w-max">
             {categories.map(category => (
               <button
                 key={category}
                 onClick={() => setActiveCategory(category)}
                 className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                   activeCategory === category
                     ? 'bg-orange-600 text-white'
                     : 'bg-white text-gray-600 border border-gray-200'
                 }`}
               >
                 {category}
               </button>
             ))}
           </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-4 overflow-hidden">
            <div className="relative h-24 w-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={product.imageUrl || '/placeholder-food.png'} 
                alt={product.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex justify-between items-start">
                   <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                   {product.isFeatured && <Star className="h-4 w-4 text-yellow-400 fill-current" />}
                </div>
                <p className="text-gray-500 text-xs line-clamp-2 mt-1">{product.description}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                <button className="bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-orange-700 transition-colors">
                  ADD
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No items found.
          </div>
        )}
      </div>
    </div>
  );
};
