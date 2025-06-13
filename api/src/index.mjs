import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import {getAllMoviesFromStudios, transferMovieRights} from '../src/helpers.mjs'
import {sony, warner, disney, movieAge} from '../constants/studio_constants.mjs'
import logger from './logger.mjs';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.method === 'POST' ? req.body : undefined
  }, 'Incoming request');

  res.on('finish', () => {
    logger.info({
      method: req.method,
      url: req.url,
      status: res.statusCode
    }, 'Request completed');
  });

  next();
});

router.get('/studios', function (req, res) {
  try {
    let disneyTemp = {...disney}
    delete disneyTemp.movies
    let warnerTemp = {...warner}
    delete warnerTemp.movies
    let sonyTemp = {...sony}
    delete sonyTemp.movies
    
    const studios = [disneyTemp, warnerTemp, sonyTemp];
    logger.info({ studios }, 'Studios fetched successfully');
    res.json(studios);
  } catch (error) {
    logger.error({ error }, 'Error fetching studios');
    res.status(500).json({ error: error.message });
  }
});

router.get('/movies', function (req, res) {
  try {
    const movies = getAllMoviesFromStudios([disney, warner, sony]);
    logger.info({ count: movies.length }, 'Movies fetched successfully');
    res.json(movies);
  } catch (error) {
    logger.error({ error }, 'Error fetching movies');
    res.status(500).json({ error: error.message });
  }
});

router.get('/movieAge', function (req, res) {
  try {
    logger.info({ count: movieAge.length }, 'Movie ages fetched successfully');
    res.json(movieAge);
  } catch (error) {
    logger.error({ error }, 'Error fetching movie ages');
    res.status(500).json({ error: error.message });
  }
});

router.post('/transfers', function (req, res) {
  try {
    const { movieId, fromStudioId, toStudioId } = req.body;

    // Validate required fields
    if (!movieId || !fromStudioId || !toStudioId) {
      const error = 'Missing required fields: movieId, fromStudioId, or toStudioId';
      logger.warn({ body: req.body }, error);
      return res.status(400).json({ error });
    }

    // Validate studio IDs are different
    if (fromStudioId === toStudioId) {
      const error = 'Source and target studios must be different';
      logger.warn({ fromStudioId, toStudioId }, error);
      return res.status(400).json({ error });
    }

    const result = transferMovieRights(
      movieId,
      fromStudioId,
      toStudioId,
      [disney, warner, sony]
    );

    logger.info({
      movieId,
      fromStudioId,
      toStudioId,
      success: true
    }, 'Movie rights transferred successfully');

    res.json(result);
  } catch (error) {
    logger.error({
      error: error.message,
      body: req.body
    }, 'Error transferring movie rights');
    res.status(400).json({ error: error.message });
  }
});

// Mount the router with /api prefix
app.use('/api', router);

app.listen(3000, () => {
  logger.info('Server started on port 3000');
});
