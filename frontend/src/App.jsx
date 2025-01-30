
import { Route , Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';

function App() {
  return  (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Routes path = "/login" element={<Loginpage />} />
      <Routes path = "/signup" element={<Signuppage />} />
      </Routes>
  )
}

export default App
