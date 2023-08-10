'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trip } from '@prisma/client'

import { DatePicker } from '@/components/datepicker'
import { Input } from './input'
import { Button } from './button'
import {
  TripReservationValidationData,
  tripReservationValidation,
} from '@/validations/trip-reservation-validation'

interface ITripReservation {
  trip: Trip
}

export const TripReservation = ({ trip }: ITripReservation) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<TripReservationValidationData>({
    resolver: zodResolver(tripReservationValidation),
  })

  const handleCreateReservation = (data: any) => {
    try {
      console.log('Data: ', data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col px-5">
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(handleCreateReservation)}
      >
        <div className="flex gap-2">
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholderText="Data de início"
                selected={field.value}
                onChange={field.onChange}
                className="w-full"
                minDate={new Date()}
                error={!!errors?.start_date}
                errorMessage={errors.start_date?.message}
              />
            )}
          />

          <Controller
            name="end_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholderText="Data final"
                selected={field.value}
                onChange={field.onChange}
                className="w-full"
                minDate={new Date()}
                error={!!errors?.end_date}
                errorMessage={errors.end_date?.message}
              />
            )}
          />
        </div>
        <Input
          type="number"
          min={1}
          max={trip.max_guests}
          placeholder={`Número de hospedes (max ${trip.max_guests})`}
          {...register('guests')}
          error={!!errors.guests}
          errorMessage={errors.guests?.message}
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
