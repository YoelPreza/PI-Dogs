const { Router } = require('express');
const router = Router();

const {getApiDogs,
    getDogsid,
    postDog,
    } = require("../handlers/dogsHandlers");


router.get("/",getApiDogs);

router.get("/:id", getDogsid);

router.post("/", postDog);

module.exports = router;