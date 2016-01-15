(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var pluginName = 'pgallery',
        defaults = {
            userName: 'horster',
            boardName: 'leipzig-3'
        };

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init(this.options);
    }

    Plugin.prototype = {

        init: function (options) {
            options.boardUrl = [
                'https://api.pinterest.com/v3/pidgets/boards/',
                options.userName,
                '/',
                options.boardName,
                '/pins/'
            ].join('');
            this.handleRequest(options);
            this.handleOverlay(options);
        },

        template: function (templateString, data) {
            return templateString.replace(/%(\w*)%/g, function (m, key) {
                return data.hasOwnProperty(key) ? data[key] : "";
            });
        },

        handleRequest: function (options) {
            var that = this,
                request = $.get(options.boardUrl, 'jsonp');

            request.done(function (json) {
                var pins = json.data.pins;

                $.each(pins, function () {
                    var thumbUrl = this.images["237x"].url,
                        bigUrl = thumbUrl.replace('237x', '1200x'),
                        html = that.template(options.template, {
                            'bigUrl': bigUrl,
                            'thumbUrl': thumbUrl,
                            'boardName': options.boardName
                        });
                    $(html).appendTo(that.element);
                });


                // $('#pins').append(pins); // pins[0].description
            });

            request.fail(function (XHR, textStatus, errorThrown) {
                alert("error: " + textStatus);
                alert("error: " + errorThrown);
            });
        },

        handleOverlay: function () {
            var cover = $('body').find('div.cover');
            $(this.element).on('click', 'a', function () {
                cover.addClass('active');
                cover.find('div.cover__image-area').empty().append('<img src="' + this.href + '" alt="" />');
            });

            cover.on('click', function () {
                $(this).removeClass('active');
            });
        }

    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new Plugin(this, options));
            }
        });
    };

}));
