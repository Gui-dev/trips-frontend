import { z } from 'zod'

export const tripReservationValidation = z.object({
  guests: z.coerce
    .number()
    .min(1, 'Número de hospedes é obrigátorio')
    .max(10, 'No máximo 10 hospedes'),
  start_date: z.date({
    invalid_type_error: 'Selecione data de início',
    required_error: 'Selecione data de início',
  }),
  end_date: z.date({
    invalid_type_error: 'Selecione data final',
    required_error: 'Selecione data final',
  }),
})

export type TripReservationValidationData = z.infer<
  typeof tripReservationValidation
>
