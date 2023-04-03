import {
    loadMovies,
    searchMovies,
    resetSearch,
    loadMore,
    handleScroll,
    scrollToTop
} from "./functions";

//load movies if the user didn't reset the previous search
loadMovies();

document.getElementById('search-btn').addEventListener('click', () => {
    resetSearch();
    searchMovies();
})
document.getElementById('reset-btn').addEventListener('click', resetSearch);
document.getElementById('search-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchMovies();
    }
})
document.getElementById('top-btn').addEventListener('click', scrollToTop);

//handler scroll to the bottom of the page
window.onscroll = handleScroll

