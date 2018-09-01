
module.exports = (app, db) => {
	
	app.get('/registry/current', (req, res) => {
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
	
	app.get('/registry/history', (req, res) => {
		let start = new Date(req.query.start);
		let end = new Date(req.query.end);
		
		start.setHours(0);
		start.setMinutes(0);
		start.setSeconds(0);
		
		end.setHours(23);
		end.setMinutes(59);
		end.setSeconds(59);
		
		const startEpoch = start.getTime();
		const endEpoch 	= end.getTime();
		
		const query = { 
			$and: [
				{$or: [ 
					{ deleted: true }, 
					{ history: true },
				]},
				{ created: { $gte: startEpoch	} },
				{ created: { $lte: endEpoch		} },
			]
		};
		
		db.collection('registry').find(query).toArray((err, result) => {
			if (err) 
				return console.log(err)
			
			res.json(result)
		})
	})
}
