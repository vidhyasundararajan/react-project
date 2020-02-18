const express = require('express');
const cors = require('cors');
const mysql= require('mysql');
const app = express();
const SELECT_ALL_PATIENT = 'select * from demographics';
const bodyParser = require('body-parser')

app.listen(4000, () => {
	console.log(`port 4000`)
});

console.log("listening");

var mysqlconnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root@1234',
	database: 'patient',
	multipleStatements: true
});

mysqlconnection.connect((err) => {
	if(!err)
	console.log('success');
	else
	console.log(err);
});

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.get('/', (req,res)=> {
	res.send('helldfdsfo')
});


app.post('/patients/add', (req, res) => {
	console.log(req)	
	const INSERT_QUERY = `INSERT INTO demographics (name, gender,dob, age, appointmentdate, aadharnumber) VALUES ('${req.body.username}', 
	'${req.body.gender}', DATE_FORMAT(STR_TO_DATE('${req.body.dob}','%Y-%m-%d'), '%Y-%m-%d'), ${req.body.age}, 
	DATE_FORMAT(STR_TO_DATE('${req.body.appointmentdate}','%Y-%m-%d'), '%Y-%m-%d'), '${req.body.aadharnumber}')`;

	mysqlconnection.query(INSERT_QUERY, (err, rows, fields) => {
		if (err) {
			res.send(err)
		}
		else {
			res.send("success")
		}
	})
});

app.get('/patients', (req,res)=> {
	mysqlconnection.query(SELECT_ALL_PATIENT, (err, results) => {
		if(err) {
			return res.send(err)
		}
		else {
			return res.json({
				data: results
			})
		}
	});
});



