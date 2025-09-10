import { useEffect } from 'react';
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/clientside/Home';

function App() {
  const location = useLocation();
  useEffect(() => {
        window.scrollTo(0, 0)
  }, [location])
  
  return (
    <Routes>
               <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default App
