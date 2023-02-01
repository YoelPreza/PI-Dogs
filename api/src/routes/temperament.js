const { Router } = require('express');

const {getTemperament} = require("../handlers/temperamentHandler")

const router = Router();


router.get("/", getTemperament);

module.exports = router;
