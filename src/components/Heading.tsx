import clsx from 'clsx'

const sizes = {
  1: ['text-4xl lg:text-5xl xl:text-6xl'],
  2: ['text-3xl lg:text-4xl xl:text-5xl'],
  3: ['text-2xl lg:text-3xl xl:text-4xl'],
  4: ['text-xl lg:text-2xl xl:text-3xl'],
  5: ['text-lg lg:text-xl xl:text-2xl'],
  6: ['lg:text-lg xl:text-xl'],
}

interface Props extends React.HTMLAttributes<HTMLElement> {
  size: 1 | 2 | 2 | 3 | 4 | 5 | 6
  eyebrow?: string
}

export default function Heading({ className, size, eyebrow, children, ...props }: Props) {
  const sizeClassNames = typeof size === 'number' ? sizes[size] : sizes
  const HeadingTag: any = `h${size}`

  return (
    <>
      {typeof eyebrow === 'string' && (
        <div className="text-sm uppercase tracking-wider text-dark-600">{eyebrow}</div>
      )}
      <HeadingTag
        className={clsx('font-serif selection:bg-transparent', sizeClassNames, className)}
        {...props}
      >
        {children}
      </HeadingTag>
    </>
  )
}
