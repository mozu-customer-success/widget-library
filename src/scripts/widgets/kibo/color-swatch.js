import style from "stylesheets/color-swatch.less";
import Backbone from "backbone";
import tools from "tools";
import $ from "modules/jquery-mozu";
import context from "hyprlivecontext";

const config = require.mozuData("kiboWidgetColorSwatchConfig");

export default function(options) {
  $(() => {
    tools.injectStyleSheet(style);
    //fetch colors from page model
    let productListBefore = window.hooks.productListBefore || (x => x);
    window.hooks.productListBefore = function(html) {
      //modify partial
      $(html)
        .find("mz-facetlist")
        .append(
          "<some html i made with the appropriate data-mz-facet or what have you>"
        );
      //call any other functions assigned to productListBefore
      return productListBefore(html);
    };
    let productListAfter = window.hooks.productListAfter || (x => x);
    window.hooks.productListAfter = function(doc) {
      //assign click handlers if necessary
    };
  });
}
