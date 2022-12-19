const mongoose = require("mongoose");

const BilletSchema = new mongoose.Schema(
  {
    billetNumber: { type: String, required: true },
    title: { type: String, required: true },
    billetStatus: { type: String, required: true },
    exemptStatus: { type: String, required: false },
    travelRequirement: { type: String, required: false },
    clearanceRequirement: { type: String, required: false },
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
    laborCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LaborCategory",
      required: true,
    },
  },
  { timestamps: true }
);

BilletSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Billet", BilletSchema);
