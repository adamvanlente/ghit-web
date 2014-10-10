/*
 * Ghit landing page is not JS heavy.  This is simply some vanilla JS
 * to get a holder scroll position and adjust its opacity accordingly.
 * Just dim the element as it comes in and out of view.
 *
 */


// Get location of a holder.
function getHolderLocation() {
    var holders = document.getElementsByClassName('nav_holder');
    for (var i = 0; i < holders.length; i++) {
        var holder = holders[i];

        var bodyElement = document.body.getBoundingClientRect();
        var el = holder.getBoundingClientRect();
        var loc = el.top - bodyElement.top;

        setHolderOpacity(holder, loc);
    }
}

function setHolderOpacity(element, location) {
  var distanceScrolled = pageYOffset;
  var pos = location - distanceScrolled;

  var distanceOpacity = 1000 / pos;
  distanceOpacity = Math.abs(parseInt(distanceOpacity));
  element.style.opacity = (distanceOpacity * .10);
}

function checkForIeVersions() {
  var html = document.querySelector('html');
  var browserType = html.className;

  if (browserType == 'ie6' || browserType == 'ie7' ||
      browserType == 'ie8' || browserType == 'ie9') {
    var holders = document.getElementsByTagName('*');
    for (var i = 0; i < holders.length; i++) {
      if (holders[i].className == 'nav_holder') {
          holders[i].style.display = 'none';
      }
      if (holders[i].className == 'ieBlock') {
          holders[i].style.display = 'block';
      }
    }

    return false;
  }
  return true;
}

// Set a scroll listener
(function setScrollListeners() {

  var proceedWithFunStuff = checkForIeVersions();
  if (proceedWithFunStuff) {
      if (window.addEventListener) {
        window.addEventListener('scroll', function(evt) {
            getHolderLocation()
          });
      } else {
        window.attachEvent('scroll', function(evt) {
            getHolderLocation()
          });
      }
  }
})()
