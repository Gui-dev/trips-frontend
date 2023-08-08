interface ITripDescription {
  description: string
}

export const TripDescription = ({ description }: ITripDescription) => {
  return (
    <section className="flex flex-col p-5">
      <h1 className="text-lg font-semibold text-primary-darker">
        Sobre a viagem
      </h1>
      <p className="mt-3 text-xs text-primary-darker">{description}</p>
    </section>
  )
}
