import { search } from "./requests";

const resDiv = document.getElementById('results-div');
const searchTxt = document.getElementById('search-input');

// localStorage.setItem('morePAges', 'true');
// localStorage.setItem('currentPage', '1');


function resetSearch() {
    resDiv.innerHTML = "";
    searchTxt.value = "";
}

export { resetSearch }