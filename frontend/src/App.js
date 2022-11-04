import { Route, Routes } from 'react-router-dom'
import { RouteList } from './constants/RouteList'
import { AuthProvider } from './services/AuthProvider'
import { Dashboard } from './pages/Dashboard'
import { AuthRoute } from './routes/AuthRoute'

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {
          RouteList.map((item, index) => {
            return (
              <Route key={index} path={item.url} element={
                <AuthRoute>
                  <item.page />
                </AuthRoute>
              } />
            )
          })
        }
      </Routes>
    </AuthProvider>
  )
}
