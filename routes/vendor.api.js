const express = require("express");
const authentication = require("../middlewares/authentication");
const validators = require("../middlewares/validators");
const { body, param } = require("express-validator");
const vendorController = require("../controllers/vendor.controller");
const router = express.Router();

/**
 * @route GET api/vendors?page=1&limit=10
 * @description Get list of Vendors with pagination
 * @access Login required
 */
router.get("/", authentication.loginRequired, vendorController.getVendor);

/**
 * @route GET api/vendors/:id
 * @description Get a single Vendor.
 * @access Login required
 */
router.get(
  "/:id",
  authentication.loginRequired,
  vendorController.getSingleVendor
);

/**
 * @route POST api/vendors
 * @description Create a Vendor.
 * @access Login required
 */
router.post(
  "/",
  authentication.loginRequired,
  vendorController.createNewVendor
);

/**
 * @route PUT api/vendors/:id
 * @description Update a Vendor.
 * @access Login required
 */
router.put(
  "/:id",
  authentication.loginRequired,
  vendorController.updateSingleVendor
);

/**
 * @route DELETE api/vendors/:id
 * @description Delete a Vendor.
 * @access Login required
 */
router.delete(
  "/:id",
  authentication.loginRequired,
  vendorController.deleteSingleVendor
);

module.exports = router;
