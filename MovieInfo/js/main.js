$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();

    })
})
function getMovies(searchText){
    // console.log(searchText);}
    axios.get("http://www.omdbapi.com/?t="+searchText+"&apikey=745d8390")
    .then((response) => {
        console.log(response);
        let movies = response.data.search;
        let output = ' ';
        $.each(movies , (_index, movie) => {
            output += `
            <div class="col-md-3">
            <div class="well text-center">
            <img src="${movie.Poster}">
            <h5>${movie.Title}</h5>
            <a onClick="movieSelected("${movie.imdbID}")" class="btn btn-primary" href="#">Movie Details</a>
            </div>
            </div>
            `;
        });

        $('#movies').html(output);

        })
        
                .catch((err) => {
                    console.log(err);
                });
}
function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage . getItem('movieId');

    axios.get("http://www.omdbapi.com/?i="+movieId)//+"&apikey=745d8390")
    .then((response) => {
        console.log(response);
let movie = response.data;

let output =`
<div class="row">
<div class="col-md-4">
<img src="${movie.Poster}"class="thumbnail">
</div>
<div class="col-md-8">
<h2>${movie.Title}</h2>
<ul class="list-group">
<li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
<li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
<li class="list-group-item"><strong>Rated:</strong>${movie.rated}</li>
<li class="list-group-item"><strong>Director:</strong>${movie.Director}</li>
<li class="list-group-item"><strong>Writor:</strong>${movie.Writor}</li>
<li class="list-group-item"><strong>Actor:</strong>${movie.Actor}</li>
</ul>
</div>
</div>
<div class="row">
<div class = "well">
<h3>Plot</h3>
${movie.Plot}
<hr>
<a href="http://imdb.com/title/${movie.imdbID}"target="_blank" class="btn btn-primary">View IMDB</a>
<a href="index.html" class="btn btn-default">Go Back To Search</a>
`;
$('#movie').html();
        })
        
                .catch((err) => {
                    console.log(err);
                });
}
