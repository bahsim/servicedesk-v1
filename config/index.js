/*globals module */
/*
    Module to define all the Configurations required
*/
let Config = function () {
	return {
		appMode:	"production",
		//appMode:	"development",
		appPort:	"80",
		
		dbName:		"myDb",
		dbPath: 	"mongodb://localhost:27017", 
		
		pathStatic: "frontend/dist", 
	};
};

module.exports = new Config();