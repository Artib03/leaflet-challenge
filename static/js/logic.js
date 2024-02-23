Geodata = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(Geodata).then(function(response) {

    let location = response.features.geometry
   
    let mags = []

    location.forEach(function(location) {
   
    let marker = L.marker([location.lat, location.lon]).bindPopup(`<h3> ${location.type} </h3> <hr> <h2> ${location.coordinates} </h2>`)
   
     mags.push(marker)
   
    })

    let magnitudes = L.layerGroup(mags)
   
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   });
   
   let baseMaps = {
     "Street Map": streetmap
   };
   
   let overlayMaps = {
     "Earthquake magnitude": magnitudes
   };
   
   let map = L.map("map", {
     setView: ([39.74739, -105], 4),
     zoom: 12,
     layers: [streetmap, magnitude]
   });
   
   L.control.layers(baseMaps, overlayMaps, {
     collapsed: false
   }).addTo(map);

   var legend = L.control({ position: 'bottomright' })
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = choroplethLayer.options.limits
    var colors = choroplethLayer.options.colors
    var labels = []

    let legendInfo = "<h1>Population with Children<br />(ages 6-17)</h1>" +
    "<div class=\"labels\">" +
      "<div class=\"min\">" + limits[0] + "</div>" +
      "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
}
legend.addTo(myMap)

})

   