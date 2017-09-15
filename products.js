function ProductsController() {

  var that = this;

  var request = require('request');

  // get book from Google API

  const url = 'https://www.googleapis.com/books/v1/volumes'
  const query_string = {
    q: "Recipe",
    maxResults: 40,
    fields: 'items(volumeInfo(title,authors,description))'
  }
  request.get({
    url: url,
    qs: query_string
  }, function(err, res, body) {

    const json = JSON.parse(body)
    const items = json.items
    var i = 1;
    that.store = items.map(function(element) {
      return {
        id: i++,
        title: element.volumeInfo.title,
        authors: element.volumeInfo.authors,
        description: element.volumeInfo.description,
        comment: null
      }
    })
  })




  // Function for found ID 
  var findProductById = function(req) {
    var found = that.store.filter(function(p) {
      return p.id === parseInt(req.params.id);
    });
    if (found && found.length > 0) {
      return found[0];
    }
    return null;
  };
  
  
  //Get 
  that.get = function(req, res, next) {
    res.send(200, that.store);
    return next();
  };
  
  
  //Get by ID 
  that.getById = function(req, res, next) {
    var found = findProductById(req);
    if (found) {
      res.send(200, found);
    } else {
      res.send(404, "Product not found");
    }
    return next();
  };

  
  //POST
  that.post = function(req, res, next) {
    if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('title')) {
      res.send(500, "Missing Name");
    } else {
      that.store.push({
        id: parseInt(req.body.id),
        title: req.body.title,
        authors: req.body.authors,
        description: req.body.description,
        comment: req.body.comment
      });
      res.send(201, "Posted");
    }
    return next();
  };
  
  
  //PUT
  that.put = function(req, res, next) {
    if (!req.body.hasOwnProperty('comment')) {
      res.send(500, "Missing Comment");
      return next();
    }
    var found = findProductById(req);
    if (found) {
      found.comment = req.body.comment,
        found.title = req.body.title;
      res.send(200, found);
    } else {
      res.send(404, "Product Not Found");
    }
    return next();
  };
  
  
  //DELETE
  that.del = function(req, res, next) {
    that.store = that.store.filter(function(p) {
      return p.id !== parseInt(req.params.id);
    });
    res.send(200, "Item Deleted");
    return next();
  };

  //FIND BY ISBN
  that.ISBN = function(req, res, next) {

    const url = 'https://www.googleapis.com/books/v1/volumes?'
    const query_string = {
      q: "isbn:" + parseInt(req.params.id),      
      //maxResults: 1,
      fields: 'items(volumeInfo(title,authors,description))'
    }

    request.get({
      url: url,
      qs: query_string
    }, function(err, res, body) {

      const json = JSON.parse(body)
      const items = json.items

      if (err || items == null) {
        //res.send(500);
        console.log("Error");
        return next();

      }

      var i = 999;
      that.store.push(items.map(function(element) {
        return {
          id: i--,
          title: element.volumeInfo.title,
          authors: element.volumeInfo.authors,
          description: element.volumeInfo.description,
          comment: null
        }
      }));
    })

    res.send(200, "Done");

    return next();

  }


}

module.exports = new ProductsController();