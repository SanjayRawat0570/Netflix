import axios from 'axios'
import { useEffect, useState } from 'react'

const  SearchHistoryPage=()=> {
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const getSearchHistory = async () => {
            try {
                const res = await axios.get('/api/v1/search/history');
                setSearchHistory(res.data.content);
            }
            catch (error) {
                setSearchHistory([]);
            }
            };
            getSearchHistory();
    }, []);

    if(searchHistory.length === 0) {
        return (
            <div className = 'bg-black min-h-screen text-white'>
                <Navbar/> 
                <div 
        )

  return (
    <div>SearchHistoryPage</div>
  )
}

export default SearchHistoryPage