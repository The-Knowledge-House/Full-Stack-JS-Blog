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
      Post.findOne({"_id": req.query.post}, function(err, post){
        if(err){
          console.log(err);
        } else {
          res.render("update", {
              post: post
          });
        }
      });
    }
};

function createBlogPost(req, res){
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
          res.redirect("/index");
        }
    })
}


function updateBlogPost(req, res){
  Post.update({"_id": req.query.id}, {$set: {"post": req.body.postBody, "title": req.body.blogTitle}}, function(err, doc){
    if(err){
      res.redirect("/index?update=fail");
    } else {
      res.redirect("/index?update=success");
    }
  });
}






function deleteBlogPost(req, res){
  Post.remove({"_id": req.query.post}, function(err, post){
    if(err){
      console.log(err);
    } else {
        res.redirect("/index");
    }
  });
}








exports.create = createBlogPost;
exports.update = updateBlogPost;
exports.delete = deleteBlogPost;

exports.createPage = blogPages.create;
exports.updatePage = blogPages.update;
