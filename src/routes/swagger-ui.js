const express = require('express');
const router = express.Router();

const {URL_PREFIX} = require("../configs/general.config");
const {SWAGGER_UI_JSON_VIEW, SWAGGER_UI_URL_VIEW, HOME} = require("../models/view");

const openapi = require("../models/openapi/index.json");

const {auth} = require("../middle/auth");

/** health check */
router.get('/health', function (req, res, next) {
  res.sendStatus(200);
});

router.get('/', function (req, res) {
  res.render(HOME, {'title': 'swagger-keycloak', URL_PREFIX})
})

/** openapi swagger */
router.get(['/real/'], auth.protect({}), async function (req, res, next) {
  const spec = openapi
  res.render(SWAGGER_UI_JSON_VIEW, {spec, URL_PREFIX});
});


module.exports = router;
