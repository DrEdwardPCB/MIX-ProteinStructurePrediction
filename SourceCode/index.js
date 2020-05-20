const express = require('express')
const { spawn } = require('child_process')
const bodyParser = require("body-parser");
const app = express()
const port = 3005
const fs = require('fs')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'))
app.use('/out', express.static(__dirname + '/SendingOut'))
app.get('/py', (req, res) => {
	var dataToSend;
	//spawn child process to python
	console.log(req.query)
	var python = null
	if(req.query.framework=='tf18'){
		python=spawn('python3', ['./pythonScript/String2npyVTensorflow17.py'])
	}else if(req.query.framework=='tf35'){
		python=spawn('python3', ['./pythonScript/String2npyVTensorflow35.py'])
	}else{
		python=spawn('python3', ['./pythonScript/script1.py'])
	}
	//collect data from python
	python.stdout.on('data', function (data) {
		console.log('pipe data from python script ...')
		dataToSend = data.toString()
	})
	//closing data and print it on server log
	python.on('close', (code) => {
		console.log(dataToSend)
		console.log('===============================================')
		console.log('child process close all stdio with code ' + code)
		res.send({status:code,log:dataToSend})
	})
})
app.post('/in', (req, res) => {
	console.log(req)
	console.log(req.body)
	console.log(req.body.Sequence)
	var seq = req.body.Sequence
	fs.writeFile('./Received/receivedString.txt', seq, 'utf8', (err) => {
		if (err) {
			res.send({ status: err })
		} else {
			res.send({ status: 'success' })
		}

	})

})

app.listen(port, () => console.log('app is running on port ' + port))
