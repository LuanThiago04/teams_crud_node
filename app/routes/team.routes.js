module.exports = app => {
    const teams = require("../controllers/team.controller.js");

    var router = require("express").Router();

    router.post("/", teams.create);

    router.get("/", teams.findAll);

    router.get("/international_champion", teams.findAllinternational_champion);

    router.get("/:id", teams.findOne);

    router.put("/:id", teams.update);

    router.delete("/:id", teams.delete);

    router.delete("/", teams.deleteAll);

    app.use('/api/teams', router);
;}