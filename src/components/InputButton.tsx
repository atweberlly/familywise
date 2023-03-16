export function Checkbox({ children, ...props }: React.InputHTMLAttributes<any>) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2" {...props}>
      <input
        className="checked:bg-check inline-block h-5 w-5 flex-shrink-0 select-none appearance-none rounded border-2 bg-white bg-origin-border align-middle transition checked:border-transparent checked:bg-primary-500 checked:bg-cover checked:bg-center checked:bg-no-repeat hover:border-primary-500"
        type="checkbox"
      />
      <p>{children}</p>
    </label>
  )
}

export function Radio({ children, ...props }: React.InputHTMLAttributes<any>) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2" {...props}>
      <input
        className="checked:bg-radio checked:bg-half inline-block h-5 w-5 flex-shrink-0 select-none appearance-none rounded-full border-2 bg-white bg-origin-border align-middle transition checked:bg-primary-500 checked:bg-center checked:bg-no-repeat checked:ring-2 checked:ring-white hover:border-primary-500"
        type="radio"
        {...props}
      />
      <p>{children}</p>
    </label>
  )
}
