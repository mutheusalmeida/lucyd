import type { ShapeType } from 'policies'
import { twMerge } from 'tailwind-merge'

type ConnectorProps = {
  type: ShapeType
  dir: 'bottom' | 'right'
  className?: string
  connected: boolean
  itemId: number
  defaultValue: 'No' | 'Yes'
}

export const Connector = ({
  className,
  type,
  dir,
  connected,
  itemId,
  defaultValue,
}: ConnectorProps) => {
  return (
    <div
      data-js="node-connector"
      data-node-type={type}
      data-node-connected={connected}
      data-node-id={itemId}
      data-node-dir={dir}
      className={twMerge(
        'relative bg-black-100',
        className,
        dir === 'bottom' ? 'h-11 w-[1px]' : 'h-[1px] w-11'
      )}
    >
      <div
        className={twMerge(
          'absolute text-xs',
          dir === 'bottom'
            ? 'right-[-4px] top-0 translate-x-[100%] translate-y-[100%]'
            : 'right-0 top-[-2px] translate-x-[-100%] translate-y-[-100%]'
        )}
      >
        {defaultValue}
      </div>

      <div
        className={twMerge(
          'absolute h-2 w-2 rotate-[45deg] border border-black-100 bg-black-100',
          dir === 'bottom'
            ? 'bottom-0 left-[50%] translate-x-[-50%] translate-y-full'
            : 'right-0 top-[50%] translate-x-full translate-y-[-50%]'
        )}
      />
    </div>
  )
}
