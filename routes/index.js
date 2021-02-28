import express from "express";
import ContactForm from "../backend/models/formModel"
import QuestionForm from "../backend/models/questionForm"
import mongoose from "mongoose";
import axios from 'axios';
const { body, validationResult } = require('express-validator');
const router = express.Router();
var errorMsg = "Prohibited characters detected in input";
//variables storing express-validator arguments for .post
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
function getBrand(){
    let subArr = [];
    subArr = [
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

    return subArr;
}
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
            title: "Cross over"
        },
        {
            _id:4,
            title: "Van"
        },
        {
            _id:5,
            title: "SUV"
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
function getMileage(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "0"
        },
        {
            _id:2,
            title: "20,000 or less"
        },
        {
            _id:3,
            title: "50,000 or less"
        },
        {
            _id:4,
            title: "100,000 or less"
        },
        {
            _id:5,
            title: "150,000 or less"
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
function getFuel(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: "Gas"
        },
        {
            _id:2,
            title: "Diesel"
        },
        {
            _id:3,
            title: "Bio diesel"
        },
        {
            _id:4,
            title: "Electric"
        },
        {
            _id:5,
            title: "Hybrid"
        }
    ];

    return subArr;
}
function getDoor(){
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
            title: "6"
        },
        {
            _id:4,
            title: "8"
        },
        {
            _id:5,
            title: "10+"
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
}
function getQuestionTwo(){
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
            title: "6"
        },
        {
            _id:4,
            title: "8"
        },
        {
            _id:5,
            title: "10+"
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
}

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
                priceSlider: getQuestionOne(),
                seatSlider: getQuestionTwo(),
                carType: getQuestionThree(),
                personality: getQuestionFour(),
                objective: getQuestionFive(),
                drivingNeeds: getQuestionSix(),
                attributes: getQuestionSeven()



            });
    })
    .get('/advSearch', function(req, res, next) {
        res.render('advSearch', 
            { 
                pageMainClass: 'advSearch',
                title: 'Advanced Search',
                msg: 'Select filters to apply:',
                brands: getBrand(),
                models: getModel(),
                minimum: getMinimum(),
                maximum: getMaximum(),
                mileage: getMileage(),
                interiorColor: getInteriorColor(),
                exteriorColor: getExteriorColor(),
                fuel: getFuel(),
                door: getDoor()

            });
    })


    .get('/carList', function(req, res, next) {
        res.render('carList', 
            { 
                pageMainClass: 'carList',
                title: 'Car Catalogue',
                msg: 'Browse our selection of automobiles...'
            });
    })

    /* POST user page. */
	.post('/formModel', sanitizeArr,
        (req, res, next) =>{
        console.log(req.body);
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
    .post('/questionForm', sanitizeArr2,
        (req, res, next) =>{
        console.log(req.body);
        const errors = validationResult(req);
        //returns error array if input fails check
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        /*console.log(req.headers);*/
        const questions = new QuestionForm({
            _id: mongoose.Types.ObjectId(),
            price: req.body.price,
            seats: req.body.seats,
            body_style: req.body.body_style,
            personality: req.body.personality,
            activity: req.body.activity,
            driving: req.body.driving,
            priority: req.body.priority
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
