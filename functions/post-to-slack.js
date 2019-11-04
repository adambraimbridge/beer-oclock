const axios = require('axios')
const blocks = [
	{
		type: 'section',
		text: {
			type: 'mrkdwn',
			text: 'Is it 🍺⏰?',
		},
	},
	{
		type: 'actions',
		elements: [
			{
				type: 'button',
				text: {
					type: 'plain_text',
					emoji: true,
					text: "Let's go",
				},
				style: 'primary',
				value: 'click_me_123',
			},
			{
				type: 'button',
				text: {
					type: 'plain_text',
					emoji: true,
					text: 'Not yet',
				},
				style: 'danger',
				value: 'click_me_123',
			},
		],
	},
]

exports.handler = async request => {
	const { recipient } = request.queryStringParameters
	if (recipient === undefined) {
		return {
			statusCode: 200,
			body:
				'<body style="text-align: center; padding-top: 10rem;"><h1>Is it 🍺⏰?</h1><form><input type="text" style="padding:1rem; text-align: center; width:20rem;" name="recipient" placeholder="Enter a Slack channel ID or user ID" /></form></body>',
		}
	}

	const response = await axios.post(
		'https://slack.com/api/chat.postMessage',
		{
			channel: recipient,
			text: 'Is it 🍺⏰?',
			blocks,
		},
		{
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN}`,
			},
		}
	)
	console.log(response.data)
	return {
		statusCode: 200,
		body:
			'<body style="text-align: center; padding: 10rem;"><h1>Is it 🍺⏰?</h1><p>Message posted to Slack.</p></body>',
	}
}
