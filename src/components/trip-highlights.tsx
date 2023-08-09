import Image from 'next/image'

interface ITripHighlights {
  highlights: string[]
}

export const TripHighlights = ({ highlights }: ITripHighlights) => {
  return (
    <section className="flex flex-col gap-3 p-5">
      <h1 className="text-lg font-semibold text-primary-darker">Destaques</h1>
      <div className="flex flex-wrap gap-y-2">
        {highlights.map((highlight, index) => {
          return (
            <div key={String(index)} className="flex w-1/2 items-center gap-2">
              <Image
                src="/check-icon.png"
                alt="Icone de check"
                height={16}
                width={15}
                className="h-[16px] w-[15px]"
              />
              <p key={String(index)} className="text-xs text-primary-darker">
                {highlight}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
