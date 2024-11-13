/**
 * @store LocalData
 * 
 * This module defines a `LocalData` class that manages data stored in the browser's local storage.
 * It provides methods to serialize and deserialize the data, and automatically updates the local storage
 * whenever the data changes.
 * 
 * @method constructor - Initializes the data from local storage and sets up an effect to update local storage when the data changes.
 * @method serialize - Converts the data to a JSON string for storage.
 * @method deserialize - Parses the JSON string from storage back into an object.
 * 
 */

class LocalData {
	value = $state();
	key = 'duv-local-storage';

	constructor() {
		const item = localStorage.getItem(this.key);
		if (item) this.value = this.deserialize(this.item);

		// fetch data from a JSON file and add logic to merge local storage with newly fetched data
		// json(dataUrl).then((d) => {
		// 	this.value = d.json_output || d;
		// });

		$effect(() => {
			localStorage.setItem(this.key, this.serialize(this.value));
		});
	}

	serialize(value) {
		return JSON.stringify(value);
	}

	deserialize(item) {
		return JSON.parse(item);
	}
}

export const data = new LocalData();