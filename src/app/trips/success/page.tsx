import Link from 'next/link'
import { AiOutlineCheck } from 'react-icons/ai'

import colors from 'tailwindcss/colors'

const Success = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="flex-nowrap text-lg font-semibold text-primary-darker">
          Pagamento efeituado com Sucesso
        </h1>
        <AiOutlineCheck size={52} color={colors.green[500]} />
      </div>
      <p className="text-sm text-primary-darker">
        Vá para{' '}
        <Link
          href="/my-trips"
          className="text-lg font-semibold text-primary-normal hover:underline"
        >
          minhas viagens
        </Link>{' '}
        e confira
      </p>
    </div>
  )
}

export default Success
