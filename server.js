var path = require('path');
var express = require('express');

var app = express();

DIST_DIR = path.join(__dirname, 'dist');
app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 3000);

app.get('*', (req,res) => {
	res.sendFile(path.resolve(DIST_DIR + '/dist', 'index.html'));
});

var server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});
