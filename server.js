var express = require('express');
var bodyParser = require('body-parser');

var fs = require('fs');
var path = require('path');

var app = express();

var config = {
    port: 8000,
};


var dir = './dataFile';
var fileName = path.join(dir, 'comments.json');

if (!fs.existsSync(dir) || !fs.existsSync(fileName)) {
    fs.mkdirSync(dir);
    fs.writeFile(fileName, '', function ( err ) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
}

var COMMENTS_FILE = path.join(__dirname, fileName);

app.set('port', (process.env.PORT || config.port));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function ( req, res, next ) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/data/comments', function ( req, res ) {
    fs.readFile(COMMENTS_FILE, function ( err, data ) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        res.json(JSON.parse(data));
    });
});


app.post('/data/comments', function ( req, res ) {
    fs.readFile(COMMENTS_FILE, function ( err, data ) {
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
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function ( err ) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(comments);
        });
    });
});

function _formatDate( date ) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    function __f( _n ) {
        return _n = _n < 10 ? `0${_n}` : _n;
    }

    return `${year}-${__f(month)}-${__f(day)} ${week[date.getDay()]} ${__f(h)}:${__f(m)}:${__f(s)}`;
}

app.listen(app.get('port'), function () {
    console.log('Server started: http:127.0.0.1:' + app.get('port') + '');
    console.log(_formatDate(new Date()));
});