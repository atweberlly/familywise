import { ReactNode } from 'react'

interface Props extends React.AllHTMLAttributes<HTMLElement> {
  text: string
  isActive?: boolean
  onClick?: () => void
  children?: ReactNode
  className?: string
  disabled?: boolean
}

export default function ButtonV2({
  onClick,
  text,
  isActive,
  children,
  className,
  disabled,
}: Props) {
  return (
    <div className="relative flex items-center justify-center gap-x-1" onClick={onClick}>
      {children ? (
        <button
          className={`
        ${className}
          rounded-xl border border-primary-500 p-3 text-sm font-bold lg:px-4 ${
            isActive
              ? 'bg-primary-500 text-white hover:bg-primary-600 hover:text-white'
              : 'bg-none text-primary-500 hover:bg-primary-500 hover:text-white'
          }
        `}
          disabled={disabled}
        >
          {children} {text}
        </button>
      ) : (
        <button
          className={`
          ${className}
          rounded-xl border border-primary-500 p-2 text-sm font-bold lg:px-4 ${
            isActive
              ? 'bg-primary-500 text-white hover:bg-primary-600 hover:text-white'
              : 'bg-transparent text-primary-500 hover:bg-primary-500 hover:text-white '
          }
          `}
          disabled={disabled}
        >
          {text}
        </button>
      )}
    </div>
  )
}
