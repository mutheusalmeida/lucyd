import { CreatePolicyDialog } from '@/components/create-policy-dialog'
import { Loading } from '@/components/loading'
import { PolicyListItem } from '@/components/policy-list-item'
import { useGetPoliciesQuery } from '@/services/api'

export const Policies = () => {
  const { data, isLoading } = useGetPoliciesQuery()

  if (isLoading) return <Loading />

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(176px,_1fr))] gap-3 p-5">
      <div className="aspect-square h-full w-full rounded border border-black-100 p-5 transition-[background-color] duration-75 ease-linear hover:bg-black-50">
        <CreatePolicyDialog />
      </div>

      {data?.content.map(({ id, name }) => (
        <PolicyListItem key={id} id={id} name={name} />
      ))}
    </div>
  )
}
