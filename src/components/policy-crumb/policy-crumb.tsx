import { useEditPolicyMutation, useGetPolicyQuery } from '@/services/api'
import {
  Editable,
  EditableArea,
  EditableInput,
  EditablePreview,
} from '@ark-ui/react'
import { useParams } from 'react-router-dom'

export const PolicyCrumb = () => {
  const { policyId } = useParams()
  const { data, isLoading } = useGetPolicyQuery(policyId!)
  const [editPolicy] = useEditPolicyMutation()

  if (isLoading) return <div>Loading...</div>

  const handleSubmit = (value: string) => {
    editPolicy({ id: policyId!, body: { name: value } })
  }

  return (
    <Editable
      defaultValue={data?.name}
      placeholder="Type a name"
      activationMode="dblclick"
      maxLength={100}
      onSubmit={(e) => handleSubmit(e.value)}
      submitMode="both"
    >
      <EditableArea>
        <EditableInput className="bg-[inherit] text-white" />
        <EditablePreview />
      </EditableArea>
    </Editable>
  )
}
