import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const staffId = searchParams.get('staffId');
    const date = searchParams.get('date');
    const month = searchParams.get('month'); // YYYY-MM

    let whereClause: any = {};
    if (staffId) whereClause.staffId = staffId;
    if (date) {
        // Precise date match
        const start = new Date(date);
        const end = new Date(date);
        end.setDate(end.getDate() + 1);
        whereClause.date = {
            gte: start,
            lt: end
        };
    }
    if (month) {
        const [year, m] = month.split('-');
        const start = new Date(parseInt(year), parseInt(m) - 1, 1);
        const end = new Date(parseInt(year), parseInt(m), 0); // Last day of month
        whereClause.date = {
            gte: start,
            lte: end
        };
    }

    const attendance = await prisma.attendance.findMany({
      where: whereClause,
      include: {
        staff: {
          select: { name: true, employeeId: true }
        }
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(attendance);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Action types: 'clock-in', 'manual'
    const { action, staffId, time, date, notes } = data;

    if (action === 'clock-in') {
        // Check if already clocked in today without clock out
        const today = new Date();
        today.setHours(0,0,0,0);
        
        const existing = await prisma.attendance.findFirst({
            where: {
                staffId,
                date: { gte: today },
                punchOut: null
            }
        });

        if (existing) {
             return NextResponse.json({ error: 'Already clocked in' }, { status: 400 });
        }

        const record = await prisma.attendance.create({
            data: {
                staffId,
                date: new Date(),
                punchIn: time, // Expecting HH:mm format or ISO
                status: 'present',
                totalHours: 0
            }
        });
        return NextResponse.json(record);
    } 
    
    if (action === 'manual') {
        const record = await prisma.attendance.create({
            data: {
                staffId,
                date: new Date(date),
                punchIn: data.punchIn,
                punchOut: data.punchOut,
                totalHours: data.totalHours || 0,
                status: data.status || 'present',
                notes
            }
        });
        return NextResponse.json(record);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create attendance' }, { status: 500 });
  }
}
