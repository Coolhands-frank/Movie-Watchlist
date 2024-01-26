const formEl = document.getElementById("submit-search")
const inputEl = document.getElementById("search-input")
const movieMainDiv = document.getElementById("movie-container")
let fullMovieArr = []

document.addEventListener("click", (e) => {
    if (e.target.dataset.add) {
        addMovieToWatchlist(e.target.dataset.add)
    }
})

// this function listens to the sumbit event on the form element, takes in the input value, 
// fetches the movie, loops through it and apply the getMovieWithId() function 
// to fetch each individual movie full details and display it
formEl.addEventListener("submit", async (e) => {
    e.preventDefault()
    const searchValue = inputEl.value
    try {
        const res = await fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=8c69ac1e`)
        const data = await res.json()
        const movieArray = data.Search
        const fullMovieArray = movieArray.forEach(async (movie) => {
            const movieDetails = await getMovieWithId(movie.imdbID)
            movieMainDiv.innerHTML += `
            <div class="movie-detail-placement">
                <img src="${movieDetails.Poster}" class="image" alt="${movieDetails.Title}" />
                <h3 class="title-rating">${movieDetails.Title}<span>
                    <i class="fa-solid fa-star star-color"></i>
                    ${movieDetails.imdbRating}</span>
                </h3>
                <div class="runtime-genre-watchlist">
                    <p class="">${movieDetails.Runtime}</p>
                    <p class="">${movieDetails.Genre}</p>
                    <span class="add-watchlist" >
                        <i class="fa-solid fa-circle-plus add-btn-icon" data-add="${movieDetails.imdbID}"></i>
                        <p data-add="${movieDetails.imdbID}">Watchlist</p>
                    </span>
                </div>
                <p class="plot">${movieDetails.Plot}</p>
            </div>`
        })
        movieMainDiv.innerHTML = ``
    } catch(error) {
        movieMainDiv.innerHTML = `
            <p class="no-movie-response">Unable to find what you are looking for.
            please try another search</p>`
        }
})

// this function adds movies to watchlist, by saving them to localStorage
function addMovieToWatchlist(movieId){
    const selectedMovie = fullMovieArr.filter(movie => movieId == movie.imdbID)[0]
    if (!localStorage.getItem(`${movieId}`)) {
        localStorage.setItem(`${movieId}`, JSON.stringify(selectedMovie))
    }
}

// This function gets the full details of movies from the omdb api
async function getMovieWithId(id) {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&plot=short&apikey=8c69ac1e`)
    const data = await response.json()
    const fullMovieDetail = data
    fullMovieArr.push(fullMovieDetail)
    return fullMovieDetail
}
