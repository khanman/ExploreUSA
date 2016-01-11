<%@ Page Language="C#"%>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Google Maps on Webpage</title>
    <script src="../../javascript/jquery-1.9.js"></script>
    <script src="../../javascript/jquery-ui.js"></script>
    <link rel="stylesheet" href="../../css/displaygrid.css">
    <link rel="stylesheet" href="../../css/bootstrap.css">
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" />
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
    <script type="text/javascript">
        function search() {
            code = new google.maps.Geocoder();
            var map2Options = {
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            map2 = new google.maps.Map(document.getElementById("addressMapCanvas"), map2Options);
            var address = document.getElementById('<%=txt1.ClientID%>').value;
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
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <h3 style="font-family: 'Comic Sans MS'"><b>Experiment: Google Maps</b></h3>
            <hr>
            <div class="row">
                <div class="col-lg-12">
                    <p>
                        Google Maps:<br>
                        We can use Javascript for adding the google maps on webpage.
                    </p>
                </div>
                <div class="col-lg-12">
                    <p>
                        Enter Zipcode/Address:
                    </p>
                    <asp:Label ID="lbl1" runat="server" Text="Locate Address:"></asp:Label>
                    <asp:TextBox ID="txt1" runat="server" value=""></asp:TextBox>
                    <input id="btnShow" type="button" value="Submit" onclick="search()" />
                    <br />
                    <br />
                    <div id="addressMapCanvas" class="mapCan" style="">
                    </div>
                </div>
             </div>
            <hr>
                <div>
                    <p>
                        <b>View Source: </b>
                        <a href="../../fileview/default.aspx?~/experiments/Experiment-5/googlemaps.aspx" target="_blank">ASPX Source</a>|
                        <a href="../../fileview/default.aspx?~/css/displaygrid.css" target="_blank">CSS Source</a>
                    </p>
                </div>
                <div>
                    <p>
                        <b>Reference:</b>
                        <a href="http://code.google.com/apis/maps/documentation/javascript/tutorial.html" target="_blank">Google Maps</a>
                    </p>
                </div>
            
        </div>
    </form>
</body>
</html>
