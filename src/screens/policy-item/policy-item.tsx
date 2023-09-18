import { Loading } from '@/components/loading'
import { useGetPolicyQuery } from '@/services/api'
import { useParams } from 'react-router-dom'

const operators = {
  EQ: '=',
  LT: '<',
  LTE: '<=',
  GT: '>',
  GTE: '>=',
}

export const PolicyItem = () => {
  const { policyId } = useParams()
  const { data, isLoading } = useGetPolicyQuery(policyId!)

  if (isLoading) return <Loading />

  return (
    <div className="grid h-full place-items-center">
      <div className="flex flex-col place-items-center text-sm">
        <div className="rounded-lg border border-black-100 bg-black-400 px-6 py-3 uppercase">
          Start
        </div>

        <div className="relative h-11 w-[1px] bg-black-100">
          <div className="absolute bottom-0 left-[50%] h-2 w-2 translate-x-[-50%] translate-y-full rotate-[45deg] border border-black-100 bg-black-100" />
        </div>

        {data?.if_statements.map(
          ({ id, value, variable, comparison_operator }, index, arr) => (
            <>
              <div className="relative flex items-center">
                <div
                  key={id}
                  className="relative flex h-32 w-32 items-center justify-center bg-black-400"
                >
                  <div className="decision-shape absolute left-0 top-0 h-full w-full border border-black-100" />

                  <div className="z-10">
                    {variable} {operators[comparison_operator]} {value}
                  </div>
                </div>

                <div className="absolute right-[calc(-197px_-_((181px_-_128px)_/_2))] top-[50%] flex translate-y-[-50%] items-center">
                  <div className="relative h-[1px] w-11 bg-black-100">
                    <div className="absolute right-0 top-[50%] h-2 w-2 translate-x-full translate-y-[-50%] rotate-[45deg] border border-black-100 bg-black-100" />
                  </div>

                  <div className="z-10 rounded-lg border border-black-100 bg-black-400 px-6 py-3">
                    decision = false
                  </div>
                </div>
              </div>

              <div className="relative h-11 w-[1px] bg-black-100">
                <div className="absolute bottom-0 left-[50%] h-2 w-2 translate-x-[-50%] translate-y-full rotate-[45deg] border border-black-100 bg-black-100" />
              </div>

              {arr.length - 1 === index && (
                <div className="z-10 rounded-lg border border-black-100 bg-black-400 px-6 py-3">
                  decision = true
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  )
}
