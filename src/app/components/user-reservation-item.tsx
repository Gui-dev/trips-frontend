'use client'

import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import { Button } from '@/components/button'
import { currencyFormat } from '@/lib/currency-format'

interface IUserReservationItem {
  reservation: Prisma.TripReservationGetPayload<{
    include: {
      trip: true
    }
  }>
}

export const UserReservationItem = ({ reservation }: IUserReservationItem) => {
  const router = useRouter()
  const total_formatted = currencyFormat(Number(reservation.total_paid))
  const start_date = format(new Date(reservation.start_date), "dd 'de' MMMM", {
    locale: ptBR,
  })
  const end_date = format(new Date(reservation.start_date), "dd 'de' MMMM", {
    locale: ptBR,
  })

  const handleDelete = async () => {
    const response = await fetch(`/api/trips/reservation/${reservation.id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      return toast.error('Ocorreu um erro ao tentar cancelar a reserva')
    }
    toast.success(`Reserva para ${reservation.trip.name} cancelada com sucesso`)
    router.push('/my-trips')
  }

  return (
    <>
      <div className="mt-5 flex w-full flex-col rounded-lg border border-solid border-primary-light p-5 shadow-lg">
        <div className="flex items-center gap-3 border-b border-solid border-primary-light pb-5">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={reservation.trip.cover_image}
              alt={reservation.trip.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1>{reservation.trip.name}</h1>
            <div className="flex items-center gap-1">
              <ReactCountryFlag
                countryCode={reservation.trip.country_code}
                svg
              />
              <p className="text-xs text-primary-light">
                {reservation.trip.location}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-primary-darker">Datas</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm text-textColor-darker">{start_date}</p>
            <span className="text-sm text-primary-normal">até</span>
            <p className="text-sm text-textColor-darker">{end_date}</p>
          </div>
          <h3 className="text-lg font-semibold text-primary-darker">
            Número de Hóspedes
          </h3>
          <p className="border-b border-solid border-primary-light pb-5 text-sm text-textColor-darker">
            {reservation.guests} hóspedes
          </p>

          <h2 className="mt-3 text-xs font-semibold text-primary-darker">
            Informações sobre o preço
          </h2>
          <div className="flex items-center justify-between">
            <p className="mt-2 text-sm text-textColor-darker">Total</p>
            <strong className="text-xl font-semibold text-primary-darker">
              {total_formatted}
            </strong>
          </div>
          <Button variant="danger" className="mt-5" onClick={handleDelete}>
            Cancelar
          </Button>
        </div>
      </div>
    </>
  )
}
