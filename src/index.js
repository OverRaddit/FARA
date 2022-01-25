//import Info from "./info";
//import { CLIENT_ID, CLIENT_PASSWORD, UID, SECRET } from '../info.js';
import Info from '../info.js';
import fetch from 'node-fetch';

//console.log(CLIENT_ID);
console.log(Info.CLIENT_ID);

var express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
var app = express(); //express를 실행하여 app object를 초기화 합니다.

app.get('/', function(req, res) {
	res.send("goto ./register or ./auth\n");
  });

app.get('/register', function(req, res) {
  res.redirect("https://api.intra.42.fr/oauth/authorize?client_id=d4b1564935b2a53208b7b2bd67b3d0cf95f116fe21c5bbc9ef735f6335cac8f8&redirect_uri=https%3A%2F%2Foverraddit.github.io%2FFARA%2F&response_type=code")
});

app.get('/auth', function(req, res) {
	const url = 'https://api.intra.42.fr/oauth/token';
	const query =
		'?' +
		'grant_type=' +
	'client_credentials' +
		'&' +
		'client_id=' +
		Info.UID +
	'&' +
		'client_secret=' +
		Info.SECRET +
			'&' +
		'redirect_uri=' +
		'REDIRECT URI' +
		'&' +
		'scope=public';

	fetch(url + query, {
		method: 'POST',
		headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'X-Mobile': 'false',
		'response-Type': 'text',
		},
	})
		.then(res => res.json())
		.then(res => console.log(res));
	res.redirect("/home");
});

app.get('/home', function(req, res) {
	console.log(req);
	res.send("You Logged In!!!\n");
	console.log("login success!")
  });

var port = 3000;
app.listen(port, function(){ // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
  console.log('server on! http://localhost:'+port); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});
