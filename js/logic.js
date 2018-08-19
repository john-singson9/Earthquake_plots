var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryURL, function(data) {
    createFeatures(data.features);
});

function markerSize(magnitude) {
    return magnitude * 50000;
}

function markerColor(magnitude) {

    if (magnitude > 5){
        return "darkred";
    }
    if (magnitude > 4){
        return "red";
    }
    if (magnitude > 3){
        return "darkorange";
    }
    if (magnitude > 2){
        return "orange";
    }
    if (magnitude > 1){
        return "yellow";
    }
    return "white";
}

function createFeatures(earthquakedata) {
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>"+feature.properties.place+"</h3><hr><p>"+
            new Date(feature.properties.time)+"</p><hr><p>"+
            "Magnitude:"+feature.properties.mag+"</p>");
    }

    function pointToLayer(feature, latlng) {
        return new L.circle(latlng,
        {radius: markerSize(feature.properties.mag),
        fillColor: markerColor(feature.properties.mag),
        fillOpacity: .8,
        color: "grey",
        weight: .5});
    }

   

    var earthquakes = L.geoJson(earthquakedata, {
        onEachFeature: onEachFeature,
        pointToLayer: pointToLayer
        
    });

    createmap(earthquakes);
}



function createmap(earthquakes) {

    // Create the tile layers that will be used for the map backgrounds
    //light layer
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });
        
    //street layer
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    });

    //satellite layer
    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
    });

    //dark layer
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });

    var basemap = {
        "Street Map": streetmap,
        "Dark Map": darkmap,
        "Satellite": satellitemap,
        "Light Map": lightmap
    };

    var overlaymap = {
        Earthquakes: earthquakes
    };

    //Create the map with the layers
    var myMap = L.map("map", {
        center: [39.82, -98.59],
        zoom: 4,
        layers: [darkmap, earthquakes]
    });

    L.control.layers(basemap, overlaymap, {
        collapsed: false
    }).addTo(myMap);

    //Legend
    var legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var color = ["darkred", "red", "darkorange", "orange", "yellow", "white"];
        magnitude = [5,4,3,2,1,0]
        var labels = [];
        var legendinfo = "<h3>Earthquake Magnitude</h3>" +
        "<div class=\"labels\">"+
        "</div>";

        div.innerHTML = legendinfo;

        magnitude.forEach(function(mag, index) {
            labels.push
        })
        
    };

}
