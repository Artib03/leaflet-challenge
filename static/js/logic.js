Geodata = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   });
   
   let baseMaps = {
     "Street Map": streetmap
   };
   
   //let overlayMaps = {
     //"Earthquake magnitude": 
   //};
   
   let map = L.map("map", {
    center : [39.74739, -105],
    zoom: 4,
     layers: [streetmap]
   });

function radius(magnitude) {
  return magnitude *5;
}

d3.json(Geodata).then(function(response) {

    let features = response.features
   
    features.forEach(function(feature) {

    console.log(feature)

    let coords = feature.geometry.coordinates
    let lon =  coords[0]
    let lat = coords[1]
    let mag = feature.properties.mag;

    let circleOptions = {
      radius: radius(mag),
      color: "Earth"
    };
    let marker = L.circleMarker({lat: lat, lng: lon}, circleOptions);
    marker.bindPopup(
      `<h3> ${feature.properties.place} </h3> <hr> <h2> ${mag} </h2>`
      );
    marker.addTo(map);
   
    })
   
  //  L.control.layers(baseMaps, {
  //    collapsed: false
  //  }).addTo(map);

//    var legend = L.control({ position: 'bottomright' })
//   legend.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend')
//     var limits = choroplethLayer.options.limits
//     var colors = choroplethLayer.options.colors
//     var labels = []

//     let legendInfo = "<h1>Population with Children<br />(ages 6-17)</h1>" +
//     "<div class=\"labels\">" +
//       "<div class=\"min\">" + limits[0] + "</div>" +
//       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//     "</div>";

//     div.innerHTML = legendInfo;

//     limits.forEach(function(limit, index) {
//       labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     return div;
// }
// legend.addTo(map)

})

   