var dnode = require('dnode'),
    fs = require('fs'),
    connect = require('connect'),
    markdown = require('markdown'),
    http = require('http');

var tags = require('../lib/tags'),
    articles = require('../lib/articles');

// This gets the article data and parses the markdown
var getGuide = function (name, callback) {
  var obj = articles[name].metadata;
  obj.content = markdown.parse(articles[name].article);

  callback(null, obj);
}

// This gets the list of articles with a specific tag
var getGuides = function (tagId, callback) {
  if (tags.tagid[tagId] == undefined) {
    return callback("Undefined tag");
  }
  else {
    return callback(null, tags.tagid[tagId]);
  }
}

// This gets the list of tags
var getTags = function (callback) {
  return callback(null, tags.names);
}

var getArticleList = function (callback) {
  var list = [];
  var paths = [];
  for (article in articles) {
    list.push(article);
    paths.push(articles[article].path);
  }
  callback(null, list, paths);
}

var server = connect.createServer();

server.use(function(req, res, next) {
  if (req.url==="/") {
    req.url = "/index.htm";
  }
  next();
});

server.use(connect.static(__dirname+"/../public"));
server.listen(8080);
console.log("Main server is running on: http://localhost:8080/");

dnode({
  getGuide: getGuide,
  getGuides: getGuides,
  getTags: getTags,
  getArticleList: getArticleList
}).listen(server);


console.log("POST echo server is running on: http://localhost:1337");
http.createServer(function (req, res) {
  var str = '';
  req.on('data', function (chunk) {
    str += chunk;
  });
  req.on('end', function () {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(str);
  });
}).listen(1337);


console.log("HEADER echo server is running on: http://localhost:1338");
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(req.headers.custom);
}).listen(1338);