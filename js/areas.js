//Global size settings
const pixelInMeter = 128;
const pixelInKilometer = 128/1000;
const pixelInSquareMeter = 128*128;
const pixelInSquareKilometer = 128*128/1000000;

//this variable is used to reference all kingdoms
var kingdomBorders = new L.FeatureGroup();

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

createKingdom("A'K", [ContinentSegments.C13, ContinentSegments.C14, ContinentSegments.C15, ContinentSegments.C16, ContinentSegments.C17, ContinentSegments.C18, ContinentSegments.C19, KingdomSegments.K32, KingdomSegments.K31, KingdomSegments.K30, KingdomSegments.K19, KingdomSegments.K18b, KingdomSegments.K18, KingdomSegments.K17, KingdomSegments.K16, KingdomSegments.K15, KingdomSegments.K14, KingdomSegments.K13, KingdomSegments.K12]);

//this variable is used to reference all duchies
var duchyBorders = new L.FeatureGroup();

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
        console.log(e);
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

createDuchy('Unknown', 'Grasslands', 'Neran', [ContinentSegments.C13, DuchyBorderSegments.D64, DuchyBorderSegments.D65, KingdomSegments.K13, KingdomSegments.K12]);
createDuchy('Lem', 'Grasslands', 'Neran', [ContinentSegments.C14, DuchyBorderSegments.D67, DuchyBorderSegments.D66, DuchyBorderSegments.D64]);
createDuchy('Unknown', 'Grasslands', 'Neran', [KingdomSegments.K14, KingdomSegments.K15, KingdomSegments.K16, DuchyBorderSegments.D71, DuchyBorderSegments.D70, DuchyBorderSegments.D68, DuchyBorderSegments.D66, DuchyBorderSegments.D65]);
createDuchy('Unknown', 'Grasslands', 'Neran', [ContinentSegments.C15, DuchyBorderSegments.D69, DuchyBorderSegments.D68, DuchyBorderSegments.D67]);
createDuchy('Unknown', 'Woodland Savannah', "To'Resk", [ContinentSegments.C16, DuchyBorderSegments.D69, DuchyBorderSegments.D70, DuchyBorderSegments.D72, DuchyBorderSegments.D73, DuchyBorderSegments.D74]);
createDuchy('Unknown', 'Woodland Savannah', "To'Resk", [DuchyBorderSegments.D71, DuchyBorderSegments.D72, DuchyBorderSegments.D75, DuchyBorderSegments.D77, KingdomSegments.K18, KingdomSegments.K17]);
createDuchy('Unknown', 'Woodland Savannah', "To'Resk", [DuchyBorderSegments.D75, DuchyBorderSegments.D78, DuchyBorderSegments.D79, DuchyBorderSegments.D76, DuchyBorderSegments.D73]);
createDuchy('Unknown', 'Woodland Savannah', "To'Resk", [ContinentSegments.C17, DuchyBorderSegments.D80, DuchyBorderSegments.D76, DuchyBorderSegments.D74]);
createDuchy('Unknown', 'Swamp', 'Dras', [KingdomSegments.K18b, DuchyBorderSegments.D81, DuchyBorderSegments.D83, DuchyBorderSegments.D82, DuchyBorderSegments.D78, DuchyBorderSegments.D77]);
createDuchy('Unknown', 'Swamp', 'Dras', [ContinentSegments.C18, DuchyBorderSegments.D80, DuchyBorderSegments.D79, DuchyBorderSegments.D82, DuchyBorderSegments.D84]);
createDuchy('Unknown', 'Swamp', 'Dras', [KingdomSegments.K19, KingdomSegments.K30, DuchyBorderSegments.D85, DuchyBorderSegments.D81]);
createDuchy('Unknown', 'Swamp', 'Dras', [KingdomSegments.K31, KingdomSegments.K32, ContinentSegments.C19, DuchyBorderSegments.D84, DuchyBorderSegments.D83, DuchyBorderSegments.D85]);