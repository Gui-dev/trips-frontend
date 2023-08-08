import { Trip } from '@prisma/client'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'

interface ITripHeader {
  trip: Trip
}

export const TripHeader = ({ trip }: ITripHeader) => {
  return (
    <>
      <div className="relative h-[280px] w-full">
        <Image
          src={trip!.cover_image}
          fill
          alt={trip!.name}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col p-5">
        <h1>{trip!.name}</h1>
        <div className="my-1 flex items-center gap-1">
          <ReactCountryFlag countryCode={trip!.country_code} svg />
          <p className="text-xs text-primary-light underline">
            {trip!.location}
          </p>
        </div>
        <p className="text-xs text-primary-normal">
          R${trip!.price_per_day.toString()} por dia
        </p>
      </div>
    </>
  )
}
