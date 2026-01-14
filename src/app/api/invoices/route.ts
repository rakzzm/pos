
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        items: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber: body.invoiceNumber,
        customerName: body.customerName,
        grandTotal: parseFloat(body.grandTotal),
        status: body.status || 'paid',
        issueDate: new Date(body.issueDate),
        dueDate: new Date(body.dueDate),
        paymentMethod: body.paymentMethod,
        items: {
            create: body.items.map((item: any) => ({
                description: item.description,
                quantity: parseInt(item.quantity),
                unitPrice: parseFloat(item.unitPrice),
                total: parseFloat(item.total)
            }))
        }
      },
      include: { items: true }
    });

    return NextResponse.json(invoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}
