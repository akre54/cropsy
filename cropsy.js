/* cropsy.js by Adam Krebs
 *
 * All Rights Reserved until I come up with a good licence (MIT probably)
 */

;(function($) {
  $.fn.cropsy = function(options) {
    var settings = {
      max_scale: 2,
      mask_padding: 40,
    }

    if ( typeof options == 'object' ) {
      $.extend( settings, options );
    }

    var $viewport = $('
      <div class="cropsy-container">
          <div class="cropsy-viewport">
            <div class="loading-indicator"></div>
            <div class="cropsy-overlay"></div>
          </div>
        </div>
        <div class="cropsy-zoom-slider">
          <div class="ui-slider-handle"></div>
        </div>
        <a href="javascript:void 0;" id="done">Done</a>
      ');

    var $image = $(this);
    var $viewport = $('<div />').attr('class', 'cropsy-viewport');
    var $container = $('<div />').attr('class', 'cropsy-container');
    $container.append($viewport);
    $image.wrap($viewport);

    $loading = $viewport.prepend('<div class="cropsy-loading-indicator" />'),
    $container = $viewport.parent()
    $overlay = $('.cropsy-overlay');

    $viewport.css({
      height: "+=" + settings.mask_padding * 2,
      width: "+=" + settings.mask_padding * 2
    });
    $image.hide();

    // wait for image load to attach draggable
    $image.load(function() {

      centerImage();

      // store the original image width and height onto the image's cached
      // jQuery object for easy retrieval
      $.extend($image, {
        originalWidth: $image.width(),
        originalHeight: $image.height()
      });

      var onStartDragPosition;
      $overlay.draggable({
        start: function(event, ui) {
          onStartDragPosition = $image.position();
        },
        drag: function(event, ui) {
          $image.offset({
            'top': onStartDragPosition.top + ui.offset.top,
            'left': onStartDragPosition.left + ui.offset.left
          });
        },
        stop: function() {
          $overlay.css({'left': 0, 'top': 0});
        }
      });

      var $zoom_widget = $viewport.find('.cropsy-zoom-slider')
        .width($viewport.width())
        .slider({
          value: 0,
          min: 0,
          max: 100,
          slide: function(event, ui) {

            var imgOffset = $image.offset(),
                centerX = Math.round(imgOffset.left + $image.width() / 2),
                centerY = Math.round(imgOffset.top + $image.height() / 2),
                newHeight = Math.round($image.originalHeight * (1 + ui.value / 100)),
                newWidth  = Math.round($image.originalWidth * (1 + ui.value / 100));

                newHeight = (newHeight % 2) ? newHeight += 1 : newHeight;
                newWidth  = (newWidth % 2) ? newWidth += 1 : newWidth;

                $image.height(newHeight);
                $image.width(newWidth);

                $image.offset({
                  top: Math.round(centerY - newHeight / 2),
                  left: Math.round(centerX - newWidth / 2)
                });
          }
        });

      // remove loader and show image
      $loading.hide();
      $loading.remove();
      $image.fadeIn();
    });

    var centerImage = function() {
      var image_width   = $image.width(),
          image_height  = $image.height(),
          actual_ratio  = image_width / image_height,
          mask_width    = $viewport.width(),
          mask_height   = $viewport.height(),
          crop_width    = $viewport.width() - 2 * settings.mask_padding,
          crop_height   = $viewport.height() - 2 * settings.mask_padding;

      if (image_width > image_height) {
        image_height = crop_height;
        $image.height(image_height);
        image_width = $image.width();
      } else {
        image_width = crop_width;
        $image.width(image_width);
        image_height = $image.height();
      }

      $image.offset({
        top: mask_height / 2 - image_height / 2,
        left: mask_width / 2 - image_width / 2
      });
    }
  }
})(jQuery)