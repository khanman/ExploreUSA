<%@ Page Language="C#"%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Explore USA - Population Density</title>
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
    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="css/leaflet.css">

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
                        <div id="map" class="leaflet-container leaflet-fade-anim" tabindex="0" style="position: relative;">
                            <div class="leaflet-map-pane" style="-webkit-transform: translate3d(682px, 97px, 0px);">
                                <div class="leaflet-tile-pane">
                                    <div class="leaflet-layer">
                                        <div class="leaflet-tile-container leaflet-zoom-animated" style=""></div>
                                        <div class="leaflet-tile-container leaflet-zoom-animated" style="">
                                            <img class="leaflet-tile" style="height: 256px; width: 256px; left: -253px; top: 104px;" src="./Leaflet Layers Control Example_files/6.png"><img class="leaflet-tile" style="height: 256px; width: 256px; left: -509px; top: 104px;" src="./Leaflet Layers Control Example_files/6(1).png"><img class="leaflet-tile" style="height: 256px; width: 256px; left: -253px; top: -152px;" src="./Leaflet Layers Control Example_files/5.png"><img class="leaflet-tile" style="height: 256px; width: 256px; left: -509px; top: -152px;" src="./Leaflet Layers Control Example_files/5(1).png"><img class="leaflet-tile" style="height: 256px; width: 256px; left: -509px; top: 360px;" src="./Leaflet Layers Control Example_files/7.png"><img class="leaflet-tile" style="height: 256px; width: 256px; left: -253px; top: 360px;" src="./Leaflet Layers Control Example_files/7(1).png"><img class="leaflet-tile" style="height: 256px; width: 256px; left: -765px; top: 104px;" src="./Leaflet Layers Control Example_files/6(2).png"><img class="leaflet-tile" style="height: 256px; width: 256px; left: 3px; top: 104px;" src="./Leaflet Layers Control Example_files/6(3).png"><img class="leaflet-tile" style="height: 256px; width: 256px; left: -765px; top: 360px;" src="./Leaflet Layers Control Example_files/7(2).png"><img class="leaflet-tile" style="height: 256px; width: 256px; left: -765px; top: -152px;" src="./Leaflet Layers Control Example_files/5(2).png"><img class="leaflet-tile" style="height: 256px; width: 256px; left: 3px; top: -152px;" src="./Leaflet Layers Control Example_files/5(3).png"><img class="leaflet-tile" style="height: 256px; width: 256px; left: 3px; top: 360px;" src="./Leaflet Layers Control Example_files/7(3).png">
                                        </div>
                                    </div>
                                </div>
                                <div class="leaflet-objects-pane">
                                    <div class="leaflet-shadow-pane">
                                    </div>
                                </div>
                            </div>
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
    <script src="js/leaflet.js"></script>
    <script type="text/javascript" src="js/us-states.js"></script>
    <script type="text/javascript">
        var map = L.map('map').setView([37.8, -96], 4);
        // control that shows state info on hover
        var info = L.control();

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };

        info.update = function (props) {
            this._div.innerHTML = '<h4>US Population Density</h4>' + (props ?
				'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
				: 'Hover over a state');
        };
        info.addTo(map);
        // get color depending on population density value
        function getColor(d) {
            return d > 1000 ? '#800026' :
			       d > 500 ? '#BD0026' :
			       d > 200 ? '#E31A1C' :
			       d > 100 ? '#FC4E2A' :
			       d > 50 ? '#FD8D3C' :
			       d > 20 ? '#FEB24C' :
			       d > 10 ? '#FED976' :
			                  '#FFEDA0';
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
            map.fitBounds(e.target.getBounds());
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
        map.attributionControl.addAttribution('');
        var legend = L.control({ position: 'bottomright' });
        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
				grades = [0, 10, 20, 50, 100, 200, 500, 1000],
				labels = [],
				from, to;

            for (var i = 0; i < grades.length; i++) {
                from = grades[i];
                to = grades[i + 1];

                labels.push(
					'<i style="background:' + getColor(from + 1) + '"></i> ' +
					from + (to ? '&ndash;' + to : '+'));
            }

            div.innerHTML = labels.join('<br>');
            return div;
        };
    </script>

</body>
</html>
