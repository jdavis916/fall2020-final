import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const questionSchema = new Schema({
    priceSlider: String,
    seatSlider: String,
    carType: String,
    personality: String,
    objective: String,
    drivingNeeds: String,
    attributes: String
});
 // 
var questionModel = mongoose.model("surveys", questionSchema);
 
module.exports = questionModel;
