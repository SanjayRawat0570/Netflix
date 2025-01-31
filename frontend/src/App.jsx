
import { Route , Routes } from 'react-router-dom';
import Homepage from './Pages/home/Home';
import LoginPage from './Pages/Login';
import Signup from './Pages/Signup';
import Footer from './Components/Footer';

function App() {
  return  ( <>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path = "/login" element={<LoginPage />} />
      <Route path = "/signup" element={<Signup />} />
      </Routes>
        
        <Footer />
        </>
  )
}

export default App
