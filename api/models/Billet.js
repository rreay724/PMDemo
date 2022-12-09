const mongoose = require("mongoose");

const BilletSchema = new mongoose.Schema(
  {
    billetNumber: { type: String, required: true },
    title: { type: String, required: true },
    billetStatus: { type: String, required: true },
    exemptStatus: { type: String, required: true },
    travelRequirement: { type: String, required: true },
    clearanceRequirement: { type: String, required: true },
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
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
