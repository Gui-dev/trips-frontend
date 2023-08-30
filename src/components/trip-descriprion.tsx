interface ITripDescription {
  description: string
}

export const TripDescription = ({ description }: ITripDescription) => {
  return (
    <section className="flex flex-col p-5 lg:p-0">
      <h1 className="text-lg font-semibold text-primary-darker lg:text-xl">
        Sobre a viagem
      </h1>
      <p className="mt-3 text-xs text-primary-darker lg:mt-5 lg:text-base lg:leading-7">
        {description}
      </p>
    </section>
  )
}
