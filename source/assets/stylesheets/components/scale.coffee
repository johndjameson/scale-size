# *************************************
#
#   Scale
#   -> Enumeration of sizes
#
# *************************************
#
# @param element { jQuery object }
#
# *************************************

@ScaleSize.Scale = do ->

  # -------------------------------------
  #   Private Variables
  # -------------------------------------

  _settings      = {}
  _defaultValues =
    base      : 16
    alternate : 30
    ratio     : 1.6
    text      : 'Lorem ipsum dolor sit amet'

  # -------------------------------------
  #   Initialize
  # -------------------------------------

  init = ( options ) ->
    _settings = $.extend
      element : $( '.js-scale' )
    , options

    updateSizes()

  # -------------------------------------
  #   Update Sizes
  # -------------------------------------

  updateSizes = ( values ) ->
    values = $.extend( _defaultValues, values )
    text   = ''

    for key in [ 'base', 'alternate', 'ratio' ]
      values[ key ] = parseFloat( values[ key ], 10 )

    # TODO: Make this work.

    for index in [ values.base .. values.alternate ]
      text += """
        <li class='scale-item'>
          <span class='scale-item-label'>#{ index }px</span>
          <span class='scale-item-preview' style='font-size: #{ index }px;'>#{ values.text }</span>
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
