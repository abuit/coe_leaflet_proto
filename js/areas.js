var AbstractArea = L.Polygon.extend({

    //Global size settings
    globalSettings: {
        pixelInMeter: 128,
        pixelInKilometer: 128/1000,
        pixelInSquareMeter: 128*128,
        pixelInSquareKilometer: 128*128/1000000
    },
    
    initialize: function(name, segments) {
        this.name = name;

        //Initialize segments
        var segmentCount = segments.length;
    
        var polygonLine = segments[0].segment;
        for (var i = 1; i < segmentCount; i++) {
            polygonLine = polygonLine.addSegment(segments[i].segment);
        }

        L.Polygon.prototype.initialize.call(this, polygonLine);

        this.size = area(polygonLine) * this.globalSettings.pixelInSquareKilometer,
        this.coastline = segments.filter(item => item.type == 'continent').reduce((size, item) => size + item.segment.segmentLength(), 0) * this.globalSettings.pixelInKilometer,
        this.kingdomBorder = segments.filter(item => item.type == 'kingdom').reduce((size, item) => size + item.segment.segmentLength(), 0) * this.globalSettings.pixelInKilometer
    },

    //https://www.npmjs.com/package/area-polygon
    area: function(points,signed) {
        var l = points.length
        var det = 0
        var isSigned = signed || false
    
        points = points.map(normalize)
        if (points[0] != points[points.length -1])  
        points = points.concat(points[0])
    
        for (var i = 0; i < l; i++)
        det += points[i].x * points[i + 1].y
            - points[i].y * points[i + 1].x
        if (isSigned)
        return det / 2
        else
        return Math.abs(det) / 2
    },
    
    normalize: function(point) {
        if (Array.isArray(point))
        return {
            x: point[0],
            y: point[1]
        }
        else
        return point
    }

});

var Kingdom = AbstractArea.extend({

    initialize: function(name, segments) {
        AbstractArea.prototype.initialize.call(this, name, segments);
        this.name = name;

        L.setOptions(this, { 
            color: 'black', 
            weight: 5,
            opacity: .5, 
            fillOpacity: 0 
        });

        this.on("click", this.event_click)
    },

    event_click(e) {
        console.log(e);
        var popup = L.popup()
        .setContent('<p>' + this.name + '<br />Size of kingdom: ' + Math.round(this.size) + ' km2</p><p>Coastline: ' + Math.round(this.coastline) + 'km</p>')
        .setLatLng(e.latlng)
        .openOn(map);

        map.openPopup(popup);
    }

});

var Duchy = AbstractArea.extend({

    initialize: function(name, biome, race, segments) {
        AbstractArea.prototype.initialize.call(this, name, segments);
        this.name = name;
        this.biome = biome;
        this.race = race;

        L.setOptions(this, { 
            color: 'red', 
            weight: 2,
            opacity: .5, 
            fillOpacity: 0 
        });

        this.on("mouseover", this.event_mouseover);
        this.on("mouseout", this.event_mouseout);
        this.on("click", this.event_click);
    },

    event_mouseover(e) {
        if (map.getZoom() != 1) return;

        this.setStyle(
            {
                color: 'red', 
                weight: 2,
                opacity: .5, 
                fillOpacity: 0.1
            }
        );
    },

    event_mouseout(e) {
        this.setStyle(
            {
                color: 'red', 
                weight: 2,
                opacity: .5, 
                fillOpacity: 0
            }
        );
    },

    event_click(e) {
        var popup = L.popup()
        .setContent('<p>Duchy name: <b>'+ this.name + '</b></p>'  + 
                    '<i>Quick facts:</i>' +
                    '<table>' +
                    '<tr><td>Biome:</td><td>' + this.biome + '</td></tr>'  + 
                    '<tr><td>Primary race:</td><td>' +this.race + '</td></tr>'  + 
                    '<tr><td>Size of duchy:</td><td>' + Math.round(this.size) + ' km2 </td></tr>'  + 
                    '<tr><td>Coastline:</td><td>' + (this.coastline == 0 ? '<i>None</i>' : Math.round(this.coastline) + ' km') + '</td></tr>'  + 
                    '<tr><td>Kingdom border:</td><td>' + (this.kingdomBorder == 0 ? '<i>None</i>' : Math.round(this.kingdomBorder) + ' km') + '</td></tr>'  + 
                    '</table>')
        .setLatLng(e.latlng)
        .openOn(map);

        map.openPopup(popup);
    }

});

var segmentInfo = JSON.parse(sessionStorage.getItem('segmentInfo'));

//this variable is used to reference all kingdoms
var kingdomBorders = new L.FeatureGroup();
kingdomBorders.addLayer(new Kingdom("A'K", [segmentInfo.C13, segmentInfo.C14, segmentInfo.C15, segmentInfo.C16, segmentInfo.C17, segmentInfo.C18, segmentInfo.C19, segmentInfo.K32, segmentInfo.K31, segmentInfo.K30, segmentInfo.K19, segmentInfo.K18b, segmentInfo.K18, segmentInfo.K17, segmentInfo.K16, segmentInfo.K15, segmentInfo.K14, segmentInfo.K13, segmentInfo.K12]));

//this variable is used to reference all duchies
var duchyBorders = new L.FeatureGroup();
duchyBorders.addLayer(new Duchy('Unknown', 'Grasslands', 'Neran', [segmentInfo.C13, segmentInfo.D64, segmentInfo.D65, segmentInfo.K13, segmentInfo.K12]));
duchyBorders.addLayer(new Duchy('Lem', 'Grasslands', 'Neran', [segmentInfo.C14, segmentInfo.D67, segmentInfo.D66, segmentInfo.D64]));
duchyBorders.addLayer(new Duchy('Unknown', 'Grasslands', 'Neran', [segmentInfo.K14, segmentInfo.K15, segmentInfo.K16, segmentInfo.D71, segmentInfo.D70, segmentInfo.D68, segmentInfo.D66, segmentInfo.D65]));
duchyBorders.addLayer(new Duchy('Unknown', 'Grasslands', 'Neran', [segmentInfo.C15, segmentInfo.D69, segmentInfo.D68, segmentInfo.D67]));
duchyBorders.addLayer(new Duchy('Unknown', 'Woodland Savannah', "To'Resk", [segmentInfo.C16, segmentInfo.D69, segmentInfo.D70, segmentInfo.D72, segmentInfo.D73, segmentInfo.D74]));
duchyBorders.addLayer(new Duchy('Unknown', 'Woodland Savannah', "To'Resk", [segmentInfo.D71, segmentInfo.D72, segmentInfo.D75, segmentInfo.D77, segmentInfo.K18, segmentInfo.K17]));
duchyBorders.addLayer(new Duchy('Unknown', 'Woodland Savannah', "To'Resk", [segmentInfo.D75, segmentInfo.D78, segmentInfo.D79, segmentInfo.D76, segmentInfo.D73]));
duchyBorders.addLayer(new Duchy('Unknown', 'Woodland Savannah', "To'Resk", [segmentInfo.C17, segmentInfo.D80, segmentInfo.D76, segmentInfo.D74]));
duchyBorders.addLayer(new Duchy('Unknown', 'Swamp', 'Dras', [segmentInfo.K18b, segmentInfo.D81, segmentInfo.D83, segmentInfo.D82, segmentInfo.D78, segmentInfo.D77]));
duchyBorders.addLayer(new Duchy('Unknown', 'Swamp', 'Dras', [segmentInfo.C18, segmentInfo.D80, segmentInfo.D79, segmentInfo.D82, segmentInfo.D84]));
duchyBorders.addLayer(new Duchy('Unknown', 'Swamp', 'Dras', [segmentInfo.K19, segmentInfo.K30, segmentInfo.D85, segmentInfo.D81]));
duchyBorders.addLayer(new Duchy('Unknown', 'Swamp', 'Dras', [segmentInfo.K31, segmentInfo.K32, segmentInfo.C19, segmentInfo.D84, segmentInfo.D83, segmentInfo.D85]));