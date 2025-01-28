import express from 'express';
import {
    getTrendingTv,
    getTvTrailers,
    getTvDetails,
    getSimilarTv,
    getTvByCategory,
} from '../Controller/tv.controller.js';

const router = express.Router();

// Specific routes first
router.get('/trending', getTrendingTv);
router.get('/:id/trailers', getTvTrailers);
router.get('/:id/details', getTvDetails);
router.get('/:id/similar', getSimilarTv);

// Generic route for categories
router.get('/category/:category', getTvByCategory);

export default router;
