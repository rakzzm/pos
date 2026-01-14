
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    // Map tags string to array for frontend compatibility
    const productsWithTags = products.map(product => ({
      ...product,
      tags: product.tags ? product.tags.split(',') : []
    }));
    
    return NextResponse.json(productsWithTags);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: parseFloat(body.price),
        category: body.category,
        stock: parseInt(body.stock),
        imageUrl: body.imageUrl || body.image_url, // Handle existing snake_case usage
        sku: body.sku,
        costPrice: body.cost_price ? parseFloat(body.cost_price) : undefined,
        profitMargin: body.profit_margin ? parseFloat(body.profit_margin) : undefined,
        tags: Array.isArray(body.tags) ? body.tags.join(',') : body.tags,
        isFeatured: body.is_featured,
        isAvailable: body.is_available
      }
    });
    
    // Return with tags as array
    return NextResponse.json({
      ...product,
      tags: product.tags ? product.tags.split(',') : []
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
