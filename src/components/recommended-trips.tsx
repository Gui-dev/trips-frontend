import { TripItem } from './trip-item'

export const RecommendedTrips = () => {
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="h-[1px] w-full bg-gray-200" />
        <h2 className="whitespace-nowrap font-semibold text-primary-light">
          Destinos recomendados
        </h2>
        <div className="h-[2px] w-full bg-gray-200" />
      </div>

      <div className="mt-5 flex flex-col items-center gap-5">
        <TripItem />
      </div>
    </div>
  )
}
