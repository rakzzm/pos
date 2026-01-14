"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ShoppingCart, Plus, Minus, Check, ArrowLeft, UtensilsCrossed } from 'lucide-react';
import { useProductStore } from '../../../stores/productStore';
import { useOrderStore } from '../../../stores/orderStore';

export default function CustomerMenuPage() {
    const params = useParams();
    const tableId = params?.tableId as string;
    // Extract number from "table1" -> "1", or fallback to id if no number found
    const tableNumber = tableId ? (tableId.replace(/\D/g, '') || tableId) : '';
    
    const { products } = useProductStore();
    const { addOrder } = useOrderStore();

    const [cart, setCart] = useState<Array<{ productId: string; name: string; price: number; quantity: number }>>([]);
    const [customerName, setCustomerName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [showCart, setShowCart] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    const addToCart = (product: typeof products[0]) => {
        const existingItem = cart.find(item => item.productId === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.productId === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, {
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            }]);
        }
    };

    const removeFromCart = (productId: string) => {
        const existingItem = cart.find(item => item.productId === productId);
        if (existingItem && existingItem.quantity > 1) {
            setCart(cart.map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ));
        } else {
            setCart(cart.filter(item => item.productId !== productId));
        }
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handlePlaceOrder = async () => {
        if (cart.length === 0) {
            alert('Please add items to your cart');
            return;
        }

        if (!customerName.trim()) {
            alert('Please enter your name');
            return;
        }

        const subtotal = cartTotal;
        const serviceTax = subtotal * 0.10;
        const total = subtotal + serviceTax;

        try {
            await addOrder({
                customerName: `${customerName} (Table ${tableNumber})`,
                items: cart.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                status: 'pending',
                paymentMethod: 'pending',
                subtotal,
                discount: 0,
                serviceTax,
                total,
                date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                source: 'QR'
            });

            setOrderPlaced(true);
            setTimeout(() => {
                setCart([]);
                setCustomerName('');
                setOrderPlaced(false);
                setShowCart(false);
            }, 3000);
        } catch {
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white sticky top-0 z-40 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <UtensilsCrossed className="h-8 w-8" />
                            <div>
                                <h1 className="text-2xl font-bold">Restaurant Menu</h1>
                                <p className="text-sm text-orange-100">Table {tableNumber}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowCart(!showCart)}
                            className="relative bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
                        >
                            <ShoppingCart className="h-6 w-6" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Message */}
            {orderPlaced && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-bounce-slow">
                        <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                            <Check className="h-12 w-12 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
                        <p className="text-gray-600">Your order has been sent to the kitchen. We'll bring it to your table soon!</p>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Category Filter */}
                <div className="mb-6 overflow-x-auto">
                    <div className="flex gap-2 pb-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-orange-600 to-yellow-600 text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-orange-50'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {filteredProducts.map(product => {
                        const cartItem = cart.find(item => item.productId === product.id);
                        const quantity = cartItem?.quantity || 0;

                        return (
                            <div
                                key={product.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105"
                            >
                                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                                    {product.image_url ? (
                                        <Image
                                            src={product.image_url}
                                            alt={product.name}
                                            className="object-cover"
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <UtensilsCrossed className="h-16 w-16 text-gray-400" />
                                        </div>
                                    )}
                                    {quantity > 0 && (
                                        <div className="absolute top-2 right-2 bg-orange-600 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                                            {quantity}
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg text-gray-900 mb-1">{product.name}</h3>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-orange-600">₹{product.price.toFixed(2)}</span>
                                        {quantity === 0 ? (
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-orange-700 hover:to-yellow-700 transition-all shadow-md flex items-center gap-2"
                                            >
                                                <Plus className="h-4 w-4" />
                                                Add
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => removeFromCart(product.id)}
                                                    className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-all"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="font-bold text-lg">{quantity}</span>
                                                <button
                                                    onClick={() => addToCart(product)}
                                                    className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-all"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Cart Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${showCart ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Cart Header */}
                    <div className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <ShoppingCart className="h-6 w-6" />
                                Your Order
                            </h2>
                            <button
                                onClick={() => setShowCart(false)}
                                className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <ShoppingCart className="h-16 w-16 mb-4" />
                                <p className="text-lg">Your cart is empty</p>
                                <p className="text-sm">Add items from the menu</p>
                            </div>
                        ) : (
                            <>
                                {/* Customer Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="space-y-3">
                                    {cart.map(item => (
                                        <div key={item.productId} className="bg-gray-50 rounded-lg p-3">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                                    <p className="text-sm text-gray-600">₹{item.price.toFixed(2)} each</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-orange-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => removeFromCart(item.productId)}
                                                    className="bg-gray-200 text-gray-700 p-1 rounded hover:bg-gray-300 transition-all"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="font-semibold text-gray-900 w-8 text-center">{item.quantity}</span>
                                                <button
                                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                    onClick={() => addToCart({ id: item.productId, name: item.name, price: item.price } as any)}
                                                    className="bg-orange-600 text-white p-1 rounded hover:bg-orange-700 transition-all"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Cart Footer */}
                    {cart.length > 0 && (
                        <div className="border-t border-gray-200 p-4 bg-gray-50">
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Service Tax (10%)</span>
                                    <span className="font-medium">₹{(cartTotal * 0.10).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t pt-2">
                                    <span>Total</span>
                                    <span className="text-orange-600">₹{(cartTotal * 1.10).toFixed(2)}</span>
                                </div>
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                disabled={!customerName.trim()}
                                className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-3 rounded-lg font-bold text-lg hover:from-orange-700 hover:to-yellow-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Place Order
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
