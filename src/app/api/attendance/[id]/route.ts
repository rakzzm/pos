import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await request.json();
    
    if (data.action === 'clock-out') {
        const record = await prisma.attendance.findUnique({ where: { id } });
        if (!record || !record.punchIn) {
            return NextResponse.json({ error: 'Record not found or invalid' }, { status: 404 });
        }
        
        // Calculate hours
        // Assuming punchIn/Out are time strings e.g. "09:00"
        // Or if we stored them as ISO strings, parsing is easier.
        // Let's assume standard time strings HH:mm or full ISO for now. 
        // For robustness, let's say the client sends totalHours, or we calc here.
        // Simplest: Client sends calculate total hours or strict format.
        // Implementation Plan implied simple clock in/out.
        
        const totalHours = data.totalHours || 0; 
        
        const updated = await prisma.attendance.update({
            where: { id },
             data: {
                punchOut: data.time,
                totalHours: totalHours,
                status: 'present' // or update status if needed
            }
        });
        return NextResponse.json(updated);
    }

    // Manual update
    const updated = await prisma.attendance.update({
      where: { id },
      data: {
        punchIn: data.punchIn,
        punchOut: data.punchOut,
        totalHours: data.totalHours,
        status: data.status,
        date: data.date ? new Date(data.date) : undefined,
        notes: data.notes
      },
    });
    
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update attendance' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.attendance.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete attendance' }, { status: 500 });
  }
}
