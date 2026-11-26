import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import PortfolioDetailPage from './pages/PortfolioDetailPage'
import ServicePage from './pages/ServicePage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminGalleryUploadPage from './pages/AdminGalleryUploadPage'
import ClientGalleryPage from './pages/ClientGalleryPage'
import { LanguageProvider, type Lang } from './i18n/LanguageContext'

const Layout = ({ lang }: { lang: Lang }) => {
  return (
    <LanguageProvider lang={lang}>
      <Navigation />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </LanguageProvider>
  )
}

const publicChildren = [
  { index: true, element: <HomePage /> },
  { path: 'portfolio/:slug', element: <PortfolioDetailPage /> },
  { path: 'services/:slug', element: <ServicePage /> },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout lang="en" />,
    children: publicChildren
  },
  {
    path: '/fi',
    element: <Layout lang="fi" />,
    children: publicChildren
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
