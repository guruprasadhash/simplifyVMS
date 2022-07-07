const { authJwt } = require("../middleware");
const controller = require("../controllers/jobreq.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Access_Control_Allow_Origin,Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/jobreqs",
        [authJwt.verifyToken],
        controller.create
    );

    app.get(
        "/api/jobreqs",
        [authJwt.verifyToken],
        controller.findAll
    );

    app.get(
        "/api/jobreqs/:id",
        [authJwt.verifyToken],
        controller.findOne
    );

    app.put(
        "/api/jobreqs/:id",
        [authJwt.verifyToken],
        controller.update
    );

    app.delete(
        "/api/jobreqs/:id",
        [authJwt.verifyToken],
        controller.delete
    );

    app.delete(
        "/api/jobreqs/:id",
        [authJwt.verifyToken],
        controller.deleteAll
    );

    app.get(
        "/api/jobreqs/submitted",
        [authJwt.verifyToken],
        controller.findAllSubmitted
    );

    app.get(
        "/api/jobreqs/reviewed",
        [authJwt.verifyToken],
        controller.findAllReviewed
    );

    app.get(
        "/api/jobreqs/approved",
        [authJwt.verifyToken],
        controller.findAllApproved
    );

};