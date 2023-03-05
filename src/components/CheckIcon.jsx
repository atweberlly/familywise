import clsx from 'clsx'

export default function CheckIcon({ className }) {
  return (
    <svg
      className={clsx('h-5 w-5', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        d="m8.33 11.333 4.917-4.916a.79.79 0 0 1 .584-.23.79.79 0 0 1 .583.23.79.79 0 0 1 .23.583.79.79 0 0 1-.23.583l-5.5 5.5a.8.8 0 0 1-.583.25.8.8 0 0 1-.584-.25l-2.166-2.166a.79.79 0 0 1-.23-.584.79.79 0 0 1 .23-.583.79.79 0 0 1 .583-.23.79.79 0 0 1 .583.23l1.584 1.583Z"
      />
    </svg>
  )
}
