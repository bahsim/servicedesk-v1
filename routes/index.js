
const path = require('path');
const registry = require('./registry');
const record = require('./record');

module.exports = (app, db) => {
	
	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname, '..','frontend/user.html'));
  });
	
	registry(app, db);
	record(app, db);
  
}
