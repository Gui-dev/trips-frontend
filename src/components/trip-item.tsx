import { Trip } from '@prisma/client'
import Image from 'next/image'
import ReactContryFlag from 'react-country-flag'

interface ITripItem {
  trip: Trip
}

export const TripItem = ({ trip }: ITripItem) => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[280px] w-[280px]">
        <Image
          src={trip.cover_image}
          alt={trip.name}
          className="rounded-lg object-cover shadow-md"
        />
      </div>
      <h2 className="mt-2 text-sm font-semibold text-primary-darker">
        {trip.name}
      </h2>
      <div className="flex items-center gap-1">
        <ReactContryFlag countryCode={trip.country_code} svg />
        <p className="text-xs text-primary-light">{trip.location}</p>
        <p className="text-xs text-primary-light">
          R$
          <span className="font-semibold text-primary-normal">
            {trip.price_per_day.toString()}
          </span>
          port dia
        </p>
      </div>
    </div>
  )
}
