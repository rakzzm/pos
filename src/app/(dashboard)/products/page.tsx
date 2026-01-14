"use client";

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  AlertCircle,
  Star,
  Eye,
  Package,
  Grid,
  List,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Image from 'next/image';
import { useProductStore } from '../../../stores/productStore';
import { Modal } from '../../../components/Modal';
import { ConfirmDialog } from '../../../components/ConfirmDialog';

const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;

type ViewMode = 'grid' | 'list';

export default function ProductsPage() {
  const { products, loading, error, fetchProducts, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [priceRange] = useState({ min: '', max: '' });
  const [stockFilter, setStockFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image_url: '',
    sku: '',
    cost_price: '',
    profit_margin: '',
    tags: '',
    is_featured: false,
    is_available: true
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await fetchProducts();
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    loadProducts();
  }, [fetchProducts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        cost_price: parseFloat(formData.cost_price) || 0,
        profit_margin: parseFloat(formData.profit_margin) || 0,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      if (selectedProduct) {
        await updateProduct(selectedProduct.id, productData);
        setIsEditModalOpen(false);
      } else {
        await addProduct(productData);
        setIsAddModalOpen(false);
      }
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image_url: '',
        sku: '',
        cost_price: '',
        profit_margin: '',
        tags: '',
        is_featured: false,
        is_available: true
      });
    } catch (err) {
      console.error('Failed to save product:', err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      image_url: product.image_url,
      sku: product.sku || '',
      cost_price: product.cost_price?.toString() || '',
      profit_margin: product.profit_margin?.toString() || '',
      tags: product.tags?.join(', ') || '',
      is_featured: product.is_featured || false,
      is_available: product.is_available !== false
    });
    setIsEditModalOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleView = (product: any) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = (product: any) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      try {
        await deleteProduct(selectedProduct.id);
        setIsDeleteDialogOpen(false);
        setSelectedProduct(null);
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { status: 'Out of Stock', color: 'text-red-600 bg-red-50', icon: XCircle };
    if (stock <= 10) return { status: 'Low Stock', color: 'text-yellow-600 bg-yellow-50', icon: AlertCircle };
    return { status: 'In Stock', color: 'text-green-600 bg-green-50', icon: CheckCircle };
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    const matchesPriceRange = (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
      (!priceRange.max || product.price <= parseFloat(priceRange.max));
    const matchesStock = stockFilter === 'all' ||
      (stockFilter === 'in-stock' && product.stock > 10) ||
      (stockFilter === 'low-stock' && product.stock <= 10 && product.stock > 0) ||
      (stockFilter === 'out-of-stock' && product.stock === 0);
    return matchesSearch && matchesCategory && matchesPriceRange && matchesStock;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'stock': return b.stock - a.stock;
      case 'category': return a.category.localeCompare(b.category);
      default: return a.name.localeCompare(b.name);
    }
  });

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load products</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchProducts()}
            className="px-4 py-2 bg-products-accent text-white rounded-md hover:bg-products-accent/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const ProductForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-products-primary focus:border-transparent transition-all duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
          <input
            type="text"
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-products-primary focus:border-transparent transition-all duration-300"
            placeholder="Product SKU"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-products-primary focus:border-transparent transition-all duration-300"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price (₹)</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-products-primary focus:border-transparent transition-all duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cost Price (₹)</label>
          <input
            type="number"
            step="0.01"
            value={formData.cost_price}
            onChange={(e) => setFormData({ ...formData, cost_price: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-products-primary focus:border-transparent transition-all duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-products-primary focus:border-transparent transition-all duration-300"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-products-primary focus:border-transparent transition-all duration-300"
            required
          >
            <option value="">Select a category</option>
            <option value="Pizza">Pizza</option>
            <option value="Burgers">Burgers</option>
            <option value="Drinks">Drinks</option>
            <option value="Desserts">Desserts</option>
            <option value="Appetizers">Appetizers</option>
            <option value="Main Course">Main Course</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profit Margin (%)</label>
          <input
            type="number"
            step="0.01"
            value={formData.profit_margin}
            onChange={(e) => setFormData({ ...formData, profit_margin: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-products-primary focus:border-transparent transition-all duration-300"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
        <input
          type="url"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-products-primary focus:border-transparent transition-all duration-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-products-primary focus:border-transparent transition-all duration-300"
          placeholder="spicy, vegetarian, popular"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.is_featured}
            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
            className="rounded border-gray-300 text-products-primary focus:ring-products-primary"
          />
          <span className="ml-2 text-sm text-gray-700">Featured Product</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.is_available}
            onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
            className="rounded border-gray-300 text-products-primary focus:ring-products-primary"
          />
          <span className="ml-2 text-sm text-gray-700">Available for Sale</span>
        </label>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
          }}
          className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-products-primary to-products-secondary text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium"
        >
          {selectedProduct ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ProductCard = ({ product }: { product: any }) => {
    const stockInfo = getStockStatus(product.stock);
    const StockIcon = stockInfo.icon;

    return (
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:scale-105">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <Image
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.is_featured && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </div>
          )}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${stockInfo.color} flex items-center`}>
            <StockIcon className="w-3 h-3 mr-1" />
            {stockInfo.status}
          </div>

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <button
                onClick={() => handleView(product)}
                className="p-2 bg-white rounded-full text-gray-700 hover:text-products-primary transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleEdit(product)}
                className="p-2 bg-white rounded-full text-gray-700 hover:text-products-primary transition-colors"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(product)}
                className="p-2 bg-white rounded-full text-gray-700 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-products-primary transition-colors">
              {product.name}
            </h3>
            <span className="px-3 py-1 bg-products-primary/10 text-products-primary rounded-full text-xs font-medium">
              {product.category}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {product.tags.slice(0, 3).map((tag: string, index: number) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Price and Stock */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(product.price)}</div>
              {product.cost_price && (
                <div className="text-sm text-gray-500">
                  Cost: {formatCurrency(product.cost_price)}
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Stock: {product.stock}</div>
              {product.profit_margin && (
                <div className="text-sm text-green-600">
                  Margin: {product.profit_margin}%
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(product)}
              className="flex-1 bg-gradient-to-r from-products-primary to-products-secondary text-white py-2 px-4 rounded-xl hover:scale-105 transition-all duration-300 font-medium flex items-center justify-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              onClick={() => handleView(product)}
              className="px-4 py-2 border border-products-primary text-products-primary rounded-xl hover:bg-products-primary hover:text-white transition-all duration-300"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ProductListItem = ({ product }: { product: any }) => {
    const stockInfo = getStockStatus(product.stock);
    const StockIcon = stockInfo.icon;

    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
        <div className="flex items-center gap-6">
          <Image
            className="rounded-xl object-cover"
            src={product.image_url}
            alt={product.name}
            width={80}
            height={80}
          />

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {product.is_featured && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </span>
                )}
                <span className="px-3 py-1 bg-products-primary/10 text-products-primary rounded-full text-xs font-medium">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-xl font-bold text-gray-900">{formatCurrency(product.price)}</div>
                  {product.cost_price && (
                    <div className="text-sm text-gray-500">Cost: {formatCurrency(product.cost_price)}</div>
                  )}
                </div>
                <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${stockInfo.color}`}>
                  <StockIcon className="w-4 h-4 mr-1" />
                  {product.stock} in stock
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleView(product)}
                  className="p-2 text-gray-500 hover:text-products-primary transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleEdit(product)}
                  className="p-2 text-gray-500 hover:text-products-primary transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(product)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-products-bg via-products-bg/30 to-products-bg/80 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-products-primary/20 to-products-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-products-accent/20 to-products-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-products-primary/10 to-products-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-shimmer-gradient bg-[length:200%_100%] rounded-full animate-shimmer opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-radial-shine rounded-full animate-glow"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-products-primary to-products-secondary bg-clip-text text-transparent mb-2">
            Product Management
          </h1>
          <p className="text-gray-600">Manage your restaurant menu and inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-products-primary to-products-secondary rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold">{products.length}</p>
              </div>
              <Package className="h-12 w-12 text-white/30" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">In Stock</p>
                <p className="text-3xl font-bold text-green-600">
                  {products.filter(p => p.stock > 10).length}
                </p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-300" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Low Stock</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {products.filter(p => p.stock <= 10 && p.stock > 0).length}
                </p>
              </div>
              <AlertCircle className="h-12 w-12 text-yellow-300" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Out of Stock</p>
                <p className="text-3xl font-bold text-red-600">
                  {products.filter(p => p.stock === 0).length}
                </p>
              </div>
              <XCircle className="h-12 w-12 text-red-300" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl w-full focus:ring-2 focus:ring-products-primary focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-products-primary focus:border-transparent transition-all duration-300"
              >
                <option value="">All Categories</option>
                <option value="Pizza">Pizza</option>
                <option value="Burgers">Burgers</option>
                <option value="Drinks">Drinks</option>
                <option value="Desserts">Desserts</option>
                <option value="Appetizers">Appetizers</option>
                <option value="Main Course">Main Course</option>
              </select>

              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-products-primary focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Stock</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-products-primary focus:border-transparent transition-all duration-300"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="stock">Stock Level</option>
                <option value="category">Category</option>
              </select>

              {/* View Toggle */}
              <div className="flex border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${viewMode === 'grid'
                      ? 'bg-products-primary text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${viewMode === 'list'
                      ? 'bg-products-primary text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-gradient-to-r from-products-primary to-products-secondary text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-300 font-medium shadow-lg"
              >
                <Plus className="h-5 w-5" />
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {loading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-gray-600">Loading products...</div>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredProducts.map((product) =>
              viewMode === 'grid'
                ? <ProductCard key={product.id} product={product} />
                : <ProductListItem key={product.id} product={product} />
            )}
          </div>
        )}

        {/* Modals */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Product"
          size="large"
        >
          <ProductForm />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Product"
          size="large"
        >
          <ProductForm />
        </Modal>

        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Product Details"
          size="large"
        >
          {selectedProduct && (
            <div className="space-y-6">
              <div className="flex gap-6">
                <Image
                  className="rounded-xl object-cover"
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  width={192}
                  height={192}
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                  <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Price</span>
                      <div className="text-xl font-bold">{formatCurrency(selectedProduct.price)}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Stock</span>
                      <div className="text-xl font-bold">{selectedProduct.stock}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Category</span>
                      <div className="font-medium">{selectedProduct.category}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">SKU</span>
                      <div className="font-medium">{selectedProduct.sku || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>

        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Product"
          message="Are you sure you want to delete this product? This action cannot be undone."
        />
      </div>
    </div>
  );
}
