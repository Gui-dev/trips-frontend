import Image from 'next/image'
import { Button } from './button'

interface ITripLocation {
  location: string
  location_description: string
}

export const TripLocation = ({
  location,
  location_description,
}: ITripLocation) => {
  return (
    <section className="flex flex-col gap-2 p-5 lg:mx-auto lg:my-10 lg:max-w-[948px] lg:p-0">
      <h2 className="mb-5 text-lg font-semibold text-primary-darker lg:text-xl">
        Localização
      </h2>
      {/* Mobile */}
      <div className="relative h-[280px] w-full lg:hidden">
        <Image
          src="/map-mobile.png"
          alt="Mapa da localização"
          className="rounded-lg object-cover shadow-md"
          fill
        />
      </div>
      {/* Desktop */}
      <div className="relative hidden h-[480px] w-full lg:block">
        <Image
          src="/map-desktop.png"
          alt="Mapa da localização"
          className="rounded-lg object-cover shadow-md"
          fill
        />
      </div>
      <h1 className="mt-3 text-sm font-semibold text-primary-darker lg:mt-5 lg:text-lg">
        {location}
      </h1>
      <p className="text-xs leading-5 text-primary-darker lg:text-base">
        {location_description}
      </p>
      <Button variant="outlined" className="mt-5 lg:w-[300px] lg:self-center">
        Ver no Google Maps
      </Button>
    </section>
  )
}
