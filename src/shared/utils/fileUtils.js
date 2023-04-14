/**
 * Downloads an array buffer file.
 * @param {Blob} arrayBuffer The array buffer.
 * @param {string} type The type of the file (application/pdf, text/plain, ...).
 * @param {string} fileName The name of the file.
 */

export const downloadArrayBufferFile = (arrayBuffer, type, fileName) => {
	const file = new Blob([arrayBuffer], { type })

	let element = document.createElement('a')
	element.style.display = 'none'
	element.setAttribute('href', URL.createObjectURL(file))
	element.setAttribute('download', fileName)
	document.body.appendChild(element)
	element.click()
	document.body.removeChild(element)
}
