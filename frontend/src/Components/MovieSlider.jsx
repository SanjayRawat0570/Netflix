import {useContentstore} from '../store/Contentstore';
const  MovieSlider =({category})=> {
    const {contentType} = useContentstore();
    const [content, setCount] = useState([]);
    const [showArrows, setShowArrows] = useState(false);
    const formattedCategoryName  = category.replaceAll("-", " ") [0].toUpperCase() + category.replaceAll("-", " ").slice(1);
    const formattedType = contentType === 'movie' ? 'Movies' : 'TV Shows';
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const getContent = async () => {
            const res = await axios.get(`/api/v1/${contentType}/${category}`);
            setMovies(res.data.movies);
        }
      getContent()
    }, [ contentType, category]);
  return (
    <div className= "bg-black text-white relative px-5 md:px-20">
        <h2 className = 'mb-4 text-2xl font-bold'>
            {formattedCategoryName} {formattedContentType}
        </h2>
        <div className= 'flex space-x-4 overflow-x-scroll'>
            {contentType.map((item)=>(
                <Link to={'/watch/${item.id}'} className = 'min-w-[250px] relative group' key= { item.id}>
                    <div className = 'rounded-lg overflow-hidden'>
                        <img 
                        src= {SMALL-IMG_BASE_URL + item.backdrop_path}
                        alt = 'Movie image'
                        className = 'transition-transform duration-300 ease-in-out group-hover: scale-125'/>
                    </div>
                    <p className = 'mt-2 text-center'>
                        {item.title || item.name}
                        </p>
                        
    </Link>
    
    ))}
    </div>
    </div>
    );
};

export default MovieSlider