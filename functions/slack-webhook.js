const querystring = require('querystring')
const axios = require('axios')

const authenticate = (httpMethod, token) => {
	if (httpMethod !== 'POST') {
		throw new Error({ statusCode: 405, body: 'Method Not Allowed' })
	}
	const { SLACK_TOKEN } = process.env
	if (!token || token !== SLACK_TOKEN) {
		throw new Error({ statusCode: 401, body: 'Unauthorized' })
	}
	console.log('Authentication successful')
}

exports.handler = async request => {
	console.log({ request })
	console.log(request)
	const { httpMethod, body } = request
	const { token } = querystring.parse(body)
	try {
		authenticate(httpMethod, token)
		// await axios.post(
		// 	response_url,
		// 	{
		// 		response_type: 'in_channel',
		// 		text,
		// 	},
		// 	{
		// 		headers: { 'content-type': 'application/json' },
		// 	}
		// )
		// return {
		// 	statusCode: 200,
		// }
	} catch (error) {
		console.error(error)
		return {
			// throw new Error({ statusCode: 405, body: 'Method Not Allowed' })
			// statusCode: 422, // Unprocessable Entity
			// body: error.message,
		}
	}
}
