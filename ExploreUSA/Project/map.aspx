<%@ Page Language="C#"%>

<!DOCTYPE HTML>
<html>
<head id="Head1" runat="server">
    <title>Explore USA - Map</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <link rel="shortcut icon" href="flag.ico" type="image/x-icon">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" />
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
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
        function search() {
            code = new google.maps.Geocoder();
            var map2Options = {
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            map2 = new google.maps.Map(document.getElementById("addressMapCanvas"), map2Options);
            var address = document.getElementById('<%=address.ClientID%>').value;
            code.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map2.setCenter(results[0].geometry.location);
                    if (results[0].types[0] == "street_address") {
                        map2.setZoom(15);
                    } else if (results[0].types[0] == "locality") {
                        map2.setZoom(8);
                    } else {
                        map2.setZoom(11);
                    }
                    var marker = new google.maps.Marker({
                        map: map2,
                        position: results[0].geometry.location
                    });
                } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
                    alert("The given Address could not be found on GMap. Please give a valid address.");
                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
        }
    </script>
    <style>
        .textclass {
            font-weight: bold;
            font-size: 15px;
            font-family:'Comic Sans MS';
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
                        <div>
                            <asp:Label ID="lbl1" runat="server" Text="Look for Location on Map:" CssClass="textclass"></asp:Label>
                            <asp:TextBox ID="address" runat="server" value="" size="30" CssClass="form-control">
                            </asp:TextBox>
                           <br>
                            <input id="btnShow" type="button" value="Submit" onclick="search()" class="button button-small" />
                        </div>
                        <br>
                        <div id="addressMapCanvas" class="mapCan">
                        </div>
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
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&libraries=places&language=en-US"></script>
<script>
    var autocomplete = new google.maps.places.Autocomplete($("#address")[0], {});
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        console.log(place.address_components);
        var directive = {
            "li": {
                "component<-address_components": {
                    ".attribute": function () {
                        var type = this.types[0];
                        type = type.replace(/_/g, " ");
                        return type;
                    },
                    ".value": "component.long_name"
                }
            }
        }
        $("#attributes").show();
        var lis = $('#attributes li');
        for (var li = 0; li < lis.length; li++) {
            if (li == 0) continue;
            $(lis[li]).remove();
        }
        $('#attributes').render({ 'address_components': place.address_components }, directive);
    });
</script>
</html>

