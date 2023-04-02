import { ReactNode } from 'react'

interface Props extends React.AllHTMLAttributes<HTMLElement> {
  text: string
  isActive?: boolean
  onClick?: () => void
  children?: ReactNode
}

export default function ButtonV2({ onClick, text, isActive, children }: Props) {
  return (
    <div className="relative flex items-center justify-center gap-x-1" onClick={onClick}>
      {children ? (
        <button className="rounded-xl border border-[#9E7558] bg-[#9E7558] px-2 py-3 text-sm  font-bold text-[#F9F8F8] lg:px-4">
          {children} {text}
        </button>
      ) : (
        <button
          className={`rounded-xl border border-[#9E7558] px-2 py-3 text-sm font-bold hover:bg-[#9E7558] hover:text-white lg:px-4 ${
            isActive ? 'bg-[#9E7558] text-white' : 'bg-transparent text-[#9E7558]'
          }`}
        >
          {text}
        </button>
      )}
    </div>
  )
}
