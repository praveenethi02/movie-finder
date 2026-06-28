let key = "f841d42a";

function search() {
    let inputName = document.getElementById("movieName").value.trim();

    if (!inputName) {
        alert("Please enter a movie name");
        return;
    }

    let url = `https://www.omdbapi.com/?apikey=${key}&t=${encodeURIComponent(inputName)}&plot=full`;

    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url, true);
    httpRequest.responseType = "json";

    httpRequest.onload = function() {
        let movie = httpRequest.response;

        if (movie && movie.Response === "True") {
            document.getElementById("title").innerText = movie.Title || "N/A";
            document.getElementById("year").innerText = movie.Year || "N/A";
            document.getElementById("poster").src = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "";
            document.getElementById("plot").innerText = movie.Plot || "No plot available";
        } else {
            document.getElementById("title").innerText = "Movie not found";
            document.getElementById("year").innerText = "";
            document.getElementById("poster").src = "";
            document.getElementById("plot").innerText = "Please try another movie title.";
        }
    };

    httpRequest.onerror = function() {
        document.getElementById("title").innerText = "Request failed";
        document.getElementById("year").innerText = "";
        document.getElementById("poster").src = "";
        document.getElementById("plot").innerText = "Please check your internet connection.";
    };

    httpRequest.send();
} 