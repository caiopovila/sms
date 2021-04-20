const express = require('express');
const helmet = require('helmet');
const twilio = require('twilio');

require('dotenv').config();

const lifeDental = express();
const port = process.env.PORT || 4001;

lifeDental.use(helmet());

lifeDental.get('/', (req, res) => {
  console.log(process.env.ACCOUNTSID, process.env.AUTHTOKEN);
  res.json({ 
	version: 1.0,
	name: 'Life Dental API SMS'
  });
});

lifeDental.post('/', (req, res) => {
	try {

		let client = new twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

		client.messages.create({
			body: req.body.text,
			to: req.body.to,
			from: process.env.PHONE_NUMBER
		})
		.then((message) => res.json(message.sid));
		
	} catch (error) {
		res.status(500).json('Erro ocorrido!');
	}
});

lifeDental.post('/test', (req, res) => {
	try {

		let client = new twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

		client.messages.create({
			body: 'Hello from Node',
			to: '+5511963614557',
			from: process.env.PHONE_NUMBER
		})
		.then((message) => res.json(message.sid));

	} catch (error) {
		res.status(500).json('Erro ocorrido!');
	}

});

lifeDental.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});