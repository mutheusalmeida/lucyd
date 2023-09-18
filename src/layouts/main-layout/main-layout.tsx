import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className="grid min-h-[100svh] grid-cols-[256px,_1fr] grid-rows-[auto_1fr]">
      <Sidebar />

      <Header />

      <main className="col-[2_/_3] row-[2]">
        <Outlet />
      </main>
    </div>
  )
}
