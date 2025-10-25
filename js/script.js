(function (global) {
  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";

  dc.loadHome = function () {
    $ajaxUtils.sendGetRequest(allCategoriesUrl, function (categories) {
      $ajaxUtils.sendGetRequest(homeHtmlUrl, function (homeHtml) {
        var randomShortName = chooseRandomCategory(categories);
        randomShortName = "'" + randomShortName + "'";
        var finalHtml = insertProperty(homeHtml, "randomCategoryShortName", randomShortName);
        insertHtml("#main-content", finalHtml);
      }, false);
    }, true);
  };

  function chooseRandomCategory(categories) {
    var index = Math.floor(Math.random() * categories.length);
    return categories[index].short_name;
  }

  function insertProperty(string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    return string.replace(new RegExp(propToReplace, "g"), propValue);
  }

  function insertHtml(selector, html) {
    var targetElem = document.querySelector(selector);
    if (targetElem) {
      targetElem.innerHTML = html;
    }
  }

  global.$dc = dc;
})(window);

document.addEventListener("DOMContentLoaded", function () {
  if (window.$dc && typeof $dc.loadHome === "function") {
    $dc.loadHome();
  }
});
