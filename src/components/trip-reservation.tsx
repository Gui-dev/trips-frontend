'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { DatePicker } from '@/components/datepicker'
import { Input } from './input'
import { Button } from './button'
import {
  TripReservationValidationData,
  tripReservationValidation,
} from '@/validations/trip-reservation-validation'

interface ITripReservation {
  max_guests: number
  trip_start_date: Date
  trip_end_date: Date
}

export const TripReservation = ({
  max_guests,
  trip_start_date,
  trip_end_date,
}: ITripReservation) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<TripReservationValidationData>({
    resolver: zodResolver(tripReservationValidation),
  })

  const startDate = watch('start_date')

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
                minDate={trip_start_date}
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
                maxDate={trip_end_date}
                minDate={startDate ?? trip_start_date}
                error={!!errors?.end_date}
                errorMessage={errors.end_date?.message}
              />
            )}
          />
        </div>
        <Input
          type="number"
          min={1}
          max={max_guests}
          placeholder={`Número de hospedes (max ${max_guests})`}
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
