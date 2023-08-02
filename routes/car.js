var express = require('express');
const carControllers = require('../controllers/carControllers');
const router = express.Router();


// ADD CAR
router.post("/",carControllers.addCars);

//GET ALL CAR
router.get("/",carControllers.getAllCars); 

//UDATE CAR

router.post("/:id",carControllers.updateCar);

//Delete
router.get("/:id",carControllers.deleteCar);







module.exports = router;