const express = require('express');
const productController = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../config/cloudinary'); // ✅ import from cloudinary config

const router = express.Router();

// Product routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', protect, authorize('admin'), upload.single('productImage'), productController.addProduct);
router.put('/:id', protect, authorize('admin'), upload.single('productImage'), productController.updateProduct);
router.delete('/:id', protect, authorize('admin'), productController.deleteProduct);

module.exports = router;



// const express = require('express');
// const productController = require('../controllers/productController');
// const { protect, authorize } = require('../middleware/auth');
// const multer = require('multer');

// const router = express.Router();

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/product_image/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // Product routes
// router.get('/', productController.getProducts);
// router.get('/:id', productController.getProduct);
// router.post('/', protect, authorize('admin'), upload.single('productImage'), productController.addProduct);
// router.put('/:id', protect, authorize('admin'), upload.single('productImage'), productController.updateProduct);
// router.delete('/:id', protect, authorize('admin'), productController.deleteProduct);

// module.exports = router;
