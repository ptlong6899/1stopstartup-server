const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    //main
    vendorData: {
      description: {
        header: { type: String, required: true, default: "" },
        content: { type: String, required: true, default: "" },
      },
      specialization: {
        header: { type: String, required: true, default: "" },
        content: { type: String, required: true, default: "" },
        details: [
          {
            imgUrl: { data: Buffer, contentType: String },
            imgHeader: { type: String, required: true, default: "" },
          },
        ],
      },
      attribute: {
        header: { type: String, required: true, default: "" },
        content: { type: String, required: true, default: "" },
        details: [
          {
            imgUrl: { data: Buffer, contentType: String },
            imgHeader: { type: String, required: true, default: "" },
            imgDescription: { type: String, required: true, default: "" },
          },
        ],
      },
      conclusion: {
        header: { type: String, required: true, default: "" },
        info: {
          facebookUrl: { type: String, required: true, default: "" },
          email: { type: String, required: true, default: "" },
          phoneNumber: { type: Number, required: true, default: "0123456789" },
        },
      },
    },
    //main
    layout: { type: Number, required: true, enum: [1, 2] },
    premium: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

vendorSchema.plugin(require("./plugins/isDeletedFalse"));

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;

// {
//   vendorData:{
//     description:{header:,content:},
//     specialization: {header,content,imgData:[{imgUrl,imgHeader}]},
//     attribute: {header,content,imgData:[{imgUrl,imgHeader,imgDescription}],
//     conclusion: {header ,info:{facebookUrl, email, phoneNumber}}
//   }
// }
