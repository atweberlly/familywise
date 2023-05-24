export default function Chip({ children }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="inline-block rounded-full border border-primary-600 bg-primary-100 px-5 py-3 text-sm font-semibold text-primary-600 shadow dark:border-white dark:bg-primary-600 dark:text-white">
      {children}
    </div>
  )
}
