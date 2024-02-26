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

function getColor(magnitude) {
  if (magnitude <= 10) return "green";
  else if (magnitude > 10 && magnitude <= 30) return "yellow";
  else if (magnitude > 30 && magnitude <= 50) return "orange";
  else if (magnitude > 50 && magnitude <= 70) return "red";
  else if (magnitude > 70 && magnitude <= 90) return "purple";
  else return "blue"; // Add more color categories as needed
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
      fillcolor: getColor(mag),
      color: "black",
        };

    let marker = L.circleMarker({lat: lat, lng: lon}, circleOptions);
    marker.bindPopup(
      `<h3> ${feature.properties.place} </h3> <hr> <h2> ${mag} </h2>`
      );
    marker.addTo(map);
   
    });
   
   //L.control.layers(baseMaps, {
   //  collapsed: false
   //}).addTo(map);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 30, 50, 70, 90],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

})

   