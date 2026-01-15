import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    const updateData: any = { ...data };
    
    // Handle nested updates or flattening if needed
    if (data.leaveBalance) {
        updateData.leaveBalanceAnnual = data.leaveBalance.annual;
        updateData.leaveBalanceSick = data.leaveBalance.sick;
        updateData.leaveBalancePersonal = data.leaveBalance.personal;
        delete updateData.leaveBalance;
    }
    
    // Ensure numeric types
    if (updateData.salary) updateData.salary = parseFloat(updateData.salary);
    
    const staff = await prisma.staff.update({
      where: { id },
      data: updateData,
    });
    
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update staff' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.staff.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete staff' }, { status: 500 });
  }
}
