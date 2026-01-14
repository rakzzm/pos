
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;

    const leaveRequest = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status: body.status,
        reason: body.reason, 
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
      }
    });
    
    if (body.status === 'approved') {
       await prisma.staff.update({
            where: { id: leaveRequest.staffId },
            data: { status: 'on-leave' }
       });
    }

    return NextResponse.json(leaveRequest);
  } catch (error) {
    console.error('Error updating leave request:', error);
    return NextResponse.json({ error: 'Failed to update leave request' }, { status: 500 });
  }
}
