import 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session {
    user: {
      id: string | null | undefined
      name?: string | null | undefined
      email?: string | null | undefined
      image?: string | null | undefined
    }
  }
}