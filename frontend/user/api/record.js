
export function getRecord(id, resolve, reject) {
	fetch('/record/' + id)
		.then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response;
		})
		.then((response) 	=> response.json())
		.then((value) 		=> resolve(value))
		.catch((error) 		=> reject(error))
}

export function createRecord(record, resolve, reject) {
	fetch('/record', { 
		method: 'POST', 
		body: JSON.stringify(record),
	}).then((response) => {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response;
	}).then((response) 	=> response.json())
		.then((value) 		=> resolve(value))
		.catch((error) 		=> reject(error))
}

export function refreshRecord(id, record, resolve, reject) {
	fetch('/record/' + id, { 
		method: 'PUT', 
		body: 	JSON.stringify(record) 
	}).then((response) => {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response;
	}).then((response) 	=> response.json())
		.then((value) 		=> resolve(value))
		.catch((error) 		=> reject(error))
}

export function markRecord(id, record, resolve, reject) {
	fetch('/record/' + id + '/mark', {
		method: 'PUT',
		body: 	JSON.stringify(record) 
	}).then((response) => {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response;
	}).then((response) 	=> response.json())
		.then((value) 		=> resolve(value))
		.catch((error) 		=> reject(error))
}
