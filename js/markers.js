//Kingdom markers
var kingdomMarkers = new L.FeatureGroup();

var K1Marker = L.imageOverlay('img/1.png', [[880, 1190], [730, 1340]]);
K1Marker.addTo(kingdomMarkers);

var K2Marker = L.imageOverlay('img/2.png', [[400, 1050], [500, 1150]]);
K2Marker.addTo(kingdomMarkers);

var K3Marker = L.imageOverlay('img/3.png', [[1560, 960], [1460, 1060]]);
K3Marker.addTo(kingdomMarkers);

var K4Marker = L.imageOverlay('img/4.png', [[620, 820], [720, 920]]);
K4Marker.addTo(kingdomMarkers);

var K5Marker = L.imageOverlay('img/5.png', [[1030, 950], [1130, 1050]]);
K5Marker.addTo(kingdomMarkers);

//High markers - Persistent markers at lowest detail level
//Medium markers - Persistent markers at medium level
//Low markers - Persistent markers at highest detail level

var highMarkers = new L.FeatureGroup();
var mediumMarkers = new L.FeatureGroup();
var lowMarkers = new L.FeatureGroup();
var minuteMarkers = new L.FeatureGroup();

var oupostIcon = L.icon({
    iconUrl: 'img/markers/1-outpost.svg',
    iconSize: [25, 25],
    iconAnchor: [5, 5]
});

var hamletIcon = L.icon({
    iconUrl: 'img/markers/1-hamlet.svg',
    iconSize: [25, 25],
    iconAnchor: [12, 12]
});

var fortIcon = L.icon({
    iconUrl: 'img/markers/2-fort.svg',
    iconSize: [25, 25],
    iconAnchor: [12, 12]
});

var villageIcon = L.icon({
    iconUrl: 'img/markers/2-village.svg',
    iconSize: [25, 25],
    iconAnchor: [12, 12]
});

var keepIcon = L.icon({
    iconUrl: 'img/markers/3-keep.svg',
    iconSize: [25, 25],
    iconAnchor: [12, 12]
});

var townIcon = L.icon({
    iconUrl: 'img/markers/3-town.svg',
    iconSize: [25, 25],
    iconAnchor: [12, 12]
});

var strongholdIcon = L.icon({
    iconUrl: 'img/markers/4-stronghold.svg',
    iconSize: [25, 25],
    iconAnchor: [12, 12]
});

var cityIcon = L.icon({
    iconUrl: 'img/markers/4-city.svg',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
});

var castleIcon = L.icon({
    iconUrl: 'img/markers/5-castle.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

var capitalIcon = L.icon({
    iconUrl: 'img/markers/5-capital.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

function getIcon(type) {
    var icon;
        switch(type) {
            case "outpost": icon = oupostIcon; break;
            case "hamlet": icon = hamletIcon; break;
            case "fort": icon = fortIcon; break;
            case "village": icon = villageIcon; break;
            case "keep": icon = keepIcon; break;
            case "town": icon = townIcon; break;
            case "stronghold": icon = strongholdIcon; break;
            case "city": icon = cityIcon; break;
            case "castle": icon = castleIcon; break;
            case "capital": icon = capitalIcon; break;
        };
    return icon;
}

function getLayer(type) {
    var layer;
    switch(type) {
        case "outpost": layer = minuteMarkers; break;
        case "hamlet": layer = minuteMarkers; break;
        case "fort": layer = minuteMarkers; break;
        case "village": layer = minuteMarkers; break;
        case "keep": layer = lowMarkers; break;
        case "town": layer = lowMarkers; break;
        case "stronghold": layer = mediumMarkers; break;
        case "city": layer = mediumMarkers; break;
        case "castle": layer = highMarkers; break;
        case "capital": layer = highMarkers; break;
    };
    return layer;
}

//Don't care for now
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function createMarker(lat, lng) {
    var name = document.getElementById('poiname');
    var type = document.getElementById('poitype');
    if (name.value != "" && type.value != "") {
        map.closePopup(creationPopup);
        
        L.marker([lat, lng], { title: name.value, icon: getIcon(type.value)}).addTo(getLayer(type.value)).bindPopup('<b>' + name.value + '</b> (' + type.value.capitalize() + ')');
        
        //Persist
        var markers = JSON.parse(localStorage.getItem("markers"));
        markers.push({ name: name.value, lat: lat, lng: lng, type: type.value});
        localStorage.setItem('markers', JSON.stringify(markers));
    }
    else if (name.value == ''){
        name.focus();
    }
    else {
        type.focus();
    }
}

//Initialize
var markers = JSON.parse(localStorage.getItem("markers"))
markers.forEach(function(marker) {

    L.marker([marker.lat, marker.lng], { title: marker.name, icon: getIcon(marker.type) }).addTo(getLayer(marker.type)).bindPopup('<b>' + marker.name + '</b> (' + marker.type.capitalize() + ')');
})