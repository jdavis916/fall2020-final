import express from "express";
import mongoose from "mongoose";
//import mongoSanitize from "express-mongo-sanitize";
//var app = express();
//app.use(mongoSanitize());
const Schema = mongoose.Schema;
export const vehicleSchema = new Schema({
	make: String,
	model: String,
	year: Number,
	body_type: String,
	fuel: String,
	mpgCityHwy: {
		String,
		String
	},
	seats: Number,
	doors: Number
    
});
 // 
var vehicleModel = mongoose.model("vehicles", vehicleSchema);
 
module.exports = vehicleModel;
