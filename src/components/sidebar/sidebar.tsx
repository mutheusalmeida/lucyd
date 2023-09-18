import { ReactComponent as Logo } from '@/assets/lucyd-logo.svg'
import { Cog6ToothIcon, HomeIcon, ScaleIcon } from '@heroicons/react/24/outline'
import { Link, NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const navLinks = [
  {
    id: 1,
    path: '.',
    label: 'Home',
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    id: 2,
    path: '/policies',
    label: 'Policies',
    icon: <ScaleIcon className="h-5 w-5" />,
  },
  {
    id: 3,
    path: '.',
    label: 'Settings',
    icon: <Cog6ToothIcon className="h-5 w-5" />,
  },
]

export const Sidebar = () => {
  return (
    <aside className="row-span-full flex h-full flex-col gap-1 border-r border-black-100 py-3">
      <div className="p-2 px-5">
        <Link to="." relative="path" className="flex items-center gap-2">
          <Logo className="h-4 w-4" />

          <span className="font-medium">Lucyd</span>
        </Link>
      </div>

      <div className="h-2" />

      <nav className="h-full text-sm">
        <ul className="flex h-full flex-col gap-1">
          {navLinks.map(({ id, label, path, icon }, index) => (
            <li
              className={twMerge(
                'flex',
                navLinks.length - 1 === index ? 'mt-auto' : ''
              )}
              key={id}
            >
              <NavLink
                to={path}
                className={({ isActive }) =>
                  twMerge(
                    'flex w-full items-center gap-2 p-2 px-5 text-white/80 transition-[background-color] duration-75 ease-linear hover:bg-black-50',
                    isActive ? 'bg-black-50 font-medium text-white' : ''
                  )
                }
              >
                {icon}

                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
