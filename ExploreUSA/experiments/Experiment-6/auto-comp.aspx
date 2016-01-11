<%@ Page Language="C#"%>
<!DOCTYPE html>
<html>
<head>
    <title>Google Maps Autocomplete</title>
    <script src="../../javascript/jquery-ui.js"></script>
    <link rel="stylesheet" href="../../css/bootstrap.css">
    <link rel="stylesheet" href="../../css/experiment_1_style.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
    <script src="../../javascript/jquery-1.9.js"></script>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" />
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
    <link rel="stylesheet" href="../../Flat-master/css/flat-ui.css">
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
</head>
<body>
    <form id="form1" runat="server">
        <div class="pad">
            <h3 style="font-family: 'Comic Sans MS'"><b>Experiment: Auto Complete </b></h3>
            <hr />
            <div>
                <div>
                    <p>
                        Google Maps Auto Complete :<br>
                        <br>
                        We can use Javascript for adding the google maps on webpage.
                        Auto complete feature implemented using javascript.
                        The location field will be auto completed, 
                        after the field is filled with the address press submit button below the text bar.
                        When the cursor is placed inside the text-box the outline color of the text-bar 
                        will change to green.
                    </p>
                </div>
                <div class="well">
                <asp:Label ID="lbl1" runat="server" Text="Search Location:"></asp:Label>
                <asp:TextBox ID="address" runat="server" value="" style="width: 700px;" CssClass="form-control">
                </asp:TextBox>
                    <br>
                <input id="btnShow"  type="button" value="Submit" onclick="search()" />         
                </div>
                <br>
                <div id="addressMapCanvas" class="mapCan">
                  </div>
              <hr>
            <div>
                <p>
                    <b>View Source: </b>
                    <a href="../../fileview/default.aspx?~/experiments/Experiment-6/auto-comp.aspx" target="_blank">ASPX Source</a>|
                    <a href="../../fileview/default.aspx?~/css/experiment_1_style.css" target="_blank">CSS Source</a>
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
