import { search } from "./requests";
import { noResError, renderMovies } from "./views";

const resDiv = document.getElementById('results-div');
const searchTxt = document.getElementById('search-input');
const topBtn = document.getElementById('top-btn');

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
    try {
        const searchData = await search(moviesData.currentPage);
        moviesData.movies = moviesData.movies.concat(searchData.data);
        moviesData.morePages = searchData.morePages;
        searchTxt.value = "";
        renderMovies(moviesData.movies);
        saveMovies();
    }
    catch (e) {
        noResError(e.message);
    }
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

//Handle scroll
function handleScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        loadMore();
    } if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

//Scroll to top
function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

export { resetSearch, loadMovies, searchMovies, loadMore, handleScroll, scrollToTop }