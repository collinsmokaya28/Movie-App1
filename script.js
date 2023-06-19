document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '4d9b894b';
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsContainer = document.getElementById('resultsContainer');
    const modalContainer = document.getElementById('modalContainer');
    const modalContent = document.getElementById('modalContent');
    const closeButton = document.getElementsByClassName('close')[0];
  
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== '') {
        fetchMovies(searchTerm);
      }
    });
  
    function fetchMovies(searchTerm) {
      const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.Response === 'True') {
            displayMovies(data.Search);
          } else {
            displayErrorMessage('No results found.');
          }
        })
        .catch(error => {
          displayErrorMessage('An error occurred. Please try again later.');
          console.error('Error:', error);
        });
    }
  
    function displayMovies(movies) {
      const resultsContainer = document.getElementById('resultsContainer');
      resultsContainer.innerHTML = '';
  
      movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
  
        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.Title;
  
        const movieYear = document.createElement('p');
        movieYear.textContent = movie.Year;
  
        const moviePoster = document.createElement('img');
        moviePoster.src = movie.Poster !== 'N/A' ? movie.Poster : 'placeholder-image.jpg';
  
        const viewDetailsButton = document.createElement('button');
        viewDetailsButton.textContent = 'View Details';
        viewDetailsButton.addEventListener('click', () => {
          fetchMovieDetails(movie.imdbID);
        });
  
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieYear);
        movieCard.appendChild(moviePoster);
        movieCard.appendChild(viewDetailsButton);
  
        resultsContainer.appendChild(movieCard);
      });
    }
  
    function fetchMovieDetails(movieId) {
      const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${encodeURIComponent(movieId)}`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.Response === 'True') {
            displayMovieDetails(data);
          } else {
            displayErrorMessage('Failed to retrieve movie details.');
          }
        })
        .catch(error => {
          displayErrorMessage('An error occurred. Please try again later.');
          console.error('Error:', error);
        });
    }
  
    function displayMovieDetails(movie) {
      modalContent.innerHTML = '';
  
      const closeButtonSpan = document.createElement('span');
      closeButtonSpan.classList.add('close');
      closeButtonSpan.textContent = '×';
      closeButtonSpan.addEventListener('click', closeModal);
  
      const movieTitle = document.createElement('h2');
      movieTitle.textContent = movie.Title;
  
      const moviePlot = document.createElement('p');
      moviePlot.textContent = movie.Plot;
  
      const movieCast = document.createElement('p');
      movieCast.textContent = `Cast: ${movie.Actors}`;
  
      const movieGenre = document.createElement('p');
      movieGenre.textContent = `Genre: ${movie.Genre}`;
  
      modalContent.appendChild(closeButtonSpan);
      modalContent.appendChild(movieTitle);
      modalContent.appendChild(moviePlot);
      modalContent.appendChild(movieCast);
      modalContent.appendChild(movieGenre);
  
      modalContainer.style.display = 'block';
    }
  
    function closeModal() {
      modalContainer.style.display = 'none';
    }
  
    function displayErrorMessage(message) {
      const resultsContainer = document.getElementById('resultsContainer');
      resultsContainer.innerHTML = `<p class="error-message">${message}</p>`;
    }
  
    closeButton.addEventListener('click', closeModal);
  });
  