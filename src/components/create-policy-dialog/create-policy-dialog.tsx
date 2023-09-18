import { useCreatePolicyMutation, useGetPoliciesQuery } from '@/services/api'
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
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { FormEvent, useState } from 'react'

export const CreatePolicyDialog = () => {
  const [createPolicy, { isLoading }] = useCreatePolicyMutation()
  const { refetch } = useGetPoliciesQuery()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement

    const input = form['name'] as unknown as HTMLInputElement

    try {
      await createPolicy({
        body: {
          name: input.value,
        },
      }).unwrap()
      refetch()
      setIsOpen(false)
      form.reset()
    } catch (error) {
      console.error('rejected', error)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <DialogTrigger asChild>
        <button className="flex h-full w-full items-center justify-center">
          <PlusIcon className="h-10 w-10 text-white/70" />
        </button>
      </DialogTrigger>

      <Portal>
        <DialogBackdrop className="bg-black-900/50 fixed inset-0 z-40" />
        <DialogContainer className="fixed inset-0 z-50 flex items-center justify-center">
          <DialogContent className="relative w-[95vw] max-w-[320px] rounded-lg bg-black-400 p-5">
            <div>
              <DialogTitle className="mb-5 font-medium">
                Create policy
              </DialogTitle>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-sm"
              >
                <fieldset className="flex flex-col gap-1">
                  <label htmlFor="name" className="capitalize">
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    disabled={isLoading}
                    placeholder="Type a name"
                    className="h-9 w-full rounded-md border border-black-100 bg-[inherit] px-3 text-white outline-none placeholder:text-white/70 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </fieldset>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-purple-400 hover:not(:disabled):bg-purple-400/95 h-8 rounded-md px-4 text-xs transition-[background-color] duration-75 ease-linear disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Create'}
                </button>
              </form>
            </div>

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
