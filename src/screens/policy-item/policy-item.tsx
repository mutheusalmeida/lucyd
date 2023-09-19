import { Connector } from '@/components/connector'
import { Draggable } from '@/components/draggable'
import { Loading } from '@/components/loading'
import { useGetPolicyQuery } from '@/services/api'
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

  if (isLoading) return <Loading />

  return (
    <div className="grid h-full grid-cols-[1fr_max-content] place-items-center">
      <div className="flex flex-col place-items-center text-sm">
        <div className="rounded-lg border border-black-100 bg-black-400 px-6 py-3 uppercase">
          Start
        </div>

        <Connector
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

                  <div className="z-10">
                    {variable}{' '}
                    {comparison_operator && operators[comparison_operator]}{' '}
                    {value}
                  </div>
                </div>

                <div className="absolute right-[calc(0px_-_((181px_-_128px)_/_2))] top-[50%] flex translate-x-[100%] translate-y-[-50%] items-center">
                  <Connector
                    itemId={id}
                    connected={Boolean(else_block)}
                    dir="right"
                    type="end"
                  />

                  {else_block && (
                    <div className="z-10 whitespace-nowrap rounded-lg border border-black-100 bg-black-400 px-6 py-3">
                      decision = {else_block}
                    </div>
                  )}
                </div>
              </div>

              <Connector
                itemId={id}
                connected={Boolean(then_block)}
                dir="bottom"
                type="decision"
              />

              {arr.length - 1 === index && then_block && (
                <div className="z-10 rounded-lg border border-black-100 bg-black-400 px-6 py-3">
                  decision = {then_block}
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
