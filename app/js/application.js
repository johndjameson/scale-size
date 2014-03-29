var ScaleSize = (function(){
  var cache = {
        textSize: 0,
        altSize: 0,
        ratio: 0,
        previewText: 'lorem ipsum dolor sit amet',
        query: '',
        sizes: []
  };

  var scalesize = {
    init: function() {
      scalesize.bindUIActions();
      scalesize.parseQuery();
      scalesize.setQuery();
      scalesize.setFields();
      scalesize.displayQuery();
      scalesize.calculateSizes();
      scalesize.displaySizes();

      // dev
      $('.accordion').addClass('is-closed');
    },

    bindUIActions: function() {
      // Accordion
      $('.accordion-btn--a').on('click', function() {
        $(this).parent().toggleClass('is-closed');
      });

      $('.accordion-btn--b').on('click', function() {
        $(this).parent().addClass('is-closed');
      });

      // Settings
      // Has to be 'change' to support keyboard input
      $('#text_size, #alt_size, #ratio').on('change', function() {
        scalesize.updateSizes();
      });

      $('#preview_text').on('input', function() {
        scalesize.updateSizes();
      });

      $('#text_size_field, #alt_size_field, #ratio_field').on('input', function() {

        $('#text_size').val($('#text_size_field').val());
        $('#alt_size').val($('#alt_size_field').val());
        $('#ratio').val($('#ratio_field').val());

        scalesize.updateSizes();
      });

      // http://stackoverflow.com/questions/3150275/jquery-input-select-all-on-focus
      $('#current_link').on("focus", function (e) {
        var $this = $(this);

        setTimeout(function () {
          return $this.select()
        }, 0);
      });
    },

    parseQuery: function() {
      var
        query = {},
        items = window.location.search.slice(1).split('&');

      query.text = 16;
      query.alt = 200;
      query.ratio = 1.60;

      // Independent of order, sets object properties from query string
      for (var i = 0, len = items.length; i < len; i++) {
        var // hoisted outside scope in loops
          a = items[i].split('='),
          val = parseFloat(a[1], 10);

        if (!isNaN(val)) query[a[0]] = val;
      }

      // Sanitize user input (remove useless/dangerous values)
      if (query.text < 10) query.text = 10;
      if (query.text > 64) query.text = 64;

      if (query.alt < 10) query.alt = 10;
      if (query.alt > 1000) query.alt = 1000;

      if (query.ratio < 1.1) query.ratio = 1.1;
      if (query.ratio > 3) query.ratio = 3;

      cache.textSize = query.text;
      cache.altSize = query.alt;
      cache.ratio = query.ratio;

      $('#text_size').val(cache.textSize);
      $('#alt_size').val(cache.altSize);
      $('#ratio').val(cache.ratio);
    },

    updateSizes: function() {
      scalesize.getSizes();
      scalesize.setFields();
      scalesize.calculateSizes();
      scalesize.setQuery();
      scalesize.displayQuery();
      scalesize.displaySizes();
    },

    getSizes: function() {
      cache.textSize = $('#text_size').val();
      cache.altSize = $('#alt_size').val();
      cache.ratio = $('#ratio').val();
      cache.previewText = $('#preview_text').val().replace(/\s/g, '&nbsp;') || '&nbsp;';
    },

    setFields: function() {
      $('#text_size_field').val($('#text_size').val());
      $('#alt_size_field').val($('#alt_size').val());
      $('#ratio_field').val($('#ratio').val());
    },

    calculateSizes: function() {
      var
        sizes = [],
        min = 8,
        max = 360;

      function calc(size, asc) {
        tempSize = size;

        if (asc) {
          while (tempSize <= max) {
            sizes.push(Math.round(tempSize));

            tempSize *= cache.ratio;
          }
        } else {
          while (tempSize >= min) {
            sizes.push(Math.round(tempSize));

            tempSize /= cache.ratio;
          }
        }
      }

      calc(cache.textSize, true);
      calc(cache.textSize, false);
      calc(cache.altSize, true);
      calc(cache.altSize, false);

      cache.sizes = _.uniq(_.sortBy(sizes, function (num) { return num; }));
    },

    setQuery: function() {
      cache.query =
        'text=' + cache.textSize + '&' +
        'alt=' + cache.altSize + '&' +
        'ratio=' + cache.ratio;
    },

    displayQuery: function() {
      $('#current_link').val(
        'http://' +
        window.location.host + '?' +
        cache.query
      );

      $('#tweet').attr('href',
        'http://twitter.com/share?text=' +
        encodeURIComponent(
          'Check out my sweet scale on @scalesize http://scalesize.com/?' +
          cache.query
        )
      );
    },

    displaySizes: function() {
      var
        text = cache.previewText,
        sizes = cache.sizes,
        str = '';


      for (var i = 0, len = sizes.length; i < len; i++) {
        str +=
          '<li class="scale-item">' +
            '<p class="scale-label">' + sizes[i] + 'px</p>' +
            '<p class="scale-preview" style="font-size:' + sizes[i] + 'px;">' + text + '</p>' +
          '</li>';
      }

      $('#scale').html(str);
    }
  };

  return {
    init: scalesize.init
  }
})();

$(document).ready(function(){
  ScaleSize.init();
});