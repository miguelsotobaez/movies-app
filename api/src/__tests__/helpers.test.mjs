import { getAllMoviesFromStudios, transferMovieRights } from '../helpers.mjs';
import { sony, warner, disney } from '../../constants/studio_constants.mjs';

describe('Helper Functions', () => {
  describe('getAllMoviesFromStudios', () => {
    it('should return all movies from all studios', () => {
      const allMovies = getAllMoviesFromStudios([disney, warner, sony]);
      
      expect(Array.isArray(allMovies)).toBe(true);
      expect(allMovies.length).toBeGreaterThan(0);
      
      allMovies.forEach(movie => {
        expect(movie).toHaveProperty('id');
        expect(movie).toHaveProperty('name');
        expect(movie).toHaveProperty('studioId');
      });
    });

    it('should handle empty studios array', () => {
      const allMovies = getAllMoviesFromStudios([]);
      expect(Array.isArray(allMovies)).toBe(true);
      expect(allMovies.length).toBe(0);
    });
  });

  describe('transferMovieRights', () => {
    it('should transfer a movie between studios', () => {
      const movieToTransfer = disney.movies[0];
      const result = transferMovieRights(
        movieToTransfer.id,
        disney.id,
        warner.id,
        [disney, warner, sony]
      );

      expect(result).toHaveProperty('success', true);
      expect(result.movie).toBeTruthy();
      expect(result.movie.id).toBe(movieToTransfer.id);
      
      // Verify the movie was removed from source studio
      const sourceStudioMovies = disney.movies.filter(m => m.id === movieToTransfer.id);
      expect(sourceStudioMovies.length).toBe(0);
      
      // Verify the movie was added to target studio with correct properties
      const targetStudioMovie = warner.movies.find(m => m.id === movieToTransfer.id);
      expect(targetStudioMovie).toBeTruthy();
      expect(targetStudioMovie.id).toBe(movieToTransfer.id);
      expect(targetStudioMovie.name).toBe(movieToTransfer.name);
    });

    it('should throw error when movie is not found', () => {
      expect(() => {
        transferMovieRights(
          'non-existent-movie',
          disney.id,
          warner.id,
          [disney, warner, sony]
        );
      }).toThrow();
    });

    it('should throw error when source studio is not found', () => {
      const movieToTransfer = disney.movies[0];
      expect(() => {
        transferMovieRights(
          movieToTransfer.id,
          'non-existent-studio',
          warner.id,
          [disney, warner, sony]
        );
      }).toThrow();
    });

    it('should throw error when target studio is not found', () => {
      const movieToTransfer = disney.movies[0];
      expect(() => {
        transferMovieRights(
          movieToTransfer.id,
          disney.id,
          'non-existent-studio',
          [disney, warner, sony]
        );
      }).toThrow();
    });
  });
}); 