function SimplePoiRenderer(map, pois, icon) {
	this.map = map;
	this.setPois(pois);
	this.markerImage = icon;
}

SimplePoiRenderer.prototype.clearPois = function () {
	"use strict";
	var i;
	if (this.markers !== undefined) {
		for (i = 0; i < this.markers.length; i += 1) {
			this.markers[i].setMap(null);
		}
	}
	$("body").trigger({
		type:'placesremoved'
	});
	this.markers = [];
};

SimplePoiRenderer.prototype.addPois = function (pois) {
	"use strict";
	var that = this, i;
	if ((pois === undefined) || (pois === null)) {
		return;
	}
	for (i = 0; i < pois.length; i += 1) {
		this.markers.push(new google.maps.Marker({
			icon: that.markerImage,
			position: pois[i].geometry.location,
			title: pois[i].name,
			map: this.map,
			zIndex: 3
		}));
		//this.markers[this.markers.length - 1].setMap(this.map);
	}

	$("body").trigger({
		type:'placesadded',
		markers: this.markers,
	});
};

SimplePoiRenderer.prototype.setPois = function (pois) {
	"use strict";
	this.clearPois();
	this.addPois(pois);
};