function generateMovieDom(movie) {

    const movieDiv = document.createElement('div');
    const movieTxtDiv = document.createElement('div');
    const img = document.createElement('img');
    const movieTitle = document.createElement('p');
    const movieDescription = document.createElement('p');
    const viewMoreBtn = document.createElement('button');

    movieDiv.className = 'movie';
    movieTxtDiv.className = 'movie__text'
    img.src = movie.img;
    img.className = 'movie-image';
    movieTitle.textContent = movie.title;
    movieTitle.className = 'movie__title';
    movieDescription.textContent = movie.overview;
    movieDescription.className = 'movie__subtitle';
    viewMoreBtn.textContent = ('Open film page');
    viewMoreBtn.className = 'movie-button';

    movieDiv.appendChild(img);
    movieDiv.appendChild(movieTxtDiv);
    movieTxtDiv.appendChild(movieTitle);
    movieTxtDiv.appendChild(movieDescription);
    movieDiv.appendChild(viewMoreBtn);

    return movieDiv
}

export { generateMovieDom }