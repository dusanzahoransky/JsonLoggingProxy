var http = require('http');
var httpProxy = require('http-proxy');
var util = require('util');

var proxyPort = 8081;
var httpServerPort = 8080;
//
// Create your proxy server and set the target in the options.
//
var proxy = httpProxy.createProxyServer({
	target: 'http://localhost:' + httpServerPort
});
proxy.listen(proxyPort); 
console.log("proxy listening on port "+ proxyPort);

proxy.on('proxyReq', function(proxyReq, req, res, options) {
	var body = '';

	req.on('data', function (data) {
		body += data;
	});

	req.on('end', function () {
		if(body.length > 0){
			console.log(JSON.stringify(body));
			console.log('----\n\n')
		}
	});
		
  console.log("URL: " + req.url );
  console.log("HEADERS: "  + '\n' + JSON.stringify(req.headers, true, 1) );
});