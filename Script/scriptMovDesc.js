const API_KEY = localStorage.getItem('API_KEY');
const movieInfoSection = document.querySelector('.movieInfoContainer');
let response;
let movieId = localStorage.getItem('movieId');
let URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

async function fetchMovie(URL){
    try{
        response = await fetch(URL);
        const data = await response.json();

        const movieInfoContainer = createMovieInfoContainer(data);
        movieInfoSection.appendChild(movieInfoContainer);
        setImages(data);
    }   catch(error){
            console.log('Error fetching data: ', error);
            if(response.status == '404'){
                const movieInfoContainer = document.createElement("div");
                movieInfoContainer.innerHTML = `
                <div class="movieInfo">
                    <h1>Oops...</h1>
                    <p>It seems that the page wasn't found</p>
                <div>
    `;
                movieInfoSection.appendChild(movieInfoContainer);
                let movieInfo = document.querySelector(".movieInfo");
                movieInfo.style.color = 'black';
            }
    }
}

function createMovieInfoContainer(media){
    const {title, name, release_date,runtime,genres,overview, status, vote_average, vote_count} = media;
    const movieInfoContainer = document.createElement("div");
    movieInfoContainer.innerHTML = `
            <div id="moviePic"></div>
            <div class="movieInfo">
                <h1>${title || name}</h1>
                <p>${release_date} • ${fetchMovieGenres(genres)} • ${minutesToHours(runtime)}</p>
                <h2>Overview</h2>
                <p id="movieOverview">${overview}</p>
                <div class="movieDirectors">
                    <div>
                        <h2>Status</h2>
                        <p>${status}</p>
                    </div>
                    <div>
                        <h2>Rating</h2>
                        <p>${vote_average}</p>
                    </div>
                    <div>
                        <h2>Number of votes</h2>
                        <p>${vote_count}</p>
                    </div>
                </div>
            </div>
    `;

        return movieInfoContainer;
}

function setImages(media){
    const {backdrop_path} = media;
    const moviePic = document.getElementById("moviePic");
    const movieInfoContainer = document.querySelector(".movieInfoContainer");

    moviePic.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${backdrop_path}")`;
    movieInfoContainer.style.backgroundImage = `linear-gradient(to bottom, rgb(0 0 0 / 50%), rgb(0 0 0 / 50%)), url("https://image.tmdb.org/t/p/original/${backdrop_path}")`;
}

function minutesToHours(totalMinutes){

    let hours = Math.round(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    let stringHoursMinutes = `${hours}h ${minutes}m`;

    return stringHoursMinutes;
}

function fetchMovieGenres(genresArray){
    let genreString = 0;
    genresArray.forEach(genre => {
        genreString += `${genre.name}, `;
    });
    genreString = genreString.slice(1);
    genreString = genreString.slice(0, -2);
    return genreString;
}

fetchMovie(URL);