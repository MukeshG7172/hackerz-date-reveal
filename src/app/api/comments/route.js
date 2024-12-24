import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function initializeCounter() {
  try {
    await prisma.$executeRaw`
      INSERT INTO ButtonCounter (id, count)
      VALUES (1, 0)
      ON CONFLICT (id) DO NOTHING
    `;
  } catch (error) {
    console.error('Error initializing counter:', error);
  }
}

export async function POST() {
  try {
    await initializeCounter();
    
    const updatedCounter = await prisma.$transaction(async (tx) => {
      const result = await tx.buttonCounter.update({
        where: { id: 1 },
        data: {
          count: {
            increment: 1
          }
        }
      });
      return result;
    });

    return NextResponse.json(updatedCounter);
  } catch (error) {
    console.error('Error updating click counter:', error);
    return NextResponse.json({ error: 'Failed to update click counter' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await initializeCounter();
    
    const counter = await prisma.buttonCounter.findUnique({
      where: { id: 1 }
    });
    
    return NextResponse.json(counter);
  } catch (error) {
    console.error('Error fetching click counter:', error);
    return NextResponse.json({ error: 'Failed to fetch click counter' }, { status: 500 });
  }
}