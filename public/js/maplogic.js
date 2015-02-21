var map = null;

function GetMap() {
  var cred = "Ain9coRfttDIm04OT_fUE8LmCEKAl9moAugoxS9DyXc8VcEr5eBIYAwnQ2sgA20g";
  map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), {
    credentials: cred
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locateSuccess, locateFail);
  } else {
    alert('Your browser does not support Geolocation : (  Jirani fails!');
  }
}

function locateSuccess(loc) {
  var userLocation = new Microsoft.Maps.Location(loc.coords.latitude, loc.coords.longitude);
  map.setView({
    center: userLocation,
    zoom: 17
  });
  var pin1 = new Microsoft.Maps.Pushpin(userLocation, {
    draggable: false,
    icon: "https://tucis.slack.com/emoji/smith/a146ff554bf40794.png",
    height: 128,
    width: 128
  });
  var pin2 = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(125, -11), {
    draggable: false,
    icon: "https://tucis.slack.com/emoji/smith/a146ff554bf40794.png",
    height: 128,
    width: 128
  });
  var pin3 = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(145, -10), {
    draggable: false,
    icon: "https://tucis.slack.com/emoji/smith/a146ff554bf40794.png",
    height: 128,
    width: 128
  });
  var pin4 = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(155, -100), {
    draggable: false,
    icon: "https://tucis.slack.com/emoji/smith/a146ff554bf40794.png",
    height: 128,
    width: 128
  });
  var pin5 = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(105, -120), {
    draggable: false,
    icon: "https://tucis.slack.com/emoji/smith/a146ff554bf40794.png",
    height: 128,
    width: 128
  });
  map.entities.push(pin1);
  map.entities.push(pin2);
  map.entities.push(pin3);
  map.entities.push(pin4);
  map.entities.push(pin5);
}

function locateFail(geoPositionError) {
  switch (geoPositionError.code) {
  case 0:
    alert('An unknown error occurred, sorry');
    break;
  case 1:
    alert('Permission to use Geolocation was denied');
    break;
  case 2:
    alert('Couldn\'t find you...');
    break;
  case 3:
    alert('The Geolocation request took too long and timed out');
    break;
  default:
  }
}