'use client'

import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInDays } from 'date-fns'

import { DatePicker } from '@/components/datepicker'
import { Input } from './input'
import { Button } from './button'
import {
  TripReservationValidationData,
  tripReservationValidation,
} from '@/validations/trip-reservation-validation'
import { currencyFormat } from '@/lib/currency-format'

interface ITripReservation {
  trip_id: string
  max_guests: number
  price_per_day: number
  trip_start_date: Date
  trip_end_date: Date
}

export const TripReservation = ({
  trip_id,
  max_guests,
  price_per_day,
  trip_start_date,
  trip_end_date,
}: ITripReservation) => {
  const navigation = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setError,
    watch,
  } = useForm<TripReservationValidationData>({
    resolver: zodResolver(tripReservationValidation),
  })

  const startDate = watch('start_date')
  const endDate = watch('end_date')
  const total = currencyFormat(
    differenceInDays(endDate, startDate) * price_per_day,
  )

  const handleCreateReservation = async (
    data: TripReservationValidationData,
  ) => {
    const { start_date, end_date, guests } = data
    const response = await fetch('/api/trips/check', {
      method: 'POST',
      body: JSON.stringify({
        trip_id,
        start_date,
        end_date,
      }),
    })
    const reservation = await response.json()
    if (reservation?.error?.code === 'TRIP_ALREADY_RESERVED') {
      setError('start_date', {
        type: 'manual',
        message: 'Esta data já está reservada',
      })
      return setError('end_date', {
        type: 'manual',
        message: 'Esta data já está reservada',
      })
    }

    if (reservation?.error?.code === 'INVALID_START_DATE') {
      return setError('start_date', {
        type: 'manual',
        message: 'Data inválida',
      })
    }

    if (reservation?.error?.code === 'INVALID_START_DATE') {
      return setError('end_date', {
        type: 'manual',
        message: 'Data inválida',
      })
    }

    navigation.push(
      `/trips/${trip_id}/confirmation?start_date=${start_date.toISOString()}&end_date=${end_date.toISOString()}&guests=${guests}
        `,
    )
  }

  return (
    <div className="flex flex-col px-5 lg:min-w-[360px] lg:rounded-lg lg:border lg:border-solid lg:border-primary-light lg:px-0 lg:shadow-md">
      <form
        className="flex flex-col gap-2 lg:p-5"
        onSubmit={handleSubmit(handleCreateReservation)}
      >
        <div className="flex gap-2">
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholderText="Data de início"
                dateFormat="dd/MM/yyyy"
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
                dateFormat="dd/MM/yyyy"
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
          {...register('guests', {
            max: {
              value: max_guests,
              message: `O número de hospedes não pode ser maior que ${max_guests}`,
            },
          })}
          error={!!errors.guests}
          errorMessage={errors.guests?.message}
        />
        <div className="mt-3 flex items-center justify-between">
          {startDate && endDate && (
            <>
              <p className="text-sm font-semibold text-primary-light lg:text-base">
                Total:{' '}
              </p>
              <p className="text-base font-semibold text-primary-darker lg:mb-2 lg:text-lg">
                {total}
              </p>
            </>
          )}
        </div>
        <Button variant="primary">Reservar agora</Button>
      </form>
      <div className="h-[1px] w-full border-b border-solid border-primary-light py-5 lg:hidden" />
    </div>
  )
}
