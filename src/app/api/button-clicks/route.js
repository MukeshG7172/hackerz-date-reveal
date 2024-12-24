import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function initializeCounter() {
  const counter = await prisma.buttonCounter.findUnique({
    where: { id: 1 }
  });

  if (!counter) {
    await prisma.buttonCounter.create({
      data: {
        id: 1,
        count: 0
      }
    });
  }
}

export async function POST() {
  try {
    await initializeCounter();
    
    const updatedCounter = await prisma.buttonCounter.update({
      where: { id: 1 },
      data: {
        count: {
          increment: 1
        }
      }
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