import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { AppToastProvider } from './components/toast'
import { routes } from './routes'
import { store } from './services/store'

export const App = () => {
  return (
    <AppToastProvider>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </AppToastProvider>
  )
}
