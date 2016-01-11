/*global console, google, jQuery, RouteDivider */
/**
 * @class VisibleRoutePoints
 * Keeps track of the equally spaced points on a route 
 * that are currently visible returning those that are
 * to a callback (onUpdate).
 *
 * The callback will be called whenever the route is updated
 * or whenever the map finishes moving/redrawing.
 *
 * @returns {void}
 * @param {object} settings Configuration properties.
 * @param {google.maps.Map} settings.map (Required) The map to track updates/redraws on.
 * @param {function} settings.onUpdate (Required) The callback to fire every time the map/route changes.
 * @param {number} settings.overscan (Optional) The amount to overscan the visible map by, when filtering points. This allows us to include points just off the edge of the screen. Default 1.25
 * @param {google.maps.DirectionsResult} settings.route (Optional) The route to subdivide.
 * @param {number} settings.separation The number of meters, between points, to separate the route points. Default 20,000
 * @author Nick Davison
 */
function VisibleRoutePoints(settings) {
    "use strict";
    this.settings = jQuery.extend({
        map: null,
        onUpdate: function (points) {
            return points;
        },
        overscan: 1.25,
        route: null,
        separation: 20000,
        showSearchPoints: false
    }, settings);
    this.map = null;
    this.route = null;
    this.routeDivider = null;
    this.lastMapCenter = null;
    this.lastMapZoom = null;
    this.mapOverlay = null;
    this.mapProjection = null;
    this.points = [];
    this.setMap(this.settings.map);
    this.setRoute(this.settings.route);
}

/**
 * Store the map to watch for updates.
 * Bind map updates to call the callback.
 *
 * @returns {void}
 * @param {google.maps.Map} map The map to store.
 * @author Nick Davison
 */
VisibleRoutePoints.prototype.setMap = function (map) {
    "use strict";
    var that = this;
    if ((map === undefined) || (map === null)) {
        this.map = null;
        return;
    }
    this.map = map;
    // create map overlay projection
    this.mapOverlay = new google.maps.OverlayView();
    this.mapOverlay.draw = function(){};
    this.mapOverlay.setMap(this.map);
    //this.mapProjection = this.mapOverlay.getProjection();

    google.maps.event.addListener(this.map, 'idle', function () {
        that.callbackWithVisiblePoints();
    });
};

VisibleRoutePoints.prototype.showSearchPoints = function () {
    "use strict";
    var i;
    // Ensure the markers list exists
    if (this.searchPointMarkers === undefined) {
        this.searchPointMarkers = [];
    }
    for (i = 0; i < this.searchPointMarkers.length; i += 1) {
        this.searchPointMarkers[i].setMap(null);
    }
    this.searchPointMarkers = [];
    if (this.settings.showSearchPoints) {
        for (i = 0; i < this.points.length; i += 1) {
            this.searchPointMarkers.push(new google.maps.Marker({
                position: this.points[i],
                title: "Point " + i
            }));
            this.searchPointMarkers[i].setMap(this.settings.map);
        }
    }
};

/**
 * Set the route to test subdivide and return points from.
 * If undefined or null are passed, clear any prior route/RouteDivider.
 * Once the route/RouteDivider are set, call the callback
 * so the initial set of points are rendered.
 *
 * @returns {void}
 * @param {google.maps.DirectionsResult} route (Optional) The route to use. Leave undefined/null to clear.
 * @author Nick Davison
 */
VisibleRoutePoints.prototype.setRoute = function (route) {
    "use strict";
    if ((route === undefined) || (route === null)) {
        this.route = null;
        this.routeDivider = null;
        this.points = [];
    } else {
        this.route = route;
        this.routeDivider = new RouteDivider(route);
        this.points = this.routeDivider.getLatLngsEveryNMeters(this.settings.separation);
    }
    // Show the points if required
    this.showSearchPoints();
    // Report the visible points back
    this.callbackWithVisiblePoints();
};

/**
 * Get the list of all points - both those
 * currently visible in the viewport and outside.
 *
 * @returns {array}
 * @author Nick Davison
 */
VisibleRoutePoints.prototype.getAllPoints = function () {
    "use strict";
    return this.points;
};

/**
 * Get the list of currently visible points.
 *
 * @returns {array}
 * @author Nick Davison
 */
VisibleRoutePoints.prototype.getVisiblePoints = function () {
    "use strict";
    var result;
    // Return an empty list if no map has been set
    if (this.map === null) {
        return [];
    }
    // Return an empty list if no route divider has been set
    if (this.routeDivider === null) {
        return [];
    }
    // Return an empty list if there are no points stored anyway
    if (this.points.length === 0) {
        return [];
    }
    try {
        result = this.routeDivider.filterLatLngsByVisibleMap(this.map, this.getAllPoints(), this.settings.overscan);
        return result;
    } catch (e) {
        console.log("Error in VisibleRoutePoints.getVisiblePoints");
        console.log(e);
        return [];
    }
};

/**
 * Get the list of currently visible points and send them to the onUpdate callback.
 *
 * @returns {void}
 * @author Nick Davison
 */
VisibleRoutePoints.prototype.callbackWithVisiblePoints = function () {
    "use strict";
    var newCenterLatLng,
        newMapZoom,
        newCenterPoint,
        oldCenterPoint,
        pixelDiff;

    newCenterLatLng = this.map.getCenter();
    newMapZoom = this.map.getZoom();

    if (this.lastMapCenter != null && this.lastMapZoom == newMapZoom) {
        // determine how much the map has been panned
        newCenterPoint = this.mapOverlay.getProjection().fromLatLngToContainerPixel(newCenterLatLng);
        oldCenterPoint = this.mapOverlay.getProjection().fromLatLngToContainerPixel(this.lastMapCenter);
        pixelDiff = {};
        pixelDiff.x = Math.abs(newCenterPoint.x - oldCenterPoint.x);
        pixelDiff.y = Math.abs(newCenterPoint.y - oldCenterPoint.y);
        // if pan distance doesn't meet threshold, don't reload
        if (pixelDiff.x < 150 && pixelDiff.y < 150) {
            return;
        }
    }

    this.lastMapCenter = newCenterLatLng;
    this.lastMapZoom = newMapZoom;
    this.settings.onUpdate(this.getVisiblePoints());
};