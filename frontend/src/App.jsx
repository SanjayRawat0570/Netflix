
import { Route , Routes } from 'react-router-dom';
import Homepage from './Pages/home/Home';
import LoginPage from './Pages/Login';
import Signup from './Pages/Signup';
import WatchPage from './Pages/WatchPage';
import Footer from './Components/Footer';
import { Toaster } from 'react-hot-toast';
import {Loader} from "lucide-react";
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import SearchPage from './Pages/SearchPage';
import SearchHistoryPage from './Pages/SearchHistoryPage';
import { useAuthStore } from './Store/authUser';
import NotFoundPage from './Pages/404';


function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
   console.log("auth useris here", user);
   useEffect(() => {
    authCheck();
   }, [authCheck]);
   if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}
  return  ( <>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path = "/login" element={!user ? <LoginPage /> : <Navigate to ="/" />} />

      <Route path = "/signup" element={!user ?<Signup /> :<Navigate to= {"/"} />  } />
      <Route path ='/watch/:id' elementlement = {user ? <WatchPage /> : <Navigate to={"/login"}/>}/>

      <Route path ='/search/:id' elementlement = {user ? <SearchPage /> : <Navigate to={"/login"}/>}/> 
      <Route path = '/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
     <Route path='/*' element= {<NotFoundPage/>} />
      </Routes>
      <Footer/>
       <Toaster />
        </>
  )
}

export default App
