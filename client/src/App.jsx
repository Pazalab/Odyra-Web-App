import { useEffect } from 'react';
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/clientside/Home';
import NewBooking from './pages/clientside/NewBooking';
import Login from './pages/clientside/booking/Login';
import AdminLogin from './pages/clientside/booking/AdminLogin';
import AdminDashboard from './pages/serverside/AdminDashboard';
import BookingSuccessful from './pages/clientside/booking/BookingSuccessful';
import Signup from './pages/clientside/booking/Signup';
import Stage from './pages/clientside/booking/Stage';
import CustomerAccount from './pages/clientside/customer/CustomerAccount';
import PersonalInfo from './pages/clientside/customer/PersonalInfo';
import CustomerRoutes from './utils/CustomerRoutes';
import ProtectedRoutes from './utils/ProtectedRoutes';
import AdminBookings from './pages/serverside/AdminBookings';
import SingleAdminBooking from './pages/serverside/SingleAdminBooking';
import InitiatePayment from './pages/clientside/booking/InitiatePayment';
import BookingConfirmation from './pages/clientside/booking/BookingConfirmation';

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
               <Route path="/auth/signup" element={<Signup />} />
               <Route path='/auth/stage' element={<Stage />} />
               <Route path='/booking-confirmation' element={<BookingSuccessful />} />
               <Route path="/payment-confirmation" element={<BookingConfirmation />} />
               <Route path='/booking/initiate-payment/:id' element={<InitiatePayment />} />
               
               <Route element={<CustomerRoutes />}>
                         <Route path='/customer/account' element={<CustomerAccount />} />
                        <Route path='/customer/personal-information' element={<PersonalInfo />} />
               </Route>

               { /* Protected admin routes */}
               <Route element={<ProtectedRoutes />}>
                        <Route path='/admin/:id/dashboard' element={<AdminDashboard />} />
                        <Route path='/admin/:id/bookings' element={<AdminBookings />} />
                        <Route path='/admin/:id/booking/:book_id' element={<SingleAdminBooking />} />
               </Route>
    </Routes>
  )
}

export default App
