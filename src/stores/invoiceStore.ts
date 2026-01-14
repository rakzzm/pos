
import { create } from 'zustand';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
export type PaymentMethod = 'cash' | 'card' | 'bank_transfer' | 'digital_wallet';

export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discount: number;
  total: number;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  totalDiscount: number;
  totalTax: number;
  grandTotal: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paymentMethod?: PaymentMethod;
  notes: string;
  terms: string;
  digitalSignature?: string;
  qrCode?: string;
  createdAt: string;
  updatedAt: string;
};

export type InvoiceTemplate = {
  id: string;
  name: string;
  layout: 'modern' | 'classic' | 'minimal';
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
  headerText: string;
  footerText: string;
  showQRCode: boolean;
  showDigitalSignature: boolean;
};

const defaultTemplate: InvoiceTemplate = {
  id: 'default',
  name: 'Modern Restaurant',
  layout: 'modern',
  primaryColor: '#3B82F6',
  secondaryColor: '#1E40AF',
  headerText: 'Restaurant Invoice',
  footerText: 'Thank you for dining with us!',
  showQRCode: true,
  showDigitalSignature: true
};

type InvoiceStore = {
  invoices: Invoice[];
  templates: InvoiceTemplate[];
  currentTemplate: InvoiceTemplate;
  loading: boolean;
  error: string | null;
  
  // Invoice CRUD operations
  fetchInvoices: () => Promise<void>;
  createInvoice: (invoice: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateInvoice: (id: string, updates: Partial<Invoice>) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  
  // Invoice actions
  sendInvoice: (id: string) => Promise<void>;
  markAsPaid: (id: string, paymentMethod: PaymentMethod) => Promise<void>;
  duplicateInvoice: (id: string) => Promise<void>;
  
  // PDF generation
  generatePDF: (invoice: Invoice) => Promise<void>;
  generateBulkPDF: (invoiceIds: string[]) => Promise<void>;
  
  // Template management
  updateTemplate: (template: InvoiceTemplate) => void;
  
  // Analytics
  getInvoiceStats: () => {
    total: number;
    paid: number;
    pending: number;
    overdue: number;
    totalRevenue: number;
    averageAmount: number;
  };
};

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoices: [],
  templates: [defaultTemplate],
  currentTemplate: defaultTemplate,
  loading: false,
  error: null,

  fetchInvoices: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/invoices');
      if (!response.ok) throw new Error('Failed to fetch invoices');
      const data = await response.json();
      
      const mappedInvoices = data.map((inv: any) => ({
        ...inv,
        issueDate: new Date(inv.issueDate).toISOString().split('T')[0],
        dueDate: new Date(inv.dueDate).toISOString().split('T')[0],
        // Default values for fields not in DB simplified schema
        customerEmail: inv.customerEmail || '',
        customerPhone: inv.customerPhone || '',
        customerAddress: inv.customerAddress || '',
        subtotal: inv.items.reduce((sum: number, item: any) => sum + (item.unitPrice * item.quantity), 0),
        totalDiscount: 0, // Assuming handled in total or logic
        totalTax: 0, // Assuming included in DB logic or calculated
        notes: inv.notes || '',
        terms: inv.terms || '',
        items: inv.items.map((item: any) => ({
            ...item,
            taxRate: 6, // default
            discount: 0 // default
        }))
      }));

      set({ invoices: mappedInvoices });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  createInvoice: async (invoiceData) => {
    set({ loading: true, error: null });
    try {
      // Auto-generate invoice number logic could be here or API
      const invoiceNumber = `INV-${new Date().getFullYear()}-${String(get().invoices.length + 1).padStart(3, '0')}`;
      
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...invoiceData, invoiceNumber }),
      });

      if (!response.ok) throw new Error('Failed to create invoice');
      
      // Refresh list
      await get().fetchInvoices();
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateInvoice: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/invoices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error('Failed to update invoice');
      
      await get().fetchInvoices();
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteInvoice: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/invoices/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete invoice');
      
      set(state => ({
        invoices: state.invoices.filter(invoice => invoice.id !== id)
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  sendInvoice: async (id) => {
    await get().updateInvoice(id, { status: 'sent' });
  },

  markAsPaid: async (id, paymentMethod) => {
    // Current update API supports paymentMethod and status
    await get().updateInvoice(id, { 
      status: 'paid', 
      paymentMethod,
    });
  },

  duplicateInvoice: async (id) => {
    const invoice = get().invoices.find(inv => inv.id === id);
    if (invoice) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, invoiceNumber: _num, createdAt: _created, updatedAt: _updated, ...invoiceData } = invoice;
      
      // Create fresh copy as draft
      await get().createInvoice({
        ...invoiceData,
        status: 'draft',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
    }
  },

  generatePDF: async (invoice) => {
    const template = get().currentTemplate;
    const doc = new jsPDF();
    
    // Set colors
    const primaryColor = template.primaryColor;
    // const secondaryColor = template.secondaryColor;
    
    // Header with gradient background
    doc.setFillColor(primaryColor);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Company info
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text(template.headerText, 20, 25);
    
    // Invoice details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Invoice #: ${invoice.invoiceNumber}`, 20, 55);
    doc.text(`Issue Date: ${invoice.issueDate}`, 20, 65);
    doc.text(`Due Date: ${invoice.dueDate}`, 20, 75);
    doc.text(`Status: ${invoice.status.toUpperCase()}`, 20, 85);
    
    // Customer info
    doc.setFontSize(14);
    doc.text('Bill To:', 120, 55);
    doc.setFontSize(12);
    doc.text(invoice.customerName, 120, 65);
    doc.text(invoice.customerEmail, 120, 75);
    doc.text(invoice.customerPhone, 120, 85);
    
    // Items table
    const tableData = invoice.items.map(item => [
      item.description,
      item.quantity.toString(),
      `RM ${item.unitPrice.toFixed(2)}`,
      `${item.taxRate}%`,
      `RM ${item.discount.toFixed(2)}`,
      `RM ${item.total.toFixed(2)}`
    ]);
    
    autoTable(doc, {
      startY: 100,
      head: [['Description', 'Qty', 'Unit Price', 'Tax', 'Discount', 'Total']],
      body: tableData,
      theme: 'grid',
      styles: {
        fillColor: [59, 130, 246],
        textColor: [255, 255, 255],
        fontSize: 10
      },
      alternateRowStyles: {
        fillColor: [240, 248, 255]
      }
    });
    
    // Totals
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    doc.text(`Subtotal: RM ${invoice.subtotal.toFixed(2)}`, 120, finalY);
    doc.text(`Discount: RM ${invoice.totalDiscount.toFixed(2)}`, 120, finalY + 10);
    doc.text(`Tax: RM ${invoice.totalTax.toFixed(2)}`, 120, finalY + 20);
    doc.setFontSize(14);
    doc.text(`Grand Total: RM ${invoice.grandTotal.toFixed(2)}`, 120, finalY + 35);
    
    // Footer
    if (template.showQRCode) {
      doc.text('QR Code: Payment Link', 20, finalY + 50);
    }
    
    if (template.showDigitalSignature) {
      doc.text('Digitally Signed', 20, finalY + 60);
    }
    
    doc.text(template.footerText, 20, finalY + 70);
    
    // Save PDF
    doc.save(`${invoice.invoiceNumber}.pdf`);
  },

  generateBulkPDF: async (invoiceIds) => {
    const invoices = get().invoices.filter(inv => invoiceIds.includes(inv.id));
    for (const invoice of invoices) {
      await get().generatePDF(invoice);
    }
  },

  updateTemplate: (template) => {
    set({ currentTemplate: template });
  },

  getInvoiceStats: () => {
    const invoices = get().invoices;
    const total = invoices.length;
    const paid = invoices.filter(inv => inv.status === 'paid').length;
    const pending = invoices.filter(inv => inv.status === 'sent').length;
    const overdue = invoices.filter(inv => {
      const dueDate = new Date(inv.dueDate);
      return inv.status === 'sent' && dueDate < new Date();
    }).length;
    const totalRevenue = invoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.grandTotal, 0);
    const averageAmount = total > 0 ? totalRevenue / total : 0;

    return {
      total,
      paid,
      pending,
      overdue,
      totalRevenue,
      averageAmount
    };
  }
}));