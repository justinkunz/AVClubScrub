var axios = require('axios');
var cheerio = require('cheerio');
var Comment = require("../models/NewComments");
var mongoose = require('mongoose');
var Scrub = require("../models/Scrubs");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Scrub"
mongoose.connect(MONGODB_URI)

function apiRoutes(app) {

    //get all post comments
    app.get("/api/post-comments", function (req, res) {

        Comment.find(function (err, data) {
            if (err) return console.error(err);
            res.json(data)
        });
    })

    //get all article data
    app.get("/api/data-grab", function (req, res) {

        Scrub.find(function (err, data) {
            if (err) throw err

            //get array of only links of articles 
            var oldLinks = []
            for (var i = 0; i < data.length; i++) {
                oldLinks.push(data[i].link)
            }

            axios.get('https://www.avclub.com/').then(function (response) {
                var $ = cheerio.load(response.data);
                var articleData;
                var ts = new Date()

                $("article").each(function (i, element) {
                    articleData = {
                        title: $(element).children('header').children('.headline').text(),
                        summ: $(element).children('.item__content').children('.entry-summary').text(),
                        link: $(element).children('header').children('.headline').children('a').attr('href'),
                        scrubTime: ts
                    }

                    //only add articles with non existing links to the database
                    if (oldLinks.indexOf(articleData.link) === -1) {
                        new Scrub(articleData).save()
                    }

                });

                Scrub.find(function (err, data) {
                    if (err) throw err
                    res.json(data)
                });
            });
        });
    });

    //posting new comments
    app.post("/api/post/comment", function (req, res) {
        new Comment(req.body).save()
        res.json(req.body)

    });

    //delete comment 
    app.get("/api/delComm/:id", function (req, res) {
        Comment.find({ _id: req.params.id }).remove(function (err, data) {
            if (err) throw err;
            res.json(data)
        });
    });
};

module.exports = apiRoutes;

