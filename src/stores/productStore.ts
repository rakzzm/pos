import { create } from 'zustand';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string; // Mapping from imageUrl in DB
  imageUrl?: string; // Optional for backward combat
  sku?: string;
  cost_price?: number;
  costPrice?: number;
  profit_margin?: number;
  profitMargin?: number;
  tags?: string[];
  is_featured?: boolean;
  isFeatured?: boolean;
  is_available?: boolean;
  isAvailable?: boolean;
};

type ProductStore = {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      
      // Map DB fields to FE Expected fields if needed, relying on loose typing for now
      // The API returns snake_case for DB fields if using raw sql, but Prisma returns camelCase.
      // We need to ensure the Store types match what Prisma returns or map them.
      // Prisma returns: imageUrl, costPrice, profitMargin, isFeatured, isAvailable.
      // FE expects: image_url, cost_price, profit_margin.
      // We will map them here to ensure compatibility.
      
      const mappedProducts = data.map((p: any) => ({
        ...p,
        image_url: p.imageUrl || p.image_url,
        cost_price: p.costPrice || p.cost_price,
        profit_margin: p.profitMargin || p.profit_margin,
        is_featured: p.isFeatured,
        is_available: p.isAvailable
      }));

      set({ products: mappedProducts });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  addProduct: async (product) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      
      if (!response.ok) throw new Error('Failed to create product');
      const newProduct = await response.json();
      
      // Map response back to FE format
      const mappedProduct = {
        ...newProduct,
        image_url: newProduct.imageUrl,
        cost_price: newProduct.costPrice,
        profit_margin: newProduct.profitMargin,
        is_featured: newProduct.isFeatured,
        is_available: newProduct.isAvailable
      };

      set(state => ({ products: [mappedProduct, ...state.products] }));
      await useProductStore.getState().fetchProducts(); // Refresh list to be sure
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id, product) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error('Failed to update product');
      const updatedProduct = await response.json();
      
      const mappedProduct = {
        ...updatedProduct,
        image_url: updatedProduct.imageUrl,
        cost_price: updatedProduct.costPrice,
        profit_margin: updatedProduct.profitMargin,
        is_featured: updatedProduct.isFeatured,
        is_available: updatedProduct.isAvailable
      };

      set(state => ({
        products: state.products.map(p => p.id === id ? mappedProduct : p)
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete product');
      
      set(state => ({
        products: state.products.filter(p => p.id !== id)
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));