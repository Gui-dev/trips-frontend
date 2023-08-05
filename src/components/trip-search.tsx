'use client'

import { Button } from './button'
import { CurrencyInput } from './currency-input'
import { DatePicker } from './datepicker'
import { Input } from './input'

export const TripSearch = () => {
  return (
    <div className="container mx-auto bg-search-background bg-cover bg-center bg-no-repeat p-5">
      <h1 className="text-center text-lg font-semibold text-primary-darker">
        Encontre sua próxima{' '}
        <span className="text-primary-normal">viagem!</span>
      </h1>

      <div className="mt-5 flex flex-col gap-4">
        <Input placeholder="Onde você quer ir ?" />
        <div className="flex gap-4">
          <DatePicker placeholderText="Data de ida" onChange={() => { }} />
          <CurrencyInput placeholder="Orçamento" />
        </div>
        <Button variant="primary">Buscar</Button>
      </div>
    </div>
  )
}
