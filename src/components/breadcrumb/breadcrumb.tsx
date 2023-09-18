import { useLocation, useMatches } from 'react-router-dom'

type CrumbType = { crumb: () => JSX.Element }

export const Breadcrumb = () => {
  const matches = useMatches()
  const location = useLocation()

  const crumbs = matches
    .filter((match) => {
      const handle = match.handle as CrumbType

      return match.pathname === location.pathname && Boolean(handle?.crumb)
    })
    .map((match) => {
      const handle = match.handle as CrumbType

      return handle.crumb()
    })

  return <div>{crumbs[0]}</div>
}
