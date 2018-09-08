var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Contact = require('../models/contacts');


router.get('/', function (req, res) {
    Contact.find(function (err, contacts, count) {
        res.render('list', { contacts: contacts });
    })
});

router.route('/add')
    .get(function (req, res) {
        res.render('add', { contact: {} });
    })

    .post(function (req, res) {
        new Contact({
            name: req.body.fullname,
            job: req.body.job,
            nickname: req.body.nickname,
            email: req.body.email
        }).save(function (err, contact, count) {
            if (err) {
                res.status(400).send('Error saving new contact: ' + err);
            } else {
                res.send('New contact created');
                // res.redirect('/contacts');
            }
        });
    });

router.route('/:contact_id')
    .all(function (req, res, next) {
        contact_id = req.params.contact_id;
        next();
    })

    .get(function (req, res) {
    })

    .post(function (req, res) {
        if (!contact.notes) {
            contact.notes = [];
        }

        contact.notes.push({
            created: Date(),
            note: req.body.notes
        });

        res.send('Created new note for contact id ' + contact_id);
        // res.redirect('/contact/'+contact_id);
    })

    .put(function (req, res) {
        contact.name = req.body.fullname;
        contact.job = req.body.job;
        contact.nickname = req.body.nickname;
        contact.email = req.body.email;

        res.send('Update succeeded for contact id: ' + contact_id);
        // res.render('/contacts/');
    })

    .delete(function (req, res) {
        res.send('Delete for contact ' + contact_id);
    });

module.exports = router;
