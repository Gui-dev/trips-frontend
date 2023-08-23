import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const DELETE = async (
  _request: NextRequest,
  {
    params: { reservation_id },
  }: {
    params: { reservation_id: string }
  },
) => {
  if (!reservation_id) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'TRIP_RESERVATION_ID_NOT_FOUND',
        },
      }),
      {
        status: 401,
      },
    )
  }

  const tripReservation = await prisma.tripReservation.findUnique({
    where: {
      id: reservation_id,
    },
  })

  console.log('AQUII: ', tripReservation)

  if (!tripReservation) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'TRIP_RESERVATION_NOT_FOUND',
        },
      }),
    )
  }

  await prisma.tripReservation.delete({
    where: {
      id: tripReservation.id,
    },
  })

  return new NextResponse(
    JSON.stringify({
      tripReservation,
    }),
    {
      status: 200,
    },
  )
}
