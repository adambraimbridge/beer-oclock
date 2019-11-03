const axios = require('axios')
const querystring = require('querystring')

const authenticate = () => {
	if (httpMethod !== 'POST') {
		throw { statusCode: 405, body: 'Method Not Allowed' }
	}
	const { token } = querystring.parse(body)
	const { SLACK_TOKEN } = process.env
	if (!token || token !== SLACK_TOKEN) {
		throw { statusCode: 401, body: 'Unauthorized' }
	}
	console.log('Authentication successful')
}

exports.handler = async ({ httpMethod, body }) => {
	try {
		authenticate()
		await axios.post(
			response_url,
			{
				response_type: 'in_channel',
				text,
			},
			{
				headers: { 'content-type': 'application/json' },
			}
		)
		return {
			statusCode: 200,
		}
	} catch (error) {
		console.error(error)
		return {
			// throw { statusCode: 405, body: 'Method Not Allowed' }
			// statusCode: 422, // Unprocessable Entity
			// body: error.message,
		}
	}
}
