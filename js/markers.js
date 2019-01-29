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

const Settlement = L.Marker.extend({

    initialize: function(lat, lng, name, type, persist) {
        L.Marker.prototype.initialize.call(this, [lat, lng]);
        this.name = name;
        this.type = type;
        this.typeCaps = type.charAt(0).toUpperCase() + type.slice(1);

        L.setOptions(this, { 
            title: this.name, 
            icon: this.getIcon()
        });
    },

    getIcon() {
        switch(this.type) {
            case "outpost": return oupostIcon;
            case "hamlet": return hamletIcon;
            case "fort": return fortIcon;
            case "village": return villageIcon;
            case "keep": return keepIcon;
            case "town": return townIcon;
            case "stronghold": return strongholdIcon;
            case "city": return cityIcon;
            case "castle": return castleIcon;
            case "capital": return capitalIcon;
        };
    },

    getLayer() {
        switch(this.type) {
            case "outpost": return minuteMarkers;
            case "hamlet": return minuteMarkers;
            case "fort": return minuteMarkers;
            case "village": return minuteMarkers;
            case "keep": return lowMarkers;
            case "town": return lowMarkers;
            case "stronghold": return mediumMarkers;
            case "city": return mediumMarkers;
            case "castle": return highMarkers;
            case "capital": return highMarkers;
        };
    }

});

//Initialize from storage
var markers = JSON.parse(localStorage.getItem("markers"))
markers.forEach(function(marker) {
    var x = new Settlement(marker.lat, marker.lng, marker.name, marker.type);
    x.bindPopup('<b>' + x.name + '</b> (' + x.typeCaps + ')');
    x.addTo(x.getLayer());
})

//Handler to create a new marker
function createMarker(lat, lng) {
    var name = document.getElementById('poiname');
    var type = document.getElementById('poitype');
    if (name.value != "" && type.value != "") {
        map.closePopup(creationPopup);
        
        var x =  new Settlement(lat, lng, name.value, type.value);
        x.bindPopup('<b>' + x.name + '</b> (' + x.typeCaps + ')');
        x.addTo(x.getLayer());
        
        //Persist
        var markers = JSON.parse(localStorage.getItem("markers"));
        markers.push({ name: x.name, lat: lat, lng: lng, type: x.type});
        localStorage.setItem('markers', JSON.stringify(markers));
    }
    else if (name.value == ''){
        name.focus();
    }
    else {
        type.focus();
    }
}