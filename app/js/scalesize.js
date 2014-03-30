// http://css-tricks.com/how-do-you-structure-javascript-the-module-pattern-edition/

var ScaleSize = {

  s: {
        textSize: 16,
        altSize: 320,
        ratio: 1.6,
        max: 360,
        previewText: 'lorem ipsum dolor sit amet',
        query: '',
        sizes: []
  },

  init: function() {
    ScaleSize.bindUIActions();
    ScaleSize.updateSizes('init');
  },

  bindUIActions: function() {
    // Settings
    // Has to be 'change' to support keyboard input
    $('#text_size, #alt_size, #ratio').on('change', function() {
      ScaleSize.updateSizes('range');
    });

    $('#preview_text').on('input', function() {
      ScaleSize.updateSizes('field');
    });

    $('#text_size_field, #alt_size_field, #ratio_field').on('input', function() {
      ScaleSize.updateSizes('field');
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

    query.text = ScaleSize.s.textSize;
    query.alt = ScaleSize.s.altSize;
    query.ratio = ScaleSize.s.ratio;

    // Independent of order, overwrites object properties from query string
    for (var i = 0, len = items.length; i < len; i++) {
      var // hoisted outside scope in loops
        a = items[i].split('='),
        val = parseFloat(a[1], 10);

      // if the query is well-formed, the parameter overwrites the default
      if (!isNaN(val)) query[a[0]] = val;
    }

    // Sanitize user input (remove useless/dangerous values)
    if (query.text < 1) query.text = 1;
    if (query.text > 99) query.text = 99;

    if (query.alt < 1) query.alt = 1;
    if (query.alt > 999) query.alt = 999;

    if (query.ratio < 1.1) query.ratio = 1.1;
    if (query.ratio > 3) query.ratio = 3;

    ScaleSize.s.textSize = query.text;
    ScaleSize.s.altSize = query.alt;
    ScaleSize.s.ratio = query.ratio;
  },

  updateSizes: function(context) {
    ScaleSize.getInput(context);

    if (context === 'init') {
      ScaleSize.parseQuery();
      ScaleSize.setFields();
      ScaleSize.setRanges();
    } else if (context === 'field') {
      ScaleSize.setRanges();
    } else {
      ScaleSize.setFields();
    }

    ScaleSize.calculateSizes();
    ScaleSize.setLink();
    ScaleSize.displayLink();
    ScaleSize.displaySizes();
  },

  getInput: function(context) {

    if (context === 'range') {
        // fallbacks in case of 0 or empty string
        ScaleSize.s.textSize = $('#text_size').val() || 1;
        ScaleSize.s.altSize = $('#alt_size').val() || 1;
        ScaleSize.s.ratio = $('#ratio').val() || 1.1;
    } else {
        ScaleSize.s.textSize = $('#text_size_field').val() || 1;
        ScaleSize.s.altSize = $('#alt_size_field').val() || 1;
        ScaleSize.s.ratio = $('#ratio_field').val() || 1.1;
    }

    ScaleSize.s.previewText = $('#preview_text').val().replace(/\s/g, '&nbsp;') || '&nbsp;';
  },

  setFields: function() {
    $('#text_size_field').val(ScaleSize.s.textSize);
    $('#alt_size_field').val(ScaleSize.s.altSize);
    $('#ratio_field').val(ScaleSize.s.ratio);
  },

  setRanges: function() {
    $('#text_size').val(ScaleSize.s.textSize);
    $('#alt_size').val(ScaleSize.s.altSize);
    $('#ratio').val(ScaleSize.s.ratio);
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

    // Sort sizes in ascending order, remove duplicates
    // (Underscore.js)
    ScaleSize.s.sizes = _.uniq(_.sortBy(sizes, function (num) { return num; }));
  },

  setLink: function() {
    ScaleSize.s.query =
      'text=' + ScaleSize.s.textSize + '&' +
      'alt=' + ScaleSize.s.altSize + '&' +
      'ratio=' + ScaleSize.s.ratio;
  },

  displayLink: function() {
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
          '<p class="scale-preview" style="' +
            'font-size:' + sizes[i] + 'px; ' +
            // slightly fade out large text so it's not overwhelming
            'opacity:' + (1 - (sizes[i] / ScaleSize.s.max / 8)) + ';' +
            '">' +
            text +
          '</p>' +
        '</li>';
    }

    $('#scale').html(str);
  }
};