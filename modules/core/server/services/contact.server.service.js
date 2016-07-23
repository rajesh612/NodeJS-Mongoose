'use strict';

var mongoose = require('mongoose'),
    Contact = require('../models/contact.server.model');

    //contact = mongoose.model('Contact');
module.exports.getContacts = function (callback) {
    Contact.find({},function (err, contacts) {
        if(err) throw err;
        console.log(contacts);
        callback(contacts);
    });
}

module.exports.saveContact = function(savableContact, callback){

    var checkContact = new Contact(savableContact);
    checkContact.save(function (err) {
         callback(err, checkContact);
    });

    console.log('mongoose readyState is ' + mongoose.connection.readyState);// should be 1

}

module.exports.updateContact = function (contactID, updatedContact, callback) {

    Contact.findByIdAndUpdate(contactID, { firstname: updatedContact.firstname, lastname: updatedContact.lastname, email: updatedContact.email, telephone: updatedContact.telephone, city: updatedContact.city }, function(err, contact) {
        if (err) throw err;
        updatedContact._id = contact._id;
        console.log("====updated contact=====");
        console.log(updatedContact);
        callback(updatedContact);
    });

}

module.exports.deleteContact = function (id,callback) {
    var isDeleted;
    Contact.findByIdAndRemove(id, function(err) {
        if (err){
            console.log("Error: Unable to Delete");
            isDeleted = false;
        }else{
            console.log("Contact Deleted successfully");
            isDeleted = true;
        }
        callback(isDeleted);
    });
}
    
module.exports.findContactById = function(id,callback){
    Contact.findById(id, function(err, contact) {
        if (err) throw err;
        callback(contact);
    });
}

module.exports.findContactByCity = function (city,callback) {
    var newObj,
        foundContacts =[];
    Contact.find({}).where('city').eq(city).exec(function (err,contacts) {
     if(err){
         callback(err);
     } else {
         console.log(contacts);
         for(var i=0; i< contacts.length;i++){
           newObj = {firstname:contacts[i].firstname,telephone: contacts[i].telephone,city: contacts[i].city};
             foundContacts.push(newObj);
         }
         callback(null,foundContacts);
     }
    });
}

module.exports.getContactByNum = function (num,callback) {
    var newObj,mobile = num.substr(0,3),
        foundContacts =[];
    mobile = mobile.concat('.*');
    console.log(mobile);
    Contact.find({telephone: {$regex: mobile}}).exec(function (err,contacts) {
        if(err){
            callback(err);
        } else {
            console.log(contacts);
            for(var i=0; i< contacts.length;i++){
                newObj = {firstname:contacts[i].firstname,telephone: contacts[i].telephone};
                foundContacts.push(newObj);
            }
            callback(null,foundContacts);
        }
    })
}

module.exports.getTopContacts = function (callback) {
    var newObj,foundContacts=[];
    Contact.find({}).limit(10).sort('firstname').exec(function (err,contacts) {
        if(err){
            callback(err);
        }else{
            console.log(contacts);
            callback(null,contacts);
        }
    })
}