
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const staff = await prisma.staff.findMany({
      include: {
        leaveRequests: true,
        attendanceRecords: true
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const staff = await prisma.staff.create({
      data: {
        employeeId: body.employeeId || `EMP${Math.floor(Math.random() * 10000)}`,
        name: body.name,
        email: body.email,
        phone: body.phone,
        position: body.position,
        department: body.department,
        hireDate: body.hireDate ? new Date(body.hireDate) : new Date(),
        salary: parseFloat(body.salary),
        status: body.status || 'active',
        leaveBalanceAnnual: body.leaveBalance?.annual || 14,
        leaveBalanceSick: body.leaveBalance?.sick || 14,
        leaveBalancePersonal: body.leaveBalance?.personal || 7,
        performanceRating: body.performanceRating || 0,
        lastReview: body.lastReview ? new Date(body.lastReview) : null
      }
    });

    return NextResponse.json(staff);
  } catch (error) {
    console.error('Error creating staff:', error);
    return NextResponse.json({ error: 'Failed to create staff' }, { status: 500 });
  }
}
