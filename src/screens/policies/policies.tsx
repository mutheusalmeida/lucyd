import { CreatePolicyDialog } from '@/components/create-policy-dialog'
import { Loading } from '@/components/loading'
import { PolicyListItem } from '@/components/policy-list-item'
import { useGetPoliciesQuery } from '@/services/api'
import { useToast } from '@ark-ui/react'

export const Policies = () => {
  const { data, isLoading, isError, error } = useGetPoliciesQuery()
  const toast = useToast()

  if (isLoading) return <Loading />

  if (isError) {
    toast.create({
      title: 'Something went wrong',
      description:
        'status' in error
          ? 'error' in error
            ? error.error
            : JSON.stringify(error.data)
          : error.message,
    })
  }

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
