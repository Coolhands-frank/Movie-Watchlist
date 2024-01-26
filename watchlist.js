
let localStorageMovies = []
const movieContainer = document.getElementById("movie-container")

document.addEventListener("click", (e) => {
    if (e.target.dataset.remove) {
        removeMovieFromWatchlist(e.target.dataset.remove)
        render()
    }
})

// this function removes desired item from the locaStorageMovies variable and localstorage
function removeMovieFromWatchlist(movieId) {
    const removedMovie = localStorageMovies.filter(movie => movie.imdbID !== movieId)
    localStorageMovies = removedMovie
    localStorage.removeItem(movieId)
}

// this function loops through localstorage, get the keys with stored movies and pushes 
// movie to the localStorageMovies variable
function getLocalStorageMovies() {
    for (let key in localStorage) {
        if (key[0] && key[1] == "t") {
            localStorageMovies.push(JSON.parse(localStorage.getItem(key)))
        }
    }
}
getLocalStorageMovies()

// this function maps through localStorageMovies and display to the Dom each available movie
function render() {
    if(localStorageMovies.length > 0) {
        const displayMovies = localStorageMovies.map(movie => {
            return `
            <div class="movie-detail-placement">
                <img src="${movie.Poster}" class="image" alt="${movie.Title}" />
                <h3 class="title-rating">${movie.Title}<span>
                    <i class="fa-solid fa-star star-color"></i>
                    ${movie.imdbRating}</span>
                </h3>
                <div class="runtime-genre-watchlist">
                    <p class="">${movie.Runtime}</p>
                    <p class="">${movie.Genre}</p>
                    <span class="add-watchlist" >
                        <i class="fa-solid fa-circle-minus" data-remove="${movie.imdbID}"></i>
                        <p data-remove="${movie.imdbID}">remove</p>
                    </span>
                </div>
                <p class="plot">${movie.Plot}</p>
            </div>`
        }).join("")
        movieContainer.innerHTML = displayMovies
        return displayMovies
    } else {
        movieContainer.innerHTML = `
        <div class="no-movie-search-div">
            <p class="no-movie-response">Your Watchlist is looking a little empty...</p>
            <span class="go-search-movies">
                <a href="./index.html" class="go-search-movies">
                    <i class="fa-solid fa-circle-plus"></i>
                    <p>Let's add some movies!</p>
                </a>
            </span>
        </div>`
    }
}
render()    
