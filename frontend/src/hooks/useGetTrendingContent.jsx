import { usestate , useEffect } from 'react';
import axios from 'axios';
import { useContentStore } from '../store/contentStore';
const useGetTrendingContent = () => {

    const [trendingContent, setTrendingContent] = usestate(null);

    useEffect(()=> {
        const GetTrendingContent = async () => {
            const res =await axios.get('/api/v1/${contentType}/trending')
            setTrendingContent(res.data.content);

    }
    GetTrendingContent();
}, [contentType]);
return trendingContent;
}
export default useGetTrendingContent;