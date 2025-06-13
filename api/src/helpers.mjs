import {GENRE_STRING} from '../constants/studio_constants.mjs'


export const getMovie = (movieId, studios) => {
  let movie;
  let studio = studios.find(t => {
    movie = t.movies.find(p => p.id === movieId)
    return movie
  })
  if (movie && studio) {
    return {movie, studioId: studio.id}
  }

  return false
};

export const getAllMoviesFromStudios = (studios) => {
  let allMovies = [];
  studios.forEach(singleStudio => {
    singleStudio.movies.map(movie => {
      allMovies.push(movieConstructor(movie, singleStudio))
    })
  });
  return allMovies;
};

export const movieConstructor = (movie, studio) => {
  const constructedMovie = { ...movie }; // Create a copy to avoid modifying the original

  //Set url property to img
  if (constructedMovie.url) {
    constructedMovie.img = constructedMovie.url;
    delete constructedMovie.url;
  }
  
  //Map position id to string
  if (typeof constructedMovie.position === "number") {
    constructedMovie.position = GENRE_STRING[constructedMovie.price];
  }
  
  //Add studioId from parent object
  constructedMovie.studioId = studio.id;
  
  //Remove price but keep the id
  delete constructedMovie.price;
  
  return constructedMovie;
}

export const transferMovieRights = (movieId, fromStudioId, toStudioId, studios) => {
  console.log('Transfer request:', { movieId, fromStudioId, toStudioId });
  console.log('Available studios:', studios.map(s => ({ id: s.id, name: s.name })));

  // Find source and target studios
  const fromStudio = studios.find(s => s.id === fromStudioId);
  const toStudio = studios.find(s => s.id === toStudioId);

  if (!fromStudio || !toStudio) {
    console.error('Studio not found:', { fromStudio, toStudio });
    throw new Error(`Studio not found: ${!fromStudio ? 'source' : 'target'} studio (${!fromStudio ? fromStudioId : toStudioId})`);
  }

  // Find the movie in the source studio
  const movieIndex = fromStudio.movies.findIndex(m => m.id === movieId);
  if (movieIndex === -1) {
    console.error('Movie not found:', { movieId, studioMovies: fromStudio.movies });
    throw new Error(`Movie ${movieId} not found in source studio ${fromStudio.name}`);
  }

  // Get the movie and remove it from source studio
  const movie = fromStudio.movies[movieIndex];
  fromStudio.movies.splice(movieIndex, 1);

  // Add the movie to the target studio
  toStudio.movies.push({...movie});

  const result = {
    success: true,
    movie: movieConstructor({...movie}, toStudio),
    fromStudio: fromStudio.name,
    toStudio: toStudio.name
  };

  console.log('Transfer successful:', result);
  return result;
};

