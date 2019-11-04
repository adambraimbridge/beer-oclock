import { parse } from 'querystring'
import { post } from 'axios'

const sendThankyou = async response_url => {
	const response = await post(
		response_url,
		{
			replace_original: "true",
			text: "Cheers 🍻",				
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

export async function handler(request) {
	const { httpMethod, body } = request
	const { payload } = parse(body)
	const { token, response_url } = JSON.parse(payload)
	try {
		authenticate(httpMethod, token)

		const response = await sendThankyou(response_url) 
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
