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
    <!--[if lte IE 9]><link rel="stylesheet" href="css/ie9.css" /><![endif]-->
    <!--[if lte IE 8]><script src="js/html5shiv.js"></script><link rel="stylesheet" href="css/ie8.css" /><![endif]-->
    <!--[if lte IE 7]><link rel="stylesheet" href="css/ie7.css" /><![endif]-->
    <script type="text/javascript">
        function sendRequest() {
            var keys = document.getElementById('keywrds').value;
            var authKeys = "5xuf8cca6w62a2esa9wyk7kk";
            var uri = "http://api.usatoday.com/open/articles?keyword=" + keys + "&encoding=json&api_key=" + authKeys + "";

            $.ajax({
                url: uri,
                dataType: 'json',
                success: function (results) {
                    var descrip = results.stories;
                    var str = "";
                    for (var i = 0; i < results.stories.length; i++) {
                        str += "<b>" + results.stories[i].title + "</b><br/>";
                        str += "<span>" + results.stories[i].description + "&nbsp;&nbsp;<a href=" + results.stories[i].link + ">Read More</a></span><br /><br />";

                    }
                    str += "";
                    $('#results').append(str);
                }
            });
        }
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

                        <div style="font-family: 'Comic Sans MS'; font-weight: bold; font-size: 15px;">USA News Search</div>

                        <div style="font-family: 'Comic Sans MS'; font-weight: bold; font-size: 15px;">Enter keyword:</div>
                        <input type="text" id="keywrds" size="30" placeholder="Sports" />
                        &nbsp;&nbsp;<input type="button" id="SearchButton" value="News" onclick="sendRequest();" class="button button-small" />


                        <hr />
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
