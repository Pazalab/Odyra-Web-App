import { useEffect } from 'react';
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/clientside/Home';
import NewBooking from './pages/clientside/NewBooking';
import Login from './pages/clientside/booking/Login';
import AdminLogin from './pages/clientside/booking/AdminLogin';
import AdminDashboard from './pages/serverside/AdminDashboard';
//import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {
  const location = useLocation();
  useEffect(() => {
        window.scrollTo(0, 0)
  }, [location])
  
  return (
    <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/new-booking' element={<NewBooking />} />
               <Route path='/auth/login' element={<Login />} />
               <Route path='/admin/auth/login' element={<AdminLogin />} />

               { /* Protected routes */}
              <Route path='/admin/:id/dashboard' element={<AdminDashboard />} />
    </Routes>
  )
}

export default App
