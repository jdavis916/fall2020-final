import express from "express";
import ContactForm from "../backend/models/formModel";
import QuestionForm from "../backend/models/questionForm";
import vehicleDb from "../backend/models/vehicleData";
import mongoose from "mongoose";
//import axios from 'axios';
//var vehicleSchema = 
const { body, validationResult } = require('express-validator');
const router = express.Router();
var errorMsg = "Prohibited characters detected in input";
var vehicles = mongoose.model('vehicles');
var db = mongoose.connection;
var carMake;
var carModel;
var carMpg;
var carFuelType;
var carDoors;
var carSeats;
var carSurvPrice;
var carSurvSeat;
var carSurvBody;
var myPersonality;
var myObjective;
var myDriving;
var myAttrib;
//var collection = db.collection('vehicles');
/*var document = 'advSearch.hbs';
var formElement = document.querySelector('#adv');
var formData = new FormData(formElement);*/
//contact form
var sanitizeArr = [
    body('firstName').matches(/^[a-zA-Z0-9 ]*$/).trim(),
    body('lastName').matches(/^[a-zA-Z0-9 ]*$/).trim(),
    body('email').isEmail().normalizeEmail([{gmail_remove_dots: true}]).trim(),
    body('phone').isNumeric([{no_symbols: true}]).trim(),
    body('subject').matches(/^[a-zA-Z0-9 ]*$/).trim(),
    body('msg').matches(/^[a-zA-Z0-9 ]*$/).trim()
];
//questionnaire form
var sanitizeArr2 = [
    body('price').isNumeric([{no_symbols: true}]).trim(),
    body('seats').isNumeric([{no_symbols: true}]).trim(),
    body('body_style').matches(/^[a-zA-Z0-9 ]*$/).trim(),
    body('personality').matches(/^[a-zA-Z0-9 ]*$/).trim(),
    body('activity').matches(/^[a-zA-Z0-9 ]*$/).trim(),
    body('driving').matches(/^[a-zA-Z0-9 ]*$/).trim(),
    body('priority').matches(/^[a-zA-Z0-9 ]*$/).trim()
];
var sanitizeArr3 = [
    body('brands').matches(/^[a-zA-Z0-9 ]*$/).trim(),
    body('models').matches(/^[a-zA-Z0-9 ]*$/).trim(),
    body('minimum').isNumeric([{no_symbols: true}]).trim(),
    body('maximum').isNumeric([{no_symbols: true}]).trim(),
    body('mpg').isNumeric([{no_symbols: true}]).trim(),
    body('fuel').matches(/^[a-zA-Z0-9 ]*$/).trim(),
    body('door').isNumeric([{no_symbols: true}]).trim(),
    body('seat').isNumeric([{no_symbols: true}]).trim()
];
/*pageMainClass: 'advSearch',
                title: 'Advanced Search',
                msg: 'Select filters to apply:',
                brands: values[0],//await db.collection('vehicles').distinct('make'),
                models: values[1], //await db.collection('vehicles').distinct('body_type'),
                minimum: getMinimum(),
                maximum: getMaximum(),
                mpg: getMpg(),
                interiorColor: getInteriorColor(),
                exteriorColor: getExteriorColor(),
                fuel: values[2],
                door: values[4],
                seat: values[3]*/
//mock data for contact pulldown, update to pull from db later
function getContactSubjects(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "Title1"

        },
        {
            _id:2,
            title: "Title2"

        },
        {
            _id:3,
            title: "Title3"

        },
        {
            _id:4,
            title: "Title4"

        },
        {
            _id:5,
            title: "Title5"
        }
    ];

    return subArr;
}

// mock data for advanced seach dropdown options 
/*async function getBrand(){
    let subArr = [];
    return await db.collection('vehicles').distinct('make');
}*/
/*    subArr = [
        {
            _id:1,
            title: "Nissan"
        },
        {
            _id:2,
            title: "Ford"
        },
        {
            _id:3,
            title: "Chevrolet"
        },
        {
            _id:4,
            title: "Toyota"
        },
        {
            _id:5,
            title: "Kia"
        }
    ];

    return subArr;*/

/*async function getBodyTypes(req,res,next){
    let subArr = [];
    return await db.collection('vehicles').distinct('body_type');
    //return subArr;
  //  async function getData(){
        //subArr = db.collection('vehicles').find().distinct( "body_style" );
       /* 
        await vehicleDb.distinct('body_type',(err, res) => {
            console.log(res);
            return res;
            
        })*/
   //}


    //subArr.then(function(){
    //    console.log(subArr)
    //});
  /*  subArr = vehicles.find({body_type:'truck'},{body_type:'suv'},{body_type:'sedan'},{body_type:'compact'},{body_type:'sports'}).toArray(function (err, result) {
        if (err) {
            console.log(err);
        } else if (result.length) {
            return result;
        } else {
            socket.emit("No documents found");
        };
    });*/
    //console.log(result);
    //
    //subArr = [
    //    {
    //        _id:1,
    //        title: bodyTypes[0]
    //    },
    //    {
    //        _id:2,
    //        title: bodyTypes[1]
    //    },
    //    {
    //        _id:5,
    //        title: bodyTypes[2]
    //    },
    //    {
    //        _id:6,
    //        title: bodyTypes[3]
    //    },
    //    {
    //        _id:7,
    //        title: bodyTypes[4]
    //    }
    //];
    //console.log(subArr);
    //return subArr;

function getMinimum(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "0"
        },
        {
            _id:2,
            title: "1,000"
        },
        {
            _id:3,
            title: "5,000"
        },
        {
            _id:4,
            title: "10,000"
        },
        {
            _id:5,
            title: "20,000"
        }
    ];

    return subArr;
}
function getMaximum(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "10,000 or less"
        },
        {
            _id:2,
            title: "20,000 or less"
        },
        {
            _id:3,
            title: "30,000 or less"
        },
        {
            _id:4,
            title: "40,000 or less"
        },
        {
            _id:5,
            title: "50,000 and over"
        }
    ];

    return subArr;
}
function getMpg(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "5-10"
        },
        {
            _id:2,
            title: "10-20"
        },
        {
            _id:3,
            title: "20-30"
        },
        {
            _id:4,
            title: "30-40"
        },
        {
            _id:5,
            title: "40 +"
        },
        {
            _id:6,
            title: "electric"
        }
    ];

    return subArr;
}
function getInteriorColor(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "?????"
        },
        {
            _id:2,
            title: "Black"
        },
        {
            _id:3,
            title: "Pewter"
        },
        {
            _id:4,
            title: "White"
        },
        {
            _id:5,
            title: "grey"
        }
    ];

    return subArr;
}
function getExteriorColor(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "?????"
        },
        {
            _id:2,
            title: "Black"
        },
        {
            _id:3,
            title: "Pewter"
        },
        {
            _id:4,
            title: "White"
        },
        {
            _id:5,
            title: "grey"
        }
    ];

    return subArr;
}







// questionaire mock Q's and A's .......... delete later once added to .post
function getPriceSlider(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: 10000
        },
        {
            _id:2,
            title: 20000
        },
        {
            _id:3,
            title: 30000
        },
        {
            _id:4,
            title: 40000
        },
        {
            _id:5,
            title: 50000
        } // add in other options later
    ];

    return subArr;
}
function getQuestionTwo(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: 2
        },
        {
            _id:2,
            title: 4
        },
        {
            _id:3,
            title: 6
        },
        {
            _id:4,
            title: 8
        },
        {
            _id:5,
            title: 10
        } // add in other options later
    ];

    return subArr;
}
function getQuestionThree(){
    let subArr= [];
    subArr = [
        {
            _id:1,
            title: "Sport"
        },
        {
            _id:2,
            title: "Sedan"
        },
        {
            _id:3,
            title: "SUV"
        },
        {
            _id:4,
            title: "Truck"
        },
        {
            _id:5,
            title: "Hachback etc."
        } // add in other options later
    ];

    return subArr;
}
function getQuestionFour(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "Chill"
        },
        {
            _id:2,
            title: "Assertive"
        },
        {
            _id:3,
            title: "Short-tempered"
        },
        {
            _id:4,
            title: "Compassionate"
        } // add in other options later
    ];

    return subArr;
}
function getQuestionFive(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "Family roadtrips and outgoing"
        },
        {
            _id:2,
            title: "Going to music festivals"
        },
        {
            _id:3,
            title: "Commuting to work"
        },
        {
            _id:4,
            title: "Date nights for two"
        } 
    ];

    return subArr;
}
function getQuestionSix(){
    let subArr = [];
    subArr = [
        {
            title: "Getting from point A to point B"
        },
        {
            title: "Going fast"
        },
        {
            title: "Being safe"
        },
        {
            title: "Looking good while doing it"
        },
        {
            title: "Having the ability to drive with groups"
        } // add in other options later
    ];

    return subArr;
}
function getQuestionSeven(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "Longevity: Car durability, Gas mileage/ Fuel efficiency"
        },
        {
            _id:2,
            title: "Versatility: Off-road and work use"
        },
        {
            _id:3,
            title: "Exterior Design: Look and style purely to impress"
        },
        {
            _id:4,
            title: "Internal design: Spacious and compact"
        },
        {
            _id:5,
            title: "Brand name manufacturing: American or foriegn made"
        } // add in other options later
    ];

    return subArr;
};

router
    /* GET home page. */
	.get('/', function(req, res, next) {
        res.render('index', 
            { 
                pageMainClass: 'pgMainHome',
                title: 'COP Final Project',
                msg: 'fun time',
                group: 'The whole class'
            });
	})
    .get('/about', function(req, res, next) {
        res.render('about',
            {
                pageMainClass: 'about',
                title: 'About Us...',
                msg: "Meet the team!"
            });
    })
    .get('/indivCar', function(req, res, next) {
        res.render('indivCar',
            {
                pageMainClass: 'indivCar',
                title: 'View Car Details',
                msg: "Here's your car."
            });
    })
    .get('/contact', function(req, res, next) {
        res.render('contact', 
            { 
                pageMainClass: 'contactUs',
                title: 'Contact Us',
                msg: 'Send Us Your Feedback:',
                formSubjects: getContactSubjects()
            });
    })
    .get('/questionnaire', function(req, res, next) {
        res.render('questionnaire', 
            { 
                pageMainClass: 'questionnaire',
                title: 'Personality Questionnaire',
                msg: 'Please answer honestly to ensure accurate results', 
                price: getQuestionOne(),
                seat: getQuestionTwo(),
                carType: getQuestionThree(),
                personality: getQuestionFour(),
                activity: getQuestionFive(),
                driving: getQuestionSix(),
                attributes: getQuestionSeven()



            });
    })
    .get('/advSearch', async function(req, res,) {
        var returnObj = {};
        var make = db.collection('vehicles').distinct('make');
        var bodyTypes = db.collection('vehicles').distinct('body_type');
        var fuel = db.collection('vehicles').distinct('fuel');
        var seat = db.collection('vehicles').distinct('seats');
        var door = db.collection('vehicles').distinct('doors');
        //var mpg = db.collection('vehicles').distinct('mpgCityHwy');
        Promise.all([make, bodyTypes, fuel, seat, door]).then((values) =>{
            /*console.log(bodyTypes);
            console.log(values[1]);
            console.log(fuel);
            console.log(values[2]);
            console.log(make);
            console.log(values[0]);*/
            try{
                returnObj = {
                pageMainClass: 'advSearch',
                title: 'Advanced Search',
                msg: 'Select filters to apply:',
                brands: values[0],//await db.collection('vehicles').distinct('make'),
                models: values[1], //await db.collection('vehicles').distinct('body_type'),
                minimum: getMinimum(),
                maximum: getMaximum(),
                mpg: getMpg(),
                interiorColor: getInteriorColor(),
                exteriorColor: getExteriorColor(),
                fuel: values[2],
                door: values[4],
                seat: values[3]

                }
            }catch(error){
                res.status(500).json({
                    error: error.toString()
                });

            }
        res.render('advSearch', returnObj);
        })//res.json({bodyTypes});
    })

    .get('/carList', function(req, res, next) {
        res.render('carList', 
            { 
                pageMainClass: 'carList',
                title: 'Car Catalogue',
                msg: 'Browse our selection of automobiles...'
            });
    })
    .post('/forms/adv', sanitizeArr3, (req,res,next) =>{
        //console.log(req.body);
        var carMake= req.body.brands;
        var carModel= req.body.models;
        var carMpg= req.body.mpg;
        var carFuelType= req.body.fuel;
        var carDoors= req.body.door;
        var carSeats= req.body.seat;
        //};

        /*.then(result => {
            //res.redirect(200, '/path')({
            //    //res: "Message recieved. Check for a response later."
            //});
            res.status(200).json({
                docs:[questions]
            });
        })
        .catch(err => {
            console.log(err);
        });*/
    })
    /* POST contact form. */
	.post('/formModel', sanitizeArr,
        (req, res, next) =>{
        //console.log(req.body);
        const errors = validationResult(req);
        console.log(errors);
        //returns error array if input fails check
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        /*console.log(req.headers);*/
        const contactMsg = new ContactForm({
            _id: mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            subject: req.body.subject,
            msg: req.body.msg
        });
        //res.redirect(200, path)({
        //    res: "Message recieved. Check for a response later."
        //});
        //if (Object.keys(contactMsg).length !== 7){
        //    //throw "Cyber attack uh-oh";
        //    throw new Error(errorMsg);
        //}
        contactMsg.save()
        .then(result => {
            //res.redirect(200, '/path')({
            //    //res: "Message recieved. Check for a response later."
            //});
            res.status(200).json({
                docs:[contactMsg]
            });
        })
        .catch(err => {
            res.status(500).json({
                errRes:[errorMsg]
            });
            console.log(err);
        });
    })
    //info from survey form
    .post('/questionForm'/*, sanitizeArr2*/,
        (req, res, next) =>{
        //console.log(req.body);
        const errors = validationResult(req);
        //returns error array if input fails check
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log(req.body);
        var carSurvPrice= req.body.price;
        var carSurvSeat= req.body.seats;
        var carSurvBody= req.body.carType;
        var myPersonality = req.body.personality;
        var myObjective= req.body.activity;
        var myDriving= req.body.driving;
        var myAttrib= req.body.priority;


        const questions = new QuestionForm({
            _id: mongoose.Types.ObjectId(),
            price: req.body.price,
            seat: req.body.seat,
            carType: req.body.carType,
            personality: req.body.personality,
            activity: req.body.activity,
            driving: req.body.driving,
            attributes: req.body.attributes
        });
        
        //res.redirect(200, path)({
        //    res: "Message recieved. Check for a response later."
        //});
        questions.save()
        .then(result => {
            //res.redirect(200, '/path')({
            //    //res: "Message recieved. Check for a response later."
            //});
            res.status(200).json({
                docs:[questions]
            });
        })
        .catch(err => {
            console.log(err);
        });
    });
module.exports = router;
