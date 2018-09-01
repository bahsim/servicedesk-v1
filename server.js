
const express = require('express');
const app = express();

const config = require('./config')
const routes = require('./routes');

const appPort = process.env.PORT 			|| config.appPort;
const appMode = process.env.NODE_ENV 	|| config.appMode;

const dbClient = require('mongodb').MongoClient;
const dbPath = process.env.MONGO_URI 	|| config.dbPath;
const dbName = process.env.MONGO_DB 	|| config.dbName;

if (appMode === 'development') {
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const webpackConfig = require('./webpack.config');
	const webpackCompiler = webpack(webpackConfig);
	
	app.use(
		webpackDevMiddleware(webpackCompiler, { 
			noInfo: true, 
			publicPath: webpackConfig.output.publicPath 
		})
	);
	
	app.use(
		webpackHotMiddleware(webpackCompiler)
	);
}

app.use(express.static(config.pathStatic));

dbClient.connect(dbPath, { useNewUrlParser: true }, 
	(err, client) => {
		if (err) 
			return console.log(err);
		
		routes(app, client.db(dbName));
		
		app.listen(appPort, (error) => { 
			if (error) 
				return console.error(error);
			
			console.log("Server started on port", appPort);
		});
	}
)
