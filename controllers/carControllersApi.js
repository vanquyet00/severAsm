const { Cars } = require("../model/cars");
const fs = require('fs-extra');
const path = require('path');
const upload = require('../multerConfig')
 // Import cấu hình multer
const carControllersApi = {
  // call api reactNative

  getAllCarApi: async (req, res) => {
    try {
      const cars = await Cars.find();
      res.status(200).json(cars);
    } catch (err) {
      res.status(500).json(err);
    }
  },

    
//   addCarApi: async (req, res) => {
//     try {
//       const newCar = new Cars(req.body);
//       const saveCar = await newCar.save();
//       res.status(200).json(saveCar + "successfully");
//     } catch (err) {
//       res.status(500).json(err); //HTTP REQUEST CODE
//     }
//   },


addCarApi: async (req, res) => {
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
    
          return res.status(201).json({
            successMessage: successMessage,
            saveCar: saveCar,
            data: cars,
          });
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  },


  deleteCarApi: async (req, res) => {
    try {
        const id = req.params.id;
        const car = await Cars.findByIdAndDelete(id);
    
        if (!car) {
          return res.status(404).json({ error: 'Không tìm thấy xe để xoá' });
        }
    
        // Xoá các ảnh tương ứng trong thư mục "uploads"
        for (const image of car.images) {
          const imagePath = path.join(__dirname, "../uploads", image);
          fs.unlinkSync(imagePath);
        }
    
        const cars = await Cars.find();
        const successMessage = "Xoá thành công";
    
        return res.status(200).json({
          successMessage: successMessage,
          data: cars,
        });
      } catch (err) {
        return res.status(500).json(err);
      }
  },
  // updateCarApi: async (req, res) => {
  //     try {
  //     const car = await Cars.findById(req.params.id);
  //     await car.updateOne({ $set: req.body });
  //     res.status(200).json("Update successfully");
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  updateCarApi: async (req, res) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
  
        const { codeCar, name, price, year } = req.body;
        const carId = req.params.id;
  
        // Get the existing car data
        const existingCar = await Cars.findById(carId);
        if (!existingCar) {
          return res.status(404).json({ error: 'Không tìm thấy xe để cập nhật' });
        }
  
        // If new images are provided, update the images array
        if (req.files && req.files.length > 0) {
          // Remove old images from the server
          for (const image of existingCar.images) {
            const imagePath = path.join(__dirname, "../uploads", image);
            fs.unlinkSync(imagePath);
          }
  
          // Add new images to the car data
          const images = req.files.map((file) => file.filename);
          existingCar.images = images;
        }
  
        // Update other car data
        existingCar.codeCar = codeCar;
        existingCar.name = name;
        existingCar.price = price;
        existingCar.year = year;
  
        // Save the updated car data
        const updatedCar = await existingCar.save();
        const cars = await Cars.find();
        const successMessage = "Cập nhật thành công";
  
        return res.status(200).json({
          successMessage: successMessage,
          updatedCar: updatedCar,
          data: cars,
        });
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getACar: async (req, res) => {
    try {
      const car = await Cars.findById(req.params.id);
      res.status(200).json(car);
    } catch (err) {
      res.status(500).json(err);
    }
  }


};

module.exports = carControllersApi;
