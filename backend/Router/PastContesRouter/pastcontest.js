
const express = require("express")
const Router = express.Router()
const {getContest} = require("../../Controller/pastContest")
Router.get("/",getContest);

module.exports = Router