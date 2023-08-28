'use client'

import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineMenu } from 'react-icons/ai'

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
    <header className="container mx-auto flex h-[93px] items-center justify-between p-5 py-0">
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
        <div className="relative flex items-center justify-center gap-5 rounded-full border border-solid border-gray-200 p-2">
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
          {isOpenMenu && (
            <div className="absolute -right-1 top-12 z-10 flex h-[100px] w-auto flex-col items-center justify-center gap-3 rounded-lg border border-solid border-gray-200 bg-white p-2 px-3 shadow-md">
              <Link
                href="/my-trips"
                className="border-b border-solid border-primary-light pb-2 text-center text-xs font-semibold text-primary-normal"
                onClick={handleOpenMenu}
              >
                Minhas viagens
              </Link>
              <button
                className="pb-2 text-xs font-semibold text-primary-normal"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
