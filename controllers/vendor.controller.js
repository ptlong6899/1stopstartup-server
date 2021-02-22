const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Vendor = require("../models/Vendor");
const User = require("../models/User");
const vendorController = {};

vendorController.getVendor = catchAsync(async (req, res, next) => {
  let { page, limit, sortBy, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const totalVendors = await Vendor.countDocuments({
    ...filter,
    isDeleted: false,
  });
  const totalPages = Math.ceil(totalVendors / limit);
  const offset = limit * (page - 1);

  // console.log({ filter, sortBy });
  const vendors = await Vendor.find(filter)
    .sort({ ...sortBy, createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .populate("author");

  return sendResponse(res, 200, true, { vendors, totalPages }, null, "");
});

vendorController.getSingleVendor = catchAsync(async (req, res, next) => {
  let vendor = await Vendor.findById(req.params.id).populate("author");
  if (!vendor)
    return next(
      new AppError(404, "Vendor not found", "Get Single Vendor Error")
    );
  vendor = vendor.toJSON();
  // blog.reviews = await Review.find({ blog: blog._id }).populate("user");
  return sendResponse(res, 200, true, vendor, null, null);
});

vendorController.createNewVendor = catchAsync(async (req, res, next) => {
  const author = req.userId;
  const { vendorData, layout } = req.body;

  const vendor = await Vendor.create({ author, vendorData, layout });

  return sendResponse(
    res,
    200,
    true,
    vendor,
    null,
    "Create new Vendor successful"
  );
});

vendorController.updateSingleVendor = catchAsync(async (req, res, next) => {
  const author = req.userId;
  const vendorId = req.params.id;
  const { vendorData, layout } = req.body;

  const vendor = await Vendor.findOneAndUpdate(
    { _id: vendorId, author: author },
    { vendorData, layout },
    { new: true }
  );
  if (!vendor)
    return next(
      new AppError(
        400,
        "Vendor not found or User not authorized",
        "Update Vendor Error"
      )
    );
  return sendResponse(res, 200, true, vendor, null, "Update Vendor successful");
});

vendorController.deleteSingleVendor = catchAsync(async (req, res, next) => {
  const author = req.userId;
  const vendorId = req.params.id;

  const vendor = await Vendor.findOneAndUpdate(
    { _id: vendorId, author: author },
    { isDeleted: true },
    { new: true }
  );
  if (!vendor)
    return next(
      new AppError(
        400,
        "Vendor not found or User not authorized",
        "Delete Vendor Error"
      )
    );
  return sendResponse(res, 200, true, null, null, "Delete Vendor successful");
});

module.exports = vendorController;
