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

export const DecisionDialog = () => {
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
          <DialogContent className="rounded-lg bg-black-400 p-5">
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
            <DialogCloseTrigger>Close</DialogCloseTrigger>
          </DialogContent>
        </DialogContainer>
      </Portal>
    </Dialog>
  )
}
