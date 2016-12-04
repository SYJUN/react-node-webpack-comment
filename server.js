
var express = require('express');
var bodyParser = require('body-parser');

var fs = require('fs');
var path = require('path');

var app = express();

var COMMENTS_FILE = path.join(__dirname,'dataFile/comments.json');

app.set('port',(process.env.PORT || 8000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin','*');

	res.setHeader('Cache-Control','no-cache');
	next();
});

app.get('/data/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.json(JSON.parse(data));
  });
});


app.post('/data/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);

    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };

    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});

app.listen(app.get('port'),function(){
	console.log('Server started: http:127.0.0.1:' + app.get('port') + '');
});