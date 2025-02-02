import { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom'
import { useContentStore } from '../store/contentStore';
import axios from 'axios';

const  WatchPage=()=> {
    const {id} = useParams();
   const [trailers, setTrailer] = useState([]);
   const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
   const [loading, setLoading] = useState(true);
   const [ content, setcontent] = useState({});
   const { contentType } = useContentStore();
   const [similarContent, setSimilarContent] = useState([]);
    useEffect(()=>{
    const getTrailers = async()=> {
        try{
        const res = await axios.get('/api/v1/${contentType}/${id}/trailers');
        setTrailer(res.data.trailers);
        } catch (error){
            if(error.message.includes("404")){
                setTrailers([]);
                }
            }
        };
        getTrailers();
    
    },[contentType, id]); 
    useEffect(()=> {
        const getSimilarContent = async () => {
            try{
                const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
                setSimilarContent(res.data.similar);
            } catch (error) {
                if(error.message.includes("404")){
                    setSimilarContent([]);
                }
            }
    };
    getSimilarContent();
    }, [contentType, id]);

    useEffect(() => {
        const getContentDetails = async () => {
         try { 
            const res = await axios.get(`/api/v1/${contentType}/$(id}/details`);
        setcontent(res.data.content);
    }
    catch (error) {
        if(error.message.includes("404")){
            setcontent(null);
        }
    } finally {
        setLoading(false);
    }
 };
 getContentDetails();
},
 [contentType, id]);
   return <div className='bg-black min-h-screen text-white'>
    <div className = 'mx-auto container px-4 py-8 h-full'>
        <Navbar />

        {trailers.length > 0 && (
            <div className = 'flex justify-between items-center mb-4'>
                <button className = {
                    'bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === 0 ? "cursor-not-allowed bg-opacity-50" : ""}}
                '}
                disabled={currentTrailerIdx === 0}
                >
                <chevronLeft size={24}/>
                </button>
            
            <button className = {
                'bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === 0 ? "cursor-not-allowed opacity-50" : ""}}
            '}
            disabled={currentTrailerIdx === trailer.length-1}
            >
            <chevronRight size={24}/>
            </button>
            </div>
        )}
    </div>
   </div>
    );
};

export default WatchPage