const express = require("express")
const Router = express.Router()
const {getYtLink} = require("../Controller/getLinkController")
Router.get("/:str",getYtLink);

module.exports = Router