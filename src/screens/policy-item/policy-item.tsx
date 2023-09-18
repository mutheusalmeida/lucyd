import { useGetPolicyQuery } from '@/services/api'
import { useParams } from 'react-router-dom'

export const PolicyItem = () => {
  const { policyId } = useParams()
  const { data, isLoading } = useGetPolicyQuery(policyId!)

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(176px,_1fr))] gap-3 p-5">
      <h2>{data?.name}</h2>
    </div>
  )
}
