/**
 * @store Data
 * 
 * This module defines a `Data` class that fetches data from a JSON file and stores it in a reactive state.
 * It also provides a derived state based on the fetched data.
 * 
 */

import { json } from 'd3';

// can be taken from a params object
const dataUrl = 'data.json';

class Data {
	value = $state({});

	constructor() {
    // runs once when object is created
		json(dataUrl).then((d) => {
			this.value = d.json_output || d;
		});
	}

  // derived state
	derivedData = $derived(this.value);
}

// export a single instance of the Data class, this should only be done once per store and project
export const data = new Data();