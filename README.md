## Deprecated - please use [dbgeo](https://github.com/jczaplew/dbgeo) instead.

# MySQL2GeoJSON
A Node.js module for returning MySQL query results as usable [GeoJSON](http://geojson.org/) or [TopoJSON](https://github.com/mbostock/topojson) objects. Ideally paired with [node-mysql](https://github.com/felixge/node-mysql).

###### Installation
````npm install mysql2geojson````


###### Example Usage
````
var mysql2geojson = require("mysql2geojson");

// MySQL query...

mysql2geojson.parse({
	"data": data,
	"format": "geojson",
	"callback": function(error, result) {
		if (error) {
		   console.log(error);
		}
		// This will log a valid GeoJSON object
		console.log(result)
	}
});

````

## API

### parse(params)
params is an object that contains the following keys:

+ data (*required*) - Results from a MySQL query. *Geometry must be selected AsWKT*.
+ format - can be either "geojson" or "topojson". Default is "geojson".
+ geometry - name of column that contains geometry. Default is "geometry".
+ callback(error, result) (*required*) - a function with two parameters: an error, and a result object


## License
CC0


