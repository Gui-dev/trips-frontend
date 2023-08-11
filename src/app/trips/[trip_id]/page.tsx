import { TripDescription } from '@/components/trip-descriprion'
import { TripHeader } from '@/components/trip-header'
import { TripHighlights } from '@/components/trip-highlights'
import { TripLocation } from '@/components/trip-location'
import { TripReservation } from '@/components/trip-reservation'
import { prisma } from '@/lib/prisma'

const getTripById = async (trip_id: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: trip_id,
    },
  })

  return trip
}

const TripDetails = async ({ params }: { params: { trip_id: string } }) => {
  const trip = await getTripById(params.trip_id)

  if (!trip) return null

  return (
    <div className="container mx-auto">
      <TripHeader trip={trip} />
      <TripReservation
        max_guests={trip.max_guests}
        trip_start_date={trip.start_date}
        trip_end_date={trip.end_date}
      />
      <TripDescription description={trip.description} />
      <TripHighlights highlights={trip.highlights} />
      <TripLocation
        location={trip.location}
        location_description={trip.location_description}
      />
    </div>
  )
}

export default TripDetails
