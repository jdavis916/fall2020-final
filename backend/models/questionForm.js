import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const questionSchema = new Schema({
    seats: Number,
    carType: Number,
    personality: Number,
    activity: Number,
    driving: Number,
    attributes: Number
});
 // 
var questionModel = mongoose.model("surveys", questionSchema);
 
module.exports = questionModel;
