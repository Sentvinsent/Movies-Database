const key = '5ea363cd1fe377e3ae1dcc973693a928';
const baseUrl = 'https://api.themoviedb.org/3/';
const baseImgUrl = 'https://image.tmdb.org/t/p/w500/';

async function search(page) {

    let word;
    if (page === 1) {
        word = document.getElementById('search-input').value;
        localStorage.setItem("searchWord", word);
    } else {
        word = localStorage.getItem("searchWord");
    }

    if (word != undefined && word != null) {
        const searchUrl = `${baseUrl}search/movie?api_key=${key}&query=${word}&page=${page}`;
        const response = await fetch(searchUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch movies data');
        }
        const res = await response.json();
        const toReturn = {
            data: res.results.filter(movie => {
                return movie.title && movie.poster_path && movie.overview
            }).map(movie => {
                return {
                    title: movie.title,
                    img: baseImgUrl + movie.poster_path,
                    overview: movie.overview
                }
            }),
            morePages: page < res.total_pages
        }
        return toReturn
    }
}



export { search }