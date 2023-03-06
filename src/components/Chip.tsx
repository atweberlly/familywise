export default function Chip({ children }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="inline-block rounded-full border border-primary-500 bg-primary-100 px-5 py-3 text-sm font-semibold text-primary-500 shadow">
      {children}
    </div>
  )
}
