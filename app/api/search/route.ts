import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/db';

export async function GET (request:string) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  console.log('server query', query);

  try {
    const tools = await prisma.toolCard.findMany({
      where: {
        name: {
          contains: query || '',
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        location: true,
        dailyRate: true,
        weeklyRate: true,
        monthlyRate: true,
        picture: true,
        liked: true,
        available: true,
        owner: true,
        toolCategoryId: true,
        ToolCategory: true,
      },
    });

    return NextResponse.json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}
