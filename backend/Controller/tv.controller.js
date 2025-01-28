import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTv(req, res) {
    try {
        const data = await fetchFromTMDB(
            'https://api.themoviedb.org/3/trending/tv/day?language=en-US'
        );
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({
            success: true,
            movie: randomMovie,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export async function getTvTrailers(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.json({
            success: true,
            trailers: data.results,
        });
    } catch (error) {
        if (error.response?.status === 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export async function getTvDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({
            success: true,
            details: data,
        });
    } catch (error) {
        if (error.response?.status === 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export async function getSimilarTv(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.json({
            success: true,
            similarMovies: data.results,
        });
    } catch (error) {
        if (error.response?.status === 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export async function getTvByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/discover/tv?language=en-US&with_genres=${category}`
        );
        res.json({
            success: true,
            movies: data.results,
        });
    } catch (error) {
        if (error.response?.status === 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
