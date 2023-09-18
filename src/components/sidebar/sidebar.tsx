import { ReactComponent as Logo } from '@/assets/lucyd-logo.svg'
import { Cog6ToothIcon, HomeIcon, ScaleIcon } from '@heroicons/react/24/outline'
import { Link, NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

export const Sidebar = () => {
  return (
    <aside className="border-black-100 row-span-full h-full border-r py-3">
      <nav className="h-full text-sm">
        <ul className="flex h-full flex-col gap-1">
          <li className="p-2 px-5">
            <Link to="." relative="path" className="flex items-center gap-2">
              <Logo className="h-4 w-4" />

              <span className="font-medium">Lucyd</span>
            </Link>
          </li>

          <li className="h-2" />

          <li className="flex">
            <NavLink
              to="."
              className={({ isActive }) =>
                twMerge(
                  'hover:bg-black-50 flex w-full items-center gap-2 p-2 px-5 transition-[background-color]  duration-75 ease-linear',
                  isActive ? 'bg-black-50 font-medium' : ''
                )
              }
            >
              <HomeIcon className="h-5 w-5" />

              <span>Home</span>
            </NavLink>
          </li>

          <li className="flex">
            <NavLink
              to="policies"
              className={({ isActive }) =>
                twMerge(
                  'hover:bg-black-50 flex w-full items-center gap-2 p-2 px-5 transition-[background-color]  duration-75 ease-linear',
                  isActive ? 'bg-black-50 font-medium' : ''
                )
              }
            >
              <ScaleIcon className="h-5 w-5" />

              <span>Policies</span>
            </NavLink>
          </li>

          <li className="mt-auto flex">
            <NavLink
              to="."
              className={({ isActive }) =>
                twMerge(
                  'hover:bg-black-50 flex w-full items-center gap-2 p-2 px-5  transition-[background-color] duration-75 ease-linear',
                  isActive ? 'bg-black-50 font-medium' : ''
                )
              }
            >
              <Cog6ToothIcon className="h-5 w-5" />

              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
