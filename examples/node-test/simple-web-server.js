// a simple weberver running on port 5555:
var http = require('http');
var server = http.createServer(
	function(req, res) {
		res.writeHead(200, {'content-Type': 'text/plain'});
		res.end('This is the servers answer\n Bye!\n');
	});
server.listen(5555);
console.log('Web server running on beaglebone.local:5555');


