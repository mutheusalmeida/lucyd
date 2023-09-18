import {
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  Portal,
} from '@ark-ui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { DeletePolicyDialog } from '../delete-policy-dialog'

type PolicyListItemProps = {
  id: number
  name: string
}

export const PolicyListItem = ({ id, name }: PolicyListItemProps) => {
  return (
    <div className="relative">
      <Link to={`/policies/${id}`}>
        <div className="aspect-square h-full w-full rounded border border-black-100 p-5 transition-[background-color] duration-75 ease-linear hover:bg-black-50">
          <div className="flex justify-between">
            <h2>{name}</h2>
          </div>
        </div>
      </Link>

      <div className="absolute right-2 top-5">
        <Menu>
          <MenuTrigger asChild>
            <button>
              <EllipsisVerticalIcon className="h-5 w-5" />
            </button>
          </MenuTrigger>

          <Portal>
            <MenuPositioner>
              <MenuContent className="shadow-black-300 bg-black-300 rounded-md border border-black-50 px-3 py-1 text-xs text-white/75 shadow-md outline-none">
                <MenuItem id="delete" asChild>
                  <DeletePolicyDialog id={id} />
                </MenuItem>

                <MenuSeparator className="border-black-50" />

                <MenuItem id="duplicate" asChild>
                  <button className="py-2">Duplicate</button>
                </MenuItem>

                <MenuSeparator className="border-black-50" />

                <MenuItem id="new-tab" asChild>
                  <button className="py-2">Open in new tab</button>
                </MenuItem>
              </MenuContent>
            </MenuPositioner>
          </Portal>
        </Menu>
      </div>
    </div>
  )
}
