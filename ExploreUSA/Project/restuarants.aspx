<%@ Page Language="C#" %>

<!DOCTYPE HTML>

<html>
<head id="Head1" runat="server">
    <title>Explore USA - Restuarants</title>
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


    <script type="text/javascript" src="http://oauth.googlecode.com/svn/code/javascript/oauth.js"></script>
    <script type="text/javascript" src="http://oauth.googlecode.com/svn/code/javascript/sha1.js"></script>
    <script type="text/javascript">
        function sendRequest() {
            var auth = {
                consumerKey: "kGhZlJc5OojzAlu_IdRNWQ",
                consumerSecret: "3yewdZJTlhzRkPHbQRLFCeudlsc",
                accessToken: "fe9AwxBH4Yx-YVO4avpJ0_3H8eHbproo",
                accessTokenSecret: "PVJAtZnTtyf_zW8VzxU0kH4aOq4",
                serviceProvider: {
                    signatureMethod: "HMAC-SHA1"
                }
            };
            var terms = 'food';
            var near = document.getElementById('city').value;;
            var limit = 10;
            var offset = 0;

            var accessor = {
                consumerSecret: auth.consumerSecret,
                tokenSecret: auth.accessTokenSecret
            };

            parameters = [];
            parameters.push(['term', terms]);
            parameters.push(['location', near]);
            parameters.push(['callback', 'cb']);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

            var message = {
                'action': 'http://api.yelp.com/v2/search',
                'method': 'GET',
                'parameters': parameters
            };

            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);

            var parameterMap = OAuth.getParameterMap(message.parameters);
            parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)

            $.ajax({
                'url': message.action,
                'data': parameterMap,
                'cache': true,
                'dataType': 'jsonp',
                'jsonpCallback': 'cb',
                'success': function (data, textStats, XMLHttpRequest) {
                    var str = "";
                    for (var i = 0; i < data.businesses.length; i++) {
                        str += '<b>Name:</b> <span><b>' + data.businesses[i].name + '</b></span> <br />';
                        str += '<b>Rating:</b> <span> <img src=' + data.businesses[i].rating_img_url + ' alt="" /> </span> <br />';
                        str += '<img class="resImg" src=' + data.businesses[i].image_url + ' alt="" /><br />';
                        var phone = data.businesses[i].phone;
                        if (phone != undefined) {
                            str += '<b>Phone No:</b> <span>' + data.businesses[i].phone + '</span><br/>';
                        }
                        str += '';
                    }

                    $("#jsonContent").append(str);
                }
            });

        }
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

                        <div style="font-family:'Comic Sans MS';font-weight: bold;font-size: 15px;">Search for Restuarants in USA</div>

                        <div style="font-family:'Comic Sans MS';font-weight: bold;font-size: 15px;">Enter the city:</div> 
                        <input type="text" id="city" size="30" placeholder="Boston" />
                        <br />
                        &nbsp;&nbsp;<input type="button" id="SearchButton" value="Restuarants" onclick="sendRequest();" class="button button-small" />


                        <hr />
                        <p id="jsonContent">
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




































