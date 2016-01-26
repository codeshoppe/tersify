//     Overcoat.js 0.0.1
//     http://codeshoppe.github.io/purplecoat.js
//     http://codeshoppe.io
//     (c) 2014 Jennifer Reyes, Code Shoppe
//     Overcoat may be freely distributed under the MIT license.

(function ( $, Bacon ) {
  "use strict";


  var overcoatOn,
      handleResize,
      styleOvercoat,
      off,
      on;

  overcoatOn = function($mannequin) {
    var overcoatId    = "overcoat-" + Date.now().toString(),
        overcoatLabel = $mannequin.prop("tagName"),
        overcoatStyle = $.extend(styleOvercoat($mannequin), {'display': 'none'}),
        $overcoat;

    $mannequin
      .data('overcoat-id', overcoatId)
      .removeClass('overcoat-off')
      .addClass('overcoat-on');

    $overcoat = $('<div class="overcoat" />')
      .attr('id', overcoatId)
      .text(overcoatLabel)
      .css(overcoatStyle)
      .appendTo("body")
      .fadeIn();

    handleResize($mannequin, $overcoat);
  };

  handleResize = function($mannequin, $overcoat) {
    $(window).asEventStream('resize')
      .throttle(300)
      .onValue(function() {
        var overcoatStyle;

        if ($overcoat.is(':visible')) {
          overcoatStyle = styleOvercoat($mannequin);
          $overcoat.css(overcoatStyle);
        }
      });
  };

  styleOvercoat = function($mannequin) {
    var boundingBox     = $mannequin[0].getBoundingClientRect(),
        mannequinOffset = $mannequin.offset();

    return {
      'position': 'absolute',
      'top': mannequinOffset.top,
      'left': mannequinOffset.left,
      'width': boundingBox.width,
      'height': boundingBox.height,

      'background-color': "rgba(125, 211, 201, 0.6)",
      'color': 'rgb(255, 255, 255)',

      'z-index': 9999,
      'text-align': 'center',
      'line-height': boundingBox.height.toString() + "px",
      'font-size': $mannequin.css('font-size')
    };
  };


  off = function() {
    $(".overcoat").remove();
    $(".overcoat-off, .overcoat-on").removeClass('overcoat-off overcoat-on');
  };

  on = function() {
    $("h1, h2, h3, h4, h5, h6").each(function(i, e) {
      var $mannequin = $(e);
      overcoatOn($mannequin);
    });
  };


  window.Tersify = {
    on: on,
    off: off
  };



}( jQuery, Bacon ));
