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
        rounded-xl border border-[#9E7558] p-2 text-sm font-bold dark:border-[#9E7558] lg:px-4 ${
          isActive
            ? 'bg-[#B99D7E] text-white hover:bg-[#9E7558] hover:text-white dark:bg-[#9E7558] dark:hover:bg-[#9E7558]/70'
            : 'bg-transparent  text-[#9E7558] hover:bg-[#9E7558] hover:text-white dark:hover:bg-[#9E7558]/70 dark:hover:text-white'
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
          rounded-xl border border-[#9E7558] p-2 text-sm font-bold dark:border-white lg:px-4 ${
            isActive
              ? 'bg-[#B99D7E] text-white hover:bg-[#9E7558] hover:text-white dark:bg-[#9E7558] dark:hover:bg-[#9E7558]/70'
              : 'bg-transparent  text-[#9E7558] hover:bg-[#9E7558] hover:text-white dark:hover:bg-[#B99D7E]/70 dark:hover:text-white'
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
