// This function asks the server for a "service" and converts the response to text. 
//taken from assignment 3 example
function loadJSON(service, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('POST', service, false);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }
  
  // This function makes a navigation bar from a products_data object. taken from Assignment 3 example
  
  function nav_bar(this_product_key, products_data) {
    // This makes a navigation bar to other product pages
    for (products_key in products_data) {
      if (products_key == this_product_key) continue;
      document.write(
        `<a href=./products_display.html?products_key=${products_key}>${products_key}</a>
          `);
    }
  }
  function cart_bar(this_product_key, products_data) {
    // This makes a navigation bar to other product pages
    for (products_key in products_data) {
      if (products_key == this_product_key) continue;
      document.write(
        `<a href=./cart_display.html?products_key=${products_key}>${products_key}</a>
          `);
    }
  }
  
  //taken from assingment 3 example
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }