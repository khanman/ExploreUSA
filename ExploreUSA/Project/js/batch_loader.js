/*global CachedPlaces, console, google, jQuery, setTimeout */
/**
 * @class BatchLoader
 * Handles loading batches of PlaceSearchRequests,
 * only making the callback when all of them have
 * returned data.
 *
 * @author Nick Davison
 */
function BatchLoader(map) {
    "use strict";
    try {
        this.cachedPlaces = new CachedPlaces(map);
        this.currentBatch = {};
        this.resultSet = [];
        this.callback = null;
    } catch (e) {
        console.log("Exception in BatchLoader initialization.");
        console.log("Exception", e);
        console.log("this", this);
    }
}

/**
 * Returns whether or not a given hash is part of the current batch.
 *
 * @returns {boolean}
 * @param {string} hash The hash to check to see if it's part of the current batch.
 * @author Nick Davison
 */
BatchLoader.prototype.isPartOfCurrentBatch = function (hash) {
    "use strict";
    try {
        if (this.currentBatch[hash] !== undefined) {
            return true;
        }
        return false;
    } catch (e) {
        console.log("Exception in BatchLoader.isPartOfCurrentBatch");
        console.log("Exception", e);
        console.log("this", this);
        console.log("hash", hash);
    }
};

/**
 * Returns whether or not the whole batch is complete.
 *
 * @returns {boolean}
 * @author Nick Davison
 */
BatchLoader.prototype.isCurrentBatchComplete = function () {
    "use strict";
    var key;
    try {
        // For each request
        for (key in this.currentBatch) {
            // If a genuine request
            if (this.currentBatch.hasOwnProperty(key)) {
                // If the request hasn't been processed yet
                if (this.currentBatch[key] === false) {
                    // Return false - any one unprocessed case
                    // means the batch isn't complete
                    return false;
                }
            }
        }
        return true;
    } catch (e) {
        console.log("Exception in BatchLoader.isCurrentBatchComplete");
        console.log("Exception", e);
        console.log("this", this);
    }
};

/**
 * Remove duplicates from the results set then send it to the callback.
 * The callback will receive an array of unique google.maps.places.PlaceResult places.
 *
 * @returns {void}
 * @see https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
 * @author Nick Davison
 */
BatchLoader.prototype.processBatch = function () {
    "use strict";
    var uniques = {},
        i,
        uniqueIdentifier,
        key;
    try {
        // Copy all of the results into an associative array
        // By keying against their locations, dupes overwrite each other
        for (i = 0; i < this.resultSet.length; i += 1) {
            uniqueIdentifier = this.resultSet[i].id;
            uniques[uniqueIdentifier] = this.resultSet[i];
        }
        // Empty the resultSet
        this.resultSet = [];
        // Copy the uniques list back into the resultSet
        for (key in uniques) {
            if (uniques.hasOwnProperty(key)) {
                this.resultSet.push(uniques[key]);
            }
        }
        // Send the final resultSet
        this.callback(this.resultSet);
    } catch (e) {
        console.log("Exception in BatchLoader.processBatch");
        console.log("Exception", e);
        console.log("this", this);
    }
};

/**
 * Handle responses back from the places API.
 *
 * All requests that're not part of the current batch are ignored.
 * That's because we don't care about old batches still coming back in.
 * It also has the advantage that we won't refill the queue with 
 * old hits that bounced off a full queue.
 *
 * If the request was a success or had zero results (its own kind of success)
 * Add the results to the resultSet.
 *
 * If the request was OVER_QUERY_LIMIT or an UNKNOWN
 * Repeat it in half a second (giving the queue a chance to repopulate)
 *
 * In all of the other cases, log to the console but treat it as a success
 * as we don't want it waiting on a response that'll never come.
 *
 * @returns {void}
 * @param {object} request The google.maps.places.PlaceSearchRequest that made the request.
 * @param {string} hash The hash of that request object.
 * @param {array} results Array of google.maps.places.PlaceResult results.
 * @param {number} The google.maps.places.PlacesServiceStatus status value for the request.
 * @see https://developers.google.com/maps/documentation/javascript/reference#PlaceSearchRequest
 * @see https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
 * @see https://developers.google.com/maps/documentation/javascript/reference#PlacesServiceStatus
 * @author Nick Davison
 */
BatchLoader.prototype.processResponse = function (request, hash, results, status) {
    "use strict";
    var that = this;
    try {
        // If the request wasn't part of the current batch
        if (!this.isPartOfCurrentBatch(hash)) {
            // We can ignore it and exit.
            return;
        }
        // Process the different status cases
        switch (status) {
        case google.maps.places.PlacesServiceStatus.OK:
        case google.maps.places.PlacesServiceStatus.ZERO_RESULTS:
            // Add the results
            this.resultSet = this.resultSet.concat(results);
            break;
        case google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT:
        case google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR:
            // If we're temporarily over the request limit
            // Or google's server had a hiccup
            // Make the request again
            // We use a timeout of 500ms to allow the queue to refill by a single item
            setTimeout(function () {
                that.addRequestToBatch(request);
            }, 500);
            break;
        case google.maps.places.PlacesServiceStatus.INVALID_REQUEST:
            // It was an invalid request.
            // Log it
            console.log("ERROR: BatchLoader.request made an invalid request");
            console.log("request", request);
            break;
        case google.maps.places.PlacesServiceStatus.REQUEST_DENIED:
            // This is bad - it means Google has blocked our application
            console.log("ALERT: BatchLoader.request - Google is not allowing us to use PlacesService.");
            break;
        default:
            // This case should only happen if Google add more result states
            // If so, log it to the console
            // then continue with the next request
            console.log("WARNING: BatchLoader.request - Google returned an unrecognized result state.");
            console.log("request", request);
            break;
        }
        // In all cases except for OVER_LIMT and UNKNOWN_ERROR
        if ((status !== google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) && (status !== google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR)) {
            // Flag that we've received a result
            // In some cases, we haven't but we don't 
            // want the code waiting on a result that will never come.
            this.currentBatch[hash] = true;
            // If we have completed all requests in the current batch
            if (this.isCurrentBatchComplete()) {
                // Process the batch, even with this missing entry.
                this.processBatch();
            }
        }
    } catch (e) {
        console.log("Exception in BatchLoader.processResponse");
        console.log("Exception", e);
        console.log("this", this);
        console.log("request", request);
        console.log("hash", hash);
        console.log("results", results);
        console.log("status", status);
    }
};

/**
 * Add a single request to the current batch of requests.
 *
 * @returns {void}
 * @param {object} request The google.maps.places.PlaceSearchRequest object to search for.
 * @see https://developers.google.com/maps/documentation/javascript/reference#PlaceSearchRequest
 * @author Nick Davison
 */
BatchLoader.prototype.addRequestToBatch = function (request) {
    "use strict";
    var that = this,
        hash;
    try {
        // Make the request
        hash = this.cachedPlaces.request(request, function (results, status) {
            that.processResponse(request, hash, results, status);
        });
        // Add the item to the current batch list
        // Flagged as not loaded
        this.currentBatch[hash] = false;
    } catch (e) {
        console.log("Exception in BatchLoader.addRequestToBatch");
        console.log("Exception", e);
        console.log("this", this);
        console.log("request", request);
    }
};

/**
 * Request a batch of PlacesSearchRequests.
 *
 * @returns {void}
 * @param {array} requests The array of google.maps.places.PlaceSearchRequest objects to search for.
 * @param {function} callback The callback function to call when all requests have come back.
 * @see https://developers.google.com/maps/documentation/javascript/reference#PlaceSearchRequest
 * @author Nick Davison
 */
BatchLoader.prototype.requestBatch = function (requests, callback) {
    "use strict";
    var i;
    try {
        // Clear the currentBatch
        this.currentBatch = {};
        // Clear the resultSet
        this.resultSet = [];
        // Store the new callback
        this.callback = callback;
        // For each request
        for (i = 0; i < requests.length; i += 1) {
            // Add the request to the batch
            this.addRequestToBatch(requests[i]);
        }
    } catch (e) {
        console.log("Exception in BatchLoader.requestBatch");
        console.log("Exception", e);
        console.log("this", this);
        console.log("requests", requests);
    }
};