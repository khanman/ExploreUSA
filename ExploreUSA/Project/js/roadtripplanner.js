function RoadTripPlanner(settings) {
	"use strict";
	if (settings === undefined) {
		settings = {
			siteHeaderSelector: '#header-menu',
			roadtripWrapperSelector: '.road-trip-map',
			mapCanvasWrapperSelector: '.map-canvas-wrapper',
			mapCanvasSelector: '#roadtrip-map-canvas',
			overviewMapCanvasWrapperSelector: '.overview-map-canvas-wrapper',
			overviewMapCanvasSelector: '#overview-map-canvas',
			getDirectionsBtnSelector: '.get-directions-btn',
			originFieldSelector: '#origin-field',
			destinationFieldSelector: '#destination-field',
			itineraryListSelector: '.itinerary-list',
			viewInGoogleSelector: '#view-in-google',
			uiTabsSelector: '.tab-panel-tabs a',
			uiTabPanelsSelector: '.tab-panel-panel',
			uiPanel1Selector: '#ui-panel-1',
			uiPanel2Selector: '#ui-panel-2',
			newTripStateSelector: '#new-trip-state',
			editTripBtnSelector: '.edit-trip',
			closeTripBtnSelector: '.close-trip',
			selectedTripSelector: '.selected-trip',
			tripLabelSelector: '.trip-label',
			editStartLabelSelector: '.trip-start-label',
			editEndLabelSelector: '.trip-end-label',
			poiKeySelector: '.poi-key',
			poiMessageSelector: '.poi-message',
			itineraryMessageSelector: '.itinerary-message',
			distanceDisplaySelector: '.route-info-wrapper .distance',
			durationDisplaySelector: '.route-info-wrapper .duration',
			categoryListSelector: '.ui-list.category-list',
			highlightsLayerSelector: '#highlights-layer',
			loadingOverlaySelector: '.loading-overlay',
			defaultUnitSystem: 'metric',
			defaultZoomLevel: 4,
			poiZoomLevel: 11,
			defaultMapCenter: {lat: 42, lng: -98},
			defaultBufferRadius: 30,
			polylineOptions: {'strokeColor': '#009B3A'},
			panelBottomPadding: 100
		}
	}
	this.settings = settings;
	this.bufferRadius = this.settings.defaultBufferRadius;
	this.map = null;
	this.overviewMap = null;
	this.bufferPolygon = null;
	this.routePath = null;
	this.openPoi = null;
	this.startMarker = null;
	this.endMarker = null;
	this.startLocationString = null;
	this.endLocationString = null;
	this.loadingSpriteTimer = null;
	this.geocoder = null;
	this.routeDefined = false;
	this.uiPanel1Scaled = false;
	this.saveTripPreserved = false;
	this.isListening = false;
	this.poiWaypoints = [];
	this.poiMarkers = [];
	this.viaMarkers = [];
	this.placesMarkers = [];
	this.savedPlacesMarkers = [];
	this.routeWaypoints = [];
	this.routeDuration = 0;
	this.routeDistance = 0;
	this.runs = 0;
	this.savedTripIndex = -1;
	this.mapOverlay;
	this.mapProjection;
	this.directionsDisplay;
	this.rendererOptions;
	this.unitLabel;
	this.mapUnitSystem;
	this.simplePoiRenderer;
	this.routePlaces;

	this.localeHash = new da.utilities.LocaleHashTable();

	if (this.settings.defaultUnitSystem == "metric") {
		this.unitLabel = this.localeHash.KILOMETERS;
		this.mapUnitSystem = google.maps.UnitSystem.METRIC;
	} else if (this.settings.defaultUnitSystem == "imperial") {
		this.unitLabel = this.localeHash.MILES;
		this.mapUnitSystem = google.maps.UnitSystem.IMPERIAL;
	}

	this.poiMarkerImage = {
		url: '/media/images/roadtrip/poi-marker-21x24.png',
		size: new google.maps.Size(21, 24),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(11,24)
	};
	this.highlightsMarkerImage = {
		url: '/media/images/roadtrip/experience-marker-28x38.png',
		size: new google.maps.Size(28, 38),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(14,38)
	};
	this.originMarkerImage = {
		url: '/media/images/roadtrip/origin-marker-26x26.png',
		size: new google.maps.Size(26, 26),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(13,13)
	};
	this.viaMarkerImage = {
		url: '/media/images/roadtrip/via-marker-14x14.png',
		size: new google.maps.Size(14, 14),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(7,7)
	};

	this.mapStyle = [{"featureType": "poi","elementType": "geometry","stylers": [{ "visibility": "off" }]},{"featureType": "water","elementType": "geometry.fill","stylers": [{ "visibility": "simplified" }]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{ "color": "#828080" },{ "lightness": 76 }]},{"featureType": "road","elementType": "geometry.stroke","stylers": [{ "color": "#ff511f" },{ "lightness": 14 }]},{"featureType": "road.highway","elementType": "labels.icon","stylers": [{ "visibility": "on" },{ "gamma": 2.94 }]},{"elementType": "labels.text","stylers": [{ "lightness": 3 },{ "visibility": "on" }]},{},{"featureType": "administrative.locality","elementType": "labels.icon","stylers": [{ "visibility": "simplified" },{ "color": "#7d7a79" },{ "lightness": 36 }]},{"featureType": "road.highway","elementType": "labels","stylers": [{ "visibility": "on" }]},{"featureType": "poi","stylers": [{ "visibility": "off" }]},{"featureType": "landscape","stylers": [{ "visibility": "on" }]},{"featureType": "road.local","stylers": [{ "visibility": "off" }]},{"featureType": "landscape","elementType": "geometry.fill","stylers": [{ "visibility": "on" },{ "color": "#fbfbfb" }]},{"featureType": "road","elementType": "labels.icon","stylers": [{ "visibility": "simplified" }]},{},{}];

	this.$siteHeader = $(this.settings.siteHeaderSelector);
	this.$roadTripWrapper = $(this.settings.roadtripWrapperSelector);
	this.$mapCanvasWrapper = $(this.settings.mapCanvasWrapperSelector);
	this.$mapCanvas = $(this.settings.mapCanvasSelector);
	this.$overviewMapCanvasWrapper = $(this.settings.overviewMapCanvasWrapperSelector);
	this.$overviewMapCanvas = $(this.settings.overviewMapCanvasSelector);
	this.$getDirectionsBtns = $(this.settings.getDirectionsBtnSelector);
	this.$originField = $(this.settings.originFieldSelector);
	this.$destinationField = $(this.settings.destinationFieldSelector);
	this.$itineraryList = $(this.settings.itineraryListSelector);
	this.$viewInGoogleLink = $(this.settings.viewInGoogleSelector);
	this.$uiTabs = $(this.settings.uiTabsSelector);
	this.$uiTabPanels = $(this.settings.uiTabPanelsSelector);
	this.$uiPanel1 = $(this.settings.uiPanel1Selector);
	this.$uiPanel2 = $(this.settings.uiPanel2Selector);
	this.$newTripState = $(this.settings.newTripStateSelector);
	this.$editTripBtns = $(this.settings.editTripBtnSelector);
	this.$closeTripBtns = $(this.settings.closeTripBtnSelector);
	this.$selectedTrip = $(this.settings.selectedTripSelector);
	this.$tripLabel = $(this.settings.tripLabelSelector);
	this.$editStartTripLabel = $(this.settings.editStartLabelSelector);
	this.$editEndTripLabel = $(this.settings.editEndLabelSelector);
	this.$poiKey = $(this.settings.poiKeySelector);
	this.$poiMessage = $(this.settings.poiMessageSelector);
	this.$itineraryMessage = $(this.settings.itineraryMessageSelector);
	this.$distanceDisplay = $(this.settings.distanceDisplaySelector);
	this.$durationDisplay = $(this.settings.durationDisplaySelector);
	this.$categoryList = $(this.settings.categoryListSelector);
	this.$highlightsLayer = $(this.settings.highlightsLayerSelector);
	this.$loadingOverlay = $(this.settings.loadingOverlaySelector);
	this.$focusBox = $('.overview-map-focus-box');
	this.$segmentTop = $('.segment-top');
	this.$segmentRight = $('.segment-right');
	this.$segmentBottom = $('.segment-bottom');
	this.$segmentLeft = $('.segment-left');
	this.$featuredTripsLayer = $('#featured-trips-layer');

	this.setupMap();
	this.setupOverviewMap();
	this.bindEvents();
	this.loadDefaultTrip();
	this.updateShareLinks('');
};

/* 
	Create and initialize Google Maps element.
*/
RoadTripPlanner.prototype.setupMap = function () {
	var that = this, mapOptions;
	// map options
	mapOptions = {
		zoom: that.settings.defaultZoomLevel,
		center: new google.maps.LatLng(that.settings.defaultMapCenter.lat, that.settings.defaultMapCenter.lng),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	};
	// directions rendering options
	that.rendererOptions = {
		map: that.map, 
		polylineOptions: that.settings.polylineOptions,
		draggable: true,
		preserveViewport: true,
		suppressMarkers: true
	};
	// scale map to fit window
	that.scaleMap();
	// declare a map projection overlay
	that.map = new google.maps.Map(that.$mapCanvas.get(0), mapOptions);
	that.mapOverlay = new google.maps.OverlayView();
	that.mapOverlay.draw = function() {};
	that.mapOverlay.setMap(that.map);
	that.mapProjection = that.mapOverlay.getProjection();
	// create new directions renderer
	that.directionsDisplay = new google.maps.DirectionsRenderer(that.rendererOptions);
	that.simplePoiRenderer = new SimplePoiRenderer(that.map, [], that.poiMarkerImage);
	that.routePlaces = new RoutePlaces({
		map: that.map,
		onBatchLoaded: function (places) {
			that.simplePoiRenderer.setPois(places);
		},
		route: null
	});
	that.routePlaces.setTypes([""]);
	that.geocoder = new google.maps.Geocoder();
	// listen for direction_changed event
	

	google.maps.event.addListener(that.map, 'click', function () {
		// if a poi box is open, close it
		if (that.openPoi != null) {
			that.openPoi.box.close();
		}
	});

	google.maps.event.addListener(that.map, 'zoom_changed', function () {
		// if map is zoomed enough, start showing places api data
		if (that.map.getZoom() >= that.settings.poiZoomLevel) {
			that.enablePoi();
		} else {
			that.disablePoi();
		}
	});

	google.maps.event.addListener(that.map, 'bounds_changed', function () {
		if (that.overviewMap) {
			that.updateOverviewMap();
		}
	});
};

/* 
	Create and initialize Google Maps element for the overview map.
*/
RoadTripPlanner.prototype.setupOverviewMap = function () {
	var that, mapOptions, rendererOptions;

	that = this;
	mapOptions = {
		zoom: 2,
		center: new google.maps.LatLng(that.settings.defaultMapCenter.lat, that.settings.defaultMapCenter.lng),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
		draggable: false, 
		zoomControl: false, 
		scrollwheel: false, 
		disableDoubleClickZoom: true
	};

	that.overviewMap = new google.maps.Map(that.$overviewMapCanvas.get(0), mapOptions);

	that.overviewOverlay = new google.maps.OverlayView();
	that.overviewOverlay.draw = function() {};
	that.overviewOverlay.setMap(that.overviewMap);
}

/* 
	Get method to retreive or calculate window viewport dimensions.
*/
RoadTripPlanner.prototype.getWindowDimensions = function () {
	var $body = $(window);
	return {width: $body.width(), height: $body.height()}
};

/* 
	Execute neccesary element scaling on the map and related components.
*/
RoadTripPlanner.prototype.scaleMap = function () {
	var that, winDimensions;

	that = this;
	winDimensions = that.getWindowDimensions();
	that.$roadTripWrapper.css({
		width: winDimensions.width,
		height: winDimensions.height - that.$siteHeader.height()
	});

};

/* 
	Fetch route data via a Google Directions Service.
*/
RoadTripPlanner.prototype.getDirections = function () {
	var that, requestSettings, waypoints, i;

	that = this;
	waypoints = [];
	that.directionsDisplay.setMap(null);
	that.directionsDisplay.setOptions(that.rendererOptions);
	that.directionsDisplay.setMap(that.map);
	$('#print-panel').removeClass('show');

	if (that.routeDefined) {
		that.enableLoadingLayer("modify");
	}

	if (that.routeWaypoints.length >= 3) {
		for (i=1; i<that.routeWaypoints.length - 1; i++) {
			waypoints.push({location: that.routeWaypoints[i].latLng, stopover: that.routeWaypoints[i].stopover});
		}
	}
	
	requestSettings = {
		origin: that.startLocationString,
		destination: that.endLocationString,
		travelMode: google.maps.TravelMode.DRIVING,
		unitSystem: that.mapUnitSystem,
		waypoints: waypoints,
		optimizeWaypoints: true,
		provideRouteAlternatives: true,
		avoidHighways: false,
		avoidTolls: false,
	}

	that.directionsService = new google.maps.DirectionsService();
	that.directionsService.route(requestSettings, function (response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			that.directionsDisplay.setDirections(response);
			if (!that.isListening) {
				google.maps.event.addListener(that.directionsDisplay, 'directions_changed', function () {
					that.parseDirections(that.directionsDisplay.getDirections());
				});
				that.isListening = true;
			}
		} else if (status == google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED) {
			that.showError('waypoints_exceeded');
			that.disableLoadingLayer();
		} else if (status == google.maps.DirectionsStatus.NOT_FOUND) {
			that.showError('zero_results');
			that.disableLoadingLayer();
		} else if (status == google.maps.DirectionsStatus.ZERO_RESULTS) {
			that.showError('zero_results');
			that.disableLoadingLayer();
		}
	});
};

/* 
	Parse and utilize response data from a Directions Service.
*/
RoadTripPlanner.prototype.parseDirections = function (response) {
	var that, overviewPath, jsonData, newRouteWaypoints, totalDistance, totalDuration, route, startLocation, endLocation, curWaypoint, waypointCount, routeBounds, urlString, viaString, waypointString, newPoiWaypoints, i, j;
	that = this;
	route = response.routes[0];
	//that.routeWaypoints = [];
	waypointCount = 0;
	totalDistance = 0;
	totalDuration = 0;
	startLocation = route.legs[0].start_address;
	endLocation = route.legs[route.legs.length - 1].end_address;
	routeBounds = new google.maps.LatLngBounds();
	urlString = 'https://maps.google.com/maps?saddr=';
	viaString = '&via=';
	newPoiWaypoints = [];
	newRouteWaypoints = [];

	that.$editStartTripLabel.text(that.startLocationString);
	that.$editEndTripLabel.text(that.endLocationString);
	that.$highlightsLayer.removeClass('show');

	that.$itineraryList.height('');

	// if a route isn't already present
	if (!that.routeDefined) {
		// fit route in viewport
		that.adjustMapBounds(route);
		// remove empty status from itinerary panel
		that.$uiPanel2.removeClass('empty');
	} else {
		//that.changePanelToState('#customize-trip-state');
		that.$selectedTrip.addClass('is-custom');
	}

	that.changePanelToState('#customize-trip-state');

	if (that.saveTripPreserved) {
		that.$selectedTrip.removeClass('is-custom');
		that.saveTripPreserved = false;
	} else {
		that.$selectedTrip.addClass('is-custom');
		that.savedTripIndex = -1;
	}

	// clear itinerary element
	that.$itineraryList.empty();
	// if waypoint order can be google optimized
	if (that.poiWaypoints != null && route.waypoint_order.length > 0) {
		// re-order poi waypoints array to match google optimized waypoint order
		for (i=0; i<that.poiWaypoints.length; i++) {
			newPoiWaypoints[i] = that.poiWaypoints[route.waypoint_order[i]];
		}
		// redeclare array with new order
		that.poiWaypoints = newPoiWaypoints;
	}

	for (i=0; i<route.legs.length; i++) {
		totalDistance += route.legs[i].distance.value;
		totalDuration += route.legs[i].duration.value;
		var newLabel;

		if (i == 0) {
			waypointCount += 1;
			// record first leg start location
			that.$itineraryList.append('<li class="start">'+ '<span class="index-num">'+waypointCount+'</span>' + that.startLocationString + '<span class="remove">x</span></li>');
			urlString += startLocation;
			newLabel = that.startLocationString;
		} else {
			waypointCount += 1;
			// record new leg location
			that.$itineraryList.append('<li class="poi" data-poi-title="' + that.poiWaypoints[i - 1].label + '">' + '<span class="index-num">'+waypointCount+'</span>' + that.poiWaypoints[i - 1].label + '<span class="remove">x</span></li>');
			urlString += '+to:' + route.legs[i].start_location;
			newLabel = that.poiWaypoints[i - 1].label;
		}

		// add waypoint to global array
		newRouteWaypoints.push({
			label: newLabel,
			latLng: route.legs[i].start_location,
			stopover: true
		});

		// loop through this leg's via waypoints
		for (j=0; j<route.legs[i].via_waypoints.length; j++) {
			curWaypoint = route.legs[i].via_waypoints[j];
			
			if (!that.routeDefined) {
				// adjust requested latlng with resolved latlng
				that.routeWaypoints[waypointCount].latLng = new google.maps.LatLng(curWaypoint.lat(), curWaypoint.lng());
			}
			urlString += '+to:' + curWaypoint.lat() + ',' + curWaypoint.lng();
			waypointString = "Waypoint";
			
			if (!that.isWaypointInArray(curWaypoint)) {
				that.routeWaypoints.splice(waypointCount, 0, {
					label: waypointString,
					latLng: new google.maps.LatLng(curWaypoint.lat(), curWaypoint.lng()),
					stopover: false
				});

				newRouteWaypoints.splice(waypointCount, 0, {
					label: waypointString,
					latLng: new google.maps.LatLng(curWaypoint.lat(), curWaypoint.lng()),
					stopover: false
				});
				
				that.$itineraryList.append('<li class="via" data-via-title="'+waypointString+'"><span class="index-num">'+(waypointCount+1)+'</span>'+waypointString+'<span class="remove">x</span></li>');
			} else {
				if (that.routeWaypoints[waypointCount].label != route.legs[i].end_address) {
					waypointString = that.routeWaypoints[waypointCount].label;
				}
				that.$itineraryList.append('<li class="via" data-via-title="'+waypointString+'"><span class="index-num">'+(waypointCount+1)+'</span>'+waypointString+'<span class="remove">x</span></li>');

				// add via waypoint to global array
				newRouteWaypoints.push({
					label: waypointString,
					latLng: new google.maps.LatLng(curWaypoint.lat(), curWaypoint.lng()),
					stopover: false
				});
			}

			// build via url parameter
			if (viaString == "&via=") {
				viaString += waypointCount;
			} else {
				viaString += ',' + waypointCount;
			}

			waypointCount += 1;
		}
	}

	waypointCount += 1;

	// record end location
	that.$itineraryList.append('<li class="end"><span class="index-num">'+waypointCount+'</span>' + that.endLocationString + '<span class="remove">x</span></li>');
	urlString += '+to:' + endLocation + viaString;

	newRouteWaypoints.push({
		label: endLocation,
		latLng: route.legs[route.legs.length - 1].end_location,
		stopover: true
	});

	that.routeWaypoints = newRouteWaypoints;

	// determine route stats
	that.routeDistance = totalDistance / 1000;
	that.routeDuration = totalDuration / 60 / 60;

	that.updateUnits();

	that.updateOriginMarkers(route.legs[0].start_location, route.legs[route.legs.length - 1].end_location);
	that.routePath = response.routes[0].overview_path;
	that.drawBufferPolygon(that.routePath);

	jsonData = {"points":[]};
	for (i=0; i<that.routePath.length; i++) {
		// build json format route data
		jsonData.points[i] = [that.routePath[i].lat(), that.routePath[i].lng()];
	}

	if (waypointCount > 2) {
		that.$itineraryList.addClass('is-editable');
	} else {
		that.$itineraryList.removeClass('is-editable');
	}

	that.$viewInGoogleLink.attr('href', urlString);
	that.updateViaMarkers();
	that.updatePoiMarkers(JSON.stringify(jsonData));
	that.updateOverviewMap();
	that.routeDefined = true;
	that.routePlaces.setRoute(response);
};

RoadTripPlanner.prototype.isWaypointInArray = function (waypoint) {
	var that = this;
	var is = false;
	var lat1, lat2, lng1, lng2;

	lat2 = waypoint.lat().toString();
	lat2 = lat2.slice(0, (lat2.indexOf(".")) + 4);
	//lng2 = waypoint.lng().toString();
	//lng2 = lng2.slice(0, (lng2.indexOf(".")) + 4);

	for (var i=0; i<that.routeWaypoints.length; i++) {
		lat1 = that.routeWaypoints[i].latLng.lat().toString();
		lat1 = lat1.slice(0, (lat1.indexOf(".")) + 4);
		//lng1 = that.routeWaypoints[i].latLng.lng().toString();
		//lng1 = lng1.slice(0, (lng1.indexOf(".")) + 4);

		if (lat1 == lat2) {
			is = true;
			break;
		}
	}
	return is;
};

RoadTripPlanner.prototype.updateOverviewMap = function () {
	var that = this, bounds, overlay, sw, ne, swPoint, nePoint;

	bounds = that.map.getBounds();
	if (!bounds) {
		return;
	}

	ne = bounds.getNorthEast();
	sw = bounds.getSouthWest();

	swPoint = that.overviewOverlay.getProjection().fromLatLngToContainerPixel(sw);
	nePoint = that.overviewOverlay.getProjection().fromLatLngToContainerPixel(ne);

	box = {x: Math.round(swPoint.x), y: Math.round(nePoint.y), width: Math.round(nePoint.x - swPoint.x), height: Math.round(swPoint.y - nePoint.y)};

	that.$focusBox.css({
		top: box.y,
		left: box.x,
		width: box.width,
		height: box.height
	});

	that.$segmentTop.css({
		top: box.y - 150,
		left: box.x,
		width: box.width + 2,
		height: 150
	});

	that.$segmentRight.css({
		top: 0,
		left: box.x + box.width + 2,
		width: box.x + box.width + 225,
		height: 150
	});

	that.$segmentBottom.css({
		top: box.y + box.height + 2,
		left: box.x,
		width: box.width + 2,
		height: 150 - box.y + box.height
	});

	that.$segmentLeft.css({
		top: 0,
		left: box.x - 225,
		width: 225,
		height: 150
	});
};

RoadTripPlanner.prototype.updateOriginMarkers = function (start, end) {
	var that = this;

	if (that.startMarker != null) {
		that.startMarker.setMap(null);
	}

	if (that.endMarker != null) {
		that.endMarker.setMap(null);
	}

	that.startMarker = new google.maps.Marker({
		position: start,
		map: that.map,
		icon: that.originMarkerImage
	});

	that.endMarker = new google.maps.Marker({
		position: end,
		map: that.map,
		icon: that.originMarkerImage,
		zIndex: 6
	});

	if (!that.$selectedTrip.hasClass('is-custom')) {
		google.maps.event.addListener(that.startMarker, 'click', function () {
			if (that.savedTripIndex >= 0) {
				that.enableHighlightsLayer(that.$featuredTripsLayer, that.savedTripIndex);
			}
		});

		google.maps.event.addListener(that.endMarker, 'click', function () {
			if (that.savedTripIndex >= 0) {
				that.enableHighlightsLayer(that.$featuredTripsLayer, that.savedTripIndex);
			}
		});
	}
	
};

RoadTripPlanner.prototype.updateViaMarkers = function () {
	var that = this, marker, markerIndex, i;

	if (that.viaMarkers.length > 0) {
		that.clearMarkers(that.viaMarkers);
		that.viaMarkers = [];
	}

	for (i=0; i<that.routeWaypoints.length - 1; i++) {
		// if item in array is a via waypoint
		if (!that.routeWaypoints[i].stopover) {
			// create via point marker
			marker = new google.maps.Marker({
				position: that.routeWaypoints[i].latLng,
				map: that.map,
				draggable: true,
				title: that.routeWaypoints[i].label,
				icon: that.viaMarkerImage,
				zIndex: 5
			});
			// keep track of marker
			that.viaMarkers.push(marker);
			markerIndex = that.viaMarkers.length - 1;
			// listen for clicks on via markers
			google.maps.event.addListener(marker, 'dragend', (function (marker, j, i) {
				return function () {
					// adjust latLng for existing via point with corresponding latLng from via marker
					that.routeWaypoints[i].latLng = that.viaMarkers[j].position;
					that.getDirections();
				}
			})(marker, markerIndex, i));
		}
	}
};
RoadTripPlanner.prototype.updatePoiMarkers = function (routeJson) {
	var that, i, obj, marker, markerIndex, poiLatLng, url;

	that = this;
	url = "/handlers/RoadTripsSearch.aspx";

	$.ajax({
		type: "POST",
		url: url,
		contentType: "application/json",
		dataType: 'json',
		data: routeJson
	})
	.done(function (result) {
		if (that.poiMarkers.length > 0) {
			that.clearMarkers(that.poiMarkers);
		}

		$('.highlights-panels-wrapper', that.$highlightsLayer).empty();

		// loop through results
		for (i=0; i<result.pois.length; i++) {
			obj = result.pois[i];
			poiLatLng = new google.maps.LatLng(obj.pnt[0], obj.pnt[1]);
			
			// create poi marker
			marker = new google.maps.Marker({
				position: poiLatLng,
				map: that.map,
				title: obj.ttl,
				icon: that.highlightsMarkerImage,
				zIndex: 4
			});
			// keep track of marker
			that.poiMarkers.push(marker);
			markerIndex = that.poiMarkers.length - 1;
			// create new infobox for current marker
			that.poiMarkers[markerIndex].infobox = new InfoBox(that.getPoiBoxOptions(obj.uid, obj.ttl, obj.dsc, obj.img));
			// listen for clicks on poi markers
			google.maps.event.addListener(marker, 'click', (function (marker, i) {
				return function () {
					if (that.openPoi != null) {
						that.openPoi.box.close();
					}

					that.poiMarkers[i].infobox.open(that.map, this);
					that.openPoi = {box: that.poiMarkers[i].infobox, latLng: this.position, title: this.title};
					that.map.panTo(this.position);
				}
			})(marker, markerIndex));
			// wait for infobox to show and become dom ready
			google.maps.event.addListener(that.poiMarkers[markerIndex].infobox, 'domready', function () {
				that.poiBoxHandler();
			});

			$('.highlights-panels-wrapper', that.$highlightsLayer).append(obj.html);
		}
	})
	.fail(function () {
		
	}).always(function (result) {
		that.disableLoadingLayer();
	});
};

RoadTripPlanner.prototype.poiBoxHandler = function () {
	var $scope = $('.poi-box'), that, i;

	that = this;
	
	for (i=0; i<that.poiWaypoints.length; i++) {
		if (that.poiWaypoints[i].label == $scope.find('.poi-title').text()) {
			$scope.addClass('isAdded');
		}
	}

	// listen for clicks on ui elements
	$scope.find('.add-to')
		.unbind('click')
		.bind('click', function (e) {
			e.preventDefault();
			var $target, $parent, guid, title, i;

			$target = $(this);
			$parent = $target.parents('.poi-box');

			guid = $parent.data('guid');
			title = $parent.find('.poi-title').text();

			i = that.getOptimalIndexForPoint(that.openPoi.latLng);
			that.routeWaypoints.splice(i + 1, 0, {label: title, stopover: true, latLng: that.openPoi.latLng});

			var newPoiWaypoints = [];
			for (var j=0; j<that.routeWaypoints.length; j++) {
				if (j != 0 && j < that.routeWaypoints.length - 1) {
					if (that.routeWaypoints[j].stopover) {
						newPoiWaypoints.push(that.routeWaypoints[j]);
					}
				}
			}

			that.poiWaypoints = newPoiWaypoints;
			that.getDirections();
		});

	$scope.find('.remove-from')
		.unbind('click')
		.bind('click', function (e) {
			e.preventDefault();
			var $target, title, i;
			$target = $(this);
			title = $target.parents('.poi-box').find('.poi-title').text();
			$('.itinerary-list li[data-poi-title="'+title+'"]').find('.remove').trigger('click');
			that.getDirections();
		});

	$scope.find('.view-more')
		.unbind('click')
		.bind('click', function (e) {
			e.preventDefault();

			var $target, title, i;
			$target = $(this);

			title = $target.parents('.poi-box').find('.poi-title').text();

			$('.highlights-panel', that.$highlightsLayer).each(function (i) {
				if ($(this).find('.highlight-title').text() == title) {
					that.enableHighlightsLayer(that.$highlightsLayer, i);
				}
			});
		});

	$scope.find('.poi-close')
		.unbind('click')
		.bind('click', function (e) {
			e.preventDefault();
			that.openPoi.box.close();
		});
};

RoadTripPlanner.prototype.getOptimalIndexForPoint = function (latLng) {
	var that = this;
	var distToWaypoint = 0;
	var nearestWaypointIndex;
	var shortestDist = 0;
	var nearestPoint;
	var optimalIndex;

	// find nearest waypoint
	for (var i=0; i<that.routeWaypoints.length; i++) {
		distToWaypoint = google.maps.geometry.spherical.computeDistanceBetween(latLng, that.routeWaypoints[i].latLng);

		if (i == 0) {
			shortestDist = distToWaypoint;
			nearestWaypointIndex = i;
		} else if (shortestDist > distToWaypoint) {
			shortestDist = distToWaypoint;
			nearestWaypointIndex = i;
		}
	}

	nearestPoint = that.routeWaypoints[nearestWaypointIndex];

	// compare distances from start/end
	var distToStart = google.maps.geometry.spherical.computeDistanceBetween(latLng, that.startMarker.position);
	var distToEnd = google.maps.geometry.spherical.computeDistanceBetween(latLng, that.endMarker.position);

	// if point is closer to start than end
	if (distToStart < distToEnd) {
		// find nearest point's distance to start
		var pointDistToStart = google.maps.geometry.spherical.computeDistanceBetween(nearestPoint.latLng, that.startMarker.position);
		// if new point is closer to start
		if (distToStart < pointDistToStart) {
			// new point should be before nearest point
			optimalIndex = nearestWaypointIndex - 1;
		} else {
			// new point should be after nearest point
			optimalIndex = nearestWaypointIndex + 1;
		}
	} else {
		// find nearest point's distance to end
		var pointDistToEnd = google.maps.geometry.spherical.computeDistanceBetween(nearestPoint.latLng, that.endMarker.position);
		// if new point is closer to end
		if (distToStart < pointDistToStart) {
			// new point should be after nearest point
			optimalIndex = nearestWaypointIndex + 1;
		} else {
			// new point should be before nearest point
			optimalIndex = nearestWaypointIndex - 1;
		}
	}
	return optimalIndex;
};

RoadTripPlanner.prototype.enableLoadingLayer = function (mode) {
	var that = this;
	that.$loadingOverlay.show().addClass('show');
	if (mode == 'loading') {
		that.$loadingOverlay.addClass('loading');
	} else {
		that.$loadingOverlay.removeClass('loading');
	}
};

RoadTripPlanner.prototype.disableLoadingLayer = function () {
	var that = this;
	that.$loadingOverlay.removeClass('show');
	setTimeout(function () {
		that.$loadingOverlay.hide();
	}, 400);
};

RoadTripPlanner.prototype.enableHighlightsLayer = function ($scope, startIndex) {
	var that = this, panelOffset, panelW, count;

	panelOffset = 340;
	panelW = 648;
	count = $('.highlights-panel', $scope).length;

	$('.highlights-panels-wrapper', $scope).css({
		left: -(panelW * startIndex) + panelOffset
	})
	$('.highlights-panel.active', $scope).removeClass('active');
	$('.highlights-panel', $scope).eq(startIndex).addClass('active');
	$('.highlights-panels-wrapper', $scope).width(count * panelW);
	$scope.addClass('show');

	$('.highlights-panel .highlight-overlay', $scope).unbind('click');
	$('.highlights-panel .highlight-overlay', $scope).bind('click', function (e) {
		e.preventDefault();
		var $targetPanel = $(this).parents('.highlights-panel');
		var targetIndex = $targetPanel.index();

		that.animateToHighlightPanel($scope, targetIndex);
	});

	$('.highlight-next-btn, .highlight-prev-btn', $scope).die('click');
	$('.highlight-next-btn, .highlight-prev-btn', $scope).live('click', function (e) {
		e.preventDefault();
		var $targetPanel = $(this).parents('.highlights-panel');
		var targetIndex = $targetPanel.index();
		var dir = 1;

		if ($(this).hasClass('highlight-prev-btn')) {
			dir = -1;
		}

		if (targetIndex + dir > count - 1 || targetIndex + dir < 0) {
			return;
		} else {
			that.animateToHighlightPanel($scope, targetIndex + dir);
		}
	});
	
	for (var i=0; i<that.poiWaypoints.length; i++) {
		$('.highlights-panel', $scope).each(function (j) {
			var $panel = $(this);
			if (that.poiWaypoints[i].label == $panel.find('.highlight-title').text()) {
				$panel.addClass('isAdded');
			}
		});
	}

	// listen for clicks on ui elements
	$('.highlights-panel', $scope).find('.add-to')
		.unbind('click')
		.bind('click', function (e) {
			e.preventDefault();
			var $target, $parent, title, latLng, i;

			$target = $(this);
			$parent = $target.parents('.highlights-panel');

			title = $parent.find('.highlight-title').text();
			latLng = that.getPoiLatLngByTitle(title);

			i = that.getOptimalIndexForPoint(latLng);
			that.routeWaypoints.splice(i + 1, 0, {label: title, stopover: true, latLng: latLng});

			var newPoiWaypoints = [];
			for (var j=0; j<that.routeWaypoints.length; j++) {
				if (j != 0 && j < that.routeWaypoints.length - 1) {
					if (that.routeWaypoints[j].stopover) {
						newPoiWaypoints.push(that.routeWaypoints[j]);
					}
				}
			}

			that.poiWaypoints = newPoiWaypoints;
			that.getDirections();
			if (that.openPoi != null) {
				that.openPoi.box.close();
			}
			$scope.animate({opacity: 0}, 500, function () {
				that.$highlightsLayer.removeClass('show').css({opacity:1});
			});
		});

	$('.highlights-panel', $scope).find('.remove-from')
		.unbind('click')
		.bind('click', function (e) {
			e.preventDefault();
			var $target, title, i;

			$target = $(this);
			title = $target.parents('.highlights-panel').find('.highlight-title').text();

			$('.itinerary-list li[data-poi-title="'+title+'"]').find('.remove').trigger('click');
			that.getDirections();

			if (that.openPoi != null) {
				that.openPoi.box.close();
			}
			$scope.animate({opacity: 0}, 500, function () {
				$(this).removeClass('show').css({opacity:1});
			});
		});

	$('.highlights-panel', $scope).find('.view-on-map')
		.unbind('click')
		.bind('click', function (e) {
			e.preventDefault();
			var $target;

			$target = $(this);
			$scope.removeClass('show').css({opacity:1});
			that.enableLoadingLayer("loading");
			that.loadSavedTrip($target.data('guid'));
		});
};

RoadTripPlanner.prototype.animateToHighlightPanel = function ($scope, index) {
	var panelOffset = 340, panelW = 648;

	$('.highlights-panel.active', $scope).removeClass('active');
	$('.highlights-panel', $scope).eq(index).addClass('active');

	$('.highlights-panels-wrapper', $scope).animate({
		left: -(panelW * index) + panelOffset
	}, 500);

	this.savedTripIndex = index;
};

RoadTripPlanner.prototype.updatePlacesMarkers = function (markers) {
	var that = this, obj;
	if (that.placesMarkers.length > 0) {
		that.clearMarkers(that.placesMarkers);
	}

	// loop through results
	for (i=0; i<markers.length; i++) {
		obj = markers[i];
		
		// keep track of marker
		that.placesMarkers.push(obj);
		markerIndex = that.placesMarkers.length - 1;
		// create new infobox for current marker
		that.placesMarkers[markerIndex].infobox = new InfoBox(that.getPoiBoxOptions("", obj.title, "", ""));
		// listen for clicks on poi markers
		google.maps.event.addListener(obj, 'click', (function (marker, i) {
			return function () {
				if (that.openPoi != null) {
					that.openPoi.box.close();
				}

				that.placesMarkers[i].infobox.open(that.map, this);
				that.openPoi = {box: that.placesMarkers[i].infobox, latLng: this.position, title: this.title};
				//that.map.panTo(markerData[i].latLng);
			}
		})(obj, markerIndex));
		// wait for infobox to show and become dom ready
		google.maps.event.addListener(that.placesMarkers[markerIndex].infobox, 'domready', function () {
			that.poiBoxHandler();
		});
	}
};

RoadTripPlanner.prototype.enablePoi = function () {
	var that = this;
	that.$poiKey.removeClass('inactive');
	that.$poiMessage.removeClass('inactive');
};

RoadTripPlanner.prototype.disablePoi = function () {
	var that = this;
	that.$poiKey.addClass('inactive');
	that.$poiMessage.addClass('inactive');
};

RoadTripPlanner.prototype.getPoiBoxOptions = function (guid, title, desc, image) {
	var that = this, str, opt;

	str = '<div class="poi-box" data-guid="' + guid + '">';
	str += '<span class="poi-close"></span>';

	if (image != "") {
		str += '<img src="' + image + '" height="89"/>';
	}
		str +='<div class="poi-box-inner"><p class="poi-title">' + title + '</p>';
	if (desc != "") {
		str += '<p class="poi-desc">' + desc + '</p>';
	}

	if (guid != "") {
		str += '<a href="#" class="view-more">'+that.localeHash.VIEW_MORE_INFORMATION+'</a>';
	}

	str += '<a href="#" class="add-to">'+that.localeHash.ADD_TO_ITINERARY+'</a>'+
	'<a href="#" class="remove-from">'+that.localeHash.REMOVE_FROM_ITINERARY+'</a>'+
	'</div>'+
	'<span class="arrow"></span>'+
	'</div>';

	opt = {
		content: str,
		alignBottom: true,
		disableAutoPan: false,
		pixelOffset: new google.maps.Size(-21, -55),
		zIndex: null,
		boxStyle: {width: "245px"},
		infoBoxClearance: new google.maps.Size(1, 1),
		isHidden: false,
		pane: "floatPane",
		closeBoxURL: "",
		enableEventPropagation: false,
	};

	return opt;
};

RoadTripPlanner.prototype.getCompletePath = function (route) {
	var polylineArr = [];
	var legs = route.legs;
	for (i=0;i<legs.length;i++) {
		var steps = legs[i].steps;
		for (j=0;j<steps.length;j++) {
			var nextSegment = steps[j].path;
			for (k=0;k<nextSegment.length;k++) {
				polylineArr.push(nextSegment[k]);
			}
		}
	}
	return polylineArr;
};

RoadTripPlanner.prototype.getBufferRadius = function (miles) {
	/* revamp to be more accurate and dynamic */
	var delta = 0;
	if (miles == 30) {
		delta = 110;
	} else if (miles == 20) {
		delta = 70;
	} else if (miles == 10) {
		delta = 30
	}
	return delta;
};

/* 
	Solve and draw a buffer polygon around the given polyline.
*/
RoadTripPlanner.prototype.drawBufferPolygon = function (path) {
	var that, polygons, polyArr, xy, clipper, delta, joinType, miterLimit, autoFix, offsetResult, scale, point, currentZoom, i;

	that = this;
	polygons = [];
	xyPath = [];
	polyArr = [];
	clipper = new ClipperLib.Clipper();
	joinType = ClipperLib.JoinType.jtRound;
	delta = that.getBufferRadius(that.bufferRadius);
	miterLimit = 2;
	scale = 1;
	autoFix = true;
	currentZoom = that.map.getZoom();

	//path = simplifyLine(0.01045, path);
	currentZoom = that.map.getZoom();
	that.map.setZoom(8);
	
	for (i=0; i<path.length; i++) {
		xy = that.mapOverlay.getProjection().fromLatLngToContainerPixel(path[i]); 
		xyPath.push({'X': xy.x, 'Y': xy.y});
	}

	polygons.push(xyPath);
	that.reverseCopyPolygon(polygons);
	offsetResult = clipper.OffsetPolygons(polygons, delta * scale, joinType, miterLimit, autoFix);

	for (i=0; i<offsetResult[0].length; i++) {
		point = that.mapOverlay.getProjection().fromContainerPixelToLatLng(new google.maps.Point(offsetResult[0][i].X, offsetResult[0][i].Y));
		polyArr.push(point);
	}

	if (that.bufferPolygon != null) {
		that.bufferPolygon.setMap(null);
	}

	that.bufferPolygon = new google.maps.Polygon({
		paths: polyArr,
		strokeColor: '#009B3A',
		strokeOpacity: 0.35,
		strokeWeight: 1,
		fillColor: '#009B3A',
		fillOpacity: 0.15,
		geodesic: true
	});

	that.bufferPolygon.setMap(that.map);
	that.map.setZoom(currentZoom);
};

/* 
	Create a flat polygon point array from the given polygon.
*/
RoadTripPlanner.prototype.reverseCopyPolygon = function (poly) {
	var k, klen = poly.length, len, j;

	for (k = 0; k < klen; k++) {
		len = poly[k].length;
		poly[k].length = len * 2 - 2;
		for (j = 1; j <= len - 2; j++) {
			poly[k][len - 1 + j] = {
				X: poly[k][len - 1 - j].X,
				Y: poly[k][len - 1 - j].Y
			}
		}
	}
};

RoadTripPlanner.prototype.clearMarkers = function (arr) {
	var that = this, i;
	for (i=0; i<arr.length; i++) {
		if (arr[i].infobox) {
			arr[i].infobox.close();
		}
		arr[i].setMap(null);
	}
	arr = [];
};

RoadTripPlanner.prototype.adjustMapBounds = function (route) {
	var that = this, overlay, sw, point, offsetPoint, latLng;

	that.map.fitBounds(route.bounds);
	overlay = new google.maps.OverlayView();
	overlay.draw = function() {};
	overlay.setMap(that.map);

	sw = route.bounds.getSouthWest();
	// convert southwest bounds to pixels
	point = overlay.getProjection().fromLatLngToContainerPixel(sw);
	// adjust position for left ui panel
	offsetPoint = new google.maps.Point(point.x - 320, point.y);
	// convert back to latlng format
	latLng = overlay.getProjection().fromContainerPixelToLatLng(offsetPoint);
	// extend bounds to include new point	
	route.bounds.extend(latLng);
	that.map.fitBounds(route.bounds);
};

/*-----------------------------
 Binding Events
-----------------------------*/

RoadTripPlanner.prototype.bindEvents = function () {
	var that = this;
	that.bindResizeEvents();
	that.bindPanelEvents();
};

RoadTripPlanner.prototype.bindResizeEvents = function () {
	var that = this;
	$(window).bind('resize', function () {
		that.scaleMap();
	});
};

RoadTripPlanner.prototype.bindPanelEvents = function () {
	var that = this;

	that.$uiTabs.bind('click', function (e) {
		e.preventDefault();
		
		var target;
		$target = $(this);

		that.$uiTabs.removeClass('active');
		that.$uiTabPanels.removeClass('active');
		$target.addClass('active');
		$($target.attr('href')).addClass('active');
		that.updateInterface();
	});

	that.$getDirectionsBtns.bind('click', function (e) {
		e.preventDefault();

		var $target = $(this), allGeocoded;
		allGeocoded = true;

		if (that.$originField.val() != '' && that.$destinationField.val() != '') {
			if (!that.$newTripState.hasClass('edit-mode')) {
				that.routeWaypoints = [];
				that.poiWaypoints = [];
			}
			
			that.checkSearchFields();
		}
	});

	that.$editTripBtns.bind('click', function (e) {
		e.preventDefault();

		that.$newTripState.addClass('edit-mode');
		that.$originField.removeClass('isGeocoded');
		that.$destinationField.removeClass('isGeocoded');
		that.changePanelToState($(this).attr('href'));
	});

	that.$closeTripBtns.bind('click', function (e) {
		e.preventDefault();
		// remove route from map
		that.$originField.val('').removeClass('isGeocoded');
		that.$destinationField.val('').removeClass('isGeocoded');
		that.$newTripState.removeClass('edit-mode');
		that.$originField.removeClass('.isGeocoded');
		that.changePanelToState($(this).attr('href'));
		that.routeDefined = false;
		that.directionsDisplay.setMap(null);
		that.clearMarkers(that.poiMarkers);
		that.clearMarkers(that.viaMarkers);
		that.clearMarkers(that.placesMarkers);
		that.startMarker.setMap(null);
		that.endMarker.setMap(null);
		that.bufferPolygon.setMap(null);
		// intinerary panel resets
		that.$itineraryList.empty();
		that.$tripLabel.text('');
		that.$uiPanel2.addClass('empty');
		that.$durationDisplay.html('0 <span>'+that.localeHash.HOURS+' <br/>'+that.localeHash.DRIVE_TIME+'</span>');
		that.$distanceDisplay.html('0 <span>'+that.unitLabel+'</span>');
		that.$itineraryList.height('');
	});

	$('.itinerary-list .remove').live('click', function (e) {
		var $target, targetIndex;

		$target = $(this).parents('li');
		targetIndex = $target.index();

		if ($target.hasClass('start')) {
			return;
		} else if ($target.hasClass('end')) {
			return;
		} else if ($target.hasClass('poi')) {
			// find index of poi in scheme of the route array
			that.poiWaypoints.splice(that.getPoiIndexByTitle($target.data('poi-title')), 1);
		}
		// route array index matches itinery, remove at target index
		that.routeWaypoints.splice(targetIndex, 1);
		that.getDirections();
	});

	$('.unit-toggle').live('click', function (e) {
		e.preventDefault();
		var $target = $(this);

		if ($target.attr('id') == "metric-toggle") {
			that.unitLabel = that.localeHash.KILOMETERS;
			$('.metric-toggle').addClass('selected');
			$('.imperial-toggle').removeClass('selected');
			that.mapUnitSystem = google.maps.UnitSystem.METRIC;
		} else {
			that.unitLabel = that.localeHash.MILES;
			$('.metric-toggle').removeClass('selected');
			$('.imperial-toggle').addClass('selected');
			that.mapUnitSystem = google.maps.UnitSystem.IMPERIAL;
		}

		that.updateUnits();
	});

	that.$poiMessage.bind('click', function (e) {
		e.preventDefault();
		that.map.panTo(that.startMarker.position);
		that.map.setZoom(that.settings.poiZoomLevel);
	});

	$('.overview-map-canvas-wrapper').bind('mousedown', function (e) {
		var $scope = $(this);

		that.updateMapFromOverview($scope, e);

		$scope.bind('mouseup', function () {
			$scope.unbind('mousemove');
		});

		$scope.bind('mousemove', function (e) {
			that.updateMapFromOverview($scope, e);
		});
	});

	$('.zoom-controls').bind('click', function (e) {
		e.preventDefault();
		var $target, currentZoom;

		$target = $(e.target);
		currentZoom = that.map.getZoom();


		if ($target.hasClass('disabled')) {
			return;
		}
		if ($target.hasClass('zoom-in')) {
			that.map.setZoom(currentZoom + 1);
		} else if ($target.hasClass('zoom-out')) {
			that.map.setZoom(currentZoom - 1);
		}
	});

	$('li a', that.$categoryList).bind('click', function (e) {
		e.preventDefault();

		var $target = $(this), cat;
		cat = $target.data('category');

		if ($target.hasClass('selected')) {
			$target.removeClass('selected');
			that.routePlaces.setTypes([""]);
			return;
		} else {
			$('li a', that.$categoryList).removeClass('selected');
			$target.addClass('selected');
		}
		that.
		routePlaces.setTypes(that.getSelectedCategories('selected'));
	});

	$('body').on('placesadded', function (e) {
		that.updatePlacesMarkers(e.markers)
	})

	$('.login-signup .login, .save-login-btn').live('click', function (e) {
		e.preventDefault();
		openLogin();
	});

	$('.login-signup .signup, .save-signup-btn').live('click', function (e) {
		e.preventDefault();
		openRegister();
	});

	$('.share-bar .email').bind('click', function (e) {
		e.preventDefault();
		shareoverlay();
	});


	$('.share-bar .favorite').bind('click', function (e) {
		e.preventDefault();
		//if (that.routeDefined) {
			$('#save-panel').addClass('show');
			var label = that.$tripLabel.text();
			if (label != "") {
				$('#save-trip-field').val(label + " copy");
			} else {
				$('#save-trip-field').val(that.$editStartTripLabel.text() + " to " + that.$editEndTripLabel.text());
			}

			$('#save-panel .save-trip-btn').unbind('click');
			$('#save-panel .save-trip-btn').bind('click', function (e) {
				e.preventDefault();
				if ($('#save-trip-field').val() != "") {
					that.saveTrip();
				}
			});
		//}
	});

	$('#save-panel .close-btn').bind('click', function (e) {
		e.preventDefault();
		$('#save-panel').removeClass('show');
	});

	$('.share-bar .print').bind('click', function (e) {
		e.preventDefault();
		//if (that.routeDefined) {
			$('#print-panel .itinerary-summary').empty().append($('.ui-panel-inner', that.$uiPanel2).clone());
			var label = that.$tripLabel.text();
			if (label != "") {
				$('#print-panel .trip-title').text(label);
			} else {
				$('#print-panel .trip-title').text(that.$editStartTripLabel.text() + " to " + that.$editEndTripLabel.text());
			}
			$('#print-panel').addClass('show');
		//}
	});

	$('#print-panel .close-btn').bind('click', function (e) {
		e.preventDefault();
		$('#print-panel').removeClass('show');
	});

	$('#print-panel .print-trip-btn').bind('click', function (e) {
		e.preventDefault();
		window.print();
	});

	$('#not-found-panel .close-btn, #not-found-panel .close-trip-btn').bind('click', function (e) {
		e.preventDefault();
		$('#not-found-panel').removeClass('show');
	});

	$('.highlight-close-btn').live('click', function () {
		$(this).parents('.highlights-panels-wrapper').parent().removeClass('show');
	});

	$('.favorites-list a').live('click', function (e) {
		e.preventDefault();
		var $target = $(this);
		var $link = $target;

		$target = $target.parent();

		if ($(e.target).hasClass('delete-trip')) {
			that.deleteSavedTrip($link.data('guid'));
			return;
		}

		if ($link.hasClass('user-trip')) {
			that.loadSavedTrip($link.data('guid'));
			that.savedTripIndex = -1;
			that.$featuredTripsLayer.removeClass('show');
		} else {
			that.savedTripIndex = $target.index() - $('.favorites-list .user-trip').length;
			that.enableHighlightsLayer(that.$featuredTripsLayer, that.savedTripIndex);
		}

		$('#home-screen').animate({opacity: 0}, 500, function () {
			$(this).addClass('inactive');
		});

	});

	$('.feature-tile').live('click', function (e) {
		e.preventDefault();
		var $target = $(this);
		that.savedTripIndex = $target.index();
		that.enableHighlightsLayer(that.$featuredTripsLayer, that.savedTripIndex);

		$('#home-screen').animate({opacity: 0}, 500, function () {
			$(this).addClass('inactive');
		});

	});

	$('#oops-panel .close-btn, #oops-panel .close-alert-btn').bind('click', function (e) {
		e.preventDefault();
		$('#oops-panel').removeClass('show');
	});

	$('body').bind('placesremoved', function () {
		that.clearMarkers(that.placesMarkers);
	});

	$('.logo-link').bind('click', function (e) {
		e.preventDefault();
		that.enableHighlightsLayer(that.$featuredTripsLayer, 0);
	});

	$(window).bind('resize', function () {
		that.updateInterface();
	});

	that.updateInterface();
};

RoadTripPlanner.prototype.showError = function (type) {
	var that = this;

	if (type == 'waypoints_exceeded') {
		$('#oops-panel')
			.addClass('waypoints-error')
			.removeClass('results-error')
			.addClass('show');

	} else if (type == 'zero_results') {
		$('#oops-panel')
			.addClass('results-error')
			.removeClass('waypoints-error')
			.addClass('show');
	}
};

RoadTripPlanner.prototype.getPoiIndexByTitle = function (title) {
	for (var i=0; i<this.poiWaypoints.length; i++) {
		if (this.poiWaypoints[i].label == title) {
			return i;
		}
	}
};

RoadTripPlanner.prototype.getPoiLatLngByTitle = function (title) {
	for (var i=0; i<this.poiMarkers.length; i++) {
		if (this.poiMarkers[i].title == title) {
			return new google.maps.LatLng(this.poiMarkers[i].position.lat(), this.poiMarkers[i].position.lng());
		}
	}
};

RoadTripPlanner.prototype.getRouteIndexByTitle = function (title) {
	var index = -1;
	$('.itinerary-list li').each(function (i) {
		
		if ($(this).data('poi-title') == title) {
			index = i;
		}
	});
	console.log("returning index " + index)
	return index;
};

RoadTripPlanner.prototype.saveTrip = function () {
	var label = $('#save-trip-field').val();
	var that = this;
	var url = "/handlers/RoadTripSave.aspx";
	var tripJson =  JSON.stringify(that.getTripJson(label));

	$.ajax({
		type: "POST",
		url: url,
		contentType: "application/json",
		data: tripJson
	})
	.done(function (result) {
		console.log('trip saved', result);
		$('#save-panel').removeClass('show');
		that.$tripLabel.text(label);
		that.$selectedTrip.removeClass('is-custom');
		that.saveTripPreserved = true;
		that.updateShareLinks(result);
		that.updateFavoritesList();
	})
	.fail(function (e, e1, e2) {
		console.log('trip not saved:', e, e1, e2);
	});
};

RoadTripPlanner.prototype.updateFavoritesList = function () {
	var that = this;
	var url = "/handlers/RoadTripFavorites.aspx";
	
	$.ajax({
		type: "POST",
		url: url,
		dataType: "text"
	})
	.done(function (result) {
		$('.favorites-list').html(result);
	})
	.fail(function (e, e1, e2) {
		console.log("update favs failed")
	});
};

RoadTripPlanner.prototype.deleteSavedTrip = function (guid) {
	var that = this;
	var url = "/handlers/RoadTripDelete.aspx?id=" + guid;

	$.ajax({
		type: "GET",
		url: url,
	})
	.done(function (result) {
		that.updateFavoritesList();
		console.log('trip deleted', result);
	})
	.fail(function (e, e1, e2) {
		console.log('trip not deleted:', e, e1, e2);
	});
};

RoadTripPlanner.prototype.getTripJson = function (label) {
	var obj = {};
	var that = this;

	obj.title = label;
	obj.hours = Math.round(that.routeDuration);
	obj.km = Math.round(that.routeDistance);
	obj.mi = Math.round(that.routeDistance * .62137);
	obj.stops = [];

	for (var i=0; i<that.routeWaypoints.length; i++) {
		obj.stops[i]= {
			label: that.routeWaypoints[i].label,
			stopover: that.routeWaypoints[i].stopover,
			latLng: [that.routeWaypoints[i].latLng.lat(), that.routeWaypoints[i].latLng.lng()]
		};
	}

	return obj;
};

RoadTripPlanner.prototype.updateShareLinks = function (guid) {
	var $link = $('.share-bar .facebook');
	var label = this.$tripLabel.text();

	$link.attr('href', "http://facebook.com/sharer.php?u=" + location.href + "?trip=" + guid);

	$link = $('.share-bar .twitter');

	if (label != "") {
		$link.attr('href', "http://twitter.com/share?text="+label+"&url=" + location.href + "?trip=" + guid);
	} else {
		$link.attr('href', "http://twitter.com/share?text=Road Trips&url=" + location.href + "?trip=" + guid);
	}

	var tripname = this.$tripLabel.text();

	if (tripname == "") {
		tripname = "Road Trips";
	}

	$('#shareu').val(location.host + location.pathname + '?trip=' + guid);
	$('#share-overlay span.sharename').html(tripname);
	$('#share-overlay input#t').attr('value', tripname.replace(/\+/g, ' '));
};

RoadTripPlanner.prototype.loadSavedTrip = function (guid) {
	var that = this;

	var url = "/handlers/RoadTripInfo.aspx?id=" + guid;
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json"
	})
	.done(function (result) {
		var count = result.stops.length;
		
		that.$newTripState.removeClass('edit-mode');
		that.$selectedTrip.removeClass('is-custom');
		that.$tripLabel.text(result.title);
		that.routeWaypoints = [];
		that.poiWaypoints = [];
		that.updateInterface();

		for (var i=0; i<count; i++) {
			if (i == 0) {
				that.$originField.val(result.stops[i].label);
			} else if (i == count - 1) {
				that.$destinationField.val(result.stops[i].label);
			} else if (result.stops[i].stopover) {
				that.poiWaypoints.push({
					label: result.stops[i].label, 
					stopover: result.stops[i].stopover, 
					latLng: new google.maps.LatLng(result.stops[i].latLng[0], result.stops[i].latLng[1])
				});
			}

			that.routeWaypoints[i] = {
				label: result.stops[i].label, 
				stopover: result.stops[i].stopover, 
				latLng: new google.maps.LatLng(result.stops[i].latLng[0], result.stops[i].latLng[1])
			}
		}
		that.routeDefined = false;
		that.saveTripPreserved = true;
		that.$selectedTrip.removeClass('is-custom');
		$('a[href="#roadtrips-panel"]').trigger('click');
		that.checkSearchFields();
		that.updateShareLinks(guid);
	})
	.fail(function (error) {
		$('#not-found-panel').addClass('show');
	});
}

RoadTripPlanner.prototype.getSelectedCategories = function (filter) {
	var that = this;
	var $checkedBoxes;
	var result = [];

	$checkedBoxes = $('a.gplace.selected', that.$categoryList);

	$checkedBoxes.each(function () {
		var cat = $(this).data('category');
		var split = cat.split('|');

		if (split.length != 1) {
			split = cat.split('|');
			result.push(split[0]);
			result.push(split[1]);
		} else {
			result.push(cat);
		}
	});
	
	return result;
}

RoadTripPlanner.prototype.updateMapFromOverview = function ($scope, e) {
	var that = this, parentX, parentY, targetX, targetY, overlay, offsetPoint, latLng;

	parentX = $scope.offset().left;
	parentY = $scope.offset().top;
	targetX = e.clientX;
	targetY = e.clientY;
	offsetX = targetX - parentX;
	offsetY = targetY - parentY;

	offsetPoint = new google.maps.Point(offsetX, offsetY);
	latLng = that.overviewOverlay.getProjection().fromContainerPixelToLatLng(offsetPoint);
	that.map.setCenter(latLng);
};

RoadTripPlanner.prototype.checkSearchFields = function () {
	var that = this, allGeocoded = true;
	that.enableLoadingLayer("loading");
	if (!that.$originField.hasClass('isGeocoded')) {
		allGeocoded = false;
		that.geocodeLocaleString(that.$originField);
	}

	if (!that.$destinationField.hasClass('isGeocoded')) {
		allGeocoded = false;
		that.geocodeLocaleString(that.$destinationField);
	}

	if (allGeocoded) {
		that.startLocationString = that.$originField.val();
		that.endLocationString = that.$destinationField.val();
		$('#home-screen').addClass('inactive');
		that.getDirections();
	}
};

RoadTripPlanner.prototype.geocodeLocaleString = function ($field) {
	var that = this, str, url, finalStr;

	str = $field.val();
	url = 'http://maps.googleapis.com/maps/api/geocode/json?address='+str+'&components=country:US&sensor=false';

	that.geocoder.geocode({ 'address': $field.val()}, function(data, status) {
		var i, components, type, admin1Long, admin2Short, admin2, locality, sublocality, city, state;

		if (status == "OK") {
			components = data[0].address_components;

			for (i=0; i<components.length; i++) {
				type = components[i].types[0];
				if (type == 'locality') {
					locality = components[i].short_name;
				} else if (type == 'sublocality') {
					sublocality = components[i].short_name;
				} else if (type == 'administrative_area_level_2') {
					admin2 = components[i].short_name;
				} else if (type == 'administrative_area_level_1') {
					admin1Short = components[i].short_name;
					admin1Long = components[i].long_name;
				}
			}

			if (admin2) {
				city = admin2;
			}
			if (locality) {
				city = locality;
			}
			if (sublocality) {
				city = sublocality;
			}

			if (city) {
				state = admin1Short;
				finalStr = city + ', ' + state;
			} else {
				state = admin1Long;
				finalStr = state;
			}
		} else if (data.status == "OVER_QUERY_LIMIT") {
			finalStr = str;
		} else {
			
		}
		$field.addClass('isGeocoded');
		$field.val(finalStr);
		that.checkSearchFields();
	});
};

RoadTripPlanner.prototype.changePanelToState = function (selector) {
	var that = this, $state = $(selector), stateHeight, panelHeight;
	$state.addClass('active').siblings('.panel-state').removeClass('active');

	that.updateInterface();
};

RoadTripPlanner.prototype.updateInterface = function () {
	var that = this, $panel1, winHeight, heightThreshold;

	winHeight = that.$mapCanvasWrapper.height();
	heightThreshold = winHeight - that.settings.panelBottomPadding;
	$inner = $('.tab-panel-inner', that.$uiPanel1);

	that.$uiPanel1.height('');
	$inner.height('');

	if (that.$uiPanel1.height() > heightThreshold) {
		that.$uiPanel1.height(heightThreshold);
		// set element to appropriate height minus tab height
		$inner.height(heightThreshold - that.$uiTabs.outerHeight() - 1);
		// re-initialize scroll bar with new height
		that.enableScrollBar($inner, $inner.height());
		// set flag
		that.uiPanel1Scaled = true;
	} else {
		// prevent duplicate resets
		if (that.uiPanel1Scaled) {
			// reset scroll bar elements
			$('.slimScrollBar, .slimScrollRail', that.$uiPanel1).hide();
			$('.slimScrollDiv', that.$uiPanel1).height('');
			// set flag
			that.uiPanel1Scaled = false;
		}
	}

	
		//that.enableScrollBar(that.$itineraryList, 241);
	
		//$('.slimScrollBar, .slimScrollRail', that.$uiPanel2).hide();
		//$('.slimScrollDiv', that.$uiPanel2).height('');
	
	that.updateOverviewMap();
};

RoadTripPlanner.prototype.loadDefaultTrip = function () {
	var that = this, guid;
	guid = this.getUrlParam('trip');

	if (guid != "") {
		that.loadSavedTrip(guid);
	}
};

RoadTripPlanner.prototype.getUrlParam = function (name) {

	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if ( results == null ) {
		return "";
	} else {
		return results[1];
	}
};

RoadTripPlanner.prototype.enableScrollBar = function ($el, height) {
	$el.slimScroll({
		position: 'right',
		height: height,
		railVisible: true,
		alwaysVisible: true,
		borderRadius: 0,
		railBorderRadius: 0,
		distance: 0,
		opacity: 1,
		railOpacity: 1,
		railColor: '#E4E4E4',
		color: '#FFFFFF'
	});
};

RoadTripPlanner.prototype.updateUnits = function () {
	var that = this, convertedDistance;

	if (that.unitLabel == that.localeHash.MILES) {
		convertedDistance = that.routeDistance * .62137;
	} else if (that.unitLabel == that.localeHash.KILOMETERS) {
		convertedDistance = that.routeDistance;
	}

	$('.route-info-wrapper .distance').html('<p class="distance">'+Math.round(convertedDistance)+' <span>'+that.unitLabel+'</span></p>');

	that.$durationDisplay.html('<p class="duration">'+Math.round(that.routeDuration)+' <span>Hours <br/>'+that.localeHash.DRIVE_TIME+'</span></p>');
	//that.$distanceDisplay.html('<p class="distance">'+Math.round(convertedDistance)+' <span>'+that.unitLabel+'</span></p>');
};