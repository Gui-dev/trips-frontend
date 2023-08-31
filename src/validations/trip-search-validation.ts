import { z } from 'zod'

export const tripSearchValidation = z.object({
  destination: z
    .string({
      invalid_type_error: 'Destino é obrigatório',
      required_error: 'Destino é obrigatório',
    })
    .nonempty('Destino é obrigatório. Ex: São Paulo'),
  start_date: z
    .date({
      invalid_type_error: 'Selecione data de início',
      required_error: 'Selecione data de início',
    })
    .optional(),
  budget: z.coerce
    .number({
      invalid_type_error: 'Orçamento é obrigatório',
      required_error: 'Orçamento é obrigatório',
    })
    .optional(),
})

export type TripSearchValidationData = z.infer<typeof tripSearchValidation>
