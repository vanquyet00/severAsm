const carControllersApi = require('../controllers/carControllersApi');
const router = require("express").Router();

// Call Api ReactNative

// GET ALL CAR

router.get("/", carControllersApi.getAllCarApi);

router.get("/:id", carControllersApi.getACar);

router.post("/", carControllersApi.addCarApi);

router.put("/:id", carControllersApi.updateCarApi);

router.delete("/:id",carControllersApi.deleteCarApi);

module.exports = router;