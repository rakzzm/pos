
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;

    const staff = await prisma.staff.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        position: body.position,
        department: body.department,
        salary: body.salary ? parseFloat(body.salary) : undefined,
        status: body.status,
        leaveBalanceAnnual: body.leaveBalance?.annual,
        leaveBalanceSick: body.leaveBalance?.sick,
        leaveBalancePersonal: body.leaveBalance?.personal,
        performanceRating: body.performanceRating,
        lastReview: body.lastReview ? new Date(body.lastReview) : undefined
      }
    });

    return NextResponse.json(staff);
  } catch (error) {
    console.error('Error updating staff:', error);
    return NextResponse.json({ error: 'Failed to update staff' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Clean up related records first
    await prisma.leaveRequest.deleteMany({ where: { staffId: id } });
    await prisma.attendance.deleteMany({ where: { staffId: id } });

    await prisma.staff.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting staff:', error);
    return NextResponse.json({ error: 'Failed to delete staff' }, { status: 500 });
  }
}
