/*global BatchLoader, console, google, jQuery, VisibleRoutePoints */
/**
 * @class RoutePlaces
 * Handles watching a map/route for updates,
 * calling the search points along the visible part of the route
 * and sending the Places searches back to the onBatchLoaded callback.
 *
 * @returns {void}
 * @param {object} settings The configuration settings.
 * @param {array} settings.defaultTypes The array of types to search for if an empty array is passed.
 * @param {google.maps.Map} settings.map (Required) The map to track updates/redraws on.
 * @param {number} settings.maxPoints The maximum number of map points to allow before treating them as 0. This stops slow searches on large numbers of points.
 * @param {number} settings.maxResults The maximum number of places to allow to be sent to the callback.
 * @param {function} settings.onBatchLoaded (Required) The callback to fire every time we get new Places back.
 * @param {number} settings.overscan (Optional) The amount to overscan the visible map by, when filtering points. This allows us to include points just off the edge of the screen. Default 1.25
 * @param {number} settings.radius The search radius around each point to use, in meters. Default 10,000
 * @param {google.maps.DirectionsResult} settings.route The route to subdivide.
 * @param {number} settings.separation The number of meters, between points, to separate the route points. Default 20,000
 * @see https://developers.google.com/places/documentation/supported_types
 * @author Nick Davison
 */
function RoutePlaces(settings) {
    "use strict";
    var that = this;
    this.settings = jQuery.extend({
        defaultTypes: [""],
        isLogging: false,
        map: null,
        maxPoints: 15,
        maxResults: 20,
        onBatchLoaded: function (places) {
            return places.length;
        },
        overscan: 1.25,
        radius: 20000,
        route: null,
        separation: 20000,
        showSearchPoints: false
    }, settings);
    // The current set of points along the route that we're searching for.
    this.currentPoints = [];
    // The current set of types of places to search for
    this.types = this.settings.defaultTypes;
    // Initialize the BatchLoader
    this.batchLoader = new BatchLoader(this.settings.map);
    // Bind the callback for the VisibleRoutePoints to call this object's newRoutePoints method.
    this.settings.onUpdate = function (points) {
        that.newRoutePoints(points);
    };
    // Set up the VisibleRoutePoints object
    this.visibleRoutePoints = new VisibleRoutePoints(this.settings);
}

RoutePlaces.prototype.log = function () {
    "use strict";
    if (this.settings.isLogging) {
        console.log.apply(this, arguments);
    }
};

/**
 *
 * @returns {void}
 * @author Nick Davison
 */
RoutePlaces.prototype.setRoute = function (route) {
    "use strict";
    this.visibleRoutePoints.setRoute(route);
};

/**
 *
 * @returns {void}
 * @author Nick Davison
 */
RoutePlaces.prototype.newRoutePoints = function (points) {
    "use strict";
    // If there are too many points
    if (points.length > this.settings.maxPoints) {
        this.log("RoutePlaces.newRoutePoints " + points.length + " points is over limit of " + this.settings.maxPoints);
        // Treat it as zero points
        points = [];
    } else {
        this.log("RoutePlaces.newRoutePoints using " + points.length + " points.");
    }
    // Store the points
    this.currentPoints = points;
    // Rewquest the batch of places
    this.requestBatch();
};

/**
 *
 * @returns {void}
 * @author Nick Davison
 */
RoutePlaces.prototype.setTypes = function (types) {
    "use strict";
    // For anything other than an array with items
    if ((types === 'undefined') || (types.length === undefined) || (types.length === 0)) {
        this.log("RoutePlaces.setTypes is defaulting rather than using ", types);
        // Use the default types list
        types = this.settings.defaultTypes;
        console.log(types)
    }
    // Store the types
    this.types = types;
    this.log("RoutePlaces.setTypes ", types);
    // Request the batch of places
    this.requestBatch();
};

/**
 *
 * @returns {void}
 * @author Nick Davison
 */
RoutePlaces.prototype.requestBatch = function () {
    "use strict";
    var that = this,
        requests = [],
        i;
    // If there are no currentPoints
    if (this.currentPoints.length === 0) {
        // We can skip straight to the callback with no values
        this.settings.onBatchLoaded([]);
        return;
    }
    // For each currentPoint
    for (i = 0; i < this.currentPoints.length; i += 1) {
        // Create a request for it
        requests.push({
            location: this.currentPoints[i],
            radius: this.settings.radius,
            rankBy: google.maps.places.RankBy.PROMINENCE,
            types: this.types
        });
    }
    // Make the requests tot he batch loader
    // Calling back to this.newPlaces
    this.batchLoader.requestBatch(requests, function (places) {
        that.newPlaces(places);
    });
};

/**
 * Filter a list of places, only keeping those that are currently visible on the map.
 * 
 * @retuns {array}
 * @param {array} places An array of places search results.
 */
RoutePlaces.prototype.filterInViewPlaces = function (places) {
    "use strict";
    var results = [],
        bounds,
        i;
    bounds = this.settings.map.getBounds();
    for (i = 0; i < places.length; i += 1) {
        if (bounds.contains(places[i].geometry.location)) {
            results.push(places[i]);
        }
    }
    return results;
};

/**
 * Receive all of the new places.
 * Filter and sort them.
 * Then send them to the callback.
 *
 * @returns {void}
 * @param {array} places Array of places search results.
 * @author Nick Davison
 */
RoutePlaces.prototype.newPlaces = function (places) {
    "use strict";
    var length = 0;
    this.log('RoutePlaces.newPlaces received ' + places.length + ' places');
    length = places.length;
    // Ensure length isn't greater than the max number of results
    if (length > this.settings.maxResults) {
        length = this.settings.maxResults;
    }
    // If there weren't any places
    if (length === 0) {
        // We can skip to just calling the callback with no places
        this.settings.onBatchLoaded([]);
        return;
    }

    // Filter the list of places to only those on screen
    places = this.filterInViewPlaces(places);

    // Sort the places by their titles
    // This is done so when we sort by rating
    // and most places have no rating,
    // We won't just get results from the first location to return results
    places.sort(function (a, b) {
        var aName = '',
            bName = '';
        if (a.name !== undefined) {
            aName = a.name;
        }
        if (b.title !== undefined) {
            bName = b.name;
        }
        return aName - bName;
    });
    // Sort the places by their ratings, highest ratings first
    places.sort(function (a, b) {
        var aRating = 0,
            bRating = 0;
        if (a.rating !== undefined) {
            aRating = a.rating;
        }
        if (b.rating !== undefined) {
            bRating = b.rating;
        }
        return bRating - aRating;
    });
    // Trim the results down to size
    places = places.slice(0, length);
    // Send the filtered list back to the callback
    this.settings.onBatchLoaded(places);
};