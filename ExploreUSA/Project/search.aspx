<%@ Page Language="C#" %>
<!DOCTYPE HTML>
<html>
<head id="Head1" runat="server">
    <title>Explore USA - News</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <link rel="shortcut icon" href="flag.ico" type="image/x-icon">
    <link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400italic,700|Open+Sans+Condensed:300,700" rel="stylesheet" />
    <script src="js/jquery.min.js"></script>
    <script src="js/skel.min.js"></script>
    <script src="js/skel-panels.min.js"></script>
    <script src="js/init.js"></script>
    <noscript>
        <link rel="stylesheet" href="css/skel-noscript.css" />
        <link rel="stylesheet" href="css/style.css" />
        <link rel="stylesheet" href="css/style-desktop.css" />
        <link rel="stylesheet" href="css/style-wide.css" />
    </noscript>
    <link rel="stylesheet" href="css/search.css" />
    <!--[if lte IE 9]><link rel="stylesheet" href="css/ie9.css" /><![endif]-->
    <!--[if lte IE 8]><script src="js/html5shiv.js"></script><link rel="stylesheet" href="css/ie8.css" /><![endif]-->
    <!--[if lte IE 7]><link rel="stylesheet" href="css/ie7.css" /><![endif]-->
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places"></script>
    <script>
        var map;
        var infowindow;
        var placesList;
        var x;
        function search_attractions() {
            x = "";
            document.getElementById('attractions').innerHTML = x;
            var address = document.getElementById("city").value;
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    document.getElementById('more_results').style.visibility = "visible";
                    document.getElementById('map').style.visibility = "visible";
                    map = new google.maps.Map(document.getElementById('map'), {
                        center: results[0].geometry.location,
                        zoom: 12
                    });
                    var request = {
                        location: results[0].geometry.location,
                        radius: 50000,
                        sensor: false,
                        cache: false,
                        types: ["amusement_park", "aquarium", "art_gallery", "bowling_alley", "casino", "museum", "stadium", "zoo", "food", "church", "place_of_worship", "city_hall", "university", "establishment"]
                    };
                    placesList = document.getElementById('attractions');
                    infowindow = new google.maps.InfoWindow();
                    var service = new google.maps.places.PlacesService(map);
                    service.nearbySearch(request, callback); s

                }
                else {
                    document.getElementById('more_results').style.visibility = "hidden";
                    document.getElementById('map').style.visibility = "hidden";
                    //alert("Location not Found. Try Again.");
                }
            });

            //var boston = new google.maps.LatLng(42.358056, -71.063611);


        }

        function callback(results, status, pagination) {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                alert("Location Not Found!!!");
            } else {


                createMarkers(results);
                var moreButton = document.getElementById('more_results');
                moreButton.style.visibility = "visible";
                //document.getElementById('map').style.border = "solid";

                if (pagination.hasNextPage) {
                    var moreButton = document.getElementById('more_results');
                    moreButton.style.visibility = "visible";
                    moreButton.disabled = false;

                    google.maps.event.addDomListenerOnce(moreButton, 'click',
                        function () {
                            moreButton.disabled = true;
                            pagination.nextPage();
                        });
                }
            }

        }
        function createMarkers(places) {
            var photos;
            var marker;
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0, place; place = places[i]; i++) {
                photos = place.photos;
                if (!photos || (place.types[0] == "airport")) {

                    continue;
                }
                createMarker_map(place);
                x = "";
                x += '<div class="details">' + place.name;
                x += '<br/><div class ="sub_details"> Rating: ' + place.rating;
                x += '<br/>Type of Place: ' + place.types[0] + '</div>';
                x += '<br/><img id= "picture" src="' + place.photos[0].getUrl({ 'maxWidth': 200, 'maxHeight': 200 }) + '"/></div><br/>';
                placesList.innerHTML += x;

                bounds.extend(place.geometry.location);

            }
            map.fitBounds(bounds);
        }

        function createMarker_map(place) {

            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(place.name + '<br/><br/><img src="' + place.photos[0].getUrl({ 'maxWidth': 75, 'maxHeight': 75 }) + '"/>'),
                infowindow.open(map, this)
            });
        }

        //google.maps.event.addDomListener(window, 'load', initialize);

    </script>
</head>

<body class="left-sidebar">
    <form id="form1" runat="server">
        <!-- Wrapper -->
        <div id="wrapper">

            <!-- Content -->
            <div id="content" class="clearfix">
                <div id="content-inner">

                    <!-- Post -->
                    <article class="is-post is-post-excerpt">
                        <header>
                            <!--
											Note: Titles and bylines will wrap automatically when necessary, so don't worry
											if they get too long. You can also remove the "byline" span entirely if you don't
											need a byline.
										-->
                            <div id="logo-header">
                                <h1>Discover this land, like never before</h1>
                            </div>
                        </header>
                            <input type="text" id="city" class="user_input" placeholder="Explore Attractions of a City" />
                         &nbsp;&nbsp;<input type="button" id="SearchButton" value="Search" onclick="search_attractions()" class="button button-small" />
                        &nbsp;&nbsp;
                      
                        <div id="search_results">
                            <br />
                              <div id="map_button">
                                <div id="map"></div>
                                <button id="more_results" class="button button-small">Load More</button>
                            </div>
                            <div id="attractions"></div>
                        </div>
                    </article>

                    <!-- Post -->



                </div>
            </div>

            <!-- Sidebar -->
            <div id="sidebar" style="height:667px;">

                <!-- Logo -->
                <div id="logo">
                    <h1><a href="Default.aspx" title="Home">ExploreUSA</a></h1>
                </div>

                <!-- Nav -->
                <nav id="nav">
                    <ul>
                     <li><a href="explore.aspx">Explore</a></li>
                    <li><a href="route.aspx">Road Trips</a></li>
                    <li><a href="restuarants.aspx">Restuarants</a></li>
                    <li><a href="search.aspx">Cities</a></li>
                    <li><a href="news.aspx">News</a></li>
                    <li><a href="signin.aspx">Blog Post</a></li>
                    </ul>
                </nav>

                <div id="copyright">
                    <p style="font-family: 'Comic Sans MS'">
                      <a href="map.aspx">Map</a>&nbsp;|&nbsp;<a href="Population.aspx">Population Density</a>&nbsp;|&nbsp;<a href="blog.aspx">Blog</a></p>
                    <p>
                        Copyright &copy; Explore USA || Khan
                    </p>
                </div>

            </div>

        </div>

    </form>
</body>
</html>
