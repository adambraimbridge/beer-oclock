const axios = require('axios')
const authenticate = require('./lib/auth')

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
