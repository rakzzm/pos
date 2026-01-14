
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const logs = await prisma.auditLog.findMany({
      include: {
        user: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 100 // Limit to last 100 logs for performance
    });
    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch audit logs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real app, userId should come from session/token
    // For now, we trust the body or use a default admin ID if testing
    const defaultUser = await prisma.user.findFirst();
    const userId = body.userId || defaultUser?.id;

    if (!userId) {
        return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const log = await prisma.auditLog.create({
      data: {
        userId: userId,
        action: body.action,
        tableName: body.tableName, // 'products', 'orders', etc.
        recordId: body.recordId || 'N/A',
        oldData: body.oldData || {},
        newData: body.newData || {},
        ipAddress: body.ipAddress || '127.0.0.1'
      }
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error('Error creating audit log:', error);
    return NextResponse.json({ error: 'Failed to create audit log' }, { status: 500 });
  }
}
