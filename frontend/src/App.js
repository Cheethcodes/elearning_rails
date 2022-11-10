import { Route, Routes } from 'react-router-dom'
import { AuthRouteList } from './constants/AuthRouteList'
import { ProtectedRouteList } from './constants/ProtectedRouteList'
import { AuthProvider } from './services/AuthProvider'
import { AuthRoute } from './routes/AuthRoute'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { ProtectedLayout } from './components/layouts/ProtectedLayout'
import { ToastContainer } from 'react-toastify'
import { AdminRouteList } from './constants/AdminRouteList'
import { AdminRoute } from './routes/AdminRoute'

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {
          AuthRouteList.map((item, index) => {
            return (
              <Route key={index} path={item.url} element={
                <AuthRoute>
                  <item.page />
                </AuthRoute>
              } />
            )
          })
        }
        {
          ProtectedRouteList.map((item, index) => {
            return (
              <Route key={index} path={item.url} element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <item.page />
                  </ProtectedLayout>
                </ProtectedRoute>
              } />
            )
          })
        }
        {
          AdminRouteList.map((item, index) => {
            return (
              <Route key={index} path={item.url} element={
                <AdminRoute>
                  <ProtectedLayout>
                    <item.page />
                  </ProtectedLayout>
                </AdminRoute>
              } />
            )
          })
        }
      </Routes>
      <ToastContainer />
    </AuthProvider>
  )
}
