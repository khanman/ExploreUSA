<%@ Page Language="C#"%>

<!DOCTYPE HTML>
<html>
<head id="Head1" runat="server">
    <title>Explore USA - Explore</title>
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
   <link rel="stylesheet" href="css/style1.css">
      <style>
        #map {
            width: 100%;
            height: 355px;
        }

        .info {
            padding: 6px 8px;
            font: 14px/16px Arial, Helvetica, sans-serif;
            background: white;
            background: rgba(255,255,255,0.8);
            box-shadow: 0 0 15px rgba(0,0,0,0.2);
            border-radius: 5px;
        }

            .info h4 {
                margin: 0 0 5px;
                color: #777;
            }

        .legend {
            text-align: left;
            line-height: 18px;
            color: #555;
        }

            .legend i {
                width: 18px;
                height: 18px;
                float: left;
                margin-right: 8px;
                opacity: 0.7;
            }
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

                        <div id="map"></div>
                        <script src="js/leaflet.js"></script>
                        <script type="text/javascript" src="js/us-states.js"></script>
                        <script type="text/javascript">
                            var map = L.map('map').setView([37.8, -96], 4);

                            var cloudmade = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
                                attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
                                key: 'BC9A493B41014CAABB98F0471D759707',
                                styleId: 22677
                            }).addTo(map);


                            // control that shows state info on hover
                            var info = L.control();

                            info.onAdd = function (map) {
                                this._div = L.DomUtil.create('div', 'info');
                                this.update();
                                return this._div;
                            };

                            info.update = function (props) {
                                this._div.innerHTML = '' + (props ?
                                    '<b>' + props.name + '</b>'
                                    : 'Hover over a state');
                            };

                            info.addTo(map);


                            // get color depending on population density value
                            function getColor(d) {
                                return d > 1000 ? '#001F7A' :
                                       d > 500 ? '#00248F' :
                                       d > 200 ? '#002EB8' :
                                       d > 100 ? '#335CD6' :
                                       d > 50 ? '#4D70DB' :
                                       d > 20 ? '#6685E0' :
                                       d > 10 ? '#8099E6' :
                                                  '#99ADEB';
                            }

                            function style(feature) {
                                return {
                                    weight: 2,
                                    opacity: 1,
                                    color: 'white',
                                    dashArray: '3',
                                    fillOpacity: 0.7,
                                    fillColor: getColor(feature.properties.density)
                                };
                            }

                            function highlightFeature(e) {
                                var layer = e.target;

                                layer.setStyle({
                                    weight: 5,
                                    color: '#666',
                                    dashArray: '',
                                    fillOpacity: 0.7
                                });

                                if (!L.Browser.ie && !L.Browser.opera) {
                                    layer.bringToFront();
                                }

                                info.update(layer.feature.properties);
                            }

                            var geojson;

                            function resetHighlight(e) {
                                geojson.resetStyle(e.target);
                                info.update();
                            }

                            function zoomToFeature(e) {
                                var x = e.target;
                                map.fitBounds(e.target.getBounds());
                                createDiv(x.feature.properties);
                                var layer = e.target;

                                layer.setStyle({
                                    weight: 5,
                                    color: '#666',
                                    dashArray: '',
                                    fillOpacity: 0.7
                                });

                                if (!L.Browser.ie && !L.Browser.opera) {
                                    layer.bringToFront();
                                }

                                info.update(layer.feature.properties);
                            }

                            function onEachFeature(feature, layer) {
                                layer.on({
                                    mouseover: highlightFeature,
                                    mouseout: resetHighlight,
                                    click: zoomToFeature
                                });
                            }

                            geojson = L.geoJson(statesData, {
                                style: style,
                                onEachFeature: onEachFeature
                            }).addTo(map);

                            function createDiv(props) {
                                var newdiv = document.createElement('div');
                                var divIdName = 'div1';
                                var x;
                                var d = props.name;
                                switch (d) {
                                    case "Alabama":
                                        x = "AL";
                                        break;
                                    case "Alaska":
                                        x = "AK";
                                        break;
                                    case "Arizona":
                                        x = "AZ";
                                        break;
                                    case "Arkansas":
                                        x = "AR";
                                        break;
                                    case "California":
                                        x = "CA";
                                        break;
                                    case "Colorado":
                                        x = "CO";
                                        break;
                                    case "Connecticut":
                                        x = "CT";
                                        break;
                                    case "Delaware":
                                        x = "DE";
                                        break;
                                    case "District of Columbia":
                                        x = "DC";
                                        break;
                                    case "Florida":
                                        x = "FL";
                                        break;
                                    case "Georgia":
                                        x = "GA";
                                        break;
                                    case "Hawaii":
                                        x = "HI";
                                        break;
                                    case "Idaho":
                                        x = "ID";
                                        break;
                                    case "Illinois":
                                        x = "IL";
                                        break;
                                    case "Indiana":
                                        x = "ID";
                                        break;
                                    case "Iowa":
                                        x = "IA";
                                        break;
                                    case "Kansas":
                                        x = "KS";
                                        break;
                                    case "Kentucky":
                                        x = "LY";
                                        break;
                                    case "Louisiana":
                                        x = "LA";
                                        break;

                                    case "Maine":
                                        x = "ME";
                                        break;
                                    case "Maryland":
                                        x = "MD";
                                        break;
                                    case "Massachusetts":
                                        x = "MA";
                                        break;
                                    case "Michigan":
                                        x = "MI";
                                        break;
                                    case "Minnesota":
                                        x = "MN";
                                        break;
                                    case "Mississippi":
                                        x = "MS";
                                        break;
                                    case "Missouri":
                                        x = "MO";
                                        break;
                                    case "Montana":
                                        x = "MT";
                                        break;
                                    case "Nebraska":
                                        x = "NE";
                                        break;

                                    case "Nevada":
                                        x = "NV";
                                        break;
                                    case "New Hampshire":
                                        x = "NH";
                                        break;
                                    case "New Mexico":
                                        x = "NM";
                                        break;
                                    case "New York":
                                        x = "NY";
                                        break;
                                    case "North Carolina":
                                        x = "NC";
                                        break;
                                    case "North Dakota":
                                        x = "ND";
                                        break;

                                    case "Ohio":
                                        x = "OH";
                                        break;
                                    case "Oklahoma":
                                        x = "OK";
                                        break;
                                    case "Oregon":
                                        x = "OR";
                                        break;
                                    case "Pennsylvania":
                                        x = "PA";
                                        break;
                                    case "Rhode Island":
                                        x = "RI";
                                        break;
                                    case "South Carolina":
                                        x = "SC";
                                        break;
                                    case "South Dakota":
                                        x = "SD";
                                        break;
                                    case "Tennessee":
                                        x = "TN";
                                        break;

                                    case "Texas":
                                        x = "TX";
                                        break;
                                    case "Utah":
                                        x = "UT";
                                        break;
                                    case "Vermont":
                                        x = "VT";
                                        break;
                                    case "Virginia":
                                        x = "VA";
                                        break;
                                    case "Washington":
                                        x = "WA";
                                        break;
                                    case "West Virginia":
                                        x = "WV";
                                        break;
                                    case "Wisconsin":
                                        x = "WI";
                                        break;
                                    case "Wyoming":
                                        x = "WY";
                                        break;
                                    case "Puerto Rico":
                                        x = "PR";
                                        break;
                                    default:
                                        x = "Choose State";
                                }
                                newdiv.setAttribute('id', divIdName);
                                newdiv.style.width = "200px";
                                newdiv.style.height = "100px";
                                newdiv.style.left = "20%";
                                newdiv.style.top = "60%";
                                newdiv.style.position = "absolute";
                                newdiv.style.background = "#ffffff";
                                newdiv.className="button small-btn"
                                newdiv.style.border = "1px solid #000000";
                                newdiv.innerHTML = '<a href="stat.aspx?Id=' + x + '">Click Here to view details</a>';
                                document.body.appendChild(newdiv);
                            }
                        </script>
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

