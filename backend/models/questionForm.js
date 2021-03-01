import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const questionSchema = new Schema({
    price: String,
    seat: String,
    carType: String,
    personality: String,
    activity: Array,
    driving: String,
    attributes: Array
});
 // 
var questionModel = mongoose.model("surveys", questionSchema);
 
module.exports = questionModel;
