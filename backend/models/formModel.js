import mongoose from "mongoose";

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
