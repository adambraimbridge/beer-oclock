const querystring = require('querystring')

const authenticate = (httpMethod, token) => {
	// console.log(token)
	if (httpMethod !== 'POST') {
		throw new Error('405')
	}
	const { SLACK_TOKEN } = process.env
	if (!token || token !== SLACK_TOKEN) {
		throw new Error('401')
	}
	console.log('Authentication successful')
}

exports.handler = async request => {
	// console.log({ request })

	const { httpMethod, body } = request
	const { payload } = querystring.parse(body)
	const { token, response_url } = JSON.parse(payload)

	console.log(JSON.parse(payload))

	try {
		authenticate(httpMethod, token)
		return {
			statusCode: 200,
			body: 'Cheers 🍻',
		}
	} catch (error) {
		const statusCode = (!!error.message && parseInt(error.message)) || 422
		const body =
			statusCode === 401
				? 'Unauthorized'
				: statusCode === 405
				? 'Method Not Allowed'
				: statusCode === 422
				? 'Unprocessable Entity'
				: 'Unknown error'

		console.error({
			statusCode,
			body,
		})

		return {
			statusCode,
			body,
		}
	}
}
