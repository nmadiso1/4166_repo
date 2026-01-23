const movies = [
  {
    id: 1,
    title: 'Inception',
    director: 'Christopher Nolan',
    year: 2010,
    genres: ['Sci-Fi', 'Thriller'],
    rating: 9,
  },
  {
    id: 2,
    title: 'Interstellar',
    director: 'Christopher Nolan',
    year: 2014,
    genres: ['Sci-Fi', 'Drama'],
    rating: 8,
  },
  {
    id: 3,
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    year: 2008,
    genres: ['Action', 'Crime'],
    rating: 9,
  },
  {
    id: 4,
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    year: 1972,
    genres: ['Crime', 'Drama'],
    rating: 10,
  },
  {
    id: 5,
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    year: 1994,
    genres: ['Crime', 'Drama'],
    rating: 9,
  },
  {
    id: 6,
    title: 'The Matrix',
    director: 'Lana Wachowski',
    year: 1999,
    genres: ['Sci-Fi', 'Action'],
    rating: 9,
  },
];

let nextId = movies.length + 1;

// -------------------------
// Assign a unique id and add the movie to the array
// Return the new movie object
// -------------------------
function addMovie(movieData) {
  // the ... takes all the data from movieData and copies it to the new obj with an added id field
  let movieDataWithID = {
    id: nextId,
  ...movieData,
  };
  movies.push(movieDataWithID);

  //this makes sure it re-updates the nextId so we can keep adding a new movie with the nextID code
  nextId = movies.length + 1;

  return movieDataWithID
}

// -------------------------
// Update the rating of a movie by ID.
// If found, update its rating and return the updated movie
// If not found, return null.
// -------------------------
function updateRating(id, newRating) {
  let index = movies.findIndex(movie => movie.id === id);

  if (index !== -1){
    tempmovie = movies[index]
    tempmovie.rating = newRating
    return tempmovie
  }
  else {
    return null
  }
}

// -------------------------
// Delete a movie by ID.
// If found, remove it from the array and return true
// If not found, return false
// -------------------------
function deleteMovie(id) {
  let index = movies.findIndex(movie => movie.id === id);

  if (index !== -1) {
    //this takes the index that we find from the id and then cuts it out 1 index from that spo
    movies.splice(index, 1)

    // updating the nextId var so that it doesn't skip the number
    nextId = movies.length + 1;

    return true
  } 
  else {
    return false
  }
}

// -------------------------
// Return an array of movie titles directed by the given director
// -------------------------
function findByDirector(director) {
  let directorsCut = []
  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i]
    if (movie.director === director) {
      directorsCut.push(movie.title)
    }
  }
  return directorsCut
}

// -------------------------
// Return an array of movie titles that include the specified genre
// -------------------------
function filterByGenre(genre) {
  let moviesGenre = []
  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i]

    for (let j = 0; j < movie.genres.length; j++) {
      if (movie.genres[j] === genre)
        moviesGenre.push(movie.title);
    }

  }
  return moviesGenre
}

// -------------------------
// Return the average rating of all movies
// Return 0 if no movies exist
// -------------------------
function averageRating() {
  let sum = 0
  let count = 0
  if (movies.length !== 0) {
    for (let i = 0; i < movies.length; i++) {
      let movie = movies[i];
      let movieRating = movie.rating;
      sum += movieRating;
      count++;
    }
    let avg = sum/count
    return avg
  }
  else {
    return 0
  }
}

// -------------------------
// Return an array of movie titles released before the given year
// -------------------------
function moviesBefore(year) {
  let moviesByYear = []
  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i]
    if (movie.year < year) {
      moviesByYear.push(movie.title)
    }
  }
  return moviesByYear
}

// Uncomment to test your implementation

 console.log("\nAdding a new movie:");
 const newMovie = addMovie({ title: "Test Movie", director: "Test Dir", year: 2021, genres: ["Test"], rating: 7 });
 console.log(newMovie);
 console.log("Movies after adding:", movies);

 console.log("\nUpdating rating of the new movie:");
 console.log(updateRating(newMovie.id, 9));
 console.log("Movies after update:", movies);

 console.log("\nUpdating rating of a non-existent movie (id: 999):");
 console.log(updateRating(999, 10));

 console.log("\nDeleting the new movie:");
 console.log(deleteMovie(newMovie.id));
 console.log("Movies after deletion:", movies);
 console.log("\nDeleting a non-existent movie (id: 999):");
 console.log(deleteMovie(999));

 console.log("\nFinding movies by director 'Christopher Nolan':");
 console.log(findByDirector("Christopher Nolan"));

 console.log("\nFiltering movies by genre 'Sci-Fi':");
 console.log(filterByGenre("Sci-Fi"));

 console.log("\nAverage rating of all movies:");
 console.log(averageRating());

 console.log("\nMovies released before 2000:");
 console.log(moviesBefore(2000));

// Export all functions and movies array
module.exports = {
  movies,
  addMovie,
  findByDirector,
  filterByGenre,
  averageRating,
  moviesBefore,
  updateRating,
  deleteMovie,
};
