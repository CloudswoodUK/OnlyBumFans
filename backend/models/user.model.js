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
    credit: {
        type: String,
        required:true,
        default: '0.00'
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
    profilePicture: {
        type:String,
        default: "/profile/profpic.svg"
    },
    maritalStatus: {
        type:String,
        default:"Not Disclosed Yet"
    },
    habitOfSmoking: {
        type:String,
        default:"Not Disclosed Yet"
    },
    habitOfDrinking: {
        type:String,
        default:"Not Disclosed Yet"
    },
    wantsToTravel: {
        type:String,
        default:"Not Disclosed Yet"
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date

},{timestamps: true,
    collection: 'users'});
    
export const User = mongoose.model("User", userSchema);