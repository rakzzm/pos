
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Create order with transaction to ensure items are created
    const order = await prisma.order.create({
      data: {
        orderNumber: body.orderNumber,
        customerName: body.customerName,
        memberId: body.memberId,
        total: parseFloat(body.total),
        subtotal: parseFloat(body.subtotal),
        discount: parseFloat(body.discount || 0),
        serviceTax: parseFloat(body.serviceTax || 0),
        status: body.status || 'pending',
        paymentMethod: body.paymentMethod,
        date: new Date(),
        couponCode: body.couponCode,
        source: body.source || 'POS',
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId || item.id, // Handle potential ID mismatch
            name: item.name,
            price: parseFloat(item.price),
            quantity: parseInt(item.quantity)
          }))
        }
      },
      include: {
        items: true
      }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
