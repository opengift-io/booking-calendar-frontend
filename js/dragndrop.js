/**
 * Created by gvammer on 27.06.2018.
 */
$.fn.setEventPosition = function (x, y) {
    return this.css({
        'left': x - 5,
        'top': y - 5
    });
};

var dnd = function (selector, callbackStart, callbackEnd) {
    this.$element = $(selector);
    this.callbackStart = callbackStart;
    this.callbackEnd = callbackEnd;
    this.init();
};

dnd.prototype = {
    init: function () {
        var t = this;
        t.$element.each(function () {
            var $element = $(this);

            $element.unbind('mousedown').mousedown(function (e) {
                var oldCss = {
                    'height': $element.css('height'),
                    'width': $element.css('width'),
                    'position': $element.css('position'),
                    'top': $element.css('top'),
                    'left': $element.css('left'),
                    'display': $element.css('display'),
                    'border': $element.css('border'),
                    'cursor': 'inherit'
                }, css = {
                    'height': $element.height(),
                    'width': $element.width(),
                    'position': 'absolute',
                    'top': $element.offset().top,
                    'left': $element.offset().left,
                    'display': 'block',
                    'z-index': '9999',
                    'background': 'white',
                    'border': '1px solid #efefef',
                    'cursor': 'pointer'
                }, $tmpel = $('<span></span>').css('display', 'none').addClass('js-tmp-dnd').insertAfter($element);

                var x = e.clientX, y = e.clientY + $(window).scrollTop();
                $element.setEventPosition(x, y);
                $element.data('oldcss', oldCss);
                $element.data('parent', $element.parent());
                $element.css(css).appendTo('body').addClass('dnd');
                t.$movedEvent = $element;
                window.$dndMovedElement = t.$movedEvent;
            });

            $element.click(function () {
                return false;
            });

            $(document).off('mouseup.taskdnd').on('mouseup.taskdnd', function () {
                if (t.$movedEvent) {
                    t.$movedEvent.css(t.$movedEvent.data('oldcss')).removeClass('dnd');
                    t.$movedEvent.insertBefore('.js-tmp-dnd');
                    $('.js-tmp-dnd').remove();
                    t.$movedEvent = false;
                    setTimeout(function() {
                        window.$dndMovedElement = false;
                    }, 10);
                }

            }).off('mousemove.taskdnd').on('mousemove.taskdnd', function (e) {
                if (t.$movedEvent) {
                    var x = e.clientX, y = e.clientY + $(window).scrollTop();
                    t.$movedEvent.setEventPosition(x, y);
                }
            });
        });
    }
};