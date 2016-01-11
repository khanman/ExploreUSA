(function ($) {
    var html = '<div class="scrollbar"></div>';

    $.fn.scrollable = function () {
        var $scrollbar = $(html);

        // add scrollbar to DOM
        this.append($scrollbar);

        var frameHeight = this.height();
        var contentHeight = this[0].scrollHeight;

        var ratio = frameHeight / contentHeight;

        // calculate the height of the scroll bar, based on the ratio between frameHeight and contentHeight
        var scrollbarHeight = ratio * frameHeight;
        // set scrollbar height
        $scrollbar.height(scrollbarHeight);

        var $el = this;

        // scroll on mouse wheel event
        this.on('mousewheel', function (evt) {
            var delta = evt.originalEvent.wheelDeltaY;

            scroll(-delta);
        });

        function scroll(delta) {
            // if delta is within the height of $el, scroll down
            if (parseInt($scrollbar.css('top')) + $scrollbar.outerHeight() + delta < contentHeight) {
                $el.scrollTop($el.scrollTop() + delta);

                var top = $el.scrollTop();
                var scrollbarTop = (top / contentHeight) * frameHeight;

                $scrollbar.css({ top: scrollbarTop + top });
            } else { // if delta exceeds the height of $el, scroll to bottom
                $el.scrollTop(contentHeight);
                $scrollbar.css({ top: contentHeight - $scrollbar.outerHeight() });
            }
        };
    };
}(jQuery));