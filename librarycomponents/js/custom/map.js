/*
* Определение карты
*/
ymaps.ready(function() {
  var map_coordinates = [57.971789, 56.173147]; /*г. Пермь, ул. Нефтяников 27*/
  var map = new ymaps.Map("place", {
    center: map_coordinates,
    zoom: 12
  });
  var placemark = new ymaps.GeoObject({
    geometry: {
      type: "Point",
      coordinates: map_coordinates
    }
  });

  map.geoObjects.add(placemark);
  map.behaviors.disable('scrollZoom');

  function windowSize(){
    if (window.innerWidth <= 1199){
      map.behaviors.disable('drag');
    } else {
      map.behaviors.enable('drag');
    }
  }

  windowSize();    
  window.addEventListener('resize', function(event){
  	windowSize();
  });  
  window.addEventListener('load', function(event){
  	windowSize();
  });

});
