import clsx from 'clsx'
import NextLink from 'next/link'

interface Props extends React.HTMLAttributes<HTMLElement> {
  href: string
}

export default function Link({ className, href, children, ...props }: Props) {
  return (
    <NextLink className={clsx('inline-block', className)} href={href} {...props}>
      {children}
    </NextLink>
  )
}
