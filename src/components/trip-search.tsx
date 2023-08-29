'use client'

import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from './button'
import { CurrencyInput } from './currency-input'
import { DatePicker } from './datepicker'
import { Input } from './input'
import {
  TripSearchValidationData,
  tripSearchValidation,
} from '@/validations/trip-search-validation'

export const TripSearch = () => {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<TripSearchValidationData>({
    resolver: zodResolver(tripSearchValidation),
  })

  const handleSearchTrip = (data: TripSearchValidationData) => {
    const { destination, start_date, budget } = data
    let url = `/trips/search?destination=${destination}`
    if (start_date) {
      url = url + `&start_date=${start_date?.toISOString()}`
    }
    if (budget) {
      url = url + `&budget=${budget}`
    }
    router.push(url)
  }

  return (
    <div className="container mx-auto bg-search-background bg-cover bg-center bg-no-repeat p-5 lg:py-28">
      <h1 className="text-center text-lg font-semibold text-primary-darker lg:text-[2.5rem]">
        Encontre sua próxima{' '}
        <span className="text-primary-normal">viagem!</span>
      </h1>

      <form
        className="mt-5 flex flex-col gap-4 lg:mx-auto lg:mt-12 lg:max-w-[948px] lg:flex-row lg:rounded-lg lg:bg-primary-normal lg:bg-opacity-20 lg:p-4"
        onSubmit={handleSubmit(handleSearchTrip)}
      >
        <Input
          placeholder="Onde você quer ir ?"
          {...register('destination', { required: true })}
          error={!!errors?.destination}
          errorMessage={errors.destination?.message}
        />
        <div className="flex gap-4 lg:w-full">
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholderText="Data de ida"
                dateFormat="dd/MM/yyyy"
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
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                placeholder="Orçamento"
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                error={!!errors.budget}
                errorMessage={errors.budget?.message}
              />
            )}
          />
        </div>
        <Button variant="primary" className="lg:w-1/2">
          Buscar
        </Button>
      </form>
    </div>
  )
}
