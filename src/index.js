const key = '5ea363cd1fe377e3ae1dcc973693a928';
const baseUrl = 'https://api.themoviedb.org/3/';
const searchUrl = `${baseUrl}search/movie?api_key=${key}&query=test&page=1`

async function search() {
    try {
        const response = await fetch(searchUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch movies data')
        }
        const res = await response.json();
        return res
    } catch (err) {
        console.log('Error: ', err)
    }
}

async function renderMovies() {
    const data = await search();
    console.log(data)
    const resDiv = document.getElementById('results-div');

    data.results.forEach(movie => {
        if (movie.title && movie.poster_path && movie.overview) {
            const movieEl = generateMovieDom(movie);
            resDiv.appendChild(movieEl);
        }
    });
}

function generateMovieDom(movie) {
    const baseImgUrl = 'https://image.tmdb.org/t/p/w500/';

    const movieDiv = document.createElement('div');
    const movieTxtDiv = document.createElement('div');
    const img = document.createElement('img');
    const movieTitle = document.createElement('p');
    const movieDescription = document.createElement('p');
    const viewMoreBtn = document.createElement('button');

    movieDiv.className = 'movie';
    movieTxtDiv.className = 'movie__text'
    img.src = baseImgUrl + movie.poster_path;
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

renderMovies()