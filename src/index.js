import { resetSearch } from "./functions";
import { search } from "./requests";
import { generateMovieDom } from "./views";

const resDiv = document.getElementById('results-div');
let morePages = true;
let currentPage = 1;

async function renderMovies() {
    const data = await search(currentPage);
    morePages = data.morePages;
    if (currentPage === 1) {
        resetSearch();
    }
    data.data.forEach(movie => {
        const movieEl = generateMovieDom(movie);
        resDiv.appendChild(movieEl);
    });
}

document.getElementById('search-btn').addEventListener('click', renderMovies);
document.getElementById('reset-btn').addEventListener('click', resetSearch);

if (morePages) {
    window.onscroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            currentPage++;
            renderMovies();
        }
    };
}

