'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator');

var validateFieldStrategy = function(property){
    return property.length;
}

var validateEmailStartegy = function(property){
    return validator.isEmail(property);
}

var ContactSchema = new Schema({
    firstname:{
        type: String,
        default: '',
        trim: true,
        validate:[validateFieldStrategy, 'Firstname cannot be empty']
    },
    lastname:{
        type: String,
        default: '',
        trim: true,
        validate:[validateFieldStrategy, 'Lastname cannot be empty']
    },
    email:{
        type: String,
        default: '',
        trim: true,
        unique:true,
        lowercase:true,
        validate:[validateEmailStartegy, 'Email is not valid']
    },
    telephone:{
        type: String,
        default: '',
        trim: true,
        unique:true,
        lowercase:true,
        validate:[validateFieldStrategy, 'Mobile number cannot be empty']
    },
    city:{
        type: String,
        default: '',
        trim: true,
        unique:false,
        lowercase:true,
        validate:[validateFieldStrategy, 'city cannot be empty']
    }
});

var Contact = mongoose.model('RAJESH', ContactSchema);  //register collection for mongodb

module.exports = Contact;