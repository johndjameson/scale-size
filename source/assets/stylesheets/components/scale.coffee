# *************************************
#
#   Scale
#   -> Enumeration of sizes
#
# *************************************
#
# @param element          { jQuery object }
# @param itemClass        { string }
# @param itemLabelClass   { string }
# @param itemPreviewClass { string }
#
# *************************************

@ScaleSize.Scale = do ->

  # -------------------------------------
  #   Private Variables
  # -------------------------------------

  _settings      = {}
  _defaultValues =
    alternate : 30
    base      : 16
    ratio     : 1.6
    minimum   : 8
    maximum   : 360
    text      : 'lorem ipsum dolor sit amet'

  # -------------------------------------
  #   Initialize
  # -------------------------------------

  init = ( options ) ->
    _settings = $.extend
      element          : $( '.js-scale' )
      itemClass        : 'scale-item'
      itemLabelClass   : 'scale-item-label'
      itemPreviewClass : 'scale-item-preview'
    , options

    updateSizes()

  # -------------------------------------
  #   Update Sizes
  # -------------------------------------
  #
  # @param alternate { integer }
  # @param base      { integer }
  # @param ratio     { float }
  # @param text      { string }
  #
  # -------------------------------------

  updateSizes = ( values ) ->
    values = $.extend( _defaultValues, values )
    sizes  = []
    text   = ''

    for key in [ 'base', 'alternate', 'ratio' ]
      values[ key ] = parseFloat( values[ key ], 10 )

    calculateSizes = ( size, ascending ) ->
      if ascending
        while size <= values.maximum
          sizes.push( Math.round( size ) )
          size *= values.ratio
      else
        while size >= values.minimum
          sizes.push( Math.round( size ) )
          size /= values.ratio

    for value in [ values.base, values.alternate ]
      for direction in [ true, false ]
        calculateSizes( value, direction )

    sizes =  _.uniq( _.sortBy( sizes, ( num ) -> return num ) )

    for size in sizes
      text += """
        <li class='#{ _settings.itemClass }'>
          <span class='#{ _settings.itemLabelClass }'>#{ size }px</span>
          <span class='#{ _settings.itemPreviewClass }' style='font-size: #{ size }px;'>#{ values.text || '&nbsp;' }</span>
        </li>
      """

    _settings.element.html( text )

  # -------------------------------------
  #   Public Methods
  # -------------------------------------

  init        : init
  updateSizes : updateSizes

# -------------------------------------
#   Usage
# -------------------------------------
#
# ScaleSize.Scale.init()
#
# ScaleSize.Scale.updateSizes()
#   alternate : 24
#   base      : 16
#   ratio     : 1.5
#   text      : 'This is sample text'
#
