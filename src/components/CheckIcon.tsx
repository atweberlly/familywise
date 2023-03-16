import clsx from 'clsx'

interface Props extends React.HTMLAttributes<any> {
  className?: string
}

export default function CheckIcon({ className }: Props) {
  return (
    <svg
      className={clsx('h-5 w-5', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect width="24" height="24" rx="12" fill="#F3E9DB" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
        fill="currentColor"
      />
    </svg>
  )
}
