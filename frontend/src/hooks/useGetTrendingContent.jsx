import { usestate , useEffect } from 'react';
import axios from 'axios';
import { useContentStore } from '../Store/content';
const useGetTrendingContent = () => {

    const [trendingContent, setTrendingContent] = usestate(null);
     const { contentType } = useContentStore();
    useEffect(()=> {
        const GetTrendingContent = async () => {
            const res =await axios.get('/api/v1/${contentType}/trending')
            setTrendingContent(res.data.content);

    };
    GetTrendingContent();
}, [contentType, setTrendingContent]);
return {trendingContent};
}
export default useGetTrendingContent;