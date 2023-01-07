import { AuthProvider } from './context/AuthContex'
import AppNav from './navigation/AppNav'

export default function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  )
}
