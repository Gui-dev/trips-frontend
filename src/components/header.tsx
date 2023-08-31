'use client'

import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

export const Header = () => {
  const { data, status } = useSession()
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  const handleLogin = () => {
    signIn()
  }

  const handleLogout = () => {
    setIsOpenMenu(false)
    signOut()
  }

  return (
    <header className="container mx-auto flex h-[93px] items-center justify-between p-5 py-0 lg:max-w-[948px] lg:px-0">
      <Link
        href="/"
        className="flex flex-row items-center justify-center gap-1"
      >
        <Image src="/logo-2.jpeg" width={42} height={42} alt="Trips Logo" />
        <h1 className="text-xl font-semibold text-primary-normal">MyTrips</h1>
      </Link>
      {status === 'unauthenticated' && (
        <button
          className="text-sm font-semibold text-primary-normal"
          onClick={handleLogin}
        >
          Login
        </button>
      )}

      {status === 'authenticated' && data.user && (
        <div className="flex items-center justify-center gap-5 rounded-full border border-solid border-gray-200 p-2">
          <button onClick={handleOpenMenu}>
            <AiOutlineMenu size={16} />
          </button>
          <Image
            src={data.user.image!}
            alt={data.user.name!}
            height={24}
            width={24}
            className="rounded-full shadow-md"
          />
          {/* -right-1 top-12 */}
          {isOpenMenu && (
            <div className="fixed left-0 top-0 z-20 flex h-screen w-full items-center justify-center overscroll-none">
              <div className="absolute left-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center gap-3 border border-solid border-gray-200 bg-white/80">
                <button
                  className="absolute right-16 top-10 pb-2 text-lg font-semibold text-primary-normal lg:text-3xl lg:hover:text-primary-darker"
                  onClick={handleOpenMenu}
                >
                  <AiOutlineClose />
                </button>

                <Link
                  href="/my-trips"
                  className="border-b border-solid border-primary-light pb-2 text-center text-xs font-semibold text-primary-normal lg:text-xl lg:hover:text-primary-darker"
                  onClick={handleOpenMenu}
                >
                  Minhas viagens
                </Link>
                <button
                  className="pb-2 text-xs font-semibold text-primary-normal lg:text-xl lg:hover:text-red-400"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
