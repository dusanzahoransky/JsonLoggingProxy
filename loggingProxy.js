var http = require('http');
var httpProxy = require('http-proxy');
var util = require('util');

var httpServerPort = 9091;
var proxyPort = 9090;
//
// Create your proxy server and set the target in the options.
//
var proxy = httpProxy.createProxyServer({
	target: 'http://localhost:' + httpServerPort
});
proxy.listen(proxyPort); 
console.log("proxy listening on port "+ proxyPort);

//
// Create your target server
//
var server = http.createServer(function (req, res) {
	
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

  res.writeHead(200, { 'Content-Type': 'text/json' });
  res.write('{ "response" : "request successfully proxied!" }');  
  res.end();
}).listen(httpServerPort);

console.log("http server listening on port " + httpServerPort);