(function() {
  var async = require("async"),
    wellknown = require("wellknown"),
    topojson = require("topojson");

  var mysql2geojson = {};

  mysql2geojson.parse = function(data, format, callback) {
    async.waterfall([
      function(callback) {
        var output = { "type": "FeatureCollection", "features": [] };

        async.each(data, function(row, geomCallback) {
          var parsedRow = { "type": "Feature", "geometry": wellknown(row.geometry) };

          if (Object.keys(row).length > 1) {
            parsedRow.properties = {};
            async.each(Object.keys(row), function(property, propCallback) {
              if (property != "geometry") {
                parsedRow.properties[property] = row[property];
              }
              propCallback();
            }, function(error) {
              output.features.push(parsedRow)
              geomCallback();
            });
          } else {
            output.features.push(parsedRow)
            geomCallback();
          }
          
        },
        function(err) {
          if (format === "topojson") {
            callback(null, topojson.topology({ output: output }));
          } else {
            callback(null, output);
          }
        });
      }
    ],function(error, data) {
      if (error) {
        callback(error);
      } else {
        callback(data);
      }
    });

  }

  module.exports = mysql2geojson;
}());