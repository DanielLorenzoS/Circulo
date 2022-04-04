
let btn = document.getElementById('btn');
let card1 = document.getElementById('s1');
let card2= document.getElementById('s2');
let card3 = document.getElementById('s3');
let card4 = document.getElementById('s4');

let services = document.querySelector('.services')

let options = {
	threshold: 1.0
}

const verifyVisibility = (entries) => {
	const entry = entries[0];
    if (entry.isIntersecting) {
    	card1.setAttribute('class', 'serviceCenter');
    	card2.setAttribute('class', 'serviceCenter');
		card3.setAttribute('class', 'serviceCenter');
		card4.setAttribute('class', 'serviceCenter');
    }
}
const observer = new IntersectionObserver(verifyVisibility, options);
    
observer.observe(services);

function initMap() {
  const chicago = new google.maps.LatLng(19.433797973738496, -99.19090478692605);
  const map = new google.maps.Map(document.getElementById("map"), {
    center: chicago,
    zoom: 15,
  });
  const coordInfoWindow = new google.maps.InfoWindow();

  coordInfoWindow.setContent(createInfoWindowContent(chicago, map.getZoom()));
  coordInfoWindow.setPosition(chicago);
  coordInfoWindow.open(map);
  map.addListener("zoom_changed", () => {
    coordInfoWindow.setContent(createInfoWindowContent(chicago, map.getZoom()));
    coordInfoWindow.open(map);
  });
}

const TILE_SIZE = 256;

function createInfoWindowContent(latLng, zoom) {
  const scale = 1 << zoom;
  const worldCoordinate = project(latLng);
  const pixelCoordinate = new google.maps.Point(
    Math.floor(worldCoordinate.x * scale),
    Math.floor(worldCoordinate.y * scale)
  );
  const tileCoordinate = new google.maps.Point(
    Math.floor((worldCoordinate.x * scale) / TILE_SIZE),
    Math.floor((worldCoordinate.y * scale) / TILE_SIZE)
  );
  return [
    "Polanco, CDMX",
    "LatLng: " + latLng,
    "Zoom level: " + zoom,
    "World Coordinate: " + worldCoordinate,
    "Pixel Coordinate: " + pixelCoordinate,
    "Tile Coordinate: " + tileCoordinate,
  ].join("<br>");
}

// The mapping between latitude, longitude and pixels is defined by the web
// mercator projection.
function project(latLng) {
  let siny = Math.sin((latLng.lat() * Math.PI) / 180);

  // Truncating to 0.9999 effectively limits latitude to 89.189. This is
  // about a third of a tile past the edge of the world tile.
  siny = Math.min(Math.max(siny, -0.9999), 0.9999);
  return new google.maps.Point(
    TILE_SIZE * (0.5 + latLng.lng() / 360),
    TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
  );
}

