const express = require('express')
const app = express()
var server = require('http').createServer(app);
const io = require('socket.io')(server);
const accountSid = 'AC1a0c7152c46f813c29c59ba523ed3891';
const authToken = '8a7750889cd2df2622c0af634f602223';
const client = require('twilio')(accountSid, authToken);
const port = 3000
app.use(express.static(__dirname));

server.listen(process.env.PORT || port);
io.set('heartbeat timeout', 1000000);

app.get('/', (req, res) =>	
	res.sendFile("index.html", { root: __dirname })
)



io.on('connection', (socket) => {
  socket.on('update', (msg) => {
	//do the twilio thing
	client.messages
	  .create({
		 body: 'Shopping List Updated.',
		 from: '+12058830692',
		 to: '+14083004099'
	   })
	  .then(message => console.log(message.sid));
  });
});