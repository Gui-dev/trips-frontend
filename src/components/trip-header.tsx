import { Trip } from '@prisma/client'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'

interface ITripHeader {
  trip: Trip
}

export const TripHeader = ({ trip }: ITripHeader) => {
  return (
    <div className="container mx-auto flex flex-col lg:max-w-[948px]">
      {/* Mobile */}
      <div className="relative h-[280px] w-full lg:hidden">
        <Image
          src={trip!.cover_image}
          fill
          alt={trip!.name}
          className="object-cover"
        />
      </div>

      {/* Desktop */}
      <div className="hidden grid-cols-[2fr,1fr,1fr] grid-rows-2 gap-2 lg:order-2 lg:mb-8 lg:grid lg:gap-2">
        <div className="relative row-span-2">
          <Image
            src={trip!.cover_image}
            fill
            alt={trip!.name}
            className="rounded-lg rounded-bl-lg object-cover shadow-md"
          />
        </div>
        {trip.images_url.map((image, index) => {
          return (
            <div key={String(index)} className="relative h-[200px] w-full">
              <Image
                src={image}
                fill
                alt={trip!.name}
                className="object-cover shadow-md"
              />
            </div>
          )
        })}
      </div>

      <div className="flex flex-col p-5 lg:my-5 lg:p-0">
        <h1 className="text-xl font-semibold text-primary-darker lg:text-3xl">
          {trip!.name}
        </h1>
        <div className="my-1 flex items-center gap-1">
          <ReactCountryFlag countryCode={trip!.country_code} svg />
          <p className="text-xs text-primary-light underline lg:text-base">
            {trip!.location}
          </p>
        </div>
        <p className="text-xs text-primary-normal lg:text-base">
          R${trip!.price_per_day.toString()} por dia
        </p>
      </div>
    </div>
  )
}
