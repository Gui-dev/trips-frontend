import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

import { UserReservationItem } from '../components/user-reservation-item'

const MyTrips = async () => {
  const response = await getServerSession(authOptions)
  const user = response?.user

  if (!user) {
    return redirect('/')
  }

  const trips = await prisma.tripReservation.findMany({
    where: {
      user_id: user.id as string,
    },
    include: {
      trip: true,
    },
  })

  return (
    <section className="container mx-auto p-5">
      <h1 className="text-xl font-semibold text-primary-darker">
        Minhas Viagens
      </h1>
      {trips &&
        trips.map((trip) => {
          return <UserReservationItem key={trip.id} reservation={trip} />
        })}
    </section>
  )
}

export default MyTrips
