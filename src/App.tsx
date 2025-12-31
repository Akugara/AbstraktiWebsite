import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import PortfolioDetailPage from './pages/PortfolioDetailPage'

const Layout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/portfolio/:slug',
        element: <PortfolioDetailPage />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
