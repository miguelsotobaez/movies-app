import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getAllMoviesFromStudios, transferMovieRights } from '../helpers.mjs';
import { sony, warner, disney, movieAge } from '../../constants/studio_constants.mjs';
import logger from '../logger.mjs';

export function createTestApp() {
  const app = express();
  const router = express.Router();

  app.use(cors());
  app.use(bodyParser.json());

  // Simplified logging for tests
  app.use((req, res, next) => {
    logger.level('fatal'); // Suppress logs during tests
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
      res.json(studios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/movies', function (req, res) {
    try {
      const movies = getAllMoviesFromStudios([disney, warner, sony]);
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/movieAge', function (req, res) {
    try {
      res.json(movieAge);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/transfers', function (req, res) {
    try {
      const { movieId, fromStudioId, toStudioId } = req.body;

      if (!movieId || !fromStudioId || !toStudioId) {
        return res.status(400).json({ 
          error: 'Missing required fields: movieId, fromStudioId, or toStudioId' 
        });
      }

      if (fromStudioId === toStudioId) {
        return res.status(400).json({ 
          error: 'Source and target studios must be different' 
        });
      }

      const result = transferMovieRights(
        movieId,
        fromStudioId,
        toStudioId,
        [disney, warner, sony]
      );

      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.use('/api', router);
  return app;
} 