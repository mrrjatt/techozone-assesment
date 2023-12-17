const router = require('express').Router();
const checkEmail = require('../middlewares/checkEmail');
const checkPhone = require('../middlewares/checkPhone');
const { signin: signinValidator } = require('../validators/auth');

const authenticateToken = require('../middlewares/authenticate');
const userController = require('../controllers/user/userController');
const adminController = require('../controllers/admin/adminController');
const vehicleController = require('../controllers/admin/vehicleController');
const categoryController = require('../controllers/admin/categoryController');
const checkAdmin = require('../middlewares/checkAdmin');
const uploadFile = require('../middlewares/upload');



/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the user's profile
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               message: Profile route
 *               user: { _id: 'user_id', username: 'example' }
 */
router.route('/signup')
    .post(checkEmail, checkPhone, userController.signup);
router.route('/signin')
    .post(signinValidator, userController.signin);
router.route('/get-user')
    .post(authenticateToken, userController.getUser);
router.route('/update-user')
    .post(authenticateToken, userController.updateUser);

// Category Routes
router.route('/category')
    .post(authenticateToken, checkAdmin, categoryController.createCategory);
router.route('/category/:categoryId')
    .get(authenticateToken, categoryController.getCategory);
router.route('/category/:categoryId')
    .put(authenticateToken, checkAdmin, categoryController.updateCategory);
router.route('/category/:categoryId')
    .delete(authenticateToken, checkAdmin, categoryController.deleteCategory);
router.route('/all/category')
    .get(authenticateToken, categoryController.allCategories);

// Vehicle Routes
router.route('/vehicle')
    .post(authenticateToken, checkAdmin, uploadFile, vehicleController.createVehicle);
router.route('/vehicle/:vehicleId')
    .get(authenticateToken, vehicleController.getVehicle);
router.route('/vehicle/:vehicleId')
    .put(authenticateToken, checkAdmin, uploadFile, vehicleController.updateVehicle);
router.route('/vehicle/:vehicleId')
    .delete(authenticateToken, checkAdmin, vehicleController.deleteVehicle);
router.route('/all/vehicle')
    .get(authenticateToken, vehicleController.allVehicles);

//Home Page routes
router.route('/home/data')
    .get(authenticateToken, userController.getHomeData);


router.route('/user-list')
    .get(authenticateToken, adminController.allUsers)
router.route('/reset-user-password')
    .post(authenticateToken, adminController.resetUserPassword);



module.exports = router;