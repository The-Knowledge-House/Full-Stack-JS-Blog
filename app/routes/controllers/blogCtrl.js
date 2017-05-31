var Post = require("../../models/blogModel");

function today(){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }

    return {
        month: month,
        year: year,
        day: day
    };
}

var blogPages = {
    create: function(req, res){
        res.render("create", {
            user: req.user.username
        });
    },
    update: function(req, res){
        res.render("update", {
            user: req.user.username
        });
    }
};

function createBlogPost(callback){
    new Post({
        title: req.body.blogTitle,
        post: req.body.postBody,
        date: {
            month: today().month,
            day: today().day,
            year: today().year
        },
        user: req.user.username
    }).save(function(err){
        if(err){
            console.log(err);
        } else {
            callback({
                "success": true,
                "reason": "New post made!"
            });
        }
    })
}

function updateBlogPost(){
    
}

exports.create = createBlogPost;
exports.update = updateBlogPost;

exports.createPage = blogPages.create;
exports.updatePage = blogPages.update;

