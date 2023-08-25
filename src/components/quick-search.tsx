import Image from 'next/image'
import Link from 'next/link'

export const QuickSearch = () => {
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="h-[1px] w-full bg-gray-200" />
        <h2 className="whitespace-nowrap font-semibold text-primary-light">
          Tente pesquisar por
        </h2>
        <div className="h-[2px] w-full bg-gray-200" />
      </div>

      <div className="mt-5 flex w-full justify-between">
        <Link
          href="/trips/search?destination=hotel"
          className="flex flex-col items-center justify-center gap-1 transition-colors hover:text-primary-normal"
        >
          <Image
            src="/hotel-icon.png"
            height={35}
            width={35}
            alt="Hotel icon"
          />
          <p className="text-sm text-textColor-darker">Hotel</p>
        </Link>
        <Link
          href="/trips/search?destination=fazenda"
          className="flex flex-col items-center justify-center gap-1 transition-colors hover:text-primary-normal"
        >
          <Image
            src="/farm-icon.png"
            height={35}
            width={35}
            alt="icone Fazenda"
          />
          <p className="text-sm text-textColor-darker">Fazenda</p>
        </Link>
        <Link
          href="/trips/search?destination=chalé"
          className="flex flex-col items-center justify-center gap-1 transition-colors hover:text-primary-normal"
        >
          <Image
            src="/cottage-icon.png"
            height={35}
            width={35}
            alt="icone Chalé"
          />
          <p className="text-sm text-textColor-darker">Chalé</p>
        </Link>
        <Link
          href="/trips/search?destination=pousada"
          className="flex flex-col items-center justify-center gap-1 transition-colors hover:text-primary-normal"
        >
          <Image
            src="/inn-icon.png"
            height={35}
            width={35}
            alt="icone Pousada"
          />
          <p className="text-sm text-textColor-darker">Pousada</p>
        </Link>
      </div>
    </div>
  )
}
