/* ---------------------------------------- /includes/scripts/jquery.cookie.js ---------------------------------------- */
/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

/* ---------------------------------------- /includes/scripts/com.digitaria.discoveramerica.journal.js ---------------------------------------- */
jQuery(document).ready(function() {
  jQuery('#bio-container .scroller .bar').css('display','inline-block');
  jQuery('#bio-container .content-wrapper').css('overflow','hidden');
  $('#bio-container').jScrollPane({verticalDragMinHeight: 52,
			verticalDragMaxHeight: 52});
});

/*function bioRender() {
	
	if (jQuery("#bio").height() > 230) {
		jQuery("#bio-container .content-wrapper").css({ height: '230px' });
		jQuery("#bio-container .scroller .bar").show();
	} else {
		jQuery("#bio-container .content-wrapper").css({ height: 'auto' });
		jQuery("#bio-container .scroller .bar").hide();
	}
	updateScroller();
}

function toggleBar(e) {
	jQuery(this).toggleClass('hold');
	gui.bar.top = jQuery(this).position().top;
	gui.bar.page = e.pageY;
}

function toggleBarOff() {
	jQuery(this).removeClass('hold');
}

gui.bar = {};
function moveBar(e) {
	var o = jQuery(this);
	if (o.hasClass('hold')) {
		//current mouse click offset
		var pos = gui.bar.top+e.pageY-gui.bar.page;
		//dont scroll out of bounds
		if (pos <= 0)
			pos = 0;
		if (pos+o.height()-4 >= o.parent().height())
			pos = o.parent().height()-o.height()+4;
		//set new pos
		o.css({top: (pos)+'px' });				
		updateScroller();
	}
}

function updateScroller() {
	var o = jQuery('#bio-container .scroller');
	var diff = jQuery('#bio-container .scroller .content').height() - jQuery('#bio-container .scroller .content-wrapper').height();
	if (diff <= 0) {
		jQuery('#bio-container .scroller .bar').addClass('disabled');
		return false;
	}
	
	jQuery('#bio-container .scroller .bar').removeClass('disabled');
	var barHeight = jQuery('#bio-container .scroller .bar').height()-jQuery('#bio-container .scroller .bar .button .icon').height();
	var buttonPos = jQuery('#bio-container .scroller .bar .button').position().top;
	var pos = Math.floor(diff*(buttonPos/barHeight));
	//set content scroll position
	jQuery('#bio-container .scroller .content').css({ top: -pos+'px' });
}*/

/* ---------------------------------------- /includes/scripts/jquery.sb.js ---------------------------------------- */
/*
    jQuery-SelectBox
    
    Traditional select elements are very difficult to style by themselves, 
    but they are also very usable and feature rich. This plugin attempts to 
    recreate all selectbox functionality and appearance while adding 
    animation and stylability.
    
    This product includes software developed 
    by RevSystems, Inc (http://www.revsystems.com/) and its contributors
    
    Please see the accompanying LICENSE.txt for licensing information.
*/

(function( $, window, undefined ) {
    // utility functions
    $.fn.borderWidth = function() { return $(this).outerWidth() - $(this).innerWidth(); };
    $.fn.paddingWidth = function() { return $(this).innerWidth() - $(this).width(); };
    $.fn.extraWidth = function() { return $(this).outerWidth(true) - $(this).width(); };
    $.fn.offsetFrom = function( e ) {
        var $e = $(e);
        return {
            left: $(this).offset().left - $e.offset().left,
            top: $(this).offset().top - $e.offset().top
        };
    };
    $.fn.maxWidth = function() {
        var max = 0;
        $(this).each(function() {
            if($(this).width() > max) {
              max = $(this).width();
            }
        });
        return max;
    };
    $.fn.triggerAll = function(event, params) {
      return $(this).each(function() {
        $(this).triggerHandler(event, params);
      });
    };
    var aps = Array.prototype.slice,
        randInt = function() {
            return Math.floor(Math.random() * 999999999);
        };
    
    // jQuery-Proto
    $.proto = function() {
        var name = arguments[0],    // The name of the jQuery function that will be called
            clazz = arguments[1],   // A reference to the class that you are associating
            klazz = clazz,          // A version of clazz with a delayed constructor
            extOpt = {},            // used to extend clazz with a variable name for the init function
            undefined;              // safety net
        
        opts = $.extend({
            elem: "elem",           // the property name on the object that will be set to the current jQuery context
            access: "access",       // the name of the access function to be set on the object
            init: "init",           // the name of the init function to be set on the object
            instantAccess: false    // when true, treat all args as access args (ignore constructor args) and allow construct/function call at the same time
        }, arguments[2]);
        
        if(clazz._super) {
            extOpt[opts.init] = function(){};
            klazz = clazz.extend(extOpt);
        }
        
        $.fn[name] = function() {
            var result, args = arguments;
                
            $(this).each(function() {
                var $e = $(this),
                    obj = $e.data(name),
                    isNew = !obj;
                
                // if the object is not defined for this element, then construct
                if(isNew) {
                    
                    // create the new object and restore init if necessary
                    obj = new klazz();
                    if(clazz._super) {
                      obj[opts.init] = clazz.prototype.init;
                    }
                    
                    // set the elem property and initialize the object
                    obj[opts.elem] = $e[0];
                    if(obj[opts.init]) {
                        obj[opts.init].apply(obj, opts.instantAccess ? [] : aps.call(args, 0));
                    }
                    
                    // associate it with the element
                    $e.data(name, obj);
                    
                }
                
                // if it is defined or we allow instance access, then access
                if(!isNew || opts.instantAccess) {
                  
                    // call the access function if it exists (allows lazy loading)
                    if(obj[opts.access]) {
                        obj[opts.access].apply(obj, aps.call(args, 0));
                    }
                    
                    // do something with the object
                    if(args.length > 0) {
                    
                        if($.isFunction(obj[args[0]])) {
                        
                            // use the method access interface
                            result = obj[args[0]].apply(obj, aps.call(args, 1));
                            
                        } else if(args.length === 1) {
                          
                            // just retrieve the property (leverage deep access with getObject if we can)
                            if($.getObject) {
                              result = $.getObject(args[0], obj);
                            } else {
                              result = obj[args[0]];
                            }
                            
                        } else {
                          
                            // set the property (leverage deep access with setObject if we can)
                            if($.setObject) {
                              $.setObject(args[0], args[1], obj);
                            } else {
                              obj[args[0]] = args[1];
                            }
                            
                        }
                        
                    } else if(result === undefined) {
                    
                        // return the first object if there are no args
                        result = $e.data(name);
                        
                    }
                }
            });
            
            // chain if no results were returned from the clazz's method (it's a setter)
            if(result === undefined) {
              return $(this);
            }
            
            // return the first result if not chaining
            return result;
        };
    };
    
    var falseFunc = function() {
            return false;
        },
        SelectBox = function() {
        
        var self = this,
            o = {},
            $orig = null,
            $label = null,
            $sb = null,
            $display = null,
            $dd = null,
            $items = null,
            searchTerm = "",
            cstTimeout = null,
            delayReloadTimeout = null,
            resizeTimeout = null,
            
            // functions
            loadSB,
            createOption,
            focusOrig,
            blurOrig,
            destroySB,
            reloadSB,
            delayReloadSB,
            openSB,
            centerOnSelected,
            closeSB,
            positionSB,
            positionSBIfOpen,
            delayPositionSB,
            clickSB,
            clickSBItem,
            keyupSB,
            keydownSB,
            focusSB,
            blurSB,
            addHoverState,
            removeHoverState,
            addActiveState,
            removeActiveState,
            getDDCtx,
            getSelected,
            getEnabled,
            selectItem,
            clearSearchTerm,
            findMatchingItem,
            selectMatchingItem,
            selectNextItemStartsWith,
            closeAll,
            closeAllButMe,
            closeAndUnbind,
            blurAllButMe,
            stopPageHotkeys,
            flickerDisplay,
            unbind;
        
        loadSB = function() {
            
            // create the new sb
            $sb = $("<div class='sb " + o.selectboxClass + " " + $orig.attr("class") + "' id='sb" + randInt() + "'></div>")
                .attr("role", "listbox")
                .attr("aria-has-popup", "true")
                .attr("aria-labelledby", $label.attr("id") ? $label.attr("id") : "");
            $("body").append($sb);
            
            // generate the display markup
            var displayMarkup = $orig.children().size() > 0
                ? o.displayFormat.call($orig.find("option:selected")[0], 0, 0)
                : "&nbsp;";
            $display = $("<div class='display " + $orig.attr("class") + "' id='sbd" + randInt() + "'></div>")
                .append($("<div class='text'></div>").append(displayMarkup))
                .append(o.arrowMarkup);
            $sb.append($display);
            
            // generate the dropdown markup
            $dd = $("<ul class='" + o.selectboxClass + " items " + $orig.attr("class") + "' role='menu' id='sbdd" + randInt() + "'></ul>")
                .attr("aria-hidden", "true");
            $sb.append($dd)
                .attr("aria-owns", $dd.attr("id"));
            if($orig.children().size() === 0) {
                $dd.append(createOption().addClass("selected"));
            } else {
                $orig.children().each(function( i ) {
                    var $opt, $og, $ogItem, $ogList;
                    if($(this).is("optgroup")) {
                        $og = $(this);
                        $ogItem = $("<li class='optgroup'>" + o.optgroupFormat.call($og[0], i+1) + "</li>")
                            .addClass($og.is(":disabled") ? "disabled" : "")
                            .attr("aria-disabled", $og.is(":disabled") ? "true" : "");
                        $ogList = $("<ul class='items'></ul>");
                        $ogItem.append($ogList);
                        $dd.append($ogItem);
                        $og.children("option").each(function() {
                            $opt = createOption($(this), i)
                                .addClass($og.is(":disabled") ? "disabled" : "")
                                .attr("aria-disabled", $og.is(":disabled") ? "true" : "");
                            $ogList.append($opt);
                        });
                    } else {
                        $dd.append(createOption($(this), i));
                    }
                });
            }
            
            // cache all sb items
            $items = $dd.find("li").not(".optgroup");
            
            // for accessibility/styling
            $sb.attr("aria-active-descendant", $items.filter(".selected").attr("id"));
            $dd.children(":first").addClass("first");
            $dd.children(":last").addClass("last");
            
            // modify width based on fixedWidth/maxWidth options
            if(!o.fixedWidth) {
                var largestWidth = $dd.find(".text, .optgroup").maxWidth() + $display.extraWidth() + 1;
                $sb.width(o.maxWidth ? Math.min(o.maxWidth, largestWidth) : largestWidth);
            } else if(o.maxWidth && $sb.width() > o.maxWidth) {
                $sb.width(o.maxWidth);
            }
            
            // place the new markup in its semantic location (hide/show fixes positioning bugs)
            $orig.before($sb).addClass("has_sb").hide().show();
            
            // these two lines fix a div/span display bug on load in ie7
            positionSB();
            flickerDisplay();
            
            // hide the dropdown now that it's initialized
            $dd.hide();
            
            // bind events
            if(!$orig.is(":disabled")) {
                $orig
                    .bind("blur.sb", blurOrig)
                    .bind("focus.sb", focusOrig);
                $display
                    .mouseup(addActiveState)
                    .mouseup(clickSB)
                    .click(falseFunc)
                    .focus(focusSB)
                    .blur(blurSB)
                    .hover(addHoverState, removeHoverState);
                getEnabled()
                    .click(clickSBItem)
                    .hover(addHoverState, removeHoverState);
                $dd.find(".optgroup")
                    .hover(addHoverState, removeHoverState)
                    .click(falseFunc);
                $items.filter(".disabled")
                    .click(falseFunc);
                if(!$.browser.msie || $.browser.version >= 9) {
                    $(window).resize($.throttle ? $.throttle(100, positionSBIfOpen) : delayPositionSB);
                }
            } else {
                $sb.addClass("disabled").attr("aria-disabled");
                $display.click(function( e ) { e.preventDefault(); });
            }
            
            // bind custom events
            $sb.bind("close.sb", closeSB).bind("destroy.sb", destroySB);
            $orig.bind("reload.sb", reloadSB);
            if($.fn.tie && o.useTie) {
                $orig.bind("domupdate.sb", delayReloadSB);
            }
        };
        
        delayPositionSB = function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(positionSBIfOpen, 50);
        };
        
        positionSBIfOpen = function() {
            if($sb.is(".open")) {
                positionSB();
                openSB(true);
            }
        }
        
        // create new markup from an <option>
        createOption = function( $option, index ) {
            if(!$option) { 
                $option = $("<option value=''>&nbsp;</option>");
                index = 0;
            }
            var $li = $("<li id='sbo" + randInt() + "'></li>")
                    .attr("role", "option")
                    .data("orig", $option[0])
                    .data("value", $option ? $option.attr("value") : "")
                    .addClass($option.is(":selected") ? "selected" : "")
                    .addClass($option.is(":disabled") ? "disabled" : "")
                    .attr("aria-disabled", $option.is(":disabled") ? "true" : ""),
                $inner = $("<div class='item'></div>"),
                $text = $("<div class='text'></div>")
                    .html(o.optionFormat.call($option[0], 0, index + 1));
            return $li.append($inner.append($text));
        };
        
        // causes focus if original is focused
        focusOrig = function() {
            blurAllButMe();
            $display.triggerHandler("focus");
        };
        
        // loses focus if original is blurred
        blurOrig = function() {
            if(!$sb.is(".open")) {
                $display.triggerHandler("blur");
            }
        };
        
        // unbind and remove
        destroySB = function( internal ) {
            $sb.remove();
            $orig
                .unbind(".sb")
                .removeClass("has_sb");
            $(window).unbind("resize", delayPositionSB);
            if(!internal) {
                $orig.removeData("sb");
            }
        };
        
        // destroy then load, maintaining open/focused state if applicable
        reloadSB = function() {
            var isOpen = $sb.is(".open"),
                isFocused = $display.is(".focused");
            closeSB(true);
            destroySB(true);
            self.init(o);
            if(isOpen) {
                $orig.focus();
                openSB(true);
            } else if(isFocused) {
                $orig.focus();
            }
        };
        
        // debouncing when useTie === true
        delayReloadSB = function() {
            clearTimeout(delayReloadTimeout);
            delayReloadTimeout = setTimeout(reloadSB, 30);
        };
        
        // when the user clicks outside the sb
        closeAndUnbind = function() {
            $sb.removeClass("focused");
            closeSB();
            unbind();
        };
        
        unbind = function() {
          $(document)
              .unbind("click", closeAndUnbind)
              .unbind("keyup", keyupSB)
              .unbind("keypress", stopPageHotkeys)
              .unbind("keydown", stopPageHotkeys)
              .unbind("keydown", keydownSB);
        };
        
        // trigger all sbs to close
        closeAll = function() {
            $(".sb.open." + o.selectboxClass).triggerAll("close");
        };
        
        // trigger all sbs to blur
        blurAllButMe = function() {
            $(".sb.focused." + o.selectboxClass).not($sb[0]).find(".display").blur();
        };
        
        // to prevent multiple selects open at once
        closeAllButMe = function() {
            $(".sb.open." + o.selectboxClass).not($sb[0]).triggerAll("close");
        };
        
        // hide and reset dropdown markup
        closeSB = function( instantClose ) {
            if($sb.is(".open")) {
                $display.blur();
                $items.removeClass("hover");
                unbind();
                $dd.attr("aria-hidden", "true");
                if(instantClose === true) {
                  $dd.hide();
                  $sb.removeClass("open");
                  $sb.append($dd);
                } else {
                    $dd.fadeOut(o.animDuration, function() {
                        $sb.removeClass("open");
                        $sb.append($dd);
                    });
                }
            }
        };
        
        // since the context can change, we should get it dynamically
        getDDCtx = function() {
            var $ddCtx = null;
            if(o.ddCtx === "self") {
                $ddCtx = $sb;
            } else if($.isFunction(o.ddCtx)) {
                $ddCtx = $(o.ddCtx.call($orig[0]));
            } else {
                $ddCtx = $(o.ddCtx);
            }
            return $ddCtx;
        };
        
        // DRY
        getSelected = function() {
          return $items.filter(".selected");
        };
        
        // DRY
        getEnabled = function() {
          return $items.not(".disabled");
        };
        
        // reposition the scroll of the dropdown so the selected option is centered (or appropriately onscreen)
        centerOnSelected = function() {
            $dd.scrollTop($dd.scrollTop() + getSelected().offsetFrom($dd).top - $dd.height() / 2 + getSelected().outerHeight(true) / 2);
        };
        
        flickerDisplay = function() {
            if($.browser.msie && $.browser.version < 8) {
                $("." + o.selectboxClass + " .display").hide().show(); // fix ie7 display bug
            }
        };
        
        // show, reposition, and reset dropdown markup
        openSB = function( instantOpen ) {
            var dir,
                $ddCtx = getDDCtx();
            blurAllButMe();
            $sb.addClass("open");
            $ddCtx.append($dd);
            dir = positionSB();
            $dd.attr("aria-hidden", "false");
            if(instantOpen === true) {
                $dd.show();
                centerOnSelected();
            } else if(dir === "down") {
                $dd.slideDown(o.animDuration, centerOnSelected);
            } else {
                $dd.fadeIn(o.animDuration, centerOnSelected);
            }
            $orig.focus();
        };
        
        // position dropdown based on collision detection
        positionSB = function() {
            var $ddCtx = getDDCtx(),
                ddMaxHeight = 0,
                ddX = $display.offsetFrom($ddCtx).left,
                ddY = 0,
                dir = "",
                ml, mt,
                bottomSpace, topSpace,
                bottomOffset, spaceDiff,
                bodyX, bodyY;
            
            // modify dropdown css for getting values
            $dd.removeClass("above");
            $dd.show().css({
                maxHeight: "none",
                position: "relative",
                visibility: "hidden"
            });
            if(!o.fixedWidth) {
              $dd.width($display.outerWidth() - $dd.extraWidth() + 1);
            }
            
            // figure out if we should show above/below the display box
            bottomSpace = $(window).scrollTop() + $(window).height() - $display.offset().top - $display.outerHeight();
            topSpace = $display.offset().top - $(window).scrollTop();
            bottomOffset = $display.offsetFrom($ddCtx).top + $display.outerHeight();
            spaceDiff = bottomSpace - topSpace + o.dropupThreshold;
            if($dd.outerHeight() < bottomSpace) {
                ddMaxHeight = o.maxHeight ? o.maxHeight : bottomSpace;
                ddY = bottomOffset;
                dir = "down";
            } else if($dd.outerHeight() < topSpace) {
                ddMaxHeight = o.maxHeight ? o.maxHeight : topSpace;
                ddY = $display.offsetFrom($ddCtx).top - Math.min(ddMaxHeight, $dd.outerHeight());
                dir = "up";
            } else if(spaceDiff >= 0) {
                ddMaxHeight = o.maxHeight ? o.maxHeight : bottomSpace;
                ddY = bottomOffset;
                dir = "down";
            } else if(spaceDiff < 0) {
                ddMaxHeight = o.maxHeight ? o.maxHeight : topSpace;
                ddY = $display.offsetFrom($ddCtx).top - Math.min(ddMaxHeight, $dd.outerHeight());
                dir = "up";
            } else {
                ddMaxHeight = o.maxHeight ? o.maxHeight : "none";
                ddY = bottomOffset;
                dir = "down";
            }
            
            ml = ("" + $("body").css("margin-left")).match(/^\d+/) ? $("body").css("margin-left") : 0;
            mt = ("" + $("body").css("margin-top")).match(/^\d+/) ? $("body").css("margin-top") : 0;
            bodyX = $().jquery >= "1.4.2"
                ? parseInt(ml)
                : $("body").offset().left;
            bodyY = $().jquery >= "1.4.2"
                ? parseInt(mt)
                : $("body").offset().top;
            
            
            // modify dropdown css for display
            $dd.hide().css({
                left: ddX + ($ddCtx.is("body") ? bodyX : 0),
                maxHeight: ddMaxHeight,
                position: "absolute",
                top: ddY + ($ddCtx.is("body") ? bodyY : 0),
                visibility: "visible"
            });
            if(dir === "up") {
              $dd.addClass("above");
            }
            return dir;
        };
        
        // when the user explicitly clicks the display
        clickSB = function( e ) {
            if($sb.is(".open")) {
                closeSB();
            } else {
                openSB();
            }
            return false;
        };
        
        // when the user selects an item in any manner
        selectItem = function() {
            var $item = $(this),
                oldVal = $orig.val(),
                newVal = $item.data("value");
            
            // update the original <select>
            $orig.find("option").each(function() { this.selected = false; });
            $($item.data("orig")).each(function() { this.selected = true; });
            
            // change the selection to this item
            $items.removeClass("selected");
            $item.addClass("selected");
            $sb.attr("aria-active-descendant", $item.attr("id"));
            
            // update the title attr and the display markup
            $display.find(".text").attr("title", $item.find(".text").html());
            $display.find(".text").html(o.displayFormat.call($item.data("orig")));
            
            // trigger change on the old <select> if necessary
            if(oldVal !== newVal) {
                $orig.change();
            }
        };
        
        // when the user explicitly clicks an item
        clickSBItem = function( e ) {
            closeAndUnbind();
            $orig.focus();
            selectItem.call(this);
            return false;
        };
        
        // start over for generating the search term
        clearSearchTerm = function() {
            searchTerm = "";
        };
        
        // iterate over all the options to see if any match the search term
        findMatchingItem = function( term ) {
            var i, t, $tNode,
                $available = getEnabled();
            for(i=0; i < $available.size(); i++) {
                $tNode = $available.eq(i).find(".text");
                t = $tNode.children().size() == 0 ? $tNode.text() : $tNode.find("*").text();
                if(term.length > 0 && t.toLowerCase().match("^" + term.toLowerCase())) {
                    return $available.eq(i);
                }
            }
            return null;
        };
        
        // if we get a match for any options, select it
        selectMatchingItem = function( text ) {
            var $matchingItem = findMatchingItem(text);
            if($matchingItem !== null) {
                selectItem.call($matchingItem[0]);
                return true;
            }
            return false;
        };
        
        // stop up/down/backspace/space from moving the page
        stopPageHotkeys = function( e ) {
            if(e.ctrlKey || e.altKey) {
                return;
            }
            if(e.which === 38 || e.which === 40 || e.which === 8 || e.which === 32) {
                e.preventDefault();
            }
        };
        
        // if a normal match fails, try matching the next element that starts with the pressed letter
        selectNextItemStartsWith = function( c ) {
            var i, t,
                $selected = getSelected(),
                $available = getEnabled();
            for(i = $available.index($selected) + 1; i < $available.size(); i++) {
                t = $available.eq(i).find(".text").text();
                if(t !== "" && t.substring(0,1).toLowerCase() === c.toLowerCase()) {
                    selectItem.call($available.eq(i)[0]);
                    return true;
                }
            }
            return false;
        };
        
        // go up/down using arrows or attempt to autocomplete based on string
        keydownSB = function( e ) {
            if(e.altKey || e.ctrlKey) {
                return false;
            }
            var $selected = getSelected(),
                $enabled = getEnabled();
            switch(e.which) {
            case 9: // tab
                closeSB();
                blurSB();
                break;
            case 35: // end
                if($selected.size() > 0) {
                    e.preventDefault();
                    selectItem.call($enabled.filter(":last")[0]);
                    centerOnSelected();
                }
                break;
            case 36: // home
                if($selected.size() > 0) {
                    e.preventDefault();
                    selectItem.call($enabled.filter(":first")[0]);
                    centerOnSelected();
                }
                break;
            case 38: // up
                if($selected.size() > 0) {
                    if($enabled.filter(":first")[0] !== $selected[0]) {
                        e.preventDefault();
                        selectItem.call($enabled.eq($enabled.index($selected)-1)[0]);
                    }
                    centerOnSelected();
                }
                break;
            case 40: // down
                if($selected.size() > 0) {
                    if($enabled.filter(":last")[0] !== $selected[0]) {
                        e.preventDefault();
                        selectItem.call($enabled.eq($enabled.index($selected)+1)[0]);
                        centerOnSelected();
                    }
                } else if($items.size() > 1) {
                    e.preventDefault();
                    selectItem.call($items.eq(0)[0]);
                }
                break;
            default:
                break;
            }
        };
        
        // the user is typing -- try to select an item based on what they press
        keyupSB = function( e ) {
            if(e.altKey || e.ctrlKey) {
              return false;
            }
            if(e.which !== 38 && e.which !== 40) {
                
                // add to the search term
                searchTerm += String.fromCharCode(e.keyCode);
                
                if(selectMatchingItem(searchTerm)) {
                
                    // we found a match, continue with the current search term
                    clearTimeout(cstTimeout);
                    cstTimeout = setTimeout(clearSearchTerm, o.acTimeout);
                    
                } else if(selectNextItemStartsWith(String.fromCharCode(e.keyCode))) {
                    
                    // we selected the next item that starts with what you just pressed
                    centerOnSelected();
                    clearTimeout(cstTimeout);
                    cstTimeout = setTimeout(clearSearchTerm, o.acTimeout);
                    
                } else {
                    
                    // no matches were found, clear everything
                    clearSearchTerm();
                    clearTimeout(cstTimeout);
                    
                }
            }
        };
        
        // when the sb is focused (by tab or click), allow hotkey selection and kill all other selectboxes
        focusSB = function() {
            closeAllButMe();
            $sb.addClass("focused");
            $(document)
                .click(closeAndUnbind)
                .keyup(keyupSB)
                .keypress(stopPageHotkeys)
                .keydown(stopPageHotkeys)
                .keydown(keydownSB);
        };
        
        // when the sb is blurred (by tab or click), disable hotkey selection
        blurSB = function() {
            $sb.removeClass("focused");
            $display.removeClass("active");
            $(document)
                .unbind("keyup", keyupSB)
                .unbind("keydown", stopPageHotkeys)
                .unbind("keypress", stopPageHotkeys)
                .unbind("keydown", keydownSB);
        };
        
        // add hover class to an element
        addHoverState = function() {
          $(this).addClass("hover");
        };
        
        // remove hover class from an element
        removeHoverState = function() {
          $(this).removeClass("hover");
        };
        
        // add active class to the display
        addActiveState = function() {
          $display.addClass("active");
          $(document).bind("mouseup", removeActiveState);
        };
        
        // remove active class from an element
        removeActiveState = function() {
          $display.removeClass("active");
          $(document).unbind("mouseup", removeActiveState);
        };
        
        // constructor
        this.init = function( opts ) {
            
            // this plugin is not compatible with IE6 and below;
            // a normal <select> will be displayed for old browsers
            if($.browser.msie && $.browser.version < 7) {
              return;
            }
        
            // get the original <select> and <label>
            $orig = $(this.elem);
            if($orig.attr("id")) {
                $label = $("label[for='" + $orig.attr("id") + "']:first");
            }
            if(!$label || $label.size() === 0) {
                $label = $orig.closest("label");
            }
            
            // don't create duplicate SBs
            if($orig.hasClass("has_sb")) {
                return;
            }
            
            // set the various options
            o = $.extend({
                acTimeout: 800,               // time between each keyup for the user to create a search string
                animDuration: 200,            // time to open/close dropdown in ms
                ddCtx: 'body',                // body | self | any selector | a function that returns a selector (the original select is the context)
                dropupThreshold: 150,         // the minimum amount of extra space required above the selectbox for it to display a dropup
                fixedWidth: false,            // if false, dropdown expands to widest and display conforms to whatever is selected
                maxHeight: false,             // if an integer, show scrollbars if the dropdown is too tall
                maxWidth: false,              // if an integer, prevent the display/dropdown from growing past this width; longer items will be clipped
                selectboxClass: 'selectbox',  // class to apply our markup
                useTie: false,                // if jquery.tie is included and this is true, the selectbox will update dynamically
                
                // markup appended to the display, typically for styling an arrow
                arrowMarkup: "<div class='arrow_btn'><span class='arrow'></span></div>",
                
                // use optionFormat by default
                displayFormat: undefined,
                
                // formatting for the display; note that it will be wrapped with <a href='#'><span class='text'></span></a>
                optionFormat: function( ogIndex, optIndex ) {
                    if($(this).size() > 0) {
                        var label = $(this).attr("label");
                        if(label && label.length > 0) {
                          return label;
                        }
                        return $(this).text();
                    } else {
                        return "";
                    }
                },
                
                // the function to produce optgroup markup
                optgroupFormat: function( ogIndex ) {
                    return "<span class='label'>" + $(this).attr("label") + "</span>";
                }
            }, opts);
            o.displayFormat = o.displayFormat || o.optionFormat;
            
            // generate the new sb
            loadSB();
        };
        
        // public method interface
        this.open = openSB;
        this.close = closeSB;
        this.refresh = reloadSB;
        this.destroy = destroySB;
        this.options = function( opts ) {
            o = $.extend(o, opts);
            reloadSB();
        };
    };

    $.proto("sb", SelectBox);

}(jQuery, window));
/* ---------------------------------------- /includes/scripts/jquery.validate.js ---------------------------------------- */
/**
 * jQuery Validation Plugin 1.9.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($) {

$.extend($.fn, {
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if (!this.length) {
			options && options.debug && window.console && console.warn( "nothing selected, can't validate, returning nothing" );
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data(this[0], 'validator');
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr('novalidate', 'novalidate');

		validator = new $.validator( options, this[0] );
		$.data(this[0], 'validator', validator);

		if ( validator.settings.onsubmit ) {

			var inputsAndButtons = this.find("input, button");

			// allow suppresing validation by adding a cancel class to the submit button
			inputsAndButtons.filter(".cancel").click(function () {
				validator.cancelSubmit = true;
			});

			// when a submitHandler is used, capture the submitting button
			if (validator.settings.submitHandler) {
				inputsAndButtons.filter(":submit").click(function () {
					validator.submitButton = this;
				});
			}

			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug )
					// prevent form submit to be able to see console output
					event.preventDefault();

				function handle() {
					if ( validator.settings.submitHandler ) {
						if (validator.submitButton) {
							// insert a hidden input as a replacement for the missing submit button
							var hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);
						}
						validator.settings.submitHandler.call( validator, validator.currentForm );
						if (validator.submitButton) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						return false;
					}
					return true;
				}

				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}

		return validator;
	},
	// http://docs.jquery.com/Plugins/Validation/valid
	valid: function() {
        if ( $(this[0]).is('form')) {
            return this.validate().form();
        } else {
            var valid = true;
            var validator = $(this[0].form).validate();
            this.each(function() {
				valid &= validator.element(this);
            });
            return valid;
        }
    },
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function(attributes) {
		var result = {},
			$element = this;
		$.each(attributes.split(/\s/), function(index, value) {
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		});
		return result;
	},
	// http://docs.jquery.com/Plugins/Validation/rules
	rules: function(command, argument) {
		var element = this[0];

		if (command) {
			var settings = $.data(element.form, 'validator').settings;
			var staticRules = settings.rules;
			var existingRules = $.validator.staticRules(element);
			switch(command) {
			case "add":
				$.extend(existingRules, $.validator.normalizeRule(argument));
				staticRules[element.name] = existingRules;
				if (argument.messages)
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				break;
			case "remove":
				if (!argument) {
					delete staticRules[element.name];
					return existingRules;
				}
				var filtered = {};
				$.each(argument.split(/\s/), function(index, method) {
					filtered[method] = existingRules[method];
					delete existingRules[method];
				});
				return filtered;
			}
		}

		var data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.metadataRules(element),
			$.validator.classRules(element),
			$.validator.attributeRules(element),
			$.validator.staticRules(element)
		), element);

		// make sure required is at front
		if (data.required) {
			var param = data.required;
			delete data.required;
			data = $.extend({required: param}, data);
		}

		return data;
	}
});

// Custom selectors
$.extend($.expr[":"], {
	// http://docs.jquery.com/Plugins/Validation/blank
	blank: function(a) {return !$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/filled
	filled: function(a) {return !!$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/unchecked
	unchecked: function(a) {return !a.checked;}
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

$.validator.format = function(source, params) {
	if ( arguments.length == 1 )
		return function() {
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.validator.format.apply( this, args );
		};
	if ( arguments.length > 2 && params.constructor != Array  ) {
		params = $.makeArray(arguments).slice(1);
	}
	if ( params.constructor != Array ) {
		params = [ params ];
	}
	$.each(params, function(i, n) {
		source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	});
	return source;
};

$.extend($.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignoreTitle: false,
		onfocusin: function(element, event) {
			this.lastActive = element;

			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				this.settings.unhighlight && this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				this.addWrapper(this.errorsFor(element)).hide();
			}
		},
		onfocusout: function(element, event) {
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
				this.element(element);
			}
		},
		onkeyup: function(element, event) {
			if ( element.name in this.submitted || element == this.lastElement ) {
				this.element(element);
			}
		},
		onclick: function(element, event) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted )
				this.element(element);
			// or option elements, check parent select in that case
			else if (element.parentNode.name in this.submitted)
				this.element(element.parentNode);
		},
		highlight: function(element, errorClass, validClass) {
			if (element.type === 'radio') {
				this.findByName(element.name).addClass(errorClass).removeClass(validClass);
			} else {
				$(element).addClass(errorClass).removeClass(validClass);
			}
		},
		unhighlight: function(element, errorClass, validClass) {
			if (element.type === 'radio') {
				this.findByName(element.name).removeClass(errorClass).addClass(validClass);
			} else {
				$(element).removeClass(errorClass).addClass(validClass);
			}
		}
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
	setDefaults: function(settings) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		accept: "Please enter a value with a valid extension.",
		maxlength: $.validator.format("Please enter no more than {0} characters."),
		minlength: $.validator.format("Please enter at least {0} characters."),
		rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
		range: $.validator.format("Please enter a value between {0} and {1}."),
		max: $.validator.format("Please enter a value less than or equal to {0}."),
		min: $.validator.format("Please enter a value greater than or equal to {0}.")
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $(this.settings.errorLabelContainer);
			this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
			this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = (this.groups = {});
			$.each(this.settings.groups, function(key, value) {
				$.each(value.split(/\s/), function(index, name) {
					groups[name] = key;
				});
			});
			var rules = this.settings.rules;
			$.each(rules, function(key, value) {
				rules[key] = $.validator.normalizeRule(value);
			});

			function delegate(event) {
				var validator = $.data(this[0].form, "validator"),
					eventType = "on" + event.type.replace(/^validate/, "");
				validator.settings[eventType] && validator.settings[eventType].call(validator, this[0], event);
			}
			$(this.currentForm)
			       .validateDelegate("[type='text'], [type='password'], [type='file'], select, textarea, " +
						"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
						"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
						"[type='week'], [type='time'], [type='datetime-local'], " +
						"[type='range'], [type='color'] ",
						"focusin focusout keyup", delegate)
				.validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

			if (this.settings.invalidHandler)
				$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/form
		form: function() {
			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalid = $.extend({}, this.errorMap);
			if (!this.valid())
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
				this.check( elements[i] );
			}
			return this.valid();
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/element
		element: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element );
			if ( result ) {
				delete this.invalid[element.name];
			} else {
				this.invalid[element.name] = true;
			}
			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
		showErrors: function(errors) {
			if(errors) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[name],
						element: this.findByName(name)[0]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function(element) {
					return !(element.name in errors);
				});
			}
			this.settings.showErrors
				? this.settings.showErrors.call( this, this.errorMap, this.errorList )
				: this.defaultShowErrors();
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
		resetForm: function() {
			if ( $.fn.resetForm )
				$( this.currentForm ).resetForm();
			this.submitted = {};
			this.lastElement = null;
			this.prepareForm();
			this.hideErrors();
			this.elements().removeClass( this.settings.errorClass );
		},

		numberOfInvalids: function() {
			return this.objectLength(this.invalid);
		},

		objectLength: function( obj ) {
			var count = 0;
			for ( var i in obj )
				count++;
			return count;
		},

		hideErrors: function() {
			this.addWrapper( this.toHide ).hide();
		},

		valid: function() {
			return this.size() == 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if( this.settings.focusInvalid ) {
				try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
					.filter(":visible")
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger("focusin");
				} catch(e) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function(n) {
				return n.element.name == lastActive.name;
			}).length == 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// select all valid inputs inside the form (no submit or reset buttons)
			return $(this.currentForm)
			.find("input, select, textarea")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				!this.name && validator.settings.debug && window.console && console.error( "%o has no name assigned", this);

				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) )
					return false;

				rulesCache[this.name] = true;
				return true;
			});
		},

		clean: function( selector ) {
			return $( selector )[0];
		},

		errors: function() {
			return $( this.settings.errorElement + "." + this.settings.errorClass, this.errorContext );
		},

		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $([]);
			this.toHide = $([]);
			this.currentElements = $([]);
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor(element);
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $(element).rules();
			var dependencyMismatch = false;
			for (var method in rules ) {
				var rule = { method: method, parameters: rules[method] };
				try {
					var result = $.validator.methods[method].call( this, element.value.replace(/\r/g, ""), element, rule.parameters );

					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result == "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result == "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					}

					if( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch(e) {
					this.settings.debug && window.console && console.log("exception occured when checking element " + element.id
						 + ", check the '" + rule.method + "' method", e);
					throw e;
				}
			}
			if (dependencyMismatch)
				return;
			if ( this.objectLength(rules) )
				this.successList.push(element);
			return true;
		},

		// return the custom message for the given element and validation method
		// specified in the element's "messages" metadata
		customMetaMessage: function(element, method) {
			if (!$.metadata)
				return;

			var meta = this.settings.meta
				? $(element).metadata()[this.settings.meta]
				: $(element).metadata();

			return meta && meta.messages && meta.messages[method];
		},

		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[name];
			return m && (m.constructor == String
				? m
				: m[method]);
		},

		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for(var i = 0; i < arguments.length; i++) {
				if (arguments[i] !== undefined)
					return arguments[i];
			}
			return undefined;
		},

		defaultMessage: function( element, method) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customMetaMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message == "function" ) {
				message = message.call(this, rule.parameters, element);
			} else if (theregex.test(message)) {
				message = jQuery.format(message.replace(theregex, '{$1}'), rule.parameters);
			}
			this.errorList.push({
				message: message,
				element: element
			});

			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},

		addWrapper: function(toToggle) {
			if ( this.settings.wrapper )
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			return toToggle;
		},

		defaultShowErrors: function() {
			for ( var i = 0; this.errorList[i]; i++ ) {
				var error = this.errorList[i];
				this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				this.showLabel( error.element, error.message );
			}
			if( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if (this.settings.success) {
				for ( var i = 0; this.successList[i]; i++ ) {
					this.showLabel( this.successList[i] );
				}
			}
			if (this.settings.unhighlight) {
				for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) {
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not(this.invalidElements());
		},

		invalidElements: function() {
			return $(this.errorList).map(function() {
				return this.element;
			});
		},

		showLabel: function(element, message) {
			var label = this.errorsFor( element );
			if ( label.length ) {
				// refresh error/success class
				label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

				// check if we have a generated label, replace the message then
				label.attr("generated") && label.html(message);
			} else {
				// create label
				label = $("<" + this.settings.errorElement + "/>")
					.attr({"for":  this.idOrName(element), generated: true})
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				}
				if ( !this.labelContainer.append(label).length )
					this.settings.errorPlacement
						? this.settings.errorPlacement(label, $(element) )
						: label.insertAfter(element);
			}
			if ( !message && this.settings.success ) {
				label.text("");
				typeof this.settings.success == "string"
					? label.addClass( this.settings.success )
					: this.settings.success( label );
			}
			this.toShow = this.toShow.add(label);
		},

		errorsFor: function(element) {
			var name = this.idOrName(element);
    		return this.errors().filter(function() {
				return $(this).attr('for') == name;
			});
		},

		idOrName: function(element) {
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		},

		validationTargetFor: function(element) {
			// if radio/checkbox, validate first element in group instead
			if (this.checkable(element)) {
				element = this.findByName( element.name ).not(this.settings.ignore)[0];
			}
			return element;
		},

		checkable: function( element ) {
			return /radio|checkbox/i.test(element.type);
		},

		findByName: function( name ) {
			// select by name and filter by form for performance over form.find("[name=...]")
			var form = this.currentForm;
			return $(document.getElementsByName(name)).map(function(index, element) {
				return element.form == form && element.name == name && element  || null;
			});
		},

		getLength: function(value, element) {
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				return $("option:selected", element).length;
			case 'input':
				if( this.checkable( element) )
					return this.findByName(element.name).filter(':checked').length;
			}
			return value.length;
		},

		depend: function(param, element) {
			return this.dependTypes[typeof param]
				? this.dependTypes[typeof param](param, element)
				: true;
		},

		dependTypes: {
			"boolean": function(param, element) {
				return param;
			},
			"string": function(param, element) {
				return !!$(param, element.form).length;
			},
			"function": function(param, element) {
				return param(element);
			}
		},

		optional: function(element) {
			return !$.validator.methods.required.call(this, $.trim(element.value), element) && "dependency-mismatch";
		},

		startRequest: function(element) {
			if (!this.pending[element.name]) {
				this.pendingRequest++;
				this.pending[element.name] = true;
			}
		},

		stopRequest: function(element, valid) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if (this.pendingRequest < 0)
				this.pendingRequest = 0;
			delete this.pending[element.name];
			if ( valid && this.pendingRequest == 0 && this.formSubmitted && this.form() ) {
				$(this.currentForm).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest == 0 && this.formSubmitted) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
				this.formSubmitted = false;
			}
		},

		previousValue: function(element) {
			return $.data(element, "previousValue") || $.data(element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}

	},

	classRuleSettings: {
		required: {required: true},
		email: {email: true},
		url: {url: true},
		date: {date: true},
		dateISO: {dateISO: true},
		dateDE: {dateDE: true},
		number: {number: true},
		numberDE: {numberDE: true},
		digits: {digits: true},
		creditcard: {creditcard: true}
	},

	addClassRules: function(className, rules) {
		className.constructor == String ?
			this.classRuleSettings[className] = rules :
			$.extend(this.classRuleSettings, className);
	},

	classRules: function(element) {
		var rules = {};
		var classes = $(element).attr('class');
		classes && $.each(classes.split(' '), function() {
			if (this in $.validator.classRuleSettings) {
				$.extend(rules, $.validator.classRuleSettings[this]);
			}
		});
		return rules;
	},

	attributeRules: function(element) {
		var rules = {};
		var $element = $(element);

		for (var method in $.validator.methods) {
			var value;
			// If .prop exists (jQuery >= 1.6), use it to get true/false for required
			if (method === 'required' && typeof $.fn.prop === 'function') {
				value = $element.prop(method);
			} else {
				value = $element.attr(method);
			}
			if (value) {
				rules[method] = value;
			} else if ($element[0].getAttribute("type") === method) {
				rules[method] = true;
			}
		}

		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
			delete rules.maxlength;
		}

		return rules;
	},

	metadataRules: function(element) {
		if (!$.metadata) return {};

		var meta = $.data(element.form, 'validator').settings.meta;
		return meta ?
			$(element).metadata()[meta] :
			$(element).metadata();
	},

	staticRules: function(element) {
		var rules = {};
		var validator = $.data(element.form, 'validator');
		if (validator.settings.rules) {
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
		}
		return rules;
	},

	normalizeRules: function(rules, element) {
		// handle dependency check
		$.each(rules, function(prop, val) {
			// ignore rule when param is explicitly false, eg. required:false
			if (val === false) {
				delete rules[prop];
				return;
			}
			if (val.param || val.depends) {
				var keepRule = true;
				switch (typeof val.depends) {
					case "string":
						keepRule = !!$(val.depends, element.form).length;
						break;
					case "function":
						keepRule = val.depends.call(element, element);
						break;
				}
				if (keepRule) {
					rules[prop] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[prop];
				}
			}
		});

		// evaluate parameters
		$.each(rules, function(rule, parameter) {
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		});

		// clean number parameters
		$.each(['minlength', 'maxlength', 'min', 'max'], function() {
			if (rules[this]) {
				rules[this] = Number(rules[this]);
			}
		});
		$.each(['rangelength', 'range'], function() {
			if (rules[this]) {
				rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
			}
		});

		if ($.validator.autoCreateRanges) {
			// auto-create ranges
			if (rules.min && rules.max) {
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			}
			if (rules.minlength && rules.maxlength) {
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		// To support custom messages in metadata ignore rule methods titled "messages"
		if (rules.messages) {
			delete rules.messages;
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function(data) {
		if( typeof data == "string" ) {
			var transformed = {};
			$.each(data.split(/\s/), function() {
				transformed[this] = true;
			});
			data = transformed;
		}
		return data;
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function(name, method, message) {
		$.validator.methods[name] = method;
		$.validator.messages[name] = message != undefined ? message : $.validator.messages[name];
		if (method.length < 3) {
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		}
	},

	methods: {

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function(value, element, param) {
			// check if dependency is met
			if ( !this.depend(param, element) )
				return "dependency-mismatch";
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			case 'input':
				if ( this.checkable(element) )
					return this.getLength(value, element) > 0;
			default:
				return $.trim(value).length > 0;
			}
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function(value, element, param) {
			if ( this.optional(element) )
				return "dependency-mismatch";

			var previous = this.previousValue(element);
			if (!this.settings.messages[element.name] )
				this.settings.messages[element.name] = {};
			previous.originalMessage = this.settings.messages[element.name].remote;
			this.settings.messages[element.name].remote = previous.message;

			param = typeof param == "string" && {url:param} || param;

			if ( this.pending[element.name] ) {
				return "pending";
			}
			if ( previous.old === value ) {
				return previous.valid;
			}

			previous.old = value;
			var validator = this;
			this.startRequest(element);
			var data = {};
			data[element.name] = value;
			$.ajax($.extend(true, {
				url: param,
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				success: function(response) {
					validator.settings.messages[element.name].remote = previous.originalMessage;
					var valid = response === true;
					if ( valid ) {
						var submitted = validator.formSubmitted;
						validator.prepareElement(element);
						validator.formSubmitted = submitted;
						validator.successList.push(element);
						validator.showErrors();
					} else {
						var errors = {};
						var message = response || validator.defaultMessage( element, "remote" );
						errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
						validator.showErrors(errors);
					}
					previous.valid = valid;
					validator.stopRequest(element, valid);
				}
			}, param));
			return "pending";
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function(value, element, param) {
			var length = this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/min
		min: function( value, element, param ) {
			return this.optional(element) || value >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/max
		max: function( value, element, param ) {
			return this.optional(element) || value <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/range
		range: function( value, element, param ) {
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function(value, element) {
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function(value, element) {
			return this.optional(element) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function(value, element) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function(value, element) {
			return this.optional(element) || /^\d+$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function(value, element) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			// accept only spaces, digits and dashes
			if (/[^0-9 -]+/.test(value))
				return false;
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (var n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n);
				var nDigit = parseInt(cDigit, 10);
				if (bEven) {
					if ((nDigit *= 2) > 9)
						nDigit -= 9;
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return (nCheck % 10) == 0;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/accept
		accept: function(value, element, param) {
			param = typeof param == "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
			return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function(value, element, param) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $(param).unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
				$(element).valid();
			});
			return value == target.val();
		}

	}

});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

})(jQuery);

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
;(function($) {
	var pendingRequests = {};
	// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) {
		$.ajaxPrefilter(function(settings, _, xhr) {
			var port = settings.port;
			if (settings.mode == "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = xhr;
			}
		});
	} else {
		// Proxy ajax
		var ajax = $.ajax;
		$.ajax = function(settings) {
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if (mode == "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				return (pendingRequests[port] = ajax.apply(this, arguments));
			}
			return ajax.apply(this, arguments);
		};
	}
})(jQuery);

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
;(function($) {
	// only implement if not provided by jQuery core (since 1.4)
	// TODO verify if jQuery 1.4's implementation is compatible with older jQuery special-event APIs
	if (!jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener) {
		$.each({
			focus: 'focusin',
			blur: 'focusout'
		}, function( original, fix ){
			$.event.special[fix] = {
				setup:function() {
					this.addEventListener( original, handler, true );
				},
				teardown:function() {
					this.removeEventListener( original, handler, true );
				},
				handler: function(e) {
					arguments[0] = $.event.fix(e);
					arguments[0].type = fix;
					return $.event.handle.apply(this, arguments);
				}
			};
			function handler(e) {
				e = $.event.fix(e);
				e.type = fix;
				return $.event.handle.call(this, e);
			}
		});
	};
	$.extend($.fn, {
		validateDelegate: function(delegate, type, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		}
	});
})(jQuery);

/* ---------------------------------------- /includes/scripts/jquery.metadata.js ---------------------------------------- */
/*
 * Metadata - jQuery plugin for parsing metadata from elements
 *
 * Copyright (c) 2006 John Resig, Yehuda Katz, J�örn Zaefferer, Paul McLanahan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.metadata.js 4187 2007-12-16 17:15:27Z joern.zaefferer $
 *
 */

/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are three supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *          
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *   
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *          
 * The metadata for an element is loaded the first time the element is accessed via jQuery.
 *
 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
 * 
 * @name $.metadata.setType
 *
 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("class")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from the class attribute
 * 
 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("attr", "data")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a "data" attribute
 * 
 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
 * @before $.metadata.setType("elem", "script")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a nested script element
 * 
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 * @cat Plugins/Metadata
 * @descr Sets the type of encoding to be used when loading metadata for the first time
 * @type undefined
 * @see metadata()
 */

(function($) {

$.extend({
	metadata : {
		defaults : {
			type: 'class',
			name: 'metadata',
			cre: /({.*})/,
			single: 'metadata'
		},
		setType: function( type, name ){
			this.defaults.type = type;
			this.defaults.name = name;
		},
		get: function( elem, opts ){
			var settings = $.extend({},this.defaults,opts);
			// check for empty string in single property
			if ( !settings.single.length ) settings.single = 'metadata';
			
			var data = $.data(elem, settings.single);
			// returned cached data if it already exists
			if ( data ) return data;
			
			data = "{}";
			
			if ( settings.type == "class" ) {
				var m = settings.cre.exec( elem.className );
				if ( m )
					data = m[1];
			} else if ( settings.type == "elem" ) {
				if( !elem.getElementsByTagName )
					return undefined;
				var e = elem.getElementsByTagName(settings.name);
				if ( e.length )
					data = $.trim(e[0].innerHTML);
			} else if ( elem.getAttribute != undefined ) {
				var attr = elem.getAttribute( settings.name );
				if ( attr )
					data = attr;
			}
			
			if ( data.indexOf( '{' ) <0 )
			data = "{" + data + "}";
			
			data = eval("(" + data + ")");
			
			$.data( elem, settings.single, data );
			return data;
		}
	}
});

/**
 * Returns the metadata object for the first member of the jQuery object.
 *
 * @name metadata
 * @descr Returns element's metadata object
 * @param Object opts An object contianing settings to override the defaults
 * @type jQuery
 * @cat Plugins/Metadata
 */
$.fn.metadata = function( opts ){
	return $.metadata.get( this[0], opts );
};

})(jQuery);
/* ---------------------------------------- /includes/jsbin/jquery.form.js ---------------------------------------- */
/*!
 * jQuery Form Plugin
 * version: 2.95 (30-JAN-2012)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */
;(function($) {

/*
	Usage Note:
	-----------
	Do not use both ajaxSubmit and ajaxForm on the same form.  These
	functions are intended to be exclusive.  Use ajaxSubmit if you want
	to bind your own submit handler to the form.  For example,

	$(document).ready(function() {
		$('#myForm').bind('submit', function(e) {
			e.preventDefault(); // <-- important
			$(this).ajaxSubmit({
				target: '#output'
			});
		});
	});

	Use ajaxForm when you want the plugin to manage all the event binding
	for you.  For example,

	$(document).ready(function() {
		$('#myForm').ajaxForm({
			target: '#output'
		});
	});

	When using ajaxForm, the ajaxSubmit function will be invoked for you
	at the appropriate time.
*/

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
	// fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
	if (!this.length) {
		log('ajaxSubmit: skipping submit process - no element selected');
		return this;
	}
	
	var method, action, url, $form = this;

	if (typeof options == 'function') {
		options = { success: options };
	}

	method = this.attr('method');
	action = this.attr('action');
	url = (typeof action === 'string') ? $.trim(action) : '';
	url = url || window.location.href || '';
	if (url) {
		// clean url (don't include hash vaue)
		url = (url.match(/^([^#]+)/)||[])[1];
	}

	options = $.extend(true, {
		url:  url,
		success: $.ajaxSettings.success,
		type: method || 'GET',
		iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
	}, options);

	// hook for manipulating the form data before it is extracted;
	// convenient for use with rich editors like tinyMCE or FCKEditor
	var veto = {};
	this.trigger('form-pre-serialize', [this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
		return this;
	}

	// provide opportunity to alter form data before it is serialized
	if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSerialize callback');
		return this;
	}

	var traditional = options.traditional;
	if ( traditional === undefined ) {
		traditional = $.ajaxSettings.traditional;
	}
	
	var qx,n,v,a = this.formToArray(options.semantic);
	if (options.data) {
		options.extraData = options.data;
		qx = $.param(options.data, traditional);
	}

	// give pre-submit callback an opportunity to abort the submit
	if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSubmit callback');
		return this;
	}

	// fire vetoable 'validate' event
	this.trigger('form-submit-validate', [a, this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
		return this;
	}

	var q = $.param(a, traditional);
	if (qx) {
		q = ( q ? (q + '&' + qx) : qx );
	}	
	if (options.type.toUpperCase() == 'GET') {
		options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
		options.data = null;  // data is null for 'get'
	}
	else {
		options.data = q; // data is the query string for 'post'
	}

	var callbacks = [];
	if (options.resetForm) {
		callbacks.push(function() { $form.resetForm(); });
	}
	if (options.clearForm) {
		callbacks.push(function() { $form.clearForm(options.includeHidden); });
	}

	// perform a load on the target only if dataType is not provided
	if (!options.dataType && options.target) {
		var oldSuccess = options.success || function(){};
		callbacks.push(function(data) {
			var fn = options.replaceTarget ? 'replaceWith' : 'html';
			$(options.target)[fn](data).each(oldSuccess, arguments);
		});
	}
	else if (options.success) {
		callbacks.push(options.success);
	}

	options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
		var context = options.context || options;	// jQuery 1.4+ supports scope context 
		for (var i=0, max=callbacks.length; i < max; i++) {
			callbacks[i].apply(context, [data, status, xhr || $form, $form]);
		}
	};

	// are there files to upload?
	var fileInputs = $('input:file:enabled[value]', this); // [value] (issue #113)
	var hasFileInputs = fileInputs.length > 0;
	var mp = 'multipart/form-data';
	var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

	var fileAPI = !!(hasFileInputs && fileInputs.get(0).files && window.FormData);
	log("fileAPI :" + fileAPI);
	var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

	// options.iframe allows user to force iframe mode
	// 06-NOV-09: now defaulting to iframe mode if file input is detected
	if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
		// hack to fix Safari hang (thanks to Tim Molendijk for this)
		// see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
		if (options.closeKeepAlive) {
			$.get(options.closeKeepAlive, function() {
				fileUploadIframe(a);
			});
		}
  		else {
			fileUploadIframe(a);
  		}
	}
	else if ((hasFileInputs || multipart) && fileAPI) {
		options.progress = options.progress || $.noop;
		fileUploadXhr(a);
	}
	else {
		$.ajax(options);
	}

	 // fire 'notify' event
	 this.trigger('form-submit-notify', [this, options]);
	 return this;

	 // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
	function fileUploadXhr(a) {
		var formdata = new FormData();

		for (var i=0; i < a.length; i++) {
			if (a[i].type == 'file')
				continue;
			formdata.append(a[i].name, a[i].value);
		}

		$form.find('input:file:enabled').each(function(){
			var name = $(this).attr('name'), files = this.files;
			if (name) {
				for (var i=0; i < files.length; i++)
					formdata.append(name, files[i]);
			}
		});

		if (options.extraData) {
			for (var k in options.extraData)
				formdata.append(k, options.extraData[k])
		}

		options.data = null;

		var s = $.extend(true, {}, $.ajaxSettings, options, {
			contentType: false,
			processData: false,
			cache: false,
			type: 'POST'
		});

      //s.context = s.context || s;

      s.data = null;
      var beforeSend = s.beforeSend;
      s.beforeSend = function(xhr, o) {
          o.data = formdata;
          if(xhr.upload) { // unfortunately, jQuery doesn't expose this prop (http://bugs.jquery.com/ticket/10190)
              xhr.upload.onprogress = function(event) {
                  o.progress(event.position, event.total);
              };
          }
          if(beforeSend)
              beforeSend.call(o, xhr, options);
      };
      $.ajax(s);
   }

	// private function for handling file uploads (hat tip to YAHOO!)
	function fileUploadIframe(a) {
		var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
		var useProp = !!$.fn.prop;

		if (a) {
			if ( useProp ) {
				// ensure that every serialized input is still enabled
				for (i=0; i < a.length; i++) {
					el = $(form[a[i].name]);
					el.prop('disabled', false);
				}
			} else {
				for (i=0; i < a.length; i++) {
					el = $(form[a[i].name]);
					el.removeAttr('disabled');
				}
			};
		}

		if ($(':input[name=submit],:input[id=submit]', form).length) {
			// if there is an input with a name or id of 'submit' then we won't be
			// able to invoke the submit fn on the form (at least not x-browser)
			alert('Error: Form elements must not have name or id of "submit".');
			return;
		}
		
		s = $.extend(true, {}, $.ajaxSettings, options);
		s.context = s.context || s;
		id = 'jqFormIO' + (new Date().getTime());
		if (s.iframeTarget) {
			$io = $(s.iframeTarget);
			n = $io.attr('name');
			if (n == null)
			 	$io.attr('name', id);
			else
				id = n;
		}
		else {
			$io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
			$io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
		}
		io = $io[0];


		xhr = { // mock object
			aborted: 0,
			responseText: null,
			responseXML: null,
			status: 0,
			statusText: 'n/a',
			getAllResponseHeaders: function() {},
			getResponseHeader: function() {},
			setRequestHeader: function() {},
			abort: function(status) {
				var e = (status === 'timeout' ? 'timeout' : 'aborted');
				log('aborting upload... ' + e);
				this.aborted = 1;
				$io.attr('src', s.iframeSrc); // abort op in progress
				xhr.error = e;
				s.error && s.error.call(s.context, xhr, e, status);
				g && $.event.trigger("ajaxError", [xhr, s, e]);
				s.complete && s.complete.call(s.context, xhr, e);
			}
		};

		g = s.global;
		// trigger ajax global events so that activity/block indicators work like normal
		if (g && ! $.active++) {
			$.event.trigger("ajaxStart");
		}
		if (g) {
			$.event.trigger("ajaxSend", [xhr, s]);
		}

		if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
			if (s.global) {
				$.active--;
			}
			return;
		}
		if (xhr.aborted) {
			return;
		}

		// add submitting element to data if we know it
		sub = form.clk;
		if (sub) {
			n = sub.name;
			if (n && !sub.disabled) {
				s.extraData = s.extraData || {};
				s.extraData[n] = sub.value;
				if (sub.type == "image") {
					s.extraData[n+'.x'] = form.clk_x;
					s.extraData[n+'.y'] = form.clk_y;
				}
			}
		}
		
		var CLIENT_TIMEOUT_ABORT = 1;
		var SERVER_ABORT = 2;

		function getDoc(frame) {
			var doc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument ? frame.contentDocument : frame.document;
			return doc;
		}
		
		// Rails CSRF hack (thanks to Yvan Barthelemy)
		var csrf_token = $('meta[name=csrf-token]').attr('content');
		var csrf_param = $('meta[name=csrf-param]').attr('content');
		if (csrf_param && csrf_token) {
			s.extraData = s.extraData || {};
			s.extraData[csrf_param] = csrf_token;
		}

		// take a breath so that pending repaints get some cpu time before the upload starts
		function doSubmit() {
			// make sure form attrs are set
			var t = $form.attr('target'), a = $form.attr('action');

			// update form attrs in IE friendly way
			form.setAttribute('target',id);
			if (!method) {
				form.setAttribute('method', 'POST');
			}
			if (a != s.url) {
				form.setAttribute('action', s.url);
			}

			// ie borks in some cases when setting encoding
			if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
				$form.attr({
					encoding: 'multipart/form-data',
					enctype:  'multipart/form-data'
				});
			}

			// support timout
			if (s.timeout) {
				timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
			}
			
			// look for server aborts
			function checkState() {
				try {
					var state = getDoc(io).readyState;
					log('state = ' + state);
					if (state.toLowerCase() == 'uninitialized')
						setTimeout(checkState,50);
				}
				catch(e) {
					log('Server abort: ' , e, ' (', e.name, ')');
					cb(SERVER_ABORT);
					timeoutHandle && clearTimeout(timeoutHandle);
					timeoutHandle = undefined;
				}
			}

			// add "extra" data to form if provided in options
			var extraInputs = [];
			try {
				if (s.extraData) {
					for (var n in s.extraData) {
						extraInputs.push(
							$('<input type="hidden" name="'+n+'">').attr('value',s.extraData[n])
								.appendTo(form)[0]);
					}
				}

				if (!s.iframeTarget) {
					// add iframe to doc and submit the form
					$io.appendTo('body');
					io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
				}
				setTimeout(checkState,15);
				form.submit();
			}
			finally {
				// reset attrs and remove "extra" input elements
				form.setAttribute('action',a);
				if(t) {
					form.setAttribute('target', t);
				} else {
					$form.removeAttr('target');
				}
				$(extraInputs).remove();
			}
		}

		if (s.forceSync) {
			doSubmit();
		}
		else {
			setTimeout(doSubmit, 10); // this lets dom updates render
		}

		var data, doc, domCheckCount = 50, callbackProcessed;

		function cb(e) {
			if (xhr.aborted || callbackProcessed) {
				return;
			}
			try {
				doc = getDoc(io);
			}
			catch(ex) {
				log('cannot access response document: ', ex);
				e = SERVER_ABORT;
			}
			if (e === CLIENT_TIMEOUT_ABORT && xhr) {
				xhr.abort('timeout');
				return;
			}
			else if (e == SERVER_ABORT && xhr) {
				xhr.abort('server abort');
				return;
			}

			if (!doc || doc.location.href == s.iframeSrc) {
				// response not received yet
				if (!timedOut)
					return;
			}
			io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

			var status = 'success', errMsg;
			try {
				if (timedOut) {
					throw 'timeout';
				}

				var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
				log('isXml='+isXml);
				if (!isXml && window.opera && (doc.body == null || doc.body.innerHTML == '')) {
					if (--domCheckCount) {
						// in some browsers (Opera) the iframe DOM is not always traversable when
						// the onload callback fires, so we loop a bit to accommodate
						log('requeing onLoad callback, DOM not available');
						setTimeout(cb, 250);
						return;
					}
					// let this fall through because server response could be an empty document
					//log('Could not access iframe DOM after mutiple tries.');
					//throw 'DOMException: not available';
				}

				//log('response detected');
				var docRoot = doc.body ? doc.body : doc.documentElement;
				xhr.responseText = docRoot ? docRoot.innerHTML : null;
				xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
				if (isXml)
					s.dataType = 'xml';
				xhr.getResponseHeader = function(header){
					var headers = {'content-type': s.dataType};
					return headers[header];
				};
				// support for XHR 'status' & 'statusText' emulation :
				if (docRoot) {
					xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
					xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
				}

				var dt = (s.dataType || '').toLowerCase();
				var scr = /(json|script|text)/.test(dt);
				if (scr || s.textarea) {
					// see if user embedded response in textarea
					var ta = doc.getElementsByTagName('textarea')[0];
					if (ta) {
						xhr.responseText = ta.value;
						// support for XHR 'status' & 'statusText' emulation :
						xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
						xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
					}
					else if (scr) {
						// account for browsers injecting pre around json response
						var pre = doc.getElementsByTagName('pre')[0];
						var b = doc.getElementsByTagName('body')[0];
						if (pre) {
							xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
						}
						else if (b) {
							xhr.responseText = b.textContent ? b.textContent : b.innerText;
						}
					}
				}
				else if (dt == 'xml' && !xhr.responseXML && xhr.responseText != null) {
					xhr.responseXML = toXml(xhr.responseText);
				}

				try {
					data = httpData(xhr, dt, s);
				}
				catch (e) {
					status = 'parsererror';
					xhr.error = errMsg = (e || status);
				}
			}
			catch (e) {
				log('error caught: ',e);
				status = 'error';
				xhr.error = errMsg = (e || status);
			}

			if (xhr.aborted) {
				log('upload aborted');
				status = null;
			}

			if (xhr.status) { // we've set xhr.status
				status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
			}

			// ordering of these callbacks/triggers is odd, but that's how $.ajax does it
			if (status === 'success') {
				s.success && s.success.call(s.context, data, 'success', xhr);
				g && $.event.trigger("ajaxSuccess", [xhr, s]);
			}
			else if (status) {
				if (errMsg == undefined)
					errMsg = xhr.statusText;
				s.error && s.error.call(s.context, xhr, status, errMsg);
				g && $.event.trigger("ajaxError", [xhr, s, errMsg]);
			}

			g && $.event.trigger("ajaxComplete", [xhr, s]);

			if (g && ! --$.active) {
				$.event.trigger("ajaxStop");
			}

			s.complete && s.complete.call(s.context, xhr, status);

			callbackProcessed = true;
			if (s.timeout)
				clearTimeout(timeoutHandle);

			// clean up
			setTimeout(function() {
				if (!s.iframeTarget)
					$io.remove();
				xhr.responseXML = null;
			}, 100);
		}

		var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
			if (window.ActiveXObject) {
				doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async = 'false';
				doc.loadXML(s);
			}
			else {
				doc = (new DOMParser()).parseFromString(s, 'text/xml');
			}
			return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
		};
		var parseJSON = $.parseJSON || function(s) {
			return window['eval']('(' + s + ')');
		};

		var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4

			var ct = xhr.getResponseHeader('content-type') || '',
				xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
				data = xml ? xhr.responseXML : xhr.responseText;

			if (xml && data.documentElement.nodeName === 'parsererror') {
				$.error && $.error('parsererror');
			}
			if (s && s.dataFilter) {
				data = s.dataFilter(data, type);
			}
			if (typeof data === 'string') {
				if (type === 'json' || !type && ct.indexOf('json') >= 0) {
					data = parseJSON(data);
				} else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
					$.globalEval(data);
				}
			}
			return data;
		};
	}
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *	is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *	used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
	// in jQuery 1.3+ we can fix mistakes with the ready state
	if (this.length === 0) {
		var o = { s: this.selector, c: this.context };
		if (!$.isReady && o.s) {
			log('DOM not ready, queuing ajaxForm');
			$(function() {
				$(o.s,o.c).ajaxForm(options);
			});
			return this;
		}
		// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
		log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
		return this;
	}

	return this.ajaxFormUnbind().bind('submit.form-plugin', function(e) {
		if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
			e.preventDefault();
			$(this).ajaxSubmit(options);
		}
	}).bind('click.form-plugin', function(e) {
		var target = e.target;
		var $el = $(target);
		if (!($el.is(":submit,input:image"))) {
			// is this a child element of the submit el?  (ex: a span within a button)
			var t = $el.closest(':submit');
			if (t.length == 0) {
				return;
			}
			target = t[0];
		}
		var form = this;
		form.clk = target;
		if (target.type == 'image') {
			if (e.offsetX != undefined) {
				form.clk_x = e.offsetX;
				form.clk_y = e.offsetY;
			} else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
				var offset = $el.offset();
				form.clk_x = e.pageX - offset.left;
				form.clk_y = e.pageY - offset.top;
			} else {
				form.clk_x = e.pageX - target.offsetLeft;
				form.clk_y = e.pageY - target.offsetTop;
			}
		}
		// clear form vars
		setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
	});
};

// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
	return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
	var a = [];
	if (this.length === 0) {
		return a;
	}

	var form = this[0];
	var els = semantic ? form.getElementsByTagName('*') : form.elements;
	if (!els) {
		return a;
	}

	var i,j,n,v,el,max,jmax;
	for(i=0, max=els.length; i < max; i++) {
		el = els[i];
		n = el.name;
		if (!n) {
			continue;
		}

		if (semantic && form.clk && el.type == "image") {
			// handle image inputs on the fly when semantic == true
			if(!el.disabled && form.clk == el) {
				a.push({name: n, value: $(el).val(), type: el.type });
				a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
			}
			continue;
		}

		v = $.fieldValue(el, true);
		if (v && v.constructor == Array) {
			for(j=0, jmax=v.length; j < jmax; j++) {
				a.push({name: n, value: v[j]});
			}
		}
		else if (v !== null && typeof v != 'undefined') {
			a.push({name: n, value: v, type: el.type});
		}
	}

	if (!semantic && form.clk) {
		// input type=='image' are not found in elements array! handle it here
		var $input = $(form.clk), input = $input[0];
		n = input.name;
		if (n && !input.disabled && input.type == 'image') {
			a.push({name: n, value: $input.val()});
			a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
		}
	}
	return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
	//hand off to jQuery.param for proper encoding
	return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
	var a = [];
	this.each(function() {
		var n = this.name;
		if (!n) {
			return;
		}
		var v = $.fieldValue(this, successful);
		if (v && v.constructor == Array) {
			for (var i=0,max=v.length; i < max; i++) {
				a.push({name: n, value: v[i]});
			}
		}
		else if (v !== null && typeof v != 'undefined') {
			a.push({name: this.name, value: v});
		}
	});
	//hand off to jQuery.param for proper encoding
	return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *	  <input name="A" type="text" />
 *	  <input name="A" type="text" />
 *	  <input name="B" type="checkbox" value="B1" />
 *	  <input name="B" type="checkbox" value="B2"/>
 *	  <input name="C" type="radio" value="C1" />
 *	  <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *	array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
	for (var val=[], i=0, max=this.length; i < max; i++) {
		var el = this[i];
		var v = $.fieldValue(el, successful);
		if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
			continue;
		}
		v.constructor == Array ? $.merge(val, v) : val.push(v);
	}
	return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
	var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
	if (successful === undefined) {
		successful = true;
	}

	if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
		(t == 'checkbox' || t == 'radio') && !el.checked ||
		(t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
		tag == 'select' && el.selectedIndex == -1)) {
			return null;
	}

	if (tag == 'select') {
		var index = el.selectedIndex;
		if (index < 0) {
			return null;
		}
		var a = [], ops = el.options;
		var one = (t == 'select-one');
		var max = (one ? index+1 : ops.length);
		for(var i=(one ? index : 0); i < max; i++) {
			var op = ops[i];
			if (op.selected) {
				var v = op.value;
				if (!v) { // extra pain for IE...
					v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
				}
				if (one) {
					return v;
				}
				a.push(v);
			}
		}
		return a;
	}
	return $(el).val();
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function(includeHidden) {
	return this.each(function() {
		$('input,select,textarea', this).clearFields(includeHidden);
	});
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
	var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
	return this.each(function() {
		var t = this.type, tag = this.tagName.toLowerCase();
		if (re.test(t) || tag == 'textarea' || (includeHidden && /hidden/.test(t)) ) {
			this.value = '';
		}
		else if (t == 'checkbox' || t == 'radio') {
			this.checked = false;
		}
		else if (tag == 'select') {
			this.selectedIndex = -1;
		}
	});
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
	return this.each(function() {
		// guard against an input with the name of 'reset'
		// note that IE reports the reset function as an 'object'
		if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
			this.reset();
		}
	});
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
	if (b === undefined) {
		b = true;
	}
	return this.each(function() {
		this.disabled = !b;
	});
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
	if (select === undefined) {
		select = true;
	}
	return this.each(function() {
		var t = this.type;
		if (t == 'checkbox' || t == 'radio') {
			this.checked = select;
		}
		else if (this.tagName.toLowerCase() == 'option') {
			var $sel = $(this).parent('select');
			if (select && $sel[0] && $sel[0].type == 'select-one') {
				// deselect all other options
				$sel.find('option').selected(false);
			}
			this.selected = select;
		}
	});
};

// expose debug var
$.fn.ajaxSubmit.debug = false;

// helper fn for console logging
function log() {
	if (!$.fn.ajaxSubmit.debug) 
		return;
	var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
	if (window.console && window.console.log) {
		window.console.log(msg);
	}
	else if (window.opera && window.opera.postError) {
		window.opera.postError(msg);
	}
};

})(jQuery);

/* ---------------------------------------- /includes/jsbin/jquery.defaultvalue.js ---------------------------------------- */
(function(c){c.fn.extend({defaultValue:function(e){if("placeholder"in document.createElement("input"))return!1;return this.each(function(){if(c(this).data("defaultValued"))return!1;var a=c(this),h=a.attr("placeholder"),f={input:a};a.data("defaultValued",!0);var d=function(){var b;if(a.context.nodeName.toLowerCase()=="input")b=c("<input />").attr({type:"text"});else if(a.context.nodeName.toLowerCase()=="textarea")b=c("<textarea />");else throw"DefaultValue only works with input and textareas";b.attr({value:h,
"class":a.attr("class")+" empty",size:a.attr("size"),style:a.attr("style"),tabindex:a.attr("tabindex"),rows:a.attr("rows"),cols:a.attr("cols"),name:"defaultvalue-clone-"+((1+Math.random())*65536|0).toString(16).substring(1)});b.focus(function(){b.hide();a.show();setTimeout(function(){a.focus()},1)});return b}();f.clone=d;d.insertAfter(a);var g=function(){a.val().length<=0?(d.show(),a.hide()):(d.hide(),a.show().trigger("click"))};a.bind("blur",g);g();e&&e(f)})}})})(jQuery);
/* ---------------------------------------- /includes/scripts/matchMedia.js ---------------------------------------- */
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());
/* ---------------------------------------- /includes/scripts/matchMedia.addListener.js ---------------------------------------- */
/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
(function(){
    // Bail out for browsers that have addListener support
    if (window.matchMedia && window.matchMedia('all').addListener) {
        return false;
    }

    var localMatchMedia = window.matchMedia,
        hasMediaQueries = localMatchMedia('only all').matches,
        isListening     = false,
        timeoutID       = 0,    // setTimeout for debouncing 'handleChange'
        queries         = [],   // Contains each 'mql' and associated 'listeners' if 'addListener' is used
        handleChange    = function(evt) {
            // Debounce
            clearTimeout(timeoutID);

            timeoutID = setTimeout(function() {
                for (var i = 0, il = queries.length; i < il; i++) {
                    var mql         = queries[i].mql,
                        listeners   = queries[i].listeners || [],
                        matches     = localMatchMedia(mql.media).matches;

                    // Update mql.matches value and call listeners
                    // Fire listeners only if transitioning to or from matched state
                    if (matches !== mql.matches) {
                        mql.matches = matches;

                        for (var j = 0, jl = listeners.length; j < jl; j++) {
                            listeners[j].call(window, mql);
                        }
                    }
                }
            }, 30);
        };

    window.matchMedia = function(media) {
        var mql         = localMatchMedia(media),
            listeners   = [],
            index       = 0;

        mql.addListener = function(listener) {
            // Changes would not occur to css media type so return now (Affects IE <= 8)
            if (!hasMediaQueries) {
                return;
            }

            // Set up 'resize' listener for browsers that support CSS3 media queries (Not for IE <= 8)
            // There should only ever be 1 resize listener running for performance
            if (!isListening) {
                isListening = true;
                window.addEventListener('resize', handleChange, true);
            }

            // Push object only if it has not been pushed already
            if (index === 0) {
                index = queries.push({
                    mql         : mql,
                    listeners   : listeners
                });
            }

            listeners.push(listener);
        };

        mql.removeListener = function(listener) {
            for (var i = 0, il = listeners.length; i < il; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                }
            }
        };

        return mql;
    };
}());
/* ---------------------------------------- /includes/scripts/com.digitaria.discoveramerica.common.js ---------------------------------------- */
/*global document, window, da, jQuery, console, log, force_menu_close, menu_close, jCore, suitcaseDelete, suitcasechecker, shareTitle, shareURL, toggleFadeIn, suitcaseAdd */
/*jslint plusplus: true, sloppy: true, vars: true */

if (typeof languagePath === 'undefined') {
    languagePath = '';
}

//initialize
var guiDefaults = {
	filters: {
		pending: false,
		regions: {},
		searching: false,
		territories: {}
	},
	map: {
		canvas: false,
		loaded: false,
		markers: {},
		viewed: false
	},
	regions: {
	},
	suitcase: {
		count: 0,
		data: {}
	},
	territories: {
	}
};

//-------------
// mobile check based on screen resolution. redirects user to mobile site (m.)
//-------------
// 
// var xWidth = null;
// if(window.outerWidth != null){
//   	xWidth = window.outerWidth;
//   	//alert('window.outerWidth' + window.outerWidth);
// }
// else if(window.innerWidth != null){
// 	xWidth = window.innerWidth;
// 	//alert('window.innerWidth' + window.innerWidth);
// }
// else if(document.body.clientWidth != null){
//   	xWidth = document.body.clientWidth;
//   	//alert('document.body.clientWidth' + document.body.clientWidth);
// }
// else if(window.screen.availWidth != null) {
// 	//alert('window.screen.availWidth' + window.screen.availWidth);
//   	xWidth = window.screen.availWidth;
// }
// else {
// 	xWidth = 1000;
// }

// if(xWidth <= 600) {
// 	var xURL = document.location.host.replace(/www./, '');
//  	window.location.href = 'http://m.'+xURL;
// }


//-------------
// mobile check based on matchMedia
// https://github.com/paulirish/matchMedia.js
//-------------
if (matchMedia('(max-width: 720px)').matches) {
  var xURL = document.location.host.replace(/www./, '');
			window.location.href = 'http://m.'+xURL;
}

// var winWidth = window.innerWidth ? window.innerWidth : $(window).width();

// if (winWidth < 600) {

//   var xURL = document.location.host.replace(/www./, '');
//  			window.location.href = 'http://m.'+xURL;
// }

// If the gui wasn't defined yet
if (typeof gui == "undefined") {
	// Create gui with the default values
	var gui=guiDefaults;
} else {
	// Otherwise, gui was already set
	// So we extend the default values with what was already set in to it
	gui=jQuery.extend(guiDefaults, gui);
}

// Stop old IE from throwing issues if console is undefined
if (typeof console === "undefined") {
	var console={};
}
if (typeof console.debug === "undefined") {
	console.debug=function() {};
}
if (typeof console.log === "undefined") {
	console.log=function() {};
}

/**
 * Test to see if a given element type supports a given attribute.
 * @returns {boolean}
 * @param {string} elm The element type to test.
 * @param {string} attr The attribute to test within that element.
 */
function elementSupportAttribute(elm, attr) {
    var test = document.createElement(elm);
    return (typeof test.elm !== "undefined");
}

function toggleButton() {
	jQuery(this).toggleClass('on');
}

function toggleButtonFlash() {
	window.setTimeout("jQuery('.button.flash.on').removeClass('on')", 100);
}

window.log = function () {
	log.history = log.history || [];
	log.history.push(arguments);
	if (this.console) {
		console.log(Array.prototype.slice.call(arguments));
	}
};

function closeControls() {
	//for suitcase
	//force_menu_close();

	if (!jQuery("#suitcase-container").hasClass('focus')) {
		jQuery("#suitcase-toggle.on").click();  //click button for user
	}

	//for filters
	if (!jQuery("#explorer-filter-controls-container").hasClass('focus')) {
		jQuery("#filter-dialog-switch.on").click();  //click button for user
	}

	if (jQuery("#filter-choose-territories").hasClass('on')) {
		jQuery("#filter-choose-territories>.button").click();
	}
}

function menu_closeControls() {
	//for suitcase
	//menu_close();

	if (!jQuery("#suitcase-container").hasClass('focus')) {
		jQuery("#suitcase-toggle.on").click();  //click button for user
	}

	//for filters
	if (!jQuery("#explorer-filter-controls-container").hasClass('focus')) {
		jQuery("#filter-dialog-switch.on").click();  //click button for user
	}
	if (jQuery("#filter-choose-territories").hasClass('on')) {
		jQuery("#filter-choose-territories>.button").click();
	}
}

function openLogin(guid) {
	var width, $popuplocation;
	window.ps = guid;
	closeControls();
	width = 830;
	$popuplocation = (jQuery(window).width() - width) / 2;
	jQuery('#login-overlay-box').css('display', 'block');
	jQuery('#register-overlay-box').hide();
	jQuery('#register-success-overlay-box').hide();
	jQuery('#reset-password-overlay-box').hide();
	jQuery('#reset-password-success-overlay-box').hide();
	jQuery('#forgot-password-overlay-box').hide();
	jQuery('#forgot-password-success-overlay-box').hide();
	jQuery('#login-overlay').fadeIn(250);
}

function openRegister(guid) {
	var width;
	window.ps = guid;
	closeControls();
	width = 430;
	$popuplocation = (jQuery(window).width() - width) / 2;
	jQuery('#register-overlay-box').css('display', 'block');
	jQuery('#login-overlay-box').hide();
	jQuery('#register-success-overlay-box').hide();
	jQuery('#reset-password-overlay-box').hide();
	jQuery('#reset-password-success-overlay-box').hide();
	jQuery('#forgot-password-overlay-box').hide();
	jQuery('#forgot-password-success-overlay-box').hide();
	jQuery('#login-overlay').fadeIn(250);
}

function stateFeaturedImage() {
	var featimg = jQuery('.featured-travel-journal').find('.picture').children('img').attr('src');
	jQuery('.featured-travel-journal').find('.picture').css('background-image', 'url(' + featimg + ')');
	jQuery('.featured-travel-journal').find('.picture').children('img').hide();
}

function suitcasesocial() {
    var visitor = jQuery.cookie('at');
    var localeHash = new da.utilities.LocaleHashTable();
	var parsevariable = visitor.split('&');
	var parsename = parsevariable[3].split('=');
	//var name = encodeURIComponent(parsename[1] + '\'s Suitcase');
	var name = encodeURIComponent(localeHash.SHARE_TITLE);
	var parseuser = parsevariable[0].split('=');
	var user = encodeURIComponent(parseuser[1]);
	var image = encodeURIComponent(window.location.protocol + "//" + window.location.hostname + '/media/images/header/logo.png');
	//var desc = encodeURIComponent('These are some of ' + parsename[1] + '\'s favorite USA travel experiences.');
	var desc = encodeURIComponent(localeHash.SHARE_DESC);
	var currentHref, facebookUrl, twitterUrl, query;

    var host = encodeURIComponent(window.location.protocol + "//" + window.location.hostname + '/usa/suitcase.aspx?u=');
	currentHref = jQuery('#suitcase-container #facebook').attr('href');
    query = host + user + encodeURIComponent('&t=') + name + encodeURIComponent('&i=') + image + encodeURIComponent('&d=') + desc;
	facebookUrl = 'http://www.facebook.com/share.php?u=' + query;
	query = 'text=' + name + '&url=' + host + user;
	twitterUrl = 'http://twitter.com/share?' +  query;
	jQuery('#suitcase-container #facebook').attr('href', facebookUrl);
	jQuery('#suitcase-container #twitter').attr('href', twitterUrl);
	// jQuery('#suitcase-container #twitter').attr('href', 'http://twitter.com/share?text=' + name + '\'s Suitcase&url=' + host + '/usa/suitcase.aspx?u=' + user);
}

function registereduser() {
    if (jQuery.cookie('at')) {
        var localeHash = new da.utilities.LocaleHashTable();

		jQuery('body').removeClass('anonymous').addClass('logged-in');
		var visitor = jQuery.cookie('at');
		var parsevariable = visitor.split('&');
		var parsename = parsevariable[3].split('=');
		var name = parsename[1];
		jQuery('#header-menu-welcome').html(localeHash.WELCOME_BACK + ', ' + name + '<div id="header-menu-logout" class="inline-block">' + localeHash.LOGOUT + '</div>');
		suitcasesocial();
		if (typeof RoadTripPlanner != "undefined" && jQuery('body').hasClass('road-trip-home')) {
			rtp.updateFavoritesList();
		}
	} else {
		if (typeof RoadTripPlanner != "undefined" && jQuery('body').hasClass('road-trip-home')) {
			rtp.updateFavoritesList();
		}
	}
}

function login(userId, cookie) {
	if($.cookie('cookieOptIn') !== 'optedOut') $.cookie('userID', userId, {expires: 365, path: '/'});
    jCore.writeCookie("at", cookie, 365);
    registereduser();
}

function logout() {
	var expire = new Date();
	expire.setDate(expire.getDate() - 1);
	jCore.writeCookie("userID", "", expire.toGMTString());
	jCore.writeCookie("at", "", expire.toGMTString());
	jQuery('body').removeClass('logged-in').addClass('anonymous');
	suitcaseDelete();
	suitcasechecker();
	rtp.updateFavoritesList();
}

function registrationthankyou() {
	var width;
	width = 430;
	jQuery('#register-overlay-box').fadeOut(250);
	jQuery('#register-success-overlay-box').fadeIn(250);
}

function setbxsliderheight() {
	var bxheight = jQuery('#state-experiences-slides').parent('.bx-window').height();
	jQuery('#state-experiences-slides').parent('.bx-window').height(bxheight);
}

function pagermove(pagerdiv, slidediv) {
	jQuery(slidediv + ' .activeslide').removeClass('activeslide');
	var getactive = jQuery(pagerdiv + ' .pager-active');
	var whereactive = jQuery(pagerdiv + ' .pager-link').index(getactive);
	jQuery(slidediv + ' .pager').eq(whereactive).addClass('activeslide');
	var slideheight = jQuery(slidediv + ' .activeslide').height();
	jQuery(slidediv).parent('.bx-window').animate({'height': slideheight});
}

function visiblepagers(pagerdiv, handle, slidediv) {
	var neghandle = 0 - handle;
	var handle1 = handle + 2;
	var neghandle1 = neghandle - 2;
	/*jQuery(pagerdiv + ' .pager-link').first().addClass('first').css('display', 'inline-block !important');
	jQuery(pagerdiv + ' .pager-link').last().addClass('last').css('display', 'inline-block !important');*/
	jQuery(pagerdiv + ' .pager-link').slice(0, handle).addClass('beginning');
	jQuery(pagerdiv + ' .pager-link').slice(neghandle).addClass('ending');
	jQuery(pagerdiv + ' .pager-link').css('display', 'none');
	jQuery(pagerdiv + ' .pager-active').css('display', 'inline-block');
	jQuery(pagerdiv + ' .pager-active').prev('a.pager-link').css('display', 'inline-block');
	jQuery(pagerdiv + ' .pager-active').prev('a.pager-link').prev('a.pager-link').css('display', 'inline-block');
	jQuery(pagerdiv + ' .pager-active').next('a.pager-link').css('display', 'inline-block');
	jQuery(pagerdiv + ' .pager-active').next('a.pager-link').next('a.pager-link').css('display', 'inline-block');

	/*if (jQuery(pagerdiv + ' .pager-link').slice(1,2).css('display', 'none')) {
		jQuery(pagerdiv + ' .beginellipses').css('display', 'inline-block');
	} else {
		jQuery(pagerdiv + ' .beginellipses').css('display', 'none');
	}
	if (jQuery(pagerdiv + ' .pager-link').slice(-2,-1).css('display', 'none')) {
		jQuery(pagerdiv + ' .endellipses').css('display', 'inline-block');
	} else {
		jQuery(pagerdiv + ' .endellipses').css('display', 'none');
	}*/

	if (jQuery(pagerdiv + ' .pager-active').hasClass('beginning') || jQuery(pagerdiv + ' .pager-active').hasClass('first')) {
		jQuery(pagerdiv + ' .beginning').css('display', 'inline-block');
		jQuery(pagerdiv + ' .pager-link').slice(handle, handle1).css('display', 'inline-block');
		//jQuery(pagerdiv + ' .beginellipses').css('display', 'none');
	}

	if (jQuery(pagerdiv + ' .pager-active').hasClass('ending') || jQuery(pagerdiv + ' .pager-active').hasClass('last')) {
		jQuery(pagerdiv + ' .ending').css('display', 'inline-block');
		jQuery(pagerdiv + ' .pager-link').slice(neghandle1).css('display', 'inline-block');
		jQuery(pagerdiv + ' .last').css('display', 'inline-block');
		//jQuery(pagerdiv + ' .endellipses').css('display', 'none');
	}

	pagermove(pagerdiv, slidediv);
}

function shareoverlay() {
	var title = shareTitle.replace(/\+/g, ' ');
	if (!$('body').hasClass('road-trip-home')) {
		jQuery('#share-overlay input#shareu').attr('value', shareURL);
		jQuery('#share-overlay span.sharename').html(shareTitleRaw);
		jQuery('#share-overlay input#t').attr('value', title);
	}
	jQuery('#share-overlay').fadeIn(250);
    jQuery('#share-overlay-box').show();
    jQuery('#share-overlay-success-box').hide();
}

function shareurloverlay() {
	var title = shareTitle.replace(/\+/g, ' ');
	jQuery('#share-overlay input#shareu').attr('value', shareURL);
	jQuery('#share-overlay input#t').attr('value', title);
	jQuery('#share-overlay span.sharename').html(shareTitleRaw);
	jQuery('#share-overlay-two').fadeIn(250);
    jQuery('#shareurl-overlay-box').show();
    jQuery('#share-overlay-success-box').hide();
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if (results === null) {
		return "";
	} else {
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
}

function recoverpassword() {
	var haskey = getParameterByName('key');
	if (haskey !== '') {
		var theiremail = getParameterByName('email');
		jQuery('#login-overlay').addClass('reset-password');
	}
}



/*function titlefix(){
jQuery('.page-header-img').each(function () {
		var title = jQuery(this).attr('alt');
		jQuery(this).attr('title', title);
});
if (jQuery('body').hasClass('state-page')) {
	jQuery('.state-gallery-subitem img, .related-experiences-image, .page-header-img').each(function () {
		var title = jQuery(this).attr('alt');
		jQuery(this).attr('title', title);
	}
	);
}
if (jQuery('body').hasClass('state-city-page')) {
	jQuery('.state-city-thumbnail-image, .page-sponsor-logo').each(function () {
		var title = jQuery(this).attr('alt');
		jQuery(this).attr('title', title);
	}
	);
}
if (jQuery('body').hasClass('shared-suitcase')) {
	jQuery('.shared-suitcase-thumbnail-image').each(function () {
		var title = jQuery(this).attr('alt');
		jQuery(this).attr('title', title);
	}
	);
}
}*/

	// jQuery('.state-city-thumbnail-image, .state-experiences-image, .state-gallery-subitem img, .related-experiences-image, .page-header-img, .legal-logo img, .experience-found-in img, .exclusive-offer-logo img, .journal-entries img, .travel-journal-landing-image, .page-sponsor-logo, .shared-suitcase-thumbnail-image').each(function () {


function initAnalytics() {
	// analytics
    $("#facebook-tile").live("click", function (event) {
        _gaq.push(['_trackEvent', 'Outbound', 'Discover-America', 'Facebook-Page']);
    });
    $("#land-of-dreams").live("click", function (event) {
        _gaq.push(['_trackEvent', 'Downloads', 'Media', 'Land-of-Dreams-MP3']);
    });
    $("#wbc-tile").live("click", function (event) {
        _gaq.push(['_trackEvent', 'Homepage-Promo', 'Click', 'World-Baseball-Classic']);
    });
    $(".language a").click(function () {
        var link_href = $(this).attr('href');
        _gaq.push(['_link', link_href]);
        return false;
    });
    $("#main-explore").click(function () {
        _gaq.push(['_trackEvent', 'Global-Navigation', 'Click', 'Explore']);
    });
    $("#main-states-and-cities").click(function () {
        _gaq.push(['_trackEvent', 'Global-Navigation', 'Click', 'States-and-Cities']);
    });
    $("#main-travel-journals").click(function () {
        _gaq.push(['_trackEvent', 'Global-Navigation', 'Click', 'Travel-Journals']);
    });
    $("#main-travel-information").click(function () {
        _gaq.push(['_trackEvent', 'Global-Navigation', 'Click', 'USA-Travel-Information']);
    });
}


// Button Conversion Tags
// Instructions:
//
//	http://demo.eyeblaster.com/Tia/CustomProjects/ConversionTag/Instructions/ConversionTagInstructions.docx
//
//
//  The Site should place the following code as the 1st item in the <body> of their page:
// <script src="http://ds.serving-sys.com/BurstingRes/CustomScripts/mmConversionTag.js"></script>
//
//
//
// Author: Tia Koehler
// 04.29.11
//


// Immediately write the iframe (if it doesn't exist already). Set its source later
var mmIframesExist = document.getElementById("mmConversionTagIframe0");
var mmIframes = 10;
var mmCurIframe = 0;
if (!mmIframesExist) {
	for (var i = 0; i < mmIframes; ++i) {
		document.write('<ifr'+'ame id="mmConversionTagIframe' + i + '" name="mmConversionTagIframe' + i + '" src="" width=0 height=0 marginwidth=0 marginheight=0 hspace=0 vspace=0 frameborder=0 scrolling=no bordercolor="#000000" style=display:none;></ifra'+'me>');
	}
}
//-------------------------------------------------------------------------------------------
function mmRedirect(url, target) {
	// Open Redirect URL in New or Same Window
	if(typeof(target) == "undefined" || target == "_blank"){ window.open(url, "_blank"); }
	else {document.location.href = url; }
}
//-------------------------------------------------------------------------------------------
function mmExecutePublisherCode(clkEvt) {

	// Removes the call to mmConversionTag so that it is not executed more than 1 time

	var patt1 = /\bmmConversionTag?.*?return?\s?false?\;/i;
	var clickEventStr = typeof(clkEvt.replace) == "undefined" ? clkEvt.toString() : clkEvt;
	var clickEventStrRemaining = clickEventStr.replace(patt1, "");

	if (typeof(clkEvt.replace) == "undefined") {
	// Removes "function anonymous() { ... }" to extract the ... publisher code in the middle.  Necessary for setTimeout to execute it
		var patt2 = /\bfunction\s?\w*\(\)?.*?\n/i;
		var clickEventStrRemaining = clickEventStrRemaining.replace(patt2, "");
		var patt3 = /^\{/i;
		clickEventStrRemaining = clickEventStrRemaining.replace(patt3, "");
		var patt4 = /\}$/i;
		clickEventStrRemaining = clickEventStrRemaining.replace(patt4, "");
	}

	// Execute Publisher Code
	setTimeout(clickEventStrRemaining, 1);
}
//-------------------------------------------------------------------------------------------
function mmIframeLoadHandler(redirURL, targetWin, clickEvent, ifrm) {
	// Either perform redirect or execute publisher functions
	if((typeof(redirURL) != "undefined") && (redirURL != null)){ mmRedirect(redirURL, targetWin); }
	else if (clickEvent != "") { mmExecutePublisherCode(clickEvent); }

	// Clear out source so that pressing the back button does not cause a conversion (from iframe being on page)
	ifrm.src = "";

	// Remove Event Handlers
	if (ifrm.detachEvent) {ifrm.detachEvent("onload", mmIframeLoadHandlerRef);}
	else if (ifrm.removeEventListener) {ifrm.removeEventListener("load", mmIframeLoadHandlerRef, false);}
	else {ifrm.onload = null;}

}
//-------------------------------------------------------------------------------------------
function mmConversionTag(conversionID, obj, targetWindow, redirectURL, extraParams) {
	try {
		var onclickEvent = "";

		// Redirect URL doesn't exist, so search the object for the URL or the functions which perform the redirect
		if(typeof(redirectURL) == "undefined" && typeof(obj == "object") && typeof(obj.getAttribute) != "undefined") {
			if (obj.getAttribute("onclick") != null) {
				onclickEvent = obj.getAttribute("onclick");
			}
		}

		// Protocol (secure or insecure)
		var protocol = ('https:' == document.location.protocol) ? 'https://' : 'http://';

		// Cache Buster
		var ebRand = Math.round(Math.random() * 1000000);

		// extraParams like Session ID or Sales Varaibles weren't passed, so this is a counter tag
		if (typeof(extraParams) == "undefined") {extraParams = "";}

		// Iframe
		var iframe = document.getElementById("mmConversionTagIframe" + mmCurIframe);

		mmCurIframe = (mmCurIframe + 1) % mmIframes;
		// Iframe Onload Event Handlers
		if (iframe.attachEvent) {iframe.attachEvent("onload", mmIframeLoadHandlerRef = function() { mmIframeLoadHandler(redirectURL, targetWindow, onclickEvent, iframe); });}
		else if (iframe.addEventListener) {iframe.addEventListener("load", mmIframeLoadHandlerRef = function() { mmIframeLoadHandler(redirectURL, targetWindow, onclickEvent, iframe); }, false);}
		else {	iframe.onload = function() { mmIframeLoadHandler(redirectURL, targetWindow, onclickEvent, iframe); }}


		// Iframe Source
		iframe.src =  protocol + "bs.serving-sys.com/BurstingPipe/ActivityServer.bs?cn=as&ifrm=1&ActivityID=" + conversionID +  extraParams + "&rnd=" + ebRand;
		}
	catch(e) {}
}
//-------------------------------------------------------------------------------------------


function initButtonTags() {
	var domain = ( document.domain.indexOf('.jp') > -1 ) ? '.jp' : ( document.domain.indexOf('.fr') > -1 ) ? '.fr' : '.com';
	//console.log(domain);
	// suitcase button
	$('#suitcase-toggle.button').click(function() {
		suitcaseToggle();
		if($(this).is('.on')) {
			var id = (domain === '.com') ? '189240' : (domain === '.fr') ? '189307' : (domain === '.jp') ? '189374' : '189240';
			mmConversionTag(id, this, $(this).attr('target'), $(this).attr('href'));
			//console.log(id + ', ' + this.id + ', ' + $(this).attr('target') + ', ' + $(this).attr('href'));
		}
	});
	// world button
	$('#map-mode.button').click(function() {
		displayModeMap();
		if($(this).is('.on')) {
			var id = (domain === '.com') ? '189241' : (domain === '.fr') ? '189308' : (domain === '.jp') ? '189375' : '189241';
			mmConversionTag(id, this, $(this).attr('target'), $(this).attr('href'));
			//console.log(id + ', ' + this.id + ', ' + $(this).attr('target') + ', ' + $(this).attr('href'));
		}
	});
	// search by button
	$('#filter-dialog-switch.button').click(function() {
		toggleFilters();
		if($(this).is('.on')) {
			var id = (domain === '.com') ? '189242' : (domain === '.fr') ? '189309' : (domain === '.jp') ? '189376' : '189242';
			mmConversionTag(id, this, $(this).attr('target'), $(this).attr('href'));
			//console.log(id + ', ' + this.id + ', ' + $(this).attr('target') + ', ' + $(this).attr('href'));
		}
	});
}

//-------------------------------------------------------------------------------------------

function initExperienceHeaderRotator(scope, index) {
	var $_scope = $(scope);
	var $_rotatorThumbs = $('#header-rotator-thumbs', $_scope),
		$_thumbImgs = $('#header-rotator-thumbs img', $_scope),
		$_rotatorImages = $('#header-rotator-images', $_scope),
		$_thumbs,
		_count = 7,
		_width = 1046;

	$_thumbImgs.wrap('<span class="thumb" />');
	$_thumbs = $('span.thumb', $_rotatorThumbs);
	$_thumbs.prepend('<span class="border-overlay"/>');

	if ($_rotatorThumbs.parents('.inline-rotator').length) {
		_count = 5;
		_width = 612;
	}

	$_rotatorThumbs.carouFredSel({
		width: _width,
		items: {
			visible: _count
		},
		align: 'left',
		auto: false,
		prev: '.has-rotator:eq('+index+') #prev',
		next: '.has-rotator:eq('+index+') #next'
	});

	$_rotatorImages.carouFredSel({
		items: 1,
		auto: false,
		scroll: {
			fx: 'crossfade',
			items: 1
		}
	});

	$_rotatorImages.hover(
		function () {
			$_rotatorThumbs.trigger('pause');
		},
		function () {
			$_rotatorThumbs.trigger('play');
		}
	);

	$_rotatorThumbs.hover(
		function () {
			$_rotatorImages.trigger('pause');
		},
		function () {
			$_rotatorImages.trigger('play');
		}
	);

	if ($_thumbImgs.length > _count) {
		$_rotatorThumbs.trigger("configuration", {
			synchronise: [$_rotatorImages, false, true],
			auto: {
				play: true, /* remove if you want to kill auto rotation */
				timeoutDuration: 8000
			},
			items: {
				start: 0
			},
			scroll: {
				items: 1,
				duration: 500,
				onBefore: function( data ) {
					data.items.old.removeClass('selected');
					data.items.visible.eq(0).addClass('selected');
				}
			}
		});
		$_rotatorImages.trigger("configuration", {
			auto: false
		});
		$_rotatorThumbs.css({'margin-left':'30px'});
		$_thumbs.click(function() {
			$_rotatorThumbs.trigger( 'slideTo', [this] );
		});
		$_thumbs.eq(0).addClass('selected');
	}

	if ($_thumbImgs.length <= _count) {
		$_rotatorImages.trigger("configuration", {
			items: {
				start: 0
			},
			auto: {
				play: true, /* remove if you want to kill auto rotation */
				timeoutDuration: 8000
			},
			scroll: {
				onBefore: function( data ) {
					$_thumbs.removeClass('selected');
		            $(this).trigger("currentPosition", function( pos ) {
		                $_thumbs.eq(pos).addClass('selected');
		            });
	            }
	        }
		});
		// $_rotatorThumbs.trigger("configuration", {
		// 	width: 1046
		// });
		$_thumbs.click(function() {
			$_index = $(this).index();
			$_rotatorImages.trigger( 'slideTo', [$_index]);
			$_thumbs.removeClass('selected');
			$(this).addClass('selected');
		});
		$_thumbs.eq(0).addClass('selected');
	}
}

//-------------------------------------------------------------------------------------------

// On document ready
jQuery(document).ready(function () {
  jQuery('body').removeClass('nojs');
	// Check to see if the browser supports placeholder attributes for input elements
	$.support.placeholder = false;
	test = document.createElement('input');
	if('placeholder' in test) $.support.placeholder = true;
	// If not, add placeholder label (styled in css) & hide & show on focus / blur
	if(!$.support.placeholder){
		$('[placeholder]').each(function() {
			$(this).before('<label for="' + $(this).attr('id') + '" class="placeholder">' + $(this).attr('placeholder') + '</label>');
		}).focus(function() {
			$(this).prev('label.placeholder').hide();
		}).blur(function() {
			if($(this).attr('value') == '') {
				$(this).prev('label.placeholder').show();
			}
		});
	}

	if (typeof RoadTripPlanner != "undefined" && jQuery('body').hasClass('road-trip-home')) {
		rtp = new RoadTripPlanner();
	}

	// email share
	$(".emailshare").on("click", function(e){
        e.preventDefault();
    });

    // masonry
    var $masonryContainer = $(".da-blog #travel-journal-landing-slides");
    $masonryContainer.masonry({
    	"gutter": 22,
    	"itemSelector": ".travel-journal-landing-subitem"
    });

    // view more
    // no cache
    $.ajaxSetup({
        cache: false
    });
    // load spinner
    var ajax_load = "<img src='/Media/images/blog/load.gif' alt='loading...' />";
    // load calls - old
    // $("#load").on("click", function (e) {
    //     // target url is the click href
    //     $("#ajax-result").html(ajax_load).load(this.href);
    //     e.preventDefault();
    // });
	// new load ajax call
	$("#load").on("click", function(e) {
		e.preventDefault();
		$.ajax({
			url: this.href,
			success: function(data) {
				$obj = $(data);
				$masonryContainer.append($obj).masonry('appended', $obj);
			}
		});
	});


	// analytics for blog detail pages
	var $blogAuthor, $blogCategory;
	// find blog author
	$blogAuthor = $('#journal-description, .blog-detail.da-blog').find('#journal-description-subtitle a').text();
	// find blog category
	$blogCategory = $('.blog-detail.da-blog').find('#journal-header .category p').text();
	// post
	_gaq.push(['_trackEvent', 'Blog-View', $blogAuthor, $blogCategory,,true]);
	// Bind the suitcase and filters control closer

	// Bind the suitcase and filters control closer
	jQuery(document).click(menu_closeControls);

    // Bind the functions for button toggles
	jQuery(".button").click(toggleButton);
	jQuery(".button.flash").click(toggleButtonFlash);
	jQuery(".button-popup-container").click(toggleButton);

	// Prevent click event bubbling on popups
	jQuery(".button-popup-container .popup").click(function () { return false; });

	jQuery('.related-experiences-subitem').each(function () {
		jQuery(this).find('.related-experiences-image').insertBefore(jQuery(this).find('.related-experiences-subitem-title'));
	});

	jQuery('.travel-journal-landing-subitem').each(function () {
		jQuery(this).find('.travel-journal-landing-image').insertBefore(jQuery(this).find('.travel-journal-landing-subitem-title'));
	});

	registereduser();
	recoverpassword();
	jQuery('.social-buttons .email-icon').click(function () { shareoverlay(); });
	// new share button
	jQuery('.social-buttons .shareurl-icon').click(function () { shareurloverlay(); });
	jQuery('#header-menu-logout').click(function () { logout(); });
	jQuery('.start-exploring').click(function () { jQuery('#login-overlay').fadeOut(250); });
	jQuery('.collapsible').click(function () {
		jQuery(this).parent().toggleClass('open');
		jQuery(this).parent().siblings().fadeToggle(250);
	});
	jQuery('.expandable:not(.sitemap-category-title)').siblings('.content').hide();
	jQuery('.expandable:not(.sitemap-subcategory-title)').toggleClass('open');
	jQuery('.expandable').click(function (e) {
		jQuery(this).toggleClass('open');
		if($('.sitemap').length){
			e.stopPropagation();
		}
		jQuery(this).siblings('.content').fadeToggle(250);
	});
	jQuery("body.error404 .explorer-experience").hover(toggleFadeIn);

	jQuery('#essential-categories .item').hover(
		function () {
			jQuery(this).animate({
				left: '+=10'
			}, 100);
		},
		function () {
			jQuery(this).animate({
				left: '0'
			}, 100);
		}
	);

	jQuery('#share-overlay .start-exploring').click(function () { jQuery('#share-overlay').fadeOut(250); });
	//stateFeaturedImage();
	setbxsliderheight();

	var localeHash = new da.utilities.LocaleHashTable();

	/* Open share on twitter and facebook in a popup window */
	jQuery('.socialpopup').click(function (event) {
		var width  = 700,
			height = 350,
			left   = (jQuery(window).width()  - width)  / 2 + 200,
			top    = (jQuery(window).height() - height) / 2;

		window.open(this.href, 'share', ['status=1,width=', width, ',height=', height, ',top=', top, ',left=', left].join(''));

		return false;
	});

	jQuery('#footer-info-wrapper').hover(
		function () {
			jQuery('#footer-info .footer-info-popup-wrapper').fadeIn(250).delay(1000);
		},
		function () {
			jQuery('#footer-info .footer-info-popup-wrapper').fadeOut(250).delay(1000);
		}
	);

	jQuery('#header-menu-login .login').click(function () { openLogin(); });
	jQuery('#header-menu-login .subscribe').click(function () { openRegister(); });

	// shareurl
	jQuery('#header-menu-login .subscribe').click(function () { openRegister(); });

	jQuery('.login-overlay-register-now').click(function () {
		var width;
		width = 430;
        jQuery('#login-overlay-box').fadeOut(250);
		jQuery('#register-overlay-box').fadeIn(250);
	});

	// show forgot password box popup
	jQuery('#login-overlay .forgot-password').click(function () {
		jQuery('#login-overlay-box').fadeOut(250);
		jQuery('#forgot-password-overlay-box').fadeIn(250);
	});

	jQuery('#login-overlay-bg').click(function () {
		jQuery('#login-overlay').fadeOut(250);
		jQuery('#login-overlay > div:not("#login-overlay-bg")').fadeOut(250);
	});
	jQuery('#login-overlay .overlay-close').click(function () {
		jQuery('#login-overlay').fadeOut(250);
		jQuery('#login-overlay > div:not("#login-overlay-bg")').fadeOut(250);
	});

	jQuery('#share-overlay-bg').click(function () {
		jQuery('#share-overlay').fadeOut(250);
	});
	jQuery('#share-overlay .overlay-close').click(function () {
		jQuery('#share-overlay').fadeOut(250);
	});
	jQuery('#share-overlay-two .overlay-close').click(function () {
		jQuery('#share-overlay-two').fadeOut(250);
	});

	jQuery("select").sb();

	jQuery.validator.addMethod("uniqueEmail", function (value, element) {
        var result = false;

        jQuery.ajax({
			url: languagePath + '/handlers/checkuser.aspx?username=' + value,
			dataType: 'json',
			success: function (data) {
				result = data.processed;
			},
			async: false
        });
        return result;
    }, localeHash.UNIQUE_EMAIL);

	jQuery("#register").validate({
		rules: {
			First_Name: "required",
			Last_Name: "required",
			email: {
				required: true,
				email: true,
				uniqueEmail: true
			},
			password: {
				required: true
			},
			confirmPassword: {
				required: true,
				equalTo: "#password1"
			},
			country: "required",
			terms: "required"
		},
		messages: {
			First_Name: localeHash.ENTER_FIRSTNAME,
			Last_Name: localeHash.ENTER_LASTNAME,
			email: {
				required: localeHash.ENTER_EMAIL,
				email: localeHash.ENTER_EMAIL,
				uniqueEmail: localeHash.UNIQUE_EMAIL
			},
			password: {
				required: localeHash.PROVIDE_PASSWORD
			},
			confirmPassword: {
				required: localeHash.CONFIRM_PASSWORD,
				equalTo: localeHash.CONFIRM_PASSWORD_NOT_MATCH
			},
			country: localeHash.SELECT_COUNTRY,
			terms: localeHash.ACCEPT_POLICY
		}
	});

	jQuery.validator.addMethod("multiemail",
		function (value, element) {
			var emails, valid, i;
			if (this.optional(element)) {
				return true;
			}
			emails = value.split(new RegExp("\\s*;\\s*", "gi"));
			valid = true;
			for (i in emails) {
				value = emails[i];
				if (valid && jQuery.validator.methods.email.call(this, value, element)) {
					valid = true;
				} else {
					valid = false;
				}
			}
			return valid;
		}, localeHash.ENTER_EMAIL
	);

	jQuery("#login").validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				required: true
			}
		},
		messages: {
			email: localeHash.ENTER_YOUR_EMAIL,
			password: {
				required: localeHash.ENTER_YOUR_PASSWORD
			}
		}
	});

	// ---------------- START NEWSLETTER SIGNUP FORM ---------------

	jQuery.validator.addMethod("requireOne", function (value) {
        if (jQuery('input:hidden#min-opt').val() == 'min-true') {
        	return true;
        }
        if (jQuery('input:hidden#min-opt').val() == 'min-false') {
        	return false;
        }
	},	localeHash.REQUIRE_ONE);

	jQuery("#newsletter-signup").validate({
		rules: {
			newsletter_email: {
				required: true,
				email: true
			},
			newsletter_name: "required",
			newsletter_country: "required",
			opt_terms: "required",
			min_opt: {
				required: true,
				requireOne: true
			}
		},
		messages: {
			newsletter_name: localeHash.ENTER_NAME,
			newsletter_email: {
				required: localeHash.ENTER_EMAIL,
				email: localeHash.ENTER_EMAIL
			},
			newsletter_country: localeHash.SELECT_COUNTRY,
			opt_terms: localeHash.ACCEPT_POLICY,
			min_opt: localeHash.REQUIRE_ONE
		}
	});

	function checkChecks() {
		var n = jQuery('input:checkbox.list_opt:checked').length;
		var $_hiddenMin = jQuery('input:hidden#min-opt');
		if (n !== 0) {
			$_hiddenMin.attr('value', 'min-true');
		}
		if (n === 0) {
			$_hiddenMin.attr('value', 'min-false');
		}
		jQuery('#min-opt').valid();
	}

	jQuery("#opt-box-required .checkbox").click(function () {
		setTimeout(checkChecks, 200);
	});

	jQuery('#newsletter-signup').ajaxForm(function (data) {
		if (data.processed === false) {
            jQuery('#newsletter-message').html(localeHash.ERROR_SUBMITTING_FORM);
        } else {
            jQuery('#newsletter-message').empty();
            jQuery('#newsletter-confirm').show();
            jQuery('.newsletter-signup-submit').hide();
        }
    });

	// ---------------- END NEWSLETTER SIGNUP ---------------

	jQuery("#shareexperience").validate({
		rules: {
			rem: {
				required: true,
				email: true
			},
			uem: {
				required: true,
				email: true
			},
			name: "required"
		},
		messages: {
			rem: localeHash.ENTER_EMAIL,
			uem: localeHash.ENTER_EMAIL,
			name: localeHash.ENTER_NAME
		}
	});

	jQuery("#forgot-password").validate({
		rules: {
			u: {
				required: true,
				email: true
			}
		},
		messages: {
			u: localeHash.ENTER_EMAIL
		}
	});

    jQuery("#reset-password").validate({
		rules: {
			password: {
				required: true
			},
			confirmPassword: {
				required: true,
				equalTo: "#password2"
			}
		},
		messages: {
			password: {
				required: localeHash.PROVIDE_PASSWORD
			},
			confirmPassword: {
				required: localeHash.CONFIRM_PASSWORD,
				equalTo: localeHash.CONFIRM_PASSWORD_NOT_MATCH
			}
		}
	});

    jQuery('#login').ajaxForm(function (data) {
		if (data.processed === false) {
            jQuery('#login-message').html(localeHash.INVALID_LOGIN);
        } else {
            jQuery('#login-message').empty();
            login(data.userId, data.cookie);
            jQuery.get(languagePath + '/handlers/suitcase.aspx', {}, suitcaseLoad, 'json');
            jQuery('#login-overlay').fadeOut(250);
            jQuery('#header-menu-logout').click(function () { logout(); });
        }
    });

    jQuery('#register').ajaxForm(function (data) {
        if (data.processed === false) {
            jQuery('#register-message').html(localeHash.ERROR_CREATING_PROFILE);
        } else {
            jQuery('#register-message').empty();
            login(data.userId, data.cookie);
			jQuery('#header-menu-logout').click(function () { logout(); });
            registrationthankyou();
        }
    });

    jQuery('#shareexperience').ajaxForm(function (data) {
        if (data.processed === false) {
            jQuery('#share-message').html(localeHash.ERROR_SENDING_EMAIL);
        } else {
            jQuery('#share-message').empty();
			jQuery('#share-overlay-box').fadeOut(250);
            jQuery('#share-overlay-success-box').fadeIn(250);
        }
    });

    jQuery('#forgot-password').ajaxForm(function (data) {
        if (data.processed === false) {
            jQuery('#forgot-password-message').html(localeHash.UNABLE_TO_LOCATE_USER);
        } else {
            jQuery('#forgot-password-message').empty();
            jQuery('#forgot-password-overlay-box').fadeOut(250);
            jQuery('#forgot-password-success-overlay-box').fadeIn(250);
        }
    });

    jQuery('#reset-password').ajaxForm(function (data) {
        if (data.processed === false) {
            jQuery('#reset-password-message').html(localeHash.UNABLE_TO_RESET_PASSWORD);
        } else {
            jQuery('#reset-password-message').empty();
            jQuery('#reset-password-overlay-box').fadeOut(250);
            jQuery('#reset-password-success-overlay-box').fadeIn(250);

            //window.location = "/"; //window.location.host
		}
	});

	if(($.browser.msie && $.browser.version == 8)){
		if($('.state-city-page').length){
			$('.state-city-thumbnail-item').css('margin-right','34px');
			$('.state-city-thumbnail-item:nth-child(3n)').css('margin-right',0);
		}
		if($('.travel-journal-landing-page').length){
			$('.travel-journal-landing-subitem').css('padding-right','34px');
			$('.travel-journal-landing-subitem:nth-child(3n)').css('padding-right',0);
		}
	}


	if($('.explorer-page').length){
		$(document).keydown(function(e){
			if(e.keyCode == 37){
				$('#scroller-left').click();
				return false;
			}
			if(e.keyCode == 39){
				$('#scroller-right').click();
				return false;
			}
		});
	}


  initButtonTags();

  initAnalytics();
  $('.has-rotator').each(function (i) {
  	initExperienceHeaderRotator(this, i);
  })

}); // end ready

$(window).load(function() {

	// vertically center text on tiles
	if($('.state-experiences-subitem-title, .related-experiences-subitem-title, .travel-journal-landing-subitem-title').length){
		$('.state-experiences-subitem-title, .related-experiences-subitem-title, .travel-journal-landing-subitem-title').each(function(){
			var height = $(this).find('h3').height(),
					conHeight = $(this).height();
			if (height < (conHeight / 2)){
				var paddingTop = (conHeight / 2) - (height / 2) - 2;
				$(this).find('h3').css('padding-top', paddingTop);
			}
		});
	}

}); // end window load

function setLanguageCookie(lang) {
    if (lang == "fr" || lang == "en") {
        $.cookie("lan", lang, { expires: 730, path: '/' });
    }
}
/* ---------------------------------------- /includes/scripts/com.digitaria.discoveramerica.google.js ---------------------------------------- */
if (typeof language === 'undefined') {
    language = '';
}

jQuery(function () {
    //place this inline on the page to setup the map
    //this is a standard google map option parameters
    /*/
    gui.map.options = {
    zoom: 12,
    center: new google.maps.LatLng(36.158, -115.137),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    panControlOptions: {
    position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    zoomControl: true,
    zoomControlOptions: {
    position: google.maps.ControlPosition.RIGHT_BOTTOM
    }
    };
    //*/
    jQuery(window).resize(function () { jQuery('.explorer-page #map-canvas').css({ width: jQuery(window).width(), height: jQuery(window).height() }); });
    // make sure the map-canvas exists
    if (document.getElementById('map-canvas')) {
        gui.map.canvas = new google.maps.Map(document.getElementById("map-canvas"), gui.map.options);

        //map initial load event
        google.maps.event.addListener(gui.map.canvas, 'bounds_changed', function () {
            google.maps.event.clearListeners(gui.map.canvas, 'bounds_changed');

            gui.map.marker = {};
            gui.map.marker.icon = new google.maps.MarkerImage('/media/images/explorer/pin-24.png',
				new google.maps.Size(40, 40), new google.maps.Point(0, 0), new google.maps.Point(15, 39)
			);
            gui.map.marker.shadow = new google.maps.MarkerImage('/media/images/explorer/pin-shadow-24.png',
				  new google.maps.Size(40, 40), new google.maps.Point(0, 0), new google.maps.Point(15, 39)
			);

            //cache infobox design
            if (gui.start.mapview) {
                jQuery("#map-mode").click();

                if (gui.start.type == 'sen')
                    jQuery.get(languagePath + '/handlers/locationssearch.aspx?type=sen&id=' + gui.start.guid, {}, mapExperiencesLoad, 'json');
                if (gui.start.type == 'vom')
                    jQuery.get(languagePath + '/handlers/locationssearch.aspx?type=vom&t=' + gui.start.guid, {}, mapExperiencesLoad, 'json');
                if (gui.start.type == 'btm')
                    jQuery.get(languagePath + '/handlers/locationssearch.aspx?type=btm&id=' + gui.start.guid, {}, mapExperiencesLoad, 'json');
                mapCenter(gui.start);
            } else {
                jQuery.get(languagePath + '/handlers/locationssearch.aspx', {}, mapExperiencesLoad, 'json');
            }

            gui.map.loaded = true;
        });
    }
});

function infoboxclose() {
	if ((gui.map) && (gui.map.infoBox)) {
		gui.map.infoBox.close();
	}
}

function mapCenter(point) {
	//move map/zoom to this place
	gui.map.canvas.setZoom(point.zoom);
	gui.map.canvas.setCenter(new google.maps.LatLng(point.latitude, point.longitude));
}

function mapRecenter() {
    //gui.map.canvas.setCenter(new google.maps.LatLng(43.907787, -79.359741), { zoom: 10 });
    gui.map.canvas.setCenter(new google.maps.LatLng(38.356, -97.5525));
    gui.map.canvas.setZoom(4);
}

function mapMarkerAdd(experience) {

    if ((!experience.latitude) || (!experience.longitude))
        return;

    var marker = new google.maps.Marker({
    	title: experience.title,
    	map: gui.map.canvas,
		icon: gui.map.marker.icon,
    	shadow: gui.map.marker.shadow,
    	shape: gui.map.marker.shape,
    	position: new google.maps.LatLng(experience.latitude, experience.longitude)
    });
    //no infoBox created yet
    marker.infoBox = null;
	marker.experience = experience.guid;

    google.maps.event.addListener(marker, "click", function (e) {
        //close a previous box
        if ((gui.map) && (gui.map.infoBox)) {
            gui.map.infoBox.close();
		}

        //see if we have my box yet?
        if (this.infoBox == null) {
            var infobox = jQuery("#infobox-tpl").tmpl(gui.experiences.data[this.experience])[0];
            this.infoBox = new InfoBox({
                content: infobox
		        , disableAutoPan: false
		        , maxWidth: 0
		        , pixelOffset: new google.maps.Size(-1, -26)
		        , zIndex: null
		        , closeBoxURL: ""
		        , infoBoxClearance: new google.maps.Size(1, 1)
		        , isHidden: false
		        , pane: "floatPane"
		        , enableEventPropagation: false
            });
        }

        gui.map.infoBox = this.infoBox;
        this.infoBox.open(gui.map.canvas, this);
				
				gui.map.canvas.panTo(marker.getPosition());
				gui.map.canvas.panBy(6, -100);

    });

	google.maps.event.addListener(gui.map.canvas, "click", function(e) { 
		if ((gui.map) && (gui.map.infoBox)) {
			gui.map.infoBox.close(); 
		}
	});
	jQuery('#explorer-filter-controls-container').click(function(){
		if ((gui.map) && (gui.map.infoBox)) {
			gui.map.infoBox.close();
		}
	});
	jQuery('.suitcase-buttons').click(function(){
		if ((gui.map) && (gui.map.infoBox)) {
			gui.map.infoBox.close();
		}
	});
	//cache marker for later
	gui.map.markers[experience.guid] = { experience: experience.guid, marker: marker }
	gui.map.infoBox = marker.infoBox; //just keep last initialized infobox
}

function mapMarkersInfoboxClose() {
	for (i in gui.map.markers)
		gui.map.markers[i].marker.infobox(null);
}
function mapMarkersRemove() {
	for (i in gui.map.markers)
		gui.map.markers[i].marker.setMap(null);
	gui.map.markers = {};
}

function autoinfobox() {

	if ((getParameterByName('type') != '') && jQuery('body').hasClass('explorer-page') && (getParameterByName('lng') != '') && (getParameterByName('lat') != '') && (getParameterByName('id') != '') ) 
	{
		var lat = getParameterByName('lat');
		var lng = getParameterByName('lng');
		var thisguid = getParameterByName('id');
		var youarehere = new google.maps.MarkerImage('/media/images/explorer/moreinfo.png',
				new google.maps.Size(40, 40), new google.maps.Point(0,0), new google.maps.Point(15, 39)
			);
		var marker = new google.maps.Marker({
         map: gui.map.canvas,
 	
         draggable: false,
         position: new google.maps.LatLng(lat, lng),
         visible: false
        });
        var infobox = jQuery("#infobox-tpl").tmpl(gui.experiences.data[thisguid])[0];
        var infoBox = new InfoBox({
                 content: infobox
		        ,disableAutoPan: false
		        ,maxWidth: 0
		        ,pixelOffset: new google.maps.Size(-1, -26)
		        ,zIndex: null
		        ,closeBoxURL: ""
		        ,infoBoxClearance: new google.maps.Size(1, 1)
		        ,isHidden: false
		        ,pane: "floatPane"
		        ,enableEventPropagation: false
        });
		gui.map.infoBox = infoBox;
        infoBox.open(gui.map.canvas, marker);
    }  
} 

/**
 * @name InfoBox
 * @version 1.1.11 [January 9, 2012]
 * @author Gary Little (inspired by proof-of-concept code from Pamela Fox of Google)
 * @copyright Copyright 2010 Gary Little [gary at luxcentral.com]
 * @fileoverview InfoBox extends the Google Maps JavaScript API V3 <tt>OverlayView</tt> class.
 *  <p>
 *  An InfoBox behaves like a <tt>google.maps.InfoWindow</tt>, but it supports several
 *  additional properties for advanced styling. An InfoBox can also be used as a map label.
 *  <p>
 *  An InfoBox also fires the same events as a <tt>google.maps.InfoWindow</tt>.
 */

/*!
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*jslint browser:true */
/*global google */

/**
 * @name InfoBoxOptions
 * @class This class represents the optional parameter passed to the {@link InfoBox} constructor.
 * @property {string|Node} content The content of the InfoBox (plain text or an HTML DOM node).
 * @property {boolean} disableAutoPan Disable auto-pan on <tt>open</tt> (default is <tt>false</tt>).
 * @property {number} maxWidth The maximum width (in pixels) of the InfoBox. Set to 0 if no maximum.
 * @property {Size} pixelOffset The offset (in pixels) from the top left corner of the InfoBox
 *  (or the bottom left corner if the <code>alignBottom</code> property is <code>true</code>)
 *  to the map pixel corresponding to <tt>position</tt>.
 * @property {LatLng} position The geographic location at which to display the InfoBox.
 * @property {number} zIndex The CSS z-index style value for the InfoBox.
 *  Note: This value overrides a zIndex setting specified in the <tt>boxStyle</tt> property.
 * @property {string} boxClass The name of the CSS class defining the styles for the InfoBox container.
 *  The default name is <code>infoBox</code>.
 * @property {Object} [boxStyle] An object literal whose properties define specific CSS
 *  style values to be applied to the InfoBox. Style values defined here override those that may
 *  be defined in the <code>boxClass</code> style sheet. If this property is changed after the
 *  InfoBox has been created, all previously set styles (except those defined in the style sheet)
 *  are removed from the InfoBox before the new style values are applied.
 * @property {string} closeBoxMargin The CSS margin style value for the close box.
 *  The default is "2px" (a 2-pixel margin on all sides).
 * @property {string} closeBoxURL The URL of the image representing the close box.
 *  Note: The default is the URL for Google's standard close box.
 *  Set this property to "" if no close box is required.
 * @property {Size} infoBoxClearance Minimum offset (in pixels) from the InfoBox to the
 *  map edge after an auto-pan.
 * @property {boolean} isHidden Hide the InfoBox on <tt>open</tt> (default is <tt>false</tt>).
 * @property {boolean} alignBottom Align the bottom left corner of the InfoBox to the <code>position</code>
 *  location (default is <tt>false</tt> which means that the top left corner of the InfoBox is aligned).
 * @property {string} pane The pane where the InfoBox is to appear (default is "floatPane").
 *  Set the pane to "mapPane" if the InfoBox is being used as a map label.
 *  Valid pane names are the property names for the <tt>google.maps.MapPanes</tt> object.
 * @property {boolean} enableEventPropagation Propagate mousedown, mousemove, mouseover, mouseout,
 *  mouseup, click, dblclick, touchstart, touchend, touchmove, and contextmenu events in the InfoBox
 *  (default is <tt>false</tt> to mimic the behavior of a <tt>google.maps.InfoWindow</tt>). Set
 *  this property to <tt>true</tt> if the InfoBox is being used as a map label.
 */

/**
 * Creates an InfoBox with the options specified in {@link InfoBoxOptions}.
 *  Call <tt>InfoBox.open</tt> to add the box to the map.
 * @constructor
 * @param {InfoBoxOptions} [opt_opts]
 */
function InfoBox(opt_opts) {

  opt_opts = opt_opts || {};

  google.maps.OverlayView.apply(this, arguments);

  // Standard options (in common with google.maps.InfoWindow):
  //
  this.content_ = opt_opts.content || "";
  this.disableAutoPan_ = opt_opts.disableAutoPan || false;
  this.maxWidth_ = opt_opts.maxWidth || 0;
  this.pixelOffset_ = opt_opts.pixelOffset || new google.maps.Size(0, 0);
  this.position_ = opt_opts.position || new google.maps.LatLng(0, 0);
  this.zIndex_ = opt_opts.zIndex || null;

  // Additional options (unique to InfoBox):
  //
  this.boxClass_ = opt_opts.boxClass || "infoBox";
  this.boxStyle_ = opt_opts.boxStyle || {};
  this.closeBoxMargin_ = opt_opts.closeBoxMargin || "2px";
  this.closeBoxURL_ = opt_opts.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif";
  if (opt_opts.closeBoxURL === "") {
    this.closeBoxURL_ = "";
  }
  this.infoBoxClearance_ = opt_opts.infoBoxClearance || new google.maps.Size(1, 1);
  this.isHidden_ = opt_opts.isHidden || false;
  this.alignBottom_ = opt_opts.alignBottom || false;
  this.pane_ = opt_opts.pane || "floatPane";
  this.enableEventPropagation_ = opt_opts.enableEventPropagation || false;

  this.div_ = null;
  this.closeListener_ = null;
  this.moveListener_ = null;
  this.contextListener_ = null;
  this.eventListeners_ = null;
  this.fixedWidthSet_ = null;
}

/* InfoBox extends OverlayView in the Google Maps API v3.
 */
InfoBox.prototype = new google.maps.OverlayView();

/**
 * Creates the DIV representing the InfoBox.
 * @private
 */
InfoBox.prototype.createInfoBoxDiv_ = function () {

  var i;
  var events;
  var bw;
  var me = this;

  // This handler prevents an event in the InfoBox from being passed on to the map.
  //
  var cancelHandler = function (e) {
    e.cancelBubble = true;
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  // This handler ignores the current event in the InfoBox and conditionally prevents
  // the event from being passed on to the map. It is used for the contextmenu event.
  //
  var ignoreHandler = function (e) {

    e.returnValue = false;

    if (e.preventDefault) {

      e.preventDefault();
    }

    if (!me.enableEventPropagation_) {

      cancelHandler(e);
    }
  };

  if (!this.div_) {

    this.div_ = document.createElement("div");

    this.setBoxStyle_();

    if (typeof this.content_.nodeType === "undefined") {
      this.div_.innerHTML = this.getCloseBoxImg_() + this.content_;
    } else {
      this.div_.innerHTML = this.getCloseBoxImg_();
      this.div_.appendChild(this.content_);
    }

    // Add the InfoBox DIV to the DOM
    this.getPanes()[this.pane_].appendChild(this.div_);

    this.addClickHandler_();

    if (this.div_.style.width) {

      this.fixedWidthSet_ = true;

    } else {

      if (this.maxWidth_ !== 0 && this.div_.offsetWidth > this.maxWidth_) {

        this.div_.style.width = this.maxWidth_;
        this.div_.style.overflow = "auto";
        this.fixedWidthSet_ = true;

      } else { // The following code is needed to overcome problems with MSIE

        bw = this.getBoxWidths_();

        this.div_.style.width = (this.div_.offsetWidth - bw.left - bw.right) + "px";
        this.fixedWidthSet_ = false;
      }
    }

    this.panBox_(this.disableAutoPan_);

    if (!this.enableEventPropagation_) {

      this.eventListeners_ = [];

      // Cancel event propagation.
      //
      // Note: mousemove not included (to resolve Issue 152)
      events = ["mousedown", "mouseover", "mouseout", "mouseup",
      "click", "dblclick", "touchstart", "touchend", "touchmove"];

      for (i = 0; i < events.length; i++) {

        this.eventListeners_.push(google.maps.event.addDomListener(this.div_, events[i], cancelHandler));
      }
      
      // Workaround for Google bug that causes the cursor to change to a pointer
      // when the mouse moves over a marker underneath InfoBox.
      this.eventListeners_.push(google.maps.event.addDomListener(this.div_, "mouseover", function (e) {
        this.style.cursor = "default";
      }));
    }

    this.contextListener_ = google.maps.event.addDomListener(this.div_, "contextmenu", ignoreHandler);

    /**
     * This event is fired when the DIV containing the InfoBox's content is attached to the DOM.
     * @name InfoBox#domready
     * @event
     */
    google.maps.event.trigger(this, "domready");
  }
};

/**
 * Returns the HTML <IMG> tag for the close box.
 * @private
 */
InfoBox.prototype.getCloseBoxImg_ = function () {

  var img = "";

  if (this.closeBoxURL_ !== "") {

    img  = "<img";
    img += " src='" + this.closeBoxURL_ + "'";
    img += " align=right"; // Do this because Opera chokes on style='float: right;'
    img += " style='";
    img += " position: relative;"; // Required by MSIE
    img += " cursor: pointer;";
    img += " margin: " + this.closeBoxMargin_ + ";";
    img += "'>";
  }

  return img;
};

/**
 * Adds the click handler to the InfoBox close box.
 * @private
 */
InfoBox.prototype.addClickHandler_ = function () {

  var closeBox;

  if (this.closeBoxURL_ !== "") {

    closeBox = this.div_.firstChild;
    this.closeListener_ = google.maps.event.addDomListener(closeBox, 'click', this.getCloseClickHandler_());

  } else {

    this.closeListener_ = null;
  }
};

/**
 * Returns the function to call when the user clicks the close box of an InfoBox.
 * @private
 */
InfoBox.prototype.getCloseClickHandler_ = function () {

  var me = this;

  return function (e) {

    // 1.0.3 fix: Always prevent propagation of a close box click to the map:
    e.cancelBubble = true;

    if (e.stopPropagation) {

      e.stopPropagation();
    }

    /**
     * This event is fired when the InfoBox's close box is clicked.
     * @name InfoBox#closeclick
     * @event
     */
    google.maps.event.trigger(me, "closeclick");

    me.close();
  };
};

/**
 * Pans the map so that the InfoBox appears entirely within the map's visible area.
 * @private
 */
InfoBox.prototype.panBox_ = function (disablePan) {

  var map;
  var bounds;
  var xOffset = 0, yOffset = 0;

  if (!disablePan) {

    map = this.getMap();

    if (map instanceof google.maps.Map) { // Only pan if attached to map, not panorama

      if (!map.getBounds().contains(this.position_)) {
      // Marker not in visible area of map, so set center
      // of map to the marker position first.
        map.setCenter(this.position_);
      }

      bounds = map.getBounds();

      var mapDiv = map.getDiv();
      var mapWidth = mapDiv.offsetWidth;
      var mapHeight = mapDiv.offsetHeight;
      var iwOffsetX = this.pixelOffset_.width;
      var iwOffsetY = this.pixelOffset_.height;
      var iwWidth = this.div_.offsetWidth;
      var iwHeight = this.div_.offsetHeight;
      var padX = this.infoBoxClearance_.width;
      var padY = this.infoBoxClearance_.height;
      var pixPosition = this.getProjection().fromLatLngToContainerPixel(this.position_);

      if (pixPosition.x < (-iwOffsetX + padX)) {
        xOffset = pixPosition.x + iwOffsetX - padX;
      } else if ((pixPosition.x + iwWidth + iwOffsetX + padX) > mapWidth) {
        xOffset = pixPosition.x + iwWidth + iwOffsetX + padX - mapWidth;
      }
      if (this.alignBottom_) {
        if (pixPosition.y < (-iwOffsetY + padY + iwHeight)) {
          yOffset = pixPosition.y + iwOffsetY - padY - iwHeight;
        } else if ((pixPosition.y + iwOffsetY + padY) > mapHeight) {
          yOffset = pixPosition.y + iwOffsetY + padY - mapHeight;
        }
      } else {
        if (pixPosition.y < (-iwOffsetY + padY)) {
          yOffset = pixPosition.y + iwOffsetY - padY;
        } else if ((pixPosition.y + iwHeight + iwOffsetY + padY) > mapHeight) {
          yOffset = pixPosition.y + iwHeight + iwOffsetY + padY - mapHeight;
        }
      }

      if (!(xOffset === 0 && yOffset === 0)) {

        // Move the map to the shifted center.
        //
        var c = map.getCenter();
        map.panBy(xOffset, yOffset);
      }
    }
  }
};

/**
 * Sets the style of the InfoBox by setting the style sheet and applying
 * other specific styles requested.
 * @private
 */
InfoBox.prototype.setBoxStyle_ = function () {

  var i, boxStyle;

  if (this.div_) {

    // Apply style values from the style sheet defined in the boxClass parameter:
    this.div_.className = this.boxClass_;

    // Clear existing inline style values:
    this.div_.style.cssText = "";

    // Apply style values defined in the boxStyle parameter:
    boxStyle = this.boxStyle_;
    for (i in boxStyle) {

      if (boxStyle.hasOwnProperty(i)) {

        this.div_.style[i] = boxStyle[i];
      }
    }

    // Fix up opacity style for benefit of MSIE:
    //
    if (typeof this.div_.style.opacity !== "undefined" && this.div_.style.opacity !== "") {

      this.div_.style.filter = "alpha(opacity=" + (this.div_.style.opacity * 100) + ")";
    }

    // Apply required styles:
    //
    this.div_.style.position = "absolute";
    this.div_.style.visibility = 'hidden';
    if (this.zIndex_ !== null) {

      this.div_.style.zIndex = this.zIndex_;
    }
  }
};

/**
 * Get the widths of the borders of the InfoBox.
 * @private
 * @return {Object} widths object (top, bottom left, right)
 */
InfoBox.prototype.getBoxWidths_ = function () {

  var computedStyle;
  var bw = {top: 0, bottom: 0, left: 0, right: 0};
  var box = this.div_;

  if (document.defaultView && document.defaultView.getComputedStyle) {

    computedStyle = box.ownerDocument.defaultView.getComputedStyle(box, "");

    if (computedStyle) {

      // The computed styles are always in pixel units (good!)
      bw.top = parseInt(computedStyle.borderTopWidth, 10) || 0;
      bw.bottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
      bw.left = parseInt(computedStyle.borderLeftWidth, 10) || 0;
      bw.right = parseInt(computedStyle.borderRightWidth, 10) || 0;
    }

  } else if (document.documentElement.currentStyle) { // MSIE

    if (box.currentStyle) {

      // The current styles may not be in pixel units, but assume they are (bad!)
      bw.top = parseInt(box.currentStyle.borderTopWidth, 10) || 0;
      bw.bottom = parseInt(box.currentStyle.borderBottomWidth, 10) || 0;
      bw.left = parseInt(box.currentStyle.borderLeftWidth, 10) || 0;
      bw.right = parseInt(box.currentStyle.borderRightWidth, 10) || 0;
    }
  }

  return bw;
};

/**
 * Invoked when <tt>close</tt> is called. Do not call it directly.
 */
InfoBox.prototype.onRemove = function () {

  if (this.div_) {

    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};

/**
 * Draws the InfoBox based on the current map projection and zoom level.
 */
InfoBox.prototype.draw = function () {

  this.createInfoBoxDiv_();

  var pixPosition = this.getProjection().fromLatLngToDivPixel(this.position_);

  this.div_.style.left = (pixPosition.x + this.pixelOffset_.width) + "px";
  
  if (this.alignBottom_) {
    this.div_.style.bottom = -(pixPosition.y + this.pixelOffset_.height) + "px";
  } else {
    this.div_.style.top = (pixPosition.y + this.pixelOffset_.height) + "px";
  }

  if (this.isHidden_) {

    this.div_.style.visibility = 'hidden';

  } else {

    this.div_.style.visibility = "visible";
  }
};

/**
 * Sets the options for the InfoBox. Note that changes to the <tt>maxWidth</tt>,
 *  <tt>closeBoxMargin</tt>, <tt>closeBoxURL</tt>, and <tt>enableEventPropagation</tt>
 *  properties have no affect until the current InfoBox is <tt>close</tt>d and a new one
 *  is <tt>open</tt>ed.
 * @param {InfoBoxOptions} opt_opts
 */
InfoBox.prototype.setOptions = function (opt_opts) {
  if (typeof opt_opts.boxClass !== "undefined") { // Must be first

    this.boxClass_ = opt_opts.boxClass;
    this.setBoxStyle_();
  }
  if (typeof opt_opts.boxStyle !== "undefined") { // Must be second

    this.boxStyle_ = opt_opts.boxStyle;
    this.setBoxStyle_();
  }
  if (typeof opt_opts.content !== "undefined") {

    this.setContent(opt_opts.content);
  }
  if (typeof opt_opts.disableAutoPan !== "undefined") {

    this.disableAutoPan_ = opt_opts.disableAutoPan;
  }
  if (typeof opt_opts.maxWidth !== "undefined") {

    this.maxWidth_ = opt_opts.maxWidth;
  }
  if (typeof opt_opts.pixelOffset !== "undefined") {

    this.pixelOffset_ = opt_opts.pixelOffset;
  }
  if (typeof opt_opts.alignBottom !== "undefined") {

    this.alignBottom_ = opt_opts.alignBottom;
  }
  if (typeof opt_opts.position !== "undefined") {

    this.setPosition(opt_opts.position);
  }
  if (typeof opt_opts.zIndex !== "undefined") {

    this.setZIndex(opt_opts.zIndex);
  }
  if (typeof opt_opts.closeBoxMargin !== "undefined") {

    this.closeBoxMargin_ = opt_opts.closeBoxMargin;
  }
  if (typeof opt_opts.closeBoxURL !== "undefined") {

    this.closeBoxURL_ = opt_opts.closeBoxURL;
  }
  if (typeof opt_opts.infoBoxClearance !== "undefined") {

    this.infoBoxClearance_ = opt_opts.infoBoxClearance;
  }
  if (typeof opt_opts.isHidden !== "undefined") {

    this.isHidden_ = opt_opts.isHidden;
  }
  if (typeof opt_opts.enableEventPropagation !== "undefined") {

    this.enableEventPropagation_ = opt_opts.enableEventPropagation;
  }

  if (this.div_) {

    this.draw();
  }
};

/**
 * Sets the content of the InfoBox.
 *  The content can be plain text or an HTML DOM node.
 * @param {string|Node} content
 */
InfoBox.prototype.setContent = function (content) {
  this.content_ = content;

  if (this.div_) {

    if (this.closeListener_) {

      google.maps.event.removeListener(this.closeListener_);
      this.closeListener_ = null;
    }

    // Odd code required to make things work with MSIE.
    //
    if (!this.fixedWidthSet_) {

      this.div_.style.width = "";
    }

    if (typeof content.nodeType === "undefined") {
      this.div_.innerHTML = this.getCloseBoxImg_() + content;
    } else {
      this.div_.innerHTML = this.getCloseBoxImg_();
      this.div_.appendChild(content);
    }

    // Perverse code required to make things work with MSIE.
    // (Ensures the close box does, in fact, float to the right.)
    //
    if (!this.fixedWidthSet_) {
      this.div_.style.width = this.div_.offsetWidth + "px";
      if (typeof content.nodeType === "undefined") {
        this.div_.innerHTML = this.getCloseBoxImg_() + content;
      } else {
        this.div_.innerHTML = this.getCloseBoxImg_();
        this.div_.appendChild(content);
      }
    }

    this.addClickHandler_();
  }

  /**
   * This event is fired when the content of the InfoBox changes.
   * @name InfoBox#content_changed
   * @event
   */
  google.maps.event.trigger(this, "content_changed");
};

/**
 * Sets the geographic location of the InfoBox.
 * @param {LatLng} latlng
 */
InfoBox.prototype.setPosition = function (latlng) {

  this.position_ = latlng;

  if (this.div_) {

    this.draw();
  }

  /**
   * This event is fired when the position of the InfoBox changes.
   * @name InfoBox#position_changed
   * @event
   */
  google.maps.event.trigger(this, "position_changed");
};

/**
 * Sets the zIndex style for the InfoBox.
 * @param {number} index
 */
InfoBox.prototype.setZIndex = function (index) {

  this.zIndex_ = index;

  if (this.div_) {

    this.div_.style.zIndex = index;
  }

  /**
   * This event is fired when the zIndex of the InfoBox changes.
   * @name InfoBox#zindex_changed
   * @event
   */
  google.maps.event.trigger(this, "zindex_changed");
};

/**
 * Returns the content of the InfoBox.
 * @returns {string}
 */
InfoBox.prototype.getContent = function () {

  return this.content_;
};

/**
 * Returns the geographic location of the InfoBox.
 * @returns {LatLng}
 */
InfoBox.prototype.getPosition = function () {

  return this.position_;
};

/**
 * Returns the zIndex for the InfoBox.
 * @returns {number}
 */
InfoBox.prototype.getZIndex = function () {

  return this.zIndex_;
};

/**
 * Shows the InfoBox.
 */
InfoBox.prototype.show = function () {

  this.isHidden_ = false;
  if (this.div_) {
    this.div_.style.visibility = "visible";
  }
};

/**
 * Hides the InfoBox.
 */
InfoBox.prototype.hide = function () {

  this.isHidden_ = true;
  if (this.div_) {
    this.div_.style.visibility = "hidden";
  }
};

/**
 * Adds the InfoBox to the specified map or Street View panorama. If <tt>anchor</tt>
 *  (usually a <tt>google.maps.Marker</tt>) is specified, the position
 *  of the InfoBox is set to the position of the <tt>anchor</tt>. If the
 *  anchor is dragged to a new location, the InfoBox moves as well.
 * @param {Map|StreetViewPanorama} map
 * @param {MVCObject} [anchor]
 */
InfoBox.prototype.open = function (map, anchor) {

  var me = this;

  if (anchor) {

    this.position_ = anchor.getPosition();
    this.moveListener_ = google.maps.event.addListener(anchor, "position_changed", function () {
      me.setPosition(this.getPosition());
    });
  }

  this.setMap(map);

  if (this.div_) {

    this.panBox_();
  }
};

/**
 * Removes the InfoBox from the map.
 */
InfoBox.prototype.close = function () {

  var i;

  if (this.closeListener_) {

    google.maps.event.removeListener(this.closeListener_);
    this.closeListener_ = null;
  }

  if (this.eventListeners_) {
    
    for (i = 0; i < this.eventListeners_.length; i++) {

      google.maps.event.removeListener(this.eventListeners_[i]);
    }
    this.eventListeners_ = null;
  }

  if (this.moveListener_) {

    google.maps.event.removeListener(this.moveListener_);
    this.moveListener_ = null;
  }

  if (this.contextListener_) {

    google.maps.event.removeListener(this.contextListener_);
    this.contextListener_ = null;
  }

  this.setMap(null);
};

/* ---------------------------------------- /includes/scripts/com.digitaria.discoveramerica.explorer.js ---------------------------------------- */
if (typeof languagePath === 'undefined') {
    languagePath = '';
}

//json: http://da.digitaria.com/handlers/locationssearch.aspx?c=categories&t=territories&id=experience&type=mlt
jQuery(function() {
    if (jQuery("body").hasClass('explorer-page')) {
        jQuery.get(languagePath + '/handlers/states.aspx', {}, mapTerritoriesLoad, 'json');
        jQuery.get(languagePath + '/handlers/regions.aspx', {}, mapRegionsLoad, 'json');
		//initialize below in google.js map load handler
		//jQuery.get('/handlers/locationssearch.aspx', {}, mapExperiencesLoad, 'json');
		jQuery("#map-canvas").hide();
		//jQuery("#filter-dialog-switch").click(toggleFilters);
		jQuery("#filter-clear-categories").click(clearFilterCategories).click(mapExperienceSearch);
		jQuery("#filter-clear-territories").click(clearFilterTerritories).click(mapExperienceSearch);
		jQuery("#experience-mode").click(displayModeExperiences);
		//jQuery("#map-mode").click(displayModeMap);
		jQuery("#scroller-right").click(scrollExperienceRight);
		jQuery("#scroller-left").click(scrollExperienceLeft);
		jQuery("#filter-close-territories").click(closeFilterTerritories);
		jQuery(window).resize(windowResize);

		//jQuery("#experience-canvas-container").hover(toggleExperienceButtonsOn, toggleExperienceButtonsOff);
		toggleExperienceButtonsOn();

		jQuery("#filter-choose-territories").click(switchToTerritories);
		jQuery("#filter-choose-territories").click(checkTerritories);

		//Image map mouse over popup with hack for imagemap coords
		jQuery(".regions-imagemap .icon.region.overlay").mousemove(mapRegionPopupMove);
		jQuery(".regions-imagemap .icon.region.overlay").mouseout(mapRegionPopupHide);
		gui.filters.imagemap = jQuery('.regions-imagemap .icon.region.overlay');
		jQuery("#regions-imagemap area").click(mapRegionSelect);
		jQuery("#regions-imagemap area").click(statecount);
		//stop document.click bubble on these controls
		//these must appear as the last click handlers!
		jQuery("#explorer-filter-controls-container").hover(function(){jQuery(this).addClass('focus')}, function(){jQuery(this).removeClass('focus')});
		jQuery("#explorer-filter-controls-container").click(function(){return false;});
	}
});

gui.resize = null;
function windowResize() {
	clearTimeout(gui.resize);
	gui.resize = setTimeout(function() {
		mapExperiencesSetup();
		moveFooter();
	}, 100);
}

function toggleExperienceButtonsOn() {
	jQuery("#experience-canvas-wrapper .scroller .button").removeClass('hidden');
}
function toggleExperienceButtonsOff() {
	jQuery("#experience-canvas-wrapper .scroller .button").addClass('hidden');
}


function toggleFadeIn() {
	jQuery(this).children(".info").stop(true, true).fadeToggle(400);
}

function displayModeExperiences() {
	jQuery("#experience-mode").addClass('on');
	jQuery("#map-mode").removeClass('on');
	jQuery("#map-canvas").hide();
	if($("#experience-canvas").offset().left >= 5) {
		jQuery("#scroller-right").fadeIn(500);
	} else {
		jQuery(".scroller").fadeIn(500);
	}

	// If we're in IE8
	// if(($.browser.msie && $.browser.version == 8)){
	// 	// Briefly change the top margin value
	// 	jQuery('#experience-canvas-container').css('margin-top', 1);
	// 	// Ensure zoom is set
	// 	jQuery('.explorer-page .rail1, #experience-canvas-container').css('zoom', 'normal');
	// 	jQuery('.explorer-page .rail1, #experience-canvas-container').css('zoom', 1);
	// 	setTimeout(function() {
	// 		// After a very brief delay, enough to wake IE up, reset the margin to its correct -169
	// 		jQuery('#experience-canvas-container').css('margin-top', 0);
	// 	}, 10);
	// }
}

function displayModeMap() {
	jQuery("#map-mode").addClass('on');
	jQuery("#experience-mode").removeClass('on');
	jQuery("#map-canvas").show();
	jQuery(".scroller").fadeOut(500);
	jQuery('.explorer-page #map-canvas').css({ position: 'fixed', top: '0px', left: '0px', width: jQuery(window).width(), height: jQuery(window).height(), 'z-index': 3 });
    google.maps.event.trigger(gui.map.canvas, 'resize');
	if (!gui.map.viewed) {
		mapZoomTo(45.356, -97.5525);
	}
}

function mapZoomTo(x, y, zoom) {
	gui.map.canvas.setCenter(new google.maps.LatLng(x, y));
	if (zoom != undefined)
		map.setZoom(zoom);

	gui.map.viewed = true;
}

function mapRegionPopupHide() {
	jQuery(".regions-imagemap .popup").hide();
}
function mapRegionPopupTitle(name) {
	jQuery(".regions-imagemap .popup").show();
	jQuery(".regions-imagemap .popup .title").html(name);
}

function mapRegionPopupMove(e) {
	jQuery(".regions-imagemap .popup").css({ top: (e.pageY - gui.filters.imagemap.offset().top)-55+'px', left: (e.pageX - gui.filters.imagemap.offset().left)-13+'px' });
}

function mapRegionSelect() {
	var region = jQuery(this).attr('value');
	switchToRegions();
	jQuery('.regions-imagemap .button .icon.'+region).parent().toggleClass('on');
	//reset all territory selections
	resetFilterTerritories();
	//get all regions that are on
	jQuery('.regions-imagemap .button.on').each(function(){
		//select all territories in those regions
		var region = jQuery(this).attr('value');
		for (i in (gui.filters.regions[region])) {
			jQuery("#f"+gui.filters.regions[region][i]).toggleClass('on');

		}
	});
	// re-enable territies if no regions selected
	var count = $('.regions-imagemap .button.on').length;
	(count == 0) ? $('.territories.disabled').toggleClass('disabled') : '';

	statecount();
}

function clearFilterTerritories() {
	resetFilterTerritories();
}

function clearFilterCategories() {
	resetFilterCategories();
	resetFilterTerritories();
	resetFilterRegions();
	resetControls();
}

function resetControls() {
	jQuery(".explorer-filter-controls .disabled").toggleClass('disabled');
	jQuery(".explorer-filter-controls .on").toggleClass('on');
}

function resetFilterCategories() {
	jQuery(".explorer-filter-controls .categories .button.on").toggleClass('on');
}

function resetFilterTerritories() {
	jQuery('#filter-territories .options .button.on').toggleClass('on');
	statecount();
}

function resetFilterRegions() {
	jQuery('.regions-imagemap .button.on').toggleClass('on');
	statecount();
}

function mapRegionsLoad(data) {
	for (i in data.regions)
		gui.filters.regions[data.regions[i].abbreviation] = data.regions[i].territories;
}

function mapTerritoriesLoad(data) {
	for (i in data.territories) {
		gui.filters.territories[data.territories[i].guid] = data.territories[i].territory;
		gui.territories[data.territories[i].guid] = data.territories[i];
	}
	mapTerritoriesRender();
}

function mapTerritoriesRender() {
	territories = {};
	var count = 0;
	var terrcount = 0;
  	for(i in gui.filters.territories) {
      terrcount++;
    }
    terrcount = terrcount++;
    var percolumn = Math.floor(terrcount / 3);
    var remainer = terrcount % 3;
    if (remainer > 0) {
    	percolumn = percolumn + 1;
    }

	for (i in gui.filters.territories) {
		count++;
		territories[i] = gui.filters.territories[i];

		if (count >= percolumn) {
			jQuery('#filter-territories .options').append(jQuery('#filter-territories-options-tpl').tmpl(territories));
			territories = {}; count = 0;
		}
	}
	if (count)
		jQuery('#filter-territories .options').append(jQuery('#filter-territories-options-tpl').tmpl(territories));

	//activate button toggles
	jQuery("#filter-territories .options .button").click(toggleButton);
	jQuery("#filter-territories .options .button").click(statecount);
	//activate query trigger for searches
	jQuery("map area").click(mapExperienceSearch);
	jQuery("#explorer-filter-controls-container .button[value]").click(mapExperienceSearch);
}

function toggleFilters() {
	closeControls();
	if (jQuery("#explorer-filter-controls-container").toggleClass('open').hasClass('open')) {
		jQuery("#explorer-filter-controls-container").animate({ left: '-5px' });
	} else {
		jQuery("#explorer-filter-controls-container").animate({ left: '-495px' });
	};
}

function switchToTerritories() {
	//reset regions area
	jQuery(".regions-imagemap .button").removeClass('on');
	//disable region map
	jQuery(".explorer-filter-controls .regions").addClass('disabled');
	jQuery(".explorer-filter-controls .territories").removeClass('disabled');
}

function checkTerritories() {
	//see if any territories are selected...
	if (!jQuery("#filter-choose-territories").hasClass('on') && jQuery("#filter-territories .options .button.on").length == 0){
		jQuery(".explorer-filter-controls .disabled").toggleClass('disabled');
	}
}

function switchToRegions() {
	//close the territory popup if open
	jQuery("#filter-choose-territories").removeClass('on');
	//disable region map
	jQuery(".explorer-filter-controls .territories").addClass('disabled');
	jQuery(".explorer-filter-controls .regions").removeClass('disabled');
}

var HEADER_HEIGHT = 150;
var FOOTER_HEIGHT = 75;
var EXPERIENCE_HEIGHT = 263;
var EXPERIENCE_WIDTH = 377;
var EXPERIENCE_S_WIDTH = 340;
var EXPLORER_ADD = 455;

function mapExperiencesLoad(data) {
    //reset browser cache
    gui.experiences = { message: 'loading...', count: 0, data: { }, render: { end: 0 } };
    if (gui.map.infoBox)
        gui.map.infoBox.close();
    mapMarkersRemove();

    //start loading...
    gui.experiences.message = data.message;
    gui.experiences.count = data.count;
    gui.experiences.order = [null]; //zero position is null
    //mapCenter(gui.start);
    for (i in data.data) {
        data.data[i].render = { rand: 0 };
        gui.experiences.order.push(data.data[i].guid);
        gui.experiences.data[data.data[i].guid] = data.data[i];
        mapMarkerAdd(gui.experiences.data[data.data[i].guid]);
    }

    // trigger the click event for the current map icon if an id is passed in.
    var idstring = getParameterByName('id').toString();
    // if pending and searching variables are not both false, we know a filter is coming, and therefore we do not show the marker.
    if (idstring && ((!gui.filters.pending) && (!gui.filters.searching))) {
        if (gui.map.markers[idstring]) {
            google.maps.event.trigger(gui.map.markers[idstring].marker, 'click');
        }
    }

    mapExperiencesSetup();
    gui.filters.searching = false;
    if (gui.filters.pending == true) {
        mapExperienceSearch();
    }

    // this function will animate the opactity of the tiles to make it look like they are fading into the screen.
    var interval = 100;
    jQuery(".tile").each(function (index) {
        // first set the opacity to 0.
        $(this).css("opacity", "0.0");
        var localDiv = $(this);
        setTimeout(function () { animate_div(localDiv); }, interval);
        // incrementing the interval give the appearence that the tiles are being faded in from left to right.
        interval += 25;
    });
}

// local function to change opacity from 0 to 1. Called in setTimeOut function in mapExperiencesLoad() method.
function animate_div(mydiv) {
    $(mydiv).animate({ opacity: 1.0 }, 1000);
}

function mapExperiencesSetup() {
	var rows = Math.floor((jQuery(window).height() - HEADER_HEIGHT - FOOTER_HEIGHT)/EXPERIENCE_HEIGHT);

	// If gui.experiences.render isn't defined
	if ( (typeof gui == "undefined") || (typeof gui.experiences == "undefined") || (typeof gui.experiences.render == "undefined") ) {
		if ( (typeof console == "undefined") || (typeof console.log == "undefined") ) {
			console.log("Skipping mapExperiencesSetup due to undefined gui.experiences.render");
		}
		return;
	}

	//p: <even | odd>, x: left pos
    gui.experiences.render.rows = [{ parity: 0, left: 0 }, { parity: 1, left: 0}]; //always have 2 rows
	//each array in gui.experiences.render.rows tracks the farthest right position
	if (rows >= 3) gui.experiences.render.rows.push({parity: 0, left: 0}); //add a 3rd row
	//set our container window size
	jQuery("#experience-canvas-container").height(gui.experiences.render.rows.length*EXPERIENCE_HEIGHT);

	jQuery("#experience-canvas").html('').css({left: '5px'});
	//this is a renderid to know if a experience position is dirty
	gui.experiences.render.rand = Math.floor(Math.random()*100000);
	//number of tiles that fit on this screen
	gui.experiences.render.tiles = Math.ceil((jQuery("#experience-canvas-container").width()/(EXPERIENCE_WIDTH+EXPERIENCE_S_WIDTH))*2)*gui.experiences.render.rows.length;
	//result message from last location query
	jQuery(".explorer-filter-controls .active .description .message").html(gui.experiences.message);
    mapExperiencesRender();

	//check new height for footer
    moveFooter();
}

function mapExperiencesRender() {
    //actual img tag sizes
	var parity = [{ name: 'even', width: 377, img: { width: 351, height: 237 } },{ name: 'odd', width: 340, img: { width: 314, height: 212 } }];

	//estimate our starting column
	var start = Math.floor((-jQuery("#experience-canvas").position().left/(EXPERIENCE_WIDTH+EXPERIENCE_S_WIDTH))*2);
	//get our starting tile...
	start = start*gui.experiences.render.rows.length;
	//go back one page of tiles
	start -= gui.experiences.render.tiles;
	if (start < 0) start = 0;

	//render 3 screens of tiles (left/center/right)
	var count = gui.experiences.render.tiles*3;
	//only render how many are left to be rendered
	if (count > gui.experiences.order.length - start)
		count = gui.experiences.order.length - start;

	//mark all tiles for deletion
	var tiles = jQuery(".explorer-experience.tile").addClass("delete");
	var tilesR = {}; //reverse lookup cache
	for (i = 0; i < tiles.length; i++) {
		tilesR[jQuery(tiles[i]).attr('value')] = i;
	}

	//create array of all the tiles we should render to screen!
	var tile = null;
	var experience = null;
	var experiences = [];
	//experiences start base 1
	for (i = 1; i < count; i++) {
	    if (i == gui.experiences.render.rows.length + 1 && !jQuery.cookie('first_home_page_visit')) {
					if($.cookie('cookieOptIn') !== 'optedOut') jQuery.cookie('first_home_page_visit', 'true', {expires: null, path: '/'});

	        var experience = {}

	        //update my render information
	        var row = (i - 1) % gui.experiences.render.rows.length;
	        experience.render = {

	            rand: gui.experiences.render.rand,

	            top: row * EXPERIENCE_HEIGHT,

	            left: gui.experiences.render.rows[row].left,

	            parity: gui.experiences.render.rows[row].parity,

	            size: parity[gui.experiences.render.rows[row].parity]

	        }; 		//update global row information

	        jQuery("#explorer-experience-texttile-tpl").tmpl(experience).appendTo(jQuery("#experience-canvas"));

	        gui.experiences.render.rows[row].left += 429;

	        gui.experiences.render.rows[row].parity ^= 1;

	    }

		//is tiles allready on screen?
		if (tile = tilesR[gui.experiences.order[i+start]]) {
			//just leave it on screen and remove it from deletion
			jQuery(tiles[tile]).removeClass('delete');
			continue;
		}

		//make sure positioning is updated
        experience = gui.experiences.data[gui.experiences.order[i + start]];

		//my render info dirty?
		if (experience.render.rand != gui.experiences.render.rand) {
		    //update my render information
		    var row = (i-1)%gui.experiences.render.rows.length;
            experience.render = {
				rand: gui.experiences.render.rand,
				top: row*EXPERIENCE_HEIGHT,
				left: gui.experiences.render.rows[row].left,
				parity: gui.experiences.render.rows[row].parity,
				size: parity[gui.experiences.render.rows[row].parity]
			};
			//update global row information
			gui.experiences.render.rows[row].left += parity[gui.experiences.render.rows[row].parity].width;
			gui.experiences.render.rows[row].parity ^= 1;

			if (gui.experiences.render.rows[row].left > gui.experiences.render.end) {
			    gui.experiences.render.end = gui.experiences.render.rows[row].left;
		    }
		}
		experiences.push(experience);
	}
    //render them to screen
    jQuery("#explorer-experience-tpl").tmpl(experiences).appendTo(jQuery("#experience-canvas"));
    //delete old tiles
	jQuery(".explorer-experience.tile.delete").remove();
    //enable our fade effects
	jQuery(".explorer-experience.initialize").removeClass('initialize').hover(toggleFadeIn);
	//check the canvas area after render
	scrollExperienceCheck();

	return false;
}

function mapExperienceSearch() {
		$('.tile').animate({
			opacity: 0
		}, 400);
    mapRecenter();
	if (gui.filters.searching == false) {
		gui.filters.pending = false;
		gui.filters.searching = true;

		var categories = [];
		var territories = [];

		jQuery(".explorer-filter-controls .categories .button.on[value]").each(function() { categories.push(jQuery(this).attr('value')); });
		jQuery(".explorer-filter-controls #filter-territories .button.on[value]").each(function() { territories.push(jQuery(this).attr('value')); });

		jQuery.get(languagePath + '/handlers/locationssearch.aspx', { c: implode(',', categories), t: implode(',', territories) }, mapExperiencesLoad, 'json');
	} else {
		gui.filters.pending = true;
	}
}

function mapExperienceMoreLikeThis(guid) {
    jQuery.get(languagePath + '/handlers/locationssearch.aspx', { id: guid, type: 'mlt' }, mapExperiencesLoad, 'json');
}

function scrollExperienceRight() {
	if($('#experience-canvas:animated').length == 0){
		var scroll = -1000;
		var left = jQuery('#experience-canvas-container').width()-gui.experiences.render.end-jQuery('#experience-canvas').position().left;
		if (left > scroll)
			scroll = left;
		scrollExperience(scroll);
	}
}

function scrollExperienceLeft() {
	if($('#experience-canvas:animated').length == 0){
		var scroll = 1000;
		var left = jQuery('#experience-canvas').width()-jQuery('#experience-canvas-container').width();
		left = 5-jQuery('#experience-canvas').position().left;
		if (left < scroll)
			scroll = left;
		scrollExperience(scroll);
	}
}

function scrollExperience(value) {
	mapExperiencesRender();
	var newPos = value + $('#experience-canvas').position().left;
	//console.log(newPos);
	if(newPos < 5){
		jQuery('#experience-canvas').animate({ left: '+='+value+'px' }, { duration: 750, easing: "swing", complete: scrollExperienceCheck });
	}
	else{
		jQuery('#experience-canvas').animate({ left: '5px' }, { duration: 750, easing: "swing", complete: scrollExperienceCheck });
	}
}

function scrollExperienceCheck() {
	if (jQuery('#experience-canvas').position().left >= 0) {
		jQuery('#experience-canvas-wrapper').addClass('start');
	} else {
		jQuery('#experience-canvas-wrapper').removeClass('start');
	}

	if ((jQuery('#experience-canvas').position().left-jQuery("#experience-canvas-container").width()) <= -gui.experiences.render.end) {
		jQuery('#experience-canvas-wrapper').addClass('end');
	} else {
		jQuery('#experience-canvas-wrapper').removeClass('end');
	}
}

function getTerritoryName(guid) {
	//if territory is not found return something else
    	var city = '';
    	if (gui.experiences.data[guid].city !== "")
		city = gui.experiences.data[guid].city + ", ";
    	if (gui.experiences.data[guid].state == "")
		city = gui.experiences.data[guid].city;

    	return city + gui.experiences.data[guid].state;
}

function closeFilterTerritories() {
	jQuery("#filter-choose-territories>.button").click();
}

function implode (glue, pieces) {
    // Joins array elements placing glue string between items and return one string
    var i = '',
        retVal = '',
        tGlue = '';
    if (arguments.length === 1) {
        pieces = glue;
        glue = '';
    }
    if (typeof(pieces) === 'object') {
        if (Object.prototype.toString.call(pieces) === '[object Array]') {
            return pieces.join(glue);
        }
        for (i in pieces) {
            retVal += tGlue + pieces[i];
            tGlue = glue;
        }
        return retVal;
    }
    return pieces;
}

function moveFooter() {
	jQuery('#footer-container').css('bottom','0px')
	//window smaller then document?
	if (jQuery(window).height() < jQuery(document).height()) {
		jQuery("#footer-container").removeClass('bottom');
	} else {
		jQuery("#footer-container").addClass('bottom');
	}
}

function statecount() {
	var names = [];
	jQuery('#selectedfilters').empty();
	jQuery('#filter-territories .column .button.on').each(
		function(){names.push(jQuery(this).html())}
	);
	jQuery.each(names, function(){
		jQuery('#selectedfilters').append('<span class="stateselected">' +this + '<span class="selected-comma">,</span> </span>')}
	);
	var thecount = jQuery('#selectedfilters').children('.stateselected').size();
	if (thecount <= 4 ) {
		jQuery('#selectedfilters').children('.stateselected').last('.stateselected').addClass('last');
	}
	if (thecount > 4) {
		jQuery('#selectedfilters').children('.stateselected').slice(4).hide();
		var subcount = thecount - 4
		jQuery('#selectedfilters').append('<span class="pluscount"> +' + subcount + '</span>');
	}
}

/* ---------------------------------------- /includes/scripts/com.digitaria.discoveramerica.suitcase.js ---------------------------------------- */
//suitcase.aspx?a=d&i={34a79beb-4f86-4c3a-ac53-03496c6098a5}
if (typeof languagePath === 'undefined') {
    languagePath = '';
}

jQuery(function() {
	//jQuery("#suitcase-toggle").click(suitcaseToggle);
	//jQuery(".scroller .bar .button").mousedown(toggleBar).mouseup(toggleBarOff).mouseout(toggleBarOff).mousemove(moveBar);
    jQuery.get(languagePath + '/handlers/suitcase.aspx', {}, suitcaseLoad, 'json');

	//suitcase auto close handlers
	//must be last handlers
	jQuery("#suitcase-container").hover(function(){jQuery(this).addClass('focus')}, function(){jQuery(this).removeClass('focus')});
	jQuery('#suitcase-login-popup-button').click(function(){openLogin();});
	$('#suitcase-container .scroller').jScrollPane({
		verticalDragMinHeight: 88,
		verticalDragMaxHeight: 88
	});
});

function suitcaseToggle() {
	closeControls();
	if (jQuery("#suitcase-container").toggleClass('open').hasClass('open')) {
			jQuery("#suitcase-container").animate({ left: '-5px' });
	} else {
			jQuery("#suitcase-container").animate({ left: '-469px' });
	};
	if (jQuery('body').hasClass('anonymous')) {
		jQuery('#suitcase-login-popup').css('display','block');
		jQuery('#suitcase-container .details').css('display','none');
		jQuery('#suitcase-container .scroller').css('display','none');
		jQuery('#suitcase-container').css('padding-bottom','39px');
	} else {
		jQuery('#suitcase-login-popup').css('display','none');
		if($('#suitcase-container').hasClass('open')){
			jQuery('#suitcase-container .details').css('display','block');
			jQuery('#suitcase-container .scroller').css('display','block');
		} else {
			jQuery('#suitcase-container .details').css('display','none');
			jQuery('#suitcase-container .scroller').css('display','none');
		}
	};
};


function suitcaseLoad(data) {
	gui.suitcase = data;
	suitcaseRender();
	suitcasechecker();
}

function suitcaseRender() {
	jQuery("#suitcase").html('');
	var suitcaseitems = $("#suitcase").children().length;
	for (i in gui.suitcase.data)
		jQuery("#suitcase").append(jQuery("#suitcase-item-tpl").tmpl(gui.suitcase.data[i]));
	if (suitcaseitems > 1) {
		jQuery("#suitcase-container .scroller").css({ height: '280px' });
		//jQuery("#suitcase-container .scroller .bar").show();
	} else {
		jQuery("#suitcase-container .scroller").css({ height: 'auto' });
		//jQuery("#suitcase-container .scroller .bar").hide();
	}
	jQuery("#suitcase .item .button").click(suitcaseDelete);
	jQuery(".suitcase-buttons .icon.suitcase .counter").html(gui.suitcase.count);
	// if there are suitcase items make sure nothing is display none so that
	// the scrollbar plugin can get the correct height
	if (gui.suitcase.count) {
		jQuery('#suitcase-container .details').css('display','block');
		jQuery('#suitcase-container .scroller').css('display','block');
	}
	$('#suitcase-container .scroller').jScrollPane({
		verticalDragMinHeight: 88,
		verticalDragMaxHeight: 88
	});
}

function suitcaseAdd(guid) {
    jQuery.get(languagePath + '/handlers/suitcase.aspx?a=a&i={' + guid + '}', {}, suitcaseLoad, 'json');
	$('#suitcase-container .scroller').jScrollPane({
		verticalDragMinHeight: 88,
		verticalDragMaxHeight: 88
	});
}

function suitcaseDelete() {
    jQuery.get(languagePath + '/handlers/suitcase.aspx?a=d&i={' + jQuery(this).parent().attr('value') + '}', {}, suitcaseLoad, 'json');

}

function suitcasechecker() {
	if (jQuery('body').hasClass('experience-page')) {
		var expID = jQuery('#experience-save-to-suitcase a').attr('href');
		var parsevariable = expID.split('\'');
		var realid = parsevariable[1];
		var existe = jQuery('#suitcase .item[value=' + realid + ']').size();
		if (existe == 1){
			jQuery('#experience-save-to-suitcase').hide();
			jQuery('#experience-saved').css('display','block');
		} else {
			if (jQuery('body').hasClass('logged-in')) {
				jQuery('#experience-saved').hide();
				jQuery('#experience-login-to-save').hide();
				jQuery('#experience-save-to-suitcase').css('display','block');
			} else {
				jQuery('#experience-saved').hide();
				jQuery('#experience-save-to-suitcase').hide();
				jQuery('#experience-login-to-save').css('display','block');
			}
		}
	}
}

/* ---------------------------------------- /includes/scripts/com.digitaria.discoveramerica.contact.js ---------------------------------------- */
$(document).ready(function() {
	jQuery('input[type=checkbox]').css('position','absolute').css('left','-9999px');
	jQuery('.checkbox').css('display','inline-block').addClass('inline-block');
	
	jQuery('.checkbox').click(function(){
		jQuery(this).toggleClass('checked');
		if (jQuery(this).siblings('input').attr('checked')) {
			jQuery(this).siblings('input').removeAttr('checked').addClass('error');
			jQuery(this).siblings('label').show();
		} else {
		jQuery(this).siblings('input').attr('checked', true).removeClass('error');
		jQuery(this).removeClass('error');
		jQuery(this).siblings('label').hide();
		
		}
	});
	    var localeHash = new da.utilities.LocaleHashTable;

	$("#contact-form").validate({
		/*invalidHandler: function(e, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				var message = errors == 1
					? 'You missed 1 field. It has been highlighted below'
					: 'You missed ' + errors + ' fields.  They have been highlighted below';
				$("div.error span").html(message);
				$("div.error").show();
			} else {
				$("div.error").hide();
			}
		},*/
		errorLabelContainer: "div.error",
		wrapper: "span",
		validClass: "success",
		rules: {
			first_name: "required",
			last_name: "required",
			email: {
				required: true,
				email: true
			},
		},
		messages: {
			first_name: localeHash["ENTER_FIRSTNAME"],
			last_name: localeHash["ENTER_LASTNAME"],
			email: {
			    required: localeHash["ENTER_EMAIL"],
			    email: localeHash["INVALID_EMAIL"]
			}
		}
		
      
	});
	

});
/* ---------------------------------------- /includes/scripts/com.digitaria.discoveramerica.header.js ---------------------------------------- */
// the following block of code will run the menu_initialize() command whenever the DOM is ready to be manipulated
jQuery(function(){
	menu_initialize();
});

function menu_initialize() {


	jQuery('#header-menu-languages').click(function(){
		jQuery('#header-menu-languages').toggleClass('open');
		if (jQuery('#header-menu-languages').hasClass('open')) {
			jQuery('#header-menu-languages .options').fadeIn();
		} else {
			jQuery('#header-menu-languages .options').fadeOut();
		}
	});

	// assign the #header-menu a jQuery item
	header_menu = jQuery('#header-menu');
	header_input_search = jQuery('#header-input-search');

	// when the site's Search box is focused, these focus() and blur() methods execute
	header_input_search.focus(function(e) {
		// check if the search box is set to the default value
		if (header_input_search.attr('value') == header_input_search.data('default-value')) {
			// it was set to the default value, so let's clear it out
			header_input_search.attr('value', '');
		}
	}).blur(function(e){
		// if the value of the search box is empty, let's set it to default on blur()
		if (header_input_search.attr('value') == '') {
			header_input_search.attr('value', header_input_search.data('default-value'));
		}
	});
}


// Window load event used just in case window height is dependant upon images
$(window).bind('load', function() {

	if(!$('.explorer-page').length) {
		positionFooter();
		$(window)
	  .scroll(positionFooter)
	  .resize(positionFooter);
	}

	function positionFooter() {
		return;
		// not sure why this was added but it's breaking the footer on some pages
		// so removing it for now.
		var $footer = $('#footer-spacer')
				$wrap = $('#wrapper'),
			  footerHeight = $footer.height();

	  if ( ($(document.body).height()) < $(window).height()) {
	  	$wrap.css({'margin-bottom': footerHeight + 'px'});
	  	$('html, body').css({'overflow': 'hidden'});
	    $footer.css({
	      position: 'absolute',
	      left: '50%',
				'margin-left': '-480px'
	    }).animate({
	      bottom: 0
	    }, 0)
	  } else {
	    $footer.removeAttr('style').css({
	      position: 'static'
	    });
	    $wrap.removeAttr('style');
	    $('html, body').removeAttr('style');
	  }

	}
}); // end window load

/* ---------------------------------------- /includes/scripts/jquery.jscrollpane.js ---------------------------------------- */
/*!
 * jScrollPane - v2.0.0beta11 - 2011-07-04
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2010 Kelvin Luck
 * Dual licensed under the MIT and GPL licenses.
 */

// Script: jScrollPane - cross browser customisable scrollbars
//
// *Version: 2.0.0beta11, Last updated: 2011-07-04*
//
// Project Home - http://jscrollpane.kelvinluck.com/
// GitHub       - http://github.com/vitch/jScrollPane
// Source       - http://github.com/vitch/jScrollPane/raw/master/script/jquery.jscrollpane.js
// (Minified)   - http://github.com/vitch/jScrollPane/raw/master/script/jquery.jscrollpane.min.js
//
// About: License
//
// Copyright (c) 2011 Kelvin Luck
// Dual licensed under the MIT or GPL Version 2 licenses.
// http://jscrollpane.kelvinluck.com/MIT-LICENSE.txt
// http://jscrollpane.kelvinluck.com/GPL-LICENSE.txt
//
// About: Examples
//
// All examples and demos are available through the jScrollPane example site at:
// http://jscrollpane.kelvinluck.com/
//
// About: Support and Testing
//
// This plugin is tested on the browsers below and has been found to work reliably on them. If you run
// into a problem on one of the supported browsers then please visit the support section on the jScrollPane
// website (http://jscrollpane.kelvinluck.com/) for more information on getting support. You are also
// welcome to fork the project on GitHub if you can contribute a fix for a given issue. 
//
// jQuery Versions - tested in 1.4.2+ - reported to work in 1.3.x
// Browsers Tested - Firefox 3.6.8, Safari 5, Opera 10.6, Chrome 5.0, IE 6, 7, 8
//
// About: Release History
//
// 2.0.0beta11 - (in progress) 
// 2.0.0beta10 - (2011-04-17) cleaner required size calculation, improved keyboard support, stickToBottom/Left, other small fixes
// 2.0.0beta9 - (2011-01-31) new API methods, bug fixes and correct keyboard support for FF/OSX
// 2.0.0beta8 - (2011-01-29) touchscreen support, improved keyboard support
// 2.0.0beta7 - (2011-01-23) scroll speed consistent (thanks Aivo Paas)
// 2.0.0beta6 - (2010-12-07) scrollToElement horizontal support
// 2.0.0beta5 - (2010-10-18) jQuery 1.4.3 support, various bug fixes
// 2.0.0beta4 - (2010-09-17) clickOnTrack support, bug fixes
// 2.0.0beta3 - (2010-08-27) Horizontal mousewheel, mwheelIntent, keyboard support, bug fixes
// 2.0.0beta2 - (2010-08-21) Bug fixes
// 2.0.0beta1 - (2010-08-17) Rewrite to follow modern best practices and enable horizontal scrolling, initially hidden
//							 elements and dynamically sized elements.
// 1.x - (2006-12-31 - 2010-07-31) Initial version, hosted at googlecode, deprecated

(function($,window,undefined){

	$.fn.jScrollPane = function(settings)
	{
		// JScrollPane "class" - public methods are available through $('selector').data('jsp')
		function JScrollPane(elem, s)
		{
			var settings, jsp = this, pane, paneWidth, paneHeight, container, contentWidth, contentHeight,
				percentInViewH, percentInViewV, isScrollableV, isScrollableH, verticalDrag, dragMaxY,
				verticalDragPosition, horizontalDrag, dragMaxX, horizontalDragPosition,
				verticalBar, verticalTrack, scrollbarWidth, verticalTrackHeight, verticalDragHeight, arrowUp, arrowDown,
				horizontalBar, horizontalTrack, horizontalTrackWidth, horizontalDragWidth, arrowLeft, arrowRight,
				reinitialiseInterval, originalPadding, originalPaddingTotalWidth, previousContentWidth,
				wasAtTop = true, wasAtLeft = true, wasAtBottom = false, wasAtRight = false,
				originalElement = elem.clone(false, false).empty(),
				mwEvent = $.fn.mwheelIntent ? 'mwheelIntent.jsp' : 'mousewheel.jsp';

			originalPadding = elem.css('paddingTop') + ' ' +
								elem.css('paddingRight') + ' ' +
								elem.css('paddingBottom') + ' ' +
								elem.css('paddingLeft');
			originalPaddingTotalWidth = (parseInt(elem.css('paddingLeft'), 10) || 0) +
										(parseInt(elem.css('paddingRight'), 10) || 0);

			function initialise(s)
			{

				var /*firstChild, lastChild, */isMaintainingPositon, lastContentX, lastContentY,
						hasContainingSpaceChanged, originalScrollTop, originalScrollLeft,
						maintainAtBottom = false, maintainAtRight = false;

				settings = s;

				if (pane === undefined) {
					originalScrollTop = elem.scrollTop();
					originalScrollLeft = elem.scrollLeft();

					elem.css(
						{
							overflow: 'hidden',
							padding: 0
						}
					);
					// TODO: Deal with where width/ height is 0 as it probably means the element is hidden and we should
					// come back to it later and check once it is unhidden...
					paneWidth = elem.innerWidth() + originalPaddingTotalWidth;
					paneHeight = elem.innerHeight();

					elem.width(paneWidth);
					
					pane = $('<div class="jspPane" />').css('padding', originalPadding).append(elem.children());
					container = $('<div class="jspContainer" />')
						.css({
							'width': paneWidth + 'px',
							'height': paneHeight + 'px'
						}
					).append(pane).appendTo(elem);

					/*
					// Move any margins from the first and last children up to the container so they can still
					// collapse with neighbouring elements as they would before jScrollPane 
					firstChild = pane.find(':first-child');
					lastChild = pane.find(':last-child');
					elem.css(
						{
							'margin-top': firstChild.css('margin-top'),
							'margin-bottom': lastChild.css('margin-bottom')
						}
					);
					firstChild.css('margin-top', 0);
					lastChild.css('margin-bottom', 0);
					*/
				} else {
					elem.css('width', '');

					maintainAtBottom = settings.stickToBottom && isCloseToBottom();
					maintainAtRight  = settings.stickToRight  && isCloseToRight();

					hasContainingSpaceChanged = elem.innerWidth() + originalPaddingTotalWidth != paneWidth || elem.outerHeight() != paneHeight;

					if (hasContainingSpaceChanged) {
						paneWidth = elem.innerWidth() + originalPaddingTotalWidth;
						paneHeight = elem.innerHeight();
						container.css({
							width: paneWidth + 'px',
							height: paneHeight + 'px'
						});
					}

					// If nothing changed since last check...
					if (!hasContainingSpaceChanged && previousContentWidth == contentWidth && pane.outerHeight() == contentHeight) {
						elem.width(paneWidth);
						return;
					}
					previousContentWidth = contentWidth;
					
					pane.css('width', '');
					elem.width(paneWidth);

					container.find('>.jspVerticalBar,>.jspHorizontalBar').remove().end();
				}

				pane.css('overflow', 'auto');
				if (s.contentWidth) {
					contentWidth = s.contentWidth;
				} else {
					contentWidth = pane[0].scrollWidth;
				}
				contentHeight = pane[0].scrollHeight;
				pane.css('overflow', '');

				percentInViewH = contentWidth / paneWidth;
				percentInViewV = contentHeight / paneHeight;
				isScrollableV = percentInViewV > 1;

				isScrollableH = percentInViewH > 1;

				//console.log(paneWidth, paneHeight, contentWidth, contentHeight, percentInViewH, percentInViewV, isScrollableH, isScrollableV);

				if (!(isScrollableH || isScrollableV)) {
					elem.removeClass('jspScrollable');
					pane.css({
						top: 0,
						width: container.width() - originalPaddingTotalWidth
					});
					removeMousewheel();
					removeFocusHandler();
					removeKeyboardNav();
					removeClickOnTrack();
					unhijackInternalLinks();
				} else {
					elem.addClass('jspScrollable');

					isMaintainingPositon = settings.maintainPosition && (verticalDragPosition || horizontalDragPosition);
					if (isMaintainingPositon) {
						lastContentX = contentPositionX();
						lastContentY = contentPositionY();
					}

					initialiseVerticalScroll();
					initialiseHorizontalScroll();
					resizeScrollbars();

					if (isMaintainingPositon) {
						scrollToX(maintainAtRight  ? (contentWidth  - paneWidth ) : lastContentX, false);
						scrollToY(maintainAtBottom ? (contentHeight - paneHeight) : lastContentY, false);
					}

					initFocusHandler();
					initMousewheel();
					initTouch();
					
					if (settings.enableKeyboardNavigation) {
						initKeyboardNav();
					}
					if (settings.clickOnTrack) {
						initClickOnTrack();
					}
					
					observeHash();
					if (settings.hijackInternalLinks) {
						hijackInternalLinks();
					}
				}

				if (settings.autoReinitialise && !reinitialiseInterval) {
					reinitialiseInterval = setInterval(
						function()
						{
							initialise(settings);
						},
						settings.autoReinitialiseDelay
					);
				} else if (!settings.autoReinitialise && reinitialiseInterval) {
					clearInterval(reinitialiseInterval);
				}

				originalScrollTop && elem.scrollTop(0) && scrollToY(originalScrollTop, false);
				originalScrollLeft && elem.scrollLeft(0) && scrollToX(originalScrollLeft, false);

				elem.trigger('jsp-initialised', [isScrollableH || isScrollableV]);
			}

			function initialiseVerticalScroll()
			{
				if (isScrollableV) {

					container.append(
						$('<div class="jspVerticalBar" />').append(
							$('<div class="jspCap jspCapTop" />'),
							$('<div class="jspTrack" />').append(
								$('<div class="jspDrag" />').append(
									$('<div class="jspDragTop" />'),
									$('<div class="jspDragBottom" />')
								)
							),
							$('<div class="jspCap jspCapBottom" />')
						)
					);

					verticalBar = container.find('>.jspVerticalBar');
					verticalTrack = verticalBar.find('>.jspTrack');
					verticalDrag = verticalTrack.find('>.jspDrag');

					if (settings.showArrows) {
						arrowUp = $('<a class="jspArrow jspArrowUp" />').bind(
							'mousedown.jsp', getArrowScroll(0, -1)
						).bind('click.jsp', nil);
						arrowDown = $('<a class="jspArrow jspArrowDown" />').bind(
							'mousedown.jsp', getArrowScroll(0, 1)
						).bind('click.jsp', nil);
						if (settings.arrowScrollOnHover) {
							arrowUp.bind('mouseover.jsp', getArrowScroll(0, -1, arrowUp));
							arrowDown.bind('mouseover.jsp', getArrowScroll(0, 1, arrowDown));
						}

						appendArrows(verticalTrack, settings.verticalArrowPositions, arrowUp, arrowDown);
					}

					verticalTrackHeight = paneHeight;
					container.find('>.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow').each(
						function()
						{
							verticalTrackHeight -= $(this).outerHeight();
						}
					);


					verticalDrag.hover(
						function()
						{
							verticalDrag.addClass('jspHover');
						},
						function()
						{
							verticalDrag.removeClass('jspHover');
						}
					).bind(
						'mousedown.jsp',
						function(e)
						{
							// Stop IE from allowing text selection
							$('html').bind('dragstart.jsp selectstart.jsp', nil);

							verticalDrag.addClass('jspActive');

							var startY = e.pageY - verticalDrag.position().top;

							$('html').bind(
								'mousemove.jsp',
								function(e)
								{
									positionDragY(e.pageY - startY, false);
								}
							).bind('mouseup.jsp mouseleave.jsp', cancelDrag);
							return false;
						}
					);
					sizeVerticalScrollbar();
				}
			}

			function sizeVerticalScrollbar()
			{
				verticalTrack.height(verticalTrackHeight + 'px');
				verticalDragPosition = 0;
				scrollbarWidth = settings.verticalGutter + verticalTrack.outerWidth();

				// Make the pane thinner to allow for the vertical scrollbar
				pane.width(paneWidth - scrollbarWidth - originalPaddingTotalWidth);

				// Add margin to the left of the pane if scrollbars are on that side (to position
				// the scrollbar on the left or right set it's left or right property in CSS)
				try {
					if (verticalBar.position().left === 0) {
						pane.css('margin-left', scrollbarWidth + 'px');
					}
				} catch (err) {
				}
			}

			function initialiseHorizontalScroll()
			{
				if (isScrollableH) {

					container.append(
						$('<div class="jspHorizontalBar" />').append(
							$('<div class="jspCap jspCapLeft" />'),
							$('<div class="jspTrack" />').append(
								$('<div class="jspDrag" />').append(
									$('<div class="jspDragLeft" />'),
									$('<div class="jspDragRight" />')
								)
							),
							$('<div class="jspCap jspCapRight" />')
						)
					);

					horizontalBar = container.find('>.jspHorizontalBar');
					horizontalTrack = horizontalBar.find('>.jspTrack');
					horizontalDrag = horizontalTrack.find('>.jspDrag');

					if (settings.showArrows) {
						arrowLeft = $('<a class="jspArrow jspArrowLeft" />').bind(
							'mousedown.jsp', getArrowScroll(-1, 0)
						).bind('click.jsp', nil);
						arrowRight = $('<a class="jspArrow jspArrowRight" />').bind(
							'mousedown.jsp', getArrowScroll(1, 0)
						).bind('click.jsp', nil);
						if (settings.arrowScrollOnHover) {
							arrowLeft.bind('mouseover.jsp', getArrowScroll(-1, 0, arrowLeft));
							arrowRight.bind('mouseover.jsp', getArrowScroll(1, 0, arrowRight));
						}
						appendArrows(horizontalTrack, settings.horizontalArrowPositions, arrowLeft, arrowRight);
					}

					horizontalDrag.hover(
						function()
						{
							horizontalDrag.addClass('jspHover');
						},
						function()
						{
							horizontalDrag.removeClass('jspHover');
						}
					).bind(
						'mousedown.jsp',
						function(e)
						{
							// Stop IE from allowing text selection
							$('html').bind('dragstart.jsp selectstart.jsp', nil);

							horizontalDrag.addClass('jspActive');

							var startX = e.pageX - horizontalDrag.position().left;

							$('html').bind(
								'mousemove.jsp',
								function(e)
								{
									positionDragX(e.pageX - startX, false);
								}
							).bind('mouseup.jsp mouseleave.jsp', cancelDrag);
							return false;
						}
					);
					horizontalTrackWidth = container.innerWidth();
					sizeHorizontalScrollbar();
				}
			}

			function sizeHorizontalScrollbar()
			{
				container.find('>.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow').each(
					function()
					{
						horizontalTrackWidth -= $(this).outerWidth();
					}
				);

				horizontalTrack.width(horizontalTrackWidth + 'px');
				horizontalDragPosition = 0;
			}

			function resizeScrollbars()
			{
				if (isScrollableH && isScrollableV) {
					var horizontalTrackHeight = horizontalTrack.outerHeight(),
						verticalTrackWidth = verticalTrack.outerWidth();
					verticalTrackHeight -= horizontalTrackHeight;
					$(horizontalBar).find('>.jspCap:visible,>.jspArrow').each(
						function()
						{
							horizontalTrackWidth += $(this).outerWidth();
						}
					);
					horizontalTrackWidth -= verticalTrackWidth;
					paneHeight -= verticalTrackWidth;
					paneWidth -= horizontalTrackHeight;
					horizontalTrack.parent().append(
						$('<div class="jspCorner" />').css('width', horizontalTrackHeight + 'px')
					);
					sizeVerticalScrollbar();
					sizeHorizontalScrollbar();
				}
				// reflow content
				if (isScrollableH) {
					pane.width((container.outerWidth() - originalPaddingTotalWidth) + 'px');
				}
				contentHeight = pane.outerHeight();
				percentInViewV = contentHeight / paneHeight;

				if (isScrollableH) {
					horizontalDragWidth = Math.ceil(1 / percentInViewH * horizontalTrackWidth);
					if (horizontalDragWidth > settings.horizontalDragMaxWidth) {
						horizontalDragWidth = settings.horizontalDragMaxWidth;
					} else if (horizontalDragWidth < settings.horizontalDragMinWidth) {
						horizontalDragWidth = settings.horizontalDragMinWidth;
					}
					horizontalDrag.width(horizontalDragWidth + 'px');
					dragMaxX = horizontalTrackWidth - horizontalDragWidth;
					_positionDragX(horizontalDragPosition); // To update the state for the arrow buttons
				}
				if (isScrollableV) {
					verticalDragHeight = Math.ceil(1 / percentInViewV * verticalTrackHeight);
					if (verticalDragHeight > settings.verticalDragMaxHeight) {
						verticalDragHeight = settings.verticalDragMaxHeight;
					} else if (verticalDragHeight < settings.verticalDragMinHeight) {
						verticalDragHeight = settings.verticalDragMinHeight;
					}
					verticalDrag.height(verticalDragHeight + 'px');
					dragMaxY = verticalTrackHeight - verticalDragHeight;
					_positionDragY(verticalDragPosition); // To update the state for the arrow buttons
				}
			}

			function appendArrows(ele, p, a1, a2)
			{
				var p1 = "before", p2 = "after", aTemp;
				
				// Sniff for mac... Is there a better way to determine whether the arrows would naturally appear
				// at the top or the bottom of the bar?
				if (p == "os") {
					p = /Mac/.test(navigator.platform) ? "after" : "split";
				}
				if (p == p1) {
					p2 = p;
				} else if (p == p2) {
					p1 = p;
					aTemp = a1;
					a1 = a2;
					a2 = aTemp;
				}

				ele[p1](a1)[p2](a2);
			}

			function getArrowScroll(dirX, dirY, ele)
			{
				return function()
				{
					arrowScroll(dirX, dirY, this, ele);
					this.blur();
					return false;
				};
			}

			function arrowScroll(dirX, dirY, arrow, ele)
			{
				arrow = $(arrow).addClass('jspActive');

				var eve,
					scrollTimeout,
					isFirst = true,
					doScroll = function()
					{
						if (dirX !== 0) {
							jsp.scrollByX(dirX * settings.arrowButtonSpeed);
						}
						if (dirY !== 0) {
							jsp.scrollByY(dirY * settings.arrowButtonSpeed);
						}
						scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.arrowRepeatFreq);
						isFirst = false;
					};

				doScroll();

				eve = ele ? 'mouseout.jsp' : 'mouseup.jsp';
				ele = ele || $('html');
				ele.bind(
					eve,
					function()
					{
						arrow.removeClass('jspActive');
						scrollTimeout && clearTimeout(scrollTimeout);
						scrollTimeout = null;
						ele.unbind(eve);
					}
				);
			}

			function initClickOnTrack()
			{
				removeClickOnTrack();
				if (isScrollableV) {
					verticalTrack.bind(
						'mousedown.jsp',
						function(e)
						{
							if (e.originalTarget === undefined || e.originalTarget == e.currentTarget) {
								var clickedTrack = $(this),
									offset = clickedTrack.offset(),
									direction = e.pageY - offset.top - verticalDragPosition,
									scrollTimeout,
									isFirst = true,
									doScroll = function()
									{
										var offset = clickedTrack.offset(),
											pos = e.pageY - offset.top - verticalDragHeight / 2,
											contentDragY = paneHeight * settings.scrollPagePercent,
											dragY = dragMaxY * contentDragY / (contentHeight - paneHeight);
										if (direction < 0) {
											if (verticalDragPosition - dragY > pos) {
												jsp.scrollByY(-contentDragY);
											} else {
												positionDragY(pos);
											}
										} else if (direction > 0) {
											if (verticalDragPosition + dragY < pos) {
												jsp.scrollByY(contentDragY);
											} else {
												positionDragY(pos);
											}
										} else {
											cancelClick();
											return;
										}
										scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.trackClickRepeatFreq);
										isFirst = false;
									},
									cancelClick = function()
									{
										scrollTimeout && clearTimeout(scrollTimeout);
										scrollTimeout = null;
										$(document).unbind('mouseup.jsp', cancelClick);
									};
								doScroll();
								$(document).bind('mouseup.jsp', cancelClick);
								return false;
							}
						}
					);
				}
				
				if (isScrollableH) {
					horizontalTrack.bind(
						'mousedown.jsp',
						function(e)
						{
							if (e.originalTarget === undefined || e.originalTarget == e.currentTarget) {
								var clickedTrack = $(this),
									offset = clickedTrack.offset(),
									direction = e.pageX - offset.left - horizontalDragPosition,
									scrollTimeout,
									isFirst = true,
									doScroll = function()
									{
										var offset = clickedTrack.offset(),
											pos = e.pageX - offset.left - horizontalDragWidth / 2,
											contentDragX = paneWidth * settings.scrollPagePercent,
											dragX = dragMaxX * contentDragX / (contentWidth - paneWidth);
										if (direction < 0) {
											if (horizontalDragPosition - dragX > pos) {
												jsp.scrollByX(-contentDragX);
											} else {
												positionDragX(pos);
											}
										} else if (direction > 0) {
											if (horizontalDragPosition + dragX < pos) {
												jsp.scrollByX(contentDragX);
											} else {
												positionDragX(pos);
											}
										} else {
											cancelClick();
											return;
										}
										scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.trackClickRepeatFreq);
										isFirst = false;
									},
									cancelClick = function()
									{
										scrollTimeout && clearTimeout(scrollTimeout);
										scrollTimeout = null;
										$(document).unbind('mouseup.jsp', cancelClick);
									};
								doScroll();
								$(document).bind('mouseup.jsp', cancelClick);
								return false;
							}
						}
					);
				}
			}

			function removeClickOnTrack()
			{
				if (horizontalTrack) {
					horizontalTrack.unbind('mousedown.jsp');
				}
				if (verticalTrack) {
					verticalTrack.unbind('mousedown.jsp');
				}
			}

			function cancelDrag()
			{
				$('html').unbind('dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp');

				if (verticalDrag) {
					verticalDrag.removeClass('jspActive');
				}
				if (horizontalDrag) {
					horizontalDrag.removeClass('jspActive');
				}
			}

			function positionDragY(destY, animate)
			{
				if (!isScrollableV) {
					return;
				}
				if (destY < 0) {
					destY = 0;
				} else if (destY > dragMaxY) {
					destY = dragMaxY;
				}

				// can't just check if(animate) because false is a valid value that could be passed in...
				if (animate === undefined) {
					animate = settings.animateScroll;
				}
				if (animate) {
					jsp.animate(verticalDrag, 'top', destY,	_positionDragY);
				} else {
					verticalDrag.css('top', destY);
					_positionDragY(destY);
				}

			}

			function _positionDragY(destY)
			{
				if (destY === undefined) {
					destY = verticalDrag.position().top;
				}

				container.scrollTop(0);
				verticalDragPosition = destY;

				var isAtTop = verticalDragPosition === 0,
					isAtBottom = verticalDragPosition == dragMaxY,
					percentScrolled = destY/ dragMaxY,
					destTop = -percentScrolled * (contentHeight - paneHeight);

				if (wasAtTop != isAtTop || wasAtBottom != isAtBottom) {
					wasAtTop = isAtTop;
					wasAtBottom = isAtBottom;
					elem.trigger('jsp-arrow-change', [wasAtTop, wasAtBottom, wasAtLeft, wasAtRight]);
				}
				
				updateVerticalArrows(isAtTop, isAtBottom);
				pane.css('top', destTop);
				elem.trigger('jsp-scroll-y', [-destTop, isAtTop, isAtBottom]).trigger('scroll');
			}

			function positionDragX(destX, animate)
			{
				if (!isScrollableH) {
					return;
				}
				if (destX < 0) {
					destX = 0;
				} else if (destX > dragMaxX) {
					destX = dragMaxX;
				}

				if (animate === undefined) {
					animate = settings.animateScroll;
				}
				if (animate) {
					jsp.animate(horizontalDrag, 'left', destX,	_positionDragX);
				} else {
					horizontalDrag.css('left', destX);
					_positionDragX(destX);
				}
			}

			function _positionDragX(destX)
			{
				if (destX === undefined) {
					destX = horizontalDrag.position().left;
				}

				container.scrollTop(0);
				horizontalDragPosition = destX;

				var isAtLeft = horizontalDragPosition === 0,
					isAtRight = horizontalDragPosition == dragMaxX,
					percentScrolled = destX / dragMaxX,
					destLeft = -percentScrolled * (contentWidth - paneWidth);

				if (wasAtLeft != isAtLeft || wasAtRight != isAtRight) {
					wasAtLeft = isAtLeft;
					wasAtRight = isAtRight;
					elem.trigger('jsp-arrow-change', [wasAtTop, wasAtBottom, wasAtLeft, wasAtRight]);
				}
				
				updateHorizontalArrows(isAtLeft, isAtRight);
				pane.css('left', destLeft);
				elem.trigger('jsp-scroll-x', [-destLeft, isAtLeft, isAtRight]).trigger('scroll');
			}

			function updateVerticalArrows(isAtTop, isAtBottom)
			{
				if (settings.showArrows) {
					arrowUp[isAtTop ? 'addClass' : 'removeClass']('jspDisabled');
					arrowDown[isAtBottom ? 'addClass' : 'removeClass']('jspDisabled');
				}
			}

			function updateHorizontalArrows(isAtLeft, isAtRight)
			{
				if (settings.showArrows) {
					arrowLeft[isAtLeft ? 'addClass' : 'removeClass']('jspDisabled');
					arrowRight[isAtRight ? 'addClass' : 'removeClass']('jspDisabled');
				}
			}

			function scrollToY(destY, animate)
			{
				var percentScrolled = destY / (contentHeight - paneHeight);
				positionDragY(percentScrolled * dragMaxY, animate);
			}

			function scrollToX(destX, animate)
			{
				var percentScrolled = destX / (contentWidth - paneWidth);
				positionDragX(percentScrolled * dragMaxX, animate);
			}

			function scrollToElement(ele, stickToTop, animate)
			{
				var e, eleHeight, eleWidth, eleTop = 0, eleLeft = 0, viewportTop, viewportLeft, maxVisibleEleTop, maxVisibleEleLeft, destY, destX;

				// Legal hash values aren't necessarily legal jQuery selectors so we need to catch any
				// errors from the lookup...
				try {
					e = $(ele);
				} catch (err) {
					return;
				}
				eleHeight = e.outerHeight();
				eleWidth= e.outerWidth();

				container.scrollTop(0);
				container.scrollLeft(0);
				
				// loop through parents adding the offset top of any elements that are relatively positioned between
				// the focused element and the jspPane so we can get the true distance from the top
				// of the focused element to the top of the scrollpane...
				while (!e.is('.jspPane')) {
					eleTop += e.position().top;
					eleLeft += e.position().left;
					e = e.offsetParent();
					if (/^body|html$/i.test(e[0].nodeName)) {
						// we ended up too high in the document structure. Quit!
						return;
					}
				}

				viewportTop = contentPositionY();
				maxVisibleEleTop = viewportTop + paneHeight;
				if (eleTop < viewportTop || stickToTop) { // element is above viewport
					destY = eleTop - settings.verticalGutter;
				} else if (eleTop + eleHeight > maxVisibleEleTop) { // element is below viewport
					destY = eleTop - paneHeight + eleHeight + settings.verticalGutter;
				}
				if (destY) {
					scrollToY(destY, animate);
				}
				
				viewportLeft = contentPositionX();
	            maxVisibleEleLeft = viewportLeft + paneWidth;
	            if (eleLeft < viewportLeft || stickToTop) { // element is to the left of viewport
	                destX = eleLeft - settings.horizontalGutter;
	            } else if (eleLeft + eleWidth > maxVisibleEleLeft) { // element is to the right viewport
	                destX = eleLeft - paneWidth + eleWidth + settings.horizontalGutter;
	            }
	            if (destX) {
	                scrollToX(destX, animate);
	            }

			}

			function contentPositionX()
			{
				return -pane.position().left;
			}

			function contentPositionY()
			{
				return -pane.position().top;
			}

			function isCloseToBottom()
			{
				var scrollableHeight = contentHeight - paneHeight;
				return (scrollableHeight > 20) && (scrollableHeight - contentPositionY() < 10);
			}

			function isCloseToRight()
			{
				var scrollableWidth = contentWidth - paneWidth;
				return (scrollableWidth > 20) && (scrollableWidth - contentPositionX() < 10);
			}

			function initMousewheel()
			{
				container.unbind(mwEvent).bind(
					mwEvent,
					function (event, delta, deltaX, deltaY) {
						var dX = horizontalDragPosition, dY = verticalDragPosition;
						jsp.scrollBy(deltaX * settings.mouseWheelSpeed, -deltaY * settings.mouseWheelSpeed, false);
						// return true if there was no movement so rest of screen can scroll
						return dX == horizontalDragPosition && dY == verticalDragPosition;
					}
				);
			}

			function removeMousewheel()
			{
				container.unbind(mwEvent);
			}

			function nil()
			{
				return false;
			}

			function initFocusHandler()
			{
				pane.find(':input,a').unbind('focus.jsp').bind(
					'focus.jsp',
					function(e)
					{
						scrollToElement(e.target, false);
					}
				);
			}

			function removeFocusHandler()
			{
				pane.find(':input,a').unbind('focus.jsp');
			}
			
			function initKeyboardNav()
			{
				var keyDown, elementHasScrolled, validParents = [];
				isScrollableH && validParents.push(horizontalBar[0]);
				isScrollableV && validParents.push(verticalBar[0]);
				
				// IE also focuses elements that don't have tabindex set.
				pane.focus(
					function()
					{
						elem.focus();
					}
				);
				
				elem.attr('tabindex', 0)
					.unbind('keydown.jsp keypress.jsp')
					.bind(
						'keydown.jsp',
						function(e)
						{
							if (e.target !== this && !(validParents.length && $(e.target).closest(validParents).length)){
								return;
							}
							var dX = horizontalDragPosition, dY = verticalDragPosition;
							switch(e.keyCode) {
								case 40: // down
								case 38: // up
								case 34: // page down
								case 32: // space
								case 33: // page up
								case 39: // right
								case 37: // left
									keyDown = e.keyCode;
									keyDownHandler();
									break;
								case 35: // end
									scrollToY(contentHeight - paneHeight);
									keyDown = null;
									break;
								case 36: // home
									scrollToY(0);
									keyDown = null;
									break;
							}

							elementHasScrolled = e.keyCode == keyDown && dX != horizontalDragPosition || dY != verticalDragPosition;
							return !elementHasScrolled;
						}
					).bind(
						'keypress.jsp', // For FF/ OSX so that we can cancel the repeat key presses if the JSP scrolls...
						function(e)
						{
							if (e.keyCode == keyDown) {
								keyDownHandler();
							}
							return !elementHasScrolled;
						}
					);
				
				if (settings.hideFocus) {
					elem.css('outline', 'none');
					if ('hideFocus' in container[0]){
						elem.attr('hideFocus', true);
					}
				} else {
					elem.css('outline', '');
					if ('hideFocus' in container[0]){
						elem.attr('hideFocus', false);
					}
				}
				
				function keyDownHandler()
				{
					var dX = horizontalDragPosition, dY = verticalDragPosition;
					switch(keyDown) {
						case 40: // down
							jsp.scrollByY(settings.keyboardSpeed, false);
							break;
						case 38: // up
							jsp.scrollByY(-settings.keyboardSpeed, false);
							break;
						case 34: // page down
						case 32: // space
							jsp.scrollByY(paneHeight * settings.scrollPagePercent, false);
							break;
						case 33: // page up
							jsp.scrollByY(-paneHeight * settings.scrollPagePercent, false);
							break;
						case 39: // right
							jsp.scrollByX(settings.keyboardSpeed, false);
							break;
						case 37: // left
							jsp.scrollByX(-settings.keyboardSpeed, false);
							break;
					}

					elementHasScrolled = dX != horizontalDragPosition || dY != verticalDragPosition;
					return elementHasScrolled;
				}
			}
			
			function removeKeyboardNav()
			{
				elem.attr('tabindex', '-1')
					.removeAttr('tabindex')
					.unbind('keydown.jsp keypress.jsp');
			}

			function observeHash()
			{
				if (location.hash && location.hash.length > 1) {
					var e,
						retryInt,
						hash = escape(location.hash) // hash must be escaped to prevent XSS
						;
					try {
						e = $(hash);
					} catch (err) {
						return;
					}

					if (e.length && pane.find(hash)) {
						// nasty workaround but it appears to take a little while before the hash has done its thing
						// to the rendered page so we just wait until the container's scrollTop has been messed up.
						if (container.scrollTop() === 0) {
							retryInt = setInterval(
								function()
								{
									if (container.scrollTop() > 0) {
										scrollToElement(hash, true);
										$(document).scrollTop(container.position().top);
										clearInterval(retryInt);
									}
								},
								50
							);
						} else {
							scrollToElement(hash, true);
							$(document).scrollTop(container.position().top);
						}
					}
				}
			}

			function unhijackInternalLinks()
			{
				$('a.jspHijack').unbind('click.jsp-hijack').removeClass('jspHijack');
			}

			function hijackInternalLinks()
			{
				unhijackInternalLinks();
				$('a[href^=#]').addClass('jspHijack').bind(
					'click.jsp-hijack',
					function()
					{
						var uriParts = this.href.split('#'), hash;
						if (uriParts.length > 1) {
							hash = uriParts[1];
							if (hash.length > 0 && pane.find('#' + hash).length > 0) {
								scrollToElement('#' + hash, true);
								// Need to return false otherwise things mess up... Would be nice to maybe also scroll
								// the window to the top of the scrollpane?
								return false;
							}
						}
					}
				);
			}
			
			// Init touch on iPad, iPhone, iPod, Android
			function initTouch()
			{
				var startX,
					startY,
					touchStartX,
					touchStartY,
					moved,
					moving = false;
  
				container.unbind('touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick').bind(
					'touchstart.jsp',
					function(e)
					{
						var touch = e.originalEvent.touches[0];
						startX = contentPositionX();
						startY = contentPositionY();
						touchStartX = touch.pageX;
						touchStartY = touch.pageY;
						moved = false;
						moving = true;
					}
				).bind(
					'touchmove.jsp',
					function(ev)
					{
						if(!moving) {
							return;
						}
						
						var touchPos = ev.originalEvent.touches[0],
							dX = horizontalDragPosition, dY = verticalDragPosition;
						
						jsp.scrollTo(startX + touchStartX - touchPos.pageX, startY + touchStartY - touchPos.pageY);
						
						moved = moved || Math.abs(touchStartX - touchPos.pageX) > 5 || Math.abs(touchStartY - touchPos.pageY) > 5;
						
						// return true if there was no movement so rest of screen can scroll
						return dX == horizontalDragPosition && dY == verticalDragPosition;
					}
				).bind(
					'touchend.jsp',
					function(e)
					{
						moving = false;
						/*if(moved) {
							return false;
						}*/
					}
				).bind(
					'click.jsp-touchclick',
					function(e)
					{
						if(moved) {
							moved = false;
							return false;
						}
					}
				);
			}
			
			function destroy(){
				var currentY = contentPositionY(),
					currentX = contentPositionX();
				elem.removeClass('jspScrollable').unbind('.jsp');
				elem.replaceWith(originalElement.append(pane.children()));
				originalElement.scrollTop(currentY);
				originalElement.scrollLeft(currentX);
			}

			// Public API
			$.extend(
				jsp,
				{
					// Reinitialises the scroll pane (if it's internal dimensions have changed since the last time it
					// was initialised). The settings object which is passed in will override any settings from the
					// previous time it was initialised - if you don't pass any settings then the ones from the previous
					// initialisation will be used.
					reinitialise: function(s)
					{
						s = $.extend({}, settings, s);
						initialise(s);
					},
					// Scrolls the specified element (a jQuery object, DOM node or jQuery selector string) into view so
					// that it can be seen within the viewport. If stickToTop is true then the element will appear at
					// the top of the viewport, if it is false then the viewport will scroll as little as possible to
					// show the element. You can also specify if you want animation to occur. If you don't provide this
					// argument then the animateScroll value from the settings object is used instead.
					scrollToElement: function(ele, stickToTop, animate)
					{
						scrollToElement(ele, stickToTop, animate);
					},
					// Scrolls the pane so that the specified co-ordinates within the content are at the top left
					// of the viewport. animate is optional and if not passed then the value of animateScroll from
					// the settings object this jScrollPane was initialised with is used.
					scrollTo: function(destX, destY, animate)
					{
						scrollToX(destX, animate);
						scrollToY(destY, animate);
					},
					// Scrolls the pane so that the specified co-ordinate within the content is at the left of the
					// viewport. animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					scrollToX: function(destX, animate)
					{
						scrollToX(destX, animate);
					},
					// Scrolls the pane so that the specified co-ordinate within the content is at the top of the
					// viewport. animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					scrollToY: function(destY, animate)
					{
						scrollToY(destY, animate);
					},
					// Scrolls the pane to the specified percentage of its maximum horizontal scroll position. animate
					// is optional and if not passed then the value of animateScroll from the settings object this
					// jScrollPane was initialised with is used.
					scrollToPercentX: function(destPercentX, animate)
					{
						scrollToX(destPercentX * (contentWidth - paneWidth), animate);
					},
					// Scrolls the pane to the specified percentage of its maximum vertical scroll position. animate
					// is optional and if not passed then the value of animateScroll from the settings object this
					// jScrollPane was initialised with is used.
					scrollToPercentY: function(destPercentY, animate)
					{
						scrollToY(destPercentY * (contentHeight - paneHeight), animate);
					},
					// Scrolls the pane by the specified amount of pixels. animate is optional and if not passed then
					// the value of animateScroll from the settings object this jScrollPane was initialised with is used.
					scrollBy: function(deltaX, deltaY, animate)
					{
						jsp.scrollByX(deltaX, animate);
						jsp.scrollByY(deltaY, animate);
					},
					// Scrolls the pane by the specified amount of pixels. animate is optional and if not passed then
					// the value of animateScroll from the settings object this jScrollPane was initialised with is used.
					scrollByX: function(deltaX, animate)
					{
						var destX = contentPositionX() + Math[deltaX<0 ? 'floor' : 'ceil'](deltaX),
							percentScrolled = destX / (contentWidth - paneWidth);
						positionDragX(percentScrolled * dragMaxX, animate);
					},
					// Scrolls the pane by the specified amount of pixels. animate is optional and if not passed then
					// the value of animateScroll from the settings object this jScrollPane was initialised with is used.
					scrollByY: function(deltaY, animate)
					{
						var destY = contentPositionY() + Math[deltaY<0 ? 'floor' : 'ceil'](deltaY),
							percentScrolled = destY / (contentHeight - paneHeight);
						positionDragY(percentScrolled * dragMaxY, animate);
					},
					// Positions the horizontal drag at the specified x position (and updates the viewport to reflect
					// this). animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					positionDragX: function(x, animate)
					{
						positionDragX(x, animate);
					},
					// Positions the vertical drag at the specified y position (and updates the viewport to reflect
					// this). animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					positionDragY: function(y, animate)
					{
						positionDragY(y, animate);
					},
					// This method is called when jScrollPane is trying to animate to a new position. You can override
					// it if you want to provide advanced animation functionality. It is passed the following arguments:
					//  * ele          - the element whose position is being animated
					//  * prop         - the property that is being animated
					//  * value        - the value it's being animated to
					//  * stepCallback - a function that you must execute each time you update the value of the property
					// You can use the default implementation (below) as a starting point for your own implementation.
					animate: function(ele, prop, value, stepCallback)
					{
						var params = {};
						params[prop] = value;
						ele.animate(
							params,
							{
								'duration'	: settings.animateDuration,
								'easing'	: settings.animateEase,
								'queue'		: false,
								'step'		: stepCallback
							}
						);
					},
					// Returns the current x position of the viewport with regards to the content pane.
					getContentPositionX: function()
					{
						return contentPositionX();
					},
					// Returns the current y position of the viewport with regards to the content pane.
					getContentPositionY: function()
					{
						return contentPositionY();
					},
					// Returns the width of the content within the scroll pane.
					getContentWidth: function()
					{
						return contentWidth;
					},
					// Returns the height of the content within the scroll pane.
					getContentHeight: function()
					{
						return contentHeight;
					},
					// Returns the horizontal position of the viewport within the pane content.
					getPercentScrolledX: function()
					{
						return contentPositionX() / (contentWidth - paneWidth);
					},
					// Returns the vertical position of the viewport within the pane content.
					getPercentScrolledY: function()
					{
						return contentPositionY() / (contentHeight - paneHeight);
					},
					// Returns whether or not this scrollpane has a horizontal scrollbar.
					getIsScrollableH: function()
					{
						return isScrollableH;
					},
					// Returns whether or not this scrollpane has a vertical scrollbar.
					getIsScrollableV: function()
					{
						return isScrollableV;
					},
					// Gets a reference to the content pane. It is important that you use this method if you want to
					// edit the content of your jScrollPane as if you access the element directly then you may have some
					// problems (as your original element has had additional elements for the scrollbars etc added into
					// it).
					getContentPane: function()
					{
						return pane;
					},
					// Scrolls this jScrollPane down as far as it can currently scroll. If animate isn't passed then the
					// animateScroll value from settings is used instead.
					scrollToBottom: function(animate)
					{
						positionDragY(dragMaxY, animate);
					},
					// Hijacks the links on the page which link to content inside the scrollpane. If you have changed
					// the content of your page (e.g. via AJAX) and want to make sure any new anchor links to the
					// contents of your scroll pane will work then call this function.
					hijackInternalLinks: function()
					{
						hijackInternalLinks();
					},
					// Removes the jScrollPane and returns the page to the state it was in before jScrollPane was
					// initialised.
					destroy: function()
					{
							destroy();
					}
				}
			);
			
			initialise(s);
		}

		// Pluginifying code...
		settings = $.extend({}, $.fn.jScrollPane.defaults, settings);
		
		// Apply default speed
		$.each(['mouseWheelSpeed', 'arrowButtonSpeed', 'trackClickSpeed', 'keyboardSpeed'], function() {
			settings[this] = settings[this] || settings.speed;
		});

		return this.each(
			function()
			{
				var elem = $(this), jspApi = elem.data('jsp');
				if (jspApi) {
					jspApi.reinitialise(settings);
				} else {
					jspApi = new JScrollPane(elem, settings);
					elem.data('jsp', jspApi);
				}
			}
		);
	};

	$.fn.jScrollPane.defaults = {
		showArrows					: false,
		maintainPosition			: true,
		stickToBottom				: false,
		stickToRight				: false,
		clickOnTrack				: true,
		autoReinitialise			: false,
		autoReinitialiseDelay		: 500,
		verticalDragMinHeight		: 0,
		verticalDragMaxHeight		: 99999,
		horizontalDragMinWidth		: 0,
		horizontalDragMaxWidth		: 99999,
		contentWidth				: undefined,
		animateScroll				: false,
		animateDuration				: 300,
		animateEase					: 'linear',
		hijackInternalLinks			: false,
		verticalGutter				: 4,
		horizontalGutter			: 4,
		mouseWheelSpeed				: 0,
		arrowButtonSpeed			: 0,
		arrowRepeatFreq				: 50,
		arrowScrollOnHover			: false,
		trackClickSpeed				: 0,
		trackClickRepeatFreq		: 70,
		verticalArrowPositions		: 'split',
		horizontalArrowPositions	: 'split',
		enableKeyboardNavigation	: true,
		hideFocus					: false,
		keyboardSpeed				: 0,
		initialDelay                : 300,        // Delay before starting repeating
		speed						: 30,		// Default speed when others falsey
		scrollPagePercent			: .8		// Percent of visible area scrolled when pageUp/Down or track area pressed
	};

})(jQuery,this);


/* ---------------------------------------- /includes/scripts/jquery.mousewheel.js ---------------------------------------- */
/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);

/* ---------------------------------------- /includes/scripts/mwheelIntent.js ---------------------------------------- */
/**
 * @author trixta
 * @version 1.2
 */
(function($){

var mwheelI = {
			pos: [-260, -260]
		},
	minDif 	= 3,
	doc 	= document,
	root 	= doc.documentElement,
	body 	= doc.body,
	longDelay, shortDelay
;

function unsetPos(){
	if(this === mwheelI.elem){
		mwheelI.pos = [-260, -260];
		mwheelI.elem = false;
		minDif = 3;
	}
}

$.event.special.mwheelIntent = {
	setup: function(){
		var jElm = $(this).bind('mousewheel', $.event.special.mwheelIntent.handler);
		if( this !== doc && this !== root && this !== body ){
			jElm.bind('mouseleave', unsetPos);
		}
		jElm = null;
        return true;
    },
	teardown: function(){
        $(this)
			.unbind('mousewheel', $.event.special.mwheelIntent.handler)
			.unbind('mouseleave', unsetPos)
		;
        return true;
    },
    handler: function(e, d){
		var pos = [e.clientX, e.clientY];
		if( this === mwheelI.elem || Math.abs(mwheelI.pos[0] - pos[0]) > minDif || Math.abs(mwheelI.pos[1] - pos[1]) > minDif ){
            mwheelI.elem = this;
			mwheelI.pos = pos;
			minDif = 250;
			
			clearTimeout(shortDelay);
			shortDelay = setTimeout(function(){
				minDif = 10;
			}, 200);
			clearTimeout(longDelay);
			longDelay = setTimeout(function(){
				minDif = 3;
			}, 1500);
			e = $.extend({}, e, {type: 'mwheelIntent'});
            return $.event.handle.apply(this, arguments);
		}
    }
};
$.fn.extend({
	mwheelIntent: function(fn) {
		return fn ? this.bind("mwheelIntent", fn) : this.trigger("mwheelIntent");
	},
	
	unmwheelIntent: function(fn) {
		return this.unbind("mwheelIntent", fn);
	}
});

$(function(){
	body = doc.body;
	//assume that document is always scrollable, doesn't hurt if not
	$(doc).bind('mwheelIntent.mwheelIntentDefault', $.noop);
});
})(jQuery);
/* ---------------------------------------- /includes/scripts/jquery.anchor.js ---------------------------------------- */
/*******

	***	Anchor Slider by Cedric Dugas   ***
	*** Http://www.position-absolute.com ***
	
	Never have an anchor jumping your content, slide it.

	Don't forget to put an id to your anchor !
	You can use and modify this script for any project you want, but please leave this comment as credit.
	
*****/
		


$(document).ready(function() {
	$("a.anchorLink").anchorAnimate()
});

jQuery.fn.anchorAnimate = function(settings) {

 	settings = jQuery.extend({
		speed : 1100
	}, settings);	
	
	return this.each(function(){
		var caller = this
		$(caller).click(function (event) {	
			event.preventDefault()
			var locationHref = window.location.href
			var elementClick = $(caller).attr("href")
			
			var destination = $(elementClick).offset().top;
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, settings.speed, function() {
				window.location.hash = elementClick
			});
		  	return false;
		})
	})
}
/* ---------------------------------------- /includes/jsbin/jCore.js ---------------------------------------- */
/* static
	jCore v0.2
	Matthew Ausonio
	Last Updated:October 2,2009
	Created:October 10, 2008

	Dependent libraries:
		jQuery v1.3.2

	This file contains the required scripts for a base Digicore site.
	Includes functionality for common modules such as Poll and Rating. For a full list please refer to Core SVN.
*/
var jCore = {
    // **************************************************************
    // Item Stats Retrieval methods. Do not remove
    // **************************************************************
    jCoreInit: function (shareURL, shareTitle, itemId, pollIdsArray) {
        if (typeof console != "undefined") {
            if (typeof console.log != "undefined") {
                // console.log("Initializing jCore");
                // console.log("---------------------");
                // console.log("shareURL: ");
                // console.log(shareURL);
                // console.log("shareTitle: ");
                // console.log(shareTitle);
                // console.log("itemId: ");
                // console.log(itemId);
                // console.log("pollIdsArray: ");
                // console.log(pollIdsArray);
            }
        }

        // Temporarily set the values until the AJAX handler comes back
        this.shareURL = shareURL; // url of the item/page
        this.shareTitle = shareTitle; // title of the item/page
        this.itemId = itemId; // sitecore id of the item/page
        this.pollIdsArray = pollIdsArray;

        jCore.log(jCore);
        // first thing we do is test to see if cookies is enabled, if it isnt, we alert user to enable cookies.
        this.cookieTest();
        //end cookie test, lets continue

        /* now we check to see if our userID cookie has been set, if not we request a new userID and make the cookie */
        userId = (jCore.readCookie("userID")) ? jCore.readCookie("userID") : "";

        /* debugPath will help us modify ajax calls for development purposes. to trigger put debug=true in url */
        debugPath = (jCore.getUrlParam("debug") == "true") ? "/Html" : "";

        // for the language path
        if (typeof languagePath === 'undefined') {
            languagePath = '';
        }
        language = languagePath === '' ? '' : languagePath;

        // the blankItemStats is used when we have an error or timeout getting the actual item stats.
        blankItemStats = {
            "clicks": 1446,
            "comments": 0, 			// int : number of comments of the current item
            "votes": 0, 			// int : number of votes of the current item (sometimes refered to as ratings)
            "rating": 3.00, 		// int : the current calculated rating of the current item
            "userVoted": false, 	// boolean : if user has rated current item. based on current itemId and current userID.
            "usersRating": null, // int or null : rating of current item. based on current itemId and current userId.
            "userId": ""			// string : current userId generated by sitecore.
        };
        // make call to item stats.  On callback init the jCore object.
        $.ajax({ async: false, type: "GET", url: debugPath + language + "/Handlers/ItemStats.ajax", data: "id=" + itemId + "&userid=" + userId, dataType: "json", cache: false,
            success: function (updatedItemStatistics) {
                userId = updatedItemStatistics.userId;
                //jCore.writeCookie("userID", userId, 365);
                if($.cookie('cookieOptIn') !== 'optedOut') $.cookie('userID', userId, {expires: 365, path: '/'});
                jCore.assignItemStats(shareURL, shareTitle, itemId, updatedItemStatistics, pollIdsArray, debugPath);
            },
            error: function (error) {
                jCore.assignItemStats(shareURL, shareTitle, itemId, blankItemStats, pollIdsArray, debugPath);
            },
            timeout: function (error) {
                jCore.assignItemStats(shareURL, shareTitle, itemId, blankItemStats, pollIdsArray, debugPath);
            }
        });
    },
    assignItemStats: function (shareURL, shareTitle, itemId, itemStats, pollIdsArray, debugPath) {
        this.shareURL = shareURL; // url of the item/page
        this.shareTitle = shareTitle; // title of the item/page
        this.itemId = itemId; // sitecore id of the item/page
        this.itemStats = itemStats; // stats on the item
        this.pollIdsArray = new Array(); // array of poll ids for polls on current page
        this.debugPath = debugPath;
        //this goes through polls on the page and initializes
        $(".jcorePoll").each(function (i) {
            jCore.pollIdsArray.push(this.id); // store this poll id in an array for later
            jCore.initPoll(i); // initialize this poll
        });

        // initialize all ratings
        updateRatingStats(itemStats);
    },
    cookieTest: function () {
        var cookieEnabled = (navigator.cookieEnabled) ? true : false
        //if not IE4+ nor NS6+
        if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
            document.cookie = "testcookie"
            cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false
        }
        if (!cookieEnabled) {
            alert("Cookies are required for this site to run properly.  Please enable cookies in your browser settings and reload page.");
            return false;
        }
    },
    // **************************************************************
    // Poll Module methods
    //
    // **************************************************************
    pollItems: new Array(),
    initPoll: function (i) {
        // set up this poll item. this is done for each poll item on the page.
        this.pollItems[i] = {
            pollId: jCore.pollIdsArray[i],
            pollForm: document.getElementById(jCore.pollIdsArray[i]),
            pollContainer: document.getElementById(jCore.pollIdsArray[i] + "Container"),
            pollUrl: $("#" + jCore.pollIdsArray[i]).attr("action")
        }
        // lets go ahead and store the source code for later use in results.
        jCore.tempPollSource(i, this.pollItems[i].pollContainer);
        //console.log("here");
        // lets request current poll results handler. this will tell us if the user has already submitted to this poll.
        $.ajax({
            type: "GET",
            url: jCore.debugPath + jCore.language + "/Handlers/Poll.ajax",
            dataType: "json",
            cache: false,
            data: "id=" + jCore.pollIdsArray[i] + "&userID=" + jCore.itemStats.userId,
            success: function (pollJSON) {
                if (pollJSON.userClicked) {
                    //console.log("here-AleradySubmit");
                    // user already voted. show results.
                    jCore.showPollResults(i, pollJSON);
                } else {
                    //console.log("Here-subitted " + jCore.pollItems[i].pollId);
                    // user has not voted. attach submit event to form.
                    $("#" + jCore.pollItems[i].pollId).submit(function () {
                        return jCore.submitPoll(i, jCore.pollItems[i].pollId, jCore.pollItems[i].pollForm, jCore.pollItems[i].pollContainer, jCore.pollItems[i].pollurl);
                    });
                }
            },
            error: function (pollJSON) {
                //console.log("fail- " + pollJSON);
            }
        });
    },
    submitPoll: function (i, pollId, pollForm, pollContainer, pollurl) {
        // get currently selection to submit
        var pollValue = $("input:radio:checked", pollForm).val();
        // if there is no selection we stop and alert user.
        if (!pollValue)
            alert("Please select a poll answer");
        else {
            // if we made it this far, we go ahead and submit the poll. on success we re-request the poll results handler
            $.ajax({
                type: "GET",
                url: jCore.debugPath + jCore.language + "/Handlers/PollClick.ajax",
                data: "id=" + pollId + "&choiceId=" + pollValue + "&userid=" + jCore.itemStats.userId,
                cache: false,
                success: function (pollResults) {
                    if (pollResults.processed = true)
                        jCore.getPollResults(i);
                }
            });
        }
        return false;
    },
    getPollResults: function (i) {
        // request results. this is called on a successful poll submission. on success we show results.
        $.ajax({
            type: "GET",
            url: jCore.debugPath + jCore.language + "/Handlers/Poll.ajax",
            dataType: "json",
            cache: false,
            data: "id=" + jCore.pollItems[i].pollId + "&userid=" + jCore.itemStats.userId,
            success: function (pollresults) {
                jCore.showPollResults(i, pollresults);
            }
        });
    },
    showPollResults: function (i, pollresults) {
        var values = [];

        // Go through all of the results, storing their percentages in to the values array
        for (p = 0; p < pollresults.poll.length; p++) {
            values.push(pollresults.poll[p].percentage);
        }

        // Sort the array of values so we go from highest in pos 0 to lowest percentages
        values.sort(function (a, b) {
            return b - a;
        });

        // modify stored source object with percentages from poll results json
        for (p = 0; p < pollresults.poll.length; p++) {
            var perc = pollresults.poll[p].percentage;
            var percadjust = pollresults.poll[p].percentage * .87; // make sure 100% will appear along side colored bar

            // Find the position in values with the same percentage - so we know what position the item should be in
            var pos = -1;
            for (var j = 0; j < values.length; j++) {
                if (pos == -1) {
                    if (values[j] == perc) {
                        pos = j;
                    }
                }
            }

            var iid = pollresults.poll[p].itemId;
            var newVal = jCore.pollItems[i].pollSource[iid];
            if (typeof newVal !== "string") {
                newVal = newVal.html();
            }
            // Replace #P# with the percentage
            newVal = newVal.replace(/#P#/g, perc);
            // Replace #PA# with the percentage adjustment
            newVal = newVal.replace(/#PA#/g, percadjust);
            // Replace #POS# with the position
            newVal = newVal.replace(/#POS#/g, pos);
            if (typeof jCore.pollItems[i].pollSource[iid] == "string") {
                jCore.pollItems[i].pollSource[iid] = newVal;
            } else {
                jCore.pollItems[i].pollSource[iid].html(newVal);
            }
        }

        // create an array to hold final source code for results
        tempSource = new Array;
        for (var qId in jCore.pollItems[i].pollSource) {
            if (typeof jCore.pollItems[i].pollSource[qId] == "string") {
                tempSource.push(jCore.pollItems[i].pollSource[qId]);
            } else {
                tempSource.push(jCore.pollItems[i].pollSource[qId].html());
            }
        }

        // Tack on the total number of votes
        // tempSource.push('<div class="pollTotal"><span class="pollTotalValue">' + pollresults.totalClicks + '</span> <span class="pollTotalLabel">Total Votes. Poll results are not scientific.</span></div>');

        // output final source code for results
        pCont = $(this.pollItems[i].pollContainer);
        pCont.empty();
        for (i = 0, z = tempSource.length; i < z; i++) {
            pCont.append(tempSource[i]);
        }

    },
    tempPollSource: function (p, pollContainer) {
        // new object inside this poll item to store source code for later use in results
        jCore.pollItems[p].pollSource = new Object();
        // if the input is also inside the label, we want to remove it. here we create the reg exp to do that
        inputReg = new RegExp(/<input[^>]*>/);
        // for each label we store a string for later use in results source code.
        $("label", pollContainer).each(function (i) {
            var playerImg, playerName;
            inputFor = document.getElementById($(this).attr("for")).value;
            // cleanSource = this.innerHTML.replace(inputReg, "");
            playerImg = $('img', this).get(0);
            playerName = $(this).find('span').html();
            // playerName = playerName.replace(/<img[^>]*>/, '');
            // jCore.pollItems[p].pollSource[inputFor] = '<div class='pollResultRow pollResultsPos#POS#'><div class='pollResultBar' style='width:#PA#%;'><div></div></div><span>#P#%</span><div>' + playerName + '</div></div>';
            jCore.pollItems[p].pollSource[inputFor] = '<div class="pollResultRowOuter"><div class="pollResultRow pollResultsPos#POS#"><img src="' + playerImg.src + '" /><span class="resultPercent">#P#%</span><div class="pollResultBar" style="width:#PA#%;"><div></div></div><div class="pollResultPlayerName">' + playerName + '</div></div></div>';
            // $('span', jCore.pollItems[p].pollSource[inputFor]).before(playerImg);
            // $('.pollResultRow', jCore.pollItems[p].pollSource[inputFor]).append(playerName);
        });

    },
    // **************************************************************
    // Rating Module methods
    //
    // **************************************************************
    initRating: function () {

    },
    // **************************************************************
    // Utility methods
    // **************************************************************
    log: function (v) {
        if (window.console)
            console.log(v);
    },
    findPos: function (obj) {
        var curleft = curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return [curleft, curtop];
        }
    },
    readCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return false;
    },
    writeCookie: function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
            document.cookie = name + "=" + value + expires + "; path=/";
        }
        else {
            var expires = "";
            document.cookie = name + "=" + value + expires + "; path=/; domain=" + globalDomain;
        }
    },
    openWin: function (url, wName, para) {
        if (typeof (arguments[2]) == "object")
            var values = jCore.parameters(arguments[2]);
        else
            var values = para;
        window.open(url, wName, values);
    },
    parameters: function (attributes) {
        var values = [];
        for (attribute in attributes) {
            values.push(attribute + "=" + attributes[attribute].toString());
        }
        return values.join(",");
    },
    getUrlParam: function (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return "";
        else
            return results[1];
    }
};
// pointer for function call in each page. Now sent to already existing jCore object.
jCoreInit = function (shareURL, shareTitle, itemId, pollIdsArray) { jCore.jCoreInit(shareURL, shareTitle, itemId, pollIdsArray); }

function prepRatingSystem() {
	/* Find all of the ratings elements */
	$('.ratings').each(function(index, el) {
		/* Find the ul inside them */
		var $_ul=$(el).find('ul');
		/* Find the links inside the ul if there are any (may be spans if not editable) */
		var $_ratingLinks=$(el).find("ul a");
		/* For those links */
		$_ratingLinks.each(function(index, el) {
			/* Store the link and the index */
			var $_this=$(el);
			var _index=index;

			/* Bind the mouseover, mouseout and click behaviors */
			$_this.mouseover(function() {
				/* Clear any existing hover ratings */
				$_ul.removeClass('hoverRating1').removeClass('hoverRating2').removeClass('hoverRating3').removeClass('hoverRating4').removeClass('hoverRating5');
				if (!$_ul.is('.disabled')) {
				    $_ul.addClass('hoverRating'+(_index+1));
				}

			}).mouseout(function() {
				/* Clear any existing hover ratings */
				$_ul.removeClass('hoverRating1').removeClass('hoverRating2').removeClass('hoverRating3').removeClass('hoverRating4').removeClass('hoverRating5');
			}).click(function(e) {
				e.preventDefault();
				/* Update the rating */
				rateContent(this);
			});
		});
	});
}

/** Function to submit rating */
function rateContent(el) {
	/* Get the url from the link */
	var rateResultPage = $(el).attr("href");
	/* Submit it via ajax along with the item id, the user id (if there is one). */
	$.ajax({
		type: "GET",
		url: rateResultPage+"&id="+jCore.itemId+"&userid="+jCore.itemStats.userId,
		dataType: "json",
		cache:false,
		success: function(rateJSON){
			/* If we successfully rated the item */
			if(rateJSON.processed == true) {
				/* Get the new (average) rating */
				updateRating();
			} else {
				/* Previous we showed an error, now we just update and call it good */
				updateRating();
				//$(".shareBarRatings").html("Error. Please try again later.");
			}
		}
	});
}
/* Get the latest values for a particular rating */
function updateRating(callback) {
	$.ajax({
		type: "GET",
		url: jCore.language + "/Handlers/ItemStats.ajax",
		data:"id="+jCore.itemId+"&userid="+jCore.itemStats.userId,
		dataType:"json",
		cache:false,
	    success: function(updatedItemStatistics){
			/* Update the rating details */
			updateRatingStats(updatedItemStatistics);
			// update comment count
			jCore.itemStats.comments = updatedItemStatistics['comments'];
			/* If the user's voted, disable additional rating */
			if (updatedItemStatistics.userVoted) {
				disableRatings();
			}
			if (callback) {
			    callback();
			};
		}
	});
}

function updateRatingStats(itemStats) {
	/* If the user has already voted, disable voting */
	if(itemStats.userVoted == true)
		disableRatings();
	/* Find the editable ratings for the page (have a tags not spans for the values) */
	var $_editableRatings=$(".ratings ul a, .ratings ul span span").parents('.ratings');
	/* Remove any previous ratings */
	$_editableRatings.find('ul').removeClass('rating0').removeClass('rating1').removeClass('rating2').removeClass('rating3').removeClass('rating4').removeClass('rating5');
	/* Show the new rating */
	$_editableRatings.find('ul').addClass('rating'+Math.round(itemStats.rating));
	/* Update the number of votes */
	$_editableRatings.find('span.ratingTotalVotes').html("("+itemStats.votes+" Votes)");
}

/* Remove all of the links so the user can't vote a second time */
function disableRatings() {
    $(".shareBarRatings li a").remove();
    $(".ratings ul a").each(function(index, el) {
        var $_el=jQuery(el);
        var oldhtml=$_el.html();
        $_el.parent().html('<span>'+oldhtml+'</span>');
    });
	/* The parents trick finds only the .ratings ul that have an anchor within them so leaves already disabled ones or inactive ones alone */
    $(".ratings ul a, .ratings ul span span").parents('.ratings ul').addClass('disabled').removeClass('hoverRating1').removeClass('hoverRating2').removeClass('hoverRating3').removeClass('hoverRating4').removeClass('hoverRating5');
}

/* ---------------------------------------- /includes/jsbin/analytics.js ---------------------------------------- */

/* BEGIN: Search Tracking
/*-----------------------------*/
function searchTracking(cat, site) {
    var url = window.location.toString();
    var urlArray = url.split('?q=');
    var search = urlArray[1];

    var tracking = '/' + site + '/search/save-search-term.aspx?q=' + search + '&cat=' + cat;
    $.ajax({
        type: "GET",
        url: tracking,
        dataType: "script"
    });
}
/* ---------------------------------------- /includes/scripts/masonry.pkgd.min.js ---------------------------------------- */
/*!
 * Masonry PACKAGED v3.1.3
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

(function(t){function e(){}function i(t){function i(e){e.prototype.option||(e.prototype.option=function(e){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))})}function o(e,i){t.fn[e]=function(o){if("string"==typeof o){for(var s=n.call(arguments,1),a=0,h=this.length;h>a;a++){var p=this[a],u=t.data(p,e);if(u)if(t.isFunction(u[o])&&"_"!==o.charAt(0)){var f=u[o].apply(u,s);if(void 0!==f)return f}else r("no such method '"+o+"' for "+e+" instance");else r("cannot call methods on "+e+" prior to initialization; "+"attempted to call '"+o+"'")}return this}return this.each(function(){var n=t.data(this,e);n?(n.option(o),n._init()):(n=new i(this,o),t.data(this,e,n))})}}if(t){var r="undefined"==typeof console?e:function(t){console.error(t)};return t.bridget=function(t,e){i(e),o(t,e)},t.bridget}}var n=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],i):i(t.jQuery)})(window),function(t){var e=document.documentElement,i=function(){};e.addEventListener?i=function(t,e,i){t.addEventListener(e,i,!1)}:e.attachEvent&&(i=function(e,i,n){e[i+n]=n.handleEvent?function(){var e=t.event;e.target=e.target||e.srcElement,n.handleEvent.call(n,e)}:function(){var i=t.event;i.target=i.target||i.srcElement,n.call(e,i)},e.attachEvent("on"+i,e[i+n])});var n=function(){};e.removeEventListener?n=function(t,e,i){t.removeEventListener(e,i,!1)}:e.detachEvent&&(n=function(t,e,i){t.detachEvent("on"+e,t[e+i]);try{delete t[e+i]}catch(n){t[e+i]=void 0}});var o={bind:i,unbind:n};"function"==typeof define&&define.amd?define("eventie/eventie",o):t.eventie=o}(this),function(t){function e(t){"function"==typeof t&&(e.isReady?t():r.push(t))}function i(t){var i="readystatechange"===t.type&&"complete"!==o.readyState;if(!e.isReady&&!i){e.isReady=!0;for(var n=0,s=r.length;s>n;n++){var a=r[n];a()}}}function n(n){return n.bind(o,"DOMContentLoaded",i),n.bind(o,"readystatechange",i),n.bind(t,"load",i),e}var o=t.document,r=[];e.isReady=!1,"function"==typeof define&&define.amd?(e.isReady="function"==typeof requirejs,define("doc-ready/doc-ready",["eventie/eventie"],n)):t.docReady=n(t.eventie)}(this),function(){function t(){}function e(t,e){for(var i=t.length;i--;)if(t[i].listener===e)return i;return-1}function i(t){return function(){return this[t].apply(this,arguments)}}var n=t.prototype;n.getListeners=function(t){var e,i,n=this._getEvents();if("object"==typeof t){e={};for(i in n)n.hasOwnProperty(i)&&t.test(i)&&(e[i]=n[i])}else e=n[t]||(n[t]=[]);return e},n.flattenListeners=function(t){var e,i=[];for(e=0;t.length>e;e+=1)i.push(t[e].listener);return i},n.getListenersAsObject=function(t){var e,i=this.getListeners(t);return i instanceof Array&&(e={},e[t]=i),e||i},n.addListener=function(t,i){var n,o=this.getListenersAsObject(t),r="object"==typeof i;for(n in o)o.hasOwnProperty(n)&&-1===e(o[n],i)&&o[n].push(r?i:{listener:i,once:!1});return this},n.on=i("addListener"),n.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},n.once=i("addOnceListener"),n.defineEvent=function(t){return this.getListeners(t),this},n.defineEvents=function(t){for(var e=0;t.length>e;e+=1)this.defineEvent(t[e]);return this},n.removeListener=function(t,i){var n,o,r=this.getListenersAsObject(t);for(o in r)r.hasOwnProperty(o)&&(n=e(r[o],i),-1!==n&&r[o].splice(n,1));return this},n.off=i("removeListener"),n.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},n.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},n.manipulateListeners=function(t,e,i){var n,o,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(n=i.length;n--;)r.call(this,e,i[n]);else for(n in e)e.hasOwnProperty(n)&&(o=e[n])&&("function"==typeof o?r.call(this,n,o):s.call(this,n,o));return this},n.removeEvent=function(t){var e,i=typeof t,n=this._getEvents();if("string"===i)delete n[t];else if("object"===i)for(e in n)n.hasOwnProperty(e)&&t.test(e)&&delete n[e];else delete this._events;return this},n.removeAllListeners=i("removeEvent"),n.emitEvent=function(t,e){var i,n,o,r,s=this.getListenersAsObject(t);for(o in s)if(s.hasOwnProperty(o))for(n=s[o].length;n--;)i=s[o][n],i.once===!0&&this.removeListener(t,i.listener),r=i.listener.apply(this,e||[]),r===this._getOnceReturnValue()&&this.removeListener(t,i.listener);return this},n.trigger=i("emitEvent"),n.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},n.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},n._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},n._getEvents=function(){return this._events||(this._events={})},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return t}):"object"==typeof module&&module.exports?module.exports=t:this.EventEmitter=t}.call(this),function(t){function e(t){if(t){if("string"==typeof n[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,o=0,r=i.length;r>o;o++)if(e=i[o]+t,"string"==typeof n[e])return e}}var i="Webkit Moz ms Ms O".split(" "),n=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return e}):t.getStyleProperty=e}(window),function(t){function e(t){var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);return i&&e}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=a.length;i>e;e++){var n=a[e];t[n]=0}return t}function n(t){function n(t){if("string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var n=s(t);if("none"===n.display)return i();var r={};r.width=t.offsetWidth,r.height=t.offsetHeight;for(var u=r.isBorderBox=!(!p||!n[p]||"border-box"!==n[p]),f=0,d=a.length;d>f;f++){var l=a[f],c=n[l];c=o(t,c);var m=parseFloat(c);r[l]=isNaN(m)?0:m}var y=r.paddingLeft+r.paddingRight,g=r.paddingTop+r.paddingBottom,v=r.marginLeft+r.marginRight,_=r.marginTop+r.marginBottom,b=r.borderLeftWidth+r.borderRightWidth,E=r.borderTopWidth+r.borderBottomWidth,L=u&&h,z=e(n.width);z!==!1&&(r.width=z+(L?0:y+b));var S=e(n.height);return S!==!1&&(r.height=S+(L?0:g+E)),r.innerWidth=r.width-(y+b),r.innerHeight=r.height-(g+E),r.outerWidth=r.width+v,r.outerHeight=r.height+_,r}}function o(t,e){if(r||-1===e.indexOf("%"))return e;var i=t.style,n=i.left,o=t.runtimeStyle,s=o&&o.left;return s&&(o.left=t.currentStyle.left),i.left=e,e=i.pixelLeft,i.left=n,s&&(o.left=s),e}var h,p=t("boxSizing");return function(){if(p){var t=document.createElement("div");t.style.width="200px",t.style.padding="1px 2px 3px 4px",t.style.borderStyle="solid",t.style.borderWidth="1px 2px 3px 4px",t.style[p]="border-box";var i=document.body||document.documentElement;i.appendChild(t);var n=s(t);h=200===e(n.width),i.removeChild(t)}}(),n}var o=document.defaultView,r=o&&o.getComputedStyle,s=r?function(t){return o.getComputedStyle(t,null)}:function(t){return t.currentStyle},a=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],n):t.getSize=n(t.getStyleProperty)}(window),function(t,e){function i(t,e){return t[a](e)}function n(t){if(!t.parentNode){var e=document.createDocumentFragment();e.appendChild(t)}}function o(t,e){n(t);for(var i=t.parentNode.querySelectorAll(e),o=0,r=i.length;r>o;o++)if(i[o]===t)return!0;return!1}function r(t,e){return n(t),i(t,e)}var s,a=function(){if(e.matchesSelector)return"matchesSelector";for(var t=["webkit","moz","ms","o"],i=0,n=t.length;n>i;i++){var o=t[i],r=o+"MatchesSelector";if(e[r])return r}}();if(a){var h=document.createElement("div"),p=i(h,"div");s=p?i:r}else s=o;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return s}):window.matchesSelector=s}(this,Element.prototype),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){for(var e in t)return!1;return e=null,!0}function n(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function o(t,o,r){function a(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}var h=r("transition"),p=r("transform"),u=h&&p,f=!!r("perspective"),d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[h],l=["transform","transition","transitionDuration","transitionProperty"],c=function(){for(var t={},e=0,i=l.length;i>e;e++){var n=l[e],o=r(n);o&&o!==n&&(t[n]=o)}return t}();e(a.prototype,t.prototype),a.prototype._create=function(){this._transition={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},a.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},a.prototype.getSize=function(){this.size=o(this.element)},a.prototype.css=function(t){var e=this.element.style;for(var i in t){var n=c[i]||i;e[n]=t[i]}},a.prototype.getPosition=function(){var t=s(this.element),e=this.layout.options,i=e.isOriginLeft,n=e.isOriginTop,o=parseInt(t[i?"left":"right"],10),r=parseInt(t[n?"top":"bottom"],10);o=isNaN(o)?0:o,r=isNaN(r)?0:r;var a=this.layout.size;o-=i?a.paddingLeft:a.paddingRight,r-=n?a.paddingTop:a.paddingBottom,this.position.x=o,this.position.y=r},a.prototype.layoutPosition=function(){var t=this.layout.size,e=this.layout.options,i={};e.isOriginLeft?(i.left=this.position.x+t.paddingLeft+"px",i.right=""):(i.right=this.position.x+t.paddingRight+"px",i.left=""),e.isOriginTop?(i.top=this.position.y+t.paddingTop+"px",i.bottom=""):(i.bottom=this.position.y+t.paddingBottom+"px",i.top=""),this.css(i),this.emitEvent("layout",[this])};var m=f?function(t,e){return"translate3d("+t+"px, "+e+"px, 0)"}:function(t,e){return"translate("+t+"px, "+e+"px)"};a.prototype._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return this.layoutPosition(),void 0;var a=t-i,h=e-n,p={},u=this.layout.options;a=u.isOriginLeft?a:-a,h=u.isOriginTop?h:-h,p.transform=m(a,h),this.transition({to:p,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},a.prototype.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},a.prototype.moveTo=u?a.prototype._transitionTo:a.prototype.goTo,a.prototype.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},a.prototype._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},a.prototype._transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return this._nonTransition(t),void 0;var e=this._transition;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var y=p&&n(p)+",opacity";a.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:y,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(d,this,!1))},a.prototype.transition=a.prototype[h?"_transition":"_nonTransition"],a.prototype.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},a.prototype.onotransitionend=function(t){this.ontransitionend(t)};var g={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};a.prototype.ontransitionend=function(t){if(t.target===this.element){var e=this._transition,n=g[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},a.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(d,this,!1),this.isTransitioning=!1},a.prototype._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var v={transitionProperty:"",transitionDuration:""};return a.prototype.removeTransitionStyles=function(){this.css(v)},a.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},a.prototype.remove=function(){if(!h||!parseFloat(this.layout.options.transitionDuration))return this.removeElem(),void 0;var t=this;this.on("transitionEnd",function(){return t.removeElem(),!0}),this.hide()},a.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options;this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0})},a.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options;this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:{opacity:function(){this.isHidden&&this.css({display:"none"})}}})},a.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},a}var r=document.defaultView,s=r&&r.getComputedStyle?function(t){return r.getComputedStyle(t,null)}:function(t){return t.currentStyle};"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],o):(t.Outlayer={},t.Outlayer.Item=o(t.EventEmitter,t.getSize,t.getStyleProperty))}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){return"[object Array]"===f.call(t)}function n(t){var e=[];if(i(t))e=t;else if(t&&"number"==typeof t.length)for(var n=0,o=t.length;o>n;n++)e.push(t[n]);else e.push(t);return e}function o(t,e){var i=l(e,t);-1!==i&&e.splice(i,1)}function r(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()}function s(i,s,f,l,c,m){function y(t,i){if("string"==typeof t&&(t=a.querySelector(t)),!t||!d(t))return h&&h.error("Bad "+this.settings.namespace+" element: "+t),void 0;this.element=t,this.options=e({},this.options),this.option(i);var n=++v;this.element.outlayerGUID=n,_[n]=this,this._create(),this.options.isInitLayout&&this.layout()}function g(t,i){t.prototype[i]=e({},y.prototype[i])}var v=0,_={};return y.prototype.settings={namespace:"outlayer",item:m},y.prototype.options={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e(y.prototype,f.prototype),y.prototype.option=function(t){e(this.options,t)},y.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},y.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},y.prototype._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.settings.item,n=[],o=0,r=e.length;r>o;o++){var s=e[o],a=new i(s,this);n.push(a)}return n},y.prototype._filterFindItemElements=function(t){t=n(t);for(var e=this.options.itemSelector,i=[],o=0,r=t.length;r>o;o++){var s=t[o];if(d(s))if(e){c(s,e)&&i.push(s);for(var a=s.querySelectorAll(e),h=0,p=a.length;p>h;h++)i.push(a[h])}else i.push(s)}return i},y.prototype.getItemElements=function(){for(var t=[],e=0,i=this.items.length;i>e;e++)t.push(this.items[e].element);return t},y.prototype.layout=function(){this._resetLayout(),this._manageStamps();var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,t),this._isLayoutInited=!0},y.prototype._init=y.prototype.layout,y.prototype._resetLayout=function(){this.getSize()},y.prototype.getSize=function(){this.size=l(this.element)},y.prototype._getMeasurement=function(t,e){var i,n=this.options[t];n?("string"==typeof n?i=this.element.querySelector(n):d(n)&&(i=n),this[t]=i?l(i)[e]:n):this[t]=0},y.prototype.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},y.prototype._getItemsForLayout=function(t){for(var e=[],i=0,n=t.length;n>i;i++){var o=t[i];o.isIgnored||e.push(o)}return e},y.prototype._layoutItems=function(t,e){if(!t||!t.length)return this.emitEvent("layoutComplete",[this,t]),void 0;this._itemsOn(t,"layout",function(){this.emitEvent("layoutComplete",[this,t])});for(var i=[],n=0,o=t.length;o>n;n++){var r=t[n],s=this._getItemLayoutPosition(r);s.item=r,s.isInstant=e,i.push(s)}this._processLayoutQueue(i)},y.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},y.prototype._processLayoutQueue=function(t){for(var e=0,i=t.length;i>e;e++){var n=t[e];this._positionItem(n.item,n.x,n.y,n.isInstant)}},y.prototype._positionItem=function(t,e,i,n){n?t.goTo(e,i):t.moveTo(e,i)},y.prototype._postLayout=function(){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))},y.prototype._getContainerSize=u,y.prototype._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},y.prototype._itemsOn=function(t,e,i){function n(){return o++,o===r&&i.call(s),!0}for(var o=0,r=t.length,s=this,a=0,h=t.length;h>a;a++){var p=t[a];p.on(e,n)}},y.prototype.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},y.prototype.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},y.prototype.stamp=function(t){if(t=this._find(t)){this.stamps=this.stamps.concat(t);for(var e=0,i=t.length;i>e;e++){var n=t[e];this.ignore(n)}}},y.prototype.unstamp=function(t){if(t=this._find(t))for(var e=0,i=t.length;i>e;e++){var n=t[e];o(n,this.stamps),this.unignore(n)}},y.prototype._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n(t)):void 0},y.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var t=0,e=this.stamps.length;e>t;t++){var i=this.stamps[t];this._manageStamp(i)}}},y.prototype._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},y.prototype._manageStamp=u,y.prototype._getElementOffset=function(t){var e=t.getBoundingClientRect(),i=this._boundingRect,n=l(t),o={left:e.left-i.left-n.marginLeft,top:e.top-i.top-n.marginTop,right:i.right-e.right-n.marginRight,bottom:i.bottom-e.bottom-n.marginBottom};return o},y.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},y.prototype.bindResize=function(){this.isResizeBound||(i.bind(t,"resize",this),this.isResizeBound=!0)},y.prototype.unbindResize=function(){i.unbind(t,"resize",this),this.isResizeBound=!1},y.prototype.onresize=function(){function t(){e.resize(),delete e.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var e=this;this.resizeTimeout=setTimeout(t,100)},y.prototype.resize=function(){var t=l(this.element),e=this.size&&t;e&&t.innerWidth===this.size.innerWidth||this.layout()},y.prototype.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},y.prototype.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},y.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},y.prototype.reveal=function(t){if(t&&t.length)for(var e=0,i=t.length;i>e;e++){var n=t[e];n.reveal()}},y.prototype.hide=function(t){if(t&&t.length)for(var e=0,i=t.length;i>e;e++){var n=t[e];n.hide()}},y.prototype.getItem=function(t){for(var e=0,i=this.items.length;i>e;e++){var n=this.items[e];if(n.element===t)return n}},y.prototype.getItems=function(t){if(t&&t.length){for(var e=[],i=0,n=t.length;n>i;i++){var o=t[i],r=this.getItem(o);r&&e.push(r)}return e}},y.prototype.remove=function(t){t=n(t);var e=this.getItems(t);if(e&&e.length){this._itemsOn(e,"remove",function(){this.emitEvent("removeComplete",[this,e])});for(var i=0,r=e.length;r>i;i++){var s=e[i];s.remove(),o(s,this.items)}}},y.prototype.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="";for(var e=0,i=this.items.length;i>e;e++){var n=this.items[e];n.destroy()}this.unbindResize(),delete this.element.outlayerGUID,p&&p.removeData(this.element,this.settings.namespace)},y.data=function(t){var e=t&&t.outlayerGUID;return e&&_[e]},y.create=function(t,i){function n(){y.apply(this,arguments)}return e(n.prototype,y.prototype),g(n,"options"),g(n,"settings"),e(n.prototype.options,i),n.prototype.settings.namespace=t,n.data=y.data,n.Item=function(){m.apply(this,arguments)},n.Item.prototype=new m,n.prototype.settings.item=n.Item,s(function(){for(var e=r(t),i=a.querySelectorAll(".js-"+e),o="data-"+e+"-options",s=0,u=i.length;u>s;s++){var f,d=i[s],l=d.getAttribute(o);try{f=l&&JSON.parse(l)}catch(c){h&&h.error("Error parsing "+o+" on "+d.nodeName.toLowerCase()+(d.id?"#"+d.id:"")+": "+c);continue}var m=new n(d,f);p&&p.data(d,t,m)}}),p&&p.bridget&&p.bridget(t,n),n},y.Item=m,y}var a=t.document,h=t.console,p=t.jQuery,u=function(){},f=Object.prototype.toString,d="object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName},l=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,n=t.length;n>i;i++)if(t[i]===e)return i;return-1};"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],s):t.Outlayer=s(t.eventie,t.docReady,t.EventEmitter,t.getSize,t.matchesSelector,t.Outlayer.Item)}(window),function(t){function e(t,e){var n=t.create("masonry");return n.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var t=this.cols;for(this.colYs=[];t--;)this.colYs.push(0);this.maxY=0},n.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}this.columnWidth+=this.gutter,this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)},n.prototype.getContainerWidth=function(){var t=this.options.isFitWidth?this.element.parentNode:this.element,i=e(t);this.containerWidth=i&&i.innerWidth},n.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,n=e&&1>e?"round":"ceil",o=Math[n](t.size.outerWidth/this.columnWidth);o=Math.min(o,this.cols);for(var r=this._getColGroup(o),s=Math.min.apply(Math,r),a=i(r,s),h={x:this.columnWidth*a,y:s},p=s+t.size.outerHeight,u=this.cols+1-r.length,f=0;u>f;f++)this.colYs[a+f]=p;return h},n.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++){var o=this.colYs.slice(n,n+t);e[n]=Math.max.apply(Math,o)}return e},n.prototype._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this.options.isOriginLeft?n.left:n.right,r=o+i.outerWidth,s=Math.floor(o/this.columnWidth);s=Math.max(0,s);var a=Math.floor(r/this.columnWidth);a=Math.min(this.cols-1,a);for(var h=(this.options.isOriginTop?n.top:n.bottom)+i.outerHeight,p=s;a>=p;p++)this.colYs[p]=Math.max(h,this.colYs[p])},n.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this.options.isFitWidth&&(t.width=this._getContainerFitWidth()),t},n.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},n.prototype.resize=function(){var t=this.containerWidth;this.getContainerWidth(),t!==this.containerWidth&&this.layout()},n}var i=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,n=t.length;n>i;i++){var o=t[i];if(o===e)return i}return-1};"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):t.Masonry=e(t.Outlayer,t.getSize)}(window);
/* ---------------------------------------- /includes/scripts/jquery.carouFredSel-6.0.4-packed.js ---------------------------------------- */
/*
 *	jQuery carouFredSel 6.0.4
 *	Demo's and documentation:
 *	caroufredsel.frebsite.nl
 *
 *	Copyright (c) 2012 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(C($){8($.1r.1v){G}$.1r.6p=$.1r.1v=C(u,w){8(1k.S==0){18(I,\'6q 54 7P 1j "\'+1k.4l+\'".\');G 1k}8(1k.S>1){G 1k.1W(C(){$(1k).1v(u,w)})}E y=1k,$13=1k[0],55=K;8(y.1m(\'56\')){55=y.1Q(\'3o\',\'4m\');y.R(\'3o\',[\'4n\',I])}y.57=C(o,a,b){o=3R($13,o);o.D=6r($13,o.D);o.1M=6s($13,o.1M);o.M=6t($13,o.M);o.V=59($13,o.V);o.Y=59($13,o.Y);o.1a=6u($13,o.1a);o.1q=6v($13,o.1q);o.1h=6w($13,o.1h);8(a){31=$.1N(I,{},$.1r.1v.5a,o)}7=$.1N(I,{},$.1r.1v.5a,o);7.d=6x(7);z.2b=(7.2b==\'4o\'||7.2b==\'1n\')?\'Y\':\'V\';E c=y.14(),2w=5b($1s,7,\'N\');8(3p(7.25)){7.25=\'7Q\'+F.3S}7.4p=5c(7,2w);7.D=6y(7.D,7,c,b);7[7.d[\'N\']]=6z(7[7.d[\'N\']],7,c);7[7.d[\'1d\']]=6A(7[7.d[\'1d\']],7,c);8(7.2m){8(!3T(7[7.d[\'N\']])){7[7.d[\'N\']]=\'2J%\'}}8(3T(7[7.d[\'N\']])){z.6B=I;z.4q=7[7.d[\'N\']];7[7.d[\'N\']]=4r(2w,z.4q);8(!7.D.L){7.D.T.1c=I}}8(7.2m){7.1R=K;7.1i=[0,0,0,0];7.1A=K;7.D.T.1c=K}O{8(!7.D.L){7=6C(7,2w)}8(!7[7.d[\'N\']]){8(!7.D.T.1c&&Z(7.D[7.d[\'N\']])&&7.D.1t==\'*\'){7[7.d[\'N\']]=7.D.L*7.D[7.d[\'N\']];7.1A=K}O{7[7.d[\'N\']]=\'1c\'}}8(1G(7.1A)){7.1A=(Z(7[7.d[\'N\']]))?\'5d\':K}8(7.D.T.1c){7.D.L=32(c,7,0)}}8(7.D.1t!=\'*\'&&!7.D.T.1c){7.D.T.4s=7.D.L;7.D.L=3U(c,7,0)}7.D.L=2x(7.D.L,7,7.D.T.2c,$13);7.D.T.1Z=7.D.L;8(7.2m){8(!7.D.T.34){7.D.T.34=7.D.L}8(!7.D.T.1X){7.D.T.1X=7.D.L}7=5e(7,c,2w)}O{7.1i=6D(7.1i);8(7.1A==\'3q\'){7.1A=\'1n\'}O 8(7.1A==\'5f\'){7.1A=\'35\'}1B(7.1A){Q\'5d\':Q\'1n\':Q\'35\':8(7[7.d[\'N\']]!=\'1c\'){7=5g(7,c);7.1R=I}16;2y:7.1A=K;7.1R=(7.1i[0]==0&&7.1i[1]==0&&7.1i[2]==0&&7.1i[3]==0)?K:I;16}}8(!Z(7.1M.1C)){7.1M.1C=6E}8(1G(7.1M.D)){7.1M.D=(7.2m||7.D.T.1c||7.D.1t!=\'*\')?\'L\':7.D.L}7.M=$.1N(I,{},7.1M,7.M);7.V=$.1N(I,{},7.1M,7.V);7.Y=$.1N(I,{},7.1M,7.Y);7.1a=$.1N(I,{},7.1M,7.1a);7.M=6F($13,7.M);7.V=5h($13,7.V);7.Y=5h($13,7.Y);7.1a=6G($13,7.1a);7.1q=6H($13,7.1q);7.1h=6I($13,7.1h);8(7.2n){7.2n=5i(7.2n)}8(7.M.5j){7.M.4t=7.M.5j;2K(\'M.5j\',\'M.4t\')}8(7.M.5k){7.M.4u=7.M.5k;2K(\'M.5k\',\'M.4u\')}8(7.M.5l){7.M.4v=7.M.5l;2K(\'M.5l\',\'M.4v\')}8(7.M.5m){7.M.2L=7.M.5m;2K(\'M.5m\',\'M.2L\')}};y.6J=C(){y.1m(\'56\',I);E a=y.14(),3V=5n(y,[\'6K\',\'6L\',\'3W\',\'3q\',\'35\',\'5f\',\'1n\',\'3X\',\'N\',\'1d\',\'6M\',\'1S\',\'5o\',\'6N\']),5p=\'7R\';1B(3V.3W){Q\'6O\':Q\'7S\':5p=3V.3W;16}$1s.X(3V).X({\'7T\':\'3r\',\'3W\':5p});y.1m(\'5q\',3V).X({\'6K\':\'1n\',\'6L\':\'3Y\',\'3W\':\'6O\',\'3q\':0,\'35\':\'M\',\'5f\':\'M\',\'1n\':0,\'6M\':0,\'1S\':0,\'5o\':0,\'6N\':0});4w(a,7);5r(a,7);8(7.2m){5s(7,a)}};y.6P=C(){y.5t();y.12(H(\'5u\',F),C(e,a){e.1f();8(!z.2d){8(7.M.W){7.M.W.36(2z(\'4x\',F))}}z.2d=I;8(7.M.1H){7.M.1H=K;y.R(H(\'3a\',F),a)}G I});y.12(H(\'5v\',F),C(e){e.1f();8(z.20){3Z(U)}G I});y.12(H(\'3a\',F),C(e,a,b){e.1f();1u=3s(1u);8(a&&z.20){U.2d=I;E c=2o()-U.2M;U.1C-=c;8(U.3t){U.3t.1C-=c}8(U.3u){U.3u.1C-=c}3Z(U,K)}8(!z.26&&!z.20){8(b){1u.3v+=2o()-1u.2M}}8(!z.26){8(7.M.W){7.M.W.36(2z(\'6Q\',F))}}z.26=I;8(7.M.4u){E d=7.M.2L-1u.3v,3b=2J-1I.2A(d*2J/7.M.2L);7.M.4u.1g($13,3b,d)}G I});y.12(H(\'1H\',F),C(e,b,c,d){e.1f();1u=3s(1u);E v=[b,c,d],t=[\'2N\',\'27\',\'3c\'],a=3d(v,t);b=a[0];c=a[1];d=a[2];8(b!=\'V\'&&b!=\'Y\'){b=z.2b}8(!Z(c)){c=0}8(!1l(d)){d=K}8(d){z.2d=K;7.M.1H=I}8(!7.M.1H){e.2e();G 18(F,\'3w 4x: 2p 3e.\')}8(z.26){8(7.M.W){7.M.W.2O(2z(\'4x\',F));7.M.W.2O(2z(\'6Q\',F))}}z.26=K;1u.2M=2o();E f=7.M.2L+c;41=f-1u.3v;3b=2J-1I.2A(41*2J/f);8(7.M.1e){1u.1e=7U(C(){E a=2o()-1u.2M+1u.3v,3b=1I.2A(a*2J/f);7.M.1e.4y.1g(7.M.1e.2q[0],3b)},7.M.1e.5w)}1u.M=7V(C(){8(7.M.1e){7.M.1e.4y.1g(7.M.1e.2q[0],2J)}8(7.M.4v){7.M.4v.1g($13,3b,41)}8(z.20){y.R(H(\'1H\',F),b)}O{y.R(H(b,F),7.M)}},41);8(7.M.4t){7.M.4t.1g($13,3b,41)}G I});y.12(H(\'3f\',F),C(e){e.1f();8(U.2d){U.2d=K;z.26=K;z.20=I;U.2M=2o();2P(U)}O{y.R(H(\'1H\',F))}G I});y.12(H(\'V\',F)+\' \'+H(\'Y\',F),C(e,b,f,g,h){e.1f();8(z.2d||y.2f(\':3r\')){e.2e();G 18(F,\'3w 4x 7W 3r: 2p 3e.\')}E i=(Z(7.D.4z))?7.D.4z:7.D.L+1;8(i>J.P){e.2e();G 18(F,\'2p 6R D (\'+J.P+\' P, \'+i+\' 6S): 2p 3e.\')}E v=[b,f,g,h],t=[\'2g\',\'27/2N\',\'C\',\'3c\'],a=3d(v,t);b=a[0];f=a[1];g=a[2];h=a[3];E k=e.5x.17(F.3x.42.S);8(!1D(b)){b={}}8(1o(g)){b.3g=g}8(1l(h)){b.3y=h}b=$.1N(I,{},7[k],b);8(b.5y&&!b.5y.1g($13,k)){e.2e();G 18(F,\'7X "5y" 7Y K.\')}8(!Z(f)){8(7.D.1t!=\'*\'){f=\'L\'}O{E m=[f,b.D,7[k].D];1j(E a=0,l=m.S;a<l;a++){8(Z(m[a])||m[a]==\'6T\'||m[a]==\'L\'){f=m[a];16}}}1B(f){Q\'6T\':e.2e();G y.1Q(H(k+\'7Z\',F),[b,g]);16;Q\'L\':8(!7.D.T.1c&&7.D.1t==\'*\'){f=7.D.L}16}}8(U.2d){y.R(H(\'3f\',F));y.R(H(\'3y\',F),[k,[b,f,g]]);e.2e();G 18(F,\'3w 80 3e.\')}8(b.1C>0){8(z.20){8(b.3y){y.R(H(\'3y\',F),[k,[b,f,g]])}e.2e();G 18(F,\'3w 81 3e.\')}}1u.3v=0;y.R(H(\'6U\'+k,F),[b,f]);8(7.2n){E s=7.2n,c=[b,f];1j(E j=0,l=s.S;j<l;j++){E d=k;8(!s[j][2]){d=(d==\'V\')?\'Y\':\'V\'}8(!s[j][1]){c[0]=s[j][0].1Q(\'3o\',[\'4A\',d])}c[1]=f+s[j][3];s[j][0].R(\'3o\',[\'6U\'+d,c])}}G I});y.12(H(\'82\',F),C(e,b,c){e.1f();E d=y.14();8(!7.1T){8(J.11==0){8(7.3z){y.R(H(\'Y\',F),J.P-1)}G e.2e()}}1U(d,7);8(!Z(c)){8(7.D.T.1c){c=4B(d,7,J.P-1)}O 8(7.D.1t!=\'*\'){E f=(Z(b.D))?b.D:5z(y,7);c=6V(d,7,J.P-1,f)}O{c=7.D.L}c=4C(c,7,b.D,$13)}8(!7.1T){8(J.P-c<J.11){c=J.P-J.11}}7.D.T.1Z=7.D.L;8(7.D.T.1c){E g=2x(32(d,7,J.P-c),7,7.D.T.2c,$13);8(7.D.L+c<=g&&c<J.P){c++;g=2x(32(d,7,J.P-c),7,7.D.T.2c,$13)}7.D.L=g}O 8(7.D.1t!=\'*\'){E g=3U(d,7,J.P-c);7.D.L=2x(g,7,7.D.T.2c,$13)}1U(d,7,I);8(c==0){e.2e();G 18(F,\'0 D 4D 1M: 2p 3e.\')}18(F,\'6W \'+c+\' D 5A.\');J.11+=c;2h(J.11>=J.P){J.11-=J.P}8(!7.1T){8(J.11==0&&b.4E){b.4E.1g($13,\'V\')}8(!7.3z){3A(7,J.11,F)}}y.14().17(J.P-c,J.P).83(y);8(J.P<7.D.L+c){y.14().17(0,(7.D.L+c)-J.P).4F(I).43(y)}E d=y.14(),3h=6X(d,7,c),2i=6Y(d,7),1Y=d.1O(c-1),21=3h.3i(),2r=2i.3i();1U(d,7);E h=0,2B=0;8(7.1A){E p=4G(2i,7);h=p[0];2B=p[1]}E i=(h<0)?7.1i[7.d[3]]:0;E j=K,2Q=$();8(7.D.L<c){2Q=d.17(7.D.T.1Z,c);8(b.1V==\'6Z\'){E k=7.D[7.d[\'N\']];j=2Q;1Y=2r;5B(j);7.D[7.d[\'N\']]=\'1c\'}}E l=K,3B=2R(d.17(0,c),7,\'N\'),2j=4H(4I(2i,7,I),7,!7.1R),3C=0,28={},4J={},2s={},2S={},4K={},2T={},5C={},2U=5D(b,7,c,3B);1B(b.1V){Q\'1J\':Q\'1J-1w\':3C=2R(d.17(0,7.D.L),7,\'N\');16}8(j){7.D[7.d[\'N\']]=k}1U(d,7,I);8(2B>=0){1U(21,7,7.1i[7.d[1]])}8(h>=0){1U(1Y,7,7.1i[7.d[3]])}8(7.1A){7.1i[7.d[1]]=2B;7.1i[7.d[3]]=h}2T[7.d[\'1n\']]=-(3B-i);5C[7.d[\'1n\']]=-(3C-i);4J[7.d[\'1n\']]=2j[7.d[\'N\']];E m=C(){},1P=C(){},1E=C(){},3D=C(){},2C=C(){},5E=C(){},1F=C(){},3E=C(){},1x=C(){},1y=C(){},1K=C(){};1B(b.1V){Q\'3j\':Q\'1J\':Q\'1J-1w\':Q\'22\':Q\'22-1w\':l=y.4F(I).43($1s);16}1B(b.1V){Q\'3j\':Q\'22\':Q\'22-1w\':l.14().17(0,c).2t();l.14().17(7.D.T.1Z).2t();16;Q\'1J\':Q\'1J-1w\':l.14().17(7.D.L).2t();l.X(5C);16}y.X(2T);U=44(2U,b.2k);28[7.d[\'1n\']]=(7.1R)?7.1i[7.d[3]]:0;8(7[7.d[\'N\']]==\'1c\'||7[7.d[\'1d\']]==\'1c\'){m=C(){$1s.X(2j)};1P=C(){U.19.1b([$1s,2j])}}8(7.1R){8(2r.5F(1Y).S){2s[7.d[\'1S\']]=1Y.1m(\'29\');8(h<0){1Y.X(2s)}O{1F=C(){1Y.X(2s)};3E=C(){U.19.1b([1Y,2s])}}}1B(b.1V){Q\'1J\':Q\'1J-1w\':l.14().1O(c-1).X(2s);16}8(2r.5F(21).S){2S[7.d[\'1S\']]=21.1m(\'29\');1E=C(){21.X(2S)};3D=C(){U.19.1b([21,2S])}}8(2B>=0){4K[7.d[\'1S\']]=2r.1m(\'29\')+7.1i[7.d[1]];2C=C(){2r.X(4K)};5E=C(){U.19.1b([2r,4K])}}}1K=C(){y.X(28)};E n=7.D.L+c-J.P;1y=C(){8(n>0){y.14().17(J.P).2t();3h=$(y.14().17(J.P-(7.D.L-n)).3F().70(y.14().17(0,n).3F()))}5G(j);8(7.1R){E a=y.14().1O(7.D.L+c-1);a.X(7.d[\'1S\'],a.1m(\'29\'))}};E o=5H(3h,2Q,2i,c,\'V\',2U,2j);1x=C(){5I(y,l,b);z.20=K;2a.3g=45($13,b,\'3g\',o,2a);2D=5J(y,2D,F);8(!z.26){y.R(H(\'1H\',F))}};z.20=I;1u=3s(1u);2a.3G=45($13,b,\'3G\',o,2a);1B(b.1V){Q\'3Y\':y.X(28);m();1E();2C();1F();1K();1y();1x();16;Q\'1w\':U.19.1b([y,{\'1L\':0},C(){m();1E();2C();1F();1K();1y();U=44(2U,b.2k);U.19.1b([y,{\'1L\':1},1x]);2P(U)}]);16;Q\'3j\':y.X({\'1L\':0});U.19.1b([l,{\'1L\':0}]);U.19.1b([y,{\'1L\':1},1x]);1P();1E();2C();1F();1K();1y();16;Q\'1J\':U.19.1b([l,28,C(){1E();2C();1F();1K();1y();1x()}]);1P();16;Q\'1J-1w\':U.19.1b([y,{\'1L\':0}]);U.19.1b([l,28,C(){y.X({\'1L\':1});1E();2C();1F();1K();1y();1x()}]);1P();16;Q\'22\':U.19.1b([l,4J,1x]);1P();1E();2C();1F();1K();1y();16;Q\'22-1w\':y.X({\'1L\':0});U.19.1b([y,{\'1L\':1}]);U.19.1b([l,4J,1x]);1P();1E();2C();1F();1K();1y();16;2y:U.19.1b([y,28,C(){1y();1x()}]);1P();3D();5E();3E();16}2P(U);5K(7.25,y,F);y.R(H(\'3H\',F),[K,2j]);G I});y.12(H(\'84\',F),C(e,c,d){e.1f();E f=y.14();8(!7.1T){8(J.11==7.D.L){8(7.3z){y.R(H(\'V\',F),J.P-1)}G e.2e()}}1U(f,7);8(!Z(d)){8(7.D.1t!=\'*\'){E g=(Z(c.D))?c.D:5z(y,7);d=71(f,7,0,g)}O{d=7.D.L}d=4C(d,7,c.D,$13)}E h=(J.11==0)?J.P:J.11;8(!7.1T){8(7.D.T.1c){E i=32(f,7,d),g=4B(f,7,h-1)}O{E i=7.D.L,g=7.D.L}8(d+i>h){d=h-g}}7.D.T.1Z=7.D.L;8(7.D.T.1c){E i=2x(5L(f,7,d,h),7,7.D.T.2c,$13);2h(7.D.L-d>=i&&d<J.P){d++;i=2x(5L(f,7,d,h),7,7.D.T.2c,$13)}7.D.L=i}O 8(7.D.1t!=\'*\'){E i=3U(f,7,d);7.D.L=2x(i,7,7.D.T.2c,$13)}1U(f,7,I);8(d==0){e.2e();G 18(F,\'0 D 4D 1M: 2p 3e.\')}18(F,\'6W \'+d+\' D 72.\');J.11-=d;2h(J.11<0){J.11+=J.P}8(!7.1T){8(J.11==7.D.L&&c.4E){c.4E.1g($13,\'Y\')}8(!7.3z){3A(7,J.11,F)}}8(J.P<7.D.L+d){y.14().17(0,(7.D.L+d)-J.P).4F(I).43(y)}E f=y.14(),3h=73(f,7),2i=74(f,7,d),1Y=f.1O(d-1),21=3h.3i(),2r=2i.3i();1U(f,7);E j=0,2B=0;8(7.1A){E p=4G(2i,7);j=p[0];2B=p[1]}E k=K,2Q=$();8(7.D.T.1Z<d){2Q=f.17(7.D.T.1Z,d);8(c.1V==\'6Z\'){E l=7.D[7.d[\'N\']];k=2Q;1Y=21;5B(k);7.D[7.d[\'N\']]=\'1c\'}}E m=K,3B=2R(f.17(0,d),7,\'N\'),2j=4H(4I(2i,7,I),7,!7.1R),3C=0,28={},4L={},2s={},2S={},2T={},2U=5D(c,7,d,3B);1B(c.1V){Q\'22\':Q\'22-1w\':3C=2R(f.17(0,7.D.T.1Z),7,\'N\');16}8(k){7.D[7.d[\'N\']]=l}8(7.1A){8(7.1i[7.d[1]]<0){7.1i[7.d[1]]=0}}1U(f,7,I);1U(21,7,7.1i[7.d[1]]);8(7.1A){7.1i[7.d[1]]=2B;7.1i[7.d[3]]=j}2T[7.d[\'1n\']]=(7.1R)?7.1i[7.d[3]]:0;E n=C(){},1P=C(){},1E=C(){},3D=C(){},1F=C(){},3E=C(){},1x=C(){},1y=C(){},1K=C(){};1B(c.1V){Q\'3j\':Q\'1J\':Q\'1J-1w\':Q\'22\':Q\'22-1w\':m=y.4F(I).43($1s);m.14().17(7.D.T.1Z).2t();16}1B(c.1V){Q\'3j\':Q\'1J\':Q\'1J-1w\':y.X(\'3X\',1);m.X(\'3X\',0);16}U=44(2U,c.2k);28[7.d[\'1n\']]=-3B;4L[7.d[\'1n\']]=-3C;8(j<0){28[7.d[\'1n\']]+=j}8(7[7.d[\'N\']]==\'1c\'||7[7.d[\'1d\']]==\'1c\'){n=C(){$1s.X(2j)};1P=C(){U.19.1b([$1s,2j])}}8(7.1R){E o=2r.1m(\'29\');8(2B>=0){o+=7.1i[7.d[1]]}2r.X(7.d[\'1S\'],o);8(1Y.5F(21).S){2S[7.d[\'1S\']]=21.1m(\'29\')}1E=C(){21.X(2S)};3D=C(){U.19.1b([21,2S])};E q=1Y.1m(\'29\');8(j>0){q+=7.1i[7.d[3]]}2s[7.d[\'1S\']]=q;1F=C(){1Y.X(2s)};3E=C(){U.19.1b([1Y,2s])}}1K=C(){y.X(2T)};E r=7.D.L+d-J.P;1y=C(){8(r>0){y.14().17(J.P).2t()}E a=y.14().17(0,d).43(y).3i();8(r>0){2i=3I(f,7)}5G(k);8(7.1R){8(J.P<7.D.L+d){E b=y.14().1O(7.D.L-1);b.X(7.d[\'1S\'],b.1m(\'29\')+7.1i[7.d[3]])}a.X(7.d[\'1S\'],a.1m(\'29\'))}};E s=5H(3h,2Q,2i,d,\'Y\',2U,2j);1x=C(){y.X(\'3X\',y.1m(\'5q\').3X);5I(y,m,c);z.20=K;2a.3g=45($13,c,\'3g\',s,2a);2D=5J(y,2D,F);8(!z.26){y.R(H(\'1H\',F))}};z.20=I;1u=3s(1u);2a.3G=45($13,c,\'3G\',s,2a);1B(c.1V){Q\'3Y\':y.X(28);n();1E();1F();1K();1y();1x();16;Q\'1w\':U.19.1b([y,{\'1L\':0},C(){n();1E();1F();1K();1y();U=44(2U,c.2k);U.19.1b([y,{\'1L\':1},1x]);2P(U)}]);16;Q\'3j\':y.X({\'1L\':0});U.19.1b([m,{\'1L\':0}]);U.19.1b([y,{\'1L\':1},1x]);1P();1E();1F();1K();1y();16;Q\'1J\':y.X(7.d[\'1n\'],$1s[7.d[\'N\']]());U.19.1b([y,2T,1x]);1P();1E();1F();1y();16;Q\'1J-1w\':y.X(7.d[\'1n\'],$1s[7.d[\'N\']]());U.19.1b([m,{\'1L\':0}]);U.19.1b([y,2T,1x]);1P();1E();1F();1y();16;Q\'22\':U.19.1b([m,4L,1x]);1P();1E();1F();1K();1y();16;Q\'22-1w\':y.X({\'1L\':0});U.19.1b([y,{\'1L\':1}]);U.19.1b([m,4L,1x]);1P();1E();1F();1K();1y();16;2y:U.19.1b([y,28,C(){1K();1y();1x()}]);1P();3D();3E();16}2P(U);5K(7.25,y,F);y.R(H(\'3H\',F),[K,2j]);G I});y.12(H(\'3k\',F),C(e,b,c,d,f,g,h){e.1f();E v=[b,c,d,f,g,h],t=[\'2N/27/2g\',\'27\',\'3c\',\'2g\',\'2N\',\'C\'],a=3d(v,t);f=a[3];g=a[4];h=a[5];b=3J(a[0],a[1],a[2],J,y);8(b==0){G K}8(!1D(f)){f=K}8(z.20){8(!1D(f)||f.1C>0){G K}}8(g!=\'V\'&&g!=\'Y\'){8(7.1T){g=(b<=J.P/2)?\'Y\':\'V\'}O{g=(J.11==0||J.11>b)?\'Y\':\'V\'}}8(g==\'V\'){b=J.P-b}y.R(H(g,F),[f,b,h]);G I});y.12(H(\'85\',F),C(e,a,b){e.1f();E c=y.1Q(H(\'46\',F));G y.1Q(H(\'5M\',F),[c-1,a,\'V\',b])});y.12(H(\'86\',F),C(e,a,b){e.1f();E c=y.1Q(H(\'46\',F));G y.1Q(H(\'5M\',F),[c+1,a,\'Y\',b])});y.12(H(\'5M\',F),C(e,a,b,c,d){e.1f();8(!Z(a)){a=y.1Q(H(\'46\',F))}E f=7.1a.D||7.D.L,1X=1I.2A(J.P/f)-1;8(a<0){a=1X}8(a>1X){a=0}G y.1Q(H(\'3k\',F),[a*f,0,I,b,c,d])});y.12(H(\'75\',F),C(e,s){e.1f();8(s){s=3J(s,0,I,J,y)}O{s=0}s+=J.11;8(s!=0){8(D.P>0){2h(s>J.P){s-=J.P}}y.87(y.14().17(s,J.P))}G I});y.12(H(\'2n\',F),C(e,s){e.1f();8(s){s=5i(s)}O 8(7.2n){s=7.2n}O{G 18(F,\'6q 88 4D 2n.\')}E n=y.1Q(H(\'4m\',F)),x=I;1j(E j=0,l=s.S;j<l;j++){8(!s[j][0].1Q(H(\'3k\',F),[n,s[j][3],I])){x=K}}G x});y.12(H(\'3y\',F),C(e,a,b){e.1f();8(1o(a)){a.1g($13,2D)}O 8(2V(a)){2D=a}O 8(!1G(a)){2D.1b([a,b])}G 2D});y.12(H(\'89\',F),C(e,b,c,d,f){e.1f();E v=[b,c,d,f],t=[\'2N/2g\',\'2N/27/2g\',\'3c\',\'27\'],a=3d(v,t);b=a[0];c=a[1];d=a[2];f=a[3];8(1D(b)&&!2u(b)){b=$(b)}O 8(1p(b)){b=$(b)}8(!2u(b)||b.S==0){G 18(F,\'2p a 5N 2g.\')}8(1G(c)){c=\'4M\'}4w(b,7);5r(b,7);E g=c,47=\'47\';8(c==\'4M\'){8(d){8(J.11==0){c=J.P-1;47=\'76\'}O{c=J.11;J.11+=b.S}8(c<0){c=0}}O{c=J.P-1;47=\'76\'}}O{c=3J(c,f,d,J,y)}8(g!=\'4M\'&&!d){8(c<J.11){J.11+=b.S}}8(J.11>=J.P){J.11-=J.P}E h=y.14().1O(c);8(h.S){h[47](b)}O{y.77(b)}J.P=y.14().S;y.R(H(\'4N\',F));y.R(H(\'5O\',F));G I});y.12(H(\'78\',F),C(e,c,d,f){e.1f();E v=[c,d,f],t=[\'2N/27/2g\',\'3c\',\'27\'],a=3d(v,t);c=a[0];d=a[1];f=a[2];E g=K;8(c 2W $&&c.S>1){h=$();c.1W(C(i,a){E b=y.R(H(\'78\',F),[$(1k),d,f]);8(b)h=h.8a(b)});G h}8(1G(c)||c==\'4M\'){h=y.14().3i()}O{c=3J(c,f,d,J,y);E h=y.14().1O(c);8(h.S){8(c<J.11)J.11-=h.S}}8(h&&h.S){h.8b();J.P=y.14().S;y.R(H(\'4N\',F))}G h});y.12(H(\'3G\',F)+\' \'+H(\'3g\',F),C(e,a){e.1f();E b=e.5x.17(F.3x.42.S);8(2V(a)){2a[b]=a}8(1o(a)){2a[b].1b(a)}G 2a[b]});y.12(H(\'4m\',F),C(e,a){e.1f();8(J.11==0){E b=0}O{E b=J.P-J.11}8(1o(a)){a.1g($13,b)}G b});y.12(H(\'46\',F),C(e,a){e.1f();E b=7.1a.D||7.D.L,1X=1I.2A(J.P/b-1),2l;8(J.11==0){2l=0}O 8(J.11<J.P%b){2l=0}O 8(J.11==b&&!7.1T){2l=1X}O{2l=1I.79((J.P-J.11)/b)}8(2l<0){2l=0}8(2l>1X){2l=1X}8(1o(a)){a.1g($13,2l)}G 2l});y.12(H(\'8c\',F),C(e,a){e.1f();E b=3I(y.14(),7);8(1o(a)){a.1g($13,b)}G b});y.12(H(\'17\',F),C(e,f,l,b){e.1f();8(J.P==0){G K}E v=[f,l,b],t=[\'27\',\'27\',\'C\'],a=3d(v,t);f=(Z(a[0]))?a[0]:0;l=(Z(a[1]))?a[1]:J.P;b=a[2];f+=J.11;l+=J.11;8(D.P>0){2h(f>J.P){f-=J.P}2h(l>J.P){l-=J.P}2h(f<0){f+=J.P}2h(l<0){l+=J.P}}E c=y.14(),$i;8(l>f){$i=c.17(f,l)}O{$i=$(c.17(f,J.P).3F().70(c.17(0,l).3F()))}8(1o(b)){b.1g($13,$i)}G $i});y.12(H(\'26\',F)+\' \'+H(\'2d\',F)+\' \'+H(\'20\',F),C(e,a){e.1f();E b=e.5x.17(F.3x.42.S),5P=z[b];8(1o(a)){a.1g($13,5P)}G 5P});y.12(H(\'4A\',F),C(e,a,b,c){e.1f();E d=K;8(1o(a)){a.1g($13,7)}O 8(1D(a)){31=$.1N(I,{},31,a);8(b!==K)d=I;O 7=$.1N(I,{},7,a)}O 8(!1G(a)){8(1o(b)){E f=4O(\'7.\'+a);8(1G(f)){f=\'\'}b.1g($13,f)}O 8(!1G(b)){8(2X c!==\'3c\')c=I;4O(\'31.\'+a+\' = b\');8(c!==K)d=I;O 4O(\'7.\'+a+\' = b\')}O{G 4O(\'7.\'+a)}}8(d){1U(y.14(),7);y.57(31);y.5Q();E g=4P(y,7);y.R(H(\'3H\',F),[I,g])}G 7});y.12(H(\'5O\',F),C(e,a,b){e.1f();8(1G(a)){a=$(\'8d\')}O 8(1p(a)){a=$(a)}8(!2u(a)||a.S==0){G 18(F,\'2p a 5N 2g.\')}8(!1p(b)){b=\'a.6p\'}a.8e(b).1W(C(){E h=1k.7a||\'\';8(h.S>0&&y.14().7b($(h))!=-1){$(1k).23(\'5R\').5R(C(e){e.2E();y.R(H(\'3k\',F),h)})}});G I});y.12(H(\'3H\',F),C(e,b,c){e.1f();8(!7.1a.1z){G}E d=7.1a.D||7.D.L,4Q=1I.2A(J.P/d);8(b){8(7.1a.3K){7.1a.1z.14().2t();7.1a.1z.1W(C(){1j(E a=0;a<4Q;a++){E i=y.14().1O(3J(a*d,0,I,J,y));$(1k).77(7.1a.3K.1g(i[0],a+1))}})}7.1a.1z.1W(C(){$(1k).14().23(7.1a.3L).1W(C(a){$(1k).12(7.1a.3L,C(e){e.2E();y.R(H(\'3k\',F),[a*d,-7.1a.4R,I,7.1a])})})})}E f=y.1Q(H(\'46\',F))+7.1a.4R;8(f>=4Q){f=0}8(f<0){f=4Q-1}7.1a.1z.1W(C(){$(1k).14().2O(2z(\'7c\',F)).1O(f).36(2z(\'7c\',F))});G I});y.12(H(\'4N\',F),C(e){E a=7.D.L,2F=y.14(),2w=5b($1s,7,\'N\');J.P=2F.S;7.4p=5c(7,2w);8(z.4q){7[7.d[\'N\']]=4r(2w,z.4q)}8(7.2m){7.D.N=7.D.3M.N;7.D.1d=7.D.3M.1d;7=5e(7,2F,2w);a=7.D.L;5s(7,2F)}O 8(7.D.T.1c){a=32(2F,7,0)}O 8(7.D.1t!=\'*\'){a=3U(2F,7,0)}8(!7.1T&&J.11!=0&&a>J.11){8(7.D.T.1c){E b=4B(2F,7,J.11)-J.11}O 8(7.D.1t!=\'*\'){E b=7d(2F,7,J.11)-J.11}O{E b=7.D.L-J.11}18(F,\'8f 8g-1T: 8h \'+b+\' D 5A.\');y.R(H(\'V\',F),b)}7.D.L=2x(a,7,7.D.T.2c,$13);7.D.T.1Z=7.D.L;7=5g(7,2F);E c=4P(y,7);y.R(H(\'3H\',F),[I,c]);4S(7,J.P,F);3A(7,J.11,F);G c});y.12(H(\'4n\',F),C(e,a){e.1f();1u=3s(1u);y.1m(\'56\',K);y.R(H(\'5v\',F));8(a){y.R(H(\'75\',F))}1U(y.14(),7);8(7.2m){y.14().1W(C(){$(1k).X($(1k).1m(\'7e\'))})}y.X(y.1m(\'5q\'));y.5t();y.5S();$1s.8i(y);G I});y.12(H(\'18\',F),C(e){18(F,\'3w N: \'+7.N);18(F,\'3w 1d: \'+7.1d);18(F,\'7f 8j: \'+7.D.N);18(F,\'7f 8k: \'+7.D.1d);18(F,\'48 4a D L: \'+7.D.L);8(7.M.1H){18(F,\'48 4a D 5T 8l: \'+7.M.D)}8(7.V.W){18(F,\'48 4a D 5T 5A: \'+7.V.D)}8(7.Y.W){18(F,\'48 4a D 5T 72: \'+7.Y.D)}G F.18});y.12(\'3o\',C(e,n,o){e.1f();G y.1Q(H(n,F),o)})};y.5t=C(){y.23(H(\'\',F));y.23(H(\'\',F,K));y.23(\'3o\')};y.5Q=C(){y.5S();4S(7,J.P,F);3A(7,J.11,F);8(7.M.2G){E b=3N(7.M.2G);$1s.12(H(\'4T\',F,K),C(){y.R(H(\'3a\',F),b)}).12(H(\'4U\',F,K),C(){y.R(H(\'3f\',F))})}8(7.M.W){7.M.W.12(H(7.M.3L,F,K),C(e){e.2E();E a=K,b=2H;8(z.26){a=\'1H\'}O 8(7.M.4V){a=\'3a\';b=3N(7.M.4V)}8(a){y.R(H(a,F),b)}})}8(7.V.W){7.V.W.12(H(7.V.3L,F,K),C(e){e.2E();y.R(H(\'V\',F))});8(7.V.2G){E b=3N(7.V.2G);7.V.W.12(H(\'4T\',F,K),C(){y.R(H(\'3a\',F),b)}).12(H(\'4U\',F,K),C(){y.R(H(\'3f\',F))})}}8(7.Y.W){7.Y.W.12(H(7.Y.3L,F,K),C(e){e.2E();y.R(H(\'Y\',F))});8(7.Y.2G){E b=3N(7.Y.2G);7.Y.W.12(H(\'4T\',F,K),C(){y.R(H(\'3a\',F),b)}).12(H(\'4U\',F,K),C(){y.R(H(\'3f\',F))})}}8(7.1a.1z){8(7.1a.2G){E b=3N(7.1a.2G);7.1a.1z.12(H(\'4T\',F,K),C(){y.R(H(\'3a\',F),b)}).12(H(\'4U\',F,K),C(){y.R(H(\'3f\',F))})}}8(7.V.2Y||7.Y.2Y){$(4b).12(H(\'7g\',F,K,I,I),C(e){E k=e.7h;8(k==7.Y.2Y){e.2E();y.R(H(\'Y\',F))}8(k==7.V.2Y){e.2E();y.R(H(\'V\',F))}})}8(7.1a.4W){$(4b).12(H(\'7g\',F,K,I,I),C(e){E k=e.7h;8(k>=49&&k<58){k=(k-49)*7.D.L;8(k<=J.P){e.2E();y.R(H(\'3k\',F),[k,0,I,7.1a])}}})}8(7.V.4X||7.Y.4X){2K(\'4c 4d-7i\',\'4c 8m-7i\');8($.1r.4d){E c=(7.V.4X)?C(){y.R(H(\'V\',F))}:2H,4e=(7.Y.4X)?C(){y.R(H(\'Y\',F))}:2H;8(4e||4e){8(!z.4d){z.4d=I;E d={\'8n\':30,\'8o\':30,\'8p\':I};1B(7.2b){Q\'4o\':Q\'5U\':d.8q=c;d.8r=4e;16;2y:d.8s=4e;d.8t=c}$1s.4d(d)}}}}8($.1r.1q){E f=\'8u\'8v 3l;8((f&&7.1q.4f)||(!f&&7.1q.5V)){E g=$.1N(I,{},7.V,7.1q),7j=$.1N(I,{},7.Y,7.1q),5W=C(){y.R(H(\'V\',F),[g])},5X=C(){y.R(H(\'Y\',F),[7j])};1B(7.2b){Q\'4o\':Q\'5U\':7.1q.2I.8w=5X;7.1q.2I.8x=5W;16;2y:7.1q.2I.8y=5X;7.1q.2I.8z=5W}8(z.1q){y.1q(\'4n\')}$1s.1q(7.1q.2I);$1s.X(\'7k\',\'8A\');z.1q=I}}8($.1r.1h){8(7.V.1h){2K(\'7l V.1h 7m\',\'4c 1h 4A 2g\');7.V.1h=2H;7.1h={D:5Y(7.V.1h)}}8(7.Y.1h){2K(\'7l Y.1h 7m\',\'4c 1h 4A 2g\');7.Y.1h=2H;7.1h={D:5Y(7.Y.1h)}}8(7.1h){E h=$.1N(I,{},7.V,7.1h),7n=$.1N(I,{},7.Y,7.1h);8(z.1h){$1s.23(H(\'1h\',F,K))}$1s.12(H(\'1h\',F,K),C(e,a){e.2E();8(a>0){y.R(H(\'V\',F),[h])}O{y.R(H(\'Y\',F),[7n])}});z.1h=I}}8(7.M.1H){y.R(H(\'1H\',F),7.M.5Z)}8(z.6B){E i=$(3l),61=0,62=0;i.12(H(\'8B\',F,K,I,I),C(e){E a=i.N(),63=i.1d();8(a!=61||63!=62){y.R(H(\'5v\',F));8(7.M.64&&!z.26){y.R(H(\'1H\',F))}1U(y.14(),7);y.R(H(\'4N\',F));61=a;62=63}})}};y.5S=C(){E a=H(\'\',F),3O=H(\'\',F,K);65=H(\'\',F,K,I,I);$(4b).23(65);$(3l).23(65);$1s.23(3O);8(7.M.W){7.M.W.23(3O)}8(7.V.W){7.V.W.23(3O)}8(7.Y.W){7.Y.W.23(3O)}8(7.1a.1z){7.1a.1z.23(3O);8(7.1a.3K){7.1a.1z.14().2t()}}8(z.1q){y.1q(\'4n\');$1s.X(\'7k\',\'2y\');z.1q=K}8(z.1h){z.1h=K}4S(7,\'4g\',F);3A(7,\'2O\',F)};8(1l(w)){w={\'18\':w}}E z={\'2b\':\'Y\',\'26\':I,\'20\':K,\'2d\':K,\'1h\':K,\'1q\':K},J={\'P\':y.14().S,\'11\':0},1u={\'M\':2H,\'1e\':2H,\'2M\':2o(),\'3v\':0},U={\'2d\':K,\'1C\':0,\'2M\':0,\'2k\':\'\',\'19\':[]},2a={\'3G\':[],\'3g\':[]},2D=[],F=$.1N(I,{},$.1r.1v.7o,w),7={},31=$.1N(I,{},u),$1s=y.8C(\'<\'+F.66.54+\' 8D="\'+F.66.7p+\'" />\').68();F.4l=y.4l;F.3S=$.1r.1v.3S++;y.57(31,I,55);y.6J();y.6P();y.5Q();8(2V(7.D.3m)){E A=7.D.3m}O{E A=[];8(7.D.3m!=0){A.1b(7.D.3m)}}8(7.25){A.8E(4h(7q(7.25),10))}8(A.S>0){1j(E a=0,l=A.S;a<l;a++){E s=A[a];8(s==0){69}8(s===I){s=3l.8F.7a;8(s.S<1){69}}O 8(s===\'7r\'){s=1I.4i(1I.7r()*J.P)}8(y.1Q(H(\'3k\',F),[s,0,I,{1V:\'3Y\'}])){16}}}E B=4P(y,7),7s=3I(y.14(),7);8(7.7t){7.7t.1g($13,{\'N\':B.N,\'1d\':B.1d,\'D\':7s})}y.R(H(\'3H\',F),[I,B]);y.R(H(\'5O\',F));8(F.18){y.R(H(\'18\',F))}G y};$.1r.1v.3S=1;$.1r.1v.5a={\'2n\':K,\'3z\':I,\'1T\':I,\'2m\':K,\'2b\':\'1n\',\'D\':{\'3m\':0},\'1M\':{\'2k\':\'8G\',\'1C\':6E,\'2G\':K,\'3L\':\'5R\',\'3y\':K}};$.1r.1v.7o={\'18\':K,\'3x\':{\'42\':\'\',\'7u\':\'8H\'},\'66\':{\'54\':\'8I\',\'7p\':\'8J\'},\'6a\':{}};$.1r.1v.7v=C(a){G\'<a 8K="#"><7w>\'+a+\'</7w></a>\'};$.1r.1v.7x=C(a){$(1k).X(\'N\',a+\'%\')};$.1r.1v.25={3F:C(n){n+=\'=\';E b=4b.25.3P(\';\');1j(E a=0,l=b.S;a<l;a++){E c=b[a];2h(c.8L(0)==\' \'){c=c.17(1)}8(c.3Q(n)==0){G c.17(n.S)}}G 0},6b:C(n,v,d){E e="";8(d){E a=6c 7y();a.8M(a.2o()+(d*24*60*60*8N));e="; 8O="+a.8P()}4b.25=n+\'=\'+v+e+\'; 8Q=/\'},2t:C(n){$.1r.1v.25.6b(n,"",-1)}};C 44(d,e){G{19:[],1C:d,8R:d,2k:e,2M:2o()}}C 2P(s){8(1D(s.3t)){2P(s.3t)}1j(E a=0,l=s.19.S;a<l;a++){E b=s.19[a];8(!b){69}8(b[3]){b[0].5u()}b[0].8S(b[1],{8T:b[2],1C:s.1C,2k:s.2k})}8(1D(s.3u)){2P(s.3u)}}C 3Z(s,c){8(!1l(c)){c=I}8(1D(s.3t)){3Z(s.3t,c)}1j(E a=0,l=s.19.S;a<l;a++){E b=s.19[a];b[0].5u(I);8(c){b[0].X(b[1]);8(1o(b[2])){b[2]()}}}8(1D(s.3u)){3Z(s.3u,c)}}C 5I(a,b,o){8(b){b.2t()}1B(o.1V){Q\'1w\':Q\'3j\':Q\'1J-1w\':Q\'22-1w\':a.X(\'1t\',\'\');16}}C 45(d,o,b,a,c){8(o[b]){o[b].1g(d,a)}8(c[b].S){1j(E i=0,l=c[b].S;i<l;i++){c[b][i].1g(d,a)}}G[]}C 5J(a,q,c){8(q.S){a.R(H(q[0][0],c),q[0][1]);q.8U()}G q}C 5B(b){b.1W(C(){E a=$(1k);a.1m(\'7z\',a.2f(\':3r\')).4g()})}C 5G(b){8(b){b.1W(C(){E a=$(1k);8(!a.1m(\'7z\')){a.4j()}})}}C 3s(t){8(t.M){8V(t.M)}8(t.1e){8W(t.1e)}G t}C 5H(a,b,c,d,e,f,g){G{\'N\':g.N,\'1d\':g.1d,\'D\':{\'1Z\':a,\'8X\':b,\'6c\':c,\'L\':c},\'1M\':{\'D\':d,\'2b\':e,\'1C\':f}}}C 5D(a,o,b,c){E d=a.1C;8(a.1V==\'3Y\'){G 0}8(d==\'M\'){d=o.1M.1C/o.1M.D*b}O 8(d<10){d=c/d}8(d<1){G 0}8(a.1V==\'1w\'){d=d/2}G 1I.79(d)}C 4S(o,t,c){E a=(Z(o.D.4z))?o.D.4z:o.D.L+1;8(t==\'4j\'||t==\'4g\'){E f=t}O 8(a>t){18(c,\'2p 6R D (\'+t+\' P, \'+a+\' 6S): 8Y 8Z.\');E f=\'4g\'}O{E f=\'4j\'}E s=(f==\'4j\')?\'2O\':\'36\',h=2z(\'3r\',c);8(o.M.W){o.M.W[f]()[s](h)}8(o.V.W){o.V.W[f]()[s](h)}8(o.Y.W){o.Y.W[f]()[s](h)}8(o.1a.1z){o.1a.1z[f]()[s](h)}}C 3A(o,f,c){8(o.1T||o.3z)G;E a=(f==\'2O\'||f==\'36\')?f:K,4Y=2z(\'90\',c);8(o.M.W&&a){o.M.W[a](4Y)}8(o.V.W){E b=a||(f==0)?\'36\':\'2O\';o.V.W[b](4Y)}8(o.Y.W){E b=a||(f==o.D.L)?\'36\':\'2O\';o.Y.W[b](4Y)}}C 3R(a,b){8(1o(b)){b=b.1g(a)}O 8(1G(b)){b={}}G b}C 6r(a,b){b=3R(a,b);8(Z(b)){b={\'L\':b}}O 8(b==\'1c\'){b={\'L\':b,\'N\':b,\'1d\':b}}O 8(!1D(b)){b={}}G b}C 6s(a,b){b=3R(a,b);8(Z(b)){8(b<=50){b={\'D\':b}}O{b={\'1C\':b}}}O 8(1p(b)){b={\'2k\':b}}O 8(!1D(b)){b={}}G b}C 4Z(a,b){b=3R(a,b);8(1p(b)){E c=6d(b);8(c==-1){b=$(b)}O{b=c}}G b}C 6t(a,b){b=4Z(a,b);8(2u(b)){b={\'W\':b}}O 8(1l(b)){b={\'1H\':b}}O 8(Z(b)){b={\'2L\':b}}8(b.1e){8(1p(b.1e)||2u(b.1e)){b.1e={\'2q\':b.1e}}}G b}C 6F(a,b){8(1o(b.W)){b.W=b.W.1g(a)}8(1p(b.W)){b.W=$(b.W)}8(!1l(b.1H)){b.1H=I}8(!Z(b.5Z)){b.5Z=0}8(1G(b.4V)){b.4V=I}8(!1l(b.64)){b.64=I}8(!Z(b.2L)){b.2L=(b.1C<10)?91:b.1C*5}8(b.1e){8(1o(b.1e.2q)){b.1e.2q=b.1e.2q.1g(a)}8(1p(b.1e.2q)){b.1e.2q=$(b.1e.2q)}8(b.1e.2q){8(!1o(b.1e.4y)){b.1e.4y=$.1r.1v.7x}8(!Z(b.1e.5w)){b.1e.5w=50}}O{b.1e=K}}G b}C 59(a,b){b=4Z(a,b);8(2u(b)){b={\'W\':b}}O 8(Z(b)){b={\'2Y\':b}}G b}C 5h(a,b){8(1o(b.W)){b.W=b.W.1g(a)}8(1p(b.W)){b.W=$(b.W)}8(1p(b.2Y)){b.2Y=6d(b.2Y)}G b}C 6u(a,b){b=4Z(a,b);8(2u(b)){b={\'1z\':b}}O 8(1l(b)){b={\'4W\':b}}G b}C 6G(a,b){8(1o(b.1z)){b.1z=b.1z.1g(a)}8(1p(b.1z)){b.1z=$(b.1z)}8(!Z(b.D)){b.D=K}8(!1l(b.4W)){b.4W=K}8(!1o(b.3K)&&!51(b.3K)){b.3K=$.1r.1v.7v}8(!Z(b.4R)){b.4R=0}G b}C 6v(a,b){8(1o(b)){b=b.1g(a)}8(1G(b)){b={\'4f\':K}}8(3p(b)){b={\'4f\':b}}O 8(Z(b)){b={\'D\':b}}G b}C 6H(a,b){8(!1l(b.4f)){b.4f=I}8(!1l(b.5V)){b.5V=K}8(!1D(b.2I)){b.2I={}}8(!1l(b.2I.7A)){b.2I.7A=K}G b}C 6w(a,b){8(1o(b)){b=b.1g(a)}8(3p(b)){b={}}O 8(Z(b)){b={\'D\':b}}O 8(1G(b)){b=K}G b}C 6I(a,b){G b}C 3J(a,b,c,d,e){8(1p(a)){a=$(a,e)}8(1D(a)){a=$(a,e)}8(2u(a)){a=e.14().7b(a);8(!1l(c)){c=K}}O{8(!1l(c)){c=I}}8(!Z(a)){a=0}8(!Z(b)){b=0}8(c){a+=d.11}a+=b;8(d.P>0){2h(a>=d.P){a-=d.P}2h(a<0){a+=d.P}}G a}C 4B(i,o,s){E t=0,x=0;1j(E a=s;a>=0;a--){E j=i.1O(a);t+=(j.2f(\':L\'))?j[o.d[\'2v\']](I):0;8(t>o.4p){G x}8(a==0){a=i.S}x++}}C 7d(i,o,s){G 6e(i,o.D.1t,o.D.T.4s,s)}C 6V(i,o,s,m){G 6e(i,o.D.1t,m,s)}C 6e(i,f,m,s){E t=0,x=0;1j(E a=s,l=i.S;a>=0;a--){x++;8(x==l){G x}E j=i.1O(a);8(j.2f(f)){t++;8(t==m){G x}}8(a==0){a=l}}}C 5z(a,o){G o.D.T.4s||a.14().17(0,o.D.L).1t(o.D.1t).S}C 32(i,o,s){E t=0,x=0;1j(E a=s,l=i.S-1;a<=l;a++){E j=i.1O(a);t+=(j.2f(\':L\'))?j[o.d[\'2v\']](I):0;8(t>o.4p){G x}x++;8(x==l+1){G x}8(a==l){a=-1}}}C 5L(i,o,s,l){E v=32(i,o,s);8(!o.1T){8(s+v>l){v=l-s}}G v}C 3U(i,o,s){G 6f(i,o.D.1t,o.D.T.4s,s,o.1T)}C 71(i,o,s,m){G 6f(i,o.D.1t,m+1,s,o.1T)-1}C 6f(i,f,m,s,c){E t=0,x=0;1j(E a=s,l=i.S-1;a<=l;a++){x++;8(x>=l){G x}E j=i.1O(a);8(j.2f(f)){t++;8(t==m){G x}}8(a==l){a=-1}}}C 3I(i,o){G i.17(0,o.D.L)}C 6X(i,o,n){G i.17(n,o.D.T.1Z+n)}C 6Y(i,o){G i.17(0,o.D.L)}C 73(i,o){G i.17(0,o.D.T.1Z)}C 74(i,o,n){G i.17(n,o.D.L+n)}C 4w(i,o,d){8(o.1R){8(!1p(d)){d=\'29\'}i.1W(C(){E j=$(1k),m=4h(j.X(o.d[\'1S\']),10);8(!Z(m)){m=0}j.1m(d,m)})}}C 1U(i,o,m){8(o.1R){E x=(1l(m))?m:K;8(!Z(m)){m=0}4w(i,o,\'7B\');i.1W(C(){E j=$(1k);j.X(o.d[\'1S\'],((x)?j.1m(\'7B\'):m+j.1m(\'29\')))})}}C 5r(i,o){8(o.2m){i.1W(C(){E j=$(1k),s=5n(j,[\'N\',\'1d\']);j.1m(\'7e\',s)})}}C 5s(o,b){E c=o.D.L,7C=o.D[o.d[\'N\']],6g=o[o.d[\'1d\']],7D=3T(6g);b.1W(C(){E a=$(1k),6h=7C-7E(a,o,\'92\');a[o.d[\'N\']](6h);8(7D){a[o.d[\'1d\']](4r(6h,6g))}})}C 4P(a,o){E b=a.68(),$i=a.14(),$v=3I($i,o),52=4H(4I($v,o,I),o,K);b.X(52);8(o.1R){E p=o.1i,r=p[o.d[1]];8(o.1A&&r<0){r=0}E c=$v.3i();c.X(o.d[\'1S\'],c.1m(\'29\')+r);a.X(o.d[\'3q\'],p[o.d[0]]);a.X(o.d[\'1n\'],p[o.d[3]])}a.X(o.d[\'N\'],52[o.d[\'N\']]+(2R($i,o,\'N\')*2));a.X(o.d[\'1d\'],6i($i,o,\'1d\'));G 52}C 4I(i,o,a){G[2R(i,o,\'N\',a),6i(i,o,\'1d\',a)]}C 6i(i,o,a,b){8(!1l(b)){b=K}8(Z(o[o.d[a]])&&b){G o[o.d[a]]}8(Z(o.D[o.d[a]])){G o.D[o.d[a]]}a=(a.6j().3Q(\'N\')>-1)?\'2v\':\'3n\';G 4k(i,o,a)}C 4k(i,o,b){E s=0;1j(E a=0,l=i.S;a<l;a++){E j=i.1O(a);E m=(j.2f(\':L\'))?j[o.d[b]](I):0;8(s<m){s=m}}G s}C 2R(i,o,b,c){8(!1l(c)){c=K}8(Z(o[o.d[b]])&&c){G o[o.d[b]]}8(Z(o.D[o.d[b]])){G o.D[o.d[b]]*i.S}E d=(b.6j().3Q(\'N\')>-1)?\'2v\':\'3n\',s=0;1j(E a=0,l=i.S;a<l;a++){E j=i.1O(a);s+=(j.2f(\':L\'))?j[o.d[d]](I):0}G s}C 5b(a,o,d){E b=a.2f(\':L\');8(b){a.4g()}E s=a.68()[o.d[d]]();8(b){a.4j()}G s}C 5c(o,a){G(Z(o[o.d[\'N\']]))?o[o.d[\'N\']]:a}C 6k(i,o,b){E s=K,v=K;1j(E a=0,l=i.S;a<l;a++){E j=i.1O(a);E c=(j.2f(\':L\'))?j[o.d[b]](I):0;8(s===K){s=c}O 8(s!=c){v=I}8(s==0){v=I}}G v}C 7E(i,o,d){G i[o.d[\'93\'+d]](I)-i[o.d[d.6j()]]()}C 4r(s,o){8(3T(o)){o=4h(o.17(0,-1),10);8(!Z(o)){G s}s*=o/2J}G s}C H(n,c,a,b,d){8(!1l(a)){a=I}8(!1l(b)){b=I}8(!1l(d)){d=K}8(a){n=c.3x.42+n}8(b){n=n+\'.\'+c.3x.7u}8(b&&d){n+=c.3S}G n}C 2z(n,c){G(1p(c.6a[n]))?c.6a[n]:n}C 4H(a,o,p){8(!1l(p)){p=I}E b=(o.1R&&p)?o.1i:[0,0,0,0];E c={};c[o.d[\'N\']]=a[0]+b[1]+b[3];c[o.d[\'1d\']]=a[1]+b[0]+b[2];G c}C 3d(c,d){E e=[];1j(E a=0,7F=c.S;a<7F;a++){1j(E b=0,7G=d.S;b<7G;b++){8(d[b].3Q(2X c[a])>-1&&1G(e[b])){e[b]=c[a];16}}}G e}C 6D(p){8(1G(p)){G[0,0,0,0]}8(Z(p)){G[p,p,p,p]}8(1p(p)){p=p.3P(\'94\').7H(\'\').3P(\'95\').7H(\'\').3P(\' \')}8(!2V(p)){G[0,0,0,0]}1j(E i=0;i<4;i++){p[i]=4h(p[i],10)}1B(p.S){Q 0:G[0,0,0,0];Q 1:G[p[0],p[0],p[0],p[0]];Q 2:G[p[0],p[1],p[0],p[1]];Q 3:G[p[0],p[1],p[2],p[1]];2y:G[p[0],p[1],p[2],p[3]]}}C 4G(a,o){E x=(Z(o[o.d[\'N\']]))?1I.2A(o[o.d[\'N\']]-2R(a,o,\'N\')):0;1B(o.1A){Q\'1n\':G[0,x];Q\'35\':G[x,0];Q\'5d\':2y:G[1I.2A(x/2),1I.4i(x/2)]}}C 6x(o){E a=[[\'N\',\'7I\',\'2v\',\'1d\',\'7J\',\'3n\',\'1n\',\'3q\',\'1S\',0,1,2,3],[\'1d\',\'7J\',\'3n\',\'N\',\'7I\',\'2v\',\'3q\',\'1n\',\'5o\',3,2,1,0]];E b=a[0].S,7K=(o.2b==\'35\'||o.2b==\'1n\')?0:1;E c={};1j(E d=0;d<b;d++){c[a[0][d]]=a[7K][d]}G c}C 4C(x,o,a,b){E v=x;8(1o(a)){v=a.1g(b,v)}O 8(1p(a)){E p=a.3P(\'+\'),m=a.3P(\'-\');8(m.S>p.S){E c=I,6l=m[0],2Z=m[1]}O{E c=K,6l=p[0],2Z=p[1]}1B(6l){Q\'96\':v=(x%2==1)?x-1:x;16;Q\'97\':v=(x%2==0)?x-1:x;16;2y:v=x;16}2Z=4h(2Z,10);8(Z(2Z)){8(c){2Z=-2Z}v+=2Z}}8(!Z(v)||v<1){v=1}G v}C 2x(x,o,a,b){G 6m(4C(x,o,a,b),o.D.T)}C 6m(v,i){8(Z(i.34)&&v<i.34){v=i.34}8(Z(i.1X)&&v>i.1X){v=i.1X}8(v<1){v=1}G v}C 5i(s){8(!2V(s)){s=[[s]]}8(!2V(s[0])){s=[s]}1j(E j=0,l=s.S;j<l;j++){8(1p(s[j][0])){s[j][0]=$(s[j][0])}8(!1l(s[j][1])){s[j][1]=I}8(!1l(s[j][2])){s[j][2]=I}8(!Z(s[j][3])){s[j][3]=0}}G s}C 6d(k){8(k==\'35\'){G 39}8(k==\'1n\'){G 37}8(k==\'4o\'){G 38}8(k==\'5U\'){G 40}G-1}C 5K(n,a,c){8(n){E v=a.1Q(H(\'4m\',c));$.1r.1v.25.6b(n,v)}}C 7q(n){E c=$.1r.1v.25.3F(n);G(c==\'\')?0:c}C 5n(a,b){E c={},53;1j(E p=0,l=b.S;p<l;p++){53=b[p];c[53]=a.X(53)}G c}C 6y(a,b,c,d){8(!1D(a.T)){a.T={}}8(!1D(a.3M)){a.3M={}}8(a.3m==0&&Z(d)){a.3m=d}8(1D(a.L)){a.T.34=a.L.34;a.T.1X=a.L.1X;a.L=K}O 8(1p(a.L)){8(a.L==\'1c\'){a.T.1c=I}O{a.T.2c=a.L}a.L=K}O 8(1o(a.L)){a.T.2c=a.L;a.L=K}8(!1p(a.1t)){a.1t=(c.1t(\':3r\').S>0)?\':L\':\'*\'}8(!a[b.d[\'N\']]){8(b.2m){18(I,\'7L a \'+b.d[\'N\']+\' 1j 4c D!\');a[b.d[\'N\']]=4k(c,b,\'2v\')}O{a[b.d[\'N\']]=(6k(c,b,\'2v\'))?\'1c\':c[b.d[\'2v\']](I)}}8(!a[b.d[\'1d\']]){a[b.d[\'1d\']]=(6k(c,b,\'3n\'))?\'1c\':c[b.d[\'3n\']](I)}a.3M.N=a.N;a.3M.1d=a.1d;G a}C 6C(a,b){8(a.D[a.d[\'N\']]==\'1c\'){a.D.T.1c=I}8(!a.D.T.1c){8(Z(a[a.d[\'N\']])){a.D.L=1I.4i(a[a.d[\'N\']]/a.D[a.d[\'N\']])}O{a.D.L=1I.4i(b/a.D[a.d[\'N\']]);a[a.d[\'N\']]=a.D.L*a.D[a.d[\'N\']];8(!a.D.T.2c){a.1A=K}}8(a.D.L==\'98\'||a.D.L<1){18(I,\'2p a 5N 27 4a L D: 7L 4D "1c".\');a.D.T.1c=I}}G a}C 6z(a,b,c){8(a==\'M\'){a=4k(c,b,\'2v\')}G a}C 6A(a,b,c){8(a==\'M\'){a=4k(c,b,\'3n\')}8(!a){a=b.D[b.d[\'1d\']]}G a}C 5g(o,a){E p=4G(3I(a,o),o);o.1i[o.d[1]]=p[1];o.1i[o.d[3]]=p[0];G o}C 5e(o,a,b){E c=6m(1I.2A(o[o.d[\'N\']]/o.D[o.d[\'N\']]),o.D.T);8(c>a.S){c=a.S}E d=1I.4i(o[o.d[\'N\']]/c);o.D.L=c;o.D[o.d[\'N\']]=d;o[o.d[\'N\']]=c*d;G o}C 3N(p){8(1p(p)){E i=(p.3Q(\'99\')>-1)?I:K,r=(p.3Q(\'3f\')>-1)?I:K}O{E i=r=K}G[i,r]}C 5Y(a){G(Z(a))?a:2H}C 6n(a){G(a===2H)}C 1G(a){G(6n(a)||2X a==\'7M\'||a===\'\'||a===\'7M\')}C 2V(a){G(a 2W 9a)}C 2u(a){G(a 2W 7N)}C 1D(a){G((a 2W 9b||2X a==\'2g\')&&!6n(a)&&!2u(a)&&!2V(a))}C Z(a){G((a 2W 48||2X a==\'27\')&&!9c(a))}C 1p(a){G((a 2W 9d||2X a==\'2N\')&&!1G(a)&&!3p(a)&&!51(a))}C 1o(a){G(a 2W 9e||2X a==\'C\')}C 1l(a){G(a 2W 9f||2X a==\'3c\'||3p(a)||51(a))}C 3p(a){G(a===I||a===\'I\')}C 51(a){G(a===K||a===\'K\')}C 3T(x){G(1p(x)&&x.17(-1)==\'%\')}C 2o(){G 6c 7y().2o()}C 2K(o,n){18(I,o+\' 2f 9g, 9h 1j 9i 9j 9k 9l. 9m \'+n+\' 9n.\')}C 18(d,m){8(1D(d)){E s=\' (\'+d.4l+\')\';d=d.18}O{E s=\'\'}8(!d){G K}8(1p(m)){m=\'1v\'+s+\': \'+m}O{m=[\'1v\'+s+\':\',m]}8(3l.6o&&3l.6o.7O){3l.6o.7O(m)}G K}$.1N($.2k,{\'9o\':C(t){E a=t*t;G t*(-a*t+4*a-6*t+4)},\'9p\':C(t){G t*(4*t*t-9*t+6)},\'9q\':C(t){E a=t*t;G t*(33*a*a-9r*a*t+9s*a-67*t+15)}})})(7N);',62,587,'|||||||opts|if||||||||||||||||||||||||||||||function|items|var|conf|return|cf_e|true|itms|false|visible|auto|width|else|total|case|trigger|length|visibleConf|scrl|prev|button|css|next|is_number||first|bind|tt0|children||break|slice|debug|anims|pagination|push|variable|height|progress|stopPropagation|call|mousewheel|padding|for|this|is_boolean|data|left|is_function|is_string|swipe|fn|wrp|filter|tmrs|carouFredSel|fade|_onafter|_moveitems|container|align|switch|duration|is_object|_s_paddingold|_s_paddingcur|is_undefined|play|Math|cover|_position|opacity|scroll|extend|eq|_a_wrapper|triggerHandler|usePadding|marginRight|circular|sz_resetMargin|fx|each|max|i_cur_l|old|isScrolling|i_old_l|uncover|unbind||cookie|isPaused|number|a_cfs|_cfs_origCssMargin|clbk|direction|adjust|isStopped|stopImmediatePropagation|is|object|while|i_new|w_siz|easing|nr|responsive|synchronise|getTime|Not|bar|i_new_l|a_cur|remove|is_jquery|outerWidth|avail_primary|cf_getItemsAdjust|default|cf_c|ceil|pR|_s_paddingnew|queu|preventDefault|a_itm|pauseOnHover|null|options|100|deprecated|timeoutDuration|startTime|string|removeClass|sc_startScroll|i_skp|ms_getTotalSize|a_old|a_lef|a_dur|is_array|instanceof|typeof|key|adj||opts_orig|gn_getVisibleItemsNext||min|right|addClass||||pause|perc|boolean|cf_sortParams|scrolling|resume|onAfter|i_old|last|crossfade|slideTo|window|start|outerHeight|_cfs_triggerEvent|is_true|top|hidden|sc_clearTimers|pre|post|timePassed|Carousel|events|queue|infinite|nv_enableNavi|i_siz|i_siz_vis|_a_paddingold|_a_paddingcur|get|onBefore|updatePageStatus|gi_getCurrentItems|gn_getItemIndex|anchorBuilder|event|sizesConf|bt_pauseOnHoverConfig|ns2|split|indexOf|go_getObject|serialNumber|is_percentage|gn_getVisibleItemsNextFilter|orgCSS|position|zIndex|none|sc_stopScroll||dur2|prefix|appendTo|sc_setScroll|sc_fireCallbacks|currentPage|before|Number||of|document|the|touchwipe|wN|onTouch|hide|parseInt|floor|show|ms_getTrueLargestSize|selector|currentPosition|destroy|up|maxDimension|primarySizePercentage|ms_getPercentage|org|onTimeoutStart|onTimeoutPause|onTimeoutEnd|sz_storeMargin|stopped|updater|minimum|configuration|gn_getVisibleItemsPrev|cf_getAdjust|to|onEnd|clone|cf_getAlignPadding|cf_mapWrapperSizes|ms_getSizes|a_wsz|a_new|a_cfs_vis|end|updateSizes|eval|sz_setSizes|pgs|deviation|nv_showNavi|mouseenter|mouseleave|pauseOnEvent|keys|wipe|di|go_getNaviObject||is_false|sz|prop|element|starting_position|_cfs_isCarousel|_cfs_init||go_getPrevNextObject|defaults|ms_getParentSize|ms_getMaxDimension|center|in_getResponsiveValues|bottom|in_getAlignPadding|go_complementPrevNextObject|cf_getSynchArr|onPauseStart|onPausePause|onPauseEnd|pauseDuration|in_mapCss|marginBottom|newPosition|_cfs_origCss|sz_storeSizes|sz_setResponsiveSizes|_cfs_unbind_events|stop|finish|interval|type|conditions|gn_getVisibleOrg|backward|sc_hideHiddenItems|a_lef_vis|sc_getDuration|_a_paddingnew|not|sc_showHiddenItems|sc_mapCallbackArguments|sc_afterScroll|sc_fireQueue|cf_setCookie|gn_getVisibleItemsNextTestCircular|slideToPage|valid|linkAnchors|value|_cfs_bind_buttons|click|_cfs_unbind_buttons|scrolled|down|onMouse|swP|swN|bt_mousesheelNumber|delay||_windowWidth|_windowHeight|nh|pauseOnResize|ns3|wrapper||parent|continue|classnames|set|new|cf_getKeyCode|gn_getItemsPrevFilter|gn_getItemsNextFilter|seco|nw|ms_getLargestSize|toLowerCase|ms_hasVariableSizes|sta|cf_getItemAdjustMinMax|is_null|console|caroufredsel|No|go_getItemsObject|go_getScrollObject|go_getAutoObject|go_getPaginationObject|go_getSwipeObject|go_getMousewheelObject|cf_getDimensions|in_complementItems|in_complementPrimarySize|in_complementSecondarySize|upDateOnWindowResize|in_complementVisibleItems|cf_getPadding|500|go_complementAutoObject|go_complementPaginationObject|go_complementSwipeObject|go_complementMousewheelObject|_cfs_build|textAlign|float|marginTop|marginLeft|absolute|_cfs_bind_events|paused|enough|needed|page|slide_|gn_getScrollItemsPrevFilter|Scrolling|gi_getOldItemsPrev|gi_getNewItemsPrev|directscroll|concat|gn_getScrollItemsNextFilter|forward|gi_getOldItemsNext|gi_getNewItemsNext|jumpToStart|after|append|removeItem|round|hash|index|selected|gn_getVisibleItemsPrevFilter|_cfs_origCssSizes|Item|keyup|keyCode|plugin|scN|cursor|The|option|mcN|configs|classname|cf_getCookie|random|itm|onCreate|namespace|pageAnchorBuilder|span|progressbarUpdater|Date|_cfs_isHidden|triggerOnTouchEnd|_cfs_tempCssMargin|newS|secp|ms_getPaddingBorderMargin|l1|l2|join|innerWidth|innerHeight|dx|Set|undefined|jQuery|log|found|caroufredsel_cookie_|relative|fixed|overflow|setInterval|setTimeout|or|Callback|returned|Page|resumed|currently|slide_prev|prependTo|slide_next|prevPage|nextPage|prepend|carousel|insertItem|add|detach|currentVisible|body|find|Preventing|non|sliding|replaceWith|widths|heights|automatically|touchSwipe|min_move_x|min_move_y|preventDefaultEvents|wipeUp|wipeDown|wipeLeft|wipeRight|ontouchstart|in|swipeUp|swipeDown|swipeLeft|swipeRight|move|resize|wrap|class|unshift|location|swing|cfs|div|caroufredsel_wrapper|href|charAt|setTime|1000|expires|toGMTString|path|orgDuration|animate|complete|shift|clearTimeout|clearInterval|skipped|Hiding|navigation|disabled|2500|Width|outer|px|em|even|odd|Infinity|immediate|Array|Object|isNaN|String|Function|Boolean|DEPRECATED|support|it|will|be|removed|Use|instead|quadratic|cubic|elastic|106|126'.split('|'),0,{}))