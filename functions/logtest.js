exports.handler = async (event, context) => {
	console.log(event)
	console.log(context)
	return {
		statusCode: 200,
		body:
			'<body style="text-align: center; padding: 10rem;"><h1>Is it 🍺⏰?</h1></body>',
	}
}
