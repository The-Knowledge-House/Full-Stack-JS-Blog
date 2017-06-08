var r = require("./routes.json");
var controllers = {
    static: require("./controllers/pages"),
    session: require("./controllers/session"),
    blogCtrl: require("./controllers/blogCtrl")
};

module.exports = function(app, passport){

    app.get(r.home, controllers.static.home);

    app.get(r.login, controllers.static.login);

    app.get(r.index, controllers.session, controllers.static.index);

    app.get(r.post, controllers.session, controllers.static.post);

    app.get(r.create, controllers.session,  controllers.blogCtrl.createPage);

    app.get(r.update, controllers.session,  controllers.blogCtrl.updatePage);

    app.post(r.signup, controllers.static.signup);

    app.post(r.login, passport.authenticate("local-login", {
      successRedirect: r.index,
      failureRedirect: r.login
    }));

    app.post(r.create, controllers.session, controllers.blogCtrl.create);

    app.put(r.update, controllers.session, controllers.blogCtrl.update);

    app.delete(r.delete, controllers.session, controllers.blogCtrl.delete);

}
