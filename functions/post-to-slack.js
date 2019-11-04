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

exports.handler = async () => {
	const response = await axios.post(
		'https://slack.com/api/chat.postMessage',
		{
			channel: 'CQ3R9PQEQ',
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