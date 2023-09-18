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
import { XMarkIcon } from '@heroicons/react/24/solid'

export const DecisionDialog = () => {
  const policy = useTypedSelector(selectPolicy)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-purple-400 hover:bg-purple-400/95 h-8 rounded-md px-4 text-xs transition-[background-color] duration-75 ease-linear">
          Execute
        </button>
      </DialogTrigger>

      <Portal>
        <DialogBackdrop className="bg-black-900/50 fixed inset-0 z-40" />
        <DialogContainer className="fixed inset-0 z-50 flex items-center justify-center">
          <DialogContent className="relative w-[95vw] max-w-[320px] rounded-lg bg-black-400 p-5">
            <DialogTitle className="mb-5 font-medium">
              Execute policy
            </DialogTitle>

            <form className="mb-5 flex flex-col gap-4 text-sm">
              {policy?.if_statements.map(({ id, variable }) => (
                <fieldset key={id} className="flex flex-col gap-1">
                  <label htmlFor={`${variable}-${id}`} className="capitalize">
                    {variable}
                  </label>

                  <input
                    id={`${variable}-${id}`}
                    name={variable}
                    type="number"
                    placeholder={`Type "${variable}"`}
                    className="h-9 w-full rounded-md border border-black-100 bg-[inherit] px-3 text-white outline-none placeholder:text-white/70"
                  />
                </fieldset>
              ))}
            </form>

            <DialogCloseTrigger asChild>
              <button className="absolute right-3 top-3">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </DialogCloseTrigger>

            <button className="bg-purple-400 hover:bg-purple-400/95 h-8 rounded-md px-4 text-xs transition-[background-color] duration-75 ease-linear">
              Send
            </button>
          </DialogContent>
        </DialogContainer>
      </Portal>
    </Dialog>
  )
}
