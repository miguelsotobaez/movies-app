import axios from 'axios';

// Base URL for API requests
const BASE_URL = '/api';

// API endpoints
export const API_ENDPOINTS = {
  studios: `${BASE_URL}/studios`,
  movies: `${BASE_URL}/movies`,
  transfers: `${BASE_URL}/transfers`,
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logging
api.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API methods
export const fetchStudios = async () => {
  const response = await fetch(API_ENDPOINTS.studios);
  if (!response.ok) {
    throw new Error('Failed to fetch studios');
  }
  return response.json();
};

export const fetchMovies = async () => {
  const response = await fetch(API_ENDPOINTS.movies);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

export const getMovieAge = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movieAge`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie age');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie age:', error);
    throw error;
  }
};

export const transferMovie = async (movieId, fromStudioId, toStudioId) => {
  const response = await fetch(API_ENDPOINTS.transfers, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      movieId,
      fromStudioId,
      toStudioId,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to transfer movie');
  }
  return response.json();
}; 