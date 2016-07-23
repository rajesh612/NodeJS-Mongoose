'use strict';

module.exports = function(app){

    var controller = require('../controllers/core.server.controller');

    // Get and create Contact
    app
        .route('/api/contact')
        .get(controller.getContacts)
        .post(controller.createContact);

    // Update and delete operations
    app
        .route('/api/contact/:contactId')
        .put(controller.updateContact)
        .delete(controller.deleteContact);

    app.param ('contactId', controller.validateContactIdAndForward)

    app
        .route('/api/city/:city')
        .get(controller.findContactByCity);

    app
        .route('/api/areacode/:num')
        .get(controller.getContactByNum);

    app
        .route('/api/topcontacts')
        .get(controller.getTopContacts);
}