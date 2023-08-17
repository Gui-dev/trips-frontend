import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const req = await request.json()
  const { end_date, guests, start_date, trip_id, total_paid, user_id } = req
  const trip = await prisma.trip.findUnique({
    where: {
      id: trip_id,
    },
  })

  if (!trip) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'TRIP_NOT_FOUND',
        },
      }),
    )
  }

  await prisma.tripReservation.create({
    data: {
      end_date,
      guests,
      start_date,
      total_paid,
      trip_id,
      user_id,
    },
  })

  return new NextResponse(
    JSON.stringify({
      success: true,
    }),
    {
      status: 201,
    },
  )
}
