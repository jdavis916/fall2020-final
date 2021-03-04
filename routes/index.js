import express from "express";
import ContactForm from "../backend/models/formModel";
import QuestionForm from "../backend/models/questionForm";
import vehicleModel from "../backend/models/vehicleData";
import mongoose from "mongoose";
const url = require('url'); 
//import axios from 'axios';
//var vehicleSchema = 
const vehicleSchema = {
    make: String,
    model: String,
    year: Number,
    body_type: String,
    fuel: String,
    mpgCityHwy: {
        String,
        String
    },
    seats: String,
    doors: String
    
};
var result = {};
var search;
const { body, validationResult } = require('express-validator');
const router = express.Router();
var errorMsg = "error";
//var vehicles = mongoose.model('vehicles', vehicleSchema);
var db = mongoose.connection;

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
//advSearch form data sanitization
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
//mock data for contact pulldown, update to pull from db later
function getContactSubjects(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "Site Satisfaction"

        },
        {
            _id:2,
            title: "Business Inquiry"

        },
        {
            _id:3,
            title: "Suggestions"

        },
        {
            _id:4,
            title: "Bug/Error reporting"

        },
        {
            _id:5,
            title: "Other comments or concerns"
        }
    ];

    return subArr;
}
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
            title: "10"
        },
        {
            _id:2,
            title: "20"
        },
        {
            _id:3,
            title: "30"
        },
        {
            _id:4,
            title: "40"
        },
        {
            _id:5,
            title: "50 and above"
        },
        {
            _id:6,
            title: "electric"
        }
    ];

    return subArr;
}


// questionaire mock Q's and A's
function getQuestionOne(){
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
        },
        {
            _id:6,
            title: 'above 50000'
        } // add in other options later
    ];

    return subArr;
};
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
            title: 5
        },
        {
            _id:4,
            title: 7
        },
        {
            _id:5,
            title: 8
        } // add in other options later
    ];

    return subArr;
};
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
            title: "Compact"
        } // add in other options later
    ];

    return subArr;
};
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
};
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
};
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
};
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
                title: 'Results',
                err: {Error},
                res: 'Theres supposed to be a car here...'
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
        Promise.all([make, bodyTypes, fuel, seat, door])
        .then((values) =>{
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
    .post('/indivCar', /*sanitizeArr3,*/async (req,res) => {
        try{
            
            //console.log(req.body);
            //var result= db.collection('vehicles').find({'make': carMake,'body_style': carModel,'fuel': carFuelType,'doors': carDoors,'seats': carSeats});
            //db.collection('vehicles').find({'make': carMake},{'body_style': carModel},{'fuel': carFuelType},{'doors': carDoors},{'seats': carSeats}, (err, res) =>{
            var result = await db.collection('vehicles').find({make: req.body.brands},{body_type: req.body.models},{fuel: req.body.fuel},{doors: req.body.door},{seats: req.body.seat}).toArray();
            
            //var carResult = JSON.stringify(result);
            console.log(result); 
            console.log('--stage 2--');
            var carResult = Object.values(result).map(Object.values);
            console.log(carResult);
            console.log('---result callback---');    
                        //console.log(result);
            var resultObject = { 
                pageMainClass: 'indivCar',
                title: 'Result',
                response: carResult
            
            //res.redirect(200, '/indivCar');
            };
            res.render('indivCar', resultObject); 
                
        }
        catch(error){
            res.status(500).json({
                error: error.toString()
            })
        }
    })          
    /* POST contact form. */
    .post('/formModel', sanitizeArr,
        (req, res, next) =>{
        //console.log(req.body);
        const errors = validationResult(req);
        //console.log(errors);
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
    .post('/questionForm',(req, res, next) =>{

        //var carSurv = {};
        const errors = validationResult(req);
        //returns error array if input fails check
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //console.log(req.body);
        
        
        //setting up variables for the personality function
        /*global.survValue = function(carSurv){
            //using form data to construct a query
            var priceCount;
            var bodyCount;
            //personality function will be completed later
            var carScore;
            var bodyLower = (req.body.carType).toLowerCase();
            if ((req.body.price <= 50000 )){
                priceCount = req.body.price/10000;
            }else if((req.body.price <= 50000 && )) {
                priceCount = 6;
                bodyLower = 'luxury' + (req.body.carType).toLowerCase();
            };
            if ((req.body.personality ===  )){
            } else if{
            } else if{
                
            } else if{
                
            } else if{
                
            };
       
            async (function(req,res,err){
                var resCar = db.collection('vehicles').findById(6);
                //var resCar = db.collection('vehicles').find({'key': valueVariable},{:});
                Promise(resCar);
            })
                .then(result => {
                    res.status(200).json({
                        docs:[resCar]
                    })
                })
                .catch(err => {
                    res.status(500).json({
                    errRes:[errorMsg]
                    });
                    console.log(err);
                })
        } */
        
        const questions = new QuestionForm({
            _id: mongoose.Types.ObjectId(),
            price: req.body.price,
            seat: req.body.seat,
            carType: req.body.carType,
            personality: req.body.personality,
            activity: req.body.activity,
            driving: req.body.driving,
            attributes: req.body.attributes
        })
        console.log(carSurv);
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
            })
        })
        .catch(err => {
            console.log(err);
        })
    })    

//console.log(getQuestionFour().subArr[1].Title)
module.exports = router;