export default function Chip({ children }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="inline-block rounded-full border border-[#9E7558] bg-primary-100 px-5 py-3 text-sm font-semibold text-[#9E7558] shadow dark:border-white dark:bg-[#9E7558] dark:text-white">
      {children}
    </div>
  )
}
