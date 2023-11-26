const express = require('express');
const {URL_PREFIX} = require("../configs/general.config");
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect(`${URL_PREFIX}`)
});

module.exports = router;
