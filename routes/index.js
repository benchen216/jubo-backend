const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();

// create application/json parser
const jsonParser = bodyParser.json()

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');
const Patient = mongoose.model('Patient', { Name: String ,Id: String, OrderId: Array});
const Order = mongoose.model('Order', {Id: { type: Number, unique: true, min: 1 },Message: String});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});


router.get('/patients', function(req, res, next) {
    Patient.find().then(function (patients) {
        res.send(patients);
    });
});

router.get('/patients/:id', function(req, res, next) {
    const Patient = mongoose.model('Patient', { name: String ,id: String, order: String});
        Patient.find({Id: req.params.id}, function (err, patients) {
            if (err) return console.error(err);
            console.log(patients);
            res.send(patients);
        })
});

router.post('/patients', jsonParser, function(req, res, next) {
    const patient = new Patient({ Name: req.body.name, Id: req.body.id, OrderId: req.body.orderId });
    console.log(req.body);
    patient.save().then(() => console.log('成功'));
    res.send(patient);
} );

router.get('/orders', function(req, res, next) {
    Order.find().then(function (orders) {
        res.send(orders);
    });
} );

router.get('/orders/:id', function(req, res, next) {
    Order.find({Id: req.params.id}).then(function (orders) {
        res.send(orders);
    } );
} );


router.post('/orders', jsonParser, function(req, res, next) {
    const order = new Order({ Message: req.body.message });
    console.log(req.body);
    order.save().then(() => console.log('完成'));
    res.send(order);
} );


router.delete('/orders/:id', function(req, res, next) {
    const Order = mongoose.model('Order', { message: String ,id: String});

    Order.remove({Id: req.params.id}, function (err, orders) {
        if (err) return console.error(err);
        console.log(orders);
        res.send(orders);
    })
} );


router.put('/orders/:id', jsonParser, function(req, res, next) {
    Order.updateOne({_id: req.params.id},{Message: req.body.message}).then(
        function (err, orders) {
            if (err) return console.error(err);
            console.log(orders);
            res.send(orders);
        }
    );
   /* Order.update({Id: req.params.id}, {Message: req.body.message}, function (err, orders) {
        if (err) return console.error(err);
        console.log(orders);
        res.send(orders);
    })*/
} );

module.exports = router;
