var fs   = require("fs-extra");
var path = require("path");

var dirname = "./i", toDirname = "./dist";
var list = fs.readdirSync(dirname);

list.forEach(function(name){
	
	var fromPath = path.join(dirname, name);
	var toPath   = path.join(toDirname, name.replace(/.*?(\d+\.png)/, function(str, name){
		return name;
	}));
	
	fs.copySync( fromPath, toPath );
});
