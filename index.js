// Stock Market Portfolio App By John Elder Codemy.com
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;



// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// API call function
function callApi(doneApi, stockTicker) {
	request('https://cloud.iexapis.com/stable/stock/' + stockTicker + '/quote?token=pk_b29bd385e7a44965914bf12795e58c27', { json: true }, (err, res, body) => {
	if (err) {return console.log(err);}
	if (res.statusCode === 200){
		doneApi(body);
		};
	});
};

// index GET route
app.get('/', function (_req, _res) {
	callApi(function(doneApi) {
			_res.render('home', {
	    	stock: doneApi,
    	});
	}, "GOOG");
		
});

// index POST route
app.post('/', function (_req, _res) {
	callApi(function(doneApi) {
			_res.render('home', {
	    	stock: doneApi,
    	});
	}, _req.body.stockTicker);
		
});



app.listen(PORT, () => console.log('Server Listening on port ' + PORT));
