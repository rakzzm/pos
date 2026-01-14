
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const member = await prisma.member.create({
      data: {
        memberId: body.memberId || `BB${Math.floor(Math.random() * 10000)}`, // Create ID if not provided
        name: body.name,
        email: body.email,
        phone: body.phone,
        tier: body.tier || 'bronze',
        points: body.points || 0,
        totalSpent: parseFloat(body.totalSpent || 0),
        status: body.status || 'active',
        visits: body.visits || 0,
        joinDate: body.joinDate ? new Date(body.joinDate) : new Date(),
      }
    });

    return NextResponse.json(member);
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}
