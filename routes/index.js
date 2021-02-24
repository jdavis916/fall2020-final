import express from "express";
import ContactForm from "../backend/models/formModel"
import QuestionForm from "../backend/models/questionForm"
import mongoose from "mongoose";

const router = express.Router();

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
    .get('/contact', function(req, res, next) {
        res.render('contact', 
            { 
                pageMainClass: 'contactUs',
                title: 'Contact Us',
                msg: 'Send Us Your Feedback:'
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
