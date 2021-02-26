import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const questionSchema = new Schema({
    price: String,
    seats: String,
    body_style: String,
    personality: String,
    activity: String,
    driving: String,
    priority: String
});
 // 
var questionModel = mongoose.model("surveys", questionSchema);
 
module.exports = questionModel;
