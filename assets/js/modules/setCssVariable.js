/**
 * @module
 *
 * @export
 *
 * @description Sets css variable to document
 *
 * @param { string } property - without '--'
 *
 * @param { string } value
 *
 * @return { void }
 * **/
export function setCssVariable(property = '', value = '')
{
	document.documentElement.style.setProperty('--' + property, value);
}