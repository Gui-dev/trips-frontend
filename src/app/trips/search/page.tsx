import { TripItem } from '@/components/trip-item'
import { prisma } from '@/lib/prisma'

type TripsProps = {
  searchParams: {
    destination: string
    start_date?: string
    budget?: string
  }
}

const Trips = async ({ searchParams }: TripsProps) => {
  const { destination, start_date, budget } = searchParams

  const generateSearchQuery = (
    destination: string,
    start_date?: string,
    budget?: string,
  ) => {
    let searchQuery: any = {
      OR: [
        {
          name: {
            search: destination,
          },
        },
        {
          description: {
            search: destination,
          },
        },
        {
          location: {
            search: destination,
          },
        },
      ],
      AND: [],
    }

    if (start_date) {
      searchQuery = {
        ...searchQuery,
        AND: [
          ...searchQuery.AND,
          {
            start_date: {
              lte: new Date(start_date),
            },
          },
          {
            end_date: {
              gte: new Date(start_date),
            },
          },
        ],
      }
    }

    if (budget) {
      searchQuery = {
        ...searchQuery,
        AND: [
          ...searchQuery.AND,
          {
            price_per_day: {
              lte: Number(budget),
            },
          },
        ],
      }
    }
    return searchQuery
  }

  const trips = await prisma.trip.findMany({
    where: generateSearchQuery(destination, start_date, budget),
  })

  return (
    <section className="container mx-auto flex flex-col items-center p-5">
      <h1 className="mb-5 text-lg font-semibold text-primary-darker lg:text-[2.5rem]">
        Hospedagens encontradas
      </h1>
      {trips && trips.length < 1 && (
        <p className="mb-5 text-sm text-textColor-darker lg:text-2xl">
          Desculpe, não encontramos nenhuma viagem com essas opções
        </p>
      )}

      {trips && trips.length > 0 && (
        <h2 className="mb-5 text-sm text-textColor-darker lg:my-6 lg:text-base">
          Listamos as melhores viagens para você!
        </h2>
      )}

      <div className="flex flex-col gap-4 lg:mx-auto lg:mt-6 lg:grid lg:max-w-[948px] lg:grid-cols-3 lg:gap-10 lg:pb-10">
        {trips &&
          trips.map((trip) => {
            return (
              <>
                <TripItem key={trip.id} trip={trip} />
              </>
            )
          })}
      </div>
    </section>
  )
}

export default Trips
