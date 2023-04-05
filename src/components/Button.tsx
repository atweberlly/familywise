import Link from 'next/link'
import clsx from 'clsx'

const colors = {
  primary: ['bg-[#9E7558] text-white hover:bg-[#9E7558] focus:ring-[#9E7558]/50'],
  secondary: [
    'bg-secondary-400 text-secondary-100 hover:bg-secondary-600 focus:ring-secondary-500/50',
  ],
  dark: [
    'bg-dark-400 text-white shadow-lg hover:border-dark-400 hover:bg-white hover:text-black focus:ring-dark-500/50',
  ],
  yellow: ['bg-lemon-curry/90 text-white shadow-lg hover:bg-lemon-curry focus:ring-lemon-curry/50'],
}

interface Props extends React.AllHTMLAttributes<HTMLElement> {
  type?: 'link' | 'button' | 'submit'
  color?: 'primary' | 'secondary' | 'dark' | 'yellow'
}

export default function Button({
  className,
  href = '#',
  type = 'link',
  color = 'primary',
  children,
  ...props
}: Props) {
  const colorClassnames = typeof color === 'string' ? colors[color] : colors

  return type === 'link' ? (
    <Link
      className={clsx(
        'inline-block rounded-xl border-2 border-transparent px-4 py-3 text-center font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2',
        colorClassnames,
        className
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  ) : (
    <button
      className={clsx(
        'inline-block rounded-xl border-2 border-transparent px-4 py-3 text-center font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-secondary-200 disabled:hover:bg-[#9E7558]',
        colorClassnames,
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
