import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    // In a real production app, compare hashed passwords (e.g., bcrypt).
    // For this existing codebase which uses plain text in seed/mock, we compare directly.
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Return user info without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
