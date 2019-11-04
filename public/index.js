const findOut = event => {
	console.log('Finding out')
	!!event && event.preventDefault
}
document.querySelector('#find-out').onclick = findOut
