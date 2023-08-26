'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Trip } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { loadStripe } from '@stripe/stripe-js'

import { currencyFormat } from '@/lib/currency-format'
import { Button } from '@/components/button'

const TripConfirmation = ({
  params,
}: {
  params: {
    trip_id: string
  }
}) => {
  const { status, data } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [trip, setTrip] = useState<Trip>()
  const [total, setTotal] = useState<number>()
  const { trip_id } = params

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch(`http://localhost:3000/api/trips/check`, {
        method: 'POST',
        body: JSON.stringify({
          trip_id,
          start_date: searchParams.get('start_date'),
          end_date: searchParams.get('end_date'),
        }),
      })
      const { trip, total_price, ...rest } = await response.json()

      if (rest?.error) {
        return router.push('/')
      }
      setTrip(trip)
      setTotal(total_price)
    }
    if (status === 'unauthenticated') {
      router.push('/')
    }
    fetchTrip()
  }, [trip_id, searchParams, status, router])

  const start_date = format(
    new Date(searchParams.get('start_date') as string),
    "dd 'de' MMMM",
    {
      locale: ptBR,
    },
  )
  const end_date = format(
    new Date(searchParams.get('end_date') as string),
    "dd 'de' MMMM",
    {
      locale: ptBR,
    },
  )
  const guests = searchParams.get('guests')
  const total_formatted = currencyFormat(Number(total))

  if (!trip) {
    return
  }

  const handleTripConfirmation = async () => {
    const response = await fetch('http://localhost:3000/api/payment', {
      method: 'POST',
      body: JSON.stringify({
        trip_id,
        user_id: data?.user.id,
        name: trip.name,
        description: trip.description,
        cover_image: trip.cover_image,
        guests: Number(guests),
        total_price: total,
        end_date: searchParams.get('end_date'),
        start_date: searchParams.get('start_date'),
      }),
    })
    const { session_id } = await response.json()
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!)
    await stripe?.redirectToCheckout({
      sessionId: session_id,
    })
  }

  return (
    <section className="container mx-auto p-5">
      <h1 className="text-xl font-semibold text-primary-darker">Sua viagem</h1>
      <div className="mt-5 flex flex-col rounded-lg border border-solid border-primary-light p-5 shadow-lg">
        <div className="flex items-center gap-4 border-b border-solid border-primary-light pb-5">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip.cover_image}
              alt={trip.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="fles flex-col">
            <h1 className="text-xl font-semibold text-primary-darker">
              {trip.name}
            </h1>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.country_code} svg />
              <p className="text-xs text-primary-light underline">
                {trip.location}
              </p>
            </div>
          </div>
        </div>

        <h2 className="mt-3 text-xs font-semibold text-primary-darker">
          Informações sobre o preço
        </h2>
        <div className="flex items-center justify-between">
          <p className="mt-2 text-lg text-textColor-darker">Total</p>
          <strong className="text-xl font-semibold text-primary-darker">
            {total_formatted}
          </strong>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-primary-darker">Datas</h3>
        <div className="flex items-center gap-2">
          <p className="text-lg text-textColor-darker">{start_date}</p>
          <span className="text-lg text-primary-normal">até</span>
          <p className="text-lg text-textColor-darker">{end_date}</p>
        </div>
        <h3 className="text-lg font-semibold text-primary-darker">
          Número de Hóspedes
        </h3>
        <p className="text-lg text-textColor-darker">{guests} hóspedes</p>
        <Button
          variant="primary"
          className="mt-5"
          onClick={handleTripConfirmation}
        >
          Finalizar Compra
        </Button>
      </div>
    </section>
  )
}

export default TripConfirmation
