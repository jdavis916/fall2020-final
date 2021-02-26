import express from "express";
import ContactForm from "../backend/models/formModel"
import QuestionForm from "../backend/models/questionForm"
import mongoose from "mongoose";
//I will include working sanitization in the next push
//import xss from 'xss-clean';
//import mongoSanitize from "express-mongo-sanitize";
const router = express.Router();
var errorMsg = "Cyberattack imminent";
//mock data for contact pulldown, update to pull from db later
function getContactSubjects(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: Title1

        },
        {
            _id:2,
            title: Title2

        },
        {
            _id:3,
            title: Title3

        },
        {
            _id:4,
            title: Title4

        },
        {
            _id:5,
            title: Title5
        }
    ];
}
function getBrand(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: Title1
        },
        {
            _id:2,
            title: Title2
        },
        {
            _id:3,
            title: Title3
        },
        {
            _id:4,
            title: Title4
        },
        {
            _id:5,
            title: Title5
        }
    ];
}
function getModel(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: Title1
        },
        {
            _id:2,
            title: Title2
        },
        {
            _id:3,
            title: Title3
        },
        {
            _id:4,
            title: Title4
        },
        {
            _id:5,
            title: Title5
        }
    ];
}
function getMinimum(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: Title1
        },
        {
            _id:2,
            title: Title2
        },
        {
            _id:3,
            title: Title3
        },
        {
            _id:4,
            title: Title4
        },
        {
            _id:5,
            title: Title5
        }
    ];
}
function getMaximum(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: Title1
        },
        {
            _id:2,
            title: Title2
        },
        {
            _id:3,
            title: Title3
        },
        {
            _id:4,
            title: Title4
        },
        {
            _id:5,
            title: Title5
        }
    ];
}
function getMileage(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: Title1
        },
        {
            _id:2,
            title: Title2
        },
        {
            _id:3,
            title: Title3
        },
        {
            _id:4,
            title: Title4
        },
        {
            _id:5,
            title: Title5
        }
    ];
}
function getInteriorColor(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: Title1
        },
        {
            _id:2,
            title: Title2
        },
        {
            _id:3,
            title: Title3
        },
        {
            _id:4,
            title: Title4
        },
        {
            _id:5,
            title: Title5
        }
    ];
}
function getExteriorColor(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: Title1
        },
        {
            _id:2,
            title: Title2
        },
        {
            _id:3,
            title: Title3
        },
        {
            _id:4,
            title: Title4
        },
        {
            _id:5,
            title: Title5
        }
    ];
}
function getFuel(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: Title1
        },
        {
            _id:2,
            title: Title2
        },
        {
            _id:3,
            title: Title3
        },
        {
            _id:4,
            title: Title4
        },
        {
            _id:5,
            title: Title5
        }
    ];
}
function getDoor(){
    let subArr = [];
    subArr = [
        {
            _id:1,
            title: Title1
        },
        {
            _id:2,
            title: Title2
        },
        {
            _id:3,
            title: Title3
        },
        {
            _id:4,
            title: Title4
        },
        {
            _id:5,
            title: Title5
        }
    ];
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
                msg: 'Please answer honestly to ensure accurate results'  
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
                maximum: getMaximun(),
                mileage: getMileage(),
                interiorColor: getInteriorColor(),
                exteriorColor: getExteriorColor(),
                fuel: getFuel(),
                door: getdoor()

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
	.post('/formModel', (req, res, next) =>{
        console.log(req.body);
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
        //I took this out for now; clarity's sake
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
            res.status(200).json({
                errRes:[errorMsg]
            });
            console.log(err);
        });
    })
    .post('/questionForm', (req, res, next) =>{
        console.log(req.body);
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
