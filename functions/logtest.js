exports.handler = function(event, context, callback) {
	console.log('Testing ...')
	console.log(event, context, callback)
	callback(null, {
		statusCode: 200,
		body: 'Hello, World',
	})
}
