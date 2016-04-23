var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('Myapp2', ['Department','Sales']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/departments', function(req, res){
	console.log('Received find all departments request');
	db.Department.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.get('/department/:id', function(req, res){
	console.log('Received findOne person request');
	db.Department.findOne({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/addDepartment', function(req, res){
	console.log(req.body);
	db.Department.insert(req.body, function(docs){
		console.log(docs);
		res.json(docs);
	})
});

app.delete('/deleteDepartment/:id', function(req, res){
	console.log("Received delete one person request...");
	db.Department.remove({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.put('/updateDepartment', function(req, res){
	console.log("Received updatePerson request");
	db.Department.findAndModify({query: {"_id": new mongojs.ObjectId(req.body._id)}, 
										update: {$set: {name: req.body.name, location: req.body.location}}
										}, function(err, docs){
											console.log(docs);
											res.json(docs);
										})
	});



app.get('/sales', function(req, res){
	console.log('Received find all sales request');
	db.Sales.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.get('/sales/:id', function(req, res){
	console.log('Received findOne person request');
	db.Sales.findOne({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/addSales', function(req, res){
	console.log(req.body);
	db.Sales.insert(req.body, function(docs){
		console.log(docs);
		res.json(docs);
	})
});

app.delete('/deleteSales/:id', function(req, res){
	console.log("Received delete one Sales request...");
	db.Sales.remove({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.put('/updateSales', function(req, res){
	console.log("Received Sales request");
	console.log(req);
	db.Sales.findAndModify({query: {"_id": new mongojs.ObjectId(req.body._id)}, 
		update: {$set: {name: req.body.name, date: req.body.date, did: req.body.did, pname: req.body.pname, amount: req.body.amount}}
		}, function(err, docs){
			console.log(docs);
			res.json(docs);
		})
	});

app.listen(3000);
console.log("server running on port 3000");