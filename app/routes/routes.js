var r = require("./routes.json");
var controllers = {
    static: require("./controllers/static"),
    session: require("./controllers/session"),
    blogCtrl: require("./controllers/blogCtrl")
};

module.exports = function(app, passport){

    app.get(r.index, controllers.static.index);

    app.get(r.login, controllers.static.login);

    app.get(r.signup, controllers.static.signup);

    app.get(r.create, controllers.session,  controllers.blogCtrl.createPage);

    app.get(r.update, controllers.session,  controllers.blogCtrl.updatePage);

}
