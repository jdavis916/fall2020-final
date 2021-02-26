import express from "express";
import ContactForm from "../backend/models/formModel"
import QuestionForm from "../backend/models/questionForm"
import mongoose from "mongoose";
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

    ]

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
                msg: 'Select filters to apply:'
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
