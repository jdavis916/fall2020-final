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
    mpgCityHwy: [
        String,
        String
    ],
    seats: String,
    doors: String

};
var result = {};
var search;
const { body, validationResult } = require('express-validator');
const router = express.Router();
var errorMsg = "error";
var db = mongoose.connection;
//contact form
var sanitizeArr = [
    body('Name').matches(/^[a-zA-Z0-9 ]*$/).trim(),
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
    //body('mpg').isNumeric([{no_symbols: true}]).trim(),
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
};
// mock data for home page
function getBrand(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "Ford"
        },
        {
            _id:2,
            title: "Chevy"
        },
        {
            _id:3,
            title: "Toyota"
        },
        {
            _id:4,
            title: "Lexus"
        },
        {
            _id:5,
            title: "Kia"
        }
    ];

    return subArr;
};
function getModel(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "Car"
        },
        {
            _id:2,
            title: "Truck"
        },
        {
            _id:3,
            title: "Van"
        },
        {
            _id:4,
            title: "Sedan"
        },
        {
            _id:5,
            title: "Hatchback"
        }
    ];

    return subArr;
};
// mock data for advanced seach dropdown options
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
};
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
};
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
};
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
};
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
};
// questionaire mock Q's and A's .......... delete later once added to .post
function getPriceSlider(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "10,000"
        },
        {
            _id:2,
            title: "20,000"
        },
        {
            _id:3,
            title: "30,000"
        },
        {
            _id:4,
            title: "40,000"
        },
        {
            _id:5,
            title: "50,000"
        } // add in other options later
    ];

    return subArr;
};
function getSeatSlider(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "2"
        },
        {
            _id:2,
            title: "4"
        },
        {
            _id:3,
            title: "5"
        },
        {
            _id:4,
            title: "7"
        },
        {
            _id:5,
            title: "8"
        } // add in other options later
    ];

    return subArr;
};
function getCarType(){
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
function getPersonalityType(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "Personality type"
        },
        {
            _id:2,
            title: "Chill"
        },
        {
            _id:3,
            title: "Assertive"
        },
        {
            _id:4,
            title: "Short-tempered"
        },
        {
            _id:5,
            title: "Compassionate"
        } // add in other options later
    ];

    return subArr;
};
function getObjective(){
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
function getDrivingNeeds(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "Getting from point A to point B"
        },
        {
            _id:2,
            title: "Going fast"
        },
        {
            _id:3,
            title: "Being safe"
        },
        {
            _id:4,
            title: "Looking good while doing it"
        },
        {
            _id:5,
            title: "Having the ability to drive with groups"
        }
    ];

    return subArr;
};
function getAttributes(){
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
        } 
    ];

    return subArr;
};
function removeEmpty(obj) {
    return Object.entries(obj)
        .filter(([_, v]) => v != '')
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}
router
    /* GET home page. */
   
    .get('/', async function(req, res, next) {
        var returnObj = {};
        var make = db.collection('vehicles').distinct('make');
        var bodyTypes = db.collection('vehicles').distinct('body_type');
        
        
        Promise.all([make, bodyTypes])
        .then((values) =>{
            try{
                returnObj = {
                pageMainClass: 'pageMainHome',
                title: 'COP Final Project',
                
                brands: values[0],
                models: values[1], 
                }
            }catch(error){
                res.status(500).json({
                    error: error.toString()
                });

            }
        res.render('index', returnObj);
        })
    })
    .get('/about', function(req, res, next) {
        res.render('about',
            {
                pageMainClass: 'pageMainAbout',
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
                priceSlider: getPriceSlider(),
                seatSlider: getSeatSlider(),
                carType: getCarType(),
                personality: getPersonalityType(),
                objective: getObjective(),
                drivingNeeds: getDrivingNeeds(),
                attributes: getAttributes()
            });
    })
    .get('/advSearch', async function(req, res,) {
        var returnObj = {};
        var make = db.collection('vehicles').distinct('make');
        var bodyTypes = db.collection('vehicles').distinct('body_type');
        var fuel = db.collection('vehicles').distinct('fuel');
        var seat = db.collection('vehicles').distinct('seats');
        var door = db.collection('vehicles').distinct('doors');
        Promise.all([make, bodyTypes, fuel, seat, door])
        .then((values) =>{ 
            try{
                returnObj = {
                pageMainClass: 'advSearch',
                title: 'Advanced Search',
                msg: 'Select filters to apply:',
                brands: values[0],
                models: values[1], 
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
        })
    })

    .get('/carList', function(req, res, next) {
        res.render('carList', 
            { 
                pageMainClass: 'carList',
                title: 'Car Catalogue',
                msg: 'Browse our selection of automobiles...'
            });
    })

    .get('/thankyou', function(req, res, next) {
        res.render('thankyou',
            {
                pageMainClass: 'thankYou',
                title: 'Thank you for your feedback!',
            });
    })
    .post('/indivCar', sanitizeArr3, async (req,res) => {
        try{
            var ind = 0;
            var pics = [''];
            var promptMsg = '';
            var arr1 = {
                make: req.body.brands,
                body_type: req.body.models,
                fuel: req.body.fuel,
                doors: (req.body.door > 0) ? parseInt(req.body.door) : "",
                seats: (req.body.seats > 0) ? parseInt(req.body.seats) : ""
            };
            console.log(arr1);
            if((req.body.models === 'truck')){
                ind = 3;
                pics = ['sierra2020.png', 'f1502015.png', 'rivianR1t2022.png'];
            }else if((req.body.models === 'suv' || req.body.models === 'luxury suv' || req.body.models === 'compact suv')){
                ind = 3;
                pics = ['fordExpedition2013.png', 'modelX2017.png', 'escalade2020.png'];
            }else if((req.body.models === 'sport')){
                ind = 3;
                pics = ['corvette2020.png', 'civicTypeR2019.png', 'teslaRoadster2021.png'];
            }else if((req.body.models === 'sedan' || req.body.models === 'luxury sedan')){
                ind = 3;
                pics = ['sonic2019.png', 'audiA42018.png', 'sonata2014.png'];
            }else if((req.body.models === 'compact' || req.body.models === 'luxury compact')){
                ind = 3;
                pics = ['miniCooper2017.png', 'prius2014.png', 'ct42021.png'];
            }else{
                ind = 15;
                pics = ['miniCooper2017.png', 'prius2014.png', 'ct42021.png', 'sonic2019.png', 'audiA42018.png', 'sonata2014.png', 'corvette2020.png', 'civicTypeR2019.png', 'teslaRoadster2021.png', 'fordExpedition2013.png', 'modelX2017.png', 'escalade2020.png', 'sierra2020.png', 'f1502015.png', 'rivianR1t2022.png'];
            };
            console.log(pics);
            var rand = Math.floor(Math.random() * ind)
            //var randPic = pics[rand];
            var promptMsg = '';
            var carArray = removeEmpty(arr1);
            console.log(carArray);
            var picRaw = pics[rand];
            var picInput = picRaw ;
            var i = 0;
            console.log(picInput);
            db.collection('vehicles').find(carArray).toArray(function(err, resp){
                console.log(resp);
                if(resp.length===0){
                    promptMsg = 'No exact results.';
                } else {
                    let len = resp.length;
                    for(i = 0; i < len ; i++){
                        let rand = Math.floor(Math.random() * ind);
                        resp[i].pic = pics[rand];
                    }
                }
                console.log(resp);
                res.render('indivCar', {
                    title: 'Results',
                    response : resp,
                    prompt: promptMsg, 
                });
            console.log(res.render);
            });
        }catch(error){
            res.status(500).json({
                error: error.toString()
            })
        }
    })
    
    
    

    
    /* POST contact form. */
    .post('/thankyou', sanitizeArr,
        (req, res, next) =>{
        console.log(req.body);
        const errors = validationResult(req);   
        //returns error array if input fails check
        if (!errors.isEmpty()) {

            res.render('errPage', {pageMainClass: 'errPage'});
            /*return res.status(400).json({ errors: errors.array() });*/
        };
        const contactMsg = new ContactForm({
            _id: mongoose.Types.ObjectId(),
            Name: req.body.firstName,
            subject: req.body.subject,
            phone: req.body.phone,
            email: req.body.email,
            msg: req.body.msg
        });
        contactMsg.save()
        .then(result => {   
            res.render('thankyou', {
                pageMainClass: 'thankYou',
                title: 'Thank you for your feedback!',
            });

        })
        .catch(err => {
            res.render('errPage', {pageMainClass: 'errPage'});
            console.log(err);
        });
    })
    //info from survey form
    /*contains personality function. Traits of SUV drivers score highest, 
    while traits of sportscar drivers score lowest*/
    .post('/carList', async function(req, res, next){
        try{
            //Form data is assigned to variables to be converted into an integer before math 
            var seatCount = parseInt(req.body.seats);
            var persCount = parseInt(req.body.personality);
            var actCount = parseInt(req.body.activity);
            var driveCount = parseInt(req.body.driving);
            var prioCount = parseInt(req.body.attributes);
            var totalScore = seatCount + persCount + actCount + driveCount + prioCount;
            var pic = '';
            var picInput = '';
            //Sets of respresentative vehicles and messages
            var prompt = 'Browse other vehicles like this:';
            var flavorText = '';
            var lvl1 = 'You are a force to be reckoned with. Your imposing presence and ice cold gaze weigh a hundred pounds. When others accuse you of being vain, you say you are simply "on a different level".';
            var lvl2 = 'You take pride in being average. You are the epitome of the middle of the road. You are content with who you are and what you have.';
            var lvl3 = 'You are a real family guy. Nothing demands more of your attention than your family. Your warmth is infectious.';
            var resultTruck = [101, 17, 10];
            var resultComp = [56, 49, 37];
            var resultSed = [27,18,22];
            var resultSport = [82, 99, 94];
            var resultSuv = [69, 68, 63];
            var resultArray = [];
            var resultChoices = [resultTruck, resultComp, resultSed, resultSport, resultSuv];
            var finalResult = [];
            const errors = validationResult(req);
            //returns error array if input fails check
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            };     
            //Choosing the set of representatives to choose from 
            if (req.body.body_style === 'truck'){
                console.log("car array 'if' works");
                resultArray = resultChoices[0];
                pic = ['f1502015.png', 'rivianR1t2022.png', 'sierra2020.png'];
            } else if (req.body.body_style === 'compact'){
                resultArray = resultChoices[1];
                pic = ['ct42021.png', 'miniCooper2017.png', 'prius2014.png',  ];
            } else if (req.body.body_style === 'sedan'){
                resultArray = resultChoices[2];
                pic = ['audiA42018.png','sonata2014.png' , 'sonic2019.png'];
            } else if (req.body.body_style === 'sports'){
                resultArray = resultChoices[3];
                pic = ['corvette2020.png', 'teslaRoadster2021.png', 'civicTypeR2019.png'];
            } else if (req.body.body_style === 'suv'){
                resultArray = resultChoices[4];
                pic = ['modelX2017.png', 'escalade2020.png', 'fordExpedition2013.png'];
            } else{
                console.log('wrong');
            };
            //Choosing a result from the representative array
            if(totalScore >= 16 && totalScore <= 32){ 
                flavorText = lvl1;
                finalResult = resultArray[0];
                picInput = pic[0];
            }else if(totalScore >= 33 && totalScore <= 48){ 
                flavorText = lvl2;
                finalResult = resultArray[1];
                picInput = pic[1];
            }else if(totalScore >= 49 && totalScore <= 65){
                flavorText = lvl3;
                finalResult = resultArray[2];
                picInput = pic[2];
            };
            db.collection('vehicles').find({ _id: finalResult}).toArray(function(err, resp){
                try{
                    resp.pics = picInput;  
                    res.render('carList', {
                        title: "Here's your match!",
                        response : resp,
                        prompt: prompt,
                        resMsg: flavorText,
                        pic: picInput
                        /*pic: 'fordExpedition2013.png'*/
                    });
                    console.log(picInput);
                } catch (err){
                    res.status(500).send();
                };    
            });
            console.log(res.render);
            const questions = new QuestionForm({
                _id: mongoose.Types.ObjectId(),
                seats: req.body.seats,
                body_style: req.body.body_style,
                personality: req.body.personality,
                activity: req.body.activity,
                driving: req.body.driving,
                attributes: req.body.attributes
            });
            questions.save()
            
            } catch(error){
            res.status(500).json({
                    errRes:[errorMsg]
            });
                
    }
})
.get('/errPage', function(req, res){
  res.render('errPage',
    {
        pageMainClass: 'errPage',
    });
  });
module.exports = router;

