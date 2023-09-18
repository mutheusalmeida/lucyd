import { MainLayout } from '@/layouts/main-layout'
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
        element={<div>List policies</div>}
        handle={{
          crumb: () => <>Policies</>,
        }}
      />
      <Route
        path="policies/:policyId"
        element={<div>policy item</div>}
        handle={{
          crumb: () => <>Policy item</>,
        }}
      />
      <Route path="/" element={<Navigate to="policies" replace />} />
    </Route>
  )
)
