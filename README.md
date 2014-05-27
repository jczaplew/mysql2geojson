# MySQL2GeoJSON
A Node.js module for returning MySQL query results as usable [GeoJSON](http://geojson.org/) or [TopoJSON](https://github.com/mbostock/topojson) objects. 

###### Example Usage
````
var mysql2geojson = require("mysql2geojson");

// MySQL query...

mysql2geojson.parse(data, "geojson", function(result) {
    // This will log a valid GeoJSON object
    console.log(result);
});

````

## API

### parse(data, format, callback(output))
**Arguments** (all are required)

+ data - Results from a MySQL query. *Geometry must be stored in a field named 'geometry'*.
+ format - can be either "geojson" or "topojson"
+ callback - a function with one parameter that returns the output of the query


## License
CC0


