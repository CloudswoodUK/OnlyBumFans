import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    userRegistrationId: {
        type: String,
        unique: true,
        required: true
    },
    userSequenceNumber: {
        type: String,
        unique: true,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    country: {
        type: String,
        default: 'Unknown'
    },
    lastLogin:{
        type:Date,
        required:true,
        default:Date.now()
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isOnline:{
        type:Boolean,
        required:true,
        default:true
    },
    gender:{
        type:String,
        required:true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date

},{timestamps: true,
    collection: 'users'});
 
export const User = mongoose.model("User", userSchema);