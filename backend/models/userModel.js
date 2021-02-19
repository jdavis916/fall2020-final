import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const TestSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    salary : Number
});
 // 
var UserModel = mongoose.model("user3", TestSchema);
 
module.exports = UserModel;