import { QuickSearch } from '@/components/quick-search'
import { TripsRecommended } from '@/app/components/trips-recommended'
import { TripSearch } from '@/components/trip-search'

export default function Home() {
  return (
    <>
      <TripSearch />
      <QuickSearch />
      <TripsRecommended />
    </>
  )
}
