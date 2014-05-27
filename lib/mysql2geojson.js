(function() {
  var async = require("async"),
    wellknown = require("wellknown"),
    topojson = require("topojson");

  var mysql2geojson = {};

  mysql2geojson.parse = function(params) {
    if (!params.data || !params.callback) {
      return params.callback("You must provide a value for both 'data' and 'callback'", null);
    }
    if (!params.format) {
      params.format = "geojson";
    }
    if (!params.geometry) {
      params.geometry = "geometry";
    }

    async.waterfall([
      function(callback) {
        var output = { "type": "FeatureCollection", "features": [] };

        async.each(params.data, function(row, geomCallback) {
          var parsedRow = { "type": "Feature", "geometry": wellknown(row[params.geometry]) };

          if (Object.keys(row).length > 1) {
            parsedRow.properties = {};
            async.each(Object.keys(row), function(property, propCallback) {
              if (property !== params.geometry) {
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
          if (params.format === "topojson") {
            callback(null, topojson.topology({ output: output }));
          } else {
            callback(null, output);
          }
        });
      }
    ],function(error, data) {
      if (error) {
        params.callback(error, null);
      } else {
        params.callback(null, data);
      }
    });

  }

  module.exports = mysql2geojson;
}());