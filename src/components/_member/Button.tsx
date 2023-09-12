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
        rounded-xl border border-primary-600 p-2 text-sm font-bold dark:border-primary-600 lg:px-4 ${
          isActive
            ? 'bg-primary-400 text-white hover:bg-primary-600 hover:text-white dark:bg-primary-600 dark:hover:bg-primary-600/70'
            : 'bg-transparent  text-primary-600 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600/70 dark:hover:text-white'
        }
        ${disabled ? 'cursor-not-allowed hover:bg-gray-500' : ''}
        `}
          disabled={disabled}
        >
          {children} {text}
        </button>
      ) : (
        <button
          className={`
          ${className}
          rounded-xl border border-primary-600 p-2 text-sm font-bold dark:border-white lg:px-4 ${
            isActive
              ? 'bg-primary-400 text-white hover:bg-primary-600 hover:text-white dark:bg-primary-600 dark:hover:bg-primary-600/70'
              : 'bg-transparent  text-primary-600 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-400/70 dark:hover:text-white'
          }
          ${disabled ? 'cursor-not-allowed hover:bg-gray-500' : ''}
          `}
          disabled={disabled}
        >
          {text}
        </button>
      )}
    </div>
  )
}
