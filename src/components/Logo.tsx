interface Props extends React.HTMLAttributes<any> {
  className?: string
  isWhite?: boolean
}

export default function Logo({ className, isWhite, ...props }: Props) {
  return (
    <img
      src={
        isWhite ? '/svg/family-fortunate-logotype-white.svg' : '/svg/family-fortunate-logotype.svg'
      }
      alt="Family Fortunate Logo"
      className={className}
      {...props}
    />
  )
}
