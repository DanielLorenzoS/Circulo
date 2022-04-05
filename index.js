let img = document.getElementById('img');
let nav = document.querySelector('.nav');
let title = document.querySelector('.title');
let menu = document.querySelector('.img-menu');

// img.style.marginTop = '0'
nav.style.marginRight = '0'
title.style.marginLeft = '10px'
menu.style.marginRight = '10px'


let btn = document.getElementById('btn');
let card1 = document.getElementById('s1');
let card2= document.getElementById('s2');
let card3 = document.getElementById('s3');
let card4 = document.getElementById('s4');

let services = document.querySelector('.services')

let options = {
	threshold: 0.5
}

let verifyVisibility = (entries) => {
	let entry = entries[0];
    if (entry.isIntersecting) {
    	card1.setAttribute('class', 'serviceCenter');
    	card2.setAttribute('class', 'serviceCenter');
		  card3.setAttribute('class', 'serviceCenter');
		  card4.setAttribute('class', 'serviceCenter');
    }
}
const observer = new IntersectionObserver(verifyVisibility, options);
    
observer.observe(services);

let phone = document.getElementById('phone');
let maps = document.getElementById('map');
let form = document.getElementById('form');
let footer = document.getElementById('footer');

const verify = (entries) => {
  const entry = entries[0];
    if (entry.isIntersecting) {
      phone.style.marginTop = '20px';
      maps.style.marginTop = '20px';
      form.style.marginTop = '20px';
    }
}

const observador = new IntersectionObserver(verify);
    
observador.observe(footer);



function initMap() {
  const polanco = { lat: 19.433797973738496, lng: -99.19090478692605 };
  const chicago = new google.maps.LatLng(19.433797973738496, -99.19090478692605);
  const map = new google.maps.Map(document.getElementById("map"), {
    center: chicago,
    zoom: 16,
  });

  const marker = new google.maps.Marker({
    position: polanco,
    map: map,
  });
}

const TILE_SIZE = 256;


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

