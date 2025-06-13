export const movieAge = [
  {
    movieId: '11',
    years: '19',
  },
  {
    movieId: '12',
    years: 5,
  },
  {
    movieId: '13',
    years: 0,
  },
  {
    movieId: '14',
    years: '9 goles',
  },
  {
    movieId: '21',
    years: 35,
  },
  {
    movieId: '22',
    years: ' 5',
  },
  {
    movieId: '23',
    years: 0,
  },
  {
    movieId: '24',
  },
  {
    movieId: '31',
    years: 22,
  },
  {
    movieId: '32',
    years: 5,
  },
  {
    movieId: '33',
    years: null,
  },
  {
    movieId: '34',
    years: 3,
  }
]

export const GENRE_ID = {
  adventures: 9,
  horror: 6,
  animation: 4,
  heroes: 1
}

export const GENRE_STRING = {
  [GENRE_ID.adventures]: 'ADV',
  [GENRE_ID.horror]: 'HOR',
  [GENRE_ID.animation]: 'ANI',
  [GENRE_ID.heroes]: 'HER',
}

export const disney = {
  id: '1',
  name: 'Disney studios',
  shortName: 'Disney',
  logo: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
  money: 1000,
  movies: [
    {
      id: '11',
      name: 'Nightmare before christmas',
      genre: GENRE_ID.horror,
      url: 'https://m.media-amazon.com/images/M/MV5BNWE4OTNiM2ItMjY4Ni00ZTViLWFiZmEtZGEyNGY2ZmNlMzIyXkEyXkFqcGdeQXVyMDU5NDcxNw@@._V1_.jpg',
      price: 600,
    },
    {
      id: '12',
      name: 'Aladdin',
      genre: GENRE_ID.animation,
      url: 'https://m.media-amazon.com/images/M/MV5BMmQwYWZjZGItYzc0OC00ZDllLTg3NjItOWIyOWYwMDljMjAyXkEyXkFqcGc@._V1_.jpg',
      price: 10000000000,
    },
    {
      id: '13',
      name: 'The avengers',
      genre: GENRE_ID.heroes,
      url: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
      price: 300,
    },
    {
      id: '14',
      name: 'John Carter',
      genre: GENRE_ID.adventures,
      url: 'https://m.media-amazon.com/images/M/MV5BZWNmZGYzZjUtODRmOS00ODgzLWE4NWQtMDI3MGUwNjRjYjY0XkEyXkFqcGc@._V1_.jpg',
      price: 300,
    },
  ]
}

export const warner = {
  id: '2',
  name: 'Warner Bros.',
  shortName: 'Warner',
  logo: 'https://m.media-amazon.com/images/M/MV5BMTgwMjI4MzU5N15BMl5BanBnXkFtZTcwMTc2MTQxMw@@._V1_.jpg',
  money: 900,
  movies: [
    {
      id: '21',
      name: 'The conjuring',
      genre: GENRE_ID.horror,
      url: 'https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_.jpg',
      price: 1000000000,
    },
    {
      id: '22',
      name: 'Space Jam',
      genre: GENRE_ID.animation,
      url: 'https://m.media-amazon.com/images/M/MV5BZGQ3ZDk0M2MtZDNmNi00OWE3LThiODUtMTU3NmVjMTA0ZGQyXkEyXkFqcGc@._V1_.jpg',
      price: 300,
    },
    {
      id: '23',
      name: 'The dark knight rises',
      genre: GENRE_ID.heroes,
      url: 'https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_.jpg',
      price: 400,
    },
    {
      id: '24',
      name: 'Fantastic beasts and where to find them',
      genre: GENRE_ID.adventures,
      url: 'https://m.media-amazon.com/images/M/MV5BMjMxOTM1OTI4MV5BMl5BanBnXkFtZTgwODE5OTYxMDI@._V1_.jpg',
      price: 500,
    },
  ]
}

export const sony = {
  id: '3',
  name: 'Sony Pictures',
  shortName: 'Sony',
  logo: 'https://m.media-amazon.com/images/M/MV5BYWQ5ZjgyMGItNDY0NS00MDYxLWI5ZDktMDJhZDFhNzQ5MjkyXkEyXkFqcGdeQXVyMTA3MzQ4MTc0._V1_.jpg',
  money: 700,
  movies: [
    {
      id: '31',
      name: 'Slender man',
      genre: GENRE_ID.horror,
      url: 'https://m.media-amazon.com/images/M/MV5BMjE0MzcwMDAyNl5BMl5BanBnXkFtZTgwMzc4ODg0NDM@._V1_.jpg',
      price: 700,
    },
    {
      id: '32',
      name: 'Spider-man into the spider-verse',
      genre: GENRE_ID.animation,
      url: 'https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_.jpg',
      price: 450,
    },
    {
      id: '33',
      name: 'Spider-man',
      genre: GENRE_ID.heroes,
      url: 'https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_.jpg',
      price: 500,
    },
    {
      id: '34',
      name: 'Last action hero',
      genre: GENRE_ID.adventures,
      url: 'https://m.media-amazon.com/images/M/MV5BNjdhOGY1OTktYWJkZC00OGY5LWJhY2QtZmQzZDA2MzY5MmNmXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_.jpg',
      price: 10000000000000,
    },
  ]
}

export const studiosMap = {
  1: disney,
  2: warner,
  3: sony
}

