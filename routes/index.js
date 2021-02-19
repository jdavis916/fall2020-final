import express from "express";
import User from "../backend/models/UserModel"
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
    /* POST user page. */
	.post('/user', (req, res, next) =>{
		/*console.log(req.body);*/
		/*console.log(req.headers);*/
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            salary: req.body.salary
        });
        /*res.status(200).json({
            res: [req.body.firstName]
        });*/
        user.save()
        .then(result => {
            res.status(200).json({
                docs:[user]
            });
        })
        .catch(err => {
            console.log(err);
        });
    });

module.exports = router;
