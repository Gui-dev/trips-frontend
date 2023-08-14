import { prisma } from '@/lib/prisma'
import { isBefore } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const req = await request.json()

  const trip = await prisma.trip.findUnique({
    where: {
      id: req.trip_id,
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

  if (isBefore(new Date(req.start_date), new Date(trip.start_date))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'INVALID_START_DATE',
        },
      }),
    )
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      trip_id: req.trip_id,
      start_date: {
        lte: new Date(req.end_date),
      },
      end_date: {
        gte: new Date(req.start_date),
      },
    },
  })

  if (reservations.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'TRIP_ALREADY_RESERVED',
        },
      }),
    )
  }

  return new NextResponse(
    JSON.stringify({
      success: true,
    }),
  )
}
