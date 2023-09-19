import { Connector } from '@/components/connector'
import { Draggable } from '@/components/draggable'
import { Loading } from '@/components/loading'
import { flip } from '@/resources/util'
import { useEditIfStatementMutation, useGetPolicyQuery } from '@/services/api'
import {
  Editable,
  EditableArea,
  EditableInput,
  EditablePreview,
} from '@ark-ui/react'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'

const operators = {
  EQ: '=',
  LT: '<',
  LTE: '<=',
  GT: '>',
  GTE: '>=',
}

export const PolicyItem = () => {
  const { policyId } = useParams<{ policyId: string }>()
  const { data, isLoading } = useGetPolicyQuery(policyId!)
  const [editIfStatement] = useEditIfStatementMutation()

  if (isLoading) return <Loading />

  const handleVariableSubmit = (id: number, value: string) => {
    editIfStatement({ id: policyId!, body: { id, variable: value } })
  }

  const handleOperatorSubmit = (id: number, value: string) => {
    const operatorsFliped = flip<typeof operators>(operators)

    editIfStatement({
      id: policyId!,
      body: { id, comparison_operator: operatorsFliped[value] },
    })
  }

  const handleValueSubmit = (id: number, value: string) => {
    editIfStatement({ id: policyId!, body: { id, value } })
  }

  const handleElseBlockSubmit = (id: number, value: 'false' | 'true') => {
    editIfStatement({ id: policyId!, body: { id, else_block: value } })
  }

  const handleThenBlockSubmit = (id: number, value: 'false' | 'true') => {
    editIfStatement({ id: policyId!, body: { id, then_block: value } })
  }

  return (
    <div className="grid h-full grid-cols-[1fr_max-content] place-items-center">
      <div className="flex flex-col place-items-center text-sm">
        <div className="rounded-lg border border-black-100 bg-black-400 px-6 py-3 uppercase">
          Start
        </div>

        <Connector
          defaultValue="Yes"
          connected={Boolean(data && data.if_statements.length > 0)}
          dir="bottom"
          itemId={0}
          type="decision"
        />

        {data?.if_statements.map(
          (
            {
              id,
              value,
              variable,
              else_block,
              then_block,
              comparison_operator,
            },
            index,
            arr
          ) => (
            <Fragment key={id}>
              <div className="relative flex items-center">
                <div className="relative flex h-32 w-32 items-center justify-center">
                  <div className="decision-shape absolute left-0 top-0 h-full w-full border border-black-100 bg-black-400" />

                  <div className="z-10 flex gap-1">
                    <Editable
                      defaultValue={variable}
                      placeholder="Type a variable"
                      activationMode="dblclick"
                      maxLength={100}
                      onSubmit={(e) => handleVariableSubmit(id, e.value)}
                      submitMode="both"
                    >
                      <EditableArea>
                        <EditableInput className="w-16 bg-[inherit] text-white" />
                        <EditablePreview />
                      </EditableArea>
                    </Editable>

                    <Editable
                      defaultValue={operators[comparison_operator!]}
                      placeholder="Type an operator"
                      activationMode="dblclick"
                      maxLength={100}
                      onSubmit={(e) => handleOperatorSubmit(id, e.value)}
                      submitMode="both"
                    >
                      <EditableArea>
                        <EditableInput className="w-16 bg-[inherit] text-white" />
                        <EditablePreview />
                      </EditableArea>
                    </Editable>

                    <Editable
                      defaultValue={value}
                      placeholder="Type a value"
                      activationMode="dblclick"
                      maxLength={100}
                      onSubmit={(e) => handleValueSubmit(id, e.value)}
                      submitMode="both"
                    >
                      <EditableArea>
                        <EditableInput className="w-16 bg-[inherit] text-white" />
                        <EditablePreview />
                      </EditableArea>
                    </Editable>
                  </div>
                </div>

                <div className="absolute right-[calc(0px_-_((181px_-_128px)_/_2))] top-[50%] flex translate-x-[100%] translate-y-[-50%] items-center">
                  <Connector
                    defaultValue="No"
                    itemId={id}
                    connected={Boolean(else_block)}
                    dir="right"
                    type="end"
                  />

                  {else_block && (
                    <div className="z-10 flex gap-1 whitespace-nowrap rounded-lg border border-black-100 bg-black-400 px-6 py-3">
                      <span>decision</span> ={' '}
                      <Editable
                        defaultValue={else_block}
                        placeholder="Type true or false"
                        activationMode="dblclick"
                        maxLength={100}
                        onSubmit={(e) =>
                          handleElseBlockSubmit(id, e.value as 'false' | 'true')
                        }
                        submitMode="both"
                      >
                        <EditableArea>
                          <EditableInput className="w-16 bg-[inherit] text-white" />
                          <EditablePreview />
                        </EditableArea>
                      </Editable>
                    </div>
                  )}
                </div>
              </div>

              <Connector
                defaultValue="Yes"
                itemId={id}
                connected={Boolean(then_block)}
                dir="bottom"
                type="decision"
              />

              {arr.length - 1 === index && then_block && (
                <div className="z-10 flex gap-1 rounded-lg border border-black-100 bg-black-400 px-6 py-3">
                  <span>decision</span> ={' '}
                  <Editable
                    defaultValue={then_block}
                    placeholder="Type true or false"
                    activationMode="dblclick"
                    maxLength={100}
                    onSubmit={(e) =>
                      handleThenBlockSubmit(id, e.value as 'false' | 'true')
                    }
                    submitMode="both"
                  >
                    <EditableArea>
                      <EditableInput className="w-16 bg-[inherit] text-white" />
                      <EditablePreview />
                    </EditableArea>
                  </Editable>
                </div>
              )}
            </Fragment>
          )
        )}
      </div>

      <div className="z-10 flex h-full flex-col items-center gap-3 border-l border-black-100 bg-black-400 px-3 py-5">
        <Draggable type="decision">
          <div className="relative flex h-32 w-32 items-center justify-center">
            <div className="decision-shape absolute left-0 top-0 z-10 h-full w-full border border-black-100 bg-black-400" />

            <div className="z-20">variable {'>'} value</div>
          </div>
        </Draggable>

        <Draggable type="end" value="false">
          <div className="z-10 rounded-lg border border-black-100 bg-black-400 px-6 py-3">
            decision = false
          </div>
        </Draggable>

        <Draggable type="end" value="true">
          <div className="z-10 rounded-lg border border-black-100 bg-black-400 px-6 py-3">
            decision = true
          </div>
        </Draggable>
      </div>
    </div>
  )
}
