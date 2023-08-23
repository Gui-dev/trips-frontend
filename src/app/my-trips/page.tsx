import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

import { UserReservationItem } from '../components/user-reservation-item'
import Link from 'next/link'

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

      {trips && trips.length < 1 && (
        <div className="flex-2 mt-11 flex flex-col items-center justify-center gap-3">
          <p className="text-lg font-medium text-primary-darker">
            Você ainda não tem nenhuma reserva!
          </p>
          <Link
            href="/"
            className="text-sm font-bold text-primary-normal hover:text-primary-darker"
          >
            Reserve uma agora
          </Link>
        </div>
      )}

      {trips &&
        trips.map((trip) => {
          return <UserReservationItem key={trip.id} reservation={trip} />
        })}
    </section>
  )
}

export default MyTrips
