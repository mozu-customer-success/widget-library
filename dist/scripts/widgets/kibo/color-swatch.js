define(['backbone', 'modules/jquery-mozu', 'hyprlivecontext'], function (backbone, $, hyprlivecontext) { 'use strict';

  backbone = backbone && backbone.hasOwnProperty('default') ? backbone['default'] : backbone;
  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  hyprlivecontext = hyprlivecontext && hyprlivecontext.hasOwnProperty('default') ? hyprlivecontext['default'] : hyprlivecontext;

  var style = ".widget--color-swatch {\n  border: 1px dotted crimson;\n}\n";

  const injectStyleSheet = function (css) {
    if (!css) return;
    if (typeof window == "undefined") return;
    var style = document.createElement("style");
    style.setAttribute("media", "screen");
    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
  };
  window.hooks = {};
  var tools = {
    injectStyleSheet
  };

  const config = require.mozuData("kiboWidgetColorSwatchConfig");

  function colorSwatch (options) {
    $(() => {
      tools.injectStyleSheet(style); //fetch colors from page model

      let productListBefore = window.hooks.productListBefore || (x => x);

      window.hooks.productListBefore = function (html) {
        //modify partial
        $(html).find("mz-facetlist").append("<some html i made with the appropriate data-mz-facet or what have you>"); //call any other functions assigned to productListBefore

        return productListBefore(html);
      };

      let productListAfter = window.hooks.productListAfter || (x => x);

      window.hooks.productListAfter = function (doc) {//assign click handlers if necessary
      };
    });
  }

  return colorSwatch;

});
