
$(function() {
    // Get all the element needed from the DOM
    const inputBox = $("#movie-search-input");
    const form = $("#movie-search-input_wrapper");
    const movieShowcase = $(".movies-showcase");
    const movieDetails = $(".movie-details");
    let inputValue;
    
   //Getting and storing the usersearch words
   //Prevent the form from submiting
   //Call getMovie function and give it the usersearch as parameter
    form.on('submit', e => e.preventDefault());
    form.on('keyup', (e) => {
             
             inputValue = inputBox.val();
             getMovies(inputValue);
    })

    //Creat getMovie function and accept the usersearch parameter
   function getMovies(inputValue) {
            // Fetch for movies using the usersearch parameter
             fetch(`https://www.omdbapi.com/?s=${inputValue}&apikey=7184713f`)
                    .then((res) => {
                           return res.json();
                    })
                    .then(data => {
                    //Store the json data into a variable 
                        let movieSearchData = data.Search;
                        console.log(data);
                        let movieSearchOutput = "";
                       
                        movieSearchData.forEach((movie)=> {
                          // Loop through each object and append the relevant data to the DOM element 
                                movieSearchOutput += `
                                
                                <div class="movie">
                                  <div class="poster">
                                    <img src="${movie.Poster}" alt="${movie.Title}">
                                  </div>
                                     <h3 class="title">
                                       ${movie.Title}
                                     </h3>
                                  <a onClick = "movieSelected('${movie.imdbID}')" class="details-btn">Details</a>
                                 </div>
                                 
                               `
                        });
                         // Insert the DOM template to the page
                         movieShowcase.html(movieSearchOutput);
                         
                        })
                        .catch((err) => {
                        console.log(err);
                         });

              }
             //Creat moveieSelected function that is called when the user click any movie details button
             //Get the movie id from the api and store it in the session storage
              window.movieSelected = movieSelected;    
              function movieSelected(Id) {
                sessionStorage.setItem("movieId", Id);
                window.location = "movie_details.html";
                 return false;
             };
             //Creat the getMovieDetails that is called in the movie_details page
             window.getMovieDetails = getMovieDetails;
             function getMovieDetails() {
                 
                 movieID = sessionStorage.getItem("movieId");
                 // Fetch for the selected movie using it ID
                 fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=7184713f`)
                 .then((res) => {
                        return res.json();
                 })
                 .then(data => {
                     // Store the response you got back
                     let movieDetailsData = data;
                     console.log(movieDetailsData);
                   
                      //Creat a template and append the necessary data to the DOM
                         let  movieDetailsOutput = `
                                          
                                    <div class="poster_wrapper">
                                    <img class="poster" src="${movieDetailsData.Poster}" alt="">
                                    </div>
                      
                                  <div class="info_wrapper">
                                      
                                    <div class="title_wrapper">
                                        <h1 class="title">${movieDetailsData.Title}</h1>
                                    </div>
                      
                                    <div class="description_wrapper">
                                        <ul class="descriptions">
                                            <li class="desc genre"><strong>Genre :</strong> ${movieDetailsData.Genre}</li>
                                            <li class="desc release"><strong>Released :</strong> ${movieDetailsData.Released}</li>
                                            <li class="desc rated"><strong>Rated :</strong> ${movieDetailsData.Rated}</li>
                                            <li class="desc rating"><strong>IMDBRating :</strong> ${movieDetailsData.imdbRating}</li>
                                          
                                            <li class="desc director"><strong>Director :</strong>${movieDetailsData.Director}</li>
                                         
                                            <li class="desc actor"><strong>Actors :</strong> ${movieDetailsData.Actors}</li>
                                            <li class="desc actor"><strong>Production Company : </strong> ${movieDetailsData.Production}</li>
                                        </ul>  
                                    </div>
                                  </div>
                      
                                  <div class="plot_wrapper">

                                      <div class="plot">
                                          <h2 class = "plot-heading">Plot</h2> 
                                          <p class="plot-text">
                                                 ${movieDetailsData.Plot}
                                          </p>
                                      </div>
                      
                                      <div class="plot-btn_wrapper">
                                          <a  href= "http://imdb.com/title/${movieID}" target= "_blank" class="plot-btn view">View IMDB</a>
                                          <a href = "./index.html" class="plot-btn back">Go Back To Search</a>
                                      </div>

                                  </div>
                                    
                              
                            `
                            //Insert the template to the page
                            movieDetails.html(movieDetailsOutput);
                     
                      
                     })
                     .catch((err) => {
                        console.log(err);
                      });

             };

            

})  

