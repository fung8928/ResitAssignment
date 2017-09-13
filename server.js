var restify = require('restify'),
  products = require('./products'),
  port = process.env.PORT || 5000;

var server = restify.createServer({
  name: 'Resit API'
});

server.use(function(req, res, next) {
  console.log(req.method + '' + req.url);
  return next();
});

server.use(restify.plugins.bodyParser());

server.get('api/products', products.get);
server.get('api/products/:id', products.getById);
server.post('api/products', products.post);
server.put('api/products/:id', products.put);
server.del('api/products/:id', products.del);

server.listen(port, function() {
  console.log('API Running at ' + port);
});