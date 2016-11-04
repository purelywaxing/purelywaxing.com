$('.pricing-tab').click( function() {
  $('.price-list').toggleClass('hidden');
  $('.pricing-tab').parent().toggleClass('active');
})

$('.image-selector input').change(function(e) {
  $(e.target).closest('.waxing-treatment').find('img.view').toggle();
})

function getParam(p){
  var match = RegExp('[?&]' + p + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getClientId(uaNumber) {
  var _ga = window[window.GoogleAnalyticsObject];
  if (_ga === undefined) {
    return;
  }
  var trackers = _ga.getAll();
  var i;

  for (i = 0; i < trackers.length; i++) {
    var _tracker = trackers[i];
    if (!uaNumber || _tracker.get('trackingId') === uaNumber) {
      return _tracker.get('clientId');
    }
  }
}

function transmitClientId(evt) {
  var clientId = getClientId();

  if(clientId) {
    iframe = $('iframe[src*=\'https://ovatu.com\']')[0].contentWindow;
    iframe.postMessage('clientId:' + clientId, 'https://ovatu.com');
  }
}

function addEvent(el, evt, fn) {
  if (el.addEventListener) {
    el.addEventListener(evt, fn);
  } else if (el.attachEvent) {
    el.attachEvent('on' + evt, function(evt) {
      fn.call(el, evt);
    });
  } else if (typeof el['on' + evt] === 'undefined' || el['on' + evt] === null) {
    el['on' + evt] = function(evt) {
      fn.call(el, evt);
    };
  }
}


addEvent(window, 'message', function(message) {
  if (message.data === 'ovatuLoaded' && message.origin === 'https://ovatu.com') {
    transmitClientId();
  }
});

var gclid = getParam('gclid');
if(gclid){
  var gclsrc = getParam('gclsrc');
  if(!gclsrc || gclsrc.indexOf('aw') !== -1){
    var request = new XMLHttpRequest();
    request.open('POST', 'https://id.purelywaxing.com/g.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send('gclid=' + gclid);
  }
}