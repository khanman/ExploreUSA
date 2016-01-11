<%@ Page Language="C#" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Experiment</title>
    <script src="../../javascript/jquery-1.9.js"></script>
    <script src="../../javascript/jquery-ui.js"></script>
    <link rel="stylesheet" href="../../css/bootstrap.css">
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" />
    <link rel="stylesheet" href="../../css/experiment_1_style.css">
</head>
<body>
    <div class="pad">
        <h3 style="font-family: 'Comic Sans MS'"><b>Experiment: Web Services</b></h3>
        <hr />
        <div>
            <p>
                Web Servcies:Movie-Api:<br>
                <br>
                In this experiment we extract data from an API with contains JSON Data and render it on screen. 
                First we can see Json data form a link, after which using ajax can view the data in the console by pressing f12.
                Finally render the json data on the screen.       
            </p>
        </div>
        <br>
        <div class="well">
            <h4 style="font-family: 'Comic Sans MS'">Get JSON Data from a link</h4>
            <a href="http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=umgs9aw92awmyuw6qvmgqkgv&q=Star%20Trek&page_limit=5" target="_blank">Get Start Trek
            </a>
        </div>
        <div class="well">
            <h4 style="font-family: 'Comic Sans MS'">Get JSON Data programmatically</h4>
            <br>
            <button class="btn btn-danger wam-get-star-trek">Get JSON DATA</button>
            <p>After clicking the above button, press f12 and then click on console to view the result</p>
        </div>
        <div class="well">
            <h4 style="font-family: 'Comic Sans MS'">Get Movie Json Data from input field</h4>
            <input type="text" class="form-control wam-movie-from-field" placeholder="Type Movie Name" value="Star Wars" />
            <br>
            <button class="btn btn-danger wam-movie-from-field-btn">Get DATA</button>
            <p>After clicking the above button, press f12 and then click on console to view the result</p>
        </div>
        <br>
        <div class="well">
            <h4 style="font-family: 'Comic Sans MS'">Iterate over response JSON</h4>
            <input type="text" class="form-control wam-movie-field" placeholder="Type Movie Name" value="Star Wars" />
            <br>
            <button class="btn btn-danger wam-go-btn">Get Data</button>
            <p>
                After clicking the above button, press f12 and then click on console to view the result, 
                in this we can iterate over the json and display the required fields
            </p>
        </div>
        <div class="well">
            <h4 style="font-family: 'Comic Sans MS'">Render Response JSON</h4>
            <input type="text" class="form-control wam-movie-field-1" placeholder="Type Movie Name" value="Star Wars" />
            <button class="btn btn-primary wam-go-btn-1">Get Movie</button>
            <ul class="wam-results-1 list-unstyled wam-no-padding">
            </ul>
        </div>
    </div>
    <div>
        <p>
            <b>View Source: </b>
            <a href="../../fileview/default.aspx?~/experiments/Experiment-7/api.aspx" target="_blank">ASPX Source</a>|
             <a href="../../fileview/default.aspx?~/css/experiment_1_style.css" target="_blank">CSS Source</a>
        </p>
    </div>
    <div class="container">
        <ul class="wam-li-template" style="visibility: hidden">
            <li class="wam-get-details">
                <div class="table table-responsive table-bordered table-hover">
                    <span class="wam-id"></span>
                    <span class="wam-title"></span>
                    <span class="wam-year"></span>
                    <img height="100" style="float: left" src="http://images.rottentomatoescdn.com/images/redesign/poster_default.gif" class="wam-thumbnail" />
                </div>
                <div style="clear: both"></div>
            </li>
        </ul>
    </div>
    <form id="form1" runat="server">
    </form>
    <script src="../../javascript/jquery-1.9.js"></script>
    <script src="../../javascript/jquery-ui.js"></script>
    <script>

        $(function () {
            $(".wam-go-btn-1").click(renderJSONResponse);
            $(".wam-go-btn").click(iterateOverJSON);
            $(".wam-movie-from-field-btn").click(getMovieFromFieldHandler);
            $(".wam-get-star-trek").click(getSTEventHandler);
            $(".wam-results-1").on("click", ".wam-get-details", getDetails);
        });
        function getDetails() {
            var id = $(this).attr("id");

            var params = {
                apikey: "umgs9aw92awmyuw6qvmgqkgv"
            };


            $.ajax({
                url: "http://api.rottentomatoes.com/api/public/v1.0/movies/" + id + ".json",
                dataType: "jsonp",
                data: params,
                success: function (response) {
                    console.log(response);
                    jq.detailMovieTitle.html(response.title);
                    jq.detailPoster.attr("src", response.posters.original);
                    jq.detailDate.html(response.year);
                    jq.detailRating.html(response.mpaa_rating);
                    jq.detailCritics_concensus.html(response.critics_consensus);

                    jq.detailActorList.empty();

                    for (var a = 0; a < response.abridged_cast.length; a++) {
                        var actor = response.abridged_cast[a];
                        console.log(actor);

                        var actorDom = jq.detailsActorTemplate.clone();
                        for (var key in actor) {
                            var val = actor[key];
                            console.log(key + " = " + val);
                            var clazz = "." + key;
                            actorDom.find(clazz).html(val);
                            jq.detailActorList.append(actorDom);
                        }
                    }
                }
            });
        }
        function renderJSONResponse() {
            var movieName = $(".wam-movie-field-1").val();
            var params = {
                apikey: "umgs9aw92awmyuw6qvmgqkgv",
                q: movieName
            };
            $.ajax({
                url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
                dataType: "jsonp",
                data: params,
                success: function (response) {
                    var template = $(".wam-li-template li:first");
                    var ul = $(".wam-results-1");
                    ul.empty();
                    for (var i = 0; i < response.movies.length; i++) {
                        var movie = response.movies[i];
                        var id = movie.id;
                        var title = movie.title;
                        var year = movie.year;
                        var thumbnail = movie.posters.thumbnail;

                        var instance = template.clone();

                        instance.attr("id", id);
                        instance.find(".wam-id").html(id);
                        instance.find(".wam-title").html(title);
                        instance.find(".wam-year").html(year);
                        instance.find(".wam-thumbnail").attr("src", thumbnail);

                        ul.append(instance);
                    }
                }
            });
        }

        function iterateOverJSON() {
            var movieName = $(".wam-movie-field").val();
            var params = {
                apikey: "umgs9aw92awmyuw6qvmgqkgv",
                q: movieName
            };
            $.ajax({
                url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
                dataType: "jsonp",
                data: params,
                success: function (response) {
                    for (var i = 0; i < response.movies.length; i++) {
                        var movie = response.movies[i];
                        var id = movie.id;
                        var title = movie.title;
                        var year = movie.year;
                        var thumbnail = movie.posters.thumbnail;
                        console.log([id, title, year, thumbnail]);
                    }
                }
            });
        }

        function getMovieFromFieldHandler() {
            var movieName = $(".wam-movie-from-field").val();
            var params = {
                apikey: "umgs9aw92awmyuw6qvmgqkgv",
                q: movieName
            };
            $.ajax({
                url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
                dataType: "jsonp",
                data: params,
                success: function (response) {
                    console.log(response);
                }
            });
        }
        function getSTEventHandler() {
            var params = {
                apikey: "umgs9aw92awmyuw6qvmgqkgv",
                q: "Nightmare before christmas",
                page_limit: 5
            };
            $.ajax({
                url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
                dataType: "jsonp",
                data: params,
                success: function (response) {
                    console.log(response);
                }
            });
        }
    </script>
</body>
</html>
