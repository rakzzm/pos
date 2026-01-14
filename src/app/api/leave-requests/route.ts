
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Create leave request
    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        staffId: body.staffId,
        type: body.type,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        reason: body.reason,
        status: body.status || 'pending',
        appliedDate: new Date(),
      }
    });

    return NextResponse.json(leaveRequest);
  } catch (error) {
    console.error('Error creating leave request:', error);
    return NextResponse.json({ error: 'Failed to create leave request' }, { status: 500 });
  }
}
