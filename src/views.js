const resDiv = document.getElementById('results-div');
const errorDiv = document.getElementById('error-div');

//Generate DOM for one moview
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
    viewMoreBtn.onclick = () => location.assign(`movie.html#${movie._id}`)

    movieDiv.appendChild(img);
    movieDiv.appendChild(movieTxtDiv);
    movieTxtDiv.appendChild(movieTitle);
    movieTxtDiv.appendChild(movieDescription);
    movieDiv.appendChild(viewMoreBtn);

    return movieDiv
}

//Generate DOM for each of the found or loaded movies
function renderMovies(movies) {
    movies.forEach(movie => {
        const movieEl = generateMovieDom(movie);
        resDiv.appendChild(movieEl);
    });
}

//Display error message
function noResError(message) {
    const errorEl = document.createElement('p');
    errorEl.className = 'no-res-error';
    errorEl.textContent = message;
    errorDiv.appendChild(errorEl);
    setTimeout(() => {
        errorDiv.innerHTML = "";
    }, 2500)

}
export { renderMovies, noResError }