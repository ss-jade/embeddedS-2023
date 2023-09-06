// Webser with node.js
var http = require('http');
var server = http.createServer(
	function(req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Hello from SBC\n');
	});
server.listen(5034);
console.log('Webserver running');
