import { twMerge } from 'tailwind-merge'

type LoadingProps = {
  className?: string
}

export const Loading = ({ className }: LoadingProps) => {
  return (
    <div className={twMerge('p-5', className)}>
      <span>Loading...</span>
    </div>
  )
}
