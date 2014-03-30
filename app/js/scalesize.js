// http://css-tricks.com/how-do-you-structure-javascript-the-module-pattern-edition/

var ScaleSize = {

  s: {
        textSize: 0,
        altSize: 0,
        ratio: 0,
        previewText: 'lorem ipsum dolor sit amet',
        query: '',
        sizes: []
  },

  init: function() {
    ScaleSize.bindUIActions();
    ScaleSize.updateSizes(true);
  },

  bindUIActions: function() {
    // Settings
    // Has to be 'change' to support keyboard input
    $('#text_size, #alt_size, #ratio').on('change', function() {
      ScaleSize.updateSizes();
    });

    $('#preview_text').on('input', function() {
      ScaleSize.updateSizes();
    });

    $('#text_size_field, #alt_size_field, #ratio_field').on('input', function() {

      $('#text_size').val($('#text_size_field').val());
      $('#alt_size').val($('#alt_size_field').val());
      $('#ratio').val($('#ratio_field').val());

      ScaleSize.updateSizes();
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

    ScaleSize.s.textSize = query.text;
    ScaleSize.s.altSize = query.alt;
    ScaleSize.s.ratio = query.ratio;
  },

  updateSizes: function(firstRun) {
    ScaleSize.getSizes();
    firstRun && ScaleSize.parseQuery();
    ScaleSize.setFields();
    ScaleSize.calculateSizes();
    ScaleSize.setQuery();
    ScaleSize.displayQuery();
    ScaleSize.displaySizes();
  },

  getSizes: function() {
    ScaleSize.s.textSize = $('#text_size').val();
    ScaleSize.s.altSize = $('#alt_size').val();
    ScaleSize.s.ratio = $('#ratio').val();
    ScaleSize.s.previewText = $('#preview_text').val().replace(/\s/g, '&nbsp;') || '&nbsp;';
  },

  setRanges: function() {
    $('#text_size').val(ScaleSize.s.textSize);
    $('#alt_size').val(ScaleSize.s.altSize);
    $('#ratio').val(ScaleSize.s.ratio);
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

          tempSize *= ScaleSize.s.ratio;
        }
      } else {
        while (tempSize >= min) {
          sizes.push(Math.round(tempSize));

          tempSize /= ScaleSize.s.ratio;
        }
      }
    }

    calc(ScaleSize.s.textSize, true);
    calc(ScaleSize.s.textSize, false);
    calc(ScaleSize.s.altSize, true);
    calc(ScaleSize.s.altSize, false);

    ScaleSize.s.sizes = _.uniq(_.sortBy(sizes, function (num) { return num; }));
  },

  setQuery: function() {
    ScaleSize.s.query =
      'text=' + ScaleSize.s.textSize + '&' +
      'alt=' + ScaleSize.s.altSize + '&' +
      'ratio=' + ScaleSize.s.ratio;
  },

  displayQuery: function() {
    $('#current_link').val(
      'http://' +
      window.location.host + '?' +
      ScaleSize.s.query
    );

    $('#tweet').attr('href',
      'http://twitter.com/share?text=' +
      encodeURIComponent(
        'Check out my sweet scale on @scalesize http://scalesize.com/?' +
        ScaleSize.s.query
      )
    );
  },

  displaySizes: function() {
    var
      text = ScaleSize.s.previewText,
      sizes = ScaleSize.s.sizes,
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