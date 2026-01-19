import { create } from 'zustand';
import { useOrderStore } from './orderStore';
import { useProductStore } from './productStore';

type SalesSummary = {
  grossAmount: number;
  netSales: number;
  discounts: number;
  tax: number;
  charges: number;
  roundingAmount: number;
  netTotal: number;
  totalOutlets: number;
  dailyAverageSales: number;
  quantity: number;
  transactionCount: number;
  voidedTransactions: number;
  voidedTransferCount: number;
  cancelledTransactionCount: number;
  averageValue: number;
  averageUnit: number;
  customerAverageValue: number;
  openOrderQuantity: number;
  openOrderAmount: number;
  categoryBreakdown: Array<{
    name: string;
    value: number;
    sales: number;
  }>;
  salesTrend: Array<{
    name: string;
    sales: number;
    orders: number;
  }>;
  hourlySales: Array<{
    hour: string;
    orders: number;
  }>;
};

type Period = 'today' | 'yesterday' | 'week' | 'month';

type SalesStore = {
  summary: SalesSummary | null;
  loading: boolean;
  error: string | null;
  calculateSummary: (period: Period) => void;
};

export const useSalesStore = create<SalesStore>((set) => ({
  summary: null,
  loading: false,
  error: null,

  calculateSummary: (period: Period) => {
    set({ loading: true, error: null });
    try {
      const orders = useOrderStore.getState().orders;
      
      // We need products to determine categories
      // We'll import it dynamically or assume it's loaded. 
      // Better to use import inside to avoid circular dependency issues if any,
      // but standard import at top is clearer. We'll use the hook's getState.
      const products = useProductStore.getState().products;

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      let startDate: Date;
      switch (period) {
        case 'today':
          startDate = today;
          break;
        case 'yesterday':
          startDate = new Date(today);
          startDate.setDate(startDate.getDate() - 1);
          break;
        case 'week':
          startDate = new Date(today);
          startDate.setDate(startDate.getDate() - 7);
          break;
        case 'month':
          startDate = new Date(today);
          startDate.setMonth(startDate.getMonth() - 1);
          break;
      }

      const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= startDate && orderDate <= now;
      });

      const completedOrders = filteredOrders.filter(order => order.status === 'completed');
      const pendingOrders = filteredOrders.filter(order => order.status === 'pending');
      const cancelledOrders = filteredOrders.filter(order => order.status === 'cancelled');

      const totalAmount = completedOrders.reduce((sum, order) => sum + order.total, 0);
      const totalItems = completedOrders.reduce((sum, order) => sum + order.items.reduce((acc, item) => acc + item.quantity, 0), 0);
      const uniqueCustomers = new Set(completedOrders.map(order => order.customerName)).size;

      // Calculate Category Breakdown
      const categoryMap = new Map<string, number>();
      
      completedOrders.forEach(order => {
        order.items.forEach(item => {
           // Find product to get category
           const product = products.find(p => p.id === item.productId);
           if (product) {
             const category = product.category || 'Others';
             const amount = item.price * item.quantity; // Assuming item has price and quantity
             categoryMap.set(category, (categoryMap.get(category) || 0) + amount);
           }
        });
      });

      const categoryBreakdown = Array.from(categoryMap.entries()).map(([name, sales]) => {
         // Calculate percentage logic if needed for value, or just use sales
         // For pie chart 'value', usually we want a number representing proportion.
         // Let's use percentage of total sales.
         const value = totalAmount > 0 ? parseFloat(((sales / totalAmount) * 100).toFixed(1)) : 0;
         return { name, value, sales };
      }).sort((a, b) => b.sales - a.sales); // CSS colors often match order, so sorting helps consistency

      // Calculate Sales Trend (Last 7 Days)
      const trendMap = new Map<string, { sales: number; orders: number }>();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      // Initialize last 7 days including today
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dayName = days[d.getDay()];
        // If multiple days have same name (unlikely in 7 days), usage of date string key is safer but chart uses simple name
        // We will just use dayName for simplicity as per requirement
        trendMap.set(dayName, { sales: 0, orders: 0 });
      }

      orders.forEach(order => { // Use all orders, not just filtered for trend? Usually trend is fixed range (e.g. week)
        const d = new Date(order.date);
        // Check if within last 7 days
        const diffTime = Math.abs(now.getTime() - d.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        if (diffDays <= 7 && order.status === 'completed') {
           const dayName = days[d.getDay()];
           if (trendMap.has(dayName)) {
             const current = trendMap.get(dayName)!;
             trendMap.set(dayName, { 
               sales: current.sales + order.total, 
               orders: current.orders + 1 
             });
           }
        }
      });
      
      // Ensure order is chronological (Mon, Tue... relative to today) - Chart expects array
      // Re-construct based on 7 days loop to maintain order
      const salesTrend = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dayName = days[d.getDay()];
        const data = trendMap.get(dayName) || { sales: 0, orders: 0 };
        salesTrend.push({ name: dayName, ...data });
      }

      // Calculate Hourly Sales (For Today, if period is 'today' or regardless? Dashboard usually shows 'Orders by Hour' for current day)
      // We will calculate for 'Today' always for that specific chart
      const hourlyMap = new Map<string, number>();
      const hourlySales: Array<{ hour: string; orders: number }> = [];
      const ampm = (h: number) => h < 12 ? `${h === 0 ? 12 : h}AM` : `${h === 12 ? 12 : h - 12}PM`;
      
      // Init hours 9AM to 9PM (business hours)
      for (let i = 9; i <= 21; i++) {
         const label = ampm(i);
         hourlyMap.set(label, 0);
      }

      orders.forEach(order => {
        const d = new Date(order.date);
        // Check if it is today
        if (d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()) {
           const hour = d.getHours();
           const label = ampm(hour);
           if (hourlyMap.has(label)) { // Only count business hours or add logic
              hourlyMap.set(label, (hourlyMap.get(label) || 0) + 1);
           }
        }
      });

      // Convert to array
      Array.from(hourlyMap.entries()).forEach(([hour, count]) => {
        hourlySales.push({ hour, orders: count });
      });

      const summary: SalesSummary = {
        grossAmount: totalAmount,
        netSales: totalAmount * 0.9, // Assuming 10% goes to various deductions
        discounts: totalAmount * 0.05, // 5% average discount
        tax: totalAmount * 0.1, // 10% tax
        charges: totalAmount * 0.02, // 2% service charge
        roundingAmount: Math.random() * 0.1, // Small rounding adjustments
        netTotal: totalAmount * 0.97, // Final amount after all adjustments
        totalOutlets: 3, // Fixed number of outlets
        dailyAverageSales: totalAmount / (period === 'today' ? 1 : period === 'yesterday' ? 1 : period === 'week' ? 7 : 30),
        quantity: totalItems,
        transactionCount: completedOrders.length,
        voidedTransactions: Math.floor(completedOrders.length * 0.02), // 2% void rate
        voidedTransferCount: Math.floor(completedOrders.length * 0.01), // 1% transfer void rate
        cancelledTransactionCount: cancelledOrders.length,
        averageValue: completedOrders.length ? totalAmount / completedOrders.length : 0,
        averageUnit: completedOrders.length ? totalItems / completedOrders.length : 0,
        customerAverageValue: uniqueCustomers ? totalAmount / uniqueCustomers : 0,
        openOrderQuantity: pendingOrders.length,
        openOrderAmount: pendingOrders.reduce((sum, order) => sum + order.total, 0),
        categoryBreakdown,
        salesTrend,
        hourlySales
      };

      set({ summary });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  }
}));