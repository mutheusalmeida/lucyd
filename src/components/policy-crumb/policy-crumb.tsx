import { useEditPolicyMutation, useGetPolicyQuery } from '@/services/api'
import {
  Editable,
  EditableArea,
  EditableInput,
  EditablePreview,
} from '@ark-ui/react'
import { useParams } from 'react-router-dom'
import { DecisionDialog } from '../decision-dialog'
import { Loading } from '../loading'

export const PolicyCrumb = () => {
  const { policyId } = useParams<{ policyId: string }>()
  const { data, isLoading } = useGetPolicyQuery(policyId!)
  const [editPolicy] = useEditPolicyMutation()

  if (isLoading) return <Loading className="p-0" />

  const handleSubmit = (value: string) => {
    editPolicy({ id: policyId!, body: { name: value } })
  }

  return (
    <div className="flex items-center gap-3">
      <Editable
        defaultValue={data?.name}
        placeholder="Type a name"
        activationMode="dblclick"
        maxLength={100}
        onSubmit={(e) => handleSubmit(e.value)}
        submitMode="both"
      >
        <EditableArea>
          <EditableInput className="w-32 bg-[inherit] text-white" />
          <EditablePreview />
        </EditableArea>
      </Editable>

      <DecisionDialog
        disabled={Boolean(data && data.if_statements.length === 0)}
      />
    </div>
  )
}
