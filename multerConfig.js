const multer = require('multer');
const path = require('path');

// Cấu hình lưu trữ và bộ lọc tệp
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Thay bằng đường dẫn thư mục lưu trữ ảnh của bạn
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const cleanedFilename = Date.now() + originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, cleanedFilename); },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ cho phép tải lên các tệp ảnh'));
  }
};

var upload = multer({
  storage: storage,
  fileFilter: fileFilter // Sử dụng hàm fileFilter để kiểm tra tệp
}).array('images',5);
module.exports = upload;