const router = require("express").Router();
const LaborCategory = require("../models/LaborCategory");

router.post("/", async (req, res) => {
  try {
    const newLabCat = new LaborCategory({
      name: req.body.name,
      shortName: req.body.shortName,
    });

    const labCat = await newLabCat.save();
    res.status(200).json(labCat);
  } catch (error) {
    console.log({ message: "Error creating Labor Category", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedLabCat = await LaborCategory.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedLabCat);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const labCat = await LaborCategory.findById(req.params.id);
    res.status(200).json(labCat);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const labCats = await LaborCategory.find();

    res.status(200).json(labCats);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
