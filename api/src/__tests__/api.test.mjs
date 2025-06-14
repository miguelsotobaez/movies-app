import request from 'supertest';
import { createTestApp } from './setup.mjs';
import { sony, warner, disney } from '../../constants/studio_constants.mjs';

describe('Movies API', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
  });

  describe('GET /api/studios', () => {
    it('should return all studios without movies array', async () => {
      const response = await request(app).get('/api/studios');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(3);
      
      response.body.forEach(studio => {
        expect(studio).toHaveProperty('id');
        expect(studio).toHaveProperty('name');
        expect(studio).not.toHaveProperty('movies');
      });
    });
  });

  describe('GET /api/movies', () => {
    it('should return all movies from all studios', async () => {
      const response = await request(app).get('/api/movies');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      
      response.body.forEach(movie => {
        expect(movie).toHaveProperty('id');
        expect(movie).toHaveProperty('name');
        expect(movie).toHaveProperty('studioId');
      });
    });
  });

  describe('GET /api/movieAge', () => {
    it('should return movie age data', async () => {
      const response = await request(app).get('/api/movieAge');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      
      response.body.forEach(ageData => {
        // movieId is required
        expect(ageData).toHaveProperty('movieId');
        expect(typeof ageData.movieId).toBe('string');
        
        // years is optional and can be string, number, null or undefined
        if ('years' in ageData) {
          const yearsType = typeof ageData.years;
          expect(ageData.years === null || ['string', 'number'].includes(yearsType)).toBe(true);
        }
      });
    });
  });

  describe('POST /api/transfers', () => {
    it('should transfer a movie between studios', async () => {
      const movieToTransfer = disney.movies[0];
      const payload = {
        movieId: movieToTransfer.id,
        fromStudioId: disney.id,
        toStudioId: warner.id
      };

      const response = await request(app)
        .post('/api/transfers')
        .send(payload);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
    });

    it('should return 400 when required fields are missing', async () => {
      const response = await request(app)
        .post('/api/transfers')
        .send({
          movieId: 'movie1'
          // Missing fromStudioId and toStudioId
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Missing required fields');
    });

    it('should return 400 when source and target studios are the same', async () => {
      const response = await request(app)
        .post('/api/transfers')
        .send({
          movieId: 'movie1',
          fromStudioId: disney.id,
          toStudioId: disney.id
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Source and target studios must be different');
    });

    it('should return 400 when movie is not found', async () => {
      const response = await request(app)
        .post('/api/transfers')
        .send({
          movieId: 'non-existent-movie',
          fromStudioId: disney.id,
          toStudioId: warner.id
        });
      
      expect(response.status).toBe(400);
    });
  });
}); 