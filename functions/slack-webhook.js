const querystring = require('querystring')
const axios = require('axios')

const sendThankyou = async (response_url, choice) => {

	let text
	if (choice === 'yes') {
		text = "Cheers 🍻"
	} else if (choice === 'no') {
		text = "Beached as bru 🐳"
	}

	const response = await axios.post(
		response_url,
		{
			replace_original: "true",
			text,
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN}`,
			},
		}
	)
	return response
}

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
	const { httpMethod, body } = request
	const { payload } = querystring.parse(body)
	const { token, response_url, actions } = JSON.parse(payload)
	
	try {
		authenticate(httpMethod, token)

		const choice = actions[0].value
		const response = await sendThankyou(response_url, choice) 
		console.log(response.data)

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
			error,
		})

		return {
			statusCode,
			body,
		}
	}
}
