
export function getRegistry(resolve, reject) {
	fetch('/registry/current')
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

export function getRegistryHistory(start, end, resolve, reject) {
	fetch('/registry/history?start=' + start + '&end=' + end)
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
