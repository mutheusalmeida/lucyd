import {
  useAddIfStatementMutation,
  useEditIfStatementMutation,
} from '@/services/api'
import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import type { ShapeType } from 'policies'
import { ReactNode, useRef } from 'react'
import { useParams } from 'react-router-dom'

type DraggableProps = {
  type: ShapeType
  children: ReactNode
  value?: string
}

export const Draggable = ({ children, type, value }: DraggableProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const connectorTopRef = useRef<HTMLDivElement>(null)
  const connectorLeftRef = useRef<HTMLDivElement>(null)
  const { policyId } = useParams<{ policyId: string }>()
  const [addIfStatement] = useAddIfStatementMutation()
  const [aditIfStatement] = useEditIfStatementMutation()

  const [{ x, y, cursor }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    cursor: 'grab',
  }))

  useDrag(
    async ({ down, movement: [mx, my], dragging }) => {
      api.start({
        x: down ? mx : 0,
        y: down ? my : 0,
        cursor: down ? 'grabbing' : 'grab',
        immediate: down,
      })

      const connectorTop = connectorTopRef.current?.getBoundingClientRect()
      const connectorLeft = connectorLeftRef.current?.getBoundingClientRect()

      const nodes = Array.from(
        document.querySelectorAll<HTMLDivElement>('[data-js="node-connector"]')
      )

      if (connectorTop && connectorLeft) {
        const draggableAreaEle = nodes.find((item) => {
          const draggableArea = item.children[0].getBoundingClientRect()

          return (
            (connectorTop?.left > draggableArea?.left - connectorTop?.width &&
              connectorTop?.left + connectorTop?.width <
                draggableArea?.left +
                  (draggableArea?.width + connectorTop?.width) &&
              connectorTop?.top > draggableArea?.top - connectorTop?.height &&
              connectorTop?.top + connectorTop?.height <
                draggableArea?.top +
                  (draggableArea?.height + connectorTop?.height)) ||
            (connectorLeft?.left > draggableArea?.left - connectorLeft?.width &&
              connectorLeft?.left + connectorLeft?.width <
                draggableArea?.left +
                  (draggableArea?.width + connectorLeft?.width) &&
              connectorLeft?.top > draggableArea?.top - connectorLeft?.height &&
              connectorLeft?.top + connectorLeft?.height <
                draggableArea?.top +
                  (draggableArea?.height + connectorLeft?.height))
          )
        })

        if (
          draggableAreaEle &&
          draggableAreaEle.dataset.nodeConnected === 'false' &&
          !dragging &&
          policyId
        ) {
          if (
            type === 'decision' &&
            draggableAreaEle.dataset.nodeType !== 'end'
          ) {
            await addIfStatement({
              id: policyId,
              body: {
                value: '0',
                variable: 'variable',
                comparison_operator: 'GT',
              },
            })
          }

          if (type === 'end') {
            const { nodeDir } = draggableAreaEle.dataset

            await aditIfStatement({
              id: policyId,
              body: {
                id: Number(draggableAreaEle.dataset.nodeId!),
                [nodeDir === 'bottom' ? 'then_block' : 'else_block']: value,
              },
            })
          }
        }
      }
    },
    {
      target: ref,
      preventScroll: true,
      preventScrollAxis: 'x',
      filterTaps: true,
      pointer: {
        touch: true,
      },
    }
  )

  return (
    <animated.div
      ref={ref}
      className="relative z-50 touch-none"
      style={{ x, y, cursor }}
    >
      <div
        ref={connectorTopRef}
        className="absolute left-[50%] top-[1px] -z-10 h-2 w-2 translate-x-[-50%] rotate-[45deg] border border-black-100 bg-black-100"
      />

      <div
        ref={connectorLeftRef}
        className="absolute left-[1px] top-[50%] -z-10 h-2 w-2 translate-y-[-50%] rotate-[45deg] border border-black-100 bg-black-100"
      />

      {children}
    </animated.div>
  )
}
