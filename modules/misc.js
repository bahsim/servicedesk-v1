
module.exports.getRequestBody = (req, callback) => {
	
	let body = '';
	
	req.on('data', (data) => {
		body += data;
		if (body.length > 1e6) { 
			req.connection.destroy()
		}
	});
	
	req.on('end', () => {
		if (isValidJson(body)) {
			return callback(JSON.parse(body))
		} else {
			return '';
		}
	});	
	
	function isValidJson(json) {
		try {
			JSON.parse(json);
			return true;
		} catch (e) {
			return false;
		}
	}
}
