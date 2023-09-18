import { useGetPoliciesQuery } from '@/services/api'
import { Link } from 'react-router-dom'

export const Policies = () => {
  const { data, isLoading } = useGetPoliciesQuery()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(176px,_1fr))] gap-3 p-5">
      {data?.content.map(({ id, name }) => (
        <Link to={`/policies/${id}`} key={id}>
          <div className="border-black-100 hover:bg-black-50 aspect-square h-full w-full rounded border p-5 transition-[background-color] duration-75 ease-linear">
            <h2>{name}</h2>
          </div>
        </Link>
      ))}
    </div>
  )
}
