import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const staff = await prisma.staff.findMany({
      include: {
        leaveRequests: true,
        payrollRecords: true
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Auto-generate employee ID
    const count = await prisma.staff.count();
    const employeeId = `EMP${String(count + 1).padStart(3, '0')}`;
    
    const staff = await prisma.staff.create({
      data: {
        employeeId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        position: data.position,
        department: data.department || 'General',
        hireDate: new Date(data.hireDate),
        salary: parseFloat(data.salary),
        status: data.status || 'active',
        leaveBalanceAnnual: 14,
        leaveBalanceSick: 14,
        leaveBalancePersonal: 7,
        performanceRating: 0,
        lastReview: undefined
      },
    });
    return NextResponse.json(staff);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create staff' }, { status: 500 });
  }
}
