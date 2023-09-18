import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { store } from './services/store'

export const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  )
}
