<%@ Page Language="C#" %>
<!DOCTYPE HTML>
<html>
<head id="Head1" runat="server">
    <title>Explore USA - Road Trip</title>
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
    <link rel="stylesheet" href="css/project.css" />
    <!--[if lte IE 9]><link rel="stylesheet" href="css/ie9.css" /><![endif]-->
    <!--[if lte IE 8]><script src="js/html5shiv.js"></script><link rel="stylesheet" href="css/ie8.css" /><![endif]-->
    <!--[if lte IE 7]><link rel="stylesheet" href="css/ie7.css" /><![endif]-->
     <script type="text/javascript">
         $(document).on("click", ".toggle", function () {
             $(this).next(".sub_routes").slideToggle("slow");
         });
         $(document).ready(function () {
             $("button").click(function () {
                 var x = "";
                 src = document.getElementById('src').value;
                 dest = document.getElementById('dest').value;

                 $.ajax({
                     type: "GET",
                     url: "http://free.rome2rio.com/api/1.2/json/Search?key=j9jwRQnz&oName=" + src + "&dName=" + dest,
                     dataType: "json",
                     cache: "false",
                     success: function (data) {
                         var hrs;
                         var mins;
                         var s_duration;
                         var t_duration;
                         for (var i = 0; i < data.routes.length; i++) {
                             x += '<div class="main_route">';
                             //x += '<br/>Travel Route Option: ' + (i + 1) ;
                             x += '<div class="main_route_heading">' + data.routes[i].name + '</div>';
                             x += '<div class="main_route_details">Total Distance: ' + data.routes[i].distance + ' miles';
                             t_duration = Number(data.routes[i].duration);
                             if (t_duration >= 60) {
                                 hrs = Math.floor(t_duration / 60);
                                 mins = t_duration % 60;
                                 if (mins == 0)
                                 { mins = "00"; }
                             }
                             else {
                                 hrs = "00";
                                 min = t_duration;
                             }
                             x += '</br>Total Duration: ' + hrs + ' hours and ' + mins + ' mins</div>';
                             x += '<div class="toggle"><a>Show Itinerary (Stop by Stop) </a></div>';
                             x += '<div class="sub_routes"><ol>';
                             for (j = 0; j < data.routes[i].segments.length; j++) {

                                 s_duration = Number(data.routes[i].segments[j].duration)
                                 if (s_duration >= 60) {
                                     hrs = Math.floor(s_duration / 60);
                                     mins = s_duration % 60;
                                     if (mins == 0)
                                     { mins = "00"; }
                                 }
                                 else {
                                     hrs = "00";
                                     mins = s_duration;
                                 }
                                 if (data.routes[i].segments[j].kind == "flight") {
                                     x += '<div class="sub_route_kind"><li>Take ' + data.routes[i].segments[j].kind + ' From: ' + data.routes[i].segments[j].sCode + ' To: ' + data.routes[i].segments[j].tCode + '</div>';
                                     x += '<div class="sub_route_detail">Distance: ' + data.routes[i].segments[j].distance + ' miles<br/>  Duration: ' + hrs + ' hours and ' + mins + ' mins<br/></li></div>';

                                 }
                                 else {
                                     x += '<div class="sub_route_kind"><li>Take ' + data.routes[i].segments[j].kind + ' From: ' + data.routes[i].segments[j].sName + ' To: ' + data.routes[i].segments[j].tName + '</div>';
                                     x += '<div class="sub_route_detail">Distance: ' + data.routes[i].segments[j].distance + ' miles<br/>Duration: ' + hrs + ' hours and ' + mins + ' mins<br/> </li></div>';
                                 }
                             }
                             x += '</ol></div>'
                             x += '</div><br/>';
                             routes.innerHTML = x;
                         }
                     },
                     error: function (data) {
                         routes.innerHTML = "No Routes Found between two cities!!!";
                     }
                 });
             });
         });

    </script>
    <style>
        a {
        color:#c94663;
        }
        </style>
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

                        <div style="font-family:'Comic Sans MS';font-weight: bold;font-size: 15px;">City of Departure (Origin) :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <input type="text" id="src" />
                        <br />
                        <br />
                       <div style="font-family:'Comic Sans MS';font-weight: bold;font-size: 15px;"> Destination City :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <input type="text" id="dest" /><br />
                        <br />
                        <button type="button" value="Search Route" class="button button-small">Search Route</button>
                        <br />
                        <br />
                        <div id="routes"></div>
                        <p id="results">
                        </p>
                        <br />
                    </article>

                    <!-- Post -->
                </div>
            </div>

            <!-- Sidebar -->
            <div id="sidebar">

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
                    <p style="font-family:'Comic Sans MS'">
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
