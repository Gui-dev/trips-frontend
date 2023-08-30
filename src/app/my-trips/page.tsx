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
    <section className="container mx-auto p-5 lg:max-w-[948px] lg:p-0">
      <h1 className="text-xl font-semibold text-primary-darker">
        Minhas Viagens
      </h1>

      {trips && trips.length < 1 && (
        <div className="flex-2 mt-11 flex flex-col items-center justify-center gap-3">
          <p className="text-lg font-medium text-primary-darker lg:text-xl">
            Você ainda não tem nenhuma reserva!
          </p>
          <Link
            href="/"
            className="text-sm font-bold text-primary-normal hover:text-primary-darker lg:text-base"
          >
            Reserve uma agora
          </Link>
        </div>
      )}

      <div className="flex flex-col pb-5 lg:grid lg:grid-cols-3 lg:gap-5 lg:pb-10">
        {trips &&
          trips.map((trip) => {
            return <UserReservationItem key={trip.id} reservation={trip} />
          })}
      </div>
    </section>
  )
}

export default MyTrips
