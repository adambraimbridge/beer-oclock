const querystring = require('querystring')
module.exports = ({ httpMethod, body }) => {
	if (httpMethod !== 'POST') {
		throw { statusCode: 405, body: 'Method Not Allowed' }
	}
	const { token } = querystring.parse(body)
	const { SLACK_TOKEN } = process.env
	if (!token || token !== SLACK_TOKEN) {
		throw { statusCode: 401, body: 'Unauthorized' }
	}
}
