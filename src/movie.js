import { getMovieDetails } from "./requests";

const movieImg = document.getElementById('movie-img');
const movieTitle = document.getElementById('movie-title');
const movieOverview = document.getElementById('movie-overview');
const releaseDate = document.getElementById('release-date');
const tmdbBtn = document.getElementById('tmdb-btn');
const budgetEl = document.getElementById('budget');
const movieId = location.hash.substring(1);

//Populate the movie page with data
async function initPage() {
    const movie = await getMovieDetails(movieId);

    document.title = movie.title;
    movieImg.src = movie.img;
    movieImg.alt = movie.title;
    movieTitle.textContent = movie.title;
    movieOverview.textContent = movie.overview;
    releaseDate.textContent = 'Released on: ' + new Date(movie.release_date).toDateString();
    tmdbBtn.onclick = () => location.assign(movie.tmdbPage);
    if (movie.budget) {
        budgetEl.textContent = 'Budget: ' + new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(movie.budget);
    }
    const rating = Math.round(movie.rating / 2);
    document.getElementById(`${rating}-stars`).checked = true;
}

initPage();
