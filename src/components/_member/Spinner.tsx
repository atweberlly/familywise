import { GridLoader } from 'react-spinners'

interface Props extends React.AllHTMLAttributes<HTMLElement> {
  loading: boolean
}

export default function Spinner({ loading }: Props) {
  return (
    <div className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-[rgba(90,153,153,0.4)]">
      <GridLoader color="#2BA193" loading={loading} aria-label="Loading Spinner" />
    </div>
  )
}
