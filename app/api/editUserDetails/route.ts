
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/db';

export async function PUT (request: NextRequest) {
  try {
    const userData = await request.json();
    const { id, name, email } = userData;

    // const userId= '9f6c1b72-c7f6-4a2f-a72c-ff7edf344e8c';

    const updateData: { name?: string; email?: string } = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    const updatedUserData = await prisma.user.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    return NextResponse.json({ data: updatedUserData }, { status: 200 });
  } catch (error) {
    console.error('Error updating user details:', error);
    return NextResponse.json(
      { error: 'Failed to modify user information' },
      { status: 500 }
    );
  }
}