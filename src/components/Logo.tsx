interface Props extends React.HTMLAttributes<any> {
  className?: string
  isWhite?: boolean
}

export default function Logo({ className, isWhite, ...props }: Props) {
  return (
    <img
      src={
        isWhite ? '/svg/fw-logo-white transparent.svg' : '/svg/fw-logo-blue_brown.svg'
      }
      alt="Family Wise Logo"
      className={className}
      {...props}
    />
  )
}
