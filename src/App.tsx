import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import PortfolioDetailPage from './pages/PortfolioDetailPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminGalleryUploadPage from './pages/AdminGalleryUploadPage'
import ClientGalleryPage from './pages/ClientGalleryPage'

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
  },
  {
    path: '/admin',
    element: <AdminLoginPage />
  },
  {
    path: '/admin/galleries',
    element: <AdminDashboardPage />
  },
  {
    path: '/admin/galleries/:slug',
    element: <AdminGalleryUploadPage />
  },
  {
    path: '/gallery/:slug',
    element: <ClientGalleryPage />
  }
])

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}

export default App
