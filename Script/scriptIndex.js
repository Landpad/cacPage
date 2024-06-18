//API

let pageNumber = 1;
let elementId = 0;
let movieId=[];
let movieIdString;
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTNmMDNiMjJlMWU4MjcxOTUwZWRlODllNGYyZmZlMiIsInN1YiI6IjY2NjYzNzJhOTE0Yjg4OTA3YWU5YmJlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RQS4QslLRYDtk4jt5ryBU9FvWlsSxoIkyLrA5g5fzPY';
const API_KEY = 'fe3f03b22e1e8271950ede89e4f2ffe2';
const trendingWeekURL = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
const trendingDayURL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
const moviesContainer = document.getElementById("movies");
const bestMoviesContainer = document.getElementById("bestMovies");
const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");



async function fetchMovies(URL, containerId){
    try{
        const response = await fetch(URL);
        const data = await response.json();

        data.results.forEach(media => {
            const movieCard = createMovieCard(media);
            containerId.appendChild(movieCard);
        });
    }   catch(error){
            console.log('Error fetching data: ', error);
    }
    movieIdString = JSON.stringify(movieId);
    localStorage.setItem('movieId', movieIdString);
    elementId = 0;
}

function createMovieCard(media){
    const {id, title, name, backdrop_path} = media;
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieItem");
    movieId[elementId] = id;
    movieCard.innerHTML = `
        <div class="img">
            <img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" class="movieImgRounded">
        </div>
        <div class="movieTitle" id=${elementId}>
            <h4 class="smallFont" id=${elementId}>${title || name}</h4>
        </div>
        `;
        elementId++;
        return movieCard;
}

function removeMovies(){
    const movieItem = document.querySelectorAll(".movieItem");
    let movieCounter = 0;

    movieItem.forEach(card => {
        if(movieCounter < 20){
            card.remove();
            movieCounter++;
        } else {
            return;
        }
    });
}

nextButton.addEventListener("click", () => {
    pageNumber++;
    removeMovies();
    fetchMovies(trendingWeekURL+`&page=${pageNumber}`, moviesContainer);
});

previousButton.addEventListener("click", () => {
    if(pageNumber > 1){
        pageNumber--;
        removeMovies();
        fetchMovies(trendingWeekURL+`&page=${pageNumber}`, moviesContainer);
    }
});

fetchMovies(trendingDayURL, bestMoviesContainer);
fetchMovies(trendingWeekURL, moviesContainer);

// Carousel

const moviesCarousel = document.querySelector("#bestMovies");
const arrowButtons = document.querySelectorAll(".arrowContainer");
const moviesCarouselChildrens = [...moviesCarousel.children];

let cardPerView = 660;

arrowButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        moviesCarousel.scrollLeft += btn.id === "left" ? -660:660;
    });
});

// Get Movie Info

const movieItem = document.querySelectorAll(".movieItem");

localStorage.setItem("API_KEY", API_KEY);

moviesContainer.addEventListener('click', (event) =>{
    let movieAPIId = movieId[event.target.id];
    localStorage.setItem('movieId', movieAPIId);
    window.location.replace("/Pages/movieDetails.html");
    console.log(event.target.id);
    console.log(movieId[event.target.id]);
    console.log(movieId);
})

