import { create } from 'zustand';
import { useMemberStore } from './memberStore';

type OrderStatus = 'pending' | 'completed' | 'cancelled';

type OrderItem = {
  id?: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
};

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  memberId?: string;
  items: OrderItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  serviceTax: number;
  total: number;
  status: OrderStatus;
  date: string;
  paymentMethod: string;
  couponCode?: string;
  source?: string;
};

type NewOrder = {
  customerName: string;
  memberId?: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  serviceTax: number;
  total: number;
  date: string;
  couponCode?: string;
  source?: string;
};

const POINTS_THRESHOLD = 100; // INR 100 threshold for points
const POINTS_PER_THRESHOLD = 1; // 1 point per INR 100

type OrderStore = {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  addOrder: (order: NewOrder) => Promise<void>;
  updateOrder: (id: string, updates: Partial<Order>) => Promise<void>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      
      // Map Prisma response to FE Order type
      // Prisma `items` need to be mapped if necessary, but structure matches closely
      const mappedOrders: Order[] = data.map((order: any) => ({
        ...order,
        // Calculate itemCount from items array
        itemCount: order.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
        // Ensure date is string if needed
        date: new Date(order.date).toLocaleString(), // or keep as ISO string depending on UI needs
      }));

      set({ orders: mappedOrders });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  addOrder: async (orderData: NewOrder) => {
    set({ loading: true, error: null });
    try {
      // Generate fields that are required by API but might be missing in FE submit
      // Actually API generates orderNumber if we want, but passing it is safer if we have logic
      // Here we assume FE or Store generates simple Order Number for now, or let API handle it.
      // API expects orderNumber, so let's generate it if not present, though DB handles unique check.
      
      const payload = {
        ...orderData,
        orderNumber: `ORD-${Date.now()}`, // Simple unique generator for now
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to create order');
      const newOrder = await response.json();
      
      const mappedOrder: Order = {
        ...newOrder,
        itemCount: newOrder.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
        date: new Date(newOrder.date).toLocaleString(),
      };

      set(state => ({
        orders: [mappedOrder, ...state.orders]
      }));

      // Handle points if applicable
      if (mappedOrder.status === 'completed' && mappedOrder.memberId) {
        await awardMemberPoints(mappedOrder.memberId, mappedOrder.total);
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateOrder: async (id: string, updates: Partial<Order>) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error('Failed to update order');
      const updatedOrderData = await response.json();

      const mappedOrder: Order = {
        ...updatedOrderData,
        itemCount: updatedOrderData.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
        date: new Date(updatedOrderData.date).toLocaleString(),
      };
      
      const previousOrder = get().orders.find(o => o.id === id);

      set(state => ({
        orders: state.orders.map(o => o.id === id ? mappedOrder : o)
      }));

      // Handle points if status changed to completed
      if (updates.status === 'completed' && previousOrder?.status !== 'completed' && mappedOrder.memberId) {
        await awardMemberPoints(mappedOrder.memberId, mappedOrder.total);
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateOrderStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update order status');
      const updatedOrderData = await response.json();
      
      const mappedOrder: Order = {
        ...updatedOrderData,
        itemCount: updatedOrderData.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
        date: new Date(updatedOrderData.date).toLocaleString(),
      };

      const previousOrder = get().orders.find(o => o.id === id);

      set(state => ({
        orders: state.orders.map(o => o.id === id ? mappedOrder : o)
      }));

      // Then handle points if applicable
      if (status === 'completed' && mappedOrder.memberId && previousOrder?.status !== 'completed') {
        await awardMemberPoints(mappedOrder.memberId, mappedOrder.total);
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  deleteOrder: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete order');
      
      set(state => ({
        orders: state.orders.filter(o => o.id !== id)
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));

// Helper function to award points to members
async function awardMemberPoints(memberId: string, total: number) {
  const memberStore = useMemberStore.getState();
  const member = memberStore.members.find(m => m.memberId === memberId);
  
  if (member) {
    // Always update totalSpent regardless of points earned
    const pointsEarned = Math.floor(total / POINTS_THRESHOLD) * POINTS_PER_THRESHOLD;
    await memberStore.updateMember(member.id, {
      points: member.points + pointsEarned,
      totalSpent: member.totalSpent + total
    });
  }
}