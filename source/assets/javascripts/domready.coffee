# *************************************
#
#   Document Ready
#
# *************************************

jQuery ($) ->

  ScaleSize.InputSet()

  ScaleSize.Scale.init()

  $( 'input, textarea' ).on 'input', ->
    ScaleSize.Scale.updateSizes
      base      : $( '#base' ).val()
      alternate : $( '#alternate' ).val()
      ratio     : $( '#ratio' ).val()
      text      : $( '#text' ).val()
