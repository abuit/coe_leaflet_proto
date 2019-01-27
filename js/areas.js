//Global size settings
const pixelInMeter = 128;
const pixelInKilometer = 128/1000;
const pixelInSquareMeter = 128*128;
const pixelInSquareKilometer = 128*128/1000000;

function createKingdom(name, segments) {
    var segmentCount = segments.length;
    
    var coordinates = segments[0].segment;
    for (var i = 1; i < segmentCount; i++)
        coordinates = coordinates.addSegment(segments[i].segment);
    
    var polygon = L.polygon(coordinates, 
    { 
        color: 'black', 
        weight: 5,
        opacity: .5, 
        fillOpacity: 0 
    });

    polygon.info = {
        name : name,
        size : area(coordinates) * pixelInSquareKilometer,
        coastline: segments.filter(item => item.type == 'continent').reduce((size, item) => size + item.segment.segmentLength(), 0) * pixelInKilometer,
    };

    kingdomBorders.addLayer(polygon);

    polygon.on("click", function(e) {
        console.log(e);
        var popup = L.popup()
        .setContent('<p>' + e.target.info.name + '<br />Size of kingdom: ' + Math.round(e.target.info.size) + ' km2</p><p>Coastline: ' + Math.round(e.target.info.coastline) + 'km</p>')
        .setLatLng(e.latlng)
        .openOn(map);

        map.openPopup(popup);
    });
}

function createDuchy(name, biome, race, segments) {
    var segmentCount = segments.length;
    
    var coordinates = segments[0].segment;
    for (var i = 1; i < segmentCount; i++)
        coordinates = coordinates.addSegment(segments[i].segment);
    
    var polygon = L.polygon(coordinates, 
    { 
        color: 'red', 
        weight: 2,
        opacity: .5, 
        fillOpacity: 0 
    });

    polygon.info = {
        name: name,
        biome: biome,
        race: race,
        size : area(coordinates) * pixelInSquareKilometer,
        coastline: segments.filter(item => item.type == 'continent').reduce((size, item) => size + item.segment.segmentLength(), 0) * pixelInKilometer,
        kingdomBorder: segments.filter(item => item.type == 'kingdom').reduce((size, item) => size + item.segment.segmentLength(), 0) * pixelInKilometer
    };

    polygon.on("mouseover", function(e) {
        if (map.getZoom() != 1) return;

        //temp
        return;

        e.target.setStyle(
            {
                color: 'red', 
                weight: 2,
                opacity: .5, 
                fillOpacity: 0.1
            }
        );
    });

    polygon.on("mouseout", function(e) {
        e.target.setStyle(
            {
                color: 'red', 
                weight: 2,
                opacity: .5, 
                fillOpacity: 0
            }
        );
    });

    polygon.on("click", function(e) {
        var popup = L.popup()
        .setContent('<p>Duchy name: <b>'+ e.target.info.name + '</b></p>'  + 
                    '<i>Quick facts:</i>' +
                    '<table>' +
                    '<tr><td>Biome:</td><td>' + e.target.info.biome + '</td></tr>'  + 
                    '<tr><td>Primary race:</td><td>' + e.target.info.race + '</td></tr>'  + 
                    '<tr><td>Size of duchy:</td><td>' + Math.round(e.target.info.size) + ' km2 </td></tr>'  + 
                    '<tr><td>Coastline:</td><td>' + (e.target.info.coastline == 0 ? '<i>None</i>' : Math.round(e.target.info.coastline) + ' km') + '</td></tr>'  + 
                    '<tr><td>Kingdom border:</td><td>' + (e.target.info.kingdomBorder == 0 ? '<i>None</i>' : Math.round(e.target.info.kingdomBorder) + ' km') + '</td></tr>'  + 
                    '</table>')
        .setLatLng(e.latlng)
        .openOn(map);

        map.openPopup(popup);
    });

    duchyBorders.addLayer(polygon);
}

var segmentInfo = JSON.parse(sessionStorage.getItem('segmentInfo'));

//this variable is used to reference all kingdoms
var kingdomBorders = new L.FeatureGroup();

createKingdom("A'K", [segmentInfo.C13, segmentInfo.C14, segmentInfo.C15, segmentInfo.C16, segmentInfo.C17, segmentInfo.C18, segmentInfo.C19, segmentInfo.K32, segmentInfo.K31, segmentInfo.K30, segmentInfo.K19, segmentInfo.K18b, segmentInfo.K18, segmentInfo.K17, segmentInfo.K16, segmentInfo.K15, segmentInfo.K14, segmentInfo.K13, segmentInfo.K12]);

//this variable is used to reference all duchies
var duchyBorders = new L.FeatureGroup();

createDuchy('Unknown', 'Grasslands', 'Neran', [segmentInfo.C13, segmentInfo.D64, segmentInfo.D65, segmentInfo.K13, segmentInfo.K12]);
createDuchy('Lem', 'Grasslands', 'Neran', [segmentInfo.C14, segmentInfo.D67, segmentInfo.D66, segmentInfo.D64]);
createDuchy('Unknown', 'Grasslands', 'Neran', [segmentInfo.K14, segmentInfo.K15, segmentInfo.K16, segmentInfo.D71, segmentInfo.D70, segmentInfo.D68, segmentInfo.D66, segmentInfo.D65]);
createDuchy('Unknown', 'Grasslands', 'Neran', [segmentInfo.C15, segmentInfo.D69, segmentInfo.D68, segmentInfo.D67]);
createDuchy('Unknown', 'Woodland Savannah', "To'Resk", [segmentInfo.C16, segmentInfo.D69, segmentInfo.D70, segmentInfo.D72, segmentInfo.D73, segmentInfo.D74]);
createDuchy('Unknown', 'Woodland Savannah', "To'Resk", [segmentInfo.D71, segmentInfo.D72, segmentInfo.D75, segmentInfo.D77, segmentInfo.K18, segmentInfo.K17]);
createDuchy('Unknown', 'Woodland Savannah', "To'Resk", [segmentInfo.D75, segmentInfo.D78, segmentInfo.D79, segmentInfo.D76, segmentInfo.D73]);
createDuchy('Unknown', 'Woodland Savannah', "To'Resk", [segmentInfo.C17, segmentInfo.D80, segmentInfo.D76, segmentInfo.D74]);
createDuchy('Unknown', 'Swamp', 'Dras', [segmentInfo.K18b, segmentInfo.D81, segmentInfo.D83, segmentInfo.D82, segmentInfo.D78, segmentInfo.D77]);
createDuchy('Unknown', 'Swamp', 'Dras', [segmentInfo.C18, segmentInfo.D80, segmentInfo.D79, segmentInfo.D82, segmentInfo.D84]);
createDuchy('Unknown', 'Swamp', 'Dras', [segmentInfo.K19, segmentInfo.K30, segmentInfo.D85, segmentInfo.D81]);
createDuchy('Unknown', 'Swamp', 'Dras', [segmentInfo.K31, segmentInfo.K32, segmentInfo.C19, segmentInfo.D84, segmentInfo.D83, segmentInfo.D85]);