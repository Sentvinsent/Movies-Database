// To do: 
// •	Add error message when no results found.
// •	Add back to top button
// •	Add sorting
// •	Adjust the html and css of the main page
// •	Add search by ‘Enter’ click

import { loadMovies, searchMovies, resetSearch, loadMore } from "./functions";

//load movies if the user didn't reset the previous search
loadMovies();

document.getElementById('search-btn').addEventListener('click', searchMovies);
document.getElementById('reset-btn').addEventListener('click', resetSearch);

//handler scroll to the bottom of the page
window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        loadMore();
    }
};

