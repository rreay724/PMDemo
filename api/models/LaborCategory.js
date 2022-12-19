const mongoose = require("mongoose");

const LaborCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    shortName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

LaborCategorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("LaborCategory", LaborCategorySchema);
