import { Toast, type ToastProviderProps } from '@ark-ui/react'

export const AppToastProvider = (props: ToastProviderProps) => {
  const { children, ...rest } = props

  return (
    <Toast.Provider {...rest}>
      <Toast.Placements>
        {(placements) =>
          placements.map((placement) => (
            <Toast.Group key={placement} placement={placement}>
              {(toasts) =>
                toasts.map((toast) => (
                  <Toast.Root key={toast.id} toast={toast}>
                    <Toast.Title />

                    <Toast.Description />

                    <Toast.CloseTrigger>close</Toast.CloseTrigger>
                  </Toast.Root>
                ))
              }
            </Toast.Group>
          ))
        }
      </Toast.Placements>
      {children}
    </Toast.Provider>
  )
}
