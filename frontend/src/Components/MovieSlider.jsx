import {useContentstore} from '../store/Contentstore';
const  MovieSlider =({category})=> {
    const {contentType} = useContentstore();
    const [content, setCount] = useState([]);
    const [showArrows, setShowArrows] = useState(false);
    const sliderRef = useRef(null);
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

    const scrollleft = () => {
        if(sliderRef.current.scrollBy){
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' });
        }    
        };
    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: sliderRef. current.offsetWidth,behaviour: 'smooth' });
        };    
        
    


  return (
    <div className= "bg-black text-white relative px-5 md:px-20">
        <h2 className = 'mb-4 text-2xl font-bold'>
            {formattedCategoryName} {formattedContentType}
        </h2>
        <div className= 'flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
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
    { showArrows && (   
        <>
        <button className = 'absolutr top-1/2 -translate-y-1/2 left md:left-40 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover: bg-opacity-75 text-white z-10'
        onClick= {scrollRight} 
        >
            <chevronleft size={24}/>

        </button>
        <button className = 'absolutr top-1/2 -translate-y-1/2 right md:right-40 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover: bg-opacity-75 text-white z-10'
        >
            <chevronleft size={24}/>
        </button>
        </>
        )}
    </div>
    );
};

export default MovieSlider