/**
 * @module params
 * 
 * This module handles the extraction and merging of parameters from different sources:
 * - Default parameters
 * - URL parameters
 * - Parameters specified in a script tag's parent node attribute
 * 
 * It uses the `d3.autoType` function to automatically infer the types of the parameters.
 * 
 * @requires d3.autoType
 *
 */

import { autoType } from 'd3';

const paramsAttribute = 'data-params';

const defaultParams = {
	dataUrl: 'data.csv'
};

const urlParamsObj = new URLSearchParams(window.location.search);
const urlParams = Object.fromEntries(urlParamsObj);
const wrapParams =
	JSON.parse(document?.currentScript?.parentNode?.getAttribute(paramsAttribute) || '{}') || {};

export const params = {
	...defaultParams,
	...autoType(wrapParams),
	...autoType(urlParams)
};
