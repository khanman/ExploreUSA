/*global console, google */
function RouteDivider(route) {
    "use strict";
    try {
        if (route !== undefined) {
            this.setRoute(route);
        }
    } catch (e) {
        console.log("Exception in RouteDivider initialization");
        console.log(e);
        console.log("this", this);
        console.log("route", route);
    }
}

/**
 * Store a route. If there is anything wrong with the route element passed, throw an exception.
 *
 * @returns {void}
 * @param {route} route The Google Maps route to store.
 * @author Nick Davison
 */
RouteDivider.prototype.setRoute = function (route) {
    "use strict";
    // Clear any existing route
    delete this.route;
    // Catch the various ways the route could be broken and throw exceptions.
    if (route === undefined) {
        throw "RouteDivider.setRoute: route is undefined";
    }
    if (route.routes === undefined) {
        throw "RouteDivider.setRoute: route.route is undefined. Was it a Google Maps route?";
    }
    if (route.routes[0] === undefined) {
        throw "RouteDivider.setRoute: route.route[0] is undefined. Was it a valid Google Maps route?";
    }
    if (route.routes[0].legs === undefined) {
        throw "RouteDivider.setRoute: route.route[0].legs is undefined. Was it a valid Google Maps route?";
    }
    if (route.routes[0].legs[0] === undefined) {
        throw "RouteDivider.setRoute: route.route[0].legs[0] is undefined. Was it a valid Google Maps route?";
    }
    try {
        // Store the route
        this.route = route;
        // Get the total distance (only needs calculating once as it's set)
        this.distance = this.getTotalRouteDistance();
        // Build a list of all of the path points and their distances
        this.buildPathPointsAndDistances();
    } catch (e) {
        console.log("Exception in RouteDivider.setRoute");
        console.log(e);
        console.log("this", this);
        console.log("route", route);
    }
};

/**
 * Get the total route distance in meters.
 * If there's no route stored, it will throw an exception.
 *
 * returns {numeric}
 * @author Nick Davison
 */
RouteDivider.prototype.getTotalRouteDistance = function () {
    "use strict";
    var distance = 0,
        legs,
        legCount;
    try {
        // If the route's not stored, throw an exception.
        if (this.route === undefined) {
            throw "RouteDivider.getTotalRouteDistance: No route stored to parse.";
        }
        // Go through all of the legs
        legs = this.route.routes[0].legs;
        for (legCount = 0; legCount < legs.length; legCount += 1) {
            distance += legs[legCount].distance.value;
        }
        // Return the total distance
        return distance;
    } catch (e) {
        console.log("Exception in RouteDivider.getTotalRouteDistance");
        console.log(e);
        console.log("this", this);
        return distance;
    }
};

/**
 * Scan through all of the legs, their steps and their path points.
 * Build an array of all path points with their distance from the origin
 * and their distance to the next point.
 *
 * As this list can get LONG (like 75,000 points long for a cross country trip)
 * additionally build a list of steps (usually stays under 100) that can 
 * be used as a quick index into the larger list for faster searches.
 *
 * Because we have known distance values for each step but
 * distances for points introduce a degree of error with the equation used,
 * we go back to the known accurate distance from origin value for the
 * first path point in each step. This stops rounding errors giving wildly
 * inaccurate values.
 *
 * Values are stored in this.steps and this.points
 *
 * @returns {void}
 * @author Nick Davison
 */
RouteDivider.prototype.buildPathPointsAndDistances = function () {
    "use strict";
    var d1 = 0,
        d2,
        d3,
        legs,
        l,
        steps,
        s,
        paths,
        p,
        thisPoint,
        nextPoint;
    this.points = [];
    this.steps = [];
    if ((google === undefined) || (google.maps === undefined) || (google.maps.geometry === undefined) || (google.maps.geometry.spherical === undefined)) {
        throw "RouteDivider.buildPathPointsAndDistances: Google Maps Geometry library is required.";
    }
    if (this.route === undefined) {
        throw "RouteDivider.buildPathPointsAndDistances: No route has been stored.";
    }

    try {
        // Loop over the legs
        legs = this.route.routes[0].legs;
        for (l = 0; l < legs.length; l += 1) {
            // Loop over the steps
            steps = legs[l].steps;
            for (s = 0; s < steps.length; s += 1) {
                // Reset the d2 counter to the current total distance
                d2 = d1;
                // Store the distance, first point and starting distance of the current step
                // We can use this to much more quickly search for points, later
                this.steps.push({
                    distance: steps[s].distance.value,
                    first_point: this.points.length,
                    leg_index: l,
                    start_distance: d1,
                    step_index: s
                });
                // Loop over the path points
                paths = steps[s].path;
                for (p = 0; p <= paths.length; p += 1) {
                    // For most points
                    if (p > 0) {
                        // The point we're adding is the prior path point
                        thisPoint = paths[p - 1];
                    } else {
                        // However, when we'd go out of range at the beginning, we use the start_point
                        thisPoint = steps[s].start_point;
                    }
                    // For most points
                    if (p < paths.length) {
                        // The point we're calculating distance to is the current path point
                        nextPoint = paths[p];
                    } else {
                        // However, when we'd go out of range at the end, we use the ending point
                        nextPoint = steps[s].end_point;
                    }
                    // Get the distance between the two points
                    d3 = google.maps.geometry.spherical.computeDistanceBetween(thisPoint, nextPoint);
                    // Add this point to the results set
                    this.points.push({
                        distance: d3,
                        leg_index: l,
                        point: paths[p],
                        point_index: p,
                        start_distance: d2,
                        step_index: s
                    });
                    // Increment the distance counter with the distance between the two points
                    d2 += d3;
                }
                // Increment d1 with the step's distance
                // We use this to avoid rounding errors when we're pulling apart huge numbers of path points
                d1 += steps[s].distance.value;
            }
        }
    } catch (e) {
        console.log("Exception in RouteDivider.buildPathPointsAndDistances");
        console.log(e);
        console.log("this", this);
    }
};

/**
 * Find the index of the step that spans a given 
 * distance. This is useful as a quick index into 
 * the very large points array.
 *
 * @returns {number}
 * @param {number} distance The number of meters from the origin.
 * @author Nick Davison
 */
RouteDivider.prototype.findStepIndexByDistance = function (distance) {
    "use strict";
    var s;
    if (this.route === undefined) {
        throw "RouteDivider.buildPathPointsAndDistances: No route has been stored.";
    }
    // If we're given a too small distance, return the first step
    if (distance <= 0) {
        return 0;
    }
    // If we're given a too large distance, return the last step
    if (distance >= this.distance) {
        return (this.steps.length - 1);
    }
    // For each step
    for (s = 0; s < this.steps.length; s += 1) {
        // As soon as we've cleared the distance we're looking for
        if (this.steps[s].start_distance > distance) {
            // We know it was the previous step
            return (s - 1);
        }
    }
    // If we never found it
    // Return the last step
    return (this.steps.length - 1);
};

/**
 * Find the index of the path point that spans a given 
 * distance. It uses findStepIndexByDistance to
 * speed up the search, jumping to the correct
 * range of points much faster.
 *
 * @returns {number}
 * @param {number} distance The number of meters from the origin.
 * @author Nick Davison
 */
RouteDivider.prototype.findPointIndexByDistance = function (distance) {
    "use strict";
    var s,
        firstPoint,
        p;
    if (this.route === undefined) {
        throw "RouteDivider.buildPathPointsAndDistances: No route has been stored.";
    }
    // If we're given a too small distance, return the first point
    if (distance <= 0) {
        return 0;
    }
    // If we're given a too large distance, return the last point
    if (distance >= this.distance) {
        return (this.points.length - 1);
    }
    // Find the step that covers the given distance
    s = this.findStepIndexByDistance(distance);
    // Get the first point it covers
    firstPoint = this.steps[s].first_point;
    for (p = firstPoint; p < this.points.length; p += 1) {
        // As soon as we've cleared the distance we're looking for
        if (this.points[p].start_distance > distance) {
            // We know it was the previous point
            return (p - 1);
        }
    }
    // If we never found it
    // Return the last point
    return (this.points.length - 1);
};

/**
 * Using findPointIndexByDistance, find the google.maps.LatLng
 * of the point distance meters from the origin of the route.
 *
 * Sub zero values will automatically return the start of the route.
 * Values longer than the route's length will automatically return the end.
 *
 * @returs {google.maps.LatLng}
 * @param {number} distance The number of meters from the origin of the route.
 * @author Nick Davison
 */
RouteDivider.prototype.findLatLngByDistance = function (distance) {
    "use strict";
    var legs,
        p,
        thisPoint,
        nextLatLng,
        fraction,
        lat,
        lng;
    if (this.route === undefined) {
        throw "RouteDivider.buildPathPointsAndDistances: No route has been stored.";
    }
    if (distance <= 0) {
        return this.route.routes[0].legs[0].start_location;
    }
    if (distance >= this.distance) {
        legs = this.route.routes[0].legs;
        return legs[legs.length - 1].end_location;
    }
    // Get the index of the point that spans the requested distance
    p = this.findPointIndexByDistance(distance);
    // And get the point itself
    thisPoint = this.points[p];
    // If there are more points
    if (p < this.points.length - 1) {
        // Get the latlng of the next point
        nextLatLng = this.points[p + 1].point;
    } else {
        // Get the latlng of the end of the whole route
        legs = this.route.routes[0].legs;
        nextLatLng = legs[legs.length - 1].end_location;
    }
    // If, for some reason, the point has a distance of zero
    if (thisPoint.distance <= 0) {
        // Avoid divide by zero errors later and just return the point
        return thisPoint.point;
    }
    if (nextLatLng === undefined) {
        return null;
    }
    // Find the fraction of the distance between the two points that we need
    fraction = (distance - thisPoint.start_distance) / thisPoint.distance;
    // Calculate the final lat/lng
    lat = (nextLatLng.lat() - thisPoint.point.lat()) * fraction + thisPoint.point.lat();
    lng = (nextLatLng.lng() - thisPoint.point.lng()) * fraction + thisPoint.point.lng();
    // Return a google maps latlng object storing it
    return new google.maps.LatLng(lat, lng);
};

/**
 * Get an array of LatLng objects every n (distance) meters. Includes 0 and the end of the route.
 * 
 * @returns {array}
 * @param {number} distance How many meters between points
 * @author Nick Davison
 */
RouteDivider.prototype.getLatLngsEveryNMeters = function (distance) {
    "use strict";
    var result = [],
        numPoints,
        i,
        latLng;
    numPoints = Math.floor(this.distance / distance) + 2;
    for (i = 0; i < numPoints; i += 1) {
        latLng = this.findLatLngByDistance(distance * i);
        if (latLng != null) {
            result.push(latLng);
        }
    }
    return result;
};

RouteDivider.prototype.expandLatLngBounds = function (latLngBounds, amount) {
    "use strict";
    var ne = latLngBounds.getNorthEast(),
        sw = latLngBounds.getSouthWest(),
        diffLat,
        diffLng,
        extendLat,
        extendLng,
        newNE,
        newSW,
        result;
    // Default amount to 1x
    if (amount === undefined) {
        amount = 1;
    }
    diffLat = ne.lat() - sw.lat();
    diffLng = ne.lng() - sw.lng();
    extendLat = (amount - 1) * diffLat / 2;
    extendLng = (amount - 1) * diffLng / 2;
    newNE = new google.maps.LatLng(ne.lat() + extendLat, ne.lng() + extendLng);
    newSW = new google.maps.LatLng(sw.lat() - extendLat, sw.lng() - extendLng);
    result = new google.maps.LatLngBounds(newSW, newNE);
    return result;
};

/**
 * Filter an array of google.maps.LatLng points
 * returning only those that are within a passed
 * google.maps.LatLngBounds
 *
 * @returns {array}
 * @param {google.maps.LatLngBounds} latLngBounds The bounding box to filter within.
 * @param {array} arrayLatLngs The list of LatLngs to filter.
 * @author Nick Davison
 */
RouteDivider.prototype.filterLatLngsByBounds = function (latLngBounds, arrayLatLngs, amount) {
    "use strict";
    var result = [],
        i;
    // Handle cases with a garbage latLngBounds
    if ((latLngBounds === undefined) || (latLngBounds === null)) {
        return result;
    }
    // Handle cases with a garbage array
    if ((arrayLatLngs === undefined) || (arrayLatLngs === null)) {
        return result;
    }
    for (i = 0; i < arrayLatLngs.length; i += 1) {
        if (latLngBounds.contains(arrayLatLngs[i])) {
            result.push(arrayLatLngs[i]);
        }
    }
    return result;
};

/**
 * Filter an array of google.maps.LatLng points
 * returning only those that are within a passed
 * google.maps.Map's currently visible area.
 *
 * @returns {array}
 * @param {google.maps.Map} map The map to search within.
 * @param {array} arrayLatLngs The list of LatLngs to filter.
 * @author Nick Davison
 */
RouteDivider.prototype.filterLatLngsByVisibleMap = function (map, arrayLatLngs, amount) {
    "use strict";
    if (amount === undefined) {
        amount = 1;
    }
    return this.filterLatLngsByBounds(this.expandLatLngBounds(map.getBounds(), amount), arrayLatLngs);
};