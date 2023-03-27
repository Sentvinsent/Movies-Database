import { search } from "./requests";
import { renderMovies } from "./views";

const resDiv = document.getElementById('results-div');
const searchTxt = document.getElementById('search-input');

//save loaded movies into the storage
const saveMovies = () => {
    localStorage.setItem('moviesData', JSON.stringify(moviesData));
}

let moviesData = {
    movies: [],
    morePages: true,
    currentPage: 1
}

//load movies from the storage if they exist
const loadMovies = () => {
    const moviesDataJSON = localStorage.getItem('moviesData');
    try {
        if (moviesDataJSON) {
            moviesData = JSON.parse(moviesDataJSON);
            renderMovies(moviesData.movies);
        } else {
            moviesData = {
                movies: [],
                morePages: true,
                currentPage: 1
            }
        }
    } catch (err) {
        throw new Error('Failed to load initial data: ', err)
    }
}

//get movies data and render the results
async function searchMovies() {
    resetSearch();
    const searchData = await search(moviesData.currentPage);
    moviesData.movies = moviesData.movies.concat(searchData.data);
    moviesData.morePages = searchData.morePages;
    searchTxt.value = "";
    renderMovies(moviesData.movies);
    saveMovies();
}

//Reset search data
function resetSearch() {
    resDiv.innerHTML = "";
    moviesData = {
        movies: [],
        morePages: true,
        currentPage: 1
    }
    saveMovies();
}

//load more movies results if they exist
function loadMore() {
    if (moviesData.morePages) {
        moviesData.currentPage++;
        searchMovies();
    }
}

export { resetSearch, loadMovies, searchMovies, loadMore }