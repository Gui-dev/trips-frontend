import { ComponentPropsWithoutRef, LegacyRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  error?: boolean
  errorMessage?: string
}

const InputBase = (
  { className, error, errorMessage, ...props }: InputProps,
  ref: LegacyRef<HTMLInputElement> | undefined,
) => {
  const inputClassName = twMerge(
    'rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal text-primary-darker placeholder-black placeholder-opacity-20 outline-none transition-all',
    error ? 'border-red-500' : 'focus:ring-1 focus:ring-primary-normal',
    className,
  )

  return (
    <div className="flex w-full flex-col">
      <input ref={ref} className={inputClassName} {...props} />
      {error && errorMessage && (
        <span className="mt-1 text-xs text-red-400">{errorMessage}</span>
      )}
    </div>
  )
}

export const Input = forwardRef(InputBase)
