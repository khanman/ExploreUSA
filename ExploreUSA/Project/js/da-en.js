/*global document, window, da */
/*jslint plusplus: true, sloppy: true, vars: true */
/*
 * -------------------------------------------------
 * This file provides localization for key strings
 * -------------------------------------------------
 */

if (typeof registerNS === "undefined") {
    function registerNS(ns) {
        var nsParts, root, i;
		nsParts = ns.split(".");
        root = window;

        for (i = 0; i < nsParts.length; i++) {
            if (typeof root[nsParts[i]] === "undefined") {
                root[nsParts[i]] = {};
			}
            root = root[nsParts[i]];
        }
    }
}

registerNS("da.utilities");

/**
* @namespace Localization values.
* Each key maps to the localized string for display.
*/
da.utilities.LocaleHashTable = function () {
    var arrHashValues = [];

    // Login Form
    arrHashValues.INVALID_LOGIN = "The email or password you entered is incorrect";
    arrHashValues.ENTER_YOUR_PASSWORD = "Please enter your password";
    arrHashValues.ENTER_YOUR_EMAIL = "Please enter your email address";

    // Registration Form
    arrHashValues.ERROR_CREATING_PROFILE = "Error creating profile";
    arrHashValues.ACCEPT_POLICY = "Please accept our policy";
    arrHashValues.ENTER_FIRSTNAME = "Please enter your first name";
    arrHashValues.ENTER_LASTNAME = "Please enter your surname";
    arrHashValues.ENTER_EMAIL = "Please enter an email address";
    arrHashValues.PROVIDE_PASSWORD = "Please provide a password";
    arrHashValues.CONFIRM_PASSWORD = "Please confirm your password";
    arrHashValues.CONFIRM_PASSWORD_NOT_MATCH = "Password and confirm password do not match";
    arrHashValues.SELECT_COUNTRY = "Please select your country";
    arrHashValues.UNIQUE_EMAIL = "This email address has already registered";

    // Share Form
    arrHashValues.ENTER_NAME = "Please enter your name";
    arrHashValues.ERROR_SENDING_EMAIL = "Email submission failed";

    // Forgot Password Form
    arrHashValues.UNABLE_TO_LOCATE_USER = "Unable to locate user";

    // Reset Password Form
    arrHashValues.UNABLE_TO_RESET_PASSWORD = "There was a problem resetting your password. The reset password link expires 24 hours after the request was made so if it has been 24 hours since you submitted the forgot password request, you will need to submit the request again.";

    // Contact Us Form
    arrHashValues.INVALID_EMAIL = "The email address you entered appears to be incorrect. Please try again.";

    // Header
    arrHashValues.WELCOME_BACK = "Welcome back";
    arrHashValues.LOGOUT = "Log out";

    // Suitcase Facebook/Twitter Share
    arrHashValues.SHARE_TITLE = "My Suitcase";
    arrHashValues.SHARE_DESC = "These are some of my favorite USA travel experiences.";

    // Road Trips
    arrHashValues.HOURS = "Hours";
    arrHashValues.DRIVE_TIME = "Drive Time";
    arrHashValues.KILOMETERS = "Kilometers";
    arrHashValues.MILES = "Miles";
    arrHashValues.ADD_TO_ITINERARY = "Add to Itinerary";
    arrHashValues.REMOVE_FROM_ITINERARY = "Remove from Itinerary";
    arrHashValues.VIEW_MORE_INFORMATION = "View More Information";

    return arrHashValues;
};
