const express = require("express")
const Router = express.Router()
const contestController = require("../Controller/contestsController");

Router.post("/", contestController.addContest);
Router.get("/Contest", contestController.getContests);
Router.patch("/toggleBookmark/:contestId", contestController.toggleBookmark);

module.exports = Router