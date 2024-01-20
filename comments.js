// Create web server
var express = require('express');
var router = express.Router();
var db = require('../database');

// Create a comment
router.post('/create', function(req, res, next) {
    // Get values from post request
    var post = {
        postID: req.body.postID,
        userID: req.body.userID,
        comment: req.body.comment
    };

    // Insert new comment into database
    db.query('INSERT INTO comments SET ?', post, function(err, result) {
        if (err) {
            // Throw error
            res.render('error', {message: err.message, error: err});
        } else {
            // Redirect to post page
            res.redirect('/post/' + post.postID);
        }
    });
});

// Delete a comment
router.post('/delete', function(req, res, next) {
    // Get values from post request
    var post = {
        commentID: req.body.commentID,
        postID: req.body.postID
    };

    // Delete comment from database
    db.query('DELETE FROM comments WHERE commentID = ?', post.commentID, function(err, result) {
        if (err) {
            // Throw error
            res.render('error', {message: err.message, error: err});
        } else {
            // Redirect to post page
            res.redirect('/post/' + post.postID);
        }
    });
});

module.exports = router;
