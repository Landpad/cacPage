const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTNmMDNiMjJlMWU4MjcxOTUwZWRlODllNGYyZmZlMiIsInN1YiI6IjY2NjYzNzJhOTE0Yjg4OTA3YWU5YmJlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RQS4QslLRYDtk4jt5ryBU9FvWlsSxoIkyLrA5g5fzPY';
const API_KEY = 'fe3f03b22e1e8271950ede89e4f2ffe2';
const API_URL = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
const moviesContainer = document.getElementById("movies");


async function fetchMovies(){
    try{
        const response = await fetch(API_URL);
        const data = await response.json();

        data.results.forEach(media => {
            const movieCard = createMovieCard(media);
            moviesContainer.appendChild(movieCard);
        });
    }   catch(error){
            console.log('Error fetching data: ', error);
    }
}

function createMovieCard(media){
    const {title, name, backdrop_path} = media;

    const movieCard = document.createElement("div");
    movieCard.classList.add("movieItem");

    movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${backdrop_path}.jpg" class="movieImgRounded">
        <div class="movieTitle">
            <h4>${title || name}</h4>
            </div>
        `;
        return movieCard;
}

fetchMovies();

const movieItemDiv = document.querySelector("#movies");

movieItemDiv.addEventListener('mouseover',(event) =>{
    let movieDiv = document.querySelector(".movieTitle");
    movieDiv.style.zIndex = "1";
});


