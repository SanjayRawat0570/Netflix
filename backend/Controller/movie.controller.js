import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req, res) {
    try{
        const data = await fetchFromTMDB(
            'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc');
            const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
            res.json({
                success: true,
                content: randomMovie,
            });

        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error here' });
    }
}
export async function getMovieTrailers(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDBfetch('https://api.themoviedb.org/3/tv/series_id/season/season_number/videos?language=en-US');
        res.json({
            success: true,
            trailers: data.results,
        });
    } catch (error) {
        if(error.message .includes("404")){
            return res.status(404).send(null)
        }
        res.status(500).json({ success: false, message: 'Internal server error here' });
    }
}

export async function getMovieDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/tv/series_id/season/season_number/episode/episode_number?append_to_response=123&language=en-US')
        res.status(200).json({
            success: true,
            details: data,
        });
    }
    catch(error){
        if(error.message.includes("404")){
            return res.status(404).send(null)
        }
        res.status(500).json({ success: false, message: 'Internal server error here' });
    }
}

export async function getsimilarMovies(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/tv/12345/similar?language=en-US&page=1')
        res.json({
            success: true,
            similarMovies: data.results,
        });
    }
    catch(error){
        if(error.message.includes("404")){
            return res.status(404).send(null)
        }
        res.status(500).json({ success: false, message: 'Internal server error here' });
    }
}

export async function getMoviesByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/tv/popular?language=sanjay&page=1');
        res.status(200).json({
            success: true,
            content: data.results,
        });
    }
    catch(error){
        
        res.status(500).json({ success: false, message: 'Internal server error here' });
    }
}



