import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const payrolls = await prisma.payroll.findMany({
      include: {
        staff: {
          select: { name: true, employeeId: true }
        }
      },
      orderBy: {
        payDate: 'desc',
      },
    });
    
    const mapped = payrolls.map(p => ({
        ...p,
        staffName: p.staff.name
    }));
    
    return NextResponse.json(mapped);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch payroll' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { staffId, periodStart, periodEnd, bonuses, deductions } = data;
    
    const staff = await prisma.staff.findUnique({ where: { id: staffId } });
    if (!staff) {
        return NextResponse.json({ error: 'Staff not found' }, { status: 404 });
    }
    
    const basicSalary = staff.salary; // Assuming monthly salary
    const netSalary = basicSalary + (bonuses || 0) - (deductions || 0);
    
    const payroll = await prisma.payroll.create({
      data: {
        staffId,
        payPeriodStart: new Date(periodStart),
        payPeriodEnd: new Date(periodEnd),
        payDate: new Date(),
        basicSalary,
        bonuses: bonuses || 0,
        deductions: deductions || 0,
        netSalary,
        status: 'pending' // Default status
      }
    });
    
    return NextResponse.json(payroll);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to run payroll' }, { status: 500 });
  }
}
