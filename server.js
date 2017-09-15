var restify = require('restify'),
   request = require('request'),
  products = require('./api_products/products'),
  port = process.env.PORT || 5000;

var server = restify.createServer({
  name: 'Resit Assignment'
});

server.use(function(req, res, next) {
  console.log(req.method + '' + req.url);
  return next();
});

//Client part

server.get('/', restify.plugins.serveStatic({
  directory: './client/',
  file: 'index.html'
}));


//API part

server.get('api/', function(req, res, next) {
	res.redirect('api/products', next)
})

server.use(restify.plugins.bodyParser());

server.get('api/products', products.get);
server.get('api/products/:id', products.getById);
server.post('api/products', products.post);
server.put('api/products/:id', products.put);
server.del('api/products/:id', products.del);

server.get('api/ISBN/:id', products.ISBN);

server.listen(port, function() {
  console.log('API Running at ' + port);
});