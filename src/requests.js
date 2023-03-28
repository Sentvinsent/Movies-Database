import { noResError } from "./views";

const key = '5ea363cd1fe377e3ae1dcc973693a928';
const baseUrl = 'https://api.themoviedb.org/3/';
const baseImgUrl = 'https://image.tmdb.org/t/p/w500/';

//Search movies
async function search(page) {

    let word;
    if (page === 1) {
        word = document.getElementById('search-input').value;
        localStorage.setItem("searchWord", word);
    } else {
        word = localStorage.getItem("searchWord");
    }

    if (word != undefined && word != null && word != "") {
        const searchUrl = `${baseUrl}search/movie?api_key=${key}&query=${word}&page=${page}`;
        const response = await fetch(searchUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch movies data');
        }
        const res = await response.json();
        if (res.results.length > 0) {
            const toReturn = {
                data: res.results.filter(movie => {
                    return movie.title && movie.poster_path && movie.overview
                }).map(movie => {
                    return {
                        _id: movie.id,
                        title: movie.title,
                        img: baseImgUrl + movie.poster_path,
                        overview: movie.overview
                    }
                }),
                morePages: page < res.total_pages
            }
            return toReturn
        } else {
            throw new Error("No result found, please try another search word...")
        }
    } else {
        throw new Error("Please check your input...")
    }
}

//Get details about a specific movie
async function getMovieDetails(id) {

    const URL = `${baseUrl}movie/${id}?api_key=${key}`;

    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error('Failed to fetch movies data');
        }
        const res = await response.json();

        return {
            title: res.title,
            overview: res.overview,
            release_date: res.release_date,
            budget: res.budget && res.budget != 0 ? res.budget : '',
            img: baseImgUrl + res.poster_path,
            rating: res.vote_average,
            tmdbPage: `https://www.themoviedb.org/movie/${res.id}`
        }
    } catch (err) {
        throw new Error('Failed to get movie details: ', err);
    }

}

export { search, getMovieDetails }