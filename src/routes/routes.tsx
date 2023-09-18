import { PolicyCrumb } from '@/components/policy-crumb'
import { MainLayout } from '@/layouts/main-layout'
import { Policies } from '@/screens/policies'
import { PolicyItem } from '@/screens/policy-item'
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Navigate,
  Route,
} from 'react-router-dom'

export const routes = createBrowserRouter(
  createRoutesFromChildren(
    <Route element={<MainLayout />}>
      <Route
        path="policies"
        element={<Policies />}
        handle={{
          crumb: () => <>Policies</>,
        }}
      />
      <Route
        path="policies/:policyId"
        element={<PolicyItem />}
        handle={{
          crumb: () => <PolicyCrumb />,
        }}
      />
      <Route path="/" element={<Navigate to="policies" replace />} />
    </Route>
  )
)
