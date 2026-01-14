import { create } from 'zustand';
import { useOrderStore } from './orderStore';

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
        openOrderAmount: pendingOrders.reduce((sum, order) => sum + order.total, 0)
      };

      set({ summary });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  }
}));