
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const attendance = await prisma.attendance.findMany({
      include: {
        staff: {
          select: { name: true, employeeId: true }
        }
      },
      orderBy: { date: 'desc' }
    });
    return NextResponse.json(attendance);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Check if punching in or out
    // If we pass an ID, it's an update (Punch Out) usually, but REST might suggest PUT.
    // However, for simplified "Punch" action, we can handle logic here or separate logic.
    // Let's assume POST is for creating a new Punch In record.
    
    // Check if already punched in today for this staff
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const existing = await prisma.attendance.findFirst({
        where: {
            staffId: body.staffId,
            date: {
                gte: today
            }
        }
    });
    
    if (existing) {
        return NextResponse.json({ error: 'Already punched in today' }, { status: 400 });
    }

    const attendance = await prisma.attendance.create({
      data: {
        staffId: body.staffId,
        date: new Date(),
        punchIn: new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' }),
        status: 'present',
        totalHours: 0,
        location: 'Main Branch'
      }
    });

    return NextResponse.json(attendance);
  } catch (error) {
    console.error('Error creating attendance:', error);
    return NextResponse.json({ error: 'Failed to create attendance' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
    // We can use PUT to handle Punch Out if we pass the record ID
   try {
    const body = await request.json();
    
    if (body.action === 'punch-out') {
        const record = await prisma.attendance.findUnique({ where: { id: body.id } });
        if (!record) return NextResponse.json({ error: 'Record not found' }, { status: 404 });
        
        const now = new Date();
        const punchOutTime = now.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' });
        
        // Calculate hours
        // Simple calculation assuming same day
        // This is tricky with string times, ideally we store timestamps.
        // For now, let's just save the string and let existing logic or frontend calculate, 
        // or try to parse.
        // But to be consistent with Prisma schema which has totalHours Float:
        
        // Let's assume frontend logic calculates hours or we do it here roughly.
        // Since we stored punchIn as string, we can't easily calc diff without parsing.
        
        // Alternative: Let frontend send the calculated hours and punchOut time.
        
        const updated = await prisma.attendance.update({
            where: { id: body.id },
            data: {
                punchOut: punchOutTime,
                totalHours: body.totalHours || 0,
                status: body.totalHours < 4 ? 'half-day' : 'present'
            }
        });
        
        return NextResponse.json(updated);
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
   } catch (error) {
     return NextResponse.json({ error: 'Failed to update attendance' }, { status: 500 });
   }
}
