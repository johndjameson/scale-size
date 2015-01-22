# *************************************
#
#   Input Set
#   -> Shared value input elements
#
# *************************************
#
# @param element       { jQuery object }
# @param dataAttribute { string }
#
# *************************************

@ScaleSize.InputSet = ( options ) ->
  settings = $.extend
    element       : $( '[ data-inputSet ]' )
    dataAttribute : 'inputSet'

  settings.dataAttribute = settings.dataAttribute.toLowerCase()

  settings.element.each ->
    element = $(@)
    query = "[ data-#{ settings.dataAttribute }='#{ element.data( settings.dataAttribute ) }' ]"
    matches = settings.element.filter( query )

    element.on 'input', ->
      matches.val( element.val() )

# -------------------------------------
#   Usage
# -------------------------------------
#
# ScaleSize.InputSet()
#
