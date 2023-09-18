import { useExecutePolicyMutation } from '@/services/api'
import { selectPolicy } from '@/services/policies-slice'
import { useTypedSelector } from '@/services/store'
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Portal,
} from '@ark-ui/react'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import { DecisionType } from 'policies'
import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'

type DecisionDialogProps = {
  disabled: boolean
}

export const DecisionDialog = ({ disabled }: DecisionDialogProps) => {
  const { policyId } = useParams()
  const policy = useTypedSelector(selectPolicy)
  const [executePolicy, { isLoading }] = useExecutePolicyMutation()
  const [decision, setDecision] = useState<DecisionType | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement

    const formData = policy?.if_statements
      .map(({ variable }) => {
        const input = form[variable] as unknown as HTMLInputElement

        return {
          [variable]: input.value,
        }
      })
      .reduce((acc, curr) => ({ ...acc, ...curr }), {})

    if (policyId && formData) {
      try {
        const payload = await executePolicy({
          id: policyId,
          body: formData,
        }).unwrap()
        setDecision(payload)
        form.reset()
      } catch (error) {
        console.error('rejected', error)
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="bg-purple-400 hover:not(:disabled):bg-purple-400/95 h-8 rounded-md px-4 text-xs transition-[background-color] duration-75 ease-linear disabled:opacity-50"
          disabled={disabled}
        >
          Execute
        </button>
      </DialogTrigger>

      <Portal>
        <DialogBackdrop className="bg-black-900/50 fixed inset-0 z-40" />
        <DialogContainer className="fixed inset-0 z-50 flex items-center justify-center">
          <DialogContent className="relative w-[95vw] max-w-[320px] rounded-lg bg-black-400 p-5">
            {decision ? (
              <div className="flex flex-col items-center gap-3">
                {decision.decision ? (
                  <CheckCircleIcon className="text-green-400 h-8 w-8" />
                ) : (
                  <ExclamationCircleIcon className="text-red-400 h-8 w-8" />
                )}

                <h2 className="text-lg">
                  {decision.decision
                    ? 'You should go for it!'
                    : `It's not recommended!`}
                </h2>

                <button
                  type="submit"
                  onClick={() => setDecision(null)}
                  className="bg-purple-400 hover:bg-purple-400/95 h-8 rounded-md px-4 text-xs transition-[background-color] duration-75 ease-linear"
                >
                  Try again
                </button>
              </div>
            ) : (
              <div>
                <DialogTitle className="mb-5 font-medium">
                  Execute policy
                </DialogTitle>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 text-sm"
                >
                  {policy?.if_statements.map(({ id, variable }) => (
                    <div key={id} className="flex flex-col gap-1">
                      <label
                        htmlFor={`${variable}-${id}`}
                        className="capitalize"
                      >
                        {variable}
                      </label>

                      <input
                        id={`${variable}-${id}`}
                        name={variable}
                        type="number"
                        disabled={isLoading}
                        placeholder={`Type "${variable}"`}
                        className="h-9 w-full rounded-md border border-black-100 bg-[inherit] px-3 text-white outline-none placeholder:text-white/70 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-purple-400 hover:bg-purple-400/95 h-8 rounded-md px-4 text-xs transition-[background-color] duration-75 ease-linear disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? 'Loading...' : 'Send'}
                  </button>
                </form>
              </div>
            )}

            <DialogCloseTrigger asChild>
              <button className="absolute right-3 top-3">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </DialogCloseTrigger>
          </DialogContent>
        </DialogContainer>
      </Portal>
    </Dialog>
  )
}
