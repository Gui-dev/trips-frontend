'use client'

import { Trip } from '@prisma/client'

import { DatePicker } from '@/components/datepicker'
import { Input } from './input'
import { Button } from './button'

interface ITripReservation {
  trip: Trip
}

export const TripReservation = ({ trip }: ITripReservation) => {
  return (
    <div className="flex flex-col px-5">
      <form className="flex flex-col gap-2">
        <div className="flex gap-2">
          <DatePicker
            placeholderText="Data de início"
            onChange={() => { }}
            className="w-full"
          />
          <DatePicker
            placeholderText="Data final"
            onChange={() => { }}
            className="w-full"
          />
        </div>
        <Input
          type="number"
          min={1}
          max={trip.max_guests}
          placeholder={`Número de hospedes (max ${trip.max_guests})`}
        />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-primary-darker">Total: </p>
          <p>R$2.500,00</p>
        </div>
        <Button variant="primary">Reservar agora</Button>
      </form>
      <div className="h-[1px] w-full border-b border-solid border-primary-light py-5" />
    </div>
  )
}
