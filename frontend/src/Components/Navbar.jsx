import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useContentStore} from "../store/contentStore";
const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const { user, logout } = useAuthStore();
    const toggleMobile = () => setIsMobile(!isMobile);
    const { setContentType} = useContentStore();
    
    return (
        <header className= 'max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4'>
            < div className = 'flex items-center gap-10 z-50'>
            <Link to = '/'>
            <img src= '/logo.png' alt= 'Netflix Logo' className= 'w-32 sm:w-40'/>
            </Link>
            <div className= 'hidden sm:flex gap-2 items-center'>
                <Link to = '/' className= 'hover:underline' onClick={()=>setContentType('movies')}>Movies</Link>
                <Link to = '/' className= 'hover:underline' onClick={()=>setContentType('tv')}>Tv Shows </Link>
                <Link to='/history' className= 'hover:underline'> Search History</Link>

                </div>
                </div>
                <div className= 'flex gap-2 items-center z-50'>
                    <Link to={'/search'}>
                    <search className = 'size-6 cursor-pointer'/>
                    </Link>
                    <img src={user.image} alt = 'Avtar' className = 'h-8 rounded cursor-pointer' />
                    <logOut className = 'size-6 cursor-pointer' onClick={logout}/>
                    <div className= 'sm:hidden'>
                        <menu className = 'size-6 cursor-pointer' onClick={toggleMobile}/>
                        </div>
                    </div>
                    {isMobile && (
                        <div className = 'w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
                            <Link to={"/"} className = 'block p hover:underline p-2' onclick= {toggleMobile}>Tv shows</Link>
                            <Link to = {'/'} className= 'block hover: underline p-2' onClick={toggleMobile}>
                            Tv shows</Link>
                            <Link to= {"/history"} className = 'block hover:underline p-2' onClick= {toggleMobile}>
                            Search History</Link>
                        </div>

                    )}
                    </header>


    )
}
export default Navbar;
