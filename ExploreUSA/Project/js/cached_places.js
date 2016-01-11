/*global console, google, jQuery, setTimeout */
/**
 * @class CachedPlaces
 * Performs more efficient searches against the 
 */
function CachedPlaces(map) {
    "use strict";
    // Store the map object and create a PlacesService
    this.setMap(map);
    // Create a cache for storing results
    this.cache = {};
    // Create a list of active requests
    this.activeRequests = {};
}

/**
 * Sets the internal map object and creates a
 * google.maps.places.PlacesService with it.
 *
 * @returns {void}
 * @param {google.maps.Map} map Google requires a map to be passed for creating a PlacesService.
 * @author Nick Davison
 */
CachedPlaces.prototype.setMap = function (map) {
    "use strict";
    try {
        this.map = map;
        this.service = new google.maps.places.PlacesService(map);
    } catch (e) {
        console.log("Exception in CachedPlaces.setMap");
        console.log("Exception", e);
        console.log("this", this);
        console.log("map", map);
    }
};

/**
 * Converts a request JSON object to a text string hash.
 * Useful for building caches of requests.
 *
 * @returns {string}
 * @param 
 */
CachedPlaces.prototype.requestToHash = function (request) {
    "use strict";
    var re;
    try {
        re = new RegExp("[^A-Za-z0-9]", "g");
        return JSON.stringify(request).toString().replace(re, "");
    } catch (e) {
        console.log("Exception in CachedPlaces.requestToHash");
        console.log("Exception", e);
        console.log("this", this);
        console.log("request", request);
        throw e;
    }
};

/**
 * Return an array of all of the keys in an object literal.
 * Checks for hasOwnProperty so will only return the
 * object literal's own properties, not inherited ones.
 * 
 * @returns {array}
 * @param {object} obj The object we wish to scan.
 * @author Nick Davison
 */
CachedPlaces.prototype.getObjectKeys = function (obj) {
    "use strict";
    var result = [],
        key;
    try {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push(key);
            }
        }
        result.sort();
        return result;
    } catch (e) {
        console.log("Exception in CachedPlaces.getObjectKeys");
        console.log("Exception", e);
        console.log("this", this);
        console.log("obj", obj);
        throw e;
    }
};

/**
 * Return the number of ownProperties in an object literal.
 * Useful for checking the size of caches and queues.
 * 
 * @returns {number}
 * @param {object} obj The object we wish to scan.
 * @author Nick Davison
 */
CachedPlaces.prototype.getObjectLength = function (obj) {
    "use strict";
    var keys;
    try {
        keys = this.getObjectKeys(obj);
        return keys.length;
    } catch (e) {
        console.log("Exception in CachedPlaces.getObjectLength");
        console.log("Exception", e);
        console.log("this", this);
        console.log("obj", obj);
        throw e;
    }
};

/**
 * Return the number of currently active requests we have open to Google Places.
 *
 * @returns {number}
 * @author Nick Davison
 */
CachedPlaces.prototype.isActive = function () {
    "use strict";
    try {
        return this.getObjectLength(this.activeRequests);
    } catch (e) {
        console.log("Exception in CachedPlaces.isActive");
        console.log("Exception", e);
        console.log("this", this);
        console.log("this.activeRequests", this.activeRequests);
        throw e;
    }
};

/**
 * Perform a request.
 *
 * If the request has previously come back successfully,
 * return that prior result without using the API.
 *
 * If the request is already being made,
 * return a status of google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT
 * so the request will appear to be denied until we get the prior version
 * back and can return the cached value.
 *
 * Otherwise, send the request to the Places service.
 * When a response comes back, if it was successful,
 * add it to the cache.
 *
 * It returns the hash of the request.
 *
 * @returns {string}
 * @param {object} request The google.maps.places.PlaceSearchRequest object to search with.
 * @see https://developers.google.com/maps/documentation/javascript/reference#PlaceSearchRequest
 * @author Nick Davison
 */
CachedPlaces.prototype.request = function (request, callback) {
    "use strict";
    var that = this,
        hash;
    try {
        hash = this.requestToHash(request);
        // If there is already an entry
        if (this.cache[hash] !== undefined) {
            // Return the entry as though it was a successful API call
            setTimeout(function () {
                callback(that.cache[hash], google.maps.places.PlacesServiceStatus.OK);
            }, 1);
            // Then exit
            return;
        }
        // If we're already making this request
        if (this.activeRequests[hash] !== undefined) {
            // Treat it as an OVER_QUERY_LIMIT
            // So the request will be denied until the prior
            // call comes back.
            // Use a slight delay (100ms) just to minimize any nasty race conditions.
            setTimeout(function () {
                callback([], google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT);
            }, 100);
            // And exit
            return;
        }
        // Add this request to the active requests list
        this.activeRequests[hash] = hash;
        // Make the request
        this.service.nearbySearch(request, function (results, status) {
            // Clear the request from the list of active requests
            delete (that.activeRequests[hash]);
            // If the request was successful
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                // Store the result in the cache so we don't hit the API again
                that.cache[hash] = results;
            }
            // Forward the response to the callback
            callback(results, status);
        });
        // Return the hash
        return hash;
    } catch (e) {
        console.log("Exception in CachedPlaces.request");
        console.log("Exception", e);
        console.log("this", this);
        console.log("request", request);
        throw e;
    }
};