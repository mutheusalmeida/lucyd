import { Loading } from '@/components/loading'
import { useGetPoliciesQuery } from '@/services/api'
import { Link } from 'react-router-dom'

export const Policies = () => {
  const { data, isLoading } = useGetPoliciesQuery()

  if (isLoading) return <Loading />

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(176px,_1fr))] gap-3 p-5">
      {data?.content.map(({ id, name }) => (
        <Link to={`/policies/${id}`} key={id}>
          <div className="aspect-square h-full w-full rounded border border-black-100 p-5 transition-[background-color] duration-75 ease-linear hover:bg-black-50">
            <h2>{name}</h2>
          </div>
        </Link>
      ))}
    </div>
  )
}
