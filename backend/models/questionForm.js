import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const questionSchema = new Schema({
    price: String,
    seat: String,
    carType: String,
    personality: String,
    activity: String,
    driving: String,
    attributes: String
});
 // 
var questionModel = mongoose.model("surveys", questionSchema);
 
module.exports = questionModel;
