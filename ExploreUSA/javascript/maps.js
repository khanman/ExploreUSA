function initialize() {
            geocoder = new google.maps.Geocoder();
            var map2Options = {
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            map2 = new google.maps.Map(document.getElementById("addressMapCanvas"), map2Options);

            var address = document.getElementById('<%=txt1.ClientID%>').value;
            geocoder.geocode({ 'address': address }, function (results, status) {
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