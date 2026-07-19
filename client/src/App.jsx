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
import AdminSettings from './pages/serverside/AdminSettings';
import AuthStage from './pages/clientside/AuthStage';
import Services from './pages/clientside/Services';
import About from './pages/clientside/About';
import Contact from './pages/clientside/Contact';
import SingleService from './pages/clientside/SingleService';
import AdminTransactions from './pages/serverside/AdminTransactions';

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
               <Route path="/admin/auth/stage" element={<AuthStage />} />
               <Route path="/auth/signup" element={<Signup />} />
               <Route path='/auth/stage' element={<Stage />} />
               <Route path='/booking-confirmation' element={<BookingSuccessful />} />
               <Route path="/payment-confirmation" element={<BookingConfirmation />} />
               <Route path='/booking/initiate-payment/:id' element={<InitiatePayment />} />
               <Route path="/services" element={<Services />} />
               <Route path="/service/:name" element={<SingleService />} />
               <Route path="/about" element={<About />} />
               <Route path="/contact" element={<Contact />} />
               
               <Route element={<CustomerRoutes />}>
                         <Route path='/customer/account' element={<CustomerAccount />} />
                        <Route path='/customer/personal-information' element={<PersonalInfo />} />
               </Route>

               { /* Protected admin routes */}
               <Route element={<ProtectedRoutes />}>
                        <Route path='/admin/:id/dashboard' element={<AdminDashboard />} />
                        <Route path='/admin/:id/bookings' element={<AdminBookings />} />
                        <Route path='/admin/:id/booking/:book_id' element={<SingleAdminBooking />} />
                        <Route path="/admin/:id/settings" element={<AdminSettings />} />
                        <Route path="/admin/:id/transactions" element={<AdminTransactions />} />
               </Route>
    </Routes>
  )
}

export default App
