// const express = require('express');
// const app = express();

// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

// const messages = 'messages';

// function submit() {
// 	const input = document.querySelector('#chat_input');
// 	console.log('input', input);
// }
// const insertQuestion = (question) => {
// 	console.log('yoooo', question);
// };

// const newMessage = 'Hello twig';
// const newMessage1 = 'Hello twig233333';

// // redisClient.lpush('messages', newMessage, (err, reply) => {
// // 	console.log(reply);
// // });
// // redisClient.lpush('messages', newMessage1, (err, reply) => {
// // 	console.log(reply);
// // });
// redisClient.lrange('messages', 0, -1, (err, results) => {
// 	console.log(results);
// });
// const storeMessage = (name, data) => {
// 	let message = JSON.stringify({ name: name, data: data });
// 	redisClient.lpush('messages', message, (err, response) => {
// 		console.log(response);
// 	});
// };

// io.on('connection', function(client) {
// 	console.log('Client connected...');
// 	client.on('answer', function(question, answer) {
// 		client.broadcast.emit('answer', question, answer);
// 	});

// 	client.on('question', function(question) {
// 		if (!client.question_asked) {
// 			client.question_asked = true;
// 			client.broadcast.emit('question', question);
// 		}
// 	});

// 	// client.on('join', (name) => {
// 	// 	messa
// 	// });
// });

import logger from './utils/logger';
const express = require('express');
const router = express.Router();
const routes = require('./routes');
const app = express().use(express.json());

app.use(router);
app.use('/api', routes);
const PORT = process.env.PORT || 9595;

app.listen(PORT, () => {
	logger.info(`Server is running on port ${PORT}!`);
});
