import { useDeletePolicyMutation } from '@/services/api'
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Portal,
} from '@ark-ui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

type DeletePolicyDialogProps = {
  id: number
}

export const DeletePolicyDialog = ({ id }: DeletePolicyDialogProps) => {
  const [deletePolicy, { isLoading }] = useDeletePolicyMutation()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async () => {
    try {
      await deletePolicy({ id }).unwrap()
      setIsOpen(false)
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
        <button className="w-full py-2 text-start">Delete</button>
      </DialogTrigger>

      <Portal>
        <DialogBackdrop className="bg-black-900/50 fixed inset-0 z-40" />
        <DialogContainer className="fixed inset-0 z-50 flex items-center justify-center">
          <DialogContent className="relative w-[95vw] max-w-max rounded-lg bg-black-400 p-5">
            <div>
              <DialogTitle className="mb-5 flex items-center gap-1 font-medium">
                Delete policy
              </DialogTitle>

              <DialogDescription className="mb-4 text-white/75">
                Are you sure you want to delete this policy?
              </DialogDescription>

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-red-400 hover:not(:disabled):bg-red-400/95 h-8 rounded-md px-4 text-xs font-medium transition-[background-color] duration-75 ease-linear disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Confirm'}
                </button>

                <DialogCloseTrigger asChild>
                  <button
                    disabled={isLoading}
                    className="h-8 rounded-md bg-[transparent] px-4 text-xs transition-opacity duration-75 ease-linear hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </DialogCloseTrigger>
              </div>
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
