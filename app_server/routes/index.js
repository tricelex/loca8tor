const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

/* Locations Pages */
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

/* Other Pages */
router.get('/about', ctrlOthers.about);

/* GET home page 
router.get('/', ctrlMain.index);
router.get('/about', ctrlMain.about);
*/

module.exports = router;
