
const ObjectID = require('mongodb').ObjectID
const { getRequestBody } = require('../modules/misc');
const path = require('path');
const fs = require('fs');

const i18n = require('../i18n')

module.exports = (app, db) => {
	
	app.post('/record', (req, res) => {
		getRequestBody(req, (body) => {
			
			body.deleted = false;
			body.history = false;
			body.created = (new Date()).getTime();
			
			db.collection('registry').insertOne(body, (err, result) => {
				if (err) 
					return console.log(err)
				
				const insertedId = result.insertedId;
				
				const query = {
					deleted: false,
					history: false,
				};
				db.collection('registry').find(query).toArray((err, result) => {
					if (err) 
						return console.log(err)
					
					res.json({
						registry: result,
						insertedId: insertedId,
					})
				})
			})
		})
	})
	
	app.get('/record/:id', (req, res) => {
		let record = db.collection('registry')
			.findOne({ 
				"_id": ObjectID(req.params.id)
			})
			.then(
				(record) => res.json(record)
			)
	})
	
	app.put('/record/:id', (req, res) => {
		getRequestBody(req, (body) => {
			const record = body;
			const { 
				status, 
				statusView, 
				clientInfo, 
				deviceInfo, 
				componentParts,
				footNote,
			} = record
			
			db.collection('registry')
				.findOneAndUpdate({
					_id: ObjectID(req.params.id)
				}, {
					$set: { 
						status: status,
						statusView: statusView,
						clientInfo: clientInfo,
						deviceInfo: deviceInfo,
						componentParts: componentParts,
						footNote: footNote,
					}
				}, {
					sort: {_id: -1},
					upsert: true
				}, (err, result) => {
					if (err) 
						return res.send(err)
					
					const query = {
						deleted: false,
						history: false,
					};
					db.collection('registry').find(query).toArray((err, result) => {
						if (err) 
							return console.log(err)
						
						res.json(result)
					})
				})
		})
	})
	
	app.put('/record/:id/mark/', (req, res) => {
		getRequestBody(req, (body) => {
			const record = body;
			const { 
				status, 
				statusView, 
				clientInfo, 
				deviceInfo, 
				componentParts,
				footNote,
				deleted,
				history,
			} = record
			
			db.collection('registry')
				.findOneAndUpdate({
					_id: ObjectID(req.params.id)
				}, {
					$set: { 
						status: status,
						statusView: statusView,
						clientInfo: clientInfo,
						deviceInfo: deviceInfo,
						componentParts: componentParts,
						footNote: footNote,
						deleted: deleted,
						history: history,
					}
				}, {
					sort: {_id: -1},
					upsert: true
				}, (err, result) => {
					if (err) 
						return res.send(err)
					
					const query = {
						deleted: false,
						history: false,
					};
					db.collection('registry').find(query).toArray((err, result) => {
						if (err) 
							return console.log(err)
						
						res.json(result)
					})
				})
		})
	})

	app.get('/record/:id/check', (req, res) => {
		let record = db.collection('registry')
			.findOne({ 
				"_id": ObjectID(req.params.id)
			})
			.then(
				(record) => sendPrintCheck(req, res, record)
			)
	})
	
}

function sendPrintCheck(req, res, record) {
	if (!req.query.lang) res.end('');
	if (req.query.lang !== 'ru' && req.query.lang !== 'en') res.end('');
	
	const myPath = path.join(__dirname, '..','frontend/check.html');
	let html = fs.readFileSync(myPath,'utf8')
	
	html = htmlPutData(html, i18n[req.query.lang])
	html = htmlPutData(html, record)
	
	res.end(html);
}

function htmlPutData(html, data) {
	var html02 = html;
	for (key in data) {
		html02 = html02.replace(new RegExp("{" + key + "}",'g'), data[key]);
	}
	return html02;
}
