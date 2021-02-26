import express from "express";
import mongoose from "mongoose";
//import mongoSanitize from "express-mongo-sanitize";
//var app = express();
//app.use(mongoSanitize());
const Schema = mongoose.Schema;
export const contactSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    subject: String,
    msg : String
});
 // 
var formModel = mongoose.model("contacts", contactSchema);
 
module.exports = formModel;
