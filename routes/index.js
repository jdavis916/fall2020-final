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
        } // add in other options later
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
        } // add in other options later
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
        
        //var mpg = db.collection('vehicles').distinct('mpgCityHwy');
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
        })//res.json({bodyTypes});
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
    .post('/indivCar', sanitizeArr3, async (req,res) => {
        try{
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
                pics = ['sierra2020.png', 'f1502015.png', 'rivianR1t2022.png'];
            }else if((req.body.models === 'suv' || req.body.models === 'luxury suv')){
                pics = ['fordExpedition2013.png', 'modelX2017.png', 'escalade2020.png'];
            }else if((req.body.models === 'sport')){
                pics = ['corvette2020.png', 'civicTypeR2019.png', 'teslaRoadster2021.png'];
            }else if((req.body.models === 'sedan' || req.body.models === 'luxury sedan')){
                pics = ['sonic2019.png', 'audiA42018.png', 'sonata2014.png'];
            }else if((req.body.models === 'compact' || req.body.models === 'luxury comact')){
                pics = ['miniCooper2017.png', 'prius2014.png', 'ct42021.png'];
            };
            console.log(pics);
            var rand = Math.floor(Math.random() * 3)
            //var randPic = pics[rand];
            var promptMsg = '';
            var carArray = removeEmpty(arr1);
            console.log(carArray);
            var picRaw = pics[rand];
            var picInput = "'" + picRaw + "'";
            var i = 0;
            console.log(picInput);
            /*pics = ['miniCooper2017.jpg', 'prius2014.jpg', 'ct42021.jpg'];
            picInput = pics[0];*/
            db.collection('vehicles').find(carArray).toArray(function(err, resp){
                console.log(resp);
                //console.log(randPic);
                if(resp.length===0){

                    promptMsg = 'No exact results.';
                } else {

                    let len = resp.length;
                    for(i = 0; i < len ; i++){
                        let rand = Math.floor(Math.random() * 3);
                        resp[i].pic = pics[rand];

                    }
                }
                console.log(resp);
                res.render('indivCar', {
                    title: 'Results',
                    response : resp,
                    prompt: promptMsg,
                    /*picture: picInput*/ 

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
    .post('/formModel', sanitizeArr,
        (req, res, next) =>{
        console.log(req.body);
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
        
        const questions = new QuestionForm({
            _id: mongoose.Types.ObjectId(),
            price: req.body.price,
            seats: req.body.seats,
            body_style: req.body.body_style,
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
        res.status(500).json({
                errRes:[errorMsg]
            });
            console.log(err);
        })
    });

//console.log(getQuestionFour().subArr[1].Title)
module.exports = router;










/*var resultCar = '';
(the rest of your function...................





    );




var totalScore = priceCount + activity + driving + carScore + attributes + bodyCount;
if((totalScore >=5 && totalScore < 7)){
   resultCar = "Sonata";
} else if ((totalScore >=7 && totalScore < 9)){
    resultCar = "R1T";
} else if ((totalScore >= 9 && totalScore < 11)){
    resultCar = "Prius";
} else if ((totalScore >= 11 && totalScore < 12)){
    resultCar = "Cooper";
} else if ((totalScore >= 12 && totalScore < 15)){
    resultCar = "Model X";
} else if ((totalScore >= 15 && totalScore < 16)){
    resultCar = "Expedition";
} else if ((totalScore >= 16 && totalScore < 25)){
    resultCar = "Roadster";
};*/
