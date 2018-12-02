/**
 *  Simple node.js style script loader for modern browsers
 **/
function loadScript(src, cb) {
    var script = document.createElement('script');
    script.async = true;
    script.src = src;
  
    script.onerror = function() {
      cb(new Error("Failed to load" + src));
    };
  
    script.onload = function() {
      cb();
    };
  
    document.getElementsByTagName("head")[0].appendChild(script);
  }
  
  module.exports = loadScript;