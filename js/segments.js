// This function converts an array of pixel coordinates from an image tool, to lat/long coordinates usable by leaflet.
function convertToLatLong(e) {
    e.forEach(function (item) {
        var x = item[0];
        var y = item[1];
        // Change coordinates to start 0,0 in bottom-left instead of top-left
        y = 2048 - y;

        // Change to lat/long structure
        item[0] = y;
        item[1] = x;
    })

    return e;
}

// Yea yea, bad practice
Array.prototype.addSegment = function (segment) {
    var myFirstCoordinate = this[0];
    var myLastCoordinate = this[this.length - 1];
    var segmentFirstCoordinate = segment[0];
    var segmentLastCoordinate = segment[segment.length - 1];

    var nothingToAdd = segment.length == 0;

    if (coordinateMatches(myLastCoordinate, segmentFirstCoordinate)) {
        return nothingToAdd ? this : this.concat(segment.slice(1));
    }
    else if (coordinateMatches(myLastCoordinate, segmentLastCoordinate)) {
        return nothingToAdd ? this : this.concat(segment.reverse().slice(1));
    }
    else if (coordinateMatches(myFirstCoordinate, segmentLastCoordinate)) {
        return nothingToAdd ? this : segment.concat(this.slice(1));
    }
    else if (coordinateMatches(myFirstCoordinate, segmentFirstCoordinate)) {
        return nothingToAdd ? this : segment.reverse().concat(this.slice(1));
    }
    else {
        throw "Cannot connect segments";
    }
}

// Yea yea, bad practice
Array.prototype.segmentLength = function () {
    var from = this[0];
    var totalPx = 0;

    this.slice(1).forEach(function (item) {

        var distX = from[0] - item[0];
        var distY = from[1] - item[1];

        from = item;

        totalPx += Math.hypot(distX, distY);
    });

    return totalPx;
}

function coordinateMatches(a, b) {
    if (a == undefined || a[0] == undefined || a[1] == undefined ||
        b == undefined || b[0] == undefined || b[1] == undefined)
        throw "Invalid coordinate";

    return a[0] == b[0] && a[1] == b[1];
}


//Strategy for now is to define elementary segments and create polygons out of them.
//The level of elementary segments we have right now is duchy borders.

//When the lines of lowest level fixed borders (counties?) are known, it might be easer to union counties to duchies, duchies to kingdoms.
//Use https://github.com/voidqk/polybooljs for that

//Segments are generally in the direction from low to high (e.g. C10 - C11). For drawing polygons, reversing the array might be needed.

//Data for continent
sessionStorage.setItem('segmentInfo', JSON.stringify({
    C13: {
        segment: convertToLatLong([
            [1119, 984],
            [1125, 982],
            [1136, 973],
            [1138, 965],
            [1142, 960],
            [1137, 950],
            [1146, 944],
            [1154, 941],
            [1169, 940],
            [1178, 935],
            [1189, 938],
            [1199, 935],
            [1200, 927],
            [1206, 925],
            [1213, 927]]),
        type: 'continent'
    },
    C14: {
        segment: convertToLatLong([
            [1213, 927],
            [1222, 926],
            [1240, 944],
            [1249, 959],
            [1261, 955],
            [1267, 957],
            [1273, 957],
            [1281, 965],
            [1292, 968],
            [1295, 980],
            [1297, 981],
            [1308, 989],
            [1315, 991],
            [1314, 1009],
            [1307, 1016],
            [1307, 1026],
            [1302, 1034],
            [1311, 1040],
            [1313, 1048],
            [1327, 1066]]),
        type: 'continent'
    },
    C15: {
        segment: convertToLatLong([
            [1327, 1066],
            [1335, 1067],
            [1340, 1072],
            [1348, 1072],
            [1348, 1080],
            [1342, 1087],
            [1334, 1092],
            [1336, 1097],
            [1335, 1112],
            [1329, 1117],
            [1328, 1125],
            [1323, 1131],
            [1319, 1132],
            [1322, 1140]]),
        type: 'continent'
    },
    C16: {
        segment: convertToLatLong([
            [1322, 1140],
            [1327, 1149],
            [1327, 1153],
            [1321, 1163],
            [1330, 1179],
            [1330, 1188],
            [1326, 1193],
            [1326, 1197],
            [1333, 1204],
            [1333, 1210],
            [1339, 1211],
            [1346, 1217],
            [1336, 1228],
            [1336, 1234]]),
        type: 'continent'
    },
    C17: {
        segment: convertToLatLong([
            [1336, 1234],
            [1339, 1245],
            [1347, 1249],
            [1355, 1248],
            [1362, 1250],
            [1364, 1254],
            [1362, 1264],
            [1371, 1269],
            [1372, 1272],
            [1376, 1271],
            [1382, 1272],
            [1389, 1269],
            [1405, 1278],
            [1405, 1282],
            [1413, 1284],
            [1417, 1290],
            [1399, 1291],
            [1393, 1296],
            [1394, 1304],
            [1391, 1306],
            [1373, 1305],
            [1368, 1309],
            [1368, 1313],
            [1373, 1316],
            [1378, 1325],
            [1378, 1335],
            [1384, 1343],
            [1378, 1353],
            [1370, 1355],
            [1372, 1365],
            [1368, 1373]]),
        type: 'continent'
    },
    C18: {
        segment: convertToLatLong([
            [1368, 1373],
            [1372, 1383],
            [1370, 1391],
            [1369, 1397],
            [1367, 1402],
            [1372, 1415],
            [1371, 1422],
            [1361, 1428],
            [1343, 1423],
            [1338, 1428],
            [1325, 1426],
            [1322, 1428],
            [1319, 1442],
            [1310, 1448],
            [1301, 1447],
            [1296, 1443]]),
        type: 'continent'
    },
    C19: {
        segment: convertToLatLong([
            [1296, 1443],
            [1292, 1448],
            [1287, 1449],
            [1287, 1457],
            [1291, 1462],
            [1290, 1469],
            [1283, 1476],
            [1275, 1476],
            [1270, 1509],
            [1266, 1515],
            [1266, 1521],
            [1253, 1532]]),
        type: 'continent'
    },
    K12: {
        segment: convertToLatLong([
            [1119, 984],
            [1110, 998],
            [1098, 1003],
            [1092, 1034]]),
        type: 'kingdom'
    },
    K13: {
        segment: convertToLatLong([
            [1092, 1034],
            [1093, 1044],
            [1104, 1057],
            [1102, 1077]]),
        type: 'kingdom'
    },
    K14: {
        segment: convertToLatLong([
            [1102, 1077],
            [1096, 1092],
            [1109, 1114],
            [1111, 1159]]),
        type: 'kingdom'
    },
    K15: {
        segment: convertToLatLong([
            [1111, 1159],
            [1110, 1168],
            [1107, 1177]]),
        type: 'kingdom'
    },
    K16: {
        segment: convertToLatLong([
            [1107, 1177],
            [1138, 1191],
            [1159, 1218]]),
        type: 'kingdom'
    },
    K17: {
        segment: convertToLatLong([
            [1159, 1218],
            [1166, 1228],
            [1164, 1247],
            [1166, 1260],
            [1178, 1269],
            [1179, 1284],
            [1173, 1300],
            [1173, 1309]]),
        type: 'kingdom'
    },
    K18: {
        segment: convertToLatLong([
            [1173, 1309],
            [1173, 1324]]),
        type: 'kingdom'
    },
    K18b: {
        segment: convertToLatLong([
            [1173, 1324],
            [1171, 1332],
            [1165, 1340]]),
        type: 'kingdom'
    },
    K19: {
        segment: convertToLatLong([
            [1165, 1340],
            [1132, 1359],
            [1131, 1388],
            [1119, 1406],
            [1117, 1412]]),
        type: 'kingdom'
    },
    K30: {
        segment: convertToLatLong([
            [1117, 1412],
            [1132, 1424],
            [1136, 1439],
            [1156, 1464],
            [1158, 1481],
            [1157, 1496],
            [1161, 1509],
            [1175, 1516]]),
        type: 'kingdom'
    },
    K31: {
        segment: convertToLatLong([
            [1175, 1516],
            [1197, 1522],
            [1202, 1530],
            [1212, 1533],
            [1228, 1529],
            [1233, 1528],
            [1239, 1531]]),
        type: 'kingdom'
    },
    K32: {
        segment: convertToLatLong([
            [1239, 1531],
            [1253, 1532]]),
        type: 'kingdom'
    },
    D64: {
        segment: convertToLatLong([
            [1213, 927],
            [1214, 939],
            [1216, 950],
            [1221, 960],
            [1219, 966],
            [1224, 980],
            [1223, 987],
            [1222, 994],
            [1223, 998],
            [1221, 1004],
            [1224, 1014],
            [1225, 1021],
            [1223, 1024],
            [1222, 1029],
            [1214, 1037],
            [1212, 1048],
            [1204, 1055],
            [1203, 1058]]),
        type: 'duchy'
    },
    D65: {
        segment: convertToLatLong([
            [1203, 1058],
            [1187, 1062],
            [1183, 1061],
            [1175, 1065],
            [1168, 1066],
            [1157, 1066],
            [1152, 1063],
            [1151, 1067],
            [1141, 1074],
            [1129, 1077],
            [1122, 1078],
            [1115, 1081],
            [1109, 1078],
            [1102, 1077]]),
        type: 'duchy'
    },
    D66: {
        segment: convertToLatLong([
            [1203, 1058],
            [1208, 1062],
            [1210, 1066],
            [1215, 1072],
            [1216, 1076],
            [1223, 1080],
            [1232, 1081],
            [1236, 1083]]),
        type: 'duchy'
    },
    D67: {
        segment: convertToLatLong([
            [1236, 1083],
            [1245, 1077],
            [1250, 1073],
            [1254, 1071],
            [1257, 1071],
            [1259, 1073],
            [1264, 1074],
            [1269, 1075],
            [1274, 1074],
            [1297, 1075],
            [1302, 1074],
            [1313, 1069],
            [1321, 1069],
            [1327, 1066]]),
        type: 'duchy'
    },
    D68: {
        segment: convertToLatLong([
            [1236, 1083],
            [1235, 1088],
            [1238, 1095],
            [1239, 1113],
            [1235, 1118],
            [1235, 1124],
            [1232, 1128],
            [1231, 1144]]),
        type: 'duchy'
    },
    D69: {
        segment: convertToLatLong([
            [1231, 1144],
            [1242, 1143],
            [1253, 1137],
            [1292, 1143],
            [1303, 1138],
            [1309, 1138],
            [1315, 1140],
            [1322, 1140]]),
        type: 'duchy'
    },
    D70: {
        segment: convertToLatLong([
            [1231, 1144],
            [1216, 1148],
            [1207, 1160],
            [1194, 1166],
            [1181, 1167],
            [1175, 1177]]),
        type: 'duchy'
    },
    D71: {
        segment: convertToLatLong([
            [1175, 1177],
            [1160, 1186],
            [1159, 1218]]),
        type: 'duchy'
    },
    D72: {
        segment: convertToLatLong([
            [1175, 1177],
            [1189, 1197],
            [1189, 1201],
            [1192, 1201],
            [1198, 1206],
            [1208, 1207],
            [1218, 1215],
            [1224, 1217],
            [1229, 1217],
            [1234, 1223],
            [1237, 1227],
            [1239, 1232],
            [1244, 1238],
            [1250, 1241],
            [1255, 1241],
            [1258, 1244]]),
        type: 'duchy'
    },
    D73: {
        segment: convertToLatLong([
            [1258, 1244],
            [1268, 1239],
            [1279, 1239],
            [1284, 1237],
            [1290, 1238],
            [1294, 1238],
            [1300, 1242],
            [1306, 1245],
            [1314, 1246],
            [1318, 1244],
            [1323, 1244]]),
        type: 'duchy'
    },
    D74: {
        segment: convertToLatLong([
            [1323, 1244],
            [1328, 1241],
            [1336, 1234]]),
        type: 'duchy'
    },
    D75: {
        segment: convertToLatLong([
            [1258, 1244],
            [1257, 1251],
            [1259, 1265],
            [1257, 1271],
            [1256, 1278],
            [1251, 1283],
            [1248, 1288],
            [1238, 1295],
            [1241, 1300],
            [1247, 1314],
            [1244, 1320],
            [1244, 1322],
            [1239, 1327],
            [1238, 1333],
            [1236, 1335],
            [1234, 1349]]),
        type: 'duchy'
    },
    D76: {
        segment: convertToLatLong([
            [1323, 1244],
            [1327, 1251],
            [1326, 1261],
            [1332, 1271],
            [1332, 1274],
            [1330, 1278],
            [1331, 1283],
            [1331, 1291],
            [1335, 1298],
            [1335, 1304],
            [1338, 1308],
            [1338, 1327],
            [1343, 1336],
            [1344, 1341],
            [1344, 1351],
            [1349, 1358],
            [1350, 1363]]),
        type: 'duchy'
    },
    D77: {
        segment: convertToLatLong([
            [1234, 1349],
            [1221, 1345],
            [1212, 1337],
            [1197, 1336],
            [1188, 1327],
            [1173, 1324]]),
        type: 'duchy'
    },
    D78: {
        segment: convertToLatLong([
            [1234, 1349],
            [1242, 1361],
            [1255, 1362],
            [1272, 1357],
            [1283, 1360],
            [1293, 1357],
            [1308, 1357],
            [1317, 1354]]),
        type: 'duchy'
    },
    D79: {
        segment: convertToLatLong([
            [1317, 1354],
            [1321, 1352],
            [1341, 1362],
            [1350, 1363]]),
        type: 'duchy'
    },
    D80: {
        segment: convertToLatLong([
            [1350, 1363],
            [1358, 1364],
            [1362, 1368],
            [1363, 1372],
            [1368, 1373]]),
        type: 'duchy'
    },
    D81: {
        segment: convertToLatLong([
            [1165, 1340],
            [1162, 1348],
            [1162, 1351],
            [1164, 1354],
            [1165, 1361],
            [1167, 1366],
            [1175, 1372],
            [1177, 1377],
            [1178, 1386],
            [1180, 1390],
            [1187, 1396],
            [1188, 1400],
            [1191, 1402],
            [1195, 1402],
            [1204, 1408],
            [1211, 1414],
            [1212, 1418],
            [1212, 1425],
            [1217, 1432]]),
        type: 'duchy'
    },
    D82: {
        segment: convertToLatLong([
            [1282, 1426],
            [1284, 1420],
            [1288, 1417],
            [1288, 1409],
            [1303, 1392],
            [1304, 1386],
            [1305, 1385],
            [1306, 1381],
            [1310, 1379],
            [1314, 1375],
            [1313, 1372],
            [1314, 1367],
            [1313, 1359],
            [1317, 1354]]),
        type: 'duchy'
    },
    D83: {
        segment: convertToLatLong([
            [1217, 1432],
            [1223, 1432],
            [1229, 1436],
            [1235, 1437],
            [1244, 1436],
            [1249, 1436],
            [1262, 1431],
            [1269, 1427],
            [1282, 1426]]),
        type: 'duchy'
    },
    D84: {
        segment: convertToLatLong([
            [1282, 1426],
            [1288, 1434],
            [1289, 1438],
            [1292, 1442],
            [1296, 1443]]),
        type: 'duchy'
    },
    D85: {
        segment: convertToLatLong([
            [1217, 1432],
            [1215, 1435],
            [1212, 1440],
            [1208, 1442],
            [1207, 1449],
            [1205, 1453],
            [1206, 1456],
            [1206, 1464],
            [1203, 1467],
            [1203, 1474],
            [1205, 1478],
            [1205, 1480],
            [1202, 1484],
            [1198, 1485],
            [1198, 1486],
            [1193, 1490],
            [1189, 1497],
            [1185, 1502],
            [1183, 1508],
            [1175, 1516]]),
        type: 'duchy'
    }
}));