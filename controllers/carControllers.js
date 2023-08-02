
const fs = require('fs');
const path = require('path')
const { Cars } = require("../model/cars");
const upload = require("../multerConfig"); // Import cấu hình multer
const carControllers = {
  addCars: async (req, res) => {
    try {

      upload(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        const { codeCar, name, price, year } = req.body;
        // Kiểm tra xem có tệp nào được gửi từ form hay không
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ error: "Chưa tải lên tệp ảnh." });
        }
        const images = req.files.map((file) => file.filename);
        const newCar = new Cars({ codeCar, name, price, year, images: images });
        const saveCar = await newCar.save();
        const cars = await Cars.find();
        const successMessage = "Thêm Thành Công !!!";
        return res.render("cars", {
          title: "Express",
          successMessage: successMessage,
          saveCar: saveCar,
          data: cars,
        });
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllCars: async (req, res) => {
    try {
      const cars = await Cars.find();
      res.render("cars", { data: cars });
    //   res.status(200).json(cars);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateCar: async (req, res) => {
    // try {
    //   const car = await Cars.findById(req.params.id);
    //   await car.updateOne({ $set: req.body });
    //   res.status(200).json("Update successfully");
    // } catch (err) {
    //   res.status(500).json(err);
    // }

    try {
        const id = req.params.id;
        await Cars.updateOne({ _id: id }, { $set: req.body });
        // res.redirect('/cars'); 
        const cars = await Cars.find({});
        const successMessage = "UpDate Thành Công";
        res.render("cars", {
          title: "Express",
          successMessage: successMessage,
          data: cars,
        });// Redirect back to the "cars" view after update
      } catch (err) {
        res.status(500).json(err);
      }
  },


  deleteCar: async (req, res) => {
    try {
        const id = req.params.id;
        const car = await Cars.findById({ _id: id });
            
        // Delete the  images of the car from the "uploads" folder
        for (const image of car.images) {
          const imagePath = path.join(__dirname, "../uploads", image);
          fs.unlinkSync(imagePath);
        }
      await Cars.deleteOne({ _id: id });
      const cars = await Cars.find();
      const successMessage = "xoá ok";
      return res.render("cars", {
        title: "Express",
        successMessage: successMessage,
        data: cars,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = carControllers;
